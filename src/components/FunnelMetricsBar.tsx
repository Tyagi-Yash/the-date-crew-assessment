import React from 'react';
import { Filter, CheckCircle2, XCircle, ShieldCheck, TrendingUp } from 'lucide-react';

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
    <div className="funnel-summary-card">
      <div className="funnel-metric-item">
        <div className="funnel-metric-label">
          <Filter size={14} /> Candidates Screened
        </div>
        <div className="funnel-metric-value">
          {totalScreened}
        </div>
        <div className="funnel-metric-subtext">Total pool evaluated</div>
      </div>

      <div className="funnel-metric-item">
        <div className="funnel-metric-label">
          <CheckCircle2 size={14} className="metric-highlight-green" /> Eligible Candidates
        </div>
        <div className="funnel-metric-value metric-highlight-green">
          {eligibleCount}
        </div>
        <div className="funnel-metric-subtext">Passed 100% of deal breakers</div>
      </div>

      <div className="funnel-metric-item">
        <div className="funnel-metric-label">
          <XCircle size={14} className="metric-highlight-rose" /> Excluded by Constraints
        </div>
        <div className="funnel-metric-value metric-highlight-rose">
          {excludedCount}
        </div>
        <div className="funnel-metric-subtext">Failed smoking, age, or city rules</div>
      </div>

      <div className="funnel-metric-item">
        <div className="funnel-metric-label">
          <ShieldCheck size={14} className="metric-highlight-green" /> Avoidable Mismatches Saved
        </div>
        <div className="funnel-metric-value metric-highlight-green">
          {avoidableMismatchesAvoided}
        </div>
        <div className="funnel-metric-subtext">Prevented ~35% failure rate</div>
      </div>

      <div className="funnel-metric-item">
        <div className="funnel-metric-label">
          <TrendingUp size={14} className="metric-highlight-amber" /> Top Recommendations
        </div>
        <div className="funnel-metric-value metric-highlight-amber">
          {topRecommendationsCount}
        </div>
        <div className="funnel-metric-subtext">High compatibility (80+)</div>
      </div>
    </div>
  );
};
