# ANALIZA RYZYKA + ROADMAPA 12 MIESIĘCY + KILL CRITERIA

**Data:** 2026-06-08  
**Rola:** Risk Officer + Prawnik Technologiczny + COO Startupu  
**Kontekst:** Platforma compliance (LLM-based) dla ekspertów regulowanych

---

## 1. TOP 5 RYZYK

### RYZYKO 1: Odpowiedzialność za błędny compliance-check (LLM hallucination)

| Atrybut | Szczegół |
|---------|----------|
| **Kategoria** | Prawne / Techniczne / Platformowe |
| **Prawdopodobieństwo** | 4/5 (LLM-y halucynują 30-58% w kontekście prawnym; Stanford HAI 2024) |
| **Wpływ** | 5/5 (kara dla użytkownika od izby, utrata licencji, pozew przeciwko nam) |
| **Score** | **20/25 (KRYTYCZNE)** |
| **Konkretna mitigacja** | 1) **Human-in-the-loop mandatory** — AI flaguje, człowiek approvuje; 2) **Rules-based engine jako pierwsza linia** — LLM tylko do interpretacji, nie do decyzji; 3) **Confidence threshold** — <85% confidence = auto-escalate do manual review; 4) **Disclaimery w każdym output** — „To sugestia AI, wymaga weryfikacji przez licencjonowanego profesjonalistę"; 5) **E&O insurance** z affirmative AI coverage (min. €500K); 6) **Terms of Service** — hard cap liability do 12-miesięcznych opłat |
| **Early warning signal** | Wzrost liczby „appeals" (użytkownicy klikają „this check was wrong") >5% w ciągu miesiąca; lub pierwszy email od użytkownika: „dostałem karę od izby, bo wasz system powiedział, że OK" |

---

### RYZYKO 2: Ryzyko regulacyjne — platforma jako podmiot dostarczający „porady prawne / medyczne"

| Atrybut | Szczegół |
|---------|----------|
| **Kategoria** | Prawne / Regulacyjne |
| **Prawdopodobieństwo** | 3/5 (zależy od pozycjonowania; polskie izby są konserwatywne) |
| **Wpływ** | 5/5 (zakaz działalności, kary finansowe, utrata zaufania rynku) |
| **Score** | **15/25 (WYSOKIE)** |
| **Konkretna mitigacja** | 1) **Pozycjonowanie jako „research tool"** — nie „legal advisor"; 2) **Weryfikacja licencji przy rejestracji** — tylko licencjonowani profesjonaliści; 3) **Disclaimery na każdym poziomie** — UI, email, PDF export; 4) **Brak konkretnych rekomendacji** — AI mówi „to może naruszać Art. X", nie „nie publikuj tego"; 5) **Konsultacja z prawnikiem** przed launch (budżet: 10-15K PLN); 6) **Opinia prawna** od KIRP / izby adwokackiej (jeśli możliwe) |
| **Early warning signal** | Pierwsze pismo od Krajowej Rady Adwokackiej lub KIRP z zapytaniem o status prawny; lub wpis na forum prawniczym: „Czy to nie jest nieuprawniona praktyka prawnicza?" |

---

### RYZYKO 3: Koncentracja na jednym dostawcy LLM (OpenAI / Anthropic)

| Atrybut | Szczegół |
|---------|----------|
| **Kategoria** | Techniczne / Operacyjne |
| **Prawdopodobieństwo** | 3/5 (ceny rosną 20-30%/rok; zmiany ToS; outages) |
| **Wpływ** | 4/5 (przerwa w działaniu = utrata klientów; zmiana ceny = zniszczenie unit economics) |
| **Score** | **12/25 (WYSOKIE)** |
| **Konkretna mitigacja** | 1) **Multi-LLM architecture** — primary (GPT-4) + fallback (Claude + Mistral); routing przez LiteLLM/Portkey; 2) **Abstrakcja warstwy AI** — swap provider w 1 dzień, nie 3 miesiące; 3) **On-premise backup** — fine-tuned Llama/Mistral na własnych GPU (AWS/Azure) dla krytycznych checks; 4) **Zero Data Retention (ZDR)** z OpenAI Enterprise / Anthropic Enterprise; 5) **DPA + BAA** podpisane przed wysłaniem jakichkolwiek danych klientów; 6) **EU data residency** — Azure OpenAI EU regions lub Mistral (EU-based) |
| **Early warning signal** | OpenAI podnosi ceny API o >30% w ciągu 6 miesięcy; lub outage >2h w miesiącu; lub zmiana ToS zabraniająca compliance use case |

