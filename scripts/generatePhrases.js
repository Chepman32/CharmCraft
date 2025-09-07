const fs = require('fs');
const path = require('path');

// Base phrase templates for different categories
const phraseTemplates = {
  conversation_starter: [
    "I was just thinking about {subject} and couldn't help but {emotion}. How's your {time_period} going?",
    "What's the most {adjective} thing that happened to you {time_period}?",
    'I saw something {time_period} that reminded me of you and made me {emotion}.',
    'How was your {time_period}? I hope it started as {adjective} as you are.',
    "I have a {adjective} question for you - what's your favorite way to {activity}?",
    'Tell me about the {superlative} part of your {time_period} so far.',
    'I was {activity} and it made me think of you. Want to {action}?',
    "What's something you're {emotion} to this {time_period}?",
    "I hope you're having an {adjective} {time_period}, because you deserve {phrase}.",
    'Quick question: {choice1} or {choice2}? And what does your choice say about you?',
  ],
  compliment: [
    'You have this {adjective} way of making everything {emotion} just by being yourself.',
    'Your {feature} is absolutely {adjective} - it {action} my entire {time_period}.',
    'I love how {adjective} you get when you talk about things you {emotion} about.',
    'You have such a {adjective} {feature} - the way you {action} fascinates me.',
    'Your {feature} is my favorite {noun} in the world.',
    'You make even the {adjective} moments feel {adjective2}.',
    'I admire your {quality} and how you {action} with such {quality2}.',
    'You have this {adjective} ability to make everyone around you feel {emotion}.',
    'Your {quality} is one of the most {adjective} things about you.',
    'I love how you {action} in everything and everyone.',
  ],
  flirty: [
    "I can't {action} on anything {time_period} because I keep thinking about you.",
    'Is it just me, or do we have {adjective} {noun}?',
    "You're {adjective} {adjective2}, and I'm not complaining.",
    "I have a confession: I've been thinking about {action} you all {time_period}.",
    "You're {noun}, and I'm here for it.",
    "I'm trying to {action}, but you keep {action2} my mind.",
    "You have this {adjective} effect on me that I can't {action}.",
    "I think you're {adjective}, and I'm not afraid to say it.",
    'Every time you {action}, I {emotion} a little more.',
    "You're making it very hard to {action} right now.",
  ],
  romantic: [
    'Every moment with you feels like a {adjective} {noun} I never want to {action} from.',
    "You're not just my {relationship}, you're my {relationship2} and the {phrase} of my life.",
    'I love you more than {comparison} and {comparison2} combined.',
    'You make my {noun} {action} in ways I never thought possible.',
    'Being with you feels like {comparison} - {adjective} and {adjective2}.',
    "You're my {noun}, my {noun2}, and my {noun3} all in one.",
    'I never believed in {concept} until I met you.',
    "You're the {noun} to my {noun2}, the {noun3} to my {noun4}.",
    'Every {time_period} with you is a {noun} I want to {action} forever.',
    "You complete me in ways I didn't know I was {adjective}.",
  ],
  supportive: [
    "I believe in you {adverb}. You've got this, and I'm here for you {phrase}.",
    "You're {adjective} than you know, and I'm so {emotion} to be by your side.",
    "Whatever you're {action} right now, remember that you're {adjective} and {adjective2}.",
    'I have complete {noun} in your ability to {action} this.',
    "You've {action} so much already, and I know you'll {action2} this too.",
    'Your {quality} inspires me every {time_period}.',
    "I'm so {emotion} of how you {action} challenges.",
    'You have the {quality} to {action} anything you set your mind to.',
    "I'll be here to {action} you through whatever comes next.",
    'Your {quality} is one of the things I {emotion} most about you.',
  ],
  funny: [
    'I was {adjective} before I met you. Now look at me - completely {adjective2} and loving every second of it!',
    'Warning: Thinking about you may cause excessive {action} and random {action2}.',
    "I think you broke my {noun} - it won't stop {action} when I see you.",
    "You're like {comparison} - {adjective}, {adjective2}, and impossible to resist.",
    "I'm pretty sure you're {adjective}, and I have {noun} to prove it.",
    'You must be {profession} because you just {action} my {noun}.',
    'I was having a {adjective} day until you {action} and made it {adjective2}.',
    "You're so {adjective} that even my {noun} is {action}.",
    "I think I need {noun} because you're making me {adjective}.",
    "You're like {comparison} - everyone wants you, but I got lucky.",
  ],
};

// Word banks for template substitution
const wordBanks = {
  subject: [
    'you',
    'us',
    'our conversation',
    'our time together',
    'your message',
  ],
  emotion: [
    'smile',
    'laugh',
    'feel happy',
    'feel warm',
    'feel excited',
    'feel grateful',
  ],
  time_period: ['day', 'morning', 'evening', 'week', 'weekend'],
  adjective: [
    'amazing',
    'wonderful',
    'beautiful',
    'incredible',
    'fantastic',
    'lovely',
    'perfect',
    'special',
    'extraordinary',
    'remarkable',
  ],
  activity: [
    'spend a lazy Sunday',
    'relax',
    'unwind',
    'have fun',
    'explore new places',
  ],
  superlative: [
    'best',
    'most exciting',
    'most memorable',
    'most beautiful',
    'most interesting',
  ],
  action: ['lights up', 'brightens', 'makes better', 'improves', 'enhances'],
  phrase: [
    'nothing less',
    'the world',
    'all the happiness',
    'everything beautiful',
  ],
  choice1: ['coffee', 'mountains', 'sunrise', 'books', 'movies'],
  choice2: ['tea', 'beach', 'sunset', 'music', 'shows'],
  feature: ['smile', 'eyes', 'laugh', 'voice', 'mind', 'heart'],
  quality: [
    'strength',
    'kindness',
    'wisdom',
    'courage',
    'compassion',
    'intelligence',
  ],
  quality2: ['grace', 'elegance', 'poise', 'dignity', 'confidence'],
  noun: ['sound', 'sight', 'feeling', 'experience', 'moment'],
  adjective2: [
    'extraordinary',
    'magical',
    'special',
    'unforgettable',
    'precious',
  ],
  relationship: ['partner', 'love', 'companion', 'soulmate'],
  relationship2: ['best friend', 'confidant', 'other half', 'everything'],
  comparison: ['stars', 'ocean', 'mountains', 'sunshine', 'music'],
  concept: ['soulmates', 'true love', 'perfect matches', 'fairy tales'],
  adverb: ['completely', 'absolutely', 'totally', 'entirely', 'wholeheartedly'],
  profession: ['magician', 'artist', 'poet', 'angel', 'dream'],
};

