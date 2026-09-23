import React from 'react';
import { CompatibilityResult } from '../types';
import { CheckCircle2, XCircle, AlertTriangle, Info } from 'lucide-react';

interface ReasonBreakdownProps {
  result: CompatibilityResult;
}

export const ReasonBreakdown: React.FC<ReasonBreakdownProps> = ({ result }) => {
  return (
    <div className="accordion-content">
      {/* 1. DEAL BREAKERS AUDIT */}
      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748b', marginBottom: '0.4rem' }}>
          1. Deal Breaker Audit (Hard Constraints)
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {result.dealBreakersChecked.map((db, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem', fontSize: '0.78rem' }}>
              {db.passed ? (
                <CheckCircle2 size={14} className="metric-highlight-green" style={{ flexShrink: 0, marginTop: 2 }} />
              ) : (
                <XCircle size={14} className="metric-highlight-rose" style={{ flexShrink: 0, marginTop: 2 }} />
              )}
              <div>
                <strong>{db.name}:</strong> <span style={{ color: db.passed ? '#334155' : '#b91c1c' }}>{db.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. ADDITIVE POINT BREAKDOWN (If not excluded) */}
      {!result.isExcluded && (
        <div style={{ marginTop: '0.5rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748b', marginBottom: '0.4rem' }}>
            2. Weighted Compatibility Scoring (Total: {result.totalScore}/100)
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {result.scoreItems.map((item, idx) => (
              <div key={idx} className="scoring-factor-row">
                <div className="scoring-factor-left">
                  {item.isMatch ? (
                    <CheckCircle2 size={13} className="metric-highlight-green" />
                  ) : item.isNeutral ? (
                    <Info size={13} style={{ color: '#94a3b8' }} />
                  ) : (
                    <AlertTriangle size={13} className="metric-highlight-amber" />
                  )}
                  <span>
                    <strong>{item.category}:</strong> {item.explanation}
                  </span>
                </div>
                <div
                  className={`scoring-factor-points ${
                    item.points >= item.maxPoints * 0.75 ? 'points-positive' : 'points-neutral'
                  }`}
                >
                  +{item.points} / {item.maxPoints} pts
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUMMARY NOTE */}
      <div style={{ background: '#f8fafc', padding: '0.6rem 0.8rem', borderRadius: 6, fontSize: '0.78rem', color: '#334155', borderLeft: '3px solid #6366f1' }}>
        <strong>Matchmaker Summary:</strong> {result.summaryNote}
      </div>
    </div>
  );
};
