export const PROFESSIONS = [
  { value: "LAWYER", label: "Prawnik / Radca prawny / Adwokat" },
  { value: "DOCTOR", label: "Lekarz" },
  { value: "FINANCIAL_ADVISOR", label: "Doradca finansowy" },
] as const;

export const JURISDICTIONS = [
  { value: "PL", label: "Polska" },
  { value: "US", label: "USA (FINRA/SEC)" },
  { value: "UK", label: "Wielka Brytania (FCA)" },
  { value: "DE", label: "Niemcy (BaFin)" },
  { value: "EU", label: "Unia Europejska (MiFID II)" },
] as const;

export const MAX_POST_LENGTH = parseInt(
  process.env.MAX_POST_LENGTH || "5000",
  10
);

export const TRIAL_DAYS = parseInt(process.env.TRIAL_DAYS || "14", 10);
