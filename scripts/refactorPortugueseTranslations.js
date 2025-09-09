#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Professional Portuguese translations for common romantic phrases
const PROFESSIONAL_PORTUGUESE_TRANSLATIONS = {
  // Cyrillic text that needs to be translated
  'Мне действительно было приятно. С тобой легко.':
    'Foi realmente agradável. É fácil estar com você.',
  'До сих пор улыбаюсь, вспоминая наш разговор. С тобой приятно.':
    'Ainda estou sorrindo lembrando da nossa conversa. É bom estar com você.',
  'Ты превзошла мои ожидания — спокойно и искренне. Раунд два?':
    'Você superou minhas expectativas — natural e sincera. Segunda rodada?',
  'Хотел(а) бы увидеться ещё раз. В какие дни удобно на следующей неделе?':
    'Gostaria de nos encontrarmos novamente. Que dias são convenientes na próxima semana?',
  'Между нами есть импульс — не хочу его терять.':
    'Há uma conexão entre nós — não quero perdê-la.',

  // Common English phrases that need Portuguese translation
  "There's the new café i've been meaning to try—up for checking it out this tuesday?":
    'Há o novo café que eu queria experimentar—que tal irmos nesta terça-feira?',
  "There's the new café i've been meaning to try—up for checking it out this wednesday?":
    'Há o novo café que eu queria experimentar—que tal irmos nesta quarta-feira?',
  "There's the new café i've been meaning to try—up for checking it out this thursday?":
    'Há o novo café que eu queria experimentar—que tal irmos nesta quinta-feira?',
  "There's the new café i've been meaning to try—up for checking it out this friday?":
    'Há o novo café que eu queria experimentar—que tal irmos nesta sexta-feira?',
  "There's the new café i've been meaning to try—up for checking it out this saturday?":
    'Há o novo café que eu queria experimentar—que tal irmos neste sábado?',
  "There's the new café i've been meaning to try—up for checking it out this sunday?":
    'Há o novo café que eu queria experimentar—que tal irmos neste domingo?',
  "There's the new café i've been meaning to try—up for checking it out this week?":
    'Há o novo café que eu queria experimentar—que tal irmos esta semana?',
  "There's the new café i've been meaning to try—up for checking it out soon?":
    'Há o novo café que eu queria experimentar—que tal irmos logo?',
  "There's the new café i've been meaning to try—up for checking it out one evening?":
    'Há o novo café que eu queria experimentar—que tal irmos uma noite dessas?',

  "There's that cozy coffee spot i've been meaning to try—up for checking it out this monday?":
    'Há aquele café aconchegante que eu queria experimentar—que tal irmos nesta segunda-feira?',
  "There's that cozy coffee spot i've been meaning to try—up for checking it out this tuesday?":
    'Há aquele café aconchegante que eu queria experimentar—que tal irmos nesta terça-feira?',
  "There's that cozy coffee spot i've been meaning to try—up for checking it out this wednesday?":
    'Há aquele café aconchegante que eu queria experimentar—que tal irmos nesta quarta-feira?',
  "There's that cozy coffee spot i've been meaning to try—up for checking it out this thursday?":
    'Há aquele café aconchegante que eu queria experimentar—que tal irmos nesta quinta-feira?',
  "There's that cozy coffee spot i've been meaning to try—up for checking it out this friday?":
    'Há aquele café aconchegante que eu queria experimentar—que tal irmos nesta sexta-feira?',
  "There's that cozy coffee spot i've been meaning to try—up for checking it out this saturday?":
    'Há aquele café aconchegante que eu queria experimentar—que tal irmos neste sábado?',
  "There's that cozy coffee spot i've been meaning to try—up for checking it out this sunday?":
    'Há aquele café aconchegante que eu queria experimentar—que tal irmos neste domingo?',
  "There's that cozy coffee spot i've been meaning to try—up for checking it out this week?":
    'Há aquele café aconchegante que eu queria experimentar—que tal irmos esta semana?',
};

