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

// Sample phrases database - in production this would be much larger
export const SAMPLE_PHRASES: Phrase[] = [
  // Conversation Starters
  {
    id: '1',
    text: "I was just thinking about you and couldn't help but smile. How's your day going?",
    category: PhraseCategory.CONVERSATION_STARTER,
    situation: PhraseSituation.DAILY_CHAT,
    tone: PhraseTone.SWEET,
    tags: ['thinking', 'smile', 'day'],
  },
  {
    id: '2',
    text: "What's the most interesting thing that happened to you today?",
    category: PhraseCategory.CONVERSATION_STARTER,
    situation: PhraseSituation.DAILY_CHAT,
    tone: PhraseTone.SINCERE,
    tags: ['interesting', 'today', 'curious'],
  },
  // Compliments
  {
    id: '3',
    text: 'You have this amazing way of making everything better just by being yourself.',
    category: PhraseCategory.COMPLIMENT,
    situation: PhraseSituation.ESTABLISHED_RELATIONSHIP,
    tone: PhraseTone.SINCERE,
    tags: ['amazing', 'better', 'yourself'],
  },
  {
    id: '4',
    text: 'Your smile is absolutely contagious - it lights up my entire day.',
    category: PhraseCategory.COMPLIMENT,
    situation: PhraseSituation.EARLY_DATING,
    tone: PhraseTone.SWEET,
    tags: ['smile', 'contagious', 'lights up'],
  },
  // Flirty
  {
    id: '5',
    text: "I can't concentrate on anything today because I keep thinking about you.",
    category: PhraseCategory.FLIRTY,
    situation: PhraseSituation.EARLY_DATING,
    tone: PhraseTone.PLAYFUL,
    tags: ['concentrate', 'thinking', 'distracted'],
  },
  {
    id: '6',
    text: 'Is it just me, or do we have incredible chemistry?',
    category: PhraseCategory.FLIRTY,
    situation: PhraseSituation.EARLY_DATING,
    tone: PhraseTone.CONFIDENT,
    tags: ['chemistry', 'incredible', 'connection'],
  },
  // Romantic
  {
    id: '7',
    text: 'Every moment with you feels like a beautiful dream I never want to wake up from.',
    category: PhraseCategory.ROMANTIC,
    situation: PhraseSituation.ESTABLISHED_RELATIONSHIP,
    tone: PhraseTone.PASSIONATE,
    tags: ['moment', 'beautiful', 'dream'],
  },
  {
    id: '8',
    text: "You're not just my partner, you're my best friend and the love of my life.",
    category: PhraseCategory.ROMANTIC,
    situation: PhraseSituation.ESTABLISHED_RELATIONSHIP,
    tone: PhraseTone.SINCERE,
    tags: ['partner', 'best friend', 'love of life'],
  },
  // Supportive
  {
    id: '9',
    text: "I believe in you completely. You've got this, and I'm here for you no matter what.",
    category: PhraseCategory.SUPPORTIVE,
    situation: PhraseSituation.ESTABLISHED_RELATIONSHIP,
    tone: PhraseTone.CARING,
    tags: ['believe', 'support', 'here for you'],
  },
  {
    id: '10',
    text: "You're stronger than you know, and I'm so proud to be by your side.",
    category: PhraseCategory.SUPPORTIVE,
    situation: PhraseSituation.ESTABLISHED_RELATIONSHIP,
    tone: PhraseTone.GENTLE,
    tags: ['stronger', 'proud', 'by your side'],
  },
  // Funny
  {
    id: '11',
    text: 'I was normal before I met you. Now look at me - completely obsessed and loving every second of it!',
    category: PhraseCategory.FUNNY,
    situation: PhraseSituation.EARLY_DATING,
    tone: PhraseTone.HUMOROUS,
    tags: ['normal', 'obsessed', 'loving it'],
  },
  {
    id: '12',
    text: 'Warning: Thinking about you may cause excessive smiling and random giggling.',
    category: PhraseCategory.FUNNY,
    situation: PhraseSituation.EARLY_DATING,
    tone: PhraseTone.PLAYFUL,
    tags: ['warning', 'smiling', 'giggling'],
  },
  // Good Morning
  {
    id: '13',
    text: 'Good morning, beautiful! Hope your day is as amazing as you are.',
    category: PhraseCategory.GOOD_MORNING,
    situation: PhraseSituation.DAILY_CHAT,
    tone: PhraseTone.SWEET,
    tags: ['good morning', 'beautiful', 'amazing day'],
  },
  {
    id: '14',
    text: 'Waking up thinking about you is the perfect way to start any day.',
    category: PhraseCategory.GOOD_MORNING,
    situation: PhraseSituation.ESTABLISHED_RELATIONSHIP,
    tone: PhraseTone.ROMANTIC,
    tags: ['waking up', 'thinking', 'perfect start'],
  },
  // Good Night
  {
    id: '15',
    text: "Sweet dreams, gorgeous. Can't wait to talk to you tomorrow.",
    category: PhraseCategory.GOODNIGHT,
    situation: PhraseSituation.DAILY_CHAT,
    tone: PhraseTone.SWEET,
    tags: ['sweet dreams', 'gorgeous', 'tomorrow'],
  },
  {
    id: '16',
    text: "As you drift off to sleep, know that you're the last thing on my mind and the first thing I'll think of tomorrow.",
    category: PhraseCategory.GOODNIGHT,
    situation: PhraseSituation.ESTABLISHED_RELATIONSHIP,
    tone: PhraseTone.ROMANTIC,
    tags: ['drift off', 'last thing', 'first thing'],
  },
  // Deep/Meaningful
  {
    id: '17',
    text: "You've changed my perspective on so many things, and I'm grateful for the person I'm becoming with you.",
    category: PhraseCategory.DEEP,
    situation: PhraseSituation.ESTABLISHED_RELATIONSHIP,
    tone: PhraseTone.SINCERE,
    tags: ['changed perspective', 'grateful', 'becoming'],
  },
  {
    id: '18',
    text: 'I love how we can talk about anything and everything. You truly understand me.',
    category: PhraseCategory.DEEP,
    situation: PhraseSituation.RELATIONSHIP_BUILDING,
    tone: PhraseTone.SINCERE,
    tags: ['talk about anything', 'understand', 'connection'],
  },
  // Missing Them
  {
    id: '19',
    text: 'The distance between us is just a test of how far love can travel.',
    category: PhraseCategory.ROMANTIC,
    situation: PhraseSituation.LONG_DISTANCE,
    tone: PhraseTone.PASSIONATE,
    tags: ['distance', 'test', 'love travel'],
  },
  {
    id: '20',
    text: "Missing you is my heart's way of reminding me how much you mean to me.",
    category: PhraseCategory.ROMANTIC,
    situation: PhraseSituation.MISSING_THEM,
    tone: PhraseTone.SINCERE,
    tags: ['missing', 'heart', 'mean to me'],
  },
];
