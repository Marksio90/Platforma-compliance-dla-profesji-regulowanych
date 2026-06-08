import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Hero */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
          Publikuj na LinkedIn
          <br />
          <span className="text-blue-600">bez obaw o compliance</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10">
          Pierwsza platforma dla prawnikow, lekarzy i doradcow finansowych,
          ktora w czasie rzeczywistym sprawdza Twoja tresc pod katem regulacji
          i automatycznie dodaje wymagane zastrzezenia.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/editor"
            className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Wyprobuj za darmo — 14 dni
          </Link>
          <Link
            href="#jak-to-dziala"
            className="px-8 py-4 bg-white text-slate-700 border border-slate-300 rounded-lg font-semibold hover:bg-slate-50 transition"
          >
            Zobacz jak dziala
          </Link>
        </div>
      </section>

      {/* Features */}
      <section id="jak-to-dziala" className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
          Jak to dziala?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            step="1"
            title="Napisz post"
            description="Uzyj edytora lub wybierz z biblioteki pre-approved szablonow."
          />
          <FeatureCard
            step="2"
            title="Sprawdz compliance"
            description="AI analizuje tresc w 30 sekund pod katem Kodeksu Etyki, KNF lub FINRA."
          />
          <FeatureCard
            step="3"
            title="Publikuj bezpiecznie"
            description="System dodaje wymagane disclaimery i publikuje na LinkedIn z pelnym logiem audytowym."
          />
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="bg-blue-600 rounded-2xl p-10 md:p-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Gotowy na bezpieczne publikowanie?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
            Dolacz do 10 pierwszych uzytkownikow beta i otrzymaj 50% znizki
            na pierwszy rok.
          </p>
          <Link
            href="/editor"
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition"
          >
            Rozpocznij za darmo
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-slate-500 text-sm">
        <p>
          Compliance Platform — 2026. Nie stanowi porady prawnej.
          Wszystkie wyniki wymagaja weryfikacji przez licencjonowanego
          profesjonaliste.
        </p>
      </footer>
    </main>
  );
}

function FeatureCard({
  step,
  title,
  description,
}: {
  step: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
      <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold mb-4">
        {step}
      </div>
      <h3 className="text-xl font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  );
}
