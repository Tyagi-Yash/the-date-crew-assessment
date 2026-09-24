import React from 'react';
import { Filter, CheckCircle2, ShieldAlert, ShieldCheck, Award } from 'lucide-react';

interface FunnelMetricsBarProps {
  totalScreened: number;
  eligibleCount: number;
  excludedCount: number;
  avoidableMismatchesAvoided: number;
  topRecommendationsCount: number;
}

export const FunnelMetricsBar: React.FC<FunnelMetricsBarProps> = ({
  totalScreened,
  eligibleCount,
  excludedCount,
  avoidableMismatchesAvoided,
  topRecommendationsCount,
}) => {
  return (
    <section className="screening-summary-bar" aria-label="Screening Summary Funnel">
      {/* 1. TOTAL SCREENED */}
      <div className="metric-strip-card">
        <div className="metric-strip-icon-box neutral">
          <Filter size={16} />
        </div>
        <div className="metric-strip-body">
          <div className="metric-strip-num">{totalScreened}</div>
          <div className="metric-strip-label">Pool Evaluated</div>
          <div className="metric-strip-sub">Total candidates scanned</div>
        </div>
      </div>

      {/* 2. ELIGIBLE */}
      <div className="metric-strip-card">
        <div className="metric-strip-icon-box success">
          <CheckCircle2 size={16} />
        </div>
        <div className="metric-strip-body">
          <div className="metric-strip-num success">{eligibleCount}</div>
          <div className="metric-strip-label">Eligible Matches</div>
          <div className="metric-strip-sub">Passed 100% deal-breakers</div>
        </div>
      </div>

      {/* 3. EXCLUDED */}
      <div className="metric-strip-card">
        <div className="metric-strip-icon-box danger">
          <ShieldAlert size={16} />
        </div>
        <div className="metric-strip-body">
          <div className="metric-strip-num danger">{excludedCount}</div>
          <div className="metric-strip-label">Deal-Breakers Blocked</div>
          <div className="metric-strip-sub">Excluded from client view</div>
        </div>
      </div>

      {/* 4. AVOIDABLE SAVED */}
      <div className="metric-strip-card highlight-card">
        <div className="metric-strip-icon-box highlight">
          <ShieldCheck size={16} />
        </div>
        <div className="metric-strip-body">
          <div className="metric-strip-num highlight">{avoidableMismatchesAvoided}</div>
          <div className="metric-strip-label">Avoidable Drops Saved</div>
          <div className="metric-strip-sub">Fixes 35% known preference leak</div>
        </div>
      </div>

      {/* 5. TOP RECOMMENDATIONS */}
      <div className="metric-strip-card">
        <div className="metric-strip-icon-box primary">
          <Award size={16} />
        </div>
        <div className="metric-strip-body">
          <div className="metric-strip-num primary">{topRecommendationsCount}</div>
          <div className="metric-strip-label">High Alignment</div>
          <div className="metric-strip-sub">Recommended (80+ score)</div>
        </div>
      </div>
    </section>
  );
};
