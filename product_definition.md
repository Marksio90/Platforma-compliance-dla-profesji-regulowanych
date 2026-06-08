# DEFINICJA PRODUKTU: Platforma compliance dla ekspertów regulowanych

**Data:** 2026-06-08  
**Rola:** Senior Product Manager + UX Strategist  
**Kontekst:** Wcześniejsza walidacja (żółty werdykt) + analiza konkurencji wskazała lukę w górnym-prawym kwadrancie (łatwość publikowania + pełny compliance). Wedge: doradcy finansowi USA.

---

## 1. PERSONA (1 — ta z najwyższym WTP)

| Atrybut | Szczegóły |
|---------|-----------|
| **Imię** | Michael |
| **Wiek** | 42 lata |
| **Zawód** | Financial Advisor / Wealth Manager |
| **Firma** | Independent RIA (Registered Investment Adviser), 12 osób, $180M AUM |
| **Doświadczenie** | 14 lat w branży; Series 7, 66; CFP®; wcześniej w Merrill Lynch, od 3 lat samodzielnie |
| **Cel** | Pozyskać 15-20 nowych klientów HNW rocznie przez LinkedIn; obecnie 80% klientów z referencji (niestabilne) |
| **Frustracja #1** | „Moja compliance officer (na pół etatu, $65K/rok) przegląda każdy mój post 3-5 dni. W tym czasie temat jest już cold. Publikuję 2x/miesiąc, podczas gdy konkurencja bez regulacji — codziennie." |
| **Cytat charakterystyczny** | *„I know I should be posting more. My prospects are on LinkedIn. But every time I write something, I hear my compliance officer's voice: 'You can't say that.' So I don't."* |
| **WTP** | WYSOKI — płaci $65K/rok za compliance officer na pół etatu SAMO na review postów; gotów zapłacić $200-400/miesiąc za narzędzie, które eliminuje ten bottleneck |
| **Tech-savviness** | Średni — używa LinkedIn daily, Salesforce, Outlook; nie jest "early adopter", ale kupuje narzędzia, które oszczędzają czas (Calendly, Zoom, Canva) |

**Dlaczego Michael, a nie prawnik czy lekarz:**
- Doradca finansowy ma NAJWYŻSZY WTP: bezpośredni związek między widocznością a revenue (AUM growth)
- Prawnik: content marketing działa wolniej (długi cykl decyzyjny klienta), WTP niższy
- Lekarz: większość ma pełną praktykę bez potrzeby marketingu; HIPAA straszniejsza niż FINRA, ale mniej doradców próbuje

---

## 2. 3 JOBS-TO-BE-DONE

### JTBD #1 (najczęstszy, najwyższy WTP)
> **Kiedy** napisałem post na LinkedIn o rynku akcyjnym / planowaniu emerytalnym / strategii podatkowej, **chcę** wiedzieć w ciągu 30 sekund, czy ten post jest zgodny z FINRA 2210 i czy zawiera wymagane disclaimery, **żeby** móc opublikować go natychmiast, zamiast czekać 3-5 dni na review compliance officer.

**Częstotliwość:** 3-5x/tydzień  
**WTP:** $200-400/miesiąc  
**Pain:** 9/10

---

### JTBD #2 (częsty, średni WTP)
> **Kiedy** nie mam pomysłu na post lub nie mam czasu pisać, **chcę** wybrać z biblioteki pre-approved tematów i wygenerować post dopasowany do mojego tonu i klientów, **żeby** publikować regularnie bez spędzania godzin na pisaniu.

**Częstotliwość:** 2-3x/tydzień  
**WTP:** $100-200/miesiąc (jako feature w pakiecie)  
**Pain:** 7/10

---

### JTBD #3 (rzadszy, ale krytyczny dla retencji)
> **Kiedy** FINRA lub SEC żądają audytu mojej aktywności w social mediach z ostatnich 2 lat, **chcę** wyeksportować kompletny, niezmienialny raport ze wszystkimi postami, timestampami, approvalami i disclaimerami, **żeby** udowodnić zgodność w ciągu 15 minut, zamiast spędzać 3 dni na ręcznym zbieraniu screenshotów.

**Częstotliwość:** 1-2x/rok (ale stresuje przez cały rok)  
**WTP:** $50-100/miesiąc (jako feature w pakiecie)  
**Pain:** 10/10 (gdy się zdarzy)

