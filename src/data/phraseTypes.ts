// New interfaces for JSON-based phrase structure
export interface PhraseData {
  id: number;
  text: string;
  intensity: 'soft' | 'neutral' | 'bold';
}

export interface CategoryData {
  title: string;
  description: string;
  phrases: PhraseData[];
}

export interface PhrasesDatabase {
  categories: {
    [key: string]: CategoryData;
  };
}

// Legacy interfaces for backward compatibility
export interface Phrase {
  id: string;
  text: string;
  category: PhraseCategory;
  situation: PhraseSituation;
  tone: PhraseTone;
  tags: string[];
}

export enum PhraseCategory {
  CONVERSATION_STARTER = 'conversation_starter',
  COMPLIMENT = 'compliment',
  FLIRTY = 'flirty',
  ROMANTIC = 'romantic',
  SUPPORTIVE = 'supportive',
  FUNNY = 'funny',
  DEEP = 'deep',
  CASUAL = 'casual',
  APOLOGY = 'apology',
  GOODNIGHT = 'goodnight',
  GOOD_MORNING = 'good_morning',
  RELATIONSHIP_BUILDING = 'relationship_building',
}

export enum PhraseSituation {
  FIRST_MESSAGE = 'first_message',
  EARLY_DATING = 'early_dating',
  ESTABLISHED_RELATIONSHIP = 'established_relationship',
  LONG_DISTANCE = 'long_distance',
  AFTER_ARGUMENT = 'after_argument',
  SPECIAL_OCCASION = 'special_occasion',
  DAILY_CHAT = 'daily_chat',
  MISSING_THEM = 'missing_them',
  RELATIONSHIP_BUILDING = 'relationship_building',
}

export enum PhraseTone {
  SWEET = 'sweet',
  PLAYFUL = 'playful',
  SINCERE = 'sincere',
  CONFIDENT = 'confident',
  GENTLE = 'gentle',
  PASSIONATE = 'passionate',
  HUMOROUS = 'humorous',
  CARING = 'caring',
  ROMANTIC = 'romantic',
}

// Mapping from new category keys to legacy enums
export const CATEGORY_MAPPING: Record<string, PhraseCategory> = {
  'icebreakers': PhraseCategory.CONVERSATION_STARTER,
  'compliments': PhraseCategory.COMPLIMENT,
  'asking_out': PhraseCategory.ROMANTIC,
  'deepening_connection': PhraseCategory.DEEP,
  'flirting': PhraseCategory.FLIRTY,
  'good_morning_night': PhraseCategory.GOOD_MORNING,
};

// Enhanced mapping for large dataset categories
export const LARGE_CATEGORY_MAPPING: Record<string, PhraseCategory> = {
  'after_first_date': PhraseCategory.ROMANTIC,
  'asking_out': PhraseCategory.ROMANTIC,
  'boundaries_respect': PhraseCategory.SUPPORTIVE,
  'checking_in': PhraseCategory.CASUAL,
  'compliments_appearance': PhraseCategory.COMPLIMENT,
  'compliments_personality': PhraseCategory.COMPLIMENT,
  'conflict_resolution_light': PhraseCategory.APOLOGY,
  'date_planning': PhraseCategory.ROMANTIC,
  'deepening_connection': PhraseCategory.DEEP,
  'flirting': PhraseCategory.FLIRTY,
  'future_plans': PhraseCategory.RELATIONSHIP_BUILDING,
  'good_morning_night': PhraseCategory.GOOD_MORNING,
  'gratitude': PhraseCategory.CASUAL,
  'icebreakers': PhraseCategory.CONVERSATION_STARTER,
  'long_distance': PhraseCategory.RELATIONSHIP_BUILDING,
  'photo_replies': PhraseCategory.FLIRTY,
  'playful_challenges': PhraseCategory.FUNNY,
  'rekindling_spark': PhraseCategory.ROMANTIC,
  'support_encouragement': PhraseCategory.SUPPORTIVE,
  'voice_note_prompts': PhraseCategory.CONVERSATION_STARTER,
};

// Mapping from new intensity to legacy tone
export const INTENSITY_TO_TONE: Record<string, PhraseTone> = {
  'soft': PhraseTone.GENTLE,
  'neutral': PhraseTone.SINCERE,
  'bold': PhraseTone.CONFIDENT,
};

// Convert new phrase data to legacy format for backward compatibility
export function convertPhraseDataToLegacy(
  phraseData: PhraseData,
  categoryKey: string,
  language: string = 'en',
  useLargeMapping: boolean = false
): Phrase {
  const mapping = useLargeMapping ? LARGE_CATEGORY_MAPPING : CATEGORY_MAPPING;
  const legacyCategory = mapping[categoryKey] || PhraseCategory.CASUAL;
  // Base tone by intensity
  let tone = INTENSITY_TO_TONE[phraseData.intensity] || PhraseTone.SINCERE;
  // Force humorous tone for playful challenges so Collections "Смешные" work as expected
  if (legacyCategory === PhraseCategory.FUNNY) {
    tone = PhraseTone.HUMOROUS;
  }
  return {
    id: `${categoryKey}_${phraseData.id}`,
    text: phraseData.text,
    category: legacyCategory,
    situation: PhraseSituation.DAILY_CHAT, // Default situation
    tone,
    tags: [], // Empty tags for now, can be populated later
  };
}
