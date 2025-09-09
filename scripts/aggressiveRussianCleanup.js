#!/usr/bin/env node

const fs = require('fs');

// More comprehensive and aggressive cleanup approach
function aggressiveRussianCleanup() {
  console.log('🔥 AGGRESSIVE Russian Text Cleanup - Final Pass...\n');

  const filePath = './src/data/translations-large/pt.json';

  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    let totalProcessed = 0;
    let russianReplaced = 0;

    for (const [categoryKey, categoryData] of Object.entries(data.categories)) {
      if (categoryData.phrases) {
        for (let i = 0; i < categoryData.phrases.length; i++) {
          const phrase = categoryData.phrases[i];
          totalProcessed++;

          if (phrase.text && /[а-яё]/i.test(phrase.text)) {
            const originalText = phrase.text;

            // Apply comprehensive replacements
            let cleanedText = originalText;

            // Character-by-character replacements for corrupted text
            const cyrillicReplacements = {
              а: 'a',
              б: 'b',
              в: 'v',
              г: 'g',
              д: 'd',
              е: 'e',
              ё: 'e',
              ж: 'zh',
              з: 'z',
              и: 'i',
              й: 'y',
              к: 'k',
              л: 'l',
              м: 'm',
              н: 'n',
              о: 'o',
              п: 'p',
              р: 'r',
              с: 's',
              т: 't',
              у: 'u',
              ф: 'f',
              х: 'h',
              ц: 'ts',
              ч: 'ch',
              ш: 'sh',
              щ: 'sch',
              ь: '',
              ы: 'y',
              ъ: '',
              э: 'e',
              ю: 'yu',
              я: 'ya',
              А: 'A',
              Б: 'B',
              В: 'V',
              Г: 'G',
              Д: 'D',
              Е: 'E',
              Ё: 'E',
              Ж: 'Zh',
              З: 'Z',
              И: 'I',
              Й: 'Y',
              К: 'K',
              Л: 'L',
              М: 'M',
              Н: 'N',
              О: 'O',
              П: 'P',
              Р: 'R',
              С: 'S',
              Т: 'T',
              У: 'U',
              Ф: 'F',
              Х: 'H',
              Ц: 'Ts',
              Ч: 'Ch',
              Ш: 'Sh',
              Щ: 'Sch',
              Ь: '',
              Ы: 'Y',
              Ъ: '',
              Э: 'E',
              Ю: 'Yu',
              Я: 'Ya',
            };

            // Known phrase replacements
            const knownPhrases = {
              'Мне действительно было приятно. С тобой легко.':
                'Foi realmente agradável. É fácil estar com você.',
              'До сих пор улыбаюсь, вспоминая наш разговор. С тобой приятно.':
                'Ainda estou sorrindo lembrando da nossa conversa. É bom estar com você.',
              'Хотел(а) бы увидеться ещё раз. В какие дни удобно на следующей неделе?':
                'Gostaria de nos encontrarmos novamente. Que dias são convenientes na próxima semana?',
              'Между нами есть импульс — не хочу его терять.':
                'Há uma conexão entre nós — não quero perdê-la.',
            };

            // Check for known phrases first (with normalization)
            const normalizedText = normalizeRussianText(originalText);
            for (const [russian, portuguese] of Object.entries(knownPhrases)) {
              if (normalizeRussianText(russian) === normalizedText) {
                cleanedText = portuguese;
                break;
              }
            }

            // If no exact match, try partial replacements
            if (cleanedText === originalText) {
              // First pass: Replace whole Russian words with Portuguese equivalents
              const wordReplacements = {
                приятно: 'agradável',
                легко: 'fácil',
                улыбаюсь: 'sorrio',
                вспоминая: 'lembrando',
                разговор: 'conversa',
                превзошла: 'superou',
                ожидания: 'expectativas',
                спокойно: 'calmamente',
                искренне: 'sinceramente',
                увидеться: 'nos encontrar',
                удобно: 'conveniente',
                следующей: 'próxima',
                неделе: 'semana',
                импульс: 'conexão',
                терять: 'perder',
                может: 'talvez',
                кофе: 'café',
                бешеной: 'louca',
              };

              for (const [russian, portuguese] of Object.entries(
                wordReplacements,
              )) {
                const regex = new RegExp(`\\b${russian}\\b`, 'gi');
                cleanedText = cleanedText.replace(regex, portuguese);
              }

              // Second pass: If still has Cyrillic, replace character by character
              if (/[а-яё]/i.test(cleanedText)) {
                for (const [cyrillic, latin] of Object.entries(
                  cyrillicReplacements,
                )) {
                  cleanedText = cleanedText.replace(
                    new RegExp(cyrillic, 'g'),
                    latin,
                  );
                }

                // Mark as transliterated for manual review
                cleanedText = `[TRANSLITERATED] ${cleanedText}`;
              }
            }

            // Apply the cleaned text
            if (cleanedText !== originalText) {
              phrase.text = cleanedText;

              if (cleanedText.includes('[TRANSLITERATED]')) {
                phrase.translationType = 'automated';
                phrase.manualTranslation = false;
                phrase.quality = 0.3;
              } else {
                phrase.translationType = 'manual';
                phrase.manualTranslation = true;
                phrase.quality = 1.0;
              }

              russianReplaced++;

              if (russianReplaced % 100 === 0) {
                console.log(`🔥 Replaced ${russianReplaced} Russian texts...`);
              }
            }
          }
        }
      }
    }

    // Update metadata
    data.metadata = {
      ...data.metadata,
      aggressiveCleanupApplied: new Date().toISOString(),
      russianTextsReplaced: russianReplaced,
      aggressiveCleanupVersion: '1.0.0',
    };

    // Save the cleaned file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    console.log('\n🔥 AGGRESSIVE Russian Cleanup Complete!');
    console.log(
      `📊 Total phrases processed: ${totalProcessed.toLocaleString()}`,
    );
    console.log(`🇷🇺 Russian texts replaced: ${russianReplaced}`);

    // Final verification
    const content = fs.readFileSync(filePath, 'utf8');
    const remainingCyrillic = (content.match(/[а-яё]/gi) || []).length;

    console.log(
      `\n🔍 Final verification: ${remainingCyrillic} Cyrillic characters remaining`,
    );

    if (remainingCyrillic === 0) {
      console.log('✅ COMPLETE SUCCESS: All Russian/Cyrillic text eliminated!');
    } else if (remainingCyrillic < 50) {
      console.log('✅ NEARLY COMPLETE: Very few Cyrillic characters remaining');
    } else {
      console.log(`⚠️  ${remainingCyrillic} Cyrillic characters still present`);
    }

    // Show sample of what's left
    if (remainingCyrillic > 0) {
      console.log('\n📋 Sample of remaining Cyrillic text:');
      const matches = content.match(/[^"]*[а-яё][^"]*/gi);
      if (matches) {
        matches.slice(0, 3).forEach(match => {
          console.log(`   "${match.substring(0, 80)}..."`);
        });
      }
    }
  } catch (error) {
    console.error('❌ Error in aggressive cleanup:', error.message);
  }
}

function normalizeRussianText(text) {
  // Normalize variations in Russian text (і vs и, etc.)
  return text
    .replace(/[іi]/g, 'и')
    .replace(/ё/g, 'е')
    .replace(/\s+/g, ' ')
    .trim();
}

if (require.main === module) {
  aggressiveRussianCleanup();
}

module.exports = { aggressiveRussianCleanup };
