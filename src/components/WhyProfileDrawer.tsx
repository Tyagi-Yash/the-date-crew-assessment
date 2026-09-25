import React from 'react';
import { Candidate, CompatibilityResult } from '../types';
import {
  X,
  ShieldCheck,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Info,
  Sparkles,
  Share2,
  CheckCircle,
  MapPin,
  Briefcase,
  HelpCircle,
  Mail,
} from 'lucide-react';

interface WhyProfileDrawerProps {
  candidate: Candidate | null;
  compatibility: CompatibilityResult | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenEmailComposer: (candidate: Candidate, compatibility: CompatibilityResult, isOverride: boolean) => void;
  isShared: boolean;
}

export const WhyProfileDrawer: React.FC<WhyProfileDrawerProps> = ({
  candidate,
  compatibility,
  isOpen,
  onClose,
  onOpenEmailComposer,
  isShared,
}) => {
  if (!isOpen || !candidate || !compatibility) return null;

  const isExcluded = compatibility.isExcluded;
  const isRecommended = compatibility.status === 'RECOMMENDED';

  // Group score items into Strong vs Soft
  const strongPrefItems = compatibility.scoreItems.filter(
    (item) => item.category === 'Location Affinity' || item.category === 'Age Alignment'
  );
  const softPrefItems = compatibility.scoreItems.filter(
    (item) => item.category !== 'Location Affinity' && item.category !== 'Age Alignment'
  );

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <aside className="drawer-panel" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        {/* DRAWER HEADER */}
        <div className="drawer-header">
          <div className="drawer-title-group">
            <div className="drawer-badge">
              <Sparkles size={13} />
              <span>Explainable AI Engine</span>
            </div>
            <h2 className="drawer-title">Why this profile?</h2>
            <p className="drawer-subtitle">
              Audit for <strong>{candidate.name}</strong> • Deterministic criteria & score breakdown
            </p>
          </div>
          <button className="drawer-close-btn" onClick={onClose} aria-label="Close explanation drawer">
            <X size={18} />
          </button>
        </div>

        {/* DRAWER BODY */}
        <div className="drawer-body">
          {/* CANDIDATE SUMMARY CARD WITH SCORE GAUGE */}
          <div className={`drawer-candidate-card ${isExcluded ? 'status-excluded' : ''}`}>
            <div className="candidate-intro-left">
              <img src={candidate.avatar} alt={candidate.name} className="drawer-avatar" />
              <div>
                <h3 className="drawer-candidate-name">
                  {candidate.name}, {candidate.age}
                </h3>
                <div className="drawer-meta-sub">
                  <span>
                    <MapPin size={12} /> {candidate.city}
                  </span>
                  <span className="dot">•</span>
                  <span>
                    <Briefcase size={12} /> {candidate.profession}
                  </span>
                </div>
              </div>
            </div>

            {/* CIRCULAR / RADIAL SCORE GAUGE */}
            <div className="drawer-score-gauge">
              {isExcluded ? (
                <div className="gauge-excluded">
                  <ShieldAlert size={24} />
                  <span className="gauge-excluded-text">Excluded</span>
                </div>
              ) : (
                <div className="gauge-circle">
                  <svg viewBox="0 0 36 36" className="circular-chart">
                    <path
                      className="circle-bg"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className={`circle-progress ${isRecommended ? 'progress-high' : 'progress-med'}`}
                      strokeDasharray={`${compatibility.totalScore}, 100`}
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="gauge-number">
                    <span className="gauge-val">{compatibility.totalScore}</span>
                    <span className="gauge-unit">/100</span>
                  </div>
                </div>
              )}
              <span className={`gauge-badge ${isExcluded ? 'badge-danger' : isRecommended ? 'badge-success' : 'badge-amber'}`}>
                {compatibility.status}
              </span>
            </div>
          </div>

          {/* 1. HARD REQUIREMENTS AUDIT */}
          <div className="drawer-section">
            <div className="section-heading-row">
              <div className="section-title-wrap">
                <span className="section-step">1</span>
                <h4 className="section-title">Hard Requirements (Deal Breakers)</h4>
              </div>
              <span className={`section-status-tag ${isExcluded ? 'tag-failed' : 'tag-passed'}`}>
                {isExcluded ? 'Deal-Breaker Conflict' : '✓ 0 Conflicts Found'}
              </span>
            </div>

            <div className="audit-items-list">
              {compatibility.dealBreakersChecked.map((db, idx) => (
                <div key={idx} className={`audit-item-row ${db.passed ? 'passed' : 'failed'}`}>
                  <div className="audit-icon-wrap">
                    {db.passed ? (
                      <CheckCircle2 size={16} className="audit-icon pass" />
                    ) : (
                      <ShieldAlert size={16} className="audit-icon fail" />
                    )}
                  </div>
                  <div className="audit-content">
                    <div className="audit-name">
                      <strong>{db.name}</strong>
                    </div>
                    <div className="audit-detail">{db.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. STRONG PREFERENCES */}
          {!isExcluded && strongPrefItems.length > 0 && (
            <div className="drawer-section">
              <div className="section-heading-row">
                <div className="section-title-wrap">
                  <span className="section-step">2</span>
                  <h4 className="section-title">Strong Preferences (High Weight)</h4>
                </div>
                <span className="section-weight-tag">+45 pts potential</span>
              </div>

              <div className="factors-list">
                {strongPrefItems.map((item, idx) => (
                  <div key={idx} className="factor-row">
                    <div className="factor-left">
                      <CheckCircle2 size={15} className="factor-icon match" />
                      <div>
                        <span className="factor-cat">{item.category}:</span>
                        <span className="factor-exp">{item.explanation}</span>
                      </div>
                    </div>
                    <div className="factor-pts">+{item.points} pts</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. SOFT PREFERENCES */}
          {!isExcluded && softPrefItems.length > 0 && (
            <div className="drawer-section">
              <div className="section-heading-row">
                <div className="section-title-wrap">
                  <span className="section-step">3</span>
                  <h4 className="section-title">Soft Preferences & Lifestyle Signals</h4>
                </div>
                <span className="section-weight-tag">+55 pts potential</span>
              </div>

              <div className="factors-list">
                {softPrefItems.map((item, idx) => (
                  <div key={idx} className="factor-row">
                    <div className="factor-left">
                      {item.isMatch ? (
                        <CheckCircle2 size={15} className="factor-icon match" />
                      ) : (
                        <Info size={15} className="factor-icon neutral" />
                      )}
                      <div>
                        <span className="factor-cat">{item.category}:</span>
                        <span className="factor-exp">{item.explanation}</span>
                      </div>
                    </div>
                    <div className="factor-pts">+{item.points} pts</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. NATURAL-LANGUAGE EXPLANATION / MATCHMAKER NOTE */}
          <div className="drawer-insight-box">
            <div className="insight-header">
              <Sparkles size={14} className="insight-sparkle" />
              <span className="insight-title">Matchmaker Recommendation Brief</span>
            </div>
            <p className="insight-text">
              “{compatibility.summaryNote}”
            </p>
          </div>
        </div>

        {/* DRAWER FOOTER */}
        <div className="drawer-footer">
          <button className="btn-drawer-secondary" onClick={onClose}>
            Close
          </button>
          {!isExcluded && !isShared && (
            <button
              className="btn-drawer-primary"
              onClick={() => {
                onOpenEmailComposer(candidate, compatibility, false);
                onClose();
              }}
            >
              <Mail size={15} />
              <span>Draft Email & Share</span>
            </button>
          )}
          {isExcluded && !isShared && (
            <button
              className="btn-action-override"
              onClick={() => {
                onOpenEmailComposer(candidate, compatibility, true);
                onClose();
              }}
            >
              <AlertTriangle size={15} />
              <span>Send with Override</span>
            </button>
          )}
          {isShared && (
            <div className="drawer-shared-badge">
              <CheckCircle size={15} />
              <span>Already Shared</span>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};
