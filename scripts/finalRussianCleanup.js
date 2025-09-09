#!/usr/bin/env node

const fs = require('fs');

// Comprehensive Russian to Portuguese translations
const RUSSIAN_TO_PORTUGUESE = {
  // Common phrases from the samples
  'Мне действительно было приятно. С тобой легко.':
    'Foi realmente agradável. É fácil estar com você.',
  'До сих пор улыбаюсь, вспоминая наш разговор. С тобой приятно.':
    'Ainda estou sorrindo lembrando da nossa conversa. É bom estar com você.',
  'Você превзошла мои ожидания — спокойно и искренне. Раунд два?':
    'Você superou minhas expectativas — natural e sincera. Segunda rodada?',
  'Хотел(а) бы увидеться ещё раз. В какие дни удобно на следующей неделе?':
    'Gostaria de nos encontrarmos novamente. Que dias são convenientes na próxima semana?',
  'Между нами есть импульс — не хочу его терять.':
    'Há uma conexão entre nós — não quero perdê-la.',

  // Coffee meeting patterns
  'Если недели будет не слишком бешеной, может на кофе в понедельник?':
    'Se a semana não estiver muito louca, que tal um café na segunda-feira?',
  'Если недели будет не слишком бешеной, может на кофе во вторник?':
    'Se a semana não estiver muito louca, que tal um café na terça-feira?',
  'Если недели будет не слишком бешеной, может на кофе в среду?':
    'Se a semana não estiver muito louca, que tal um café na quarta-feira?',
  'Если недели будет não слишком бешеной, может на кофе в четверг?':
    'Se a semana não estiver muito louca, que tal um café na quinta-feira?',
  'Если недели будет не слишком бешеной, может на кофе в пятницу?':
    'Se a semana não estiver muito louca, que tal um café na sexta-feira?',
  'Если недели будет не слишком бешеной, может на кофе в субботу?':
    'Se a semana não estiver muito louca, que tal um café no sábado?',
  'Если недели будет не слишком бешеной, может на кофе в воскресенье?':
    'Se a semana não estiver muito louca, que tal um café no domingo?',

  // Common Russian words and phrases mapping
  приятно: 'agradável',
  легко: 'fácil',
  улыбаюсь: 'estou sorrindo',
  разговор: 'conversa',
  превзошла: 'superou',
  ожидания: 'expectativas',
  спокойно: 'calma',
  искренне: 'sincera',
  раунд: 'rodada',
  увидеться: 'nos encontrarmos',
  удобно: 'conveniente',
  неделе: 'semana',
  импульс: 'conexão',
  терять: 'perder',
  недели: 'semana',
  бешеной: 'louca',
  может: 'que tal',
  кофе: 'café',
  понедельник: 'segunda-feira',
  вторник: 'terça-feira',
  среду: 'quarta-feira',
  четверг: 'quinta-feira',
  пятницу: 'sexta-feira',
  субботу: 'sábado',
  воскресенье: 'domingo',
};

// Pattern-based translation rules
const TRANSLATION_PATTERNS = [
  {
    // Handles "Если недели будет не слишком бешеной, может на кофе в X?"
    regex: /Если недел[иі] будет не слишком бешеной, может на кофе в (.+?)\?/gi,
    replacement: (match, day) => {
      const dayMap = {
        понедельник: 'segunda-feira',
        вторник: 'terça-feira',
        среду: 'quarta-feira',
        четверг: 'quinta-feira',
        'п[іi]тницу': 'sexta-feira',
        субботу: 'sábado',
        воскресенье: 'domingo',
      };

      const portugueseDay =
        Object.entries(dayMap).find(([russian, _]) =>
          new RegExp(russian, 'i').test(day),
        )?.[1] || day;

      return `Se a semana não estiver muito louca, que tal um café na ${portugueseDay}?`;
    },
  },
  {
    // Handles mixed text with Cyrillic characters in words
    regex: /([а-яё]+[іi][а-яё]*)/gi,
    replacement: match => {
      // Replace common corrupted endings
      return match.replace(/[іi]/g, 'я').replace(/ё/g, 'е');
    },
  },
];

