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

export async function selectDisclaimers(
  params: DisclaimerSelectionParams
): Promise<SelectedDisclaimer[]> {
  const { profession, jurisdiction, content, issues } = params;

  const disclaimers = await prisma.disclaimer.findMany({
    where: {
      profession,
      jurisdiction: {
        in: [jurisdiction, "EU", "GLOBAL"],
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

    if (disclaimer.triggerRules) {
      const rules = disclaimer.triggerRules as {
        keywords?: string[];
        contentTypes?: string[];
        always?: boolean;
      };

      if (rules.always) {
        shouldInclude = true;
      }

      if (rules.keywords && rules.keywords.length > 0) {
        const hasKeyword = rules.keywords.some((keyword: string) =>
          contentLower.includes(keyword.toLowerCase())
        );
        if (hasKeyword) shouldInclude = true;
      }

      if (rules.contentTypes && rules.contentTypes.length > 0) {
        const issueTypes = issues.map((i) => i.type.toLowerCase());
        const hasMatchingType = rules.contentTypes.some((type: string) =>
          issueTypes.includes(type.toLowerCase())
        );
        if (hasMatchingType) shouldInclude = true;
      }
    } else {
      shouldInclude = disclaimer.isRequired;
    }

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

  const unique = selected.filter(
    (item, index, self) => index === self.findIndex((t) => t.id === item.id)
  );

  return unique.sort((a, b) => {
    if (a.isRequired && !b.isRequired) return -1;
    if (!a.isRequired && b.isRequired) return 1;
    return a.label.localeCompare(b.label);
  });
}

export function appendDisclaimers(
  content: string,
  disclaimers: SelectedDisclaimer[]
): string {
  if (disclaimers.length === 0) return content;

  const separator = "\n\n---\n\n";
  const disclaimerText = disclaimers.map((d) => `⚠️ ${d.text}`).join("\n\n");

  return `${content}${separator}${disclaimerText}`;
}

export async function seedDisclaimers(): Promise<void> {
  const seedData = [
    {
      profession: Profession.LAWYER,
      jurisdiction: "PL",
      category: DisclaimerCategory.GENERAL,
      label: "Nie jest porada prawna",
      text: "Powyzsza tresc ma charakter wylacznie informacyjny i nie stanowi porady prawnej. Informacje zawarte w niniejszym wpisie nie moga byc podstawa do podjecia jakichkolwiek decyzji prawnych ani zastapic konsultacji z licencjonowanym prawnikiem.",
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
      text: "Tresc niniejsza stanowi material reklamowy kancelarii prawnej na podstawie art. 18 ustawy o radcach prawnych / art. 17 ustawy o adwokaturze.",
      textEn: "This content constitutes advertising material of a law firm pursuant to Art. 18 of the Legal Advisers Act / Art. 17 of the Bar Act.",
      isRequired: false,
      priority: 2,
      triggerRules: { keywords: ["kancelaria", "uslugi prawne", "pomoc prawna"] },
    },
    {
      profession: Profession.FINANCIAL_ADVISOR,
      jurisdiction: "PL",
      category: DisclaimerCategory.INVESTMENT,
      label: "Nie jest rekomendacja inwestycyjna",
      text: "Powyzsza tresc nie stanowi rekomendacji inwestycyjnej w rozumieniu ustawy o obrocie instrumentami finansowymi. Informacje maja charakter wylacznie edukacyjny i nie moga byc traktowane jako podstawa do podejmowania decyzji inwestycyjnych.",
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
      text: "Inwestowanie na rynkach finansowych wiaze sie z ryzykiem utraty kapitalu. Wyniki osiagniete w przeszlosci nie gwarantuja podobnych wynikow w przyszlosci.",
      textEn: "Investing in financial markets involves the risk of capital loss. Past performance does not guarantee similar results in the future.",
      isRequired: false,
      priority: 2,
      triggerRules: { keywords: ["inwestycja", "zwrot", "zysk", "fundusz", "akcja", "obligacja"] },
    },
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
      profession: Profession.DOCTOR,
      jurisdiction: "PL",
      category: DisclaimerCategory.MEDICAL,
      label: "Nie jest porada medyczna",
      text: "Powyzsza tresc ma charakter wylacznie edukacyjny i informacyjny. Nie stanowi porady medycznej, diagnozy ani zalecenia leczenia. W przypadku jakichkolwiek problemow ze zdrowiem nalezy skonsultowac sie z lekarzem.",
      textEn: "This content is for educational and informational purposes only. It does not constitute medical advice, diagnosis, or treatment recommendation. For any health concerns, please consult a physician.",
      isRequired: true,
      priority: 1,
      triggerRules: { always: true },
    },
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
