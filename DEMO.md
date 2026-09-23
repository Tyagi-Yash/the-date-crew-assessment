# The Date Crew — Evaluator Demo Script (2-Minute Walkthrough)

Follow this quick step-by-step script to test and experience the **Preference-Aware Matchmaking Assistant** prototype in under two minutes.

---

### Step 1: Launch the Prototype
Ensure the app is running:
```bash
npm install
npm run dev
```
Open **`http://localhost:5173`** in your browser.

---

### Step 2: Observe the Matchmaking Workspace
1. Notice the top banner showing the active client: **Aarav Sharma** (31, Bangalore, Senior Product Manager).
2. Look at the top screening funnel metrics:
   - **Candidates Screened**: 10
   - **Eligible Candidates**: 3
   - **Excluded by Constraints**: 7
   - **Avoidable Mismatches Saved**: 7
   - **Top Recommendations**: 1

---

### Step 3: Inspect Client Preferences (Sidebar)
Look at the left sidebar for Aarav Sharma:
- **Hard Deal Breakers (Non-Negotiable)**:
  - Smoking: Strictly `never`
  - Locations: Bangalore, Mumbai only
  - Age: 26 to 32
  - Children: Wants or open
- **Soft & Weighted Preferences**:
  - Target Industry: Product, Design, Tech
  - Lifestyle: Hiking, Reading, Fitness

---

### Step 4: Inspect Top Match & Explainable Scoring
1. Find **Ananya Sen** (Score: 95/100, Recommended).
2. Click **"Why this profile? (Score Breakdown)"**:
   - Notice the **Deal Breaker Audit**: 100% passed (Smoking: never, Age: 29, City: Bangalore, Children: wants).
   - Notice the **Weighted Score Breakdown**: +25 Location, +20 Age, +20 Industry, +20 Lifestyle, +10 Education = 95/100.
3. Click **"Share Profile"** → Notice the status changes to *"Shared via Email with Client"*.

---

### Step 5: Observe Avoidable Deal-Breaker Exclusions
Scroll down to the **Excluded Profiles**:
1. **Tanya Verma**: Flagged with a red alert banner:  
   *`Constraint Conflict: Smoking Habit: Candidate smokes 'socially', which violates client's non-negotiable rule (never)`*  
   *Notice the warning:* *"⚠️ Sharing this profile would cause an avoidable client rejection."* (This directly solves the 35% avoidable rejection problem!)
2. **Neha Kulkarni**: Excluded because her age (34) exceeds Aarav's hard maximum (32).
3. **Pooja Rao**: Excluded because her city (Hyderabad) is outside the allowed locations.

---

### Step 6: Test AI-Assisted Rejection Structuring
1. On any candidate (e.g., Tanya Verma or Rhea Kapoor), click **"Record Rejection"**.
2. In the modal, click the quick sample chip: **"Scenario 1"**  
   *(Input text: "I liked her profile but she smokes occasionally and I am not comfortable with that.")*
3. Watch the **AI Feedback Classifier** preview instantly:
   - **Extracted Reason**: `Smoking Habit Conflict (Deal Breaker / Habit)`
   - **Confidence**: `96%`
   - **Avoidable Preference Conflict Alert**: Displays that the client profile already required `never` smoking, highlighting why sending this candidate was an avoidable operational failure.
4. Select the **Smoking** category checkbox and click **"Save Rejection Record"**.
5. The card now updates to show: *"Rejected: Smoking Habit Conflict"*.

---

### Step 7: Inspect the Funnel & Pilot KPIs Dashboard
1. In the top navigation bar, click **"Funnel & Pilot KPIs"**.
2. Review the **3 Core Target Metrics**:
   - **Preference-Conflict Rejection Rate**: Baseline 35% → Proposed Pilot Target <20%
   - **Matchmaker Search Time**: Baseline 2.0 hrs → Proposed Pilot Target 1.2–1.5 hrs
   - **Matchmaker Acceptance Disparity**: Matchmaker A (44%) vs Matchmaker B (21%) → Proposed Target >40%
3. Review the complete **30-Day Conversion Funnel Analysis Table** displaying drop-offs at every stage from 1,000 shared profiles down to 42 completed dates.
4. Click **"Back to Matchmaking Assistant"**.

---

### Step 8: Multi-Client Dynamic Recalibration
1. In the client bar at the top, click **"Dr. Meera Iyer"** (29, Mumbai).
2. Notice the entire workspace recalibrates instantly:
   - Client deal-breakers update (Meera requires partner open to children).
   - **Vikram Sethi** (Hedge Fund Managing Director) is immediately marked as **Excluded**:  
     *`Children Preference: Candidate preference is 'doesn_not_want', conflicts with client family plan requirement`*.

---

### Key Takeaway
The prototype demonstrates that **we do not need an unpredictable AI black-box to do romantic matchmaking**. Instead, a **pragmatic decision-support tool** that enforces hard constraints and transparent additive scores prevents ~35% of avoidable failures and saves hours of manual search time, keeping the human matchmaker in control.
