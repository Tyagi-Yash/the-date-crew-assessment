import React from 'react';
import { Candidate, CompatibilityResult, RejectionRecord } from '../types';
import {
  Share2,
  ThumbsDown,
  CheckCircle,
  ShieldAlert,
  Sparkles,
  MapPin,
  Briefcase,
  GraduationCap,
  Cigarette,
  Wine,
  Baby,
  HelpCircle,
  Check,
} from 'lucide-react';

interface CandidateCardProps {
  candidate: Candidate;
  compatibility: CompatibilityResult;
  isShared: boolean;
  rejectionRecord?: RejectionRecord;
  onShare: (candidateId: string) => void;
  onOpenReject: (candidate: Candidate) => void;
  onOpenWhyDrawer: (candidate: Candidate, compatibility: CompatibilityResult) => void;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({
  candidate,
  compatibility,
  isShared,
  rejectionRecord,
  onShare,
  onOpenReject,
  onOpenWhyDrawer,
}) => {
  const isExcluded = compatibility.isExcluded;
  const isRecommended = compatibility.status === 'RECOMMENDED';

  // Check which categories are matched for the mini-audit
  const locationMatch = !isExcluded && compatibility.scoreItems.some((s) => s.category === 'Location Affinity' && s.isMatch);
  const ageMatch = !isExcluded && compatibility.scoreItems.some((s) => s.category === 'Age Alignment' && s.isMatch);
  const childrenMatch = !isExcluded && compatibility.dealBreakersChecked.some((db) => db.name === 'Children Preference' && db.passed);
  const lifestyleMatch = !isExcluded && compatibility.scoreItems.some((s) => s.category === 'Lifestyle & Interests' && s.isMatch);

  return (
    <article
      className={`candidate-premium-card ${
        isExcluded ? 'is-excluded' : isRecommended ? 'is-recommended' : 'is-review'
      }`}
    >
      {/* CARD MAIN GRID */}
      <div className="card-top-layout">
        {/* LEFT: AVATAR & METADATA */}
        <div className="card-primary-info">
          <div className="card-avatar-wrap">
            <img src={candidate.avatar} alt={candidate.name} className="candidate-photo" />
            {candidate.verifiedProfile && (
              <span className="verified-pip" title="Verified Background & Identity">
                <Check size={11} />
              </span>
            )}
          </div>

          <div className="card-bio-block">
            <div className="card-title-row">
              <h3 className="candidate-name">
                {candidate.name}, <span className="candidate-age">{candidate.age}</span>
              </h3>
              <span
                className={`status-pill ${
                  isExcluded
                    ? 'pill-excluded'
                    : isRecommended
                    ? 'pill-recommended'
                    : 'pill-review'
                }`}
              >
                {isExcluded ? (
                  <>
                    <ShieldAlert size={12} /> Excluded
                  </>
                ) : isRecommended ? (
                  <>
                    <Sparkles size={12} /> Recommended
                  </>
                ) : (
                  'Review'
                )}
              </span>
            </div>

            <div className="candidate-meta-line">
              <span className="meta-group">
                <MapPin size={13} className="meta-icon" />
                <span>{candidate.city}</span>
              </span>
              <span className="meta-divider">•</span>
              <span className="meta-group">
                <Briefcase size={13} className="meta-icon" />
                <span>{candidate.profession}</span>
              </span>
            </div>

            <div className="candidate-edu-line">
              <GraduationCap size={13} className="meta-icon" />
              <span>{candidate.education}</span>
            </div>
          </div>
        </div>

        {/* RIGHT: SCORE GAUGE & MINI-AUDIT */}
        <div className="card-score-widget">
          {isExcluded ? (
            <div className="score-excluded-container">
              <div className="score-excluded-box">
                <ShieldAlert size={20} className="icon-fail" />
                <span className="excluded-label">Deal Breaker</span>
                <span className="excluded-score">0/100</span>
              </div>
              <div className="mini-audit-breakdown">
                <span className="audit-chip chip-fail">Conflict detected</span>
              </div>
            </div>
          ) : (
            <div className="score-container">
              <div className="score-gauge-box">
                <div className="score-circle-wrap">
                  <svg viewBox="0 0 36 36" className="score-circular-svg">
                    <path
                      className="svg-circle-bg"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className={`svg-circle-fill ${isRecommended ? 'fill-high' : 'fill-med'}`}
                      strokeDasharray={`${compatibility.totalScore}, 100`}
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="score-inner-text">
                    <span className="score-digits">{compatibility.totalScore}</span>
                    <span className="score-percent">%</span>
                  </div>
                </div>
                <span className="score-caption">Compatibility</span>
              </div>

              {/* MINI AUDIT CHECKLIST */}
              <div className="mini-audit-checklist" aria-label="Quick preference check">
                <span className={`audit-pill ${ageMatch ? 'pass' : 'neutral'}`}>
                  Age {ageMatch ? '✓' : '~'}
                </span>
                <span className={`audit-pill ${locationMatch ? 'pass' : 'neutral'}`}>
                  Location {locationMatch ? '✓' : '~'}
                </span>
                <span className={`audit-pill ${childrenMatch ? 'pass' : 'neutral'}`}>
                  Children {childrenMatch ? '✓' : '~'}
                </span>
                <span className={`audit-pill ${lifestyleMatch ? 'pass' : 'neutral'}`}>
                  Lifestyle {lifestyleMatch ? '✓' : '~'}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* QUICK ATTRIBUTE CHIPS */}
      <div className="card-attributes-strip">
        <div className="attr-pill">
          <Cigarette size={12} className="attr-icon" />
          <span className="attr-title">Smoking:</span>
          <span className="attr-data">{candidate.smoking}</span>
        </div>

        <div className="attr-pill">
          <Wine size={12} className="attr-icon" />
          <span className="attr-title">Drinking:</span>
          <span className="attr-data">{candidate.drinking}</span>
        </div>

        <div className="attr-pill">
          <Baby size={12} className="attr-icon" />
          <span className="attr-title">Children:</span>
          <span className="attr-data">
            {candidate.childrenPreference === 'doesn_not_want' ? 'No Children' : candidate.childrenPreference}
          </span>
        </div>

        <div className="attr-pill lifestyle-pill">
          <span className="attr-title">Interests:</span>
          <span className="attr-data">{candidate.lifestyleTags.slice(0, 3).join(', ')}</span>
        </div>
      </div>

      {/* EXCLUSION BANNER (IF VIOLATING DEAL BREAKER) */}
      {isExcluded && (
        <div className="dealbreaker-alert-card">
          <div className="alert-icon-side">
            <ShieldAlert size={16} />
          </div>
          <div className="alert-text-side">
            <strong className="alert-strong">Constraint Conflict:</strong>{' '}
            <span className="alert-msg">{compatibility.exclusionReason}</span>
            <div className="alert-helper">
              ⚠️ Filtered out automatically to prevent avoidable client rejection.
            </div>
          </div>
        </div>
      )}

      {/* CARD ACTION FOOTER */}
      <div className="card-actions-bar">
        <div className="actions-left-status">
          {rejectionRecord ? (
            <span className="tag-rejected-feedback">
              <ThumbsDown size={13} />
              <span>Rejected: {rejectionRecord.aiInterpretation.reason}</span>
            </span>
          ) : isShared ? (
            <span className="tag-shared-status">
              <CheckCircle size={13} />
              <span>Shared via Email with Client</span>
            </span>
          ) : (
            <span className="tag-ready-status">
              Ready for matchmaker review
            </span>
          )}
        </div>

        <div className="actions-right-buttons">
          {/* WHY THIS PROFILE (SLIDE-OVER TRIGGER) */}
          <button
            className="btn-action-ghost"
            onClick={() => onOpenWhyDrawer(candidate, compatibility)}
            title="Inspect explainable score and constraint breakdown"
          >
            <HelpCircle size={14} />
            <span>Why this profile?</span>
          </button>

          {/* RECORD REJECTION */}
          {!rejectionRecord && (
            <button
              className="btn-action-secondary"
              onClick={() => onOpenReject(candidate)}
              title="Record client rejection and structured feedback"
            >
              <ThumbsDown size={13} />
              <span>Record Rejection</span>
            </button>
          )}

          {/* SHARE PROFILE */}
          {!rejectionRecord && !isShared && !isExcluded && (
            <button
              className="btn-action-primary"
              onClick={() => onShare(candidate.id)}
              title="Approve and share candidate profile with client"
            >
              <Share2 size={13} />
              <span>Share Profile</span>
            </button>
          )}

          {isExcluded && !rejectionRecord && (
            <button
              className="btn-action-disabled"
              disabled
              title="Cannot share a profile that violates non-negotiable deal breakers"
            >
              Blocked by Rule
            </button>
          )}
        </div>
      </div>
    </article>
  );
};
