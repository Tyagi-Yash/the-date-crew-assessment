# The Date Crew — Product & Tech Generalist Assessment

**Candidate Assessment Submission**  
**Role:** Product & Tech Generalist / Product Engineer  
**Contact / Submission:** tech@thedatecrew.com  

---

## Part 1 — Diagnose the Problem

### 1. Three questions I would investigate

**Question 1: Why does Matchmaker A achieve a 44% profile acceptance rate while Matchmaker B achieves only 21%?**  
**Why it matters:** A greater than 2x performance divergence between matchmakers indicates that matchmaking outcomes are driven by subjective, unstandardized screening habits rather than intrinsic candidate pool quality. Investigating whether Matchmaker A uses better client elicitation frameworks, specific search filters, or different candidate presentation techniques can unlock immediate best practices for the entire team.

**Question 2: Why are 35% of rejected profiles failing on criteria already documented in client preferences?**  
**Why it matters:** In the 30-day funnel, 690 out of 1,000 shared profiles were rejected. A 35% rate means ~241 profiles (24.1% of all profiles shared) were doomed before dispatch because they violated stated deal-breakers (e.g., smoking, location, children). Investigating why matchmakers miss known preferences—whether due to memory fatigue from 2-hour manual searches or lack of pre-filtering tools—addresses the single highest-leverage leak in the business.

**Question 3: Why do clients initially reject profiles but later accept candidates with near-identical attributes?**  
**Why it matters:** This reveals whether client preferences are rigid deal-breakers or fluid trade-offs. Investigating whether this stems from poor profile presentation, shifting client expectations over time, or mismatched "stated vs. revealed" preferences helps us decide between strict filtering versus soft-compatibility ranking.

---

### 2. Biggest problem in the funnel

The single biggest problem in the funnel is **top-of-funnel waste and cognitive overload at Stage 1 (Profiles Shared → Accepted)**. 

**Facts from Data:**
- 690 of 1,000 shared profiles are rejected (a massive 69.0% initial drop-off).
- ~241 rejected profiles (35% of 690) violated preferences already captured in client records.
- Matchmakers spend ~2 hours per client weekly manually searching database pools.
- Downstream conversion is relatively healthy: 67.7% of accepted profiles progress to contact sharing, and 71.4% start conversations.

**Assumptions & Hypothesis:**
Assuming a matchmaker manages 12–15 clients, they spend 24–30 hours weekly manually scanning candidate pools without automated constraint checks. Under cognitive fatigue, matchmakers send profiles that violate basic non-negotiables (e.g., sending a social smoker to a strictly non-smoking client). Because rejection feedback is unstructured text, learnings are lost. This burns client trust and wastes matchmaker capacity. The downstream stages are healthy; the system is starved at the top by manual, error-prone candidate curation.

---

### 3. Three metrics I would track

**Metric 1: Preference-Conflict Rejection Rate**  
**Why:** Directly tracks the percentage of client rejections caused by attributes already documented in client preferences (baseline: ~35%). A reduction directly validates automated constraint enforcement.

**Metric 2: Matchmaker Search Time per Client/Week**  
**Why:** Measures operational efficiency against the 2.0-hour baseline. Reducing manual search time frees matchmakers to focus on high-touch coaching and relationship-building.

**Metric 3: Qualified-Profile Acceptance Rate**  
**Why:** Evaluates the acceptance rate strictly among candidate profiles that satisfy 100% of hard constraints. This separates avoidable logistical mismatches from true interpersonal attraction.

---

## Part 2 — Design a Solution

### Problem
Matchmakers spend ~2 hours per client weekly manually scanning candidate pools, yet 35% of rejections fail on criteria clients already explicitly specified (smoking, location, age, family planning). Unassisted search causes cognitive fatigue, inconsistent matchmaker performance (44% vs 21%), and avoidable client churn. Furthermore, rejection feedback remains trapped in unstructured emails, preventing systematic matching improvements.

### User
- **Primary User:** The Date Crew Matchmakers (internal decision-support copilot).
- **Secondary Beneficiary:** Matchmaking Clients (who experience higher match relevance and fewer frustrating, avoidable mismatches).

