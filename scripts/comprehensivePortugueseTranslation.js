#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Comprehensive Portuguese translations
const COMPREHENSIVE_PORTUGUESE_TRANSLATIONS = {
  // Manual translations from the existing manual translations file
  'Your limits are my roadmap.': 'Seus limites são meu mapa.',
  "Lean on me—I'm here for you.": 'Apoie-se em mim—estou aqui para você.',
  "I own my tone. I'll do better.": 'Assumo meu tom. Farei melhor.',
  'Consent and comfort first—always.':
    'Consentimento e conforto primeiro—sempre.',
  'You + me + tea. Bold pitch, but right.':
    'Você + eu + chá. Abordagem ousada, mas certa.',
  'That look belongs on our next date. When?':
    'Esse olhar merece nosso próximo encontro. Quando?',
  "I'm ready to show up differently—are you?":
    'Estou pronto para aparecer diferente—e você?',
  "I'm booking a trip. I want real hugs soon.":
    'Estou reservando uma viagem. Quero abraços de verdade em breve.',
  'I want the in-person version of that photo.':
    'Quero a versão pessoal dessa foto.',
  'I want a second date. Clear and simple. When?':
    'Quero um segundo encontro. Claro e simples. Quando?',
  'I want more people like you—kind and present.':
    'Quero mais pessoas como você—gentis e presentes.',
  'Good night. Miss you a little extra tonight.':
    'Boa noite. Sinto sua falta um pouco mais esta noite.',
  'Good morning. Miss you a little extra today.':
    'Bom dia. Sinto sua falta um pouco mais hoje.',
  'I want the in-person version of that post.':
    'Quero a versão pessoal desse post.',

  // Common phrases and patterns
  'Good morning': 'Bom dia',
  'Good night': 'Boa noite',
  'Sweet dreams': 'Bons sonhos',
  'How are you': 'Como você está',
  'How was your day': 'Como foi seu dia',
  'I was thinking about you': 'Eu estava pensando em você',
  'I miss you': 'Sinto sua falta',
  'You look beautiful': 'Você está linda',
  'You are amazing': 'Você é incrível',
  'I love your smile': 'Amo seu sorriso',

  // Café/coffee related phrases
  "There's the new café i've been meaning to try—up for checking it out this monday?":
    'Há o novo café que eu queria experimentar—que tal irmos nesta segunda-feira?',
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
  "There's that cozy coffee spot i've been meaning to try—up for checking it out soon?":
    'Há aquele café aconchegante que eu queria experimentar—que tal irmos logo?',
  "There's that cozy coffee spot i've been meaning to try—up for checking it out one evening?":
    'Há aquele café aconchegante que eu queria experimentar—que tal irmos uma noite dessas?',
};

// Regex patterns for common English structures
const TRANSLATION_PATTERNS = [
  {
    pattern: /^Good morning[.!]?\s*/i,
    replacement: 'Bom dia',
  },
  {
    pattern: /^Good night[.!]?\s*/i,
    replacement: 'Boa noite',
  },
  {
    pattern: /I was (just )?thinking about you/i,
    replacement: 'Eu estava pensando em você',
  },
  {
    pattern: /How['']?s your day/i,
    replacement: 'Como está seu dia',
  },
  {
    pattern: /What['']?s the most/i,
    replacement: 'Qual é a coisa mais',
  },
  {
    pattern: /You look (amazing|beautiful|stunning)/i,
    replacement: (match, adjective) => {
      const adjectives = {
        amazing: 'incrível',
        beautiful: 'linda',
        stunning: 'deslumbrante',
      };
      return `Você está ${adjectives[adjective.toLowerCase()] || 'linda'}`;
    },
  },
  {
    pattern: /You are (amazing|beautiful|wonderful|incredible)/i,
    replacement: (match, adjective) => {
      const adjectives = {
        amazing: 'incrível',
        beautiful: 'linda',
        wonderful: 'maravilhosa',
        incredible: 'incrível',
      };
      return `Você é ${adjectives[adjective.toLowerCase()] || 'incrível'}`;
    },
  },
];

function translateToPortuguese(text) {
  // Remove language markers first
  let cleanText = text
    .replace(/\[PT\]/gi, '')
    .replace(/\[Portuguese\]/gi, '')
    .trim();

  // Check exact matches first
  if (COMPREHENSIVE_PORTUGUESE_TRANSLATIONS[cleanText]) {
    return COMPREHENSIVE_PORTUGUESE_TRANSLATIONS[cleanText];
  }

  // Check pattern-based translations
  for (const { pattern, replacement } of TRANSLATION_PATTERNS) {
    if (pattern.test(cleanText)) {
      if (typeof replacement === 'function') {
        cleanText = cleanText.replace(pattern, replacement);
      } else {
        cleanText = cleanText.replace(pattern, replacement);
      }
      return cleanText;
    }
  }

  // If no translation found and it's clearly English, return as-is for now
  // (these would need manual translation)
  return cleanText;
}

