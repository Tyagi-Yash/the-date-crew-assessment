import { Client, Candidate, CompatibilityResult, ScoreItem } from '../types';

export function calculateCompatibility(client: Client, candidate: Candidate): CompatibilityResult {
  const dealBreakersChecked: CompatibilityResult['dealBreakersChecked'] = [];

  // 1. HARD CONSTRAINTS / DEAL BREAKERS
  // Smoking
  const smokingPassed = client.dealBreakers.smokingAllowed.includes(candidate.smoking);
  dealBreakersChecked.push({
    name: 'Smoking Habit',
    passed: smokingPassed,
    detail: smokingPassed
      ? `Candidate smokes '${candidate.smoking}', allowed by client (${client.dealBreakers.smokingAllowed.join(', ')})`
      : `Candidate smokes '${candidate.smoking}', which violates client's non-negotiable rule (${client.dealBreakers.smokingAllowed.join(', ')})`,
  });

  // Drinking
  const drinkingPassed = client.dealBreakers.drinkingAllowed.includes(candidate.drinking);
  dealBreakersChecked.push({
    name: 'Drinking Habit',
    passed: drinkingPassed,
    detail: drinkingPassed
      ? `Candidate drinks '${candidate.drinking}', allowed by client`
      : `Candidate drinks '${candidate.drinking}', violates client deal breaker`,
  });

  // Children
  const childrenPassed = client.dealBreakers.childrenPreferenceAllowed.includes(candidate.childrenPreference);
  dealBreakersChecked.push({
    name: 'Children Preference',
    passed: childrenPassed,
    detail: childrenPassed
      ? `Candidate preference is '${candidate.childrenPreference}', matches client constraint`
      : `Candidate preference is '${candidate.childrenPreference}', conflicts with client family plan requirement`,
  });

  // Age Bounds
  const agePassed = candidate.age >= client.dealBreakers.minAge && candidate.age <= client.dealBreakers.maxAge;
  dealBreakersChecked.push({
    name: 'Age Range Constraint',
    passed: agePassed,
    detail: agePassed
      ? `Age ${candidate.age} is within hard limit (${client.dealBreakers.minAge}–${client.dealBreakers.maxAge})`
      : `Age ${candidate.age} is outside client's hard age bracket (${client.dealBreakers.minAge}–${client.dealBreakers.maxAge})`,
  });

  // Location / City Bound
  const candidateCityNormalized = candidate.city.toLowerCase();
  const locationPassed = client.dealBreakers.allowedLocations.some(
    (loc) => candidateCityNormalized.includes(loc.toLowerCase()) || loc.toLowerCase().includes(candidateCityNormalized)
  );
  dealBreakersChecked.push({
    name: 'Location Feasibility',
    passed: locationPassed,
    detail: locationPassed
      ? `Based in ${candidate.city}, within acceptable geography (${client.dealBreakers.allowedLocations.join(', ')})`
      : `Based in ${candidate.city}, outside client's accepted locations (${client.dealBreakers.allowedLocations.join(', ')})`,
  });

  const failedDealBreaker = dealBreakersChecked.find((db) => !db.passed);

  if (failedDealBreaker) {
    return {
      candidateId: candidate.id,
      isExcluded: true,
      exclusionReason: `${failedDealBreaker.name}: ${failedDealBreaker.detail}`,
      dealBreakersChecked,
      totalScore: 0,
      status: 'EXCLUDED',
      scoreItems: [],
      summaryNote: `Profile excluded due to hard constraint conflict: ${failedDealBreaker.name}. Sharing this profile would create an avoidable rejection.`,
    };
  }

  // 2. WEIGHTED SCORING FOR ELIGIBLE PROFILES (Sum = 100)
  const scoreItems: ScoreItem[] = [];

  // A. Location Affinity (25 pts max)
  const isPrimaryLocation = client.softPreferences.preferredLocations.some((loc) =>
    candidate.city.toLowerCase().includes(loc.toLowerCase())
  );
  if (isPrimaryLocation) {
    scoreItems.push({
      category: 'Location Affinity',
      points: 25,
      maxPoints: 25,
      explanation: `Lives in primary preferred city (${candidate.city})`,
      isMatch: true,
    });
  } else {
    scoreItems.push({
      category: 'Location Affinity',
      points: 15,
      maxPoints: 25,
      explanation: `Lives in secondary/commutable city (${candidate.city}), within allowed deal breakers`,
      isMatch: true,
      isNeutral: true,
    });
  }

  // B. Age Alignment (20 pts max)
  const [idealMin, idealMax] = client.softPreferences.idealAgeRange;
  if (candidate.age >= idealMin && candidate.age <= idealMax) {
    scoreItems.push({
      category: 'Age Alignment',
      points: 20,
      maxPoints: 20,
      explanation: `Age ${candidate.age} falls right in ideal sweet spot (${idealMin}–${idealMax})`,
      isMatch: true,
    });
  } else {
    scoreItems.push({
      category: 'Age Alignment',
      points: 12,
      maxPoints: 20,
      explanation: `Age ${candidate.age} is acceptable, slightly outside ideal (${idealMin}–${idealMax})`,
      isMatch: true,
      isNeutral: true,
    });
  }

  // C. Profession Alignment (20 pts max)
  const matchesPreferredProf = client.softPreferences.preferredProfessions.some(
    (prof) => candidate.profession.toLowerCase().includes(prof.toLowerCase())
  );
  if (matchesPreferredProf) {
    scoreItems.push({
      category: 'Profession & Industry',
      points: 20,
      maxPoints: 20,
      explanation: `Profession (${candidate.profession}) matches client industry preference`,
      isMatch: true,
    });
  } else {
    scoreItems.push({
      category: 'Profession & Industry',
      points: 10,
      maxPoints: 20,
      explanation: `Profession (${candidate.profession}) is stable/professional, though not primary industry preference`,
      isMatch: false,
      isNeutral: true,
    });
  }

  // D. Lifestyle & Shared Values (20 pts max)
  const sharedTags = candidate.lifestyleTags.filter((tag) =>
    client.softPreferences.lifestyleKeywords.some(
      (pref) => pref.toLowerCase() === tag.toLowerCase() || tag.toLowerCase().includes(pref.toLowerCase())
    )
  );
  const lifestylePoints = Math.min(20, sharedTags.length * 6.5);
  scoreItems.push({
    category: 'Lifestyle & Interests',
    points: Math.round(lifestylePoints),
    maxPoints: 20,
    explanation:
      sharedTags.length > 0
        ? `Shared interests: ${sharedTags.join(', ')} (${sharedTags.length} overlapping areas)`
        : `Complementary lifestyle interests (${candidate.lifestyleTags.slice(0, 3).join(', ')})`,
    isMatch: sharedTags.length > 0,
  });

  // E. Education Level (15 pts max)
  const matchesEdu = client.softPreferences.preferredEducationLevels.some((edu) =>
    candidate.education.toLowerCase().includes(edu.toLowerCase())
  );
  if (matchesEdu) {
    scoreItems.push({
      category: 'Education Background',
      points: 15,
      maxPoints: 15,
      explanation: `Degree background (${candidate.education}) satisfies education preference`,
      isMatch: true,
    });
  } else {
    scoreItems.push({
      category: 'Education Background',
      points: 10,
      maxPoints: 15,
      explanation: `Degree (${candidate.education}) is verified, non-exact target match`,
      isMatch: false,
      isNeutral: true,
    });
  }

  // Total Score Calculation
  const totalScore = scoreItems.reduce((acc, curr) => acc + curr.points, 0);
  const status: CompatibilityResult['status'] = totalScore >= 75 ? 'RECOMMENDED' : 'REVIEW';

  const strongMatches = scoreItems.filter((i) => i.isMatch && !i.isNeutral).map((i) => i.category);

  return {
    candidateId: candidate.id,
    isExcluded: false,
    dealBreakersChecked,
    totalScore,
    status,
    scoreItems,
    summaryNote:
      status === 'RECOMMENDED'
        ? `Strong candidate (${totalScore}/100) with clear alignment across ${strongMatches.join(', ')} and 0 deal breaker violations.`
        : `Moderate candidate (${totalScore}/100) with zero hard violations. Suitable for secondary review.`,
  };
}
