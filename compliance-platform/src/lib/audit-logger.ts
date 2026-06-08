import { prisma } from "./prisma";
import { AuditAction } from "@prisma/client";
import { createHash } from "crypto";

interface AuditLogParams {
  userId: string;
  action: AuditAction;
  entityType: string;
  entityId: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  postId?: string;
}

function createAuditHash(data: {
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  timestamp: string;
  metadata?: string;
  previousHash?: string | null;
}): string {
  const payload = JSON.stringify({
    userId: data.userId,
    action: data.action,
    entityType: data.entityType,
    entityId: data.entityId,
    timestamp: data.timestamp,
    metadata: data.metadata,
    previousHash: data.previousHash,
  });

  return createHash("sha256").update(payload).digest("hex");
}

export async function logAudit(params: AuditLogParams): Promise<void> {
  try {
    const lastLog = await prisma.auditLog.findFirst({
      where: { userId: params.userId },
      orderBy: { createdAt: "desc" },
      select: { currentHash: true },
    });

    const previousHash = lastLog?.currentHash || null;
    const timestamp = new Date().toISOString();

    const currentHash = createAuditHash({
      userId: params.userId,
      action: params.action,
      entityType: params.entityType,
      entityId: params.entityId,
      timestamp,
      metadata: params.metadata ? JSON.stringify(params.metadata) : undefined,
      previousHash,
    });

    await prisma.auditLog.create({
      data: {
        userId: params.userId,
        action: params.action,
        entityType: params.entityType,
        entityId: params.entityId,
        metadata: params.metadata || {},
        ipAddress: params.ipAddress,
        userAgent: params.userAgent,
        postId: params.postId,
        previousHash,
        currentHash,
      },
    });

  } catch (error) {
    console.error("[AUDIT LOG ERROR] Failed to create audit log:", {
      error: error instanceof Error ? error.message : "Unknown error",
      params: {
        userId: params.userId,
        action: params.action,
        entityType: params.entityType,
        entityId: params.entityId,
      },
    });
  }
}

export async function getAuditLogs(params: {
  userId?: string;
  entityType?: string;
  entityId?: string;
  action?: AuditAction;
  fromDate?: Date;
  toDate?: Date;
  page?: number;
  limit?: number;
}) {
  const {
    userId,
    entityType,
    entityId,
    action,
    fromDate,
    toDate,
    page = 1,
    limit = 50,
  } = params;

  const where = {
    ...(userId && { userId }),
    ...(entityType && { entityType }),
    ...(entityId && { entityId }),
    ...(action && { action }),
    ...(fromDate || toDate
      ? {
          createdAt: {
            ...(fromDate && { gte: fromDate }),
            ...(toDate && { lte: toDate }),
          },
        }
      : {}),
  };

  const [logs, total] = await Promise.all([
    prisma.auditLog.findMany({
      where,
      include: {
        user: {
          select: { name: true, email: true },
        },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.auditLog.count({ where }),
  ]);

  return {
    logs,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function verifyAuditChain(userId: string): Promise<{
  valid: boolean;
  checked: number;
  firstInvalidIndex?: number;
}> {
  const logs = await prisma.auditLog.findMany({
    where: { userId },
    orderBy: { createdAt: "asc" },
  });

  for (let i = 0; i < logs.length; i++) {
    const log = logs[i];

    if (i > 0) {
      const previousLog = logs[i - 1];
      if (log.previousHash !== previousLog.currentHash) {
        return { valid: false, checked: i, firstInvalidIndex: i };
      }
    }

    const recalculatedHash = createAuditHash({
      userId: log.userId,
      action: log.action,
      entityType: log.entityType,
      entityId: log.entityId,
      timestamp: log.createdAt.toISOString(),
      metadata: log.metadata ? JSON.stringify(log.metadata) : undefined,
      previousHash: log.previousHash,
    });

    if (recalculatedHash !== log.currentHash) {
      return { valid: false, checked: i, firstInvalidIndex: i };
    }
  }

  return { valid: true, checked: logs.length };
}
