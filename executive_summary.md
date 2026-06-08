# PAKIET WYKONAWCZY: Platforma Compliance dla Profesji Regulowanych

**Data:** 2026-06-08  
**Rola:** CEO + Project Manager  
**Status:** Faza 0 → Przygotowanie do startu

---

## KLUCZOWE DECYZJE Z ETAPÓW 1–7 (podsumowanie)

### Etap 1: Walidacja rynku (Analiza rynkowa)
- Problem realny: profesjonaliści z branż regulowanych nie publikują w social mediach ze strachu przed sankcjami
- Werdykt: 🟡 ŻÓŁTY — ostrożny optymizm, luka rynkowa istnieje, ale wymaga edukacji rynku
- TAM: ~$15-25B (rynek RegTech), SAM: ~$684M (USA+EU, finanse+prawo), SOM: $1-3M ARR w roku 3
- Dwa pivoty gotowe: Compliance API jako usługa (B2B infrastructure) i White-label dla sieci afiliacyjnych

### Etap 2: Analiza konkurencji
- Żaden z 10 analizowanych graczy (Smarsh, AdvisorStream, Hearsay, LawLytics, Seismic, Veeva) nie łączy łatwego publikowania + pełnego compliance + multi-profession
- Wolna przestrzeń: górny-prawy kwadrant (wysoka łatwość + pełny compliance)
- Wedge: doradcy finansowi USA (najwyższy WTP), ale polscy prawnicy jako najbliższy rynek

### Etap 3: Definicja produktu
- Persona: Michael, 42 lata, Independent RIA, $180M AUM, płaci $65K/rok za compliance officer na pół etatu
- 3 JTBD: (1) compliance check w 30s, (2) content library gdy brak pomysłu, (3) audit log na żądanie regulatora
- MVP = 5 funkcji MUST: real-time compliance check, auto-disclaimers, LinkedIn publish, immutable audit log, pre-approved content library

### Etap 4: Model finansowy (CFO)
- Model: Subskrypcja SaaS (roczna z opcją miesięczną)
- 3 pakiety: Starter 99 PLN, Professional 199 PLN, Enterprise 499 PLN
- Cel MRR: 15 000 PLN w 6 miesięcy; LTV/CAC: 2.4-3.3x; payback CAC: 4.6-6.2 mies.
- 3 dźwignie ARPU: upsell (więcej userów), cross-sell (jurysdykcje), retencja (annual prepay)

### Etap 5: Strategia growth
- Wedge: Prawnicy w Polsce (brak konkurencji, bliski rynek, jasne regulacje)
- Pierwszych 10 klientów: Cold LinkedIn DM → discovery call → beta → paid (4 tygodnie)
- 10→100: Content marketing (LinkedIn + blog SEO) + webinar + afiliacja
- Główne kanały: LinkedIn Groups (Polscy Prawnicy), Prawo.pl, KIRP, Warsaw Finance Week

### Etap 6: Ryzyka i roadmapa
- Top ryzyko: LLM hallucination (Score 20/25) — mitigacja: human-in-the-loop + rules-based engine + E&O insurance
- Budżet prawniczy przed startem: ~25K PLN (must-have), ~46K PLN (full)
- Roadmapa 12 miesięcy: MVP (0-3m) → PMF (3-6m) → Skalowanie (6-12m); budżet ~318K PLN
- 5 kill criteria: brak aktywacji (<20%), brak konwersji (<15%), wysoki churn (>15%), incydent compliance, brak PMF

### Etap 7: Risk + prawo + COO
- EU AI Act: platforma jako „limited risk" (nie high-risk), ale wymaga transparency obligations (Art. 50) do 2 sierpnia 2026
- „Compliance check" to „informacja prawna", nie „porada prawna" — pod warunkiem właściwego pozycjonowania
- Multi-LLM architecture: primary (GPT-4) + fallback (Claude + Mistral) + on-premise backup
- 720+ znanych incydentów AI hallucination w prawie — mandatory human-in-the-loop

---

## 1. JEDNOSTRONICOWY EXECUTIVE SUMMARY

### Problem
Profesjonaliści z branż regulowanych (prawnicy, lekarze, doradcy finansowi) nie mogą publikować treści marketingowych w social mediach bez ryzyka naruszenia regulacji, ponieważ brakuje im narzędzia, które automatycznie sprawdza zgodność, dodaje wymagane zastrzeżenia i archiwizuje publikacje.

