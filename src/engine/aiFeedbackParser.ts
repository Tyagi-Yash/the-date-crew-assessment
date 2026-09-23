import { Client } from '../types';

export interface StructuredFeedbackResult {
  primaryReason: string;
  category: 'Deal Breaker / Habit' | 'Geography / Commute' | 'Age Demographics' | 'Career & Ambition' | 'Family & Children' | 'Lifestyle & Vibe' | 'General Preference';
  confidence: number;
  extractedKeywords: string[];
  wasAvoidableConflict: boolean;
  conflictedPreferenceExplanation?: string;
  suggestedAction: string;
}

/**
 * AI-Assisted Rejection Feedback Parser (Prototype Mock Implementation)
 *
 * In production, this calls an LLM (e.g. Gemini 1.5 / Claude) with structured JSON output schema.
 * For this prototype, it uses a deterministic semantic taxonomy matcher to extract:
 * 1. Primary reason
 * 2. Standardized taxonomy category
 * 3. Confidence score (0.0 - 1.0)
 * 4. Audit against client deal breakers to identify "Avoidable Preference Conflicts"
 */
export function structureRejectionFeedback(rawText: string, client?: Client): StructuredFeedbackResult {
  const text = rawText.toLowerCase().trim();

  // 1. Smoking / Substance checks
  if (text.includes('smoke') || text.includes('smoking') || text.includes('cigarette') || text.includes('vape')) {
    const isAvoidable = client ? !client.dealBreakers.smokingAllowed.includes('socially') || !client.dealBreakers.smokingAllowed.includes('regularly') : true;
    return {
      primaryReason: 'Smoking Habit Conflict',
      category: 'Deal Breaker / Habit',
      confidence: 0.96,
      extractedKeywords: ['smoking', 'habit', 'lifestyle'],
      wasAvoidableConflict: isAvoidable,
      conflictedPreferenceExplanation: isAvoidable && client
        ? `Avoidable conflict: Client profile explicitly requires [${client.dealBreakers.smokingAllowed.join(', ')}] smoking only.`
        : undefined,
      suggestedAction: 'Ensure strict automated pre-filtering on candidate smoking habits before manual curation.',
    };
  }

  // 2. Location / Commute checks
  if (
    text.includes('city') ||
    text.includes('location') ||
    text.includes('relocate') ||
    text.includes('distance') ||
    text.includes('bangalore') ||
    text.includes('mumbai') ||
    text.includes('delhi') ||
    text.includes('gurgaon') ||
    text.includes('pune') ||
    text.includes('travel') ||
    text.includes('commute') ||
    text.includes('far')
  ) {
    const isAvoidable = client ? true : false;
    return {
      primaryReason: 'Geographic / Relocation Constraint',
      category: 'Geography / Commute',
      confidence: 0.94,
      extractedKeywords: ['location', 'city', 'distance'],
      wasAvoidableConflict: isAvoidable,
      conflictedPreferenceExplanation: isAvoidable && client
        ? `Avoidable conflict: Candidate location falls outside client's preferred cities (${client.dealBreakers.allowedLocations.join(', ')}).`
        : undefined,
      suggestedAction: 'Enforce geo-fencing on initial candidate retrieval.',
    };
  }

  // 3. Children / Family Planning checks
  if (
    text.includes('kid') ||
    text.includes('child') ||
    text.includes('children') ||
    text.includes('family') ||
    text.includes('settle down')
  ) {
    const isAvoidable = client ? true : false;
    return {
      primaryReason: 'Family & Children Planning Mismatch',
      category: 'Family & Children',
      confidence: 0.95,
      extractedKeywords: ['children', 'family plans', 'intent'],
      wasAvoidableConflict: isAvoidable,
      conflictedPreferenceExplanation: isAvoidable && client
        ? `Avoidable conflict: Client requires alignment on children (${client.dealBreakers.childrenPreferenceAllowed.join(', ')}).`
        : undefined,
      suggestedAction: 'Clarify long-term family timeline before sharing profiles.',
    };
  }

  // 4. Age checks
  if (
    text.includes('age') ||
    text.includes('older') ||
    text.includes('younger') ||
    text.includes('too young') ||
    text.includes('too old') ||
    text.includes('mature')
  ) {
    const isAvoidable = client ? true : false;
    return {
      primaryReason: 'Age Bracket Preference Conflict',
      category: 'Age Demographics',
      confidence: 0.93,
      extractedKeywords: ['age', 'bracket', 'maturity'],
      wasAvoidableConflict: isAvoidable,
      conflictedPreferenceExplanation: isAvoidable && client
        ? `Avoidable conflict: Candidate is outside client's hard age criteria (${client.dealBreakers.minAge}–${client.dealBreakers.maxAge}).`
        : undefined,
      suggestedAction: 'Lock age boundary sliders in profile generator.',
    };
  }

  // 5. Profession / Career checks
  if (
    text.includes('job') ||
    text.includes('career') ||
    text.includes('profession') ||
    text.includes('work') ||
    text.includes('salary') ||
    text.includes('hours') ||
    text.includes('demanding') ||
    text.includes('industry')
  ) {
    return {
      primaryReason: 'Career Demands / Industry Preference',
      category: 'Career & Ambition',
      confidence: 0.89,
      extractedKeywords: ['career', 'profession', 'work-life balance'],
      wasAvoidableConflict: false,
      suggestedAction: 'Refine industry alignment weights in client soft preferences.',
    };
  }

  // 6. Lifestyle / Values checks
  if (
    text.includes('vibe') ||
    text.includes('drink') ||
    text.includes('party') ||
    text.includes('introvert') ||
    text.includes('extrovert') ||
    text.includes('values') ||
    text.includes('lifestyle') ||
    text.includes('diet') ||
    text.includes('veg')
  ) {
    return {
      primaryReason: 'Lifestyle & Social Vibe Disconnect',
      category: 'Lifestyle & Vibe',
      confidence: 0.88,
      extractedKeywords: ['vibe', 'lifestyle', 'social habits'],
      wasAvoidableConflict: false,
      suggestedAction: 'Review qualitative notes and schedule a 10-minute preference calibration call.',
    };
  }

  // Default fallback
  return {
    primaryReason: 'General Chemistry / Preference Nuance',
    category: 'General Preference',
    confidence: 0.78,
    extractedKeywords: ['unspecified', 'subjective'],
    wasAvoidableConflict: false,
    suggestedAction: 'Prompt matchmaker for a 1-sentence specific feedback clarification.',
  };
}