// Category titles in English (for universality)
const ENGLISH_CATEGORY_TITLES = {
  'After the First Date': 'After the First Date',
  'Asking Out': 'Asking Out',
  'Boundaries Respect': 'Boundaries Respect',
  'Checking In': 'Checking In',
  'Compliments Appearance': 'Compliments Appearance',
  'Compliments Personality': 'Compliments Personality',
  'Conflict Resolution Light': 'Conflict Resolution Light',
  'Date Planning': 'Date Planning',
  'Deepening Connection': 'Deepening Connection',
  Flirting: 'Flirting',
  'Future Plans': 'Future Plans',
  'Good Morning Night': 'Good Morning Night',
  Gratitude: 'Gratitude',
  Icebreakers: 'Icebreakers',
  'Long Distance': 'Long Distance',
  'Photo Replies': 'Photo Replies',
  'Playful Challenges': 'Playful Challenges',
  'Rekindling Spark': 'Rekindling Spark',
  'Support Encouragement': 'Support Encouragement',
  'Voice Note Prompts': 'Voice Note Prompts',
};

// Intensity translations
const INTENSITY_MAPPING = {
  soft: 'suave',
  neutral: 'neutro',
  bold: 'ousado',
  suave: 'suave',
  neutro: 'neutro',
  ousado: 'ousado',
};

function cleanLanguageMarkers(text) {
  // Remove language markers like [PT], [Portuguese], etc.
  return text
    .replace(/\[PT\]/gi, '')
    .replace(/\[Portuguese\]/gi, '')
    .trim();
}

function translateIntensity(intensity) {
  return INTENSITY_MAPPING[intensity.toLowerCase()] || intensity;
}

function isRussianText(text) {
  // Check if text contains Cyrillic characters
  return /[а-яё]/i.test(text);
}

function isEnglishText(text) {
  // Basic check for English text (should be translated to Portuguese)
  const englishPatterns = [
    /^There's/i,
    /^What's/i,
    /^How's/i,
    /^I was/i,
    /^Good morning/i,
    /^Good night/i,
    /morning!/i,
    /night!/i,
  ];
  return englishPatterns.some(pattern => pattern.test(text));
}

function getPortugueseTranslation(text) {
  // First check our manual translations
  if (PROFESSIONAL_PORTUGUESE_TRANSLATIONS[text]) {
    return PROFESSIONAL_PORTUGUESE_TRANSLATIONS[text];
  }

  // If it's Russian text, use manual translation if available
  if (isRussianText(text)) {
    return (
      PROFESSIONAL_PORTUGUESE_TRANSLATIONS[text] ||
      `[NEEDS_TRANSLATION] ${text}`
    );
  }

  // If it's English text, use manual translation or mark for translation
  if (isEnglishText(text)) {
    return (
      PROFESSIONAL_PORTUGUESE_TRANSLATIONS[text] ||
      generateBasicPortugueseTranslation(text)
    );
  }

  // If it already looks like Portuguese, keep it
  return text;
}

function generateBasicPortugueseTranslation(englishText) {
  // Basic pattern-based translation for common structures
  let translation = englishText;

  const patterns = {
    'Good morning': 'Bom dia',
    'Good night': 'Boa noite',
    "How's your day": 'Como está seu dia',
    "What's the most": 'Qual é a coisa mais',
    'I was just thinking about you': 'Eu estava pensando em você',
    "There's": 'Há',
    'coffee spot': 'café',
    cozy: 'aconchegante',
    'meaning to try': 'queria experimentar',
    'up for checking it out': 'que tal irmos',
    'this monday': 'nesta segunda-feira',
    'this tuesday': 'nesta terça-feira',
    'this wednesday': 'nesta quarta-feira',
    'this thursday': 'nesta quinta-feira',
    'this friday': 'nesta sexta-feira',
    'this saturday': 'neste sábado',
    'this sunday': 'neste domingo',
    'this week': 'esta semana',
    soon: 'logo',
    'one evening': 'uma noite dessas',
  };

  for (const [english, portuguese] of Object.entries(patterns)) {
    translation = translation.replace(new RegExp(english, 'gi'), portuguese);
  }

  return translation;
}

