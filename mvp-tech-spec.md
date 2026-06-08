# MVP TECH SPEC: Platforma Compliance

**Data:** 2026-06-08  
**Rola:** Senior Full-Stack Developer (Next.js 14, TypeScript, Prisma, PostgreSQL)  
**Kontekst:** MVP platformy compliance dla ekspertów regulowanych

---

## 1. STRUKTURA REPO

```
compliance-platform/
│
├── .env                          # Zmienne środowiskowe (nie commituj!)
├── .env.example                  # Szablon zmiennych środowiskowych
├── .eslintrc.json               # Konfiguracja ESLint
├── .gitignore                   # Pliki ignorowane przez git
├── next.config.js               # Konfiguracja Next.js
├── package.json                 # Zależności i skrypty npm
├── postcss.config.js            # Konfiguracja PostCSS (Tailwind)
├── tailwind.config.ts           # Konfiguracja Tailwind CSS
├── tsconfig.json                # Konfiguracja TypeScript
│
├── prisma/
│   ├── schema.prisma            # Schemat bazy danych Prisma
│   ├── migrations/              # Automatyczne migracje bazy
│   └── seed.ts                  # Dane startowe (disclaimery, jurysdykcje)
│
├── public/                      # Statyczne pliki (obrazy, favicon)
│
├── src/
│   ├── app/                     # Next.js 14 App Router
│   │   ├── (auth)/              # Grupa routingu: strony autentykacji
│   │   │   ├── login/
│   │   │   │   └── page.tsx     # Strona logowania (magic link / Google)
│   │   │   └── register/
│   │   │       └── page.tsx     # Strona rejestracji
│   │   │
│   │   ├── (dashboard)/         # Grupa routingu: dashboard (wymaga auth)
│   │   │   ├── layout.tsx       # Layout dashboardu (sidebar + header)
│   │   │   ├── page.tsx         # Dashboard główny (lista postów)
│   │   │   ├── editor/
│   │   │   │   └── page.tsx     # Edytor treści (rich text)
│   │   │   ├── library/
│   │   │   │   └── page.tsx     # Biblioteka pre-approved content
│   │   │   ├── audit/
│   │   │   │   └── page.tsx     # Widok logów audytowych
│   │   │   └── settings/
│   │   │       └── page.tsx     # Ustawienia profilu i organizacji
│   │   │
│   │   ├── api/                 # API Routes (server-side endpoints)
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth]/
│   │   │   │       └── route.ts # NextAuth.js endpoint (OAuth, magic link)
│   │   │   ├── compliance-check/
│   │   │   │   └── route.ts     # POST: sprawdza compliance przez LLM
│   │   │   ├── posts/
│   │   │   │   └── route.ts     # CRUD postów (GET, POST, PATCH, DELETE)
│   │   │   ├── audit-logs/
│   │   │   │   └── route.ts     # GET: pobiera logi audytowe (paginacja)
│   │   │   └── webhooks/
│   │   │       └── stripe/      # Webhook Stripe (płatności)
│   │   │
│   │   ├── layout.tsx           # Root layout (providers, fonts, metadata)
│   │   ├── page.tsx             # Landing page (marketing)
│   │   └── globals.css          # Globalne style Tailwind
│   │
│   ├── components/              # Reużywalne komponenty React
│   │   ├── ui/                  # Komponenty UI (shadcn/ui)
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── toast.tsx        # Powiadomienia (toast)
│   │   │   └── ...
│   │   ├── editor/              # Komponenty edytora
│   │   │   ├── RichTextEditor.tsx    # Główny edytor (TipTap)
│   │   │   ├── CompliancePanel.tsx   # Panel wyników compliance-check
│   │   │   └── PublishButton.tsx     # Przycisk publikacji z logiką
│   │   ├── compliance/          # Komponenty compliance
│   │   │   ├── DisclaimerBadge.tsx   # Badge z disclaimerem
│   │   │   ├── RiskIndicator.tsx     # Wskaźnik ryzyka (zielony/żółty/czerwony)
│   │   │   └── JurisdictionSelector.tsx  # Wybór jurysdykcji
│   │   └── layout/              # Komponenty layoutu
│   │       ├── Sidebar.tsx
│   │       ├── Header.tsx
│   │       └── AuthGuard.tsx    # HOC: przekierowuje niezalogowanych
│   │
│   ├── lib/                     # Utilities, helpers, konfiguracja
│   │   ├── prisma.ts            # Singleton PrismaClient (dev vs prod)
│   │   ├── auth.ts              # Konfiguracja NextAuth.js
│   │   ├── openai.ts            # Konfiguracja klienta OpenAI
│   │   ├── compliance-engine.ts # Główny silnik compliance (LLM + rules)
│   │   ├── disclaimer-engine.ts # Dobieranie disclaimerów per branża/jurysdykcja
│   │   ├── audit-logger.ts      # Funkcje logowania audytowego
│   │   ├── utils.ts             # Pomocnicze funkcje (cn, formatDate)
│   │   └── constants.ts         # Stałe (jurysdykcje, branże, limity)
│   │
│   ├── hooks/                   # Custom React hooks
│   │   ├── useCompliance.ts     # Hook do compliance-check (mutacja, loading)
│   │   ├── useAuditLogs.ts      # Hook do pobierania logów (SWR / React Query)
│   │   └── useAuth.ts           # Hook do sprawdzania sesji
│   │
│   └── types/                   # Globalne typy TypeScript
│       ├── index.ts             # Główne typy (User, Post, ComplianceResult)
│       └── api.ts               # Typy dla API responses
│
└── docker-compose.yml           # PostgreSQL + pgAdmin lokalnie
```

