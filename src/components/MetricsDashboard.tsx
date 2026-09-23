import React from 'react';
import { X, TrendingUp, Clock, AlertTriangle, CheckCircle, BarChart2, ArrowRight } from 'lucide-react';

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
      <div className="modal-dialog" style={{ maxWidth: '780px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3>The Date Crew — Funnel & Pilot KPI Dashboard</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Quantitative baseline diagnosis vs proposed 2-week pilot targets
            </p>
          </div>
          <button onClick={onClose} style={{ color: 'var(--text-muted)' }}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* NOTICE BANNER */}
          <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 8, padding: '0.65rem 0.9rem', fontSize: '0.78rem', color: '#475569' }}>
            ℹ️ <strong>Pilot Simulation Notice:</strong> Baseline metrics are extracted directly from The Date Crew's 30-day assessment prompt. Target metrics represent proposed pilot goals for the Preference-Aware Matchmaking Assistant.
          </div>

          {/* 3 CORE TARGET METRICS */}
          <div className="metrics-grid-3">
            {/* KPI 1 */}
            <div className="metric-card-kpi" style={{ borderLeft: '4px solid #e11d48' }}>
              <h4>1. Preference-Conflict Rejection Rate</h4>
              <div className="kpi-row">
                <span className="kpi-main" style={{ color: '#e11d48' }}>35%</span>
                <span className="kpi-badge-target" style={{ background: '#ecfdf5', color: '#059669' }}>
                  Target: &lt;20%
                </span>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Baseline: ~241 profiles (35% of 690 rejections) failed on known preferences.
              </div>
              <div style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 600, marginTop: 4 }}>
                ✓ Prototype status: Blocked {avoidableSavedCount} hard conflicts in current pool
              </div>
            </div>

            {/* KPI 2 */}
            <div className="metric-card-kpi" style={{ borderLeft: '4px solid #4f46e5' }}>
              <h4>2. Matchmaker Search Time</h4>
              <div className="kpi-row">
                <span className="kpi-main" style={{ color: '#4f46e5' }}>2.0 hrs</span>
                <span className="kpi-badge-target" style={{ background: '#ecfdf5', color: '#059669' }}>
                  Target: 1.2–1.5 hrs
                </span>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Per client / week. Automated pre-filtering & scoring reduces manual search by ~35%.
              </div>
              <div style={{ fontSize: '0.72rem', color: '#4f46e5', fontWeight: 600, marginTop: 4 }}>
                Saves ~10–12 hrs/week for a matchmaker managing 15 clients.
              </div>
            </div>

            {/* KPI 3 */}
            <div className="metric-card-kpi" style={{ borderLeft: '4px solid #059669' }}>
              <h4>3. Matchmaker Variance & Acceptance</h4>
              <div className="kpi-row">
                <span className="kpi-main" style={{ color: '#0f172a' }}>31%</span>
                <span className="kpi-badge-target" style={{ background: '#ecfdf5', color: '#059669' }}>
                  Target: &gt;40%
                </span>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Massive disparity: Matchmaker A achieves <strong>44%</strong> vs Matchmaker B at <strong>21%</strong>.
              </div>
              <div style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 600, marginTop: 4 }}>
                Goal: Elevate lower-performing matchmakers to Matchmaker A's standard.
              </div>
            </div>
          </div>

          {/* 30-DAY FUNNEL ANALYSIS TABLE */}
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <BarChart2 size={16} />
              The Date Crew — 30-Day Conversion Funnel Analysis
            </div>

            <div style={{ overflowX: 'auto', border: '1px solid var(--border-subtle)', borderRadius: 8 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', textAlign: 'left' }}>
                <thead style={{ background: '#f8fafc', borderBottom: '1px solid var(--border-subtle)' }}>
                  <tr>
                    <th style={{ padding: '8px 12px', fontWeight: 700 }}>Funnel Stage</th>
                    <th style={{ padding: '8px 12px', fontWeight: 700 }}>Volume</th>
                    <th style={{ padding: '8px 12px', fontWeight: 700 }}>Stage Conversion</th>
                    <th style={{ padding: '8px 12px', fontWeight: 700 }}>Overall Conversion</th>
                    <th style={{ padding: '8px 12px', fontWeight: 700 }}>Diagnostic Insight</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #f1f5f9', background: '#fff1f2' }}>
                    <td style={{ padding: '8px 12px', fontWeight: 600 }}>1. Profiles Shared → Accepted</td>
                    <td style={{ padding: '8px 12px' }}>1,000 → 310</td>
                    <td style={{ padding: '8px 12px', fontWeight: 700, color: '#e11d48' }}>31.0%</td>
                    <td style={{ padding: '8px 12px' }}>31.0%</td>
                    <td style={{ padding: '8px 12px', color: '#991b1b', fontSize: '0.75rem' }}>
                      <strong>Biggest bottleneck:</strong> 690 rejections. ~241 (35%) failed on known preferences!
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '8px 12px', fontWeight: 600 }}>2. Accepted → Contact Shared</td>
                    <td style={{ padding: '8px 12px' }}>310 → 210</td>
                    <td style={{ padding: '8px 12px', fontWeight: 600 }}>67.7%</td>
                    <td style={{ padding: '8px 12px' }}>21.0%</td>
                    <td style={{ padding: '8px 12px', color: '#475569', fontSize: '0.75rem' }}>
                      Mutual confirmation or client hesitation before sharing phone.
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '8px 12px', fontWeight: 600 }}>3. Contact Shared → Chat Started</td>
                    <td style={{ padding: '8px 12px' }}>210 → 150</td>
                    <td style={{ padding: '8px 12px', fontWeight: 600 }}>71.4%</td>
                    <td style={{ padding: '8px 12px' }}>15.0%</td>
                    <td style={{ padding: '8px 12px', color: '#475569', fontSize: '0.75rem' }}>
                      Healthy texting engagement once contact details exchanged.
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '8px 12px', fontWeight: 600 }}>4. Chat Started → Meeting Fixed</td>
                    <td style={{ padding: '8px 12px' }}>150 → 75</td>
                    <td style={{ padding: '8px 12px', fontWeight: 600 }}>50.0%</td>
                    <td style={{ padding: '8px 12px' }}>7.5%</td>
                    <td style={{ padding: '8px 12px', color: '#475569', fontSize: '0.75rem' }}>
                      Scheduling friction or early conversation fizzling out.
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px 12px', fontWeight: 600 }}>5. Meeting Fixed → Completed</td>
                    <td style={{ padding: '8px 12px' }}>75 → 42</td>
                    <td style={{ padding: '8px 12px', fontWeight: 600 }}>56.0%</td>
                    <td style={{ padding: '8px 12px', fontWeight: 700, color: '#059669' }}>4.2%</td>
                    <td style={{ padding: '8px 12px', color: '#475569', fontSize: '0.75rem' }}>
                      No-shows and reschedulings. 42 completed dates from 1,000 shared.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-primary" onClick={onClose}>
            Back to Matchmaking Assistant
          </button>
        </div>
      </div>
    </div>
  );
};