### Rozwiązanie
Platforma SaaS, która w czasie rzeczywistym sprawdza posty pod kątem regulacji (FINRA, KNF, Kodeks Etyki), automatycznie generuje wymagane disclaimery i publikuje na LinkedIn z niezmiennym logiem audytowym — wszystko bez angażowania działu prawnego. Jesteśmy pierwsi, którzy łączą compliance z generowaniem treści dla wielu profesji i jurysdykcji.

### Rynek
- **TAM:** $15-25B (globalny rynek RegTech, 2025)
- **SAM:** $684M (doradcy finansowi + prawnicy w USA+EU z budżetem marketingowym)
- **SOM:** $1-3M ARR w roku 3 (500-1,000 klientów)

### Model biznesowy
Subskrypcja SaaS miesięczna/roczna: Starter 99 PLN, Professional 199 PLN, Enterprise 499 PLN na użytkownika, z rocznym rabatem 17% (2 miesiące gratis).

### Konkurencja i luka
Smarsh, Global Relay i Proofpoint robią tylko archiwizację (brak publikowania); AdvisorStream i Hearsay obsługują tylko finanse USA; LawLytics tylko prawników USA. **Nikogo nie ma w górnym-prawym kwadrancie: łatwe publikowanie + pełny compliance + multi-profession + multi-jurisdiction.**

### MVP (3 główne funkcje)
1. **Real-time compliance check** — AI + rules-based engine analizuje post pod kątem regulacji w 3 sekundy
2. **Auto-generated disclaimers** — system dobiera i dodaje wymagane zastrzeżenia per jurysdykcja
3. **1-klik LinkedIn publish + immutable audit log** — publikacja z pełnym logiem audytowym (timestamp + hash)

### Monetyzacja
Ceny: 99-499 PLN/miesiąc (23-115 EUR). Cel MRR: **15 000 PLN w 6 miesięcy** (~3 400 EUR), co przy 5% churn daje LTV 2 600 PLN i LTV/CAC 2.4-3.3x.

### Go-to-market
**Wedge:** Prawnicy w Polsce (brak konkurencji, znany pain). **Taktyka:** Cold LinkedIn DM do 50 radców prawnych → 10 discovery calls → 10 beta testerów → 3 płacących (miesiąc 1). Następnie content marketing (LinkedIn + SEO) + webinar + partnerstwa z KIRP i izbami adwokackimi.

### Top 3 ryzyka
1. **LLM hallucination** (Score 20/25) — AI może źle ocenić compliance, użytkownik dostaje karę od izby; mitigacja: human-in-the-loop mandatory + rules-based engine + E&O insurance
2. **Powolna adopcja** (Score 16/25) — prawnicy to grupa konserwatywna; mitigacja: free trial 14 dni, lighthouse customers, partnerstwa z izbami
3. **Status prawny** (Score 15/25) — czy compliance-check to „porada prawna" (zastrzeżona dla adwokatów)?; mitigacja: pozycjonowanie jako „research tool", nie „advisor", opinia prawna przed launch

### Roadmapa (3 daty i kamienie milowe)
- **Miesiąc 3:** MVP live + 10 beta testerów (prawnicy) + 3 płacących klientów
- **Miesiąc 6:** MRR ≥ 5 000 PLN + 40 klientów + churn <10% + 1 case study z nazwiskiem
- **Miesiąc 12:** MRR ≥ 25 000 PLN + 180 klientów + launch UK/DE + 10% revenue z enterprise

---

## 2. LISTA ZADAŃ NA PIERWSZY TYDZIEŃ (poniedziałek → niedziela)

### PONIEDZIAŁEK (Dzień 1)

| # | Zadanie | Cel | Czas | Kto |
|---|---------|-----|------|-----|
| 1.1 | **Zdefiniuj nazwę produktu i kup domenę** | Nazwa + .pl + .com; sprawdź dostępność w NIP, KRS, social media | 2h | CEO |
| 1.2 | **Załóż strukturę firmy (sp. z o.o. lub działalność)** | Decyzja: JDG vs. sp. z o.o. (koszt, odpowiedzialność, inwestorzy); jeśli JDG — CEIDG w 1 dzień | 2h | CEO + księgowy |
| 1.3 | **Research 50 celów na LinkedIn** | Lista 50 radców prawnych / adwokatów w Warszawie i Krakowie (2-10 osób w kancelarii, aktywni na LinkedIn lub nieaktywni = pain point) | 3h | CEO |