---

## 2. SCHEMAT BAZY DANYCH (Prisma schema)

```prisma
// schema.prisma
// Platforma compliance dla ekspertów regulowanych

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ==================== UŻYTKOWNICY I ORGANIZACJE ====================

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  avatarUrl     String?   // URL zdjęcia profilowego (Google OAuth)
  
  // Profil zawodowy
  profession    Profession    // LAWYER | DOCTOR | FINANCIAL_ADVISOR
  licenseNumber String?       // Numer licencji (opcjonalny na start)
  jurisdiction  String        // Domyślna jurysdykcja (PL, US-NY, DE, UK)
  
  // Relacje
  organizationId String?
  organization   Organization? @relation(fields: [organizationId], references: [id])
  
  posts          Post[]
  complianceChecks ComplianceCheck[]
  auditLogs      AuditLog[]
  subscription   Subscription?
  
  // Auth (NextAuth.js)
  accounts       Account[]
  sessions       Session[]
  
  // Timestamps
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt
  
  @@index([email])
  @@index([organizationId])
  @@index([profession, jurisdiction])
}

model Organization {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique  // Unikalny identyfikator w URL
  
  // Ustawienia
  plan        Plan     @default(STARTER)  // STARTER | PROFESSIONAL | ENTERPRISE
  maxUsers    Int      @default(1)
  
  // Relacje
  users       User[]
  posts       Post[]
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@index([slug])
}

// ==================== POSTY I TREŚCI ====================

model Post {
  id          String   @id @default(cuid())
  title       String?
  content     String   // Treść posta (HTML z TipTap)
  plainText   String   // Wersja tekstowa do analizy LLM
  
  // Status
  status      PostStatus @default(DRAFT)  // DRAFT | PENDING_REVIEW | APPROVED | PUBLISHED | REJECTED
  
  // Compliance
  complianceScore   Int?     // 0-100 (wynik oceny)
  complianceStatus  ComplianceStatus? @default(NOT_CHECKED)  // NOT_CHECKED | PASS | WARNING | FAIL
  complianceResult  Json?    // Pełny wynik analizy (issues, suggestions, risks)
  
  // Disclaimery
  disclaimers       String[] // Lista ID disclaimerów dołączonych do posta
  finalContent      String?  // Treść z dołączonymi disclaimerami
  
  // Publikacja
  publishedAt       DateTime?
  linkedInPostId    String?  // ID posta na LinkedIn (po publikacji)
  
  // Relacje
  authorId          String
  author            User     @relation(fields: [authorId], references: [id])
  
  organizationId    String?
  organization      Organization? @relation(fields: [organizationId], references: [id])
  
  complianceChecks  ComplianceCheck[]
  auditLogs         AuditLog[]
  
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  @@index([authorId])
  @@index([status])
  @@index([organizationId])
  @@index([createdAt])
}

// ==================== COMPLIANCE CHECKS ====================

model ComplianceCheck {
  id          String   @id @default(cuid())
  
  // Wejście
  postId      String
  post        Post     @relation(fields: [postId], references: [id])
  
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  
  // Konfiguracja checku
  profession  Profession
  jurisdiction String
  
  // Wynik
  status      CheckStatus @default(PENDING)  // PENDING | COMPLETED | FAILED
  score       Int?         // 0-100
  issues      Json?        // [{ type, severity, message, rule, suggestion }]
  
  // LLM metadata
  llmProvider String?      // openai | anthropic | mistral
  llmModel    String?      // gpt-4o | claude-3.5 | mistral-large
  tokensUsed  Int?         // Zużyte tokeny
  latencyMs   Int?         // Czas odpowiedzi w ms
  
  // Raw response (do debugowania i audytu)
  rawResponse Json?
  
  createdAt   DateTime @default(now())
  
  @@index([postId])
  @@index([userId])
  @@index([createdAt])
}

// ==================== DISCLAIMERY ====================

model Disclaimer {
  id          String   @id @default(cuid())
  
  // Klasyfikacja
  profession  Profession           // Dla jakiej branży
  jurisdiction String               // Dla jakiej jurysdykcji (PL, US-NY, EU, UK)
  category    DisclaimerCategory   // GENERAL | INVESTMENT | MEDICAL | LEGAL | TAX
  
  // Treść
  label       String               // Krótka nazwa (np. "Past Performance")
  text        String               // Pełny tekst disclaimeru
  textEn      String?              // Wersja angielska (dla wielojęzyczności)
  
  // Kiedy stosować
  triggerRules Json?               // Reguły kiedy disclaimer się aktywuje
  // np. { keywords: ["zwrot", "zysk"], contentTypes: ["investment_advice"] }
  
  // Priorytet i wymagalność
  isRequired  Boolean  @default(false)  // Czy jest obligatoryjny
  priority    Int      @default(0)       // Kolejność wyświetlania
  
  // Status
  isActive    Boolean  @default(true)
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@unique([profession, jurisdiction, category, label])
  @@index([profession, jurisdiction])
  @@index([isActive])
}

// ==================== LOGI AUDYTOWE ====================

model AuditLog {
  id          String   @id @default(cuid())
  
  // Kto
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  
  // Co
  action      AuditAction  // POST_CREATED | POST_EDITED | COMPLIANCE_CHECKED | POST_PUBLISHED | DISCLAIMER_ADDED | LOGIN | LOGOUT
  entityType  String       // "Post" | "ComplianceCheck" | "User" | "Organization"
  entityId    String       // ID encji, której dotyczy akcja
  
  // Szczegóły
  metadata    Json?        // Dodatkowe dane (np. { postStatus: "PUBLISHED", platform: "LINKEDIN" })
  ipAddress   String?      // IP użytkownika
  userAgent   String?      // Browser user agent
  
  // Hash dla niezmienialności (opcjonalnie blockchain w przyszłości)
  previousHash String?     // Hash poprzedniego logu (łańcuch)
  currentHash  String      // Hash tego logu (SHA-256)
  
  // Relacje
  postId      String?
  post        Post?    @relation(fields: [postId], references: [id])
  
  createdAt   DateTime @default(now())
  
  @@index([userId])
  @@index([entityType, entityId])
  @@index([action])
  @@index([createdAt])
  @@index([currentHash])
}

// ==================== SUBSKRYPCJE ====================

model Subscription {
  id          String   @id @default(cuid())
  
  userId      String   @unique
  user        User     @relation(fields: [userId], references: [id])
  
  // Plan
  plan        Plan     @default(STARTER)
  status      SubscriptionStatus @default(TRIALING)  // TRIALING | ACTIVE | PAST_DUE | CANCELLED | EXPIRED
  
  // Płatności (Stripe)
  stripeCustomerId     String?  @unique
  stripeSubscriptionId String?  @unique
  stripePriceId        String?
  
  // Okres
  currentPeriodStart   DateTime?
  currentPeriodEnd     DateTime?
  
  // Limity
  maxPostsPerMonth     Int      @default(50)
  usedPostsThisMonth   Int      @default(0)
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@index([stripeCustomerId])
  @@index([status])
}

// ==================== NEXTAUTH.JS MODELE ====================

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

// ==================== ENUMY ====================

enum Profession {
  LAWYER
  DOCTOR
  FINANCIAL_ADVISOR
}

enum Plan {
  STARTER
  PROFESSIONAL
  ENTERPRISE
}

enum PostStatus {
  DRAFT
  PENDING_REVIEW
  APPROVED
  PUBLISHED
  REJECTED
}

enum ComplianceStatus {
  NOT_CHECKED
  PASS
  WARNING
  FAIL
}

enum CheckStatus {
  PENDING
  COMPLETED
  FAILED
}

enum DisclaimerCategory {
  GENERAL
  INVESTMENT
  MEDICAL
  LEGAL
  TAX
}

enum AuditAction {
  POST_CREATED
  POST_EDITED
  COMPLIANCE_CHECKED
  POST_PUBLISHED
  DISCLAIMER_ADDED
  LOGIN
  LOGOUT
  USER_UPDATED
  ORGANIZATION_UPDATED
}

enum SubscriptionStatus {
  TRIALING
  ACTIVE
  PAST_DUE
  CANCELLED
  EXPIRED
}
```