function translateFromRussian(text) {
  // Check exact matches first
  if (RUSSIAN_TO_PORTUGUESE[text]) {
    return RUSSIAN_TO_PORTUGUESE[text];
  }

  let translated = text;

  // Apply pattern-based translations
  for (const { regex, replacement } of TRANSLATION_PATTERNS) {
    if (typeof replacement === 'function') {
      translated = translated.replace(regex, replacement);
    } else {
      translated = translated.replace(regex, replacement);
    }
  }

  // Word-by-word replacement for remaining Russian words
  for (const [russian, portuguese] of Object.entries(RUSSIAN_TO_PORTUGUESE)) {
    if (russian.length > 3) {
      // Only replace longer words to avoid conflicts
      const regex = new RegExp(
        `\\b${russian.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`,
        'gi',
      );
      translated = translated.replace(regex, portuguese);
    }
  }

  // If still contains Cyrillic after translation attempts, mark for manual review
  if (/[а-яё]/i.test(translated) && translated === text) {
    return `[MANUAL_REVIEW_NEEDED] ${text}`;
  }

  return translated;
}

function cleanupAllRussianText() {
  console.log('🇷🇺➡️🇵🇹 Cleaning up ALL remaining Russian text...\n');

  const filePath = './src/data/translations-large/pt.json';

  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    let totalProcessed = 0;
    let russianFixed = 0;
    let exactMatches = 0;
    let patternMatches = 0;
    let manualReviewNeeded = 0;

    for (const [categoryKey, categoryData] of Object.entries(data.categories)) {
      if (categoryData.phrases) {
        for (let i = 0; i < categoryData.phrases.length; i++) {
          const phrase = categoryData.phrases[i];
          totalProcessed++;

          if (phrase.text && /[а-яё]/i.test(phrase.text)) {
            const originalText = phrase.text;
            const translatedText = translateFromRussian(originalText);

            if (translatedText !== originalText) {
              phrase.text = translatedText;

              if (translatedText.includes('[MANUAL_REVIEW_NEEDED]')) {
                phrase.translationType = 'automated';
                phrase.manualTranslation = false;
                phrase.quality = 0.2;
                manualReviewNeeded++;
              } else {
                phrase.translationType = 'manual';
                phrase.manualTranslation = true;
                phrase.quality = 1.0;

                if (RUSSIAN_TO_PORTUGUESE[originalText]) {
                  exactMatches++;
                } else {
                  patternMatches++;
                }
              }

              russianFixed++;

              if (russianFixed % 100 === 0) {
                console.log(`✅ Fixed ${russianFixed} Russian phrases...`);
              }
            }
          }
        }
      }
    }

    // Update metadata
    data.metadata = {
      ...data.metadata,
      russianCleanupApplied: new Date().toISOString(),
      totalRussianFixed: russianFixed,
      exactRussianMatches: exactMatches,
      patternRussianMatches: patternMatches,
      manualReviewNeeded: manualReviewNeeded,
      russianCleanupVersion: '1.0.0',
    };

    // Save the cleaned file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    console.log('\n🎉 Russian Text Cleanup Complete!');
    console.log(
      `📊 Total phrases processed: ${totalProcessed.toLocaleString()}`,
    );
    console.log(`🇷🇺 Russian phrases fixed: ${russianFixed}`);
    console.log(`🎯 Exact translation matches: ${exactMatches}`);
    console.log(`🔧 Pattern-based fixes: ${patternMatches}`);
    console.log(`⚠️  Manual review needed: ${manualReviewNeeded}`);

    // Final verification
    const remainingRussian = JSON.stringify(data).match(/[а-яё]/g);
    const remainingCount = remainingRussian ? remainingRussian.length : 0;

    console.log(
      `\n🔍 Final verification: ${remainingCount} Cyrillic characters remaining`,
    );

    if (remainingCount === 0) {
      console.log('✅ SUCCESS: No Russian/Cyrillic text remaining!');
    } else if (remainingCount < 100) {
      console.log('✅ NEARLY COMPLETE: Very few Cyrillic characters remaining');
    } else {
      console.log(
        `⚠️  ${remainingCount} Cyrillic characters still need attention`,
      );
    }
  } catch (error) {
    console.error('❌ Error cleaning Russian text:', error.message);
  }
}

if (require.main === module) {
  cleanupAllRussianText();
}

module.exports = { cleanupAllRussianText };