**Cel dnia:** Nazwa, domena, firma, lista 50 celów.

---

### WTOREK (Dzień 2)

| # | Zadanie | Cel | Czas | Kto |
|---|---------|-----|------|-----|
| 2.1 | **Zbuduj landing page (Carrd / Webflow)** | 1 strona: Problem → Rozwiązanie → CTA „Join beta"; zbiera email; mobile-friendly; po polsku | 3h | CEO (+ freelancer jeśli potrzeba) |
| 2.2 | **Przygotuj profil LinkedIn founder** | Nowe zdjęcie, banner z value prop, headline: „Helping lawyers publish on LinkedIn without compliance headaches | Co-founder @ [Nazwa]"; 3 posty w draftach | 2h | CEO |
| 2.3 | **Setup narzędzi: CRM + email + analytics** | HubSpot CRM (free) + Mailchimp / Brevo (email) + Google Analytics 4 + Hotjar; wszystko pod jednym loginem firmowym | 2h | CEO |

**Cel dnia:** Landing page live, profil LinkedIn gotowy, narzędzia skonfigurowane.

---

### ŚRODA (Dzień 3)

| # | Zadanie | Cel | Czas | Kto |
|---|---------|-----|------|-----|
| 3.1 | **Napisz 3 posty edukacyjne na LinkedIn** | (1) „3 rzeczy, które radca prawny NIE MOŻE napisać na LinkedIn"; (2) „Dlaczego 90% polskich prawników nie publikuje w social media?"; (3) „Case study: kancelaria, która zdobyła klienta przez LinkedIn"; bez wzmianki o produkcie | 3h | CEO |
| 3.2 | **Wyslij 10 pierwszych cold DMs (wersja A)** | LinkedIn DM do 10 prawników z listy; personalizacja: imię + nazwa kancelarii + konkretny post (lub brak postów); śledź w HubSpot | 2h | CEO |
| 3.3 | **Kontakt z prawnikiem RODO + prawnikiem cywilnym** | Wycena: polityka prywatności + regulamin + disclaimery + limitacja odpowiedzialności; cel: 3 oferty, wybór w piątek | 1h | CEO |

**Cel dnia:** 3 posty gotowe, 10 DMs wysłane, prawnicy kontaktowani.

---

### CZWARTEK (Dzień 4)

| # | Zadanie | Cel | Czas | Kto |
|---|---------|-----|------|-----|
| 4.1 | **Publikuj post #1 na LinkedIn** | „3 rzeczy, których radca prawny nie może napisać"; monitoruj engagement (lajki, komentarze, DMs) | 1h | CEO |
| 4.2 | **Wyslij 10 kolejnych cold DMs + follow-up do wczorajszych** | 10 nowych DMs + follow-up do osób, które nie odpowiedziały w ciągu 24h | 2h | CEO |
| 4.3 | **Setup techiczny: repo + architektura MVP** | GitHub repo, dokumentacja architektury (Next.js + PostgreSQL + OpenAI API + LinkedIn API), wybór stacku, setup lokalny | 4h | CTO / Dev |

**Cel dnia:** Pierwszy post live, 20 DMs wysłane, repo gotowe.

---

### PIĄTEK (Dzień 5)

| # | Zadanie | Cel | Czas | Kto |
|---|---------|-----|------|-----|
| 5.1 | **Publikuj post #2 na LinkedIn** | „Dlaczego 90% polskich prawników nie publikuje"; monitoruj engagement | 1h | CEO |
| 5.2 | **Wybór prawnika + podpisanie umowy** | Decyzja na podstawie ofert; podpisanie umowy na politykę RODO + regulamin + disclaimery; harmonogram dostawy: 2 tygodnie | 1h | CEO |
| 5.3 | **Pierwsze rozmowy discovery (z tymi, którzy odpowiedzieli na DM)** | 2-3 rozmowy 30 min z prawnikami, którzy odpowiedzieli; pytania: „Jak publikujesz?", „Co Cię powstrzymuje?", „Ile płacisz za compliance?"; notatki w HubSpot | 2h | CEO |
| 5.4 | **Research grantów i fundingu** | Lista: PARP (Startup Booster, Inteligentny Rozwój), NCBR, SpeedUp, bValue; sprawdź terminy i kryteria | 2h | CEO |