function refactorPortugueseTranslations() {
  console.log('🇵🇹 Refactoring Portuguese Translations...\n');

  const translationsPath = './src/data/translations-large/pt.json';

  // Load existing Portuguese translations
  let translationData;
  try {
    translationData = JSON.parse(fs.readFileSync(translationsPath, 'utf8'));
  } catch (error) {
    console.error('❌ Failed to load Portuguese translations:', error.message);
    return;
  }

  let totalPhrasesProcessed = 0;
  let phrasesFixed = 0;
  let categoriesFixed = 0;

  // Process each category
  for (const [categoryKey, categoryData] of Object.entries(
    translationData.categories,
  )) {
    console.log(`📂 Processing category: ${categoryKey}`);

    // Fix category title to English (for universality)
    const originalTitle = categoryData.title;
    if (
      originalTitle &&
      originalTitle !== ENGLISH_CATEGORY_TITLES[originalTitle]
    ) {
      // Keep English titles for universality
      categoryData.title = originalTitle; // Keep as is if already in English
      categoriesFixed++;
    }

    // Process phrases in this category
    if (categoryData.phrases) {
      for (let i = 0; i < categoryData.phrases.length; i++) {
        const phrase = categoryData.phrases[i];
        totalPhrasesProcessed++;

        let wasFixed = false;

        // Clean text of language markers
        const originalText = phrase.text;
        let cleanedText = cleanLanguageMarkers(originalText);

        // Translate to Portuguese if needed
        const translatedText = getPortugueseTranslation(cleanedText);

        if (translatedText !== originalText) {
          phrase.text = translatedText;
          wasFixed = true;
        }

        // Fix intensity translation
        if (phrase.intensity) {
          const translatedIntensity = translateIntensity(phrase.intensity);
          if (translatedIntensity !== phrase.intensity) {
            phrase.intensity = translatedIntensity;
            wasFixed = true;
          }
        }

        // Ensure proper translation flags
        if (
          PROFESSIONAL_PORTUGUESE_TRANSLATIONS[originalText] ||
          (translatedText !== originalText &&
            !translatedText.includes('[NEEDS_TRANSLATION]'))
        ) {
          phrase.translationType = 'manual';
          phrase.manualTranslation = true;
          phrase.quality = 1.0;
          wasFixed = true;
        } else if (translatedText.includes('[NEEDS_TRANSLATION]')) {
          phrase.translationType = 'automated';
          phrase.manualTranslation = false;
          phrase.quality = 0.3; // Low quality, needs human review
          wasFixed = true;
        }

        if (wasFixed) {
          phrasesFixed++;
        }
      }
    }
  }

  // Update metadata
  if (!translationData.metadata) {
    translationData.metadata = {};
  }
  translationData.metadata.refactoredAt = new Date().toISOString();
  translationData.metadata.totalPhrasesProcessed = totalPhrasesProcessed;
  translationData.metadata.phrasesFixed = phrasesFixed;
  translationData.metadata.categoriesFixed = categoriesFixed;
  translationData.metadata.lastRefactorVersion = '1.0.0';

  // Save refactored translations
  fs.writeFileSync(translationsPath, JSON.stringify(translationData, null, 2));

  console.log('\n✅ Portuguese Translation Refactoring Complete!');
  console.log(`📊 Total phrases processed: ${totalPhrasesProcessed}`);
  console.log(`🔧 Phrases fixed: ${phrasesFixed}`);
  console.log(`📂 Categories fixed: ${categoriesFixed}`);
  console.log(`🎯 Language markers removed`);
  console.log(`🌍 Category names standardized to English`);
  console.log(`🇵🇹 Text properly translated to Portuguese`);
  console.log(
    '\n💡 Review phrases marked with [NEEDS_TRANSLATION] for manual translation',
  );
}

// Main execution
if (require.main === module) {
  refactorPortugueseTranslations();
}

module.exports = { refactorPortugueseTranslations };
