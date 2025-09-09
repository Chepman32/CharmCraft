#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { MANUAL_TRANSLATIONS } = require('./manualTranslations');

const LANGUAGES = ['es', 'de', 'fr', 'pt', 'ja', 'zh', 'ko', 'ua', 'ru'];

function applyManualTranslations() {
  console.log('🎯 Applying Manual Translations to Large Dataset...\n');

  // Read the large dataset to get original phrases
  const largeData = JSON.parse(
    fs.readFileSync('./src/data/phrases-large.json', 'utf8'),
  );

  // Create a map of original text to IDs for quick lookup
  const textToIdMap = new Map();
  for (const [categoryKey, categoryData] of Object.entries(
    largeData.categories,
  )) {
    for (const phrase of categoryData.phrases) {
      textToIdMap.set(phrase.text, {
        id: phrase.id,
        category: categoryKey,
        intensity: phrase.intensity,
      });
    }
  }

  // Process each language
  for (const languageCode of LANGUAGES) {
    console.log(`🌐 Processing ${languageCode.toUpperCase()} translations...`);

    const translationsPath = `./src/data/translations-large/${languageCode}.json`;

    // Load existing translations
    let translationData;
    try {
      translationData = JSON.parse(fs.readFileSync(translationsPath, 'utf8'));
    } catch (error) {
      console.log(
        `   ⚠️  Translation file not found for ${languageCode}, skipping...`,
      );
      continue;
    }

    const manualTranslations = MANUAL_TRANSLATIONS[languageCode];
    let replacedCount = 0;

    // Apply manual translations
    for (const [categoryKey, categoryData] of Object.entries(
      translationData.categories,
    )) {
      if (categoryData.phrases) {
        for (let i = 0; i < categoryData.phrases.length; i++) {
          const phrase = categoryData.phrases[i];
          const originalPhrase = findOriginalPhraseById(
            textToIdMap,
            phrase.id,
            largeData,
          );

          if (originalPhrase && manualTranslations[originalPhrase.text]) {
            // Replace with manual translation
            categoryData.phrases[i] = {
              id: phrase.id,
              intensity: phrase.intensity,
              text: manualTranslations[originalPhrase.text],
              quality: 1.0, // Perfect quality for manual translations
              translationType: 'manual',
              manualTranslation: true,
            };
            replacedCount++;
          } else if (phrase.translationType !== 'manual') {
            // Mark automated translations
            categoryData.phrases[i].translationType = 'automated';
            categoryData.phrases[i].manualTranslation = false;
          }
        }
      }
    }

    // Update metadata
    if (!translationData.metadata) {
      translationData.metadata = {};
    }
    translationData.metadata.manualTranslationsApplied = replacedCount;
    translationData.metadata.totalManualTranslations =
      Object.keys(manualTranslations).length;
    translationData.metadata.updatedAt = new Date().toISOString();

    // Save updated translations
    fs.writeFileSync(
      translationsPath,
      JSON.stringify(translationData, null, 2),
    );

    console.log(`   ✅ Applied ${replacedCount} manual translations`);
    console.log(
      `   📊 Total manual translations available: ${
        Object.keys(manualTranslations).length
      }\n`,
    );
  }

  console.log('🎉 Manual translations applied successfully!');
  console.log(
    '💡 You can now see the quality difference between manual and automated translations.',
  );
}

function findOriginalPhraseById(textToIdMap, targetId, largeData) {
  for (const [categoryKey, categoryData] of Object.entries(
    largeData.categories,
  )) {
    const phrase = categoryData.phrases.find(p => p.id === targetId);
    if (phrase) {
      return phrase;
    }
  }
  return null;
}

function generateComparisonReport() {
  console.log('📊 Generating Translation Quality Comparison Report...\n');

  const report = {
    manualTranslations: {},
    comparison: {},
    recommendations: [],
    generatedAt: new Date().toISOString(),
  };

  // Sample phrases for comparison
  const samplePhrases = [
    'I want a second date. Clear and simple. When?',
    'Good night. Miss you a little extra tonight.',
    "Lean on me—I'm here for you.",
  ];

  for (const languageCode of LANGUAGES.slice(0, 3)) {
    // Sample first 3 languages
    console.log(`🔍 Analyzing ${languageCode.toUpperCase()} translations...`);

    const translationsPath = `./src/data/translations-large/${languageCode}.json`;
    const data = JSON.parse(fs.readFileSync(translationsPath, 'utf8'));

    report.manualTranslations[languageCode] = {};

    for (const samplePhrase of samplePhrases) {
      // Find manual translation
      const manualTranslation = findPhraseTranslation(
        data,
        samplePhrase,
        'manual',
      );
      const automatedTranslation = findPhraseTranslation(
        data,
        samplePhrase,
        'automated',
      );

      report.manualTranslations[languageCode][samplePhrase] = {
        manual: manualTranslation,
        automated: automatedTranslation,
      };
    }
  }

  report.comparison = {
    manualQuality: 'Authentic, natural, culturally appropriate',
    automatedQuality: 'Functional but may lack nuance and cultural context',
    recommendation:
      'Use manual translations for critical phrases, automated for bulk content',
  };

  report.recommendations = [
    'Prioritize manual translation for the most-used 500-1000 phrases',
    'Use professional translators with dating/romantic content experience',
    'Implement native speaker review process',
    'Consider cultural context and regional variations',
    'Maintain translation consistency across similar phrases',
  ];

  fs.writeFileSync(
    './translation-comparison-report.json',
    JSON.stringify(report, null, 2),
  );

  console.log(
    '✅ Comparison report generated: translation-comparison-report.json',
  );
}

function findPhraseTranslation(data, originalText, translationType) {
  for (const [categoryKey, categoryData] of Object.entries(data.categories)) {
    if (categoryData.phrases) {
      for (const phrase of categoryData.phrases) {
        if (
          phrase.translationType === translationType &&
          phrase.manualTranslation === (translationType === 'manual')
        ) {
          return phrase.text;
        }
      }
    }
  }
  return null;
}

// Main execution
async function main() {
  const command = process.argv[2];

  switch (command) {
    case 'apply':
      applyManualTranslations();
      break;
    case 'report':
      generateComparisonReport();
      break;
    case 'all':
      applyManualTranslations();
      generateComparisonReport();
      break;
    default:
      console.log('Usage:');
      console.log(
        '  node applyManualTranslations.js apply    # Apply manual translations',
      );
      console.log(
        '  node applyManualTranslations.js report   # Generate comparison report',
      );
      console.log('  node applyManualTranslations.js all      # Run all steps');
      console.log('');
      console.log('Example manual vs automated translation:');
      console.log(
        '  Manual (Spanish): "Quiero una segunda cita. Claro y simple. ¿Cuándo?"',
      );
      console.log(
        '  Automated: "Quiero una segunda fecha. Clara y simple. ¿Cuándo?"',
      );
      console.log(
        '  Quality difference: "cita" (date/appointment) vs "fecha" (calendar date)',
      );
  }
}

if (require.main === module) {
  main();
}