---

## 3. LISTA FUNKCJI (MVP = max 5 MUST)

| # | Funkcja | Priorytet | Uzasadnienie | Złożoność |
|---|---------|-----------|--------------|-----------|
| 1 | **Real-time compliance check** — AI analizuje post pod kątem FINRA 2210 (promises, testimonials, misleading claims) i zaznacza problemy w czasie rzeczywistym | **MUST** | Core JTBD #1; bez tego produkt nie ma sensu; to jest „engine" | L |
| 2 | **Auto-generated disclaimers** — system automatycznie dodaje wymagane disclaimery (np. „Past performance is not indicative of future results", „For educational purposes only") na podstawie typu treści i jurysdykcji | **MUST** | FINRA wymaga konkretnych disclaimers; ręczne dodawanie to źródło błędów i opóźnień | M |
| 3 | **1-klik publikacja na LinkedIn** — zatwierdzony post publikuje się bezpośrednio na LinkedIn przez API, z pełnym logiem | **MUST** | Bez tego Michael wraca do copy-paste; friction kill adoption | M |
| 4 | **Immutable audit log** — każdy post, edit, approval, disclaimer jest logowany z timestampem i hash-em; eksport do PDF dla regulatora | **MUST** | JTBD #3; bez tego nie ma „peace of mind"; konkurencja (Smarsh) ma to, ale bez publikowania | M |
| 5 | **Pre-approved content library** — biblioteka 50+ gotowych postów (market commentary, retirement planning, tax tips) z wbudowanym compliance; Michael edytuje i publikuje | **MUST** | JTBD #2; redukuje „blank page anxiety"; AdvisorStream udowodnił, że to działa | M |
| 6 | **Role & approval workflow** — junior advisor pisze → senior advisor / compliance officer approvuje → publikuje | SHOULD | Wymagane dla firm >1 osoba; Michael sam pracuje, więc nie jest blokujące dla MVP | M |
| 7 | **Multi-jurisdiction support** (SEC + state regulators) | SHOULD | Michael jest w jednym stanie; potrzebne dla skalowania, nie dla wedge | L |
| 8 | **Twitter/X publishing** | LATER | Michael używa LinkedIn; Twitter to <10% jego audytorium | S |
| 9 | **AI content generation** (custom post from prompt) | LATER | Pre-approved library wystarczy na MVP; custom AI to nice-to-have | L |
| 10 | **Analytics dashboard** (engagement, reach, lead tracking) | LATER | Michael patrzy na LinkedIn native analytics; nasze to nice-to-have | M |
| 11 | **Blog/website publishing** | LATER | Michael nie prowadzi bloga; LinkedIn to jego primary channel | M |
| 12 | **CRM integration** (Salesforce, Redtail) | LATER | Ułatwia tracking leadów, ale nie jest blokujące dla aktywacji | L |
| 13 | **Calendar/scheduling** (planowanie postów na przód) | LATER | Michael publikuje ad-hoc; scheduling to feature dla power users | M |
| 14 | **Team management / billing** | LATER | Michael jest solo; potrzebne dopiero przy firmach 5+ osób | M |
| 15 | **Mobile app** | LATER | Michael pisze posty na desktop (LinkedIn); mobile to phase 2 | L |

### MVP = funkcje 1-5 (5 MUST)

---

## 4. USER FLOW (główna ścieżka: rejestracja → pierwszy opublikowany post)

### Cel flow: Michael rejestruje się, pisze post, przechodzi compliance check, publikuje na LinkedIn — wszystko w < 10 minut.

