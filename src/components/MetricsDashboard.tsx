import React from 'react';
import {
  X,
  TrendingUp,
  Clock,
  ShieldCheck,
  BarChart2,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';

interface MetricsDashboardProps {
  onClose: () => void;
  avoidableSavedCount: number;
}

export const MetricsDashboard: React.FC<MetricsDashboardProps> = ({
  onClose,
  avoidableSavedCount,
}) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog modal-dialog-xl" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        {/* MODAL HEADER */}
        <div className="modal-header">
          <div className="modal-title-wrap">
            <div className="header-meta-eyebrow">
              <span className="eyebrow-badge">Quantitative Assessment</span>
              <span>•</span>
              <span>The Date Crew 30-Day Operational Audit</span>
            </div>
            <h3 className="modal-title">Funnel Diagnosis & Pilot KPI Benchmarks</h3>
            <p className="modal-subtitle">
              Evaluating baseline funnel drop-offs against proposed 2-week pilot targets.
            </p>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {/* NOTICE BANNER */}
          <div className="kpi-disclaimer-banner">
            <AlertCircle size={16} className="disclaimer-icon" />
            <div className="disclaimer-text">
              <strong>Source Transparency:</strong> Baseline figures are extracted directly from The Date Crew's 30-day assignment data. Target metrics represent proposed pilot hypotheses for the Preference-Aware Matchmaking Assistant.
            </div>
          </div>

          {/* 3 CORE TARGET METRIC CARDS */}
          <div className="kpi-cards-grid">
            {/* KPI 1 */}
            <div className="kpi-card card-accent-plum">
              <div className="kpi-card-header">
                <span className="kpi-title">1. Preference-Conflict Rejection</span>
                <span className="kpi-tag-baseline">Baseline</span>
              </div>
              <div className="kpi-numbers-row">
                <div className="kpi-main-stat">35%</div>
                <div className="kpi-target-chip">
                  <span className="target-label">Target:</span>
                  <strong>&lt; 20%</strong>
                </div>
              </div>
              <p className="kpi-explanation">
                <strong>~241 of 690 rejections</strong> failed on criteria already documented in client preferences.
              </p>
              <div className="kpi-status-foot">
                <ShieldCheck size={14} className="status-icon success" />
                <span>Screening engine currently blocking {avoidableSavedCount} hard conflicts</span>
              </div>
            </div>

            {/* KPI 2 */}
            <div className="kpi-card card-accent-navy">
              <div className="kpi-card-header">
                <span className="kpi-title">2. Search Time per Client</span>
                <span className="kpi-tag-baseline">Baseline</span>
              </div>
              <div className="kpi-numbers-row">
                <div className="kpi-main-stat">2.0 hrs</div>
                <div className="kpi-target-chip">
                  <span className="target-label">Target:</span>
                  <strong>1.2–1.5 hrs</strong>
                </div>
              </div>
              <p className="kpi-explanation">
                Per client / week spent manually scanning databases. Automated pre-filtering saves 35% curation time.
              </p>
              <div className="kpi-status-foot">
                <Clock size={14} className="status-icon neutral" />
                <span>Frees ~10–12 hours weekly for a matchmaker managing 15 clients</span>
              </div>
            </div>

            {/* KPI 3 */}
            <div className="kpi-card card-accent-emerald">
              <div className="kpi-card-header">
                <span className="kpi-title">3. Matchmaker Variance</span>
                <span className="kpi-tag-proposed">Proposed Target</span>
              </div>
              <div className="kpi-numbers-row">
                <div className="kpi-main-stat">31% avg</div>
                <div className="kpi-target-chip target-emerald">
                  <span className="target-label">Target:</span>
                  <strong>&gt; 40%</strong>
                </div>
              </div>
              <p className="kpi-explanation">
                2.1x gap: Matchmaker A achieves <strong>44%</strong> acceptance vs Matchmaker B at <strong>21%</strong>.
              </p>
              <div className="kpi-status-foot">
                <TrendingUp size={14} className="status-icon success" />
                <span>Standardizes candidate pre-screening to elevate Matchmaker B</span>
              </div>
            </div>
          </div>

          {/* 30-DAY FUNNEL ANALYSIS TABLE */}
          <div className="funnel-table-section">
            <div className="section-title-bar">
              <BarChart2 size={16} className="section-bar-icon" />
              <h4 className="section-bar-title">The Date Crew — 30-Day Conversion Funnel Analysis</h4>
            </div>

            <div className="table-responsive-wrapper">
              <table className="funnel-table">
                <thead>
                  <tr>
                    <th>Funnel Stage</th>
                    <th>Volume</th>
                    <th>Stage Conversion</th>
                    <th>Cumulative %</th>
                    <th>Diagnostic Insight</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="row-bottleneck">
                    <td>
                      <div className="stage-cell">
                        <span className="stage-dot dot-danger" />
                        <strong>1. Profiles Shared → Accepted</strong>
                      </div>
                    </td>
                    <td className="vol-cell">1,000 → 310</td>
                    <td className="rate-cell rate-danger">31.0%</td>
                    <td className="cum-cell">31.0%</td>
                    <td className="insight-cell insight-danger">
                      <strong>Single biggest leak:</strong> 690 rejections. ~241 (35%) failed on known preferences.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="stage-cell">
                        <span className="stage-dot dot-neutral" />
                        <span>2. Accepted → Contact Shared</span>
                      </div>
                    </td>
                    <td className="vol-cell">310 → 210</td>
                    <td className="rate-cell">67.7%</td>
                    <td className="cum-cell">21.0%</td>
                    <td className="insight-cell">Mutual confirmation and client hesitation before exchanging phone numbers.</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="stage-cell">
                        <span className="stage-dot dot-neutral" />
                        <span>3. Contact Shared → Chat Started</span>
                      </div>
                    </td>
                    <td className="vol-cell">210 → 150</td>
                    <td className="rate-cell">71.4%</td>
                    <td className="cum-cell">15.0%</td>
                    <td className="insight-cell">Healthy texting engagement once contact details are provided.</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="stage-cell">
                        <span className="stage-dot dot-neutral" />
                        <span>4. Chat Started → Meeting Fixed</span>
                      </div>
                    </td>
                    <td className="vol-cell">150 → 75</td>
                    <td className="rate-cell">50.0%</td>
                    <td className="cum-cell">7.5%</td>
                    <td className="insight-cell">Scheduling friction or early conversation fizzling out before date is set.</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="stage-cell">
                        <span className="stage-dot dot-success" />
                        <span>5. Meeting Fixed → Completed</span>
                      </div>
                    </td>
                    <td className="vol-cell">75 → 42</td>
                    <td className="rate-cell rate-success">56.0%</td>
                    <td className="cum-cell cum-final">4.2%</td>
                    <td className="insight-cell">Final completed dates. 42 dates completed from 1,000 recommendations.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* MODAL FOOTER */}
        <div className="modal-footer">
          <button className="btn-modal-primary" onClick={onClose}>
            Back to Matchmaking Assistant
          </button>
        </div>
      </div>
    </div>
  );
};