---

### RYZYKO 4: Powolna adopcja (profesje konserwatywne)

| Atrybut | Szczegół |
|---------|----------|
| **Kategoria** | Rynkowe |
| **Prawdopodobieństwo** | 4/5 (prawnicy i lekarze to najbardziej konserwatywne grupy zawodowe) |
| **Wpływ** | 4/5 (spalanie cash bez revenue; demotywacja zespołu; inwestorzy tracą cierpliwość) |
| **Score** | **16/25 (WYSOKIE)** |
| **Konkretna mitigacja** | 1) **Wedge: prawnicy 35-45 lat** — nie starsi (za konserwatywni), nie młodzi (nie mają pieniędzy); 2) **„Lighthouse customers"** — znane nazwiska, które dadzą testimonial; 3) **Free trial bez karty** — 14 dni, pełny produkt, nie freemium; 4) **Case studies z ROI** — „Kancelaria X zdobyła 3 klientów w miesiąc dzięki LinkedIn"; 5) **Partnerstwa z izbami** — endorsement = instant trust; 6) **Content marketing edukacyjny** — nie sprzedawaj, ucz („Jak bezpiecznie publikować jako radca prawny") |
| **Early warning signal** | Trial-to-paid conversion <10% przez 2 kolejne miesiące; lub <30% beta testerów publikuje choć 1 post w ciągu 14 dni; lub NPS <20 |

---

### RYZYKO 5: Kopiowanie przez dużego gracza (LinkedIn, Clio, Relativity, Smarsh)

| Atrybut | Szczegół |
|---------|----------|
| **Kategoria** | Rynkowe / Platformowe |
| **Prawdopodobieństwo** | 3/5 (Smarsh już partneruje z OpenAI; LinkedIn ma compliance team; Clio rozszerza funkcje) |
| **Wpływ** | 4/5 (utrata competitive advantage; price war; churn do „bezpieczniejszego" brandu) |
| **Score** | **12/25 (WYSOKIE)** |
| **Konkretna mitigacja** | 1) **Speed** — zdobądź 500+ klientów zanim duży gracz zareaguje (12-18 miesięcy); 2) **Multi-jurisdiction moat** — polskie przepisy + niemieckie + brytyjskie = trudne do skopiowania; 3) **Community** — buduj relacje, nie tylko produkt; izby i stowarzyszenia nie zmieniają partnerów co miesiąc; 4) **Data moat** — im więcej postów sprawdzonych, tym lepszy model (network effects); 5) **API-first** — jeśli duży gracz kopiuje, zostań ich dostawcą (Pivot 1 z analizy rynku) |
| **Early warning signal** | Smarsh lub LinkedIn ogłasza „AI content assistant for professionals"; lub Clio dodaje „compliance check" do swojego CRM; lub duży gracz kontaktuje się z naszymi klientami |

---

### MACIERZ RYZYK (podsumowanie)

| # | Ryzyko | Kat. | P | W | Score | Priorytet |
|---|--------|------|---|---|-------|-----------|
| 1 | LLM hallucination → odpowiedzialność | Prawne/Techn. | 4 | 5 | **20** | 🔴 KRYTYCZNE |
| 2 | Platforma jako „porady prawne" | Prawne/Reg. | 3 | 5 | **15** | 🟠 WYSOKIE |
| 4 | Powolna adopcja (profesje konserw.) | Rynkowe | 4 | 4 | **16** | 🟠 WYSOKIE |
| 3 | Koncentracja LLM provider | Techn./Oper. | 3 | 4 | **12** | 🟡 WYSOKIE |
| 5 | Kopiowanie przez dużego gracza | Rynkowe | 3 | 4 | **12** | 🟡 WYSOKIE |

---

## 2. KWESTIE PRAWNE PRZED STARTEM (checklist)

### 2.1 RODO / Privacy (dane użytkowników, logi audytowe, retencja)