**Cel dnia:** 2-3 discovery calls, prawnik wybrany, granty zbadane.

---

### SOBOTA (Dzień 6)

| # | Zadanie | Cel | Czas | Kto |
|---|---------|-----|------|-----|
| 6.1 | **Publikuj post #3 na LinkedIn** | „Case study: kancelaria, która zdobyła klienta przez LinkedIn"; monitoruj | 1h | CEO |
| 6.2 | **Iteracja pitcha na podstawie discovery calls** | Co rezonuje, co nie; dostosuj DM i landing page; A/B test headline na landing page | 2h | CEO |
| 6.3 | **Setup OpenAI API + test promptów compliance** | Konto OpenAI API, pierwsze testy promptów dla polskiego Kodeksu Etyki Radcy Prawnego; ocena accuracy na 5 przykładowych postach | 3h | CTO / Dev |

**Cel dnia:** Pitch ziterowany, OpenAI API działa, pierwsze testy compliance.

---

### NIEDZIELA (Dzień 7)

| # | Zadanie | Cel | Czas | Kto |
|---|---------|-----|------|-----|
| 7.1 | **Podsumowanie tygodnia + plan na tydzień 2** | Ile DMs, ile odpowiedzi, ile discovery calls, co się nauczyliśmy; plan: więcej outreach, start budowy MVP, content calendar | 1h | CEO |
| 7.2 | **Napisanie newslettera #1** | „3 rzeczy, które odkryłem tydzień #1" — dla osób, które zapisały się na landing page; value-first, nie sprzedaż | 1h | CEO |
| 7.3 | **Odpoczynek / networking** | Spotkanie z 1 prawnikiem z networku (nie cold — ciepły kontakt); zbierz feedback informally | 2h | CEO |

**Cel dnia:** Plan na tydzień 2 gotowy, newsletter wysłany, network aktywowany.

---

### PODSUMOWANIE TYGODNIA

| Metryka | Cel |
|---------|-----|
| Cold DMs wysłane | 20 |
| Odpowiedzi | ≥4 (20% response rate) |
| Discovery calls | ≥2 |
| LinkedIn posty | 3 |
| Landing page signups | ≥5 |
| OpenAI API | Działa, pierwsze testy |

---

## 3. DECYZJE DO PODJĘCIA NATYCHMIAST

### DECYZJA 1: Forma prawna firmy — JDG czy sp. z o.o.?

| Opcja | Zalety | Wady |
|-------|--------|------|
| **JDG (jednoosobowa działalność)** | Szybka rejestracja (1 dzień), niskie koszty, proste rozliczenia, ryczałt 12% | Odpowiedzialność całym majątkiem, trudniej z inwestorami, mniej wiarygodności |
| **Sp. z o.o.** | Ograniczona odpowiedzialność, łatwiej z inwestorami, większa wiarygodność | Koszt ~2-3K PLN, KRS 2-4 tygodnie, bardziej skomplikowane rozliczenia |

**Rekomendacja:** Zacznij od **JDG z ryczałtem 12%** na pierwsze 3-6 miesięcy (szybkość + niskie koszty). Przekształć w sp. z o.o. w miesiącu 4-6, gdy będziesz miał pierwszych klientów i potencjalnych inwestorów. **Decyzja do podjęcia: TERAZ (wpływa na VAT, faktury, umowy).**

---

### DECYZJA 2: Stack technologiczny — co budujemy?

| Komponent | Opcja A (szybka) | Opcja B (skalowalna) | Rekomendacja |
|-----------|-----------------|---------------------|--------------|
| Frontend | Next.js + Tailwind | Next.js + Tailwind | A (standard) |
| Backend | Next.js API routes | NestJS / Fastify | A na MVP, B na scale |
| Baza danych | PostgreSQL (Supabase) | PostgreSQL (AWS RDS) | A (szybszy setup) |
| Auth | Supabase Auth | Auth0 | A (tańsze) |
| AI / LLM | OpenAI API (GPT-4) | Multi-LLM (OpenAI + Mistral) | A na MVP, multi na miesiąc 3 |
| Hosting | Vercel | Vercel + AWS | A na MVP |
| LinkedIn API | Official API | Unofficial scraping (risky) | A (oficjalna, bezpieczna) |

