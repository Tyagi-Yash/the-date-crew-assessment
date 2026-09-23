import { describe, it, expect } from 'vitest';
import { calculateCompatibility } from '../src/engine/scoringEngine';
import { structureRejectionFeedback } from '../src/engine/aiFeedbackParser';
import { mockClients, mockCandidates } from '../src/data/mockData';

describe('Preference-Aware Compatibility Engine', () => {
  const aarav = mockClients[0]; // Aarav: Strictly non-smoker, 26-32, Bangalore/Mumbai
  const meera = mockClients[1]; // Meera: Strictly wants/open to children
  const kabir = mockClients[2]; // Kabir: Delhi NCR only, non-smoker

  it('1. Correctly excludes candidate violating hard smoking deal breaker', () => {
    const tanya = mockCandidates.find((c) => c.name === 'Tanya Verma')!; // smokes socially
    const result = calculateCompatibility(aarav, tanya);

    expect(result.isExcluded).toBe(true);
    expect(result.status).toBe('EXCLUDED');
    expect(result.totalScore).toBe(0);
    expect(result.exclusionReason).toContain('Smoking Habit');
  });

  it('2. Correctly excludes candidate violating hard age boundary', () => {
    const neha = mockCandidates.find((c) => c.name === 'Neha Kulkarni')!; // age 34 > 32
    const result = calculateCompatibility(aarav, neha);

    expect(result.isExcluded).toBe(true);
    expect(result.status).toBe('EXCLUDED');
    expect(result.exclusionReason).toContain('Age Range Constraint');
  });

  it('3. Correctly excludes candidate violating family/children deal breaker', () => {
    const vikram = mockCandidates.find((c) => c.name === 'Vikram Sethi')!; // does not want children
    const result = calculateCompatibility(meera, vikram);

    expect(result.isExcluded).toBe(true);
    expect(result.status).toBe('EXCLUDED');
    expect(result.exclusionReason).toContain('Children Preference');
  });

  it('4. Correctly scores and recommends strong match with zero deal breaker violations', () => {
    const ananya = mockCandidates.find((c) => c.name === 'Ananya Sen')!;
    const result = calculateCompatibility(aarav, ananya);

    expect(result.isExcluded).toBe(false);
    expect(result.status).toBe('RECOMMENDED');
    expect(result.totalScore).toBeGreaterThanOrEqual(80);
    expect(result.scoreItems.length).toBeGreaterThan(0);
  });

  it('5. Computes transparent additive score with explainable categories', () => {
    const rhea = mockCandidates.find((c) => c.name === 'Rhea Kapoor')!;
    const result = calculateCompatibility(aarav, rhea);

    expect(result.isExcluded).toBe(false);
    const sumPoints = result.scoreItems.reduce((acc, curr) => acc + curr.points, 0);
    expect(result.totalScore).toBe(sumPoints);
    expect(result.scoreItems.some((s) => s.category === 'Location Affinity')).toBe(true);
  });
});

describe('AI-Assisted Rejection Feedback Parser', () => {
  const aarav = mockClients[0];

  it('1. Accurately categorizes smoking feedback and flags avoidable conflict', () => {
    const raw = 'I liked her profile but she smokes occasionally and I am not comfortable with that.';
    const result = structureRejectionFeedback(raw, aarav);

    expect(result.category).toBe('Deal Breaker / Habit');
    expect(result.primaryReason).toBe('Smoking Habit Conflict');
    expect(result.confidence).toBeGreaterThan(0.9);
    expect(result.wasAvoidableConflict).toBe(true);
  });

  it('2. Accurately categorizes location rejection feedback', () => {
    const raw = 'She lives in Hyderabad which is too far for daily life and work.';
    const result = structureRejectionFeedback(raw, aarav);

    expect(result.category).toBe('Geography / Commute');
    expect(result.primaryReason).toContain('Geographic');
    expect(result.wasAvoidableConflict).toBe(true);
  });

  it('3. Categorizes career feedback as non-dealbreaker nuanced preference', () => {
    const raw = 'Her work hours in investment banking seem very demanding.';
    const result = structureRejectionFeedback(raw, aarav);

    expect(result.category).toBe('Career & Ambition');
    expect(result.wasAvoidableConflict).toBe(false);
  });
});
