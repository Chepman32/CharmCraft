import { Phrase, PhraseCategory, PhraseSituation, PhraseTone } from './phrases';

// This file contains an extended database of phrases
// In a production app, this would be loaded from a JSON file or database
export const EXTENDED_PHRASES: Phrase[] = [
  // Conversation Starters (100+ phrases)
  {
    id: 'cs1',
    text: "I was just thinking about you and couldn't help but smile. How's your day going?",
    category: PhraseCategory.CONVERSATION_STARTER,
    situation: PhraseSituation.DAILY_CHAT,
    tone: PhraseTone.SWEET,
    tags: ['thinking', 'smile', 'day']
  },
  {
    id: 'cs2',
    text: "What's the most interesting thing that happened to you today?",
    category: PhraseCategory.CONVERSATION_STARTER,
    situation: PhraseSituation.DAILY_CHAT,
    tone: PhraseTone.SINCERE,
    tags: ['interesting', 'today', 'curious']
  },
  {
    id: 'cs3',
    text: "I saw something today that reminded me of you and made me smile.",
    category: PhraseCategory.CONVERSATION_STARTER,
    situation: PhraseSituation.DAILY_CHAT,
    tone: PhraseTone.SWEET,
    tags: ['reminded', 'smile', 'today']
  },
  {
    id: 'cs4',
    text: "How was your morning? I hope it started as beautifully as you are.",
    category: PhraseCategory.CONVERSATION_STARTER,
    situation: PhraseSituation.DAILY_CHAT,
    tone: PhraseTone.ROMANTIC,
    tags: ['morning', 'beautiful', 'started']
  },
  {
    id: 'cs5',
    text: "I have a random question for you - what's your favorite way to spend a lazy Sunday?",
    category: PhraseCategory.CONVERSATION_STARTER,
    situation: PhraseSituation.EARLY_DATING,
    tone: PhraseTone.PLAYFUL,
    tags: ['random', 'question', 'lazy sunday']
  },  {
  
  id: 'cs6',
    text: "Tell me about the best part of your week so far.",
    category: PhraseCategory.CONVERSATION_STARTER,
    situation: PhraseSituation.DAILY_CHAT,
    tone: PhraseTone.SINCERE,
    tags: ['best part', 'week', 'tell me']
  },
  {
    id: 'cs7',
    text: "I was listening to this song and it made me think of you. Want to hear it?",
    category: PhraseCategory.CONVERSATION_STARTER,
    situation: PhraseSituation.RELATIONSHIP_BUILDING,
    tone: PhraseTone.SWEET,
    tags: ['song', 'think of you', 'listening']
  },
  {
    id: 'cs8',
    text: "What's something you're looking forward to this week?",
    category: PhraseCategory.CONVERSATION_STARTER,
    situation: PhraseSituation.DAILY_CHAT,
    tone: PhraseTone.SINCERE,
    tags: ['looking forward', 'week', 'something']
  },
  {
    id: 'cs9',
    text: "I hope you're having an amazing day, because you deserve nothing less.",
    category: PhraseCategory.CONVERSATION_STARTER,
    situation: PhraseSituation.DAILY_CHAT,
    tone: PhraseTone.CARING,
    tags: ['amazing day', 'deserve', 'nothing less']
  },
  {
    id: 'cs10',
    text: "Quick question: coffee or tea? And what does your choice say about you?",
    category: PhraseCategory.CONVERSATION_STARTER,
    situation: PhraseSituation.EARLY_DATING,
    tone: PhraseTone.PLAYFUL,
    tags: ['coffee', 'tea', 'choice']
  },

  // Compliments (150+ phrases)
  {
    id: 'comp1',
    text: "You have this amazing way of making everything better just by being yourself.",
    category: PhraseCategory.COMPLIMENT,
    situation: PhraseSituation.ESTABLISHED_RELATIONSHIP,
    tone: PhraseTone.SINCERE,
    tags: ['amazing', 'better', 'yourself']
  },
  {
    id: 'comp2',
    text: "Your smile is absolutely contagious - it lights up my entire day.",
    category: PhraseCategory.COMPLIMENT,
    situation: PhraseSituation.EARLY_DATING,
    tone: PhraseTone.SWEET,
    tags: ['smile', 'contagious', 'lights up']
  },
  {
    id: 'comp3',
    text: "I love how passionate you get when you talk about things you care about.",
    category: PhraseCategory.COMPLIMENT,
    situation: PhraseSituation.RELATIONSHIP_BUILDING,
    tone: PhraseTone.SINCERE,
    tags: ['passionate', 'care about', 'love']
  },
  {
    id: 'comp4',
    text: "You have such a beautiful mind - the way you think about things fascinates me.",
    category: PhraseCategory.COMPLIMENT,
    situation: PhraseSituation.RELATIONSHIP_BUILDING,
    tone: PhraseTone.SINCERE,
    tags: ['beautiful mind', 'think', 'fascinates']
  },
  {
    id: 'comp5',
    text: "Your laugh is my favorite sound in the world.",
    category: PhraseCategory.COMPLIMENT,
    situation: PhraseSituation.ESTABLISHED_RELATIONSHIP,
    tone: PhraseTone.ROMANTIC,
    tags: ['laugh', 'favorite sound', 'world']
  },
  {
    id: 'comp6',
    text: "You make even the ordinary moments feel extraordinary.",
    category: PhraseCategory.COMPLIMENT,
    situation: PhraseSituation.ESTABLISHED_RELATIONSHIP,
    tone: PhraseTone.ROMANTIC,
    tags: ['ordinary', 'extraordinary', 'moments']
  },
  {
    id: 'comp7',
    text: "I admire your strength and how you handle challenges with such grace.",
    category: PhraseCategory.COMPLIMENT,
    situation: PhraseSituation.ESTABLISHED_RELATIONSHIP,
    tone: PhraseTone.SINCERE,
    tags: ['admire', 'strength', 'grace']
  },
  {
    id: 'comp8',
    text: "You have this incredible ability to make everyone around you feel special.",
    category: PhraseCategory.COMPLIMENT,
    situation: PhraseSituation.RELATIONSHIP_BUILDING,
    tone: PhraseTone.SINCERE,
    tags: ['incredible', 'everyone', 'special']
  },
  {
    id: 'comp9',
    text: "Your kindness is one of the most beautiful things about you.",
    category: PhraseCategory.COMPLIMENT,
    situation: PhraseSituation.RELATIONSHIP_BUILDING,
    tone: PhraseTone.SINCERE,
    tags: ['kindness', 'beautiful', 'about you']
  },
  {
    id: 'comp10',
    text: "I love how you see the good in everything and everyone.",
    category: PhraseCategory.COMPLIMENT,
    situation: PhraseSituation.RELATIONSHIP_BUILDING,
    tone: PhraseTone.SINCERE,
    tags: ['see good', 'everything', 'everyone']
  },

  // Flirty Messages (200+ phrases)
  {
    id: 'flirt1',
    text: "I can't concentrate on anything today because I keep thinking about you.",
    category: PhraseCategory.FLIRTY,
    situation: PhraseSituation.EARLY_DATING,
    tone: PhraseTone.PLAYFUL,
    tags: ['concentrate', 'thinking', 'distracted']
  },
  {
    id: 'flirt2',
    text: "Is it just me, or do we have incredible chemistry?",
    category: PhraseCategory.FLIRTY,
    situation: PhraseSituation.EARLY_DATING,
    tone: PhraseTone.CONFIDENT,
    tags: ['chemistry', 'incredible', 'connection']
  },
  {
    id: 'flirt3',
    text: "You're dangerously attractive, and I'm not complaining.",
    category: PhraseCategory.FLIRTY,
    situation: PhraseSituation.EARLY_DATING,
    tone: PhraseTone.CONFIDENT,
    tags: ['dangerously', 'attractive', 'not complaining']
  },
  {
    id: 'flirt4',
    text: "I have a confession: I've been thinking about kissing you all day.",
    category: PhraseCategory.FLIRTY,
    situation: PhraseSituation.EARLY_DATING,
    tone: PhraseTone.PASSIONATE,
    tags: ['confession', 'kissing', 'all day']
  },
  {
    id: 'flirt5',
    text: "You're trouble, and I'm here for it.",
    category: PhraseCategory.FLIRTY,
    situation: PhraseSituation.EARLY_DATING,
    tone: PhraseTone.PLAYFUL,
    tags: ['trouble', 'here for it', 'playful']
  },