| # | Co zrobić | Szczegóły | Czy potrzebujesz prawnika? |
|---|-----------|-----------|---------------------------|
| 1 | **Polityka prywatności (RODO)** | Dokument w języku polskim: kategorie danych, cele przetwarzania, okres retencji, prawa użytkownika, DPO kontakt | ✅ TAK — prawnik RODO (~5K PLN) |
| 2 | **DPIA (Data Protection Impact Assessment)** | Wymagane przy przetwarzaniu danych wrażliwych (dane zdrowotne lekarzy, dane prawne); UODO ma listę operacji wymagających DPIA | ✅ TAK — prawnik RODO (~3K PLN) |
| 3 | **Rejestr czynności przetwarzania** | Art. 30 RODO — prowadź dokumentację wszystkich operacji | ⚠️ MOŻESZ SAM — szablon + konsultacja (~1K PLN) |
| 4 | **Umowy powierzenia (z LLM provider)** | DPA z OpenAI/Anthropic/Mistral; ZDR (Zero Data Retention) dla API; BAA jeśli HIPAA | ✅ TAK — prawnik tech (~3K PLN) |
| 5 | **Retencja logów audytowych** | Logi: 5 lat (dla celów podatkowych + dowodowych); dane osobowe: tylko tak długo, jak potrzebne (RODO Art. 5); medyczne: 20 lat | ⚠️ MOŻESZ SAM — z konsultacją |
| 6 | **SCC (Standard Contractual Clauses)** | Jeśli dane idą do USA (OpenAI/Anthropic) — wymagane SCC + TIA (Transfer Impact Assessment) | ✅ TAK — prawnik RODO (~3K PLN) |

**Łączny budżet prawniczy (RODO):** ~15K PLN

---

### 2.2 Regulamin i disclaimery platformy

| # | Co zrobić | Szczegóły | Czy potrzebujesz prawnika? |
|---|-----------|-----------|---------------------------|
| 1 | **Regulamin świadczenia usług** | Warunki użytkowania, płatności, zwroty, rozwiązanie umowy, ograniczenie odpowiedzialności, force majeure | ✅ TAK — prawnik cywilny (~5K PLN) |
| 2 | **Disclaimer: „Nie jesteśmy prawnikami / lekarzami / doradcami"** | Musi być w UI, w emailach, w PDF export, w każdym output AI; po polsku i angielsku | ✅ TAK — prawnik + native speaker (~3K PLN) |
| 3 | **Disclaimer: „AI może się mylić"** | Wymóg EU AI Act Art. 50; musi być „clear and distinguishable" | ⚠️ MOŻESZ SAM — z review prawnika (~1K PLN) |
| 4 | **Limitacja odpowiedzialności** | Hard cap: 12-miesięczne opłaty; wyłączenie odpowiedzialności za „indirect damages"; użytkownik ponosi pełną odpowiedzialność za decyzje | ✅ TAK — prawnik cywilny (~3K PLN) |
| 5 | **Oświadczenie użytkownika** | „Jestem licencjonowanym profesjonalistą; rozumiem, że to narzędzie wspomagające, nie zastępujące profesjonalnego osądu" | ⚠️ MOŻESZ SAM — z review prawnika (~1K PLN) |

**Łączny budżet prawniczy (regulamin + disclaimery):** ~13K PLN

---

### 2.3 Prawa autorskie do treści użytkowników

| # | Co zrobić | Szczegóły | Czy potrzebujesz prawnika? |
|---|-----------|-----------|---------------------------|
| 1 | **Licencja na treści użytkownika** | Użytkownik udziela nam licencji nieekskluzywnej na przechowywanie, przetwarzanie i wyświetlanie treści w celu świadczenia usługi | ⚠️ MOŻESZ SAM — standardowy zapis (~1K PLN review) |
| 2 | **Prawa do content library** | Upewnij się, że templates są albo oryginalne, albo licencjonowane (CC, bought, generated); nie kopiuj z AdvisorStream ani innych | ⚠️ MOŻESZ SAM — ale skonsultuj (~1K PLN) |
| 3 | **Prawa do output AI** | Kto jest właścicielem compliance-check wygenerowanego przez AI? Użytkownik. My nie rościmy praw. | ⚠️ MOŻESZ SAM — zapis w regulaminie |

---

### 2.4 Oznaczanie treści generowanych / wspomaganych przez AI (EU AI Act)

