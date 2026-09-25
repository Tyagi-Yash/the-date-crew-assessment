import React, { useState } from 'react';
import {
  FileText,
  HelpCircle,
  TrendingDown,
  BarChart3,
  Layers,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Cpu,
} from 'lucide-react';

export const AssessmentAnswersView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'all' | 'part1' | 'part2' | 'part3' | 'part4' | 'ai'>('all');

  return (
    <div className="answers-view-container">
      {/* ANSWERS HEADER */}
      <div className="answers-hero">
        <div className="answers-hero-tag">
          <FileText size={14} />
          <span>Official Assessment Document</span>
        </div>
        <h2 className="answers-hero-title">Product & Tech Generalist Assessment Answers</h2>
        <p className="answers-hero-sub">
          Quantitative funnel diagnosis, two-week copilot architecture, curveball triage framework, and AI usage disclosure.
        </p>

        {/* SECTION FILTER TABS */}
        <div className="answers-nav-tabs">
          <button
            className={`ans-tab ${activeSection === 'all' ? 'active' : ''}`}
            onClick={() => setActiveSection('all')}
          >
            All Sections
          </button>
          <button
            className={`ans-tab ${activeSection === 'part1' ? 'active' : ''}`}
            onClick={() => setActiveSection('part1')}
          >
            Part 1: Diagnosis 
          </button>
          <button
            className={`ans-tab ${activeSection === 'part2' ? 'active' : ''}`}
            onClick={() => setActiveSection('part2')}
          >
            Part 2: Solution
          </button>
          <button
            className={`ans-tab ${activeSection === 'part3' ? 'active' : ''}`}
            onClick={() => setActiveSection('part3')}
          >
            Part 3: Prototype
          </button>
          <button
            className={`ans-tab ${activeSection === 'part4' ? 'active' : ''}`}
            onClick={() => setActiveSection('part4')}
          >
            Part 4: Curveball
          </button>
          <button
            className={`ans-tab ${activeSection === 'ai' ? 'active' : ''}`}
            onClick={() => setActiveSection('ai')}
          >
            AI Usage
          </button>
        </div>
      </div>

      <div className="answers-content-stack">
        {/* =======================================================
            PART 1 — DIAGNOSE THE PROBLEM
            ======================================================= */}
        {(activeSection === 'all' || activeSection === 'part1') && (
          <section className="answer-card-block" id="part1">
            <div className="answer-card-header">
              <div className="ans-header-left">
                <span className="ans-part-badge">Part 1</span>
                <h3 className="ans-title">Diagnose the Problem</h3>
              </div>
            </div>

            <div className="answer-card-body">
              <div className="ans-sub-block">
                <h4 className="ans-sub-heading">1. Three Questions I Would Investigate</h4>
                
                <div className="question-item">
                  <div className="q-label">Question 1:</div>
                  <p className="q-text">
                    <strong>Why does Matchmaker A achieve a 44% profile acceptance rate while Matchmaker B achieves only 21%?</strong>
                  </p>
                  <div className="q-why">
                    <em>Why it matters:</em> A greater than 2x performance divergence between matchmakers indicates that matchmaking outcomes are driven by subjective, unstandardized screening habits rather than intrinsic candidate pool quality. Investigating whether Matchmaker A uses better client elicitation frameworks, specific search filters, or different candidate presentation techniques can unlock immediate best practices for the entire team.
                  </div>
                </div>

                <div className="question-item">
                  <div className="q-label">Question 2:</div>
                  <p className="q-text">
                    <strong>Why are 35% of rejected profiles failing on criteria already documented in client preferences?</strong>
                  </p>
                  <div className="q-why">
                    <em>Why it matters:</em> In the 30-day funnel, 690 out of 1,000 shared profiles were rejected. A 35% rate means ~241 profiles (24.1% of all profiles shared) were doomed before dispatch because they violated stated deal-breakers (e.g., smoking, location, children). Investigating why matchmakers miss known preferences—whether due to memory fatigue from 2-hour manual searches or lack of pre-filtering tools—addresses the single highest-leverage leak in the business.
                  </div>
                </div>

                <div className="question-item">
                  <div className="q-label">Question 3:</div>
                  <p className="q-text">
                    <strong>Why do clients initially reject profiles but later accept candidates with near-identical attributes?</strong>
                  </p>
                  <div className="q-why">
                    <em>Why it matters:</em> This reveals whether client preferences are rigid deal-breakers or fluid trade-offs. Investigating whether this stems from poor profile presentation, shifting client expectations over time, or mismatched "stated vs. revealed" preferences helps us decide between strict filtering versus soft-compatibility ranking.
                  </div>
                </div>
              </div>

              <div className="ans-sub-block">
                <h4 className="ans-sub-heading">2. Biggest Problem in the Funnel</h4>
                <p>
                  The single biggest problem in the funnel is <strong>top-of-funnel waste and cognitive overload at Stage 1 (Profiles Shared → Accepted)</strong>.
                </p>
                <div className="ans-facts-callout">
                  <strong>Facts from Data:</strong>
                  <ul>
                    <li>690 of 1,000 shared profiles are rejected (a massive 69.0% initial drop-off).</li>
                    <li>~241 rejected profiles (35% of 690) violated preferences already captured in client records.</li>
                    <li>Matchmakers spend ~2 hours per client weekly manually searching database pools.</li>
                    <li>Downstream conversion is relatively healthy: 67.7% of accepted profiles progress to contact sharing, and 71.4% start conversations.</li>
                  </ul>
                </div>
                <p>
                  <strong>Assumptions & Hypothesis:</strong> Assuming a matchmaker manages 12–15 clients, they spend 24–30 hours weekly manually scanning candidate pools without automated constraint checks. Under cognitive fatigue, matchmakers send profiles that violate basic non-negotiables (e.g., sending a social smoker to a strictly non-smoking client). Because rejection feedback is unstructured text, learnings are lost. This burns client trust and wastes matchmaker capacity. The downstream stages are healthy; the system is starved at the top by manual, error-prone candidate curation.
                </p>
              </div>

              <div className="ans-sub-block">
                <h4 className="ans-sub-heading">3. Three Metrics I Would Track</h4>
                <div className="metrics-summary-grid">
                  <div className="metric-def-box">
                    <span className="metric-def-num">1</span>
                    <strong>Preference-Conflict Rejection Rate</strong>
                    <p>Directly tracks the percentage of client rejections caused by attributes already documented in client preferences (baseline: ~35%). A reduction directly validates automated constraint enforcement.</p>
                  </div>
                  <div className="metric-def-box">
                    <span className="metric-def-num">2</span>
                    <strong>Matchmaker Search Time per Client/Week</strong>
                    <p>Measures operational efficiency against the 2.0-hour baseline. Reducing manual search time frees matchmakers to focus on high-touch coaching and relationship-building.</p>
                  </div>
                  <div className="metric-def-box">
                    <span className="metric-def-num">3</span>
                    <strong>Qualified-Profile Acceptance Rate</strong>
                    <p>Evaluates acceptance strictly among profiles that satisfy 100% of hard constraints. This separates avoidable logistical mismatches from true interpersonal chemistry.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =======================================================
            PART 2 — DESIGN A SOLUTION
            ======================================================= */}
        {(activeSection === 'all' || activeSection === 'part2') && (
          <section className="answer-card-block" id="part2">
            <div className="answer-card-header">
              <div className="ans-header-left">
                <span className="ans-part-badge">Part 2</span>
                <h3 className="ans-title">Design a Solution: Preference-Aware Matchmaking Assistant</h3>
              </div>
            </div>

            <div className="answer-card-body">
              <div className="design-section-grid">
                <div className="design-cell">
                  <h4 className="cell-title">Problem</h4>
                  <p>
                    Matchmakers spend ~2 hours per client weekly manually scanning candidate pools, yet 35% of rejections fail on criteria clients already explicitly specified (smoking, location, age, family planning). Unassisted search causes cognitive fatigue, inconsistent matchmaker performance (44% vs 21%), and avoidable client churn. Furthermore, rejection feedback remains trapped in unstructured emails, preventing systematic matching improvements.
                  </p>
                </div>

                <div className="design-cell">
                  <h4 className="cell-title">User</h4>
                  <p>
                    <strong>Primary User:</strong> The Date Crew Matchmakers (internal decision-support copilot).<br />
                    <strong>Secondary Beneficiary:</strong> Matchmaking Clients (who experience higher match relevance and fewer frustrating, avoidable mismatches).
                  </p>
                </div>
              </div>

              <div className="ans-sub-block" style={{ marginTop: '1.25rem' }}>
                <h4 className="ans-sub-heading">Solution Workflow (5 Steps)</h4>
                <ol className="ans-steps-list">
                  <li>
                    <strong>Preference Normalization:</strong> Onboarding captures two distinct tiers: <em>Hard Constraints / Deal-Breakers</em> (non-negotiable: smoking habits, children preference, hard age bounds, acceptable metros) and <em>Soft Preferences</em> (weighted ranking signals: industry, education, lifestyle interests).
                  </li>
                  <li>
                    <strong>Automated Constraint Screening:</strong> When a matchmaker opens a client profile, candidate pools are instantly evaluated against hard constraints. Conflicting candidates are automatically excluded with explicit violation tags (e.g., <em>"Excluded: Smokes socially — violates client's non-negotiable rule"</em>).
                  </li>
                  <li>
                    <strong>Transparent Compatibility Ranking:</strong> Eligible candidates receive an explainable score (0–100) based on weighted soft-attribute alignment. Matchmakers click <em>"Why this profile?"</em> to inspect exact score additions (+25 Location, +20 Industry, +20 Lifestyle, +10 Education).
                  </li>
                  <li>
                    <strong>Human Curation & Context-Aware Email Dispatch:</strong> The matchmaker reviews the ranked shortlist, generates a bespoke introduction email based on shared passions, and shares selected candidates. If an excluded candidate has special merits, the matchmaker can send with a recorded override justification.
                  </li>
                  <li>
                    <strong>AI Rejection Classifier & Learning Loop:</strong> When a client rejects a profile, the matchmaker logs the feedback. An AI parser structures messy free text into standardized categories, flags whether it was an avoidable conflict, and updates client preferences for future matching runs.
                  </li>
                </ol>
              </div>

              <div className="design-section-grid" style={{ marginTop: '1.25rem' }}>
                <div className="design-cell">
                  <h4 className="cell-title">Data Schema</h4>
                  <ul>
                    <li><strong>Client Record:</strong> Demographic baseline, Deal-Breakers (<code>smokingAllowed[]</code>, <code>drinkingAllowed[]</code>, <code>childrenPreferenceAllowed[]</code>, <code>minAge</code>, <code>maxAge</code>, <code>allowedLocations[]</code>), Soft Preference weights.</li>
                    <li><strong>Candidate Record:</strong> Demographics, lifestyle tags, habits, education, verified flags.</li>
                    <li><strong>Interaction & Feedback Logs:</strong> Candidate ID, Client ID, status, raw text feedback, AI-extracted category/reason, confidence score, and avoidable conflict flag.</li>
                  </ul>
                </div>

                <div className="design-cell">
                  <h4 className="cell-title">Technology & Success Metric</h4>
                  <p>
                    <strong>Technology:</strong> React + TypeScript + Vite with vanilla CSS for clean, responsive UI. Pure deterministic TypeScript scoring engine for complete transparency. Lightweight structured LLM text parsing for unstructured client feedback.<br />
                    <strong>Success Metric:</strong> Reduce <em>Preference-Conflict Rejection Rate</em> from <strong>~35% to below 18%</strong> within a 2-week pilot. Reduce matchmaker search time from <strong>2.0 to 1.2–1.5 hrs</strong>/client/week.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =======================================================
            PART 3 — PROTOTYPE EXPLANATION
            ======================================================= */}
        {(activeSection === 'all' || activeSection === 'part3') && (
          <section className="answer-card-block" id="part3">
            <div className="answer-card-header">
              <div className="ans-header-left">
                <span className="ans-part-badge">Part 3</span>
                <h3 className="ans-title">Build Something Small: Working Prototype</h3>
              </div>
            </div>

            <div className="answer-card-body">
              <div className="prototype-points-grid">
                <div className="point-card">
                  <CheckCircle2 size={16} className="point-icon success" />
                  <div>
                    <strong>Client Normalization Hub:</strong>
                    <p>Left panel clearly distinguishes non-negotiable Hard Requirements from weighted Strong and Soft Preferences.</p>
                  </div>
                </div>

                <div className="point-card">
                  <ShieldCheck size={16} className="point-icon primary" />
                  <div>
                    <strong>Automated Deal-Breaker Exclusion:</strong>
                    <p>Candidates violating smoking, age, or location rules are flagged as Excluded to prevent avoidable client drop-offs.</p>
                  </div>
                </div>

                <div className="point-card">
                  <Layers size={16} className="point-icon info" />
                  <div>
                    <strong>Slide-Over "Why This Profile?":</strong>
                    <p>Slide-over drawer displays a circular compatibility gauge (0–100) and step-by-step additive score breakdown.</p>
                  </div>
                </div>

                <div className="point-card">
                  <Sparkles size={16} className="point-icon accent" />
                  <div>
                    <strong>AI Rejection Feedback Classifier:</strong>
                    <p>Parses free-text feedback into structured taxonomies, confidence scores, and avoidable conflict alerts.</p>
                  </div>
                </div>

                <div className="point-card">
                  <AlertTriangle size={16} className="point-icon warning" />
                  <div>
                    <strong>Override Email Generator:</strong>
                    <p>Allows matchmakers to send even blocked profiles if justified, capturing a mandatory audit reason and tailored intro draft.</p>
                  </div>
                </div>

                <div className="point-card">
                  <BarChart3 size={16} className="point-icon neutral" />
                  <div>
                    <strong>Funnel & Pilot KPI Dashboard:</strong>
                    <p>Full 30-day conversion funnel table benchmarking baseline drop-offs against proposed pilot targets.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =======================================================
            PART 4 — ONE CURVEBALL
            ======================================================= */}
        {(activeSection === 'all' || activeSection === 'part4') && (
          <section className="answer-card-block" id="part4">
            <div className="answer-card-header">
              <div className="ans-header-left">
                <span className="ans-part-badge">Part 4</span>
                <h3 className="ans-title">One Curveball: Target Metric Does Not Move</h3>
              </div>
            </div>

            <div className="answer-card-body">
              <p className="curveball-scenario">
                <em>Scenario: Two weeks post-launch, the target metric (Preference-Conflict Rejection Rate) stays flat at ~35%.</em>
              </p>

              <div className="curveball-triage-stack">
                <div className="triage-item">
                  <span className="triage-step">1</span>
                  <div>
                    <strong>What I Would Check First: Adoption and Workflow Compliance</strong>
                    <p>I would verify whether matchmakers are actually using the tool or bypassing recommendations to continue manual search via email and personal spreadsheets. If matchmakers bypass the tool or override excluded candidates, the system cannot affect outcomes.</p>
                  </div>
                </div>

                <div className="triage-item">
                  <span className="triage-step">2</span>
                  <div>
                    <strong>What Data I Would Look At:</strong>
                    <p>
                      • <strong>Telemetry & Funnel Usage:</strong> Tool daily active usage, count of candidate cards evaluated vs profiles shared, and manual override rates.<br />
                      • <strong>AI Classification Audit:</strong> Manual review of a 100-sample rejection batch comparing client raw text against AI tags to detect NLP misclassification.<br />
                      • <strong>Intake Freshness:</strong> Delta between client onboarding date and recommendation date to check if client preferences shifted unrecorded.<br />
                      • <strong>Matchmaker Cohort Variance:</strong> Acceptance rates split between Matchmaker A and Matchmaker B to identify individual adoption resistance.
                    </p>
                  </div>
                </div>

                <div className="triage-item">
                  <span className="triage-step">3</span>
                  <div>
                    <strong>Decision Framework: Iterate, Pivot, or Kill:</strong>
                    <p>
                      • <strong>If adoption is low (&lt;50%):</strong> Iterate on UX friction, integrate directly into email workflows, and conduct matchmaker training.<br />
                      • <strong>If adoption is high but classification is inaccurate:</strong> Retrain the feedback taxonomy and prompt schemas.<br />
                      • <strong>If tool is fully adopted and classifications are accurate but rejections persist:</strong> Pivot. The root cause is not search failure, but a divergence between "stated" and "revealed" preferences (clients claim deal-breakers they don't actually hold, or vice-versa).<br />
                      • <strong>Kill:</strong> Only if automated pre-filtering demonstrably decreases overall client conversion compared to manual baseline.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =======================================================
            AI USAGE DISCLOSURE
            ======================================================= */}
        {(activeSection === 'all' || activeSection === 'ai') && (
          <section className="answer-card-block" id="ai-usage">
            <div className="answer-card-header">
              <div className="ans-header-left">
                <span className="ans-part-badge">AI Usage</span>
                <h3 className="ans-title">AI Usage Disclosure</h3>
              </div>
            </div>

            <div className="answer-card-body">
              <div className="ai-disclosure-box">
                <ol className="ai-disclosure-list">
                  <li>
                    <strong>Tools Used:</strong> Antigravity IDE (powered by Gemini 3.8 Flash) for end-to-end product reasoning, full-stack React/TypeScript prototyping, and automated test authoring.
                  </li>
                  <li>
                    <strong>What I Used Them For:</strong> Accelerating UI component construction, designing the deterministic scoring engine, generating realistic Indian matrimonial test profiles, and implementing the NLP feedback structuring module.
                  </li>
                  <li>
                    <strong>One Thing I Disagreed With / Changed:</strong> The AI initially recommended using an end-to-end LLM prompt to compute match scores and rank candidates. I rejected and changed this to a deterministic, rule-based constraint checker with weighted additive scoring because human matchmakers must transparently explain recommendations to clients, and opaque LLM matchmaking is unpredictable and prone to hallucinations.
                  </li>
                </ol>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