### Solution
We design the **Preference-Aware Matchmaking Assistant**—a decision-support tool that standardizes candidate screening while keeping the human matchmaker in full control:

1. **Preference Normalization:** Onboarding captures two distinct tiers: *Hard Constraints / Deal-Breakers* (non-negotiable: smoking habits, children preference, hard age bounds, acceptable metros) and *Soft Preferences* (weighted ranking signals: industry, education, lifestyle interests).
2. **Automated Constraint Screening:** When a matchmaker opens a client profile, candidate pools are instantly evaluated against hard constraints. Conflicting candidates are automatically excluded with explicit violation tags (e.g., *"Excluded: Smokes socially — violates client's non-negotiable rule"*).
3. **Transparent Compatibility Ranking:** Eligible candidates receive an explainable score (0–100) based on weighted soft-attribute alignment. Matchmakers click *"Why this profile?"* to inspect exact score additions (+25 Location, +20 Industry, +20 Lifestyle, +10 Education).
4. **Human Curation & Sharing:** The matchmaker reviews the ranked shortlist, adds personalized notes, and marks selected profiles as shared with the client.
5. **AI Rejection Classifier & Learning Loop:** When a client rejects a profile, the matchmaker logs the feedback. An AI parser structures messy free text into standardized categories, flags whether it was an avoidable conflict, and updates client preferences for future matching runs.

### Data
Minimum viable data schema:
- **Client Record:** Demographic baseline, Deal-Breakers (`smokingAllowed[]`, `drinkingAllowed[]`, `childrenPreferenceAllowed[]`, `minAge`, `maxAge`, `allowedLocations[]`), Soft Preference weights, Assigned Matchmaker ID.
- **Candidate Record:** Demographics, lifestyle tags, habits, education, verified profile flags.
- **Interaction & Feedback Logs:** Candidate ID, Client ID, status (`Screened`, `Shared`, `Accepted`, `Rejected`), raw text feedback, AI-extracted category/reason, confidence score, and avoidable conflict flag.

### Technology
A pragmatic, low-risk architecture buildable by one engineer in two weeks:
- **Frontend:** React + TypeScript + Vite with vanilla CSS for clean, responsive UI and rapid development.
- **Rules & Compatibility Engine:** Pure deterministic TypeScript engine. Boolean constraint verification combined with additive weighted scoring. Determinism guarantees complete explainability without LLM hallucinations.
- **AI Feedback Structuring:** Lightweight LLM API call (e.g., Gemini 1.5 Flash / GPT-4o-mini) with structured JSON schema output (`{ category, primaryReason, confidence, wasAvoidableConflict }`). AI is applied strictly to unstructured text parsing rather than opaque matchmaking decisions.
- **Data Layer:** Local state / Supabase PostgreSQL.

### Success Metric
- **Primary Success Metric:** *Preference-Conflict Rejection Rate* (Baseline: ~35% of all rejections).
- **Proposed Pilot Target:** Reduce preference-conflict rejections from **~35% to below 18%** within a two-week pilot across 5 matchmakers.
- **Secondary Efficiency Target:** Reduce matchmaker search time from **2.0 hours to 1.2–1.5 hours** per client/week, while narrowing the performance gap between matchmakers.

---

## Part 3 — Prototype

### What Was Built
A high-fidelity, interactive **Preference-Aware Matchmaking Assistant** built with React, TypeScript, and Vite. 

- **Live Prototype URL (Local):** `http://localhost:5173/`
- **Source Code Repository:** Included in this repository.