---

## 3. KLUCZOWE PLIKI STARTOWE

### 3a. /app/api/compliance-check/route.ts

```typescript
// src/app/api/compliance-check/route.ts
// Endpoint: POST /api/compliance-check
// Przyjmuje treść posta, wysyła do OpenAI, zwraca wynik compliance

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { openai } from "@/lib/openai";
import { logAudit } from "@/lib/audit-logger";
import { selectDisclaimers } from "@/lib/disclaimer-engine";

// Prompt systemowy dla LLM — sprawdza compliance pod kątem regulacji
const SYSTEM_PROMPT = `Jesteś ekspertem ds. compliance dla profesji regulowanych w Polsce.
Twoim zadaniem jest analiza treści pod kątem zgodności z:
- Kodeksem Etyki Radcy Prawnego (dla radców)
- Kodeksem Etyki Adwokackiej (dla adwokatów)
- Przepisami KNF (dla doradców finansowych)
- RODO (dla wszystkich)

ZASADY ANALIZY:
1. Sprawdź, czy treść zawiera zakazane elementy (obietnice, agresywna reklama, poufność)
2. Oceń ryzyko na skali 0-100 (0 = bezpieczne, 100 = wysokie ryzyko)
3. Zidentyfikuj konkretne problemy z przypisaniem do artykułów/regulacji
4. Zasugeruj poprawki

