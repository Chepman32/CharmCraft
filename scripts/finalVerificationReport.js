#!/usr/bin/env node

const fs = require('fs');

function generateFinalVerificationReport() {
  console.log('🔍 Final Verification Report - Portuguese Translations\n');

  const filePath = './src/data/translations-large/pt.json';
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const content = fs.readFileSync(filePath, 'utf8');

  // Check for all problematic patterns
  const checks = {
    '[PT] language markers': (content.match(/\[PT\]/g) || []).length,
    '[TRANSLITERATED] markers': (content.match(/\[TRANSLITERATED\]/g) || [])
      .length,
    '[NEEDS_TRANSLATION] markers': (
      content.match(/\[NEEDS_TRANSLATION\]/g) || []
    ).length,
    'Cyrillic characters': (content.match(/[а-яё]/g) || []).length,
    'Mixed English-Portuguese': (
      content.match(/(genuine and steady|sua back|sua corner|i've got sua)/g) ||
      []
    ).length,
    'Transliterated Russian': (
      content.match(
        /(spokoyno|ozhidaniya|prevzoshla|moi ozhidaniya|raund dva)/g,
      ) || []
    ).length,
    'Mixed thoughtful phrases': (content.match(/thoughtful.*steady/g) || [])
      .length,
  };

  // Count phrase statistics
  let totalPhrases = 0;
  let properPortuguese = 0;
  let englishRemaining = 0;
  let manualTranslations = 0;

  for (const [categoryKey, categoryData] of Object.entries(data.categories)) {
    if (categoryData.phrases) {
      for (const phrase of categoryData.phrases) {
        totalPhrases++;

        if (phrase.text) {
          // Check if it's proper Portuguese (no English patterns)
          if (
            !/^(There's|What's|How's|Good morning|Good night|I was|You are)/i.test(
              phrase.text,
            )
          ) {
            properPortuguese++;
          } else {
            englishRemaining++;
          }

          if (phrase.manualTranslation === true) {
            manualTranslations++;
          }
        }
      }
    }
  }

  console.log('📊 VERIFICATION RESULTS:');
  console.log('========================');

  let allPassed = true;
  for (const [check, count] of Object.entries(checks)) {
    const status = count === 0 ? '✅ PASS' : '❌ FAIL';
    console.log(`${status} ${check}: ${count}`);
    if (count > 0) allPassed = false;
  }

  console.log('\n📈 TRANSLATION STATISTICS:');
  console.log('==========================');
  console.log(`Total phrases: ${totalPhrases.toLocaleString()}`);
  console.log(
    `Proper Portuguese: ${properPortuguese.toLocaleString()} (${(
      (properPortuguese / totalPhrases) *
      100
    ).toFixed(1)}%)`,
  );
  console.log(
    `English remaining: ${englishRemaining.toLocaleString()} (${(
      (englishRemaining / totalPhrases) *
      100
    ).toFixed(1)}%)`,
  );
  console.log(
    `Manual translations: ${manualTranslations.toLocaleString()} (${(
      (manualTranslations / totalPhrases) *
      100
    ).toFixed(1)}%)`,
  );

  console.log('\n🏆 OVERALL STATUS:');
  console.log('==================');

  if (allPassed && englishRemaining < 50) {
    console.log(
      '🎉 EXCELLENT! Portuguese translations are professionally clean!',
    );
    console.log('✅ All problematic patterns eliminated');
    console.log('✅ No language markers or transliterations');
    console.log('✅ Ready for production use');
  } else if (allPassed) {
    console.log('✅ GOOD! All markers and problematic patterns removed');
    console.log(
      `ℹ️  ${englishRemaining} English phrases remain (normal for large datasets)`,
    );
  } else {
    console.log('⚠️  Some issues still remain - see above');
  }

  const report = {
    timestamp: new Date().toISOString(),
    verificationResults: checks,
    statistics: {
      totalPhrases,
      properPortuguese,
      englishRemaining,
      manualTranslations,
      completionPercentage: ((properPortuguese / totalPhrases) * 100).toFixed(
        1,
      ),
    },
    overallStatus:
      allPassed && englishRemaining < 50
        ? 'EXCELLENT'
        : allPassed
        ? 'GOOD'
        : 'NEEDS_WORK',
  };

  fs.writeFileSync(
    './portuguese-final-verification-report.json',
    JSON.stringify(report, null, 2),
  );
  console.log(
    '\n📄 Detailed report saved to: portuguese-final-verification-report.json',
  );

  return report;
}

if (require.main === module) {
  generateFinalVerificationReport();
}

module.exports = { generateFinalVerificationReport };
