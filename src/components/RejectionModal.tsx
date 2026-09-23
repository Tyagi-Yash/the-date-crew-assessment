import React, { useState, useEffect } from 'react';
import { Candidate, Client, RejectionRecord } from '../types';
import { structureRejectionFeedback } from '../engine/aiFeedbackParser';
import { X, Sparkles, AlertCircle, CheckCircle2, ShieldAlert } from 'lucide-react';

interface RejectionModalProps {
  candidate: Candidate;
  client: Client;
  onClose: () => void;
  onSave: (record: RejectionRecord) => void;
}

const CATEGORIES = [
  'Age',
  'Location',
  'Profession',
  'Lifestyle',
  'Smoking',
  'Children',
  'Education',
  'Other',
];

const SAMPLE_FEEDBACKS = [
  'I liked her profile but she smokes occasionally and I am not comfortable with that.',
  'She lives in Hyderabad which is too far for my life and work in Bangalore.',
  'Great background, but he decided he does not want children, which is a hard deal breaker.',
  'Her work hours in high-growth startup seem very demanding for family life right now.',
];

export const RejectionModal: React.FC<RejectionModalProps> = ({
  candidate,
  client,
  onClose,
  onSave,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [feedbackText, setFeedbackText] = useState<string>('');
  const [aiResult, setAiResult] = useState<ReturnType<typeof structureRejectionFeedback> | null>(null);

  // Re-run AI structure parser when feedback text changes
  useEffect(() => {
    if (feedbackText.trim().length > 3) {
      const parsed = structureRejectionFeedback(feedbackText, client);
      setAiResult(parsed);
    } else {
      setAiResult(null);
    }
  }, [feedbackText, client]);

  const toggleCategory = (cat: string) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const handleSelectSample = (sample: string) => {
    setFeedbackText(sample);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const record: RejectionRecord = {
      id: `rej-${Date.now()}`,
      candidateId: candidate.id,
      candidateName: candidate.name,
      clientId: client.id,
      rawFeedback: feedbackText || 'No free text provided',
      selectedCategories: selectedCategories.length > 0 ? selectedCategories : ['Other'],
      aiInterpretation: {
        reason: aiResult ? aiResult.primaryReason : (selectedCategories[0] || 'Unspecified'),
        category: aiResult ? aiResult.category : 'General Preference',
        confidence: aiResult ? aiResult.confidence : 0.85,
        wasAvoidableConflict: aiResult ? aiResult.wasAvoidableConflict : false,
        conflictedPreference: aiResult?.conflictedPreferenceExplanation,
      },
      timestamp: new Date().toISOString(),
    };

    onSave(record);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3>Record Client Rejection Feedback</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Candidate: <strong>{candidate.name}</strong> • Client: <strong>{client.name}</strong>
            </p>
          </div>
          <button onClick={onClose} style={{ color: 'var(--text-muted)' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {/* 1. STRUCTURED CATEGORIES */}
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
                1. Select Structured Reason(s):
              </label>
              <div className="category-checkbox-grid">
                {CATEGORIES.map((cat) => {
                  const isChecked = selectedCategories.includes(cat);
                  return (
                    <div
                      key={cat}
                      className={`category-chip-label ${isChecked ? 'selected' : ''}`}
                      onClick={() => toggleCategory(cat)}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}} // handled by parent div click
                        style={{ accentColor: 'var(--primary-rose)' }}
                      />
                      <span>{cat}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. FREE TEXT CLIENT FEEDBACK */}
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
                2. Client's Unstructured Feedback (Email / WhatsApp note):
              </label>

              {/* Sample feedback chips for fast evaluator test */}
              <div style={{ marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Quick sample scenarios:</span>
                <div className="quick-chip-group">
                  {SAMPLE_FEEDBACKS.map((sample, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="quick-chip-btn"
                      onClick={() => handleSelectSample(sample)}
                    >
                      Scenario {idx + 1}
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                rows={3}
                style={{
                  width: '100%',
                  padding: '0.65rem',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.85rem',
                  lineHeight: '1.4',
                  resize: 'vertical',
                }}
                placeholder="Paste client email or WhatsApp feedback here..."
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
              />
            </div>

            {/* 3. AI STRUCTURED INTERPRETATION PREVIEW */}
            {aiResult && (
              <div className="ai-preview-box">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="ai-badge">
                    <Sparkles size={11} /> AI Feedback Classifier
                  </span>
                  <span style={{ fontSize: '0.7rem', color: '#86198f', fontStyle: 'italic' }}>
                    Mocked NLP Engine • Confidence: {Math.round(aiResult.confidence * 100)}%
                  </span>
                </div>

                <div style={{ fontSize: '0.82rem', color: '#4a044e' }}>
                  <strong>Extracted Reason:</strong> {aiResult.primaryReason} ({aiResult.category})
                </div>

                {aiResult.wasAvoidableConflict ? (
                  <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '0.5rem 0.75rem', borderRadius: 6, fontSize: '0.78rem', color: '#991b1b', display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                    <ShieldAlert size={14} style={{ flexShrink: 0, marginTop: 1 }} />
                    <div>
                      <strong>Avoidable Preference Conflict Detected:</strong>
                      <div>{aiResult.conflictedPreferenceExplanation}</div>
                      <div style={{ fontSize: '0.72rem', color: '#b91c1c', marginTop: 2 }}>
                        Insight: This matches the 35% of rejections that failed on known preferences!
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{ fontSize: '0.75rem', color: '#6b21a8' }}>
                    <strong>Insight:</strong> Nuanced subjective feedback. Stored as soft learning signal for future ranking.
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={selectedCategories.length === 0 && !feedbackText}
            >
              Save Rejection Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