ZWRÓĆ WYNIK W FORMIE JSON:
{
  "score": number (0-100),
  "status": "PASS" | "WARNING" | "FAIL",
  "issues": [
    {
      "type": "PROMISE" | "TESTIMONIAL" | "MISLEADING" | "CONFIDENTIALITY" | "AGGRESSIVE_ADVERTISING",
      "severity": "LOW" | "MEDIUM" | "HIGH",
      "message": "opis problemu po polsku",
      "rule": "odwołanie do konkretnego artykułu/przepisu",
      "suggestion": "jak poprawić"
    }
  ],
  "summary": "krótkie podsumowanie po polsku"
}

WAŻNE: Nie zalecaj konkretnych działań prawnych. Wskazuj tylko potencjalne problemy.`;

export async function POST(request: NextRequest) {
  try {
    // 1. Autentykacja
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Pobierz użytkownika z bazy
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { subscription: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 3. Sprawdź limity subskrypcji
    if (user.subscription && user.subscription.usedPostsThisMonth >= user.subscription.maxPostsPerMonth) {
      return NextResponse.json(
        { error: "Monthly post limit reached. Upgrade your plan." },
        { status: 403 }
      );
    }

    // 4. Parsuj body
    const body = await request.json();
    const { postId, content, profession, jurisdiction } = body;

    if (!content || !profession || !jurisdiction) {
      return NextResponse.json(
        { error: "Missing required fields: content, profession, jurisdiction" },
        { status: 400 }
      );
    }

    // 5. Utwórz rekord compliance check (PENDING)
    const complianceCheck = await prisma.complianceCheck.create({
      data: {
        postId,
        userId: user.id,
        profession,
        jurisdiction,
        status: "PENDING",
      },
    });

    // 6. Wyślij do OpenAI
    const startTime = Date.now();
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Tańszy model na MVP; upgrade do gpt-4o na produkcję
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `Branża: ${profession}\nJurysdykcja: ${jurisdiction}\n\nTreść do analizy:\n${content}` },
      ],
      response_format: { type: "json_object" },
      temperature: 0.1, // Niska temperatura = bardziej deterministyczne wyniki
      max_tokens: 2000,
    });

    const latencyMs = Date.now() - startTime;
    const aiResponse = completion.choices[0]?.message?.content;

    if (!aiResponse) {
      throw new Error("Empty response from LLM");
    }

    // 7. Parsuj wynik
    let result;
    try {
      result = JSON.parse(aiResponse);
    } catch {
      // Fallback: jeśli LLM nie zwrócił poprawnego JSON
      result = {
        score: 50,
        status: "WARNING",
        issues: [{
          type: "MISLEADING",
          severity: "MEDIUM",
          message: "Nie udało się przeprowadzić pełnej analizy. Sprawdź treść ręcznie.",
          rule: "N/A",
          suggestion: "Skonsultuj treść z compliance officer."
        }],
        summary: "Analiza częściowa — wymaga weryfikacji człowieka."
      };
    }

    // 8. Dobierz disclaimery na podstawie wyniku
    const disclaimers = await selectDisclaimers({
      profession,
      jurisdiction,
      content,
      issues: result.issues || [],
    });

    // 9. Zaktualizuj rekord compliance check
    const updatedCheck = await prisma.complianceCheck.update({
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

    // 10. Zaktualizuj post (jeśli istnieje)
    if (postId) {
      await prisma.post.update({
        where: { id: postId },
        data: {
          complianceScore: result.score,
          complianceStatus: result.status,
          complianceResult: result,
          disclaimers: disclaimers.map((d) => d.id),
        },
      });
    }

    // 11. Zaloguj audyt
    await logAudit({
      userId: user.id,
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

    // 12. Zwróć wynik
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
    
    // Loguj błąd jako failed check
    return NextResponse.json(
      { 
        error: "Compliance check failed",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
```

---

### 3b. /lib/disclaimer-engine.ts

