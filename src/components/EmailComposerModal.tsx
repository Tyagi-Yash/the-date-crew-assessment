import React, { useState, useEffect } from 'react';
import { Candidate, Client, CompatibilityResult } from '../types';
import {
  X,
  Send,
  Sparkles,
  ShieldAlert,
  CheckCircle2,
  Mail,
  User,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';

interface EmailComposerModalProps {
  candidate: Candidate;
  client: Client;
  compatibility: CompatibilityResult;
  isOverride: boolean;
  onClose: () => void;
  onSend: (data: {
    subject: string;
    body: string;
    isOverride: boolean;
    overrideJustification?: string;
  }) => void;
}

const SAMPLE_OVERRIDE_REASONS = [
  'Client verbally mentioned in our consultation call that they are flexible on this criteria if chemistry and lifestyle align.',
  'Exceptional shared passions in lifestyle, reading, and career ambition strongly outweigh this single logistical gap.',
  'Client asked to see profiles with outstanding creative backgrounds even if slightly outside strict age/habit filters.',
];

export const EmailComposerModal: React.FC<EmailComposerModalProps> = ({
  candidate,
  client,
  compatibility,
  isOverride,
  onClose,
  onSend,
}) => {
  const [subject, setSubject] = useState<string>(
    `Curated Introduction: Meet ${candidate.name} — The Date Crew`
  );
  const [body, setBody] = useState<string>('');
  const [overrideJustification, setOverrideJustification] = useState<string>('');

  // Generate context-aware introduction email
  const generateDraft = () => {
    const sharedInterests = candidate.lifestyleTags.filter((tag) =>
      client.softPreferences.lifestyleKeywords.some(
        (pref) => pref.toLowerCase() === tag.toLowerCase() || tag.toLowerCase().includes(pref.toLowerCase())
      )
    );

    const interestStr =
      sharedInterests.length > 0
        ? sharedInterests.join(', ')
        : candidate.lifestyleTags.slice(0, 3).join(', ');

    if (isOverride) {
      // OVERRIDE EMAIL DRAFT: transparent and addressing the nuance
      return `Hi ${client.name.split(' ')[0]},

I wanted to share ${candidate.name}'s profile with you today with full transparency.

While ${candidate.name} ${compatibility.exclusionReason ? `has one trait (${compatibility.exclusionReason.toLowerCase()}) that typically conflicts with your preferences` : 'falls slightly outside standard deal-breakers'}, I felt her exceptional background and resonance with your core values warranted a personal introduction.

Why I believe ${candidate.name} is worth your consideration:
• Geographic & Lifestyle Fit: Based in ${candidate.city}, she shares your deep appreciation for ${interestStr}.
• Complementary Trajectory: Working as a ${candidate.profession} (${candidate.education}), she embodies the emotional maturity and grounded mindset you mentioned looking for.
• Cultural Resonance: Her approach to relationships and intentional family building closely mirrors yours.

I wanted to put this in your hands with complete openness. Please take a look at her profile and let me know if you would like me to connect you two!

Warm regards,
Pooja Verma
Matchmaker Lead, The Date Crew`;
    }

    // STANDARD MATCH EMAIL DRAFT: highlighting strong match factors
    return `Hi ${client.name.split(' ')[0]},

I came across ${candidate.name}'s profile today and immediately wanted to introduce you two. 

She scored an exceptional ${compatibility.totalScore}/100 on our preference engine with zero deal-breaker conflicts.

A few reasons why I feel you two will connect:
• Shared Geography & Pace: Like you, she is based in ${candidate.city} and values intentional work-life balance.
• Lifestyle & Values Resonance: Both of you share a genuine love for ${interestStr}, making weekend conversations and shared activities seamless.
• Career & Ambition Alignment: Her work as ${candidate.profession} (${candidate.education}) brings a thoughtful perspective that complements your journey.

Her complete verified profile is attached. Please take a look and let me know if you would like me to exchange contact details so you two can begin speaking!

Warm regards,
Pooja Verma
Matchmaker Lead, The Date Crew`;
  };

  useEffect(() => {
    setBody(generateDraft());
  }, [candidate, client, isOverride]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isOverride && !overrideJustification.trim()) {
      return;
    }

    onSend({
      subject,
      body,
      isOverride,
      overrideJustification: isOverride ? overrideJustification.trim() : undefined,
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-dialog modal-dialog-lg"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* MODAL HEADER */}
        <div className="modal-header">
          <div className="modal-title-wrap">
            <div className="email-modal-tag">
              <Mail size={13} />
              <span>{isOverride ? 'Matchmaker Override Dispatch' : 'Curated Introduction Email'}</span>
            </div>
            <h3 className="modal-title">
              {isOverride ? 'Send Candidate with Policy Override' : `Draft Introduction for ${client.name}`}
            </h3>
            <p className="modal-subtitle">
              Recipient: <strong>{client.name}</strong> • Candidate: <strong>{candidate.name}</strong> ({candidate.city})
            </p>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {/* OVERRIDE WARNING & MANDATORY JUSTIFICATION */}
            {isOverride && (
              <div className="override-requirement-box">
                <div className="override-header">
                  <ShieldAlert size={18} className="override-icon" />
                  <div>
                    <strong className="override-title">Deal-Breaker Policy Override Active</strong>
                    <div className="override-conflict-text">
                      Candidate conflicts with client rule: <em>{compatibility.exclusionReason}</em>
                    </div>
                  </div>
                </div>

                <div className="override-input-group">
                  <label className="override-label">
                    <span>Matchmaker Override Justification (Mandatory Audit Trail)</span>
                    <span className="required-star">*</span>
                  </label>
                  <p className="override-helper">
                    Explain why you are sending this profile despite the detected deal-breaker conflict:
                  </p>

                  {/* QUICK SAMPLE OVERRIDE REASONS */}
                  <div className="quick-override-chips">
                    {SAMPLE_OVERRIDE_REASONS.map((reason, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className="override-chip-btn"
                        onClick={() => setOverrideJustification(reason)}
                      >
                        Sample Reason {idx + 1}
                      </button>
                    ))}
                  </div>

                  <textarea
                    rows={2}
                    className="override-textarea"
                    placeholder="Enter explicit reason why client should receive this candidate despite the rule conflict..."
                    value={overrideJustification}
                    onChange={(e) => setOverrideJustification(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            {/* EMAIL RECIPIENT & SUBJECT METADATA */}
            <div className="email-meta-fields">
              <div className="email-field-row">
                <span className="email-field-label">To:</span>
                <span className="email-field-value">
                  {client.name} &lt;{client.name.toLowerCase().replace(/[^a-z]/g, '')}@client.datecrew.com&gt;
                </span>
              </div>
              <div className="email-field-row">
                <span className="email-field-label">From:</span>
                <span className="email-field-value">
                  Pooja Verma &lt;matchmaker@thedatecrew.com&gt;
                </span>
              </div>
              <div className="email-field-row">
                <span className="email-field-label">Subject:</span>
                <input
                  type="text"
                  className="email-subject-input"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* EMAIL BODY WITH AI/REASONING COPY */}
            <div className="email-body-container">
              <div className="email-body-toolbar">
                <span className="toolbar-label">
                  <Sparkles size={13} className="toolbar-sparkle" />
                  <span>Personalized Match Reasoning Draft</span>
                </span>
                <button
                  type="button"
                  className="btn-toolbar-regen"
                  onClick={() => setBody(generateDraft())}
                  title="Reset to generated introduction text"
                >
                  <RotateCcw size={12} />
                  <span>Regenerate Draft</span>
                </button>
              </div>

              <textarea
                rows={11}
                className="email-body-textarea"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Personalize introduction email to client..."
                required
              />
            </div>
          </div>

          {/* MODAL FOOTER */}
          <div className="modal-footer">
            <button type="button" className="btn-modal-secondary" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className={`btn-modal-primary ${isOverride ? 'btn-override-dispatch' : ''}`}
              disabled={isOverride && !overrideJustification.trim()}
            >
              <Send size={14} />
              <span>{isOverride ? 'Record Override & Send Email' : 'Send Introduction Email'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
