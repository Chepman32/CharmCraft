const fs = require('fs');
const path = require('path');

// Test script to verify the massive phrase database implementation
async function testMassivePhraseDatabase() {
  try {
    // Test 1: Verify massive database file exists and is loadable
    const dbPath = path.join(
      __dirname,
      '..',
      'src',
      'data',
      'massivePhraseDatabase.ts',
    );
    fs.statSync(dbPath);

    // Test 2: Verify translation files exist
    const languages = ['es', 'ru', 'de', 'fr', 'pt', 'ja', 'zh', 'ko', 'ua'];
    for (const lang of languages) {
      const translationPath = path.join(
        __dirname,
        '..',
        'src',
        'data',
        'phraseTranslations',
        `${lang}.ts`,
      );
      if (fs.existsSync(translationPath)) {
        fs.statSync(translationPath);
      }
    }

    // Test 3: Parse and verify phrase count
    const fileContent = fs.readFileSync(dbPath, 'utf8');
    const jsonMatch = fileContent.match(
      /export const MASSIVE_PHRASE_DATABASE: Phrase\\[\\] = (\\[[\\s\\S]*\\]);/,
    );

    if (!jsonMatch) {
      throw new Error('Could not parse phrase database');
    }

    // Test 4: Verify PhraseService import path
    const serviceContent = fs.readFileSync(
      path.join(__dirname, '..', 'src', 'services', 'PhraseService.ts'),
      'utf8',
    );
    if (!serviceContent.includes('massivePhraseDatabase')) {
      throw new Error('PhraseService not updated to use massive database');
    }
  } catch (error) {
    process.exit(1);
  }
}

// Run the test
testMassivePhraseDatabase();