```typescript
// src/lib/disclaimer-engine.ts
// Silnik dobierający disclaimery na podstawie branży, jurysdykcji i treści

import { prisma } from "./prisma";
import { Profession, DisclaimerCategory } from "@prisma/client";

interface DisclaimerSelectionParams {
  profession: Profession;
  jurisdiction: string;
  content: string;
  issues: Array<{
    type: string;
    severity: string;
    message: string;
    rule: string;
    suggestion: string;
  }>;
}

interface SelectedDisclaimer {
  id: string;
  label: string;
  text: string;
  textEn?: string | null;
  isRequired: boolean;
  category: DisclaimerCategory;
}

/**
 * Dobiera disclaimery na podstawie branży, jurysdykcji i wykrytych problemów
 */
export async function selectDisclaimers(
  params: DisclaimerSelectionParams
): Promise<SelectedDisclaimer[]> {
  const { profession, jurisdiction, content, issues } = params;

  // 1. Pobierz wszystkie aktywne disclaimery dla danej branży i jurysdykcji
  const disclaimers = await prisma.disclaimer.findMany({
    where: {
      profession,
      jurisdiction: {
        in: [jurisdiction, "EU", "GLOBAL"], // Fallback: EU i globalne
      },
      isActive: true,
    },
    orderBy: {
      priority: "asc",
    },
  });

  const selected: SelectedDisclaimer[] = [];
  const contentLower = content.toLowerCase();

  for (const disclaimer of disclaimers) {
    let shouldInclude = false;

    // 2. Sprawdź reguły triggerów (jeśli istnieją)
    if (disclaimer.triggerRules) {
      const rules = disclaimer.triggerRules as {
        keywords?: string[];
        contentTypes?: string[];
        always?: boolean;
      };

      // Reguła "always" — zawsze dołączaj
      if (rules.always) {
        shouldInclude = true;
      }

      // Sprawdź keywords w treści
      if (rules.keywords && rules.keywords.length > 0) {
        const hasKeyword = rules.keywords.some((keyword: string) =>
          contentLower.includes(keyword.toLowerCase())
        );
        if (hasKeyword) shouldInclude = true;
      }

      // Sprawdź typy treści na podstawie issues
      if (rules.contentTypes && rules.contentTypes.length > 0) {
        const issueTypes = issues.map((i) => i.type.toLowerCase());
        const hasMatchingType = rules.contentTypes.some((type: string) =>
          issueTypes.includes(type.toLowerCase())
        );
        if (hasMatchingType) shouldInclude = true;
      }
    } else {
      // Jeśli nie ma reguł triggerów, dołącz domyślnie (dla wymaganych)
      shouldInclude = disclaimer.isRequired;
    }

    // 3. Dodaj do listy jeśli pasuje
    if (shouldInclude) {
      selected.push({
        id: disclaimer.id,
        label: disclaimer.label,
        text: disclaimer.text,
        textEn: disclaimer.textEn,
        isRequired: disclaimer.isRequired,
        category: disclaimer.category,
      });
    }
  }

  // 4. Zawsze dołączaj wymagane disclaimery (nawet jeśli nie pasują reguły)
  const requiredDisclaimers = disclaimers.filter((d) => d.isRequired);
  for (const req of requiredDisclaimers) {
    const alreadyIncluded = selected.some((s) => s.id === req.id);
    if (!alreadyIncluded) {
      selected.push({
        id: req.id,
        label: req.label,
        text: req.text,
        textEn: req.textEn,
        isRequired: req.isRequired,
        category: req.category,
      });
    }
  }

  // 5. Usuń duplikaty i posortuj
  const unique = selected.filter(
    (item, index, self) => index === self.findIndex((t) => t.id === item.id)
  );

  return unique.sort((a, b) => {
    // Wymagane na początku, potem alfabetycznie
    if (a.isRequired && !b.isRequired) return -1;
    if (!a.isRequired && b.isRequired) return 1;
    return a.label.localeCompare(b.label);
  });
}

/**
 * Generuje finalną treść posta z dołączonymi disclaimerami
 */
export function appendDisclaimers(
  content: string,
  disclaimers: SelectedDisclaimer[]
): string {
  if (disclaimers.length === 0) return content;

  const separator = "\n\n---\n\n";
  const disclaimerText = disclaimers
    .map((d) => `⚠️ ${d.text}`)
    .join("\n\n");

  return `${content}${separator}${disclaimerText}`;
}

/**
 * Inicjalizacja bazy disclaimerów (seed data)
 */
export async function seedDisclaimers(): Promise<void> {
  const seedData = [
    // PRAWNICY — POLSKA
    {
      profession: Profession.LAWYER,
      jurisdiction: "PL",
      category: DisclaimerCategory.GENERAL,
      label: "Nie jest poradą prawną",
      text: "Powyższa treść ma charakter wyłącznie informacyjny i nie stanowi porady prawnej. Informacje zawarte w niniejszym wpisie nie mogą być podstawą do podjęcia jakichkolwiek decyzji prawnych ani zastąpić konsultacji z licencjonowanym prawnikiem.",
      textEn: "This content is for informational purposes only and does not constitute legal advice. The information contained herein cannot be the basis for any legal decisions and does not replace consultation with a licensed attorney.",
      isRequired: true,
      priority: 1,
      triggerRules: { always: true },
    },
    {
      profession: Profession.LAWYER,
      jurisdiction: "PL",
      category: DisclaimerCategory.GENERAL,
      label: "Reklama",
      text: "Treść niniejsza stanowi materiał reklamowy kancelarii prawnej na podstawie art. 18 ustawy o radcach prawnych / art. 17 ustawy o adwokaturze.",
      textEn: "This content constitutes advertising material of a law firm pursuant to Art. 18 of the Legal Advisers Act / Art. 17 of the Bar Act.",
      isRequired: false,
      priority: 2,
      triggerRules: { keywords: ["kancelaria", "usługi prawne", "pomoc prawna"] },
    },
    // DORADCY FINANSOWI — POLSKA (KNF)
    {
      profession: Profession.FINANCIAL_ADVISOR,
      jurisdiction: "PL",
      category: DisclaimerCategory.INVESTMENT,
      label: "Nie jest rekomendacją inwestycyjną",
      text: "Powyższa treść nie stanowi rekomendacji inwestycyjnej w rozumieniu ustawy o obrocie instrumentami finansowymi. Informacje mają charakter wyłącznie edukacyjny i nie mogą być traktowane jako podstawa do podejmowania decyzji inwestycyjnych.",
      textEn: "This content does not constitute an investment recommendation within the meaning of the Act on Trading in Financial Instruments. The information is for educational purposes only and cannot be treated as a basis for making investment decisions.",
      isRequired: true,
      priority: 1,
      triggerRules: { always: true },
    },
    {
      profession: Profession.FINANCIAL_ADVISOR,
      jurisdiction: "PL",
      category: DisclaimerCategory.INVESTMENT,
      label: "Ryzyko inwestycyjne",
      text: "Inwestowanie na rynkach finansowych wiąże się z ryzykiem utraty kapitału. Wyniki osiągnięte w przeszłości nie gwarantują podobnych wyników w przyszłości.",
      textEn: "Investing in financial markets involves the risk of capital loss. Past performance does not guarantee similar results in the future.",
      isRequired: false,
      priority: 2,
      triggerRules: { keywords: ["inwestycja", "zwrot", "zysk", "fundusz", "akcja", "obligacja"] },
    },
    // DORADCY FINANSOWI — USA (FINRA)
    {
      profession: Profession.FINANCIAL_ADVISOR,
      jurisdiction: "US",
      category: DisclaimerCategory.INVESTMENT,
      label: "Not investment advice (FINRA)",
      text: "This content is for educational and informational purposes only and does not constitute investment advice, an offer to sell, or a solicitation of an offer to buy any securities. Past performance is not indicative of future results.",
      textEn: "This content is for educational and informational purposes only and does not constitute investment advice, an offer to sell, or a solicitation of an offer to buy any securities. Past performance is not indicative of future results.",
      isRequired: true,
      priority: 1,
      triggerRules: { always: true },
    },
    {
      profession: Profession.FINANCIAL_ADVISOR,
      jurisdiction: "US",
      category: DisclaimerCategory.INVESTMENT,
      label: "FINRA 2210(d)(1)",
      text: "No statement within this communication should be construed as a recommendation to purchase or sell a security or to provide investment advice. All investing involves risk, including the potential loss of principal.",
      textEn: "No statement within this communication should be construed as a recommendation to purchase or sell a security or to provide investment advice. All investing involves risk, including the potential loss of principal.",
      isRequired: false,
      priority: 2,
      triggerRules: { keywords: ["buy", "sell", "recommend", "return", "performance"] },
    },
    // LEKARZE — POLSKA
    {
      profession: Profession.DOCTOR,
      jurisdiction: "PL",
      category: DisclaimerCategory.MEDICAL,
      label: "Nie jest poradą medyczną",
      text: "Powyższa treść ma charakter wyłącznie edukacyjny i informacyjny. Nie stanowi porady medycznej, diagnozy ani zalecenia leczenia. W przypadku jakichkolwiek problemów ze zdrowiem należy skonsultować się z lekarzem.",
      textEn: "This content is for educational and informational purposes only. It does not constitute medical advice, diagnosis, or treatment recommendation. For any health concerns, please consult a physician.",
      isRequired: true,
      priority: 1,
      triggerRules: { always: true },
    },
    {
      profession: Profession.DOCTOR,
      jurisdiction: "PL",
      category: DisclaimerCategory.MEDICAL,
      label: "Reklama usług medycznych",
      text: "Treść niniejsza stanowi materiał informacyjny placówki medycznej na podstawie przepisów ustawy o działalności leczniczej.",
      textEn: "This content constitutes informational material of a medical facility pursuant to the Act on Medical Activity.",
      isRequired: false,
      priority: 2,
      triggerRules: { keywords: ["klinika", "gabinet", "leczenie", "terapia", "konsultacja"] },
    },
    // GLOBAL / EU (fallback)
    {
      profession: Profession.LAWYER,
      jurisdiction: "EU",
      category: DisclaimerCategory.GENERAL,
      label: "AI-Generated Content Disclosure",
      text: "This content was reviewed with AI assistance. All outputs should be independently verified by a qualified licensed professional before reliance or action.",
      textEn: "This content was reviewed with AI assistance. All outputs should be independently verified by a qualified licensed professional before reliance or action.",
      isRequired: true,
      priority: 99,
      triggerRules: { always: true },
    },
  ];

  for (const data of seedData) {
    await prisma.disclaimer.upsert({
      where: {
        profession_jurisdiction_category_label: {
          profession: data.profession,
          jurisdiction: data.jurisdiction,
          category: data.category,
          label: data.label,
        },
      },
      update: data,
      create: data,
    });
  }

  console.log(`Seeded ${seedData.length} disclaimers`);
}
```

