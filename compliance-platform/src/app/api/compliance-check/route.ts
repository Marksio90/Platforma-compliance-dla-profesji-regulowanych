import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { openai } from "@/lib/openai";
import { logAudit } from "@/lib/audit-logger";
import { selectDisclaimers } from "@/lib/disclaimer-engine";

const SYSTEM_PROMPT = `Jesteś ekspertem ds. compliance dla profesji regulowanych w Polsce.
Twoim zadaniem jest analiza tresci pod katem zgodnosci z:
- Kodeksem Etyki Radcy Prawnego (dla radcow)
- Kodeksem Etyki Adwokackiej (dla adwokatow)
- Przepisami KNF (dla doradcow finansowych)
- RODO (dla wszystkich)

ZASADY ANALIZY:
1. Sprawdz, czy tresc zawiera zakazane elementy (obietnice, agresywna reklama, poufnosc)
2. Oceń ryzyko na skali 0-100 (0 = bezpieczne, 100 = wysokie ryzyko)
3. Zidentyfikuj konkretne problemy z przypisaniem do artykulow/regulacji
4. Zasugeruj poprawki

ZWROC WYNIK W FORMIE JSON:
{
  "score": number (0-100),
  "status": "PASS" | "WARNING" | "FAIL",
  "issues": [
    {
      "type": "PROMISE" | "TESTIMONIAL" | "MISLEADING" | "CONFIDENTIALITY" | "AGGRESSIVE_ADVERTISING",
      "severity": "LOW" | "MEDIUM" | "HIGH",
      "message": "opis problemu po polsku",
      "rule": "odwolanie do konkretnego artykulu/przepisu",
      "suggestion": "jak poprawic"
    }
  ],
  "summary": "krotkie podsumowanie po polsku"
}

WAZNE: Nie zalecaj konkretnych dzialan prawnych. Wskazuj tylko potencjalne problemy.`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { postId, content, profession, jurisdiction } = body;

    if (!content || !profession || !jurisdiction) {
      return NextResponse.json(
        { error: "Missing required fields: content, profession, jurisdiction" },
        { status: 400 }
      );
    }

    // Create a test post if postId not provided (for MVP testing without auth)
    let actualPostId = postId;
    if (!actualPostId) {
      const testPost = await prisma.post.create({
        data: {
          content,
          plainText: content,
          authorId: "test-user",
          status: "DRAFT",
        },
      });
      actualPostId = testPost.id;
    }

    // Create test user if not exists
    const testUser = await prisma.user.upsert({
      where: { id: "test-user" },
      update: {},
      create: {
        id: "test-user",
        email: "test@compliance.local",
        name: "Test User",
        profession: "LAWYER",
        jurisdiction: "PL",
      },
    });

    const complianceCheck = await prisma.complianceCheck.create({
      data: {
        postId: actualPostId,
        userId: testUser.id,
        profession,
        jurisdiction,
        status: "PENDING",
      },
    });

    const startTime = Date.now();

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `Branza: ${profession}\nJurydykcja: ${jurisdiction}\n\nTresc do analizy:\n${content}` },
      ],
      response_format: { type: "json_object" },
      temperature: 0.1,
      max_tokens: 2000,
    });

    const latencyMs = Date.now() - startTime;
    const aiResponse = completion.choices[0]?.message?.content;

    if (!aiResponse) {
      throw new Error("Empty response from LLM");
    }

    let result;
    try {
      result = JSON.parse(aiResponse);
    } catch {
      result = {
        score: 50,
        status: "WARNING",
        issues: [{
          type: "MISLEADING",
          severity: "MEDIUM",
          message: "Nie udalo sie przeprowadzic pelnej analizy. Sprawdz tresc recznie.",
          rule: "N/A",
          suggestion: "Skonsultuj tresc z compliance officer."
        }],
        summary: "Analiza czesciowa — wymaga weryfikacji czlowieka."
      };
    }

    const disclaimers = await selectDisclaimers({
      profession,
      jurisdiction,
      content,
      issues: result.issues || [],
    });

    await prisma.complianceCheck.update({
      where: { id: complianceCheck.id },
      data: {
        status: "COMPLETED",
        score: result.score,
        issues: result.issues,
        llmProvider: "openai",
        llmModel: completion.model,
        tokensUsed: completion.usage?.total_tokens,
        latencyMs,
        rawResponse: result,
      },
    });

    await logAudit({
      userId: "test-user",
      action: "COMPLIANCE_CHECKED",
      entityType: "ComplianceCheck",
      entityId: complianceCheck.id,
      metadata: {
        postId,
        score: result.score,
        status: result.status,
        profession,
        jurisdiction,
      },
    });

    return NextResponse.json({
      success: true,
      checkId: complianceCheck.id,
      result: {
        score: result.score,
        status: result.status,
        issues: result.issues,
        summary: result.summary,
        disclaimers,
        latencyMs,
      },
    });

  } catch (error) {
    console.error("Compliance check error:", error);
    return NextResponse.json(
      {
        error: "Compliance check failed",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
