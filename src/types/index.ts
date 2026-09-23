export type SmokingHabit = 'never' | 'socially' | 'regularly';
export type DrinkingHabit = 'never' | 'socially' | 'regularly';
export type ChildrenPreference = 'wants' | 'open' | 'doesn_not_want';

export interface DealBreakers {
  smokingAllowed: SmokingHabit[];
  drinkingAllowed: DrinkingHabit[];
  childrenPreferenceAllowed: ChildrenPreference[];
  minAge: number;
  maxAge: number;
  allowedLocations: string[];
}

export interface SoftPreferences {
  preferredLocations: string[];
  preferredProfessions: string[];
  preferredEducationLevels: string[];
  lifestyleKeywords: string[];
  idealAgeRange: [number, number];
}

export interface Client {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'non-binary';
  city: string;
  profession: string;
  education: string;
  avatar: string;
  bio: string;
  dealBreakers: DealBreakers;
  softPreferences: SoftPreferences;
  assignedMatchmaker: string;
}

export interface Candidate {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'non-binary';
  city: string;
  profession: string;
  education: string;
  avatar: string;
  smoking: SmokingHabit;
  drinking: DrinkingHabit;
  childrenPreference: ChildrenPreference;
  lifestyleTags: string[];
  bio: string;
  verifiedProfile: boolean;
}

export interface ScoreItem {
  category: string;
  points: number;
  maxPoints: number;
  explanation: string;
  isMatch: boolean;
  isNeutral?: boolean;
}

export interface CompatibilityResult {
  candidateId: string;
  isExcluded: boolean;
  exclusionReason?: string;
  dealBreakersChecked: {
    name: string;
    passed: boolean;
    detail: string;
  }[];
  totalScore: number;
  status: 'RECOMMENDED' | 'REVIEW' | 'EXCLUDED';
  scoreItems: ScoreItem[];
  summaryNote: string;
}

export interface RejectionRecord {
  id: string;
  candidateId: string;
  candidateName: string;
  clientId: string;
  rawFeedback: string;
  selectedCategories: string[];
  aiInterpretation: {
    reason: string;
    category: string;
    confidence: number;
    wasAvoidableConflict: boolean;
    conflictedPreference?: string;
  };
  timestamp: string;
}

export interface MatchmakerInteractionState {
  sharedProfileIds: string[];
  rejections: Record<string, RejectionRecord>;
}