---

### 3c. /lib/audit-logger.ts

```typescript
// src/lib/audit-logger.ts
// System logowania audytowego — niezmienialne logi każdej akcji

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

/**
 * Tworzy hash SHA-256 dla logu audytowego
 * Łączy dane logu + hash poprzedniego logu = łańcuch (simple blockchain concept)
 */
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

/**
 * Zapisuje log audytowy do bazy
 * Każdy log zawiera hash poprzedniego = łańcuch niezmienialny
 */
export async function logAudit(params: AuditLogParams): Promise<void> {
  try {
    // 1. Znajdź ostatni log tego użytkownika (d łańcucha)
    const lastLog = await prisma.auditLog.findFirst({
      where: { userId: params.userId },
      orderBy: { createdAt: "desc" },
      select: { currentHash: true },
    });

    const previousHash = lastLog?.currentHash || null;
    const timestamp = new Date().toISOString();

    // 2. Utwórz hash dla tego logu
    const currentHash = createAuditHash({
      userId: params.userId,
      action: params.action,
      entityType: params.entityType,
      entityId: params.entityId,
      timestamp,
      metadata: params.metadata ? JSON.stringify(params.metadata) : undefined,
      previousHash,
    });

    // 3. Zapisz do bazy
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
    // Krytyczne: nie możemy pozwolić, żeby błąd logowania zatrzymał aplikację
    // Logujemy błąd logowania do konsoli i zewnętrznego systemu (np. Sentry)
    console.error("[AUDIT LOG ERROR] Failed to create audit log:", {
      error: error instanceof Error ? error.message : "Unknown error",
      params: {
        userId: params.userId,
        action: params.action,
        entityType: params.entityType,
        entityId: params.entityId,
      },
    });

    // TODO: Wyslij alert do Sentry / PagerDuty / Slack
    // await sendAlertToSentry({ ... });
  }
}

/**
 * Pobiera logi audytowe z paginacją
 */
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

/**
 * Weryfikuje integralność łańcucha logów audytowych
 * Sprawdza, czy żaden log nie został zmieniony
 */
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

    // Sprawdź, czy previousHash pasuje do poprzedniego logu
    if (i > 0) {
      const previousLog = logs[i - 1];
      if (log.previousHash !== previousLog.currentHash) {
        return { valid: false, checked: i, firstInvalidIndex: i };
      }
    }

    // Przelicz hash i porównaj
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
```