function isEnglishPhrase(text) {
  // More comprehensive English detection
  const englishIndicators = [
    /^There['']?s/i,
    /^What['']?s/i,
    /^How['']?s/i,
    /^I ['']?m/i,
    /^I was/i,
    /^Good morning/i,
    /^Good night/i,
    /^You are/i,
    /^You look/i,
    /^That['']?s/i,
    /i['']?ve been/i,
    /up for checking/i,
    /meaning to try/i,
    /this (monday|tuesday|wednesday|thursday|friday|saturday|sunday|week)/i,
  ];

  return englishIndicators.some(pattern => pattern.test(text));
}

function isRussianText(text) {
  return /[а-яё]/i.test(text);
}

function processPortugueseTranslations() {
  console.log('🇵🇹 Processing Portuguese Translations Comprehensively...\n');

  const translationsPath = './src/data/translations-large/pt.json';

  try {
    const translationData = JSON.parse(
      fs.readFileSync(translationsPath, 'utf8'),
    );

    let totalProcessed = 0;
    let englishTranslated = 0;
    let russianMarked = 0;
    let alreadyPortuguese = 0;

    for (const [categoryKey, categoryData] of Object.entries(
      translationData.categories,
    )) {
      console.log(`📂 Processing ${categoryKey}...`);

      if (categoryData.phrases) {
        for (let i = 0; i < categoryData.phrases.length; i++) {
          const phrase = categoryData.phrases[i];
          totalProcessed++;

          const originalText = phrase.text;

          // Skip if already marked as needing translation
          if (originalText.includes('[NEEDS_TRANSLATION]')) {
            continue;
          }

          if (isRussianText(originalText)) {
            // Mark Russian text for manual translation
            phrase.text = `[NEEDS_TRANSLATION] ${originalText}`;
            phrase.translationType = 'automated';
            phrase.manualTranslation = false;
            phrase.quality = 0.3;
            russianMarked++;
          } else if (isEnglishPhrase(originalText)) {
            // Try to translate English phrases
            const translated = translateToPortuguese(originalText);
            if (
              translated !== originalText &&
              COMPREHENSIVE_PORTUGUESE_TRANSLATIONS[originalText]
            ) {
              phrase.text = translated;
              phrase.translationType = 'manual';
              phrase.manualTranslation = true;
              phrase.quality = 1.0;
              englishTranslated++;
            } else {
              // Keep English for now, but mark as needing translation
              phrase.translationType = 'automated';
              phrase.manualTranslation = false;
              if (!phrase.quality) phrase.quality = 0.7;
            }
          } else {
            // Assume it's already Portuguese
            alreadyPortuguese++;
          }

          // Ensure intensity is in Portuguese
          if (phrase.intensity) {
            const intensityMap = {
              soft: 'suave',
              neutral: 'neutro',
              bold: 'ousado',
            };
            if (intensityMap[phrase.intensity]) {
              phrase.intensity = intensityMap[phrase.intensity];
            }
          }
        }
      }
    }

    // Update metadata
    translationData.metadata = {
      ...translationData.metadata,
      lastProcessed: new Date().toISOString(),
      totalProcessed,
      englishTranslated,
      russianMarked,
      alreadyPortuguese,
      processingVersion: '2.0.0',
    };

    // Save updated file
    fs.writeFileSync(
      translationsPath,
      JSON.stringify(translationData, null, 2),
    );

    console.log('\n✅ Portuguese Translation Processing Complete!');
    console.log(`📊 Total phrases processed: ${totalProcessed}`);
    console.log(`🇬🇧 English phrases translated: ${englishTranslated}`);
    console.log(`🇷🇺 Russian phrases marked for translation: ${russianMarked}`);
    console.log(`🇵🇹 Already Portuguese: ${alreadyPortuguese}`);
    console.log('\n💡 Next steps:');
    console.log(
      '   • Review and manually translate phrases marked with [NEEDS_TRANSLATION]',
    );
    console.log(
      '   • Add more comprehensive translations for remaining English phrases',
    );
  } catch (error) {
    console.error('❌ Error processing translations:', error.message);
  }
}

if (require.main === module) {
  processPortugueseTranslations();
}

module.exports = { processPortugueseTranslations };