// Generate phrases by substituting templates
function generatePhrase(template, category, situation, tone) {
  let phrase = template;

  // Replace all placeholders with random words from word banks
  const placeholders = phrase.match(/{([^}]+)}/g);
  if (placeholders) {
    placeholders.forEach(placeholder => {
      const key = placeholder.slice(1, -1); // Remove { and }
      if (wordBanks[key]) {
        const randomWord =
          wordBanks[key][Math.floor(Math.random() * wordBanks[key].length)];
        phrase = phrase.replace(placeholder, randomWord);
      }
    });
  }

  return phrase;
}

// Generate thousands of phrases
function generateLargePhraseDatabase() {
  const phrases = [];
  let id = 1;

  const categories = Object.keys(phraseTemplates);
  const situations = [
    'first_message',
    'early_dating',
    'established_relationship',
    'long_distance',
    'after_argument',
    'special_occasion',
    'daily_chat',
    'missing_them',
  ];
  const tones = [
    'sweet',
    'playful',
    'sincere',
    'confident',
    'gentle',
    'passionate',
    'humorous',
    'caring',
  ];

  // Generate 20,000 phrases for optimized size
  for (let i = 0; i < 20000; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const templates = phraseTemplates[category];
    const template = templates[Math.floor(Math.random() * templates.length)];
    const situation = situations[Math.floor(Math.random() * situations.length)];
    const tone = tones[Math.floor(Math.random() * tones.length)];

    const phraseText = generatePhrase(template, category, situation, tone);

    // Generate relevant tags
    const tags = [];
    const words = phraseText.toLowerCase().split(' ');
    const importantWords = words.filter(
      word =>
        word.length > 4 &&
        ![
          'that',
          'with',
          'have',
          'this',
          'your',
          'they',
          'were',
          'been',
          'their',
          'said',
          'each',
          'which',
          'them',
          'than',
          'many',
          'some',
          'what',
          'would',
          'make',
          'like',
          'into',
          'time',
          'very',
          'when',
          'come',
          'here',
          'just',
          'know',
          'take',
          'people',
          'year',
          'good',
          'work',
          'well',
          'way',
          'down',
          'only',
          'new',
          'find',
          'also',
          'after',
          'back',
          'other',
          'first',
          'where',
          'much',
          'through',
          'think',
          'before',
          'move',
          'right',
          'boy',
          'old',
          'too',
          'same',
          'tell',
          'does',
          'set',
          'three',
          'want',
          'air',
          'well',
          'also',
          'play',
          'small',
          'end',
          'put',
          'home',
          'read',
          'hand',
          'port',
          'large',
          'spell',
          'add',
          'even',
          'land',
          'here',
          'must',
          'big',
          'high',
          'such',
          'follow',
          'act',
          'why',
          'ask',
          'men',
          'change',
          'went',
          'light',
          'kind',
          'off',
          'need',
          'house',
          'picture',
          'try',
          'us',
          'again',
          'animal',
          'point',
          'mother',
          'world',
          'near',
          'build',
          'self',
          'earth',
          'father',
        ].includes(word),
    );

    // Add up to 3 random important words as tags
    for (let j = 0; j < Math.min(3, importantWords.length); j++) {
      const randomWord =
        importantWords[Math.floor(Math.random() * importantWords.length)];
      if (!tags.includes(randomWord)) {
        tags.push(randomWord);
      }
    }

    phrases.push({
      id: `generated_${id}`,
      text: phraseText,
      category: category,
      situation: situation,
      tone: tone,
      tags: tags,
    });

    id++;
  }

  return phrases;
}

// Generate the database
console.log('Generating large phrase database...');
const generatedPhrases = generateLargePhraseDatabase();

// Create the TypeScript file
const tsContent = `import { Phrase, PhraseCategory, PhraseSituation, PhraseTone } from './phrases';

// Auto-generated large phrase database
// This contains ${
  generatedPhrases.length
} phrases for comprehensive relationship advice
export const LARGE_PHRASE_DATABASE: Phrase[] = ${JSON.stringify(
  generatedPhrases,
  null,
  2,
)};
`;

// Write to file
const outputPath = path.join(
  __dirname,
  '..',
  'src',
  'data',
  'largePhraseDatabase.ts',
);
fs.writeFileSync(outputPath, tsContent);

console.log(`Generated ${generatedPhrases.length} phrases`);
console.log(
  `File size: ${(fs.statSync(outputPath).size / 1024 / 1024).toFixed(2)} MB`,
);
console.log(`Saved to: ${outputPath}`);
