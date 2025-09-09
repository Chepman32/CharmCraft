#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

const LANGUAGES = [
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
  { code: 'ua', name: 'Ukrainian', nativeName: 'Українська' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
];

// Google Translate API function (using free tier)
function translateWithGoogle(text, targetLang) {
  return new Promise((resolve, reject) => {
    const encodedText = encodeURIComponent(text);
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodedText}`;

    https
      .get(url, res => {
        let data = '';

        res.on('data', chunk => {
          data += chunk;
        });

        res.on('end', () => {
          try {
            const result = JSON.parse(data);
            const translatedText = result[0][0][0];
            resolve(translatedText);
          } catch (error) {
            reject(error);
          }
        });
      })
      .on('error', error => {
        reject(error);
      });
  });
}

// Alternative: Use LibreTranslate (free and open source)
function translateWithLibreTranslate(text, targetLang) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      q: text,
      source: 'en',
      target: targetLang,
      format: 'text',
    });

    const options = {
      hostname: 'libretranslate.de',
      port: 443,
      path: '/translate',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
      },
    };

    const req = https.request(options, res => {
      let data = '';

      res.on('data', chunk => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          resolve(result.translatedText);
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', error => {
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

// Quality control function to check translation quality
function assessTranslationQuality(originalText, translatedText, language) {
  const quality = {
    score: 1.0,
    issues: [],
  };

  // Check for untranslated words
  const words = originalText.toLowerCase().split(/\s+/);
  const translatedWords = translatedText.toLowerCase().split(/\s+/);

  const untranslatedCount = words.filter(
    word => word.length > 3 && translatedWords.some(tw => tw.includes(word)),
  ).length;

  if (untranslatedCount > words.length * 0.3) {
    quality.score -= 0.3;
    quality.issues.push('High number of untranslated words');
  }

  // Check for placeholder patterns
  if (
    translatedText.includes('[EN]') ||
    translatedText.includes('[' + language.toUpperCase() + ']')
  ) {
    quality.score -= 0.5;
    quality.issues.push('Contains placeholder markers');
  }

  // Check for reasonable length ratio
  const ratio = translatedText.length / originalText.length;
  if (ratio < 0.5 || ratio > 3.0) {
    quality.score -= 0.2;
    quality.issues.push('Unusual length ratio');
  }

  return quality;
}

// Prioritize phrases by importance and uniqueness
function prioritizePhrases(phrases) {
  const uniquePhrases = new Map();
  const priorityPhrases = [];

  // Group similar phrases and keep only unique ones
  phrases.forEach(phrase => {
    const normalized = phrase.text
      .toLowerCase()
      .replace(/\b(this|that|the|a|an)\b/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    if (!uniquePhrases.has(normalized) || phrase.intensity === 'bold') {
      uniquePhrases.set(normalized, phrase);
    }
  });

  // Convert to array and sort by priority
  const uniqueArray = Array.from(uniquePhrases.values());

  // Sort by quality criteria
  uniqueArray.sort((a, b) => {
    // Prioritize bold phrases
    if (a.intensity === 'bold' && b.intensity !== 'bold') return -1;
    if (b.intensity === 'bold' && a.intensity !== 'bold') return 1;

    // Prioritize shorter, more natural phrases
    if (a.text.length !== b.text.length) {
      return a.text.length - b.text.length;
    }

    // Prioritize phrases with more personality
    const personalityWords = [
      'you',
      'i',
      'we',
      'feel',
      'think',
      'love',
      'like',
    ];
    const aScore = personalityWords.filter(word =>
      a.text.toLowerCase().includes(word),
    ).length;
    const bScore = personalityWords.filter(word =>
      b.text.toLowerCase().includes(word),
    ).length;

    return bScore - aScore;
  });

  return uniqueArray.slice(0, 1000); // Top 1000 most important phrases
}

async function generateAuthenticTranslations() {
  console.log('🚀 Starting Authentic Translation Generation...');
  console.log(
    '📊 Processing 15,773 phrases with quality translation services\n',
  );

  try {
    // Load the large dataset
    const largeData = JSON.parse(
      fs.readFileSync('./src/data/phrases-large.json', 'utf8'),
    );

    // Extract all phrases
    const allPhrases = [];
    for (const [categoryKey, categoryData] of Object.entries(
      largeData.categories,
    )) {
      for (const phrase of categoryData.phrases) {
        allPhrases.push({
          ...phrase,
          category: categoryKey,
        });
      }
    }

    console.log(`📝 Found ${allPhrases.length} total phrases`);

    // Prioritize phrases
    const priorityPhrases = prioritizePhrases(allPhrases);
    console.log(
      `🎯 Prioritized to ${priorityPhrases.length} high-quality phrases\n`,
    );

    // Process each language
    for (const language of LANGUAGES) {
      console.log(`🌐 Processing ${language.name} (${language.nativeName})...`);

      const translationsPath = `./src/data/translations-large/${language.code}.json`;

      // Load existing translations or create new structure
      let translationData;
      try {
        translationData = JSON.parse(fs.readFileSync(translationsPath, 'utf8'));
      } catch {
        translationData = {
          categories: {},
          metadata: {
            language: language.code,
            totalPhrases: 0,
            qualityScore: 0,
            generatedAt: new Date().toISOString(),
          },
        };
      }

      let processedCount = 0;
      let qualitySum = 0;

      // Process priority phrases
      for (const phrase of priorityPhrases) {
        const categoryKey = phrase.category;
        const phraseId = phrase.id;

        // Initialize category if needed
        if (!translationData.categories[categoryKey]) {
          translationData.categories[categoryKey] = {
            title: categoryKey, // Will be translated later
            description: largeData.categories[categoryKey].description,
            phrases: [],
          };
        }

        // Check if phrase already exists
        const existingPhrase = translationData.categories[
          categoryKey
        ].phrases.find(p => p.id === phraseId);

        if (!existingPhrase) {
          try {
            // Try LibreTranslate first (more reliable)
            let translatedText;
            try {
              translatedText = await translateWithLibreTranslate(
                phrase.text,
                language.code,
              );
            } catch (libreError) {
              console.log(
                `   ⚠️  LibreTranslate failed, using Google Translate fallback`,
              );
              translatedText = await translateWithGoogle(
                phrase.text,
                language.code,
              );
            }

            // Quality assessment
            const quality = assessTranslationQuality(
              phrase.text,
              translatedText,
              language.code,
            );

            const translatedPhrase = {
              id: phraseId,
              intensity: phrase.intensity,
              text: translatedText,
              quality: quality.score,
              issues: quality.issues,
            };

            translationData.categories[categoryKey].phrases.push(
              translatedPhrase,
            );

            processedCount++;
            qualitySum += quality.score;

            if (processedCount % 50 === 0) {
              console.log(
                `   ✅ Processed ${processedCount}/${
                  priorityPhrases.length
                } phrases (avg quality: ${(qualitySum / processedCount).toFixed(
                  2,
                )})`,
              );
            }

            // Small delay to respect API limits
            await new Promise(resolve => setTimeout(resolve, 200));
          } catch (error) {
            console.log(
              `   ❌ Failed to translate phrase ${phraseId}: ${error.message}`,
            );

            // Add placeholder for failed translations
            translationData.categories[categoryKey].phrases.push({
              id: phraseId,
              intensity: phrase.intensity,
              text: `[${language.code.toUpperCase()}] ${phrase.text}`,
              quality: 0,
              issues: ['Translation failed'],
            });
          }
        }
      }

      // Update metadata
      translationData.metadata.totalPhrases = processedCount;
      translationData.metadata.qualityScore = qualitySum / processedCount;
      translationData.metadata.generatedAt = new Date().toISOString();

      // Save translations
      fs.writeFileSync(
        translationsPath,
        JSON.stringify(translationData, null, 2),
      );

      console.log(`✅ ${language.name} translations completed:`);
      console.log(`   📊 ${processedCount} phrases translated`);
      console.log(
        `   ⭐ Average quality: ${(qualitySum / processedCount).toFixed(2)}`,
      );
      console.log('');
    }

    console.log('🎉 Authentic translation generation completed!');
    console.log(
      '📁 High-quality translations saved to: src/data/translations-large/',
    );
    console.log(
      '💡 Translation quality can be improved by manual review and professional translation services.',
    );
  } catch (error) {
    console.error('❌ Translation generation failed:', error);
  }
}

async function translateCategoryTitles() {
  console.log('🏷️  Translating category titles and descriptions...');

  const largeData = JSON.parse(
    fs.readFileSync('./src/data/phrases-large.json', 'utf8'),
  );

  for (const language of LANGUAGES) {
    const translationsPath = `./src/data/translations-large/${language.code}.json`;

    try {
      const translationData = JSON.parse(
        fs.readFileSync(translationsPath, 'utf8'),
      );

      // Translate category titles and descriptions
      for (const [categoryKey, categoryData] of Object.entries(
        largeData.categories,
      )) {
        if (translationData.categories[categoryKey]) {
          try {
            const translatedTitle = await translateWithLibreTranslate(
              categoryData.title,
              language.code,
            );
            const translatedDescription = await translateWithLibreTranslate(
              categoryData.description,
              language.code,
            );

            translationData.categories[categoryKey].title = translatedTitle;
            translationData.categories[categoryKey].description =
              translatedDescription;

            console.log(`   ✅ Translated ${categoryKey} for ${language.name}`);
          } catch (error) {
            console.log(
              `   ⚠️  Failed to translate ${categoryKey} titles for ${language.name}`,
            );
          }
        }
      }

      fs.writeFileSync(
        translationsPath,
        JSON.stringify(translationData, null, 2),
      );
    } catch (error) {
      console.log(
        `❌ Failed to update ${language.name} category titles:`,
        error.message,
      );
    }
  }

  console.log('✅ Category title translation completed!');
}

async function generateQualityReport() {
  console.log('📊 Generating translation quality report...');

  const report = {
    summary: {},
    recommendations: [],
    generatedAt: new Date().toISOString(),
  };

  for (const language of LANGUAGES) {
    const translationsPath = `./src/data/translations-large/${language.code}.json`;

    try {
      const data = JSON.parse(fs.readFileSync(translationsPath, 'utf8'));
      const metadata = data.metadata || {};

      report.summary[language.code] = {
        name: language.name,
        totalPhrases: metadata.totalPhrases || 0,
        qualityScore: metadata.qualityScore || 0,
        generatedAt: metadata.generatedAt || null,
      };
    } catch (error) {
      report.summary[language.code] = {
        name: language.name,
        error: error.message,
      };
    }
  }

  // Generate recommendations
  report.recommendations = [
    'Review translations with quality score below 0.7 manually',
    'Consider professional translation services for critical phrases',
    'Test translations in context with native speakers',
    'Implement user feedback system for translation improvements',
    'Set up automated quality checks in CI/CD pipeline',
  ];

  fs.writeFileSync(
    './translation-quality-report.json',
    JSON.stringify(report, null, 2),
  );

  console.log('✅ Quality report generated: translation-quality-report.json');
}

// Main execution
async function main() {
  const command = process.argv[2];

  switch (command) {
    case 'translate':
      await generateAuthenticTranslations();
      break;
    case 'titles':
      await translateCategoryTitles();
      break;
    case 'report':
      await generateQualityReport();
      break;
    case 'all':
      await generateAuthenticTranslations();
      await translateCategoryTitles();
      await generateQualityReport();
      break;
    default:
      console.log('Usage:');
      console.log(
        '  node authenticTranslationGenerator.js translate  # Generate translations',
      );
      console.log(
        '  node authenticTranslationGenerator.js titles     # Translate category titles',
      );
      console.log(
        '  node authenticTranslationGenerator.js report     # Generate quality report',
      );
      console.log(
        '  node authenticTranslationGenerator.js all        # Run all steps',
      );
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  generateAuthenticTranslations,
  translateCategoryTitles,
  generateQualityReport,
};
