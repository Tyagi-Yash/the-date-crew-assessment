import React from 'react';
import { BarChart3, Calendar, Bell, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onOpenMetrics: () => void;
  activeClientName?: string;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMetrics, activeClientName }) => {
  // Current readable date format
  const currentDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    weekday: 'short',
  }).format(new Date());

  return (
    <header className="workspace-header">
      <div className="header-left">
        <div className="header-titles">
          <div className="header-eyebrow">
            <span className="eyebrow-chip">Decision Support Copilot</span>
            <span className="eyebrow-divider">•</span>
            <span className="eyebrow-context">Evaluating for: <strong>{activeClientName}</strong></span>
          </div>
          <h1 className="header-heading">Matchmaking Assistant</h1>
          <p className="header-subtitle">
            Turn client preferences into explainable recommendations with deterministic constraint screening.
          </p>
        </div>
      </div>

      <div className="header-right">
        <div className="header-meta-pill">
          <Calendar size={14} className="meta-icon" />
          <span>{currentDate}</span>
        </div>

        <button
          className="header-action-btn"
          onClick={onOpenMetrics}
          title="Open Funnel Conversion & Pilot Targets"
        >
          <BarChart3 size={15} />
          <span>Funnel & Pilot KPIs</span>
          <span className="action-pill-kpi">35% Baseline</span>
        </button>
      </div>
    </header>
  );
};