### Key Workflows Demonstrated
1. **Client Switching & Preference Codification:** Switch between 3 realistic clients (Aarav, Dr. Meera, Kabir). The sidebar explicitly distinguishes **Hard Deal Breakers** (non-negotiable) from **Soft Preferences** (ranking signals).
2. **Automated Screening & Funnel Counter:** The top banner displays live evaluation metrics (e.g., 10 Screened, 3 Eligible, 7 Excluded, 7 Avoidable Mismatches Saved).
3. **Candidate Status & Explainable Scoring:** Candidate cards display statuses (`Recommended`, `Review`, `Excluded`). Clicking *"Why this profile? (Score Breakdown)"* reveals the complete deal-breaker audit and additive point breakdown (+25 Location, +20 Age, +20 Industry, etc.).
4. **Hard Exclusion Warnings:** Candidates violating deal-breakers (e.g., Tanya Verma who smokes socially, or Vikram Sethi who does not want children) are flagged with prominent red banners explaining the exact conflict.
5. **AI Rejection Structuring:** Clicking *"Record Rejection"* opens an interactive modal. Typing or selecting free-text feedback (e.g., *"I liked her profile but she smokes occasionally..."*) triggers real-time AI classification into structured taxonomy tags, confidence scores, and avoidable conflict alerts.
6. **Pilot KPI Dashboard:** Clicking *"Funnel & Pilot KPIs"* opens the full 30-day funnel conversion table and pilot benchmark targets.

### Where AI is Used vs. What is Mocked
- **Where AI is Used:** AI is applied strictly to unstructured text parsing in `src/engine/aiFeedbackParser.ts` to convert messy qualitative notes into structured taxonomy and audit against client preferences.
- **What is Mocked:** Candidate profiles and client rosters are synthetic realistic data. The NLP parser runs a deterministic semantic heuristic simulating an LLM structured output schema to ensure zero runtime dependencies or fragile API key failures during evaluation.

### Prototype Screenshots
- **Application Overview:** `public/screenshots/app_overview.png`
- **Score Breakdown & Explainability:** `public/screenshots/app_overview.png`
- **AI Rejection Modal:** `public/screenshots/rejection_modal.png`
- **Funnel & Pilot KPI Dashboard:** `public/screenshots/kpi_dashboard.png`

---

## Part 4 — One Curveball

**Scenario:** The solution launches, and two weeks later, the target metric (*Preference-Conflict Rejection Rate*) does not move at all.

### 1. What I Would Check First
**Adoption and Workflow Compliance.** I would verify whether matchmakers are actually using the tool or bypassing recommendations to continue manual search via email and personal spreadsheets. If matchmakers bypass the tool or override excluded candidates, the system cannot affect outcomes.

### 2. What Data I Would Look At
- **Telemetry & Funnel Usage:** Tool daily active usage, count of candidate cards evaluated vs profiles shared, and manual override rates.
- **AI Classification Audit:** Manual review of a 100-sample rejection batch comparing client raw text against AI tags to detect NLP misclassification.
- **Intake Freshness:** Delta between client onboarding date and recommendation date to check if client preferences shifted unrecorded.
- **Matchmaker Cohort Variance:** Acceptance rates split between Matchmaker A and Matchmaker B to identify individual adoption resistance.

### 3. Iteration, Pivot, or Kill Decision Framework
- **If adoption is low (<50%):** Iterate on UX friction, integrate directly into email workflows, and conduct matchmaker training.
- **If adoption is high but classification is inaccurate:** Retrain the feedback taxonomy and prompt schemas.
- **If tool is fully adopted and classifications are accurate but rejections persist:** Pivot. The root cause is not search failure, but a divergence between "stated" and "revealed" preferences (clients claim deal-breakers they don't actually hold, or vice-versa).
- **Kill:** Only if automated pre-filtering demonstrably decreases overall client conversion compared to manual baseline.

---

## AI Usage

1. **Tools Used:** Antigravity IDE (powered by Gemini 3.8 Flash) for end-to-end product reasoning, full-stack React/TypeScript prototyping, and automated test authoring.
2. **What I Used Them For:** Accelerating UI component construction, designing the deterministic scoring engine, generating realistic Indian matrimonial test profiles, and implementing the NLP feedback structuring module.
3. **One Thing I Disagreed With / Changed:** The AI initially recommended using an end-to-end LLM prompt to compute match scores and rank candidates. I rejected and changed this to a deterministic, rule-based constraint checker with weighted additive scoring because human matchmakers must transparently explain recommendations to clients, and opaque LLM matchmaking is unpredictable and prone to hallucinations.