| # | Co zrobić | Szczegóły | Deadline |
|---|-----------|-----------|----------|
| 1 | **UI disclosure (Art. 50(1))** | Banner/label: „Ten system wykorzystuje sztuczną inteligencję" — widoczny przy pierwszej interakcji | Przed launch |
| 2 | **Machine-readable marking (Art. 50(2))** | Metadata w każdym output: `ai-generated: true`, `provider: OpenAI`, `timestamp`, `confidence_score` | 2 sierpnia 2026 |
| 3 | **PDF export label** | Watermark/stamp: „Generated with AI assistance — requires professional review" | Przed launch |
| 4 | **Dokumentacja klasyfikacji AI** | Oceń, czy system to „limited risk" (Art. 6) czy „high-risk"; zachowaj dokumentację | Przed launch |

**Uwaga:** Dla startupów (SME) kary są capped do niższej z kwot: €15M lub 3% obrotu. Przy obrocie €0 = symboliczna, ale reputacyjna katastrofa.

---

### 2.5 Status prawny „compliance-check" (czy to porada prawna?)

| # | Co zrobić | Szczegóły | Czy potrzebujesz prawnika? |
|---|-----------|-----------|---------------------------|
| 1 | **Opinia prawna o statusie** | Czy nasz compliance-check to „świadczenie pomocy prawnej" (zastrzeżone dla adwokatów/radców) czy „informacja prawna" (dozwolone)? | ✅ TAK — prawnik z doświadczeniem w ochronie zawodu (~8K PLN) |
| 2 | **Pozycjonowanie produktu** | „AI-powered research tool", nie „compliance advisor"; „flaguje potencjalne problemy", nie „mówi, co jest zgodne" | ⚠️ MOŻESZ SAM — ale skonsultuj |
| 3 | **Weryfikacja licencji użytkownika** | Przy rejestracji: numer licencji, izba; cross-check (jeśli możliwe) | ⚠️ MOŻESZ SAM — dev task |
| 4 | **Brak konkretnych rekomendacji** | AI mówi: „Ten post zawiera obietnicę zwrotu, co może naruszać Art. 2210 FINRA", nie „Usuń to zdanie" | ⚠️ MOŻESZ SAM — prompt engineering |

---

### 2.6 Podatki (VAT EU, rozliczenia B2B)

| # | Co zrobić | Szczegóły | Czy potrzebujesz prawnika/księgowego? |
|---|-----------|-----------|-------------------------------------|
| 1 | **Rejestracja VAT w Polsce** | Standardowa rejestracja; SaaS to usługa elektroniczna | ⚠️ KSIĘGOWY (~500 PLN) |
| 2 | **VAT OSS (One Stop Shop)** | Jeśli sprzedajesz do innych krajów EU — rejestracja OSS, rozliczanie VAT per kraj klienta | ✅ KSIĘGOWY / DORADCA PODATKOWY (~2K PLN) |
| 3 | **Faktury B2B** | Reverse charge dla klientów EU z VAT; faktury PL dla polskich klientów | ⚠️ KSIĘGOWY (~500 PLN) |
| 4 | **CIT / podatek dochodowy** | Spółka z o.o. lub spółka komandytowa; estymowane 9% CIT (small taxpayer) lub 19% | ✅ KSIĘGOWY / DORADCA PODATKOWY |

---

### PODSUMOWANIE BUDŻETU PRAWNICZEGO PRZED STARTEM

| Kategoria | Koszt (PLN) |
|-----------|-------------|
| RODO / Privacy | ~15,000 |
| Regulamin + disclaimery | ~13,000 |
| Prawa autorskie | ~2,000 |
| EU AI Act compliance | ~5,000 |
| Status prawny compliance-check | ~8,000 |
| Podatki (setup) | ~3,000 |
| **RAZEM** | **~46,000 PLN** |

**Rekomendacja:** Zacznij od ~25K PLN (RODO + regulamin + podstawowe disclaimery). Resztę (opinia o statusie, AI Act compliance) zrób w miesiąc 2-3, gdy będziesz miał pierwszych klientów i cash flow.

---

## 3. ROADMAPA 12 MIESIĘCY

### FAZA 1: MVP + Pierwsi klienci (Miesiące 0–3)

| Kamień milowy | Kryterium sukcesu | Budżet |
|---------------|-------------------|--------|
| **Miesiąc 0-1: Setup prawny + tech** | Podpisane DPA z LLM provider; regulamin + disclaimery; polityka RODO; MVP architektura | 30K PLN (prawnik 15K + dev 15K) |
| **Miesiąc 1-2: MVP development** | 5 funkcji MUST działa: compliance check, auto-disclaimers, LinkedIn publish, audit log, content library | 40K PLN (2 devs × 2 miesiące) |
| **Miesiąc 2-3: Beta launch** | 10 beta testerów (prawnicy); ≥5 opublikowało 1 post; feedback zebrany i wdrożony | 10K PLN (marketing + support) |
| **Kryterium sukcesu fazy** | 3 płacących klientów z 10 beta (30% conversion) ORAZ 0 incydentów compliance | **RAZEM: 80K PLN** |

