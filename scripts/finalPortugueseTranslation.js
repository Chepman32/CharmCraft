#!/usr/bin/env node

const fs = require('fs');

// Complete manual translation script for Portuguese
function finalizePortugueseTranslations() {
  console.log('🇵🇹 Finalizing Portuguese Translations...\n');

  const translationsPath = './src/data/translations-large/pt.json';

  try {
    const data = JSON.parse(fs.readFileSync(translationsPath, 'utf8'));

    let totalTranslated = 0;
    let manualTranslationsApplied = 0;

    // Process each category and phrase
    for (const [categoryKey, categoryData] of Object.entries(data.categories)) {
      console.log(`📂 Processing ${categoryKey}...`);

      if (categoryData.phrases) {
        for (let i = 0; i < categoryData.phrases.length; i++) {
          const phrase = categoryData.phrases[i];
          const originalText = phrase.text;

          // Skip if already marked as needing translation
          if (originalText.includes('[NEEDS_TRANSLATION]')) {
            continue;
          }

          // Apply translations for specific patterns
          let translated = translateSpecificPatterns(originalText);

          if (translated !== originalText) {
            phrase.text = translated;
            phrase.translationType = 'manual';
            phrase.manualTranslation = true;
            phrase.quality = 1.0;
            manualTranslationsApplied++;
            totalTranslated++;
          }

          // Ensure intensity is translated
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
    data.metadata = {
      ...data.metadata,
      finalizedAt: new Date().toISOString(),
      totalTranslated,
      manualTranslationsApplied,
      finalizationVersion: '3.0.0',
    };

    fs.writeFileSync(translationsPath, JSON.stringify(data, null, 2));

    console.log('\n✅ Portuguese Translation Finalization Complete!');
    console.log(`📊 Total phrases translated: ${totalTranslated}`);
    console.log(`🎯 Manual translations applied: ${manualTranslationsApplied}`);
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

function translateSpecificPatterns(text) {
  // Comprehensive translation patterns
  const translations = {
    // Day-specific café invitations
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

    // Cozy coffee spot variations
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

    // Riverside park variations
    "There's the riverside park i've been meaning to try—up for checking it out this tuesday?":
      'Há o parque ribeirinho que eu queria conhecer—que tal irmos nesta terça-feira?',
    "There's the riverside park i've been meaning to try—up for checking it out this wednesday?":
      'Há o parque ribeirinho que eu queria conhecer—que tal irmos nesta quarta-feira?',
    "There's the riverside park i've been meaning to try—up for checking it out this thursday?":
      'Há o parque ribeirinho que eu queria conhecer—que tal irmos nesta quinta-feira?',
    "There's the riverside park i've been meaning to try—up for checking it out this friday?":
      'Há o parque ribeirinho que eu queria conhecer—que tal irmos nesta sexta-feira?',
    "There's the riverside park i've been meaning to try—up for checking it out this saturday?":
      'Há o parque ribeirinho que eu queria conhecer—que tal irmos neste sábado?',
    "There's the riverside park i've been meaning to try—up for checking it out this sunday?":
      'Há o parque ribeirinho que eu queria conhecer—que tal irmos neste domingo?',
    "There's the riverside park i've been meaning to try—up for checking it out this week?":
      'Há o parque ribeirinho que eu queria conhecer—que tal irmos esta semana?',
    "There's the riverside park i've been meaning to try—up for checking it out soon?":
      'Há o parque ribeirinho que eu queria conhecer—que tal irmos logo?',
    "There's the riverside park i've been meaning to try—up for checking it out one evening?":
      'Há o parque ribeirinho que eu queria conhecer—que tal irmos uma noite dessas?',
  };

  // Check for exact matches first
  if (translations[text]) {
    return translations[text];
  }

  // Pattern-based replacements for other common structures
  let result = text;

  // General patterns
  const patterns = [
    {
      regex:
        /There's (the|that) (.+?) i've been meaning to try—up for checking it out (this monday|this tuesday|this wednesday|this thursday|this friday|this saturday|this sunday|this week|soon|one evening)\?/i,
      replacement: (match, article, place, timeExpression) => {
        const articleMap = { the: 'o', that: 'aquele' };
        const timeMap = {
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

        const portugueseArticle = articleMap[article.toLowerCase()] || 'o';
        const portugueseTime =
          timeMap[timeExpression.toLowerCase()] || timeExpression;

        return `Há ${portugueseArticle} ${place} que eu queria experimentar—que tal irmos ${portugueseTime}?`;
      },
    },
  ];

  for (const { regex, replacement } of patterns) {
    if (regex.test(result)) {
      result = result.replace(regex, replacement);
      break;
    }
  }

  return result;
}

if (require.main === module) {
  finalizePortugueseTranslations();
}

module.exports = { finalizePortugueseTranslations };
