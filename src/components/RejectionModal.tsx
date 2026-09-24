import React, { useState, useEffect } from 'react';
import { Candidate, Client, RejectionRecord } from '../types';
import { structureRejectionFeedback } from '../engine/aiFeedbackParser';
import {
  X,
  Sparkles,
  ShieldAlert,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  HelpCircle,
} from 'lucide-react';

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
  {
    label: 'Smoking Deal-Breaker',
    text: 'I liked her profile but she smokes occasionally and I am not comfortable with that.',
  },
  {
    label: 'Location / Commute',
    text: 'She lives in Hyderabad which is too far for my life and work in Bangalore.',
  },
  {
    label: 'Family / Children',
    text: 'Great background, but he decided he does not want children, which is a hard deal breaker.',
  },
  {
    label: 'Work Demands',
    text: 'Her work hours in high-growth startup seem very demanding for family life right now.',
  },
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

  // Parse feedback via AI NLP classifier when text changes
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

  const handleSelectSample = (sampleText: string) => {
    setFeedbackText(sampleText);
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
      <div className="modal-dialog modal-dialog-lg" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        {/* MODAL HEADER */}
        <div className="modal-header">
          <div className="modal-title-wrap">
            <h3 className="modal-title">Why was this profile rejected?</h3>
            <p className="modal-subtitle">
              Logging client feedback for <strong>{candidate.name}</strong> • Client: <strong>{client.name}</strong>
            </p>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {/* 1. STRUCTURED REASONS */}
            <div className="form-group">
              <label className="form-label">
                <span>1. Select primary structured reason(s)</span>
                <span className="label-helper">Choose one or more categories</span>
              </label>

              <div className="category-chips-grid">
                {CATEGORIES.map((cat) => {
                  const isChecked = selectedCategories.includes(cat);
                  return (
                    <button
                      key={cat}
                      type="button"
                      className={`cat-chip-btn ${isChecked ? 'is-selected' : ''}`}
                      onClick={() => toggleCategory(cat)}
                    >
                      <span className={`chip-indicator ${isChecked ? 'checked' : ''}`}>
                        {isChecked && '✓'}
                      </span>
                      <span className="chip-text">{cat}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. FREE-TEXT CLIENT FEEDBACK */}
            <div className="form-group">
              <div className="label-row">
                <label className="form-label">
                  <span>2. Additional client feedback</span>
                  <span className="label-helper">Paste email or WhatsApp note</span>
                </label>
              </div>

              {/* QUICK SAMPLE SCENARIOS */}
              <div className="sample-scenarios-strip">
                <span className="samples-heading">Test scenarios:</span>
                <div className="samples-pills">
                  {SAMPLE_FEEDBACKS.map((sample, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="sample-pill-btn"
                      onClick={() => handleSelectSample(sample.text)}
                    >
                      {sample.label}
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                rows={3}
                className="feedback-textarea"
                placeholder="Paste client email or WhatsApp feedback here (e.g. 'I liked her profile but she smokes occasionally...')..."
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
              />
            </div>

            {/* 3. AI STRUCTURED INTERPRETATION PREVIEW */}
            {aiResult && (
              <div className="ai-interpretation-card">
                <div className="ai-card-top">
                  <div className="ai-brand-pill">
                    <Sparkles size={12} className="ai-spark" />
                    <span>AI-Assisted Classification</span>
                  </div>
                  <div className="ai-conf-tag">
                    Confidence: <strong>{aiResult.confidence > 0.9 ? 'High' : 'Medium'}</strong> ({Math.round(aiResult.confidence * 100)}%)
                  </div>
                </div>

                <div className="ai-details-grid">
                  <div className="ai-detail-item">
                    <span className="ai-detail-label">Category:</span>
                    <strong className="ai-detail-val">{aiResult.category}</strong>
                  </div>
                  <div className="ai-detail-item">
                    <span className="ai-detail-label">Reason:</span>
                    <strong className="ai-detail-val">{aiResult.primaryReason}</strong>
                  </div>
                </div>

                {aiResult.wasAvoidableConflict ? (
                  <div className="avoidable-conflict-banner">
                    <ShieldAlert size={16} className="conflict-icon" />
                    <div className="conflict-content">
                      <strong className="conflict-title">Avoidable Preference Conflict Detected</strong>
                      <p className="conflict-desc">{aiResult.conflictedPreferenceExplanation}</p>
                      <span className="conflict-note">
                        Insight: Fixes the 35% of rejections that failed on already-known preferences.
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="nuance-feedback-banner">
                    <CheckCircle2 size={15} className="nuance-icon" />
                    <span className="nuance-text">
                      Nuanced feedback recorded. Stored as soft learning signal to calibrate future ranking weights.
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* MODAL FOOTER */}
          <div className="modal-footer">
            <button type="button" className="btn-modal-secondary" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn-modal-primary"
              disabled={selectedCategories.length === 0 && !feedbackText.trim()}
            >
              Save Rejection Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