---

## 4. ZMIENNE ŚRODOWISKOWE (.env.example)

```bash
# ============================================================
# PLATFORMA COMPLIANCE — ZMIENNE ŚRODOWISKOWE
# ============================================================
# Skopiuj ten plik jako .env i uzupełnij wartości
# NIGDY nie commituj .env do repozytorium!
# ============================================================

# -------------------- BAZA DANYCH --------------------
# PostgreSQL connection string
# Format: postgresql://USER:PASSWORD@HOST:PORT/DATABASE
# Dla lokalnego developmentu (Docker):
DATABASE_URL="postgresql://compliance_user:compliance_pass@localhost:5432/compliance_db?schema=public"

# Dla produkcji (Supabase, Railway, AWS RDS):
# DATABASE_URL="postgresql://..."

# -------------------- NEXTAUTH.JS --------------------
# Sekret do szyfrowania tokenów JWT (wygeneruj: openssl rand -base64 32)
NEXTAUTH_SECRET="your-super-secret-key-min-32-chars-long"

# URL aplikacji (dla redirectów OAuth)
NEXTAUTH_URL="http://localhost:3000"
# Produkcja:
# NEXTAUTH_URL="https://twoja-domena.pl"

# -------------------- GOOGLE OAUTH --------------------
# Utwórz credentials w Google Cloud Console:
# https://console.cloud.google.com/apis/credentials
GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# -------------------- OPENAI API --------------------
# Klucz API z platform.openai.com
# Użyj Enterprise account z DPA + Zero Data Retention dla produkcji
OPENAI_API_KEY="sk-..."

# Model domyślny (tańszy na dev, gpt-4o na prod)
OPENAI_MODEL="gpt-4o-mini"
# OPENAI_MODEL="gpt-4o"

# -------------------- STRIPE (płatności) --------------------
# Test keys ze Stripe Dashboard: https://dashboard.stripe.com/test/apikeys
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."

# Webhook secret (stripe listen --forward-to localhost:3000/api/webhooks/stripe)
STRIPE_WEBHOOK_SECRET="whsec_..."

# Ceny produktów Stripe (Price IDs)
STRIPE_PRICE_STARTER="price_..."
STRIPE_PRICE_PROFESSIONAL="price_..."
STRIPE_PRICE_ENTERPRISE="price_..."

# -------------------- LINKEDIN API --------------------
# OAuth 2.0 credentials z LinkedIn Developer Portal:
# https://www.linkedin.com/developers/apps
LINKEDIN_CLIENT_ID="your-linkedin-client-id"
LINKEDIN_CLIENT_SECRET="your-linkedin-client-secret"

# -------------------- REDIS (opcjonalnie — cache + rate limit) --------------------
# Redis URL (Upstash, Redis Cloud, lub lokalnie)
# REDIS_URL="redis://localhost:6379"
# REDIS_URL="rediss://...upstash.io"

# -------------------- SENTRY (monitoring błędów) --------------------
# DSN z Sentry project settings
# SENTRY_DSN="https://...sentry.io/..."

# -------------------- APP CONFIG --------------------
# Środowisko: development | staging | production
NODE_ENV="development"

# Port (Next.js domyślnie 3000)
PORT="3000"

# Maksymalny rozmiar treści posta (znaki)
MAX_POST_LENGTH="5000"

# Domyślny okres trial (dni)
TRIAL_DAYS="14"
```

---

## 5. KOMENDY STARTOWE

### Krok 0: Wymagania wstępne