---

### FAZA 2: Product-Market Fit (Miesiące 3–6)

| Kamień milowy | Kryterium sukcesu | Budżet |
|---------------|-------------------|--------|
| **Miesiąc 3-4: Iteracja produktu** | Poprawki na podstawie feedback; dodanie roli + workflow (SHOULD); onboarding UX | 25K PLN (1 dev + 1 PM) |
| **Miesiąc 4-5: Content machine** | 2 posty/tydzień na LinkedIn; 2 artykuły/tydzień na blog; 1 webinar; 100 email subscribers | 15K PLN (content writer + ads) |
| **Miesiąc 5-6: Scale acquisition** | 50 cold DMs/tydzień; 2-3 discovery calls/tydzień; paid ads (Google/LinkedIn) 3K PLN/mies. | 25K PLN (ads + tools) |
| **Kryterium sukcesu fazy** | MRR ≥ 5,000 PLN (≥40 klientów); churn <10%; NPS ≥ 30; 1 case study z nazwiskiem | **RAZEM: 65K PLN** |

---

### FAZA 3: Skalowanie (Miesiące 6–12)

| Kamień milowy | Kryterium sukcesu | Budżet |
|---------------|-------------------|--------|
| **Miesiąc 6-8: Geo expansion** | Launch UK (FCA compliance) + DE (MiFID II); lokalizacja językowa; partnerstwa lokalne | 40K PLN (lokalizacja + prawnik + marketing) |
| **Miesiąc 8-10: Enterprise features** | RBAC, approval workflows, API, CRM integrations (Salesforce, HubSpot); cena 499 PLN/mies. | 50K PLN (2 devs × 2 miesiące) |
| **Miesiąc 10-12: Partner + afiliacja** | 3 afiliantów (coachowie LinkedIn, agencje); 1 partnerstwo z izbą (KIRP, CFA, PTMR); case studies enterprise | 30K PLN (commission + event sponsorship) |
| **Kryterium sukcesu fazy** | MRR ≥ 25,000 PLN (≥180 klientów); 10% revenue z enterprise; 2 jurysdykcje poza PL; LTV/CAC > 3x | **RAZEM: 120K PLN** |

---

### PODSUMOWANIE BUDŻETU 12 MIESIĘCY

| Faza | Budżet |
|------|--------|
| Faza 1 (MVP + pierwsi klienci) | 80K PLN |
| Faza 2 (PMF) | 65K PLN |
| Faza 3 (Skalowanie) | 120K PLN |
| **Rezerwa (20%)** | 53K PLN |
| **RAZEM** | **~318K PLN** (~73K EUR) |

**Źródło finansowania:** Grant (PARP, NCBR — 100-500K PLN) + angel / pre-seed (200-500K PLN) = wystarczające na 12 miesięcy.

---

## 4. KILL CRITERIA (kiedy porzucić lub spivotować)

### KRITERIUM 1: Brak aktywacji

| Element | Definicja |
|---------|-----------|
| **Metryka** | % beta testerów, którzy opublikowali ≥1 post z compliance-check w ciągu 14 dni |
| **Próg kill** | <20% przez 2 kolejne miesiące |
| **Czas** | Miesiące 2-4 |
| **Dlaczego** | Jeśli nawet darmowi użytkownicy nie chcą używać produktu, problem nie jest wystarczająco bolesny lub produkt jest za trudny |
| **Pivot** | Zmień wedge (np. z prawników na doradców finansowych) lub zmień model (z platformy na API dla agencji marketingowych) |

---

### KRITERIUM 2: Brak konwersji na płatnych

| Element | Definicja |
|---------|-----------|
| **Metryka** | Beta → paid conversion rate |
| **Próg kill** | <15% przez 2 kolejne miesiące (przy ≥10 beta testerów/miesiąc) |
| **Czas** | Miesiące 3-5 |
| **Dlaczego** | Użytkownicy korzystają, ale nie płacą = problem jest „nice to have", nie „must have" |
| **Pivot** | Obniż cenę o 50%; dodaj więcej value (content library); lub przejdź na model B2B (sprzedaj kancelariom, nie indywidualnym prawnikom) |

