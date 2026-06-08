import { PrismaClient } from "@prisma/client";
import { seedDisclaimers } from "../src/lib/disclaimer-engine";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seed...");

  await seedDisclaimers();

  const devUser = await prisma.user.upsert({
    where: { email: "dev@compliance.local" },
    update: {},
    create: {
      email: "dev@compliance.local",
      name: "Dev User",
      profession: "LAWYER",
      jurisdiction: "PL",
    },
  });

  console.log(`Seeded dev user: ${devUser.email}`);
  console.log("Seed complete!");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
