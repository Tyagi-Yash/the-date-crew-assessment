import React, { useState } from 'react';
import { Candidate, CompatibilityResult, RejectionRecord } from '../types';
import { ReasonBreakdown } from './ReasonBreakdown';
import {
  ChevronDown,
  ChevronUp,
  Share2,
  ThumbsDown,
  CheckCircle,
  AlertOctagon,
  Sparkles,
  MapPin,
  Briefcase,
  GraduationCap,
  Cigarette,
  Wine,
  Baby,
} from 'lucide-react';

interface CandidateCardProps {
  candidate: Candidate;
  compatibility: CompatibilityResult;
  isShared: boolean;
  rejectionRecord?: RejectionRecord;
  onShare: (candidateId: string) => void;
  onOpenReject: (candidate: Candidate) => void;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({
  candidate,
  compatibility,
  isShared,
  rejectionRecord,
  onShare,
  onOpenReject,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const isExcluded = compatibility.isExcluded;
  const isRecommended = compatibility.status === 'RECOMMENDED';

  return (
    <div
      className={`candidate-card ${
        isExcluded ? 'excluded-card' : isRecommended ? 'recommended-card' : ''
      }`}
    >
      {/* CARD HEADER */}
      <div className="candidate-card-header">
        <div className="candidate-left-meta">
          <img src={candidate.avatar} alt={candidate.name} className="candidate-avatar" />
          <div className="candidate-names">
            <h4>
              {candidate.name}, {candidate.age}
              {candidate.verifiedProfile && (
                <span
                  title="Profile Verified"
                  style={{ color: '#059669', display: 'inline-flex', fontSize: '0.8rem' }}
                >
                  ✓
                </span>
              )}
            </h4>
            <div className="candidate-subline">
              <MapPin size={13} style={{ display: 'inline', verticalAlign: '-1px' }} /> {candidate.city} •{' '}
              <Briefcase size={13} style={{ display: 'inline', verticalAlign: '-1px' }} /> {candidate.profession}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
              <GraduationCap size={13} style={{ display: 'inline', verticalAlign: '-1px' }} /> {candidate.education}
            </div>
          </div>
        </div>

        {/* STATUS & SCORE */}
        <div className="candidate-status-area">
          {isExcluded ? (
            <div className="status-badge badge-excluded">
              <AlertOctagon size={12} /> Excluded
            </div>
          ) : isRecommended ? (
            <div className="status-badge badge-recommended">
              <Sparkles size={12} /> Recommended
            </div>
          ) : (
            <div className="status-badge badge-review">Review</div>
          )}

          {!isExcluded ? (
            <div className="score-dial">
              <span className="score-num">{compatibility.totalScore}</span>
              <span className="score-max">/100</span>
            </div>
          ) : (
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#dc2626' }}>
              Deal Breaker
            </div>
          )}
        </div>
      </div>

      {/* QUICK ATTRIBUTE CHIPS */}
      <div className="attribute-grid">
        <div className="attr-item">
          <span className="attr-label">
            <Cigarette size={11} style={{ display: 'inline' }} /> Smoking
          </span>
          <span className="attr-val" style={{ textTransform: 'capitalize' }}>
            {candidate.smoking}
          </span>
        </div>
        <div className="attr-item">
          <span className="attr-label">
            <Wine size={11} style={{ display: 'inline' }} /> Drinking
          </span>
          <span className="attr-val" style={{ textTransform: 'capitalize' }}>
            {candidate.drinking}
          </span>
        </div>
        <div className="attr-item">
          <span className="attr-label">
            <Baby size={11} style={{ display: 'inline' }} /> Family / Kids
          </span>
          <span className="attr-val" style={{ textTransform: 'capitalize' }}>
            {candidate.childrenPreference === 'doesn_not_want' ? 'No Children' : candidate.childrenPreference}
          </span>
        </div>
        <div className="attr-item" style={{ gridColumn: 'span 2' }}>
          <span className="attr-label">Lifestyle Interests</span>
          <span className="attr-val">
            {candidate.lifestyleTags.join(', ')}
          </span>
        </div>
      </div>

      {/* EXCLUSION BANNER */}
      {isExcluded && (
        <div className="exclusion-alert-banner">
          <AlertOctagon size={16} style={{ flexShrink: 0, marginTop: 1 }} />
          <div>
            <strong>Constraint Conflict:</strong> {compatibility.exclusionReason}
            <div style={{ fontSize: '0.72rem', color: '#7f1d1d', marginTop: 2 }}>
              ⚠️ Sharing this profile would cause an avoidable client rejection.
            </div>
          </div>
        </div>
      )}

      {/* ACCORDION TRIGGER */}
      <div>
        <button
          className="accordion-toggle"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span>
            {isExcluded ? 'View Deal Breaker Check Results' : 'Why this profile? (Score Breakdown)'}
          </span>
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {isExpanded && <ReasonBreakdown result={compatibility} />}
      </div>

      {/* CARD ACTION FOOTER */}
      <div className="candidate-card-footer">
        <div>
          {rejectionRecord ? (
            <div className="rejected-tag-indicator">
              <ThumbsDown size={13} />
              <span>Rejected: {rejectionRecord.aiInterpretation.reason}</span>
            </div>
          ) : isShared ? (
            <div className="shared-tag-indicator">
              <CheckCircle size={13} />
              <span>Shared via Email with Client</span>
            </div>
          ) : (
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Status: Ready for matchmaker decision
            </span>
          )}
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {!rejectionRecord && (
            <button
              className="btn-secondary"
              style={{ fontSize: '0.78rem', padding: '0.4rem 0.75rem' }}
              onClick={() => onOpenReject(candidate)}
            >
              <ThumbsDown size={13} />
              <span>Record Rejection</span>
            </button>
          )}

          {!rejectionRecord && !isShared && !isExcluded && (
            <button
              className="btn-primary"
              style={{ fontSize: '0.78rem', padding: '0.4rem 0.85rem' }}
              onClick={() => onShare(candidate.id)}
            >
              <Share2 size={13} />
              <span>Share Profile</span>
            </button>
          )}

          {isExcluded && !rejectionRecord && (
            <button
              className="btn-secondary"
              disabled
              style={{ opacity: 0.5, cursor: 'not-allowed', fontSize: '0.78rem', padding: '0.4rem 0.85rem' }}
              title="Cannot share a candidate violating hard deal breakers"
            >
              Blocked
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