---

### KRITERIUM 3: Wysoki churn

| Element | Definicja |
|---------|-----------|
| **Metryka** | Monthly churn rate |
| **Próg kill** | >15% przez 2 kolejne miesiące |
| **Czas** | Miesiące 4-7 |
| **Dlaczego** | Klienci przychodzą, ale nie zostają = produkt nie dostarcza obiecanej wartości lub konkurencja jest lepsza |
| **Pivot** | Zrób exit interview z każdym churned; jeśli powód = „za drogo" → obniż cenę; jeśli „nie działa" → rebuild; jeśli „nie potrzebuję" → pivot na inny segment |

---

### KRITERIUM 4: Incydent compliance (LLM hallucination z konsekwencjami)

| Element | Definicja |
|---------|-----------|
| **Metryka** | Liczba incydentów, gdzie użytkownik otrzymał karę / upomnienie od izby / regulatora z powodu błędnego checku |
| **Próg kill** | ≥1 incydent z karą finansową dla użytkownika ORAZ ≥3 incydenty z „false negative" (system powiedział „OK", a było źle) w ciągu miesiąca |
| **Czas** | Dowolny |
| **Dlaczego** | Jedna kara dla użytkownika = viral negative PR w całej branży; prawnicy przestaną ufać |
| **Pivot** | Całkowicie przebuduj engine: z LLM-first na rules-based-first + LLM jako assistant; lub zamknij ten use case i skup się na archiwizacji (mniej ryzykowne) |

---

### KRITERIUM 5: Brak product-market fit po 6 miesiącach

| Element | Definicja |
|---------|-----------|
| **Metryka** | MRR + NPS + retention |
| **Próg kill** | MRR < 5,000 PLN ORAZ NPS < 20 ORAND retention (3-miesięczna) < 40% po 6 miesiącach od launch |
| **Czas** | Miesiąc 6 |
| **Dlaczego** | Po 6 miesiącach powinieneś mieć jasny sygnał PMF; jeśli nie — rynek nie chce tego, co budujesz |
| **Pivot** | Pivot 1 (Compliance API dla agencji) lub Pivot 2 (White-label dla sieci kancelarii); lub zamknij projekt |

---

### PODSUMOWANIE KILL CRITERIA

| # | Kryterium | Metryka | Próg kill | Kiedy | Co robisz |
|---|-----------|---------|-----------|-------|-----------|
| 1 | Brak aktywacji | % beta z ≥1 postem | <20% × 2 mies. | Mies. 2-4 | Pivot wedge lub model |
| 2 | Brak konwersji | Beta → paid rate | <15% × 2 mies. | Mies. 3-5 | Obniż cenę lub B2B |
| 3 | Wysoki churn | Monthly churn | >15% × 2 mies. | Mies. 4-7 | Exit interviews + pivot |
| 4 | Incydent compliance | False negatives | ≥1 z karą lub ≥3/mies. | Dowolny | Rebuild engine lub zamknij |
| 5 | Brak PMF | MRR + NPS + retention | <5K PLN + <20 NPS + <40% | Mies. 6 | Pivot lub zamknij |

---

## PODSUMOWANIE DLA ZESPOŁU

| Element | Rekomendacja |
|---------|-------------|
| **Największe ryzyko** | LLM hallucination → odpowiedzialność (Score 20/25) |
| **Najważniejsza mitigacja** | Human-in-the-loop mandatory + rules-based engine + E&O insurance |
| **Budżet prawniczy przed startem** | ~25K PLN (must-have); ~46K PLN (full) |
| **Budżet 12 miesięcy** | ~318K PLN (~73K EUR) |
| **Źródło finansowania** | Grant (PARP/NCBR) + angel/pre-seed |
| **Kill #1 (najwcześniejszy)** | Brak aktywacji — miesiąc 4 |
| **Kill #5 (ostateczny)** | Brak PMF — miesiąc 6 |
| **Najważniejszy early warning** | % beta z opublikowanym postem — mierz co tydzień |

---

*Analiza przygotowana na podstawie researchu EU AI Act, OpenAI/Anthropic ToS, case law (Mata v. Avianca, 720+ incydentów AI hallucination), ubezpieczeń AI E&O, oraz best practices Smarsh/Global Relay.*