```bash
# Sprawdź wersje
node -v    # >= 18.17.0
npm -v     # >= 9.0.0

# Jeśli nie masz Node.js:
# https://nodejs.org/ (LTS version)
```

---

### Krok 1: Klonowanie i instalacja

```bash
# 1.1 Sklonuj repo (lub utwórz nowe)
git clone https://github.com/twoj-user/compliance-platform.git
cd compliance-platform

# 1.2 Zainstaluj zależności
npm install

# 1.3 Skopiuj zmienne środowiskowe
cp .env.example .env

# 1.4 Edytuj .env — uzupełnij wszystkie wymagane klucze
# Szczególnie: DATABASE_URL, NEXTAUTH_SECRET, OPENAI_API_KEY
```

---

### Krok 2: Baza danych (Docker — lokalnie)

```bash
# 2.1 Uruchom PostgreSQL w Docker (jeśli nie masz zainstalowanej)
docker-compose up -d

# 2.2 Sprawdź czy działa
docker ps
# Powinien pokazać: compliance-postgres

# 2.3 Wygeneruj Prisma Client
npx prisma generate

# 2.4 Uruchom migracje (tworzy tabele w bazie)
npx prisma migrate dev --name init

# 2.5 Opcjonalnie: otwórz Prisma Studio (GUI do bazy)
npx prisma studio
# Dostępne pod: http://localhost:5555
```

---

### Krok 3: Seedy (dane startowe)

```bash
# 3.1 Uruchom skrypt seedujący (disclaimery, jurysdykcje)
npx prisma db seed

# Lub bezpośrednio:
# ts-node prisma/seed.ts
```

**Prisma seed.ts:**

```typescript
// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import { seedDisclaimers } from "../src/lib/disclaimer-engine";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Seed disclaimers
  await seedDisclaimers();

  // Seed przykładowego użytkownika (dev only)
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

  console.log(`✅ Seeded dev user: ${devUser.email}`);
  console.log("🌱 Seed complete!");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

---

### Krok 4: Uruchomienie development

```bash
# 4.1 Dev server (hot reload)
npm run dev

# Aplikacja dostępna pod: http://localhost:3000
# API: http://localhost:3000/api/...
```

---

### Krok 5: Weryfikacja (curl / Postman / browser)

```bash
# 5.1 Sprawdź czy API działa
curl http://localhost:3000/api/health
# Oczekiwana odpowiedź: { "status": "ok" }

# 5.2 Test compliance-check (wymaga autentykacji — najpierw zaloguj się przez UI)
# Lub użyj dev usera z seeda

curl -X POST http://localhost:3000/api/compliance-check \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Nasza kancelaria gwarantuje wygraną w każdej sprawie! Skontaktuj się z nami już dziś.",
    "profession": "LAWYER",
    "jurisdiction": "PL"
  }'

# Oczekiwana odpowiedź:
# {
#   "success": true,
#   "result": {
#     "score": 85,
#     "status": "FAIL",
#     "issues": [...],
#     "disclaimers": [...]
#   }
# }
```

---

### Krok 6: Build i produkcja

```bash
# 6.1 Type check
npm run type-check

# 6.2 Lint
npm run lint

# 6.3 Build
npm run build

# 6.4 Start (produkcja)
npm start
```

---

## SKRÓT KOMEND (cheatsheet)

```bash
# INSTALACJA
npm install
cp .env.example .env

# BAZA DANYCH
docker-compose up -d          # Start PostgreSQL
npx prisma generate           # Generuj Prisma Client
npx prisma migrate dev        # Migracje
npx prisma db seed            # Dane startowe
npx prisma studio             # GUI bazy (localhost:5555)
npx prisma migrate reset      # Reset bazy (UWAGA: usuwa dane!)

# DEVELOPMENT
npm run dev                   # Dev server (localhost:3000)
npm run type-check            # TypeScript check
npm run lint                  # ESLint
npm run lint -- --fix         # Auto-fix ESLint

# BUILD
npm run build                 # Production build
npm start                     # Start production

# TESTY (dodaj później)
npm test                      # Jest
npm run test:e2e              # Playwright
```

---

## STACK TECHNOLOGICZNY (podsumowanie)

| Warstwa | Technologia | Uzasadnienie |
|---------|-------------|--------------|
| Framework | Next.js 14 (App Router) | Full-stack, SSR, API routes, największy ekosystem |
| Język | TypeScript | Type safety, lepsza DX, mniej bugów |
| Styling | Tailwind CSS + shadcn/ui | Szybki development, spójny design system |
| Baza danych | PostgreSQL + Prisma | Relacyjna, skalowalna, type-safe ORM |
| Auth | NextAuth.js | OAuth (Google), magic links, session management |
| AI / LLM | OpenAI API (GPT-4o-mini) | Najlepsza jakość/cena, łatwa integracja |
| Płatności | Stripe | Standard branżowy, subskrypcje, webhooks |
| Hosting | Vercel | Najlepszy dla Next.js, edge functions, CI/CD |

---

*Specyfikacja techniczna MVP przygotowana do wdrożenia. Szacunkowy czas do pierwszego działającego endpointu: 2-3 dni (przy znajomości Next.js).*