**Rekomendacja:** Opcja A na MVP (szybszy time-to-market, niższy koszt). Multi-LLM i AWS przenieś na miesiąc 3-4, gdy będziesz miał product-market fit. **Decyzja do podjęcia: TERAZ (blokuje start developmentu).**

---

### DECYZJA 3: Wedge — prawnicy PL czy doradcy finansowi USA?

| Opcja | Zalety | Wady |
|-------|--------|------|
| **Prawnicy w Polsce** | Brak konkurencji, znany rynek, język, sieć kontaktów, bliskość do KIRP/izb | Mniejszy WTP niż finansiści, konserwatywni, długie cykle decyzyjne |
| **Doradcy finansowi USA** | Najwyższy WTP, AdvisorStream udowodnił model, większy rynek | Konkurencja (AdvisorStream, Hearsay), odległość kulturowa, FINRA complexity |

**Rekomendacja:** **Prawnicy w Polsce** na start (miesiące 1-6). Zbuduj produkt, case studies, trust. W miesiącu 6-9 dodaj doradców finansowych PL, a potem USA. **Decyzja do podjęcia: TERAZ (blokuje messaging, content, targetowanie).**

---

### DECYZJA 4: LLM provider — OpenAI, Anthropic, czy Mistral?

| Provider | Zalety | Wady | Koszt (1M tokens) |
|----------|--------|------|-------------------|
| **OpenAI GPT-4o** | Najlepsza jakość, najwięcej dokumentacji, Enterprise DPA | USA-based, CLOUD Act, ceny rosną | ~$5-15 |
| **Anthropic Claude 3.5** | Lepsza w długich kontekstach, mniej hallucination | USA-based, droższy | ~$3-15 |
| **Mistral Large** | EU-based (Paryż), GDPR-native, no SCC needed | Mniejszy ekosystem, nowszy | ~$2-8 |

**Rekomendacja:** **OpenAI API na MVP** (najlepsza jakość, najszybszy setup, Enterprise DPA + ZDR). Jednocześnie zbuduj abstrakcję, żeby w miesiącu 3 dodać Mistral jako fallback + EU compliance. **Decyzja do podjęcia: TERAZ (blokuje architekturę AI + umowy).**

---

### DECYZJA 5: Czy zatrudniać CTO/tech lead od razu, czy outsourcować MVP?

| Opcja | Zalety | Wady | Koszt (3 miesiące) |
|-------|--------|------|-------------------|
| **Zatrudnić CTO (full-time)** | Własność intelektualna, szybsza iteracja, długoterminowy | Wysoki koszt, ryzyko, że nie pasuje kulturowo | 30-50K PLN |
| **Outsourcować do agency** | Szybszy start, znana cena, mniej zarządzania | Mniejsza kontrola, wolniejsza iteracja, zależność | 40-80K PLN |
| **Freelancer + ja jako PM** | Najtańsze, pełna kontrola, uczysz się produktu | Wymaga Twojego czasu, ryzyko jakości, freelancer może zniknąć | 15-25K PLN |

**Rekomendacja:** **Freelancer full-stack (Next.js + AI) + Ty jako PM** na miesiące 1-3. Szukaj na Useme.pl, NoFluffJobs, lub w networku. Zatrudnij CTO full-time dopiero w miesiącu 4-5, gdy będziesz miał product-market fit i budżet. **Decyzja do podjęcia: TERAZ (blokuje start developmentu).**

---

## PODSUMOWANIE DECYZJI

| # | Decyzja | Rekomendacja | Blokuje | Termin |
|---|---------|-------------|---------|--------|
| 1 | Forma prawna | JDG z ryczałtem 12%, przekształcenie w sp. z o.o. w mies. 4-6 | VAT, faktury, umowy | Dzień 1-2 |
| 2 | Stack technologiczny | Next.js + Supabase + OpenAI API (szybki MVP) | Development | Dzień 4 |
| 3 | Wedge | Prawnicy w Polsce (mies. 1-6), potem finansiści | Messaging, content, targetowanie | Dzień 1 |
| 4 | LLM provider | OpenAI API + abstrakcja na multi-LLM w mies. 3 | Architektura AI, umowy | Dzień 4-6 |
| 5 | Tech team | Freelancer full-stack + CEO jako PM (mies. 1-3) | Development, budżet | Dzień 5-7 |

---

*Pakiet wykonawczy przygotowany na podstawie kompletnej analizy z etapów 1–7. Gotowy do wdrożenia od poniedziałku.*