| Krok | Nazwa | Co widzi Michael | Co robi system |
|------|-------|------------------|----------------|
| 1 | **Landing → Sign up** | Strona z value prop: „Publish on LinkedIn without compliance headaches"; CTA „Start free 14-day trial"; pola: email, password, profession (dropdown: Financial Advisor) | Tworzy konto; wysyła email weryfikacyjny; przypisuje do segmentu „financial_advisor" |
| 2 | **Onboarding (profil)** | Formularz: imię, nazwisko, firmy, licencje (Series 7, 66, CFP — checkboxes), jurysdykcja (state), LinkedIn profile URL | Zapisuje profil; konfiguruje compliance engine dla FINRA + wybranego stanu; inicjuje połączenie z LinkedIn API (OAuth) |
| 3 | **Dashboard (pierwszy raz)** | Pusty dashboard z 3 opcjami: „Write new post", „Browse content library", „View audit log"; tooltip: „Start with a pre-approved post — it's the fastest way" | Ładuje content library filtrowaną dla financial advisors; przygotowuje „quick start" experience |
| 4 | **Wybór z content library** | Michael klika „Browse content library"; widzi 10 kart z tematami: „Q2 Market Outlook", „Retirement Planning Myths", „Tax-Loss Harvesting 101"...; wybiera kartę | Ładuje template z placeholderami (imię, firma, ton); wstępnie oznacza compliance status jako „pre-approved" |
| 5 | **Edycja postu** | Edytor tekstu z templatem; Michael personalizuje (wstawia swoje imię, firmę, drobne zmiany); podgląd LinkedIn-format po prawej | Śledzi zmiany vs. oryginalny template; jeśli zmiany >20% tekstu, oznacza jako „requires compliance review" |
| 6 | **Compliance check (real-time)** | Michael klika „Check compliance"; w ciągu 3 sekund widzi: ✅ green check „No issues found" LUB ⚠️ yellow warning „This phrase may violate FINRA 2210(d)(1)" z sugestią poprawki | AI engine (rules-based + NLP) analizuje tekst pod kątem: promises of returns, unsubstantiated claims, missing disclaimers, testimonials; zwraca structured feedback |
| 7 | **Auto-disclaimer** | System automatycznie dodaje na dole postu: „For educational purposes only. Past performance does not guarantee future results. Consult a qualified financial advisor for personalized advice." Michael widzi to w podglądzie | Dobiera disclaimer na podstawie: typu treści (educational vs. promotional), wymogów stanu, licencji Michaela; loguje dodanie disclaimer do audit trail |
| 8 | **Final review → Publish** | Michael widzi finalny post z disclaimerem; klika „Publish to LinkedIn"; modal: „This will be published immediately and logged for audit. Confirm?" | Wysyła post przez LinkedIn API; zapisuje do bazy z: raw text, timestamp, hash, user_id, compliance_status, disclaimer_version; generuje audit log entry |
| 9 | **Confirmation + dashboard** | Toast: „Published! Your post is live on LinkedIn."; Dashboard pokazuje nowy post w „Recent Activity" z statusem „Published | Compliant | Audit log available" | Aktualizuje dashboard; inkrementuje licznik „posts published"; sprawdza, czy to pierwszy post (trigger dla „aha moment") |
| 10 | **Trial conversion** (dzień 13) | Email: „Your trial ends in 24 hours. You've published 4 posts this week — that's more than most advisors publish in a month. Keep the momentum."; CTA: „Upgrade to Pro — $99/month" | Sprawdza usage (posts published, compliance checks); jeśli ≥1 post opublikowany → wysyła personalized email; jeśli 0 postów → wysyła re-engagement z ofertą call |

---

## 5. „AHA MOMENT"

### Definicja:
> Michael pisze post, klika „Check compliance", widzi zielony checkmark w ciągu 3 sekund, klika „Publish", i jego post jest NA ŻYWO na LinkedIn — bez czekania 3 dni na approval compliance officer.

### Co dokładnie widzi/czuje:
1. **Widzi:** Zielony checkmark „No compliance issues found" + auto-generated disclaimer
2. **Czuje:** Ulga („Nie muszę się bać, że FINRA mnie ukarze") + siła („Mogę publikować kiedy chcę, nie kiedy compliance officer ma czas")
3. **Słyszy w głowie:** *„Holy shit, I just published something without waiting 3 days."*

### W którym momencie:
- **Krok 6-8** flow (compliance check → publish → live on LinkedIn)
- **Czas od rejestracji:** 5-8 minut (przy użyciu content library) lub 10-15 minut (przy pisaniu od zera)
- **Idealnie:** Pierwsza sesja, w ciągu 24h od rejestracji

### Co MUSI się wydarzyć, żeby doszło do aha moment:
| Warunek | Dlaczego krytyczne |
|---------|-------------------|
| Compliance check < 3 sekundy | Jeśli trwa >10s, Michael myśli „to też jest wolne" i traci zainteresowanie |
| Zero false positives | Jeśli system oznacza bezpieczny post jako „violation", Michael traci zaufanie |
| 1-klik publish | Jeśli wymaga 3 kliknięć i modal, friction zabija „magic" |
| Post faktycznie pojawia się na LinkedIn | Jeśli API fails i Michael musi copy-paste, cały promise pęka |
| Content library dostępna od razu | Michael nie ma pomysłu na post; bez library rezygnuje |

### Metryka aktywacji:
> **„Użytkownik opublikował 1 post z compliance-check w ciągu 7 dni od rejestracji."**

**Target:** 40-50% aktywacji (benchmark: SaaS tools ~20-30%, ale nasz flow jest prostszy niż większość)  
**Leading indicator:** 70% użytkowników, którzy wejdą w edytor, dokonują compliance check  
**Lag indicator:** 30-day retention dla aktywowanych użytkowników >60%

---

## 6. ŚWIADOME CIĘCIA (co celowo wycinamy z MVP)

| # | Co wycinamy | Uzasadnienie (1 zdanie) |
|---|-------------|------------------------|
| 1 | **Prawnicy i lekarze** | Wedge to doradcy finansowi USA; dodanie innych profesji wymaga innych rules engine (ABA Model Rules, HIPAA) — skomplikuje MVP o 3-4 miesiące bez dodania revenue |
| 2 | **Twitter/X, Facebook, Instagram** | Michael i 80% doradców finansowych używa LinkedIn jako primary channel; multi-channel to nice-to-have, które rozprasza zespół |
| 3 | **Custom AI content generation (prompt → post)** | Pre-approved content library wystarczy na MVP; custom AI to 6-miesięczny projekt ML, który nie zwiększa aktywacji — library daje ten sam wynik szybciej |
| 4 | **Mobile app (iOS/Android)** | Michael pisze posty na desktop; 85% usage będzie na web; mobile app to $50K+ i 3 miesiące, które lepiej przeznaczyć na core engine |
| 5 | **CRM integration (Salesforce, Redtail, Wealthbox)** | Integracja to „sticky feature" dla retencji, ale nie dla aktywacji; Michael aktywuje się bez CRM; dodamy w phase 2, gdy będziemy fight churn |
| 6 | **Multi-state / multi-jurisdiction** | Michael jest w jednym stanie; SEC + jeden state regulator to 80% use case; dodanie 50 stanów to law engine, który można kupić jako subscription (Practical Law, Wolters Kluwer) |
| 7 | **Team / enterprise features (RBAC, approval workflows, billing per seat)** | Michael jest solo advisor; 60% RIAs w USA to <5 osób; enterprise to phase 2, gdy mamy 500+ solo advisors i chcemy upsell |
| 8 | **Advanced analytics (engagement scoring, lead attribution, ROI dashboard)** | Michael patrzy na LinkedIn native analytics; nasz dashboard nie jest reason-to-buy; dodamy, gdy będzie to differentiator vs. AdvisorStream |

---

## PODSUMOWANIE PRODUKTU (1 strona A4)

| Element | Definicja |
|---------|-----------|
| **Target** | Solo i small-firm financial advisors (RIAs) w USA, $50M-$500M AUM |
| **Problem** | Compliance review blokuje publikowanie na LinkedIn (3-5 dni delay) |
| **Rozwiązanie** | Platforma, która w czasie rzeczywistym sprawdza post pod kątem FINRA, auto-generuje disclaimery i publikuje na LinkedIn z niezmiennym logiem audytowym |
| **MVP (5 funkcji)** | 1) Real-time compliance check 2) Auto-disclaimers 3) LinkedIn publish 4) Audit log 5) Content library |
| **Aha moment** | Publish post w < 3 minuty bez czekania na compliance officer |
| **Aktywacja** | 1 post opublikowany w ciągu 7 dni |
| **Cena** | $99/mo (solo) / $199/mo (small firm, do 5 osób) |
| **Timeline MVP** | 10-12 tygodni (2 deweloperów full-time + 1 PM + 1 compliance advisor part-time) |

---

*Definicja produktu przygotowana na podstawie wcześniejszej walidacji rynku i analizy konkurencji. MVP skupione na wedge (doradcy finansowi USA) z planem ekspansji na prawników i EU w fazach 2-3.*
