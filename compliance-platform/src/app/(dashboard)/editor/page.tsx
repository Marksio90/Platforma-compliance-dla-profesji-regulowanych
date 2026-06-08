"use client";

import { useState } from "react";

interface ComplianceIssue {
  type: string;
  severity: string;
  message: string;
  rule: string;
  suggestion: string;
}

interface ComplianceResult {
  score: number;
  status: string;
  issues: ComplianceIssue[];
  summary: string;
  disclaimers: Array<{
    id: string;
    label: string;
    text: string;
    isRequired: boolean;
  }>;
  latencyMs: number;
}

export default function EditorPage() {
  const [content, setContent] = useState("");
  const [profession, setProfession] = useState("LAWYER");
  const [jurisdiction, setJurisdiction] = useState("PL");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ComplianceResult | null>(null);
  const [error, setError] = useState("");

  const handleCheck = async () => {
    if (!content.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/compliance-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, profession, jurisdiction }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Blad sprawdzania compliance");
        return;
      }

      setResult(data.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Nieznany blad");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PASS":
        return "text-green-600 bg-green-50 border-green-200";
      case "WARNING":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "FAIL":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-slate-600 bg-slate-50 border-slate-200";
    }
  };

  const getScoreColor = (score: number) => {
    if (score <= 30) return "text-green-600";
    if (score <= 70) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Edytor tresci
        </h1>
        <p className="text-slate-600 mb-8">
          Napisz post, a AI sprawdzi go pod katem compliance w 30 sekund.
        </p>

        {/* Konfiguracja */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 mb-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Branza
              </label>
              <select
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="LAWYER">Prawnik / Radca prawny</option>
                <option value="DOCTOR">Lekarz</option>
                <option value="FINANCIAL_ADVISOR">
                  Doradca finansowy
                </option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Jurydykcja
              </label>
              <select
                value={jurisdiction}
                onChange={(e) => setJurisdiction(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="PL">Polska</option>
                <option value="US">USA</option>
                <option value="UK">Wielka Brytania</option>
                <option value="DE">Niemcy</option>
                <option value="EU">Unia Europejska</option>
              </select>
            </div>
          </div>
        </div>

        {/* Edytor */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Tresc posta
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Wpisz tresc swojego posta na LinkedIn..."
            rows={8}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          />
          <div className="flex justify-between items-center mt-3">
            <span className="text-sm text-slate-500">
              {content.length} / 3000 znakow
            </span>
            <button
              onClick={handleCheck}
              disabled={loading || !content.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading ? "Sprawdzam..." : "Sprawdz compliance"}
            </button>
          </div>
        </div>

        {/* Blad */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-700">
            {error}
          </div>
        )}

        {/* Wynik */}
        {result && (
          <div className="space-y-6">
            {/* Podsumowanie */}
            <div
              className={`rounded-lg border p-6 ${getStatusColor(
                result.status
              )}`}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Wynik analizy</h2>
                <span
                  className={`text-3xl font-bold ${getScoreColor(
                    result.score
                  )}`}
                >
                  {result.score}/100
                </span>
              </div>
              <p className="text-lg mb-2">
                Status:{" "}
                <span className="font-semibold">
                  {result.status === "PASS" && "✅ Zgodne"}
                  {result.status === "WARNING" && "⚠️ Ostrzezenia"}
                  {result.status === "FAIL" && "❌ Wymaga poprawek"}
                </span>
              </p>
              <p className="opacity-80">{result.summary}</p>
              <p className="text-sm mt-2 opacity-60">
                Czas analizy: {result.latencyMs}ms
              </p>
            </div>

            {/* Problemy */}
            {result.issues && result.issues.length > 0 && (
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Zidentyfikowane problemy ({result.issues.length})
                </h3>
                <div className="space-y-4">
                  {result.issues.map((issue, idx) => (
                    <div
                      key={idx}
                      className="border-l-4 border-yellow-400 bg-yellow-50 rounded-r-lg p-4"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-xs font-bold px-2 py-1 rounded ${
                            issue.severity === "HIGH"
                              ? "bg-red-100 text-red-700"
                              : issue.severity === "MEDIUM"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {issue.severity}
                        </span>
                        <span className="text-sm text-slate-500">
                          {issue.type}
                        </span>
                      </div>
                      <p className="text-slate-800 font-medium mb-1">
                        {issue.message}
                      </p>
                      <p className="text-sm text-slate-500 mb-2">
                        Przepis: {issue.rule}
                      </p>
                      <p className="text-sm text-blue-700">
                        💡 {issue.suggestion}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Disclaimery */}
            {result.disclaimers && result.disclaimers.length > 0 && (
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Zalecane zastrzezenia ({result.disclaimers.length})
                </h3>
                <div className="space-y-3">
                  {result.disclaimers.map((d) => (
                    <div
                      key={d.id}
                      className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg"
                    >
                      <input
                        type="checkbox"
                        defaultChecked={d.isRequired}
                        disabled={d.isRequired}
                        className="mt-1"
                      />
                      <div>
                        <span className="text-sm font-medium text-slate-700">
                          {d.label}
                          {d.isRequired && (
                            <span className="text-red-500 ml-1">*</span>
                          )}
                        </span>
                        <p className="text-sm text-slate-600 mt-1">{d.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Akcje */}
            <div className="flex gap-4">
              <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
                Publikuj na LinkedIn
              </button>
              <button className="px-6 py-3 bg-white text-slate-700 border border-slate-300 rounded-lg font-semibold hover:bg-slate-50 transition">
                Zapisz jako wersja robocza
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
