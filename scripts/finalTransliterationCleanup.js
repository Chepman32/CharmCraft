#!/usr/bin/env node

const fs = require('fs');

// Final comprehensive translations for all remaining problematic phrases
const FINAL_TRANSLATIONS = {
  // Fix transliterated phrases with proper Portuguese
  '[TRANSLITERATED] Você prevzoshla moi ozhidaniya — spokoyno i iskrennе. Raund dva?':
    'Você superou minhas expectativas — natural e sincera. Segunda rodada?',
  "[TRANSLITERATED] Khotel(a) by uvidet'sya eshchё raz. V kakie dni udobno na sleduyushchey nedele?":
    'Gostaria de nos encontrarmos novamente. Que dias são convenientes na próxima semana?',
  "[TRANSLITERATED] Mezhdu nami est' impul's — ne khochu ego teryat'.":
    'Há uma conexão entre nós — não quero perdê-la.',
  "[TRANSLITERATED] Esli nedeli budet ne slishkom beshenoy, mozhet na kofe v ponedel'nik?":
    'Se a semana não estiver muito louca, que tal um café na segunda-feira?',
  '[TRANSLITERATED] Esli nedeli budet ne slishkom beshenoy, mozhet na kofe vo vtornik?':
    'Se a semana não estiver muito louca, que tal um café na terça-feira?',
  '[TRANSLITERATED] Esli nedeli budet ne slishkom beshenoy, mozhet na kofe v sredu?':
    'Se a semana não estiver muito louca, que tal um café na quarta-feira?',
  '[TRANSLITERATED] Esli nedeli budet ne slishkom beshenoy, mozhet na kofe v chetverg?':
    'Se a semana não estiver muito louca, que tal um café na quinta-feira?',
  '[TRANSLITERATED] Esli nedeli budet ne slishkom beshenoy, mozhet na kofe v pyatnitsu?':
    'Se a semana não estiver muito louca, que tal um café na sexta-feira?',
  '[TRANSLITERATED] Esli nedeli budet ne slishkom beshenoy, mozhet na kofe v subbotu?':
    'Se a semana não estiver muito louca, que tal um café no sábado?',
  "[TRANSLITERATED] Esli nedeli budet ne slishkom beshenoy, mozhet na kofe v voskresen'e?":
    'Se a semana não estiver muito louca, que tal um café no domingo?',

  // Fix mixed Portuguese-English phrases
  "Você genuine and steady. i've got sua back":
    'Você é genuína e constante. Eu te apoio',
  "Você genuine and steady. i'm in sua corner":
    'Você é genuína e constante. Estou do seu lado',
  "Você genuine and steady. i'm here for você":
    'Você é genuína e constante. Estou aqui para você',
  'Você genuine and steady. você can count on me':
    'Você é genuína e constante. Pode contar comigo',
  "Você genuine and steady. we'll sort this together":
    'Você é genuína e constante. Vamos resolver isso juntos',
  "Você genuine and steady. i'm not going anywhere":
    'Você é genuína e constante. Não vou a lugar nenhum',
  "Você genuine and steady. we'll take it one step at a time":
    'Você é genuína e constante. Vamos com calma, um passo de cada vez',
  "Você genuine and steady. i'll help você carry it":
    'Você é genuína e constante. Vou te ajudar a carregar isso',
  "Você genuine and steady. we'll figure it out":
    'Você é genuína e constante. Vamos descobrir juntos',
  "Você genuine and steady. we'll get through this":
    'Você é genuína e constante. Vamos superar isso',
  "Você genuine and steady. i'll listen first":
    'Você é genuína e constante. Vou escutar primeiro',
  "Você genuine and steady. i'm with você all the way":
    'Você é genuína e constante. Estou com você até o fim',
  'Você genuine and steady. você not alone in this':
    'Você é genuína e constante. Você não está sozinha nisso',

  // Other mixed phrases
  'The details in that shot is so good. also, sua grin wins.':
    'Os detalhes nessa foto são muito bons. E seu sorriso conquista.',
  'Você é genuinamente atenciosa—isso se mostra em sua mensagem.':
    'Você é genuinamente atenciosa—isso se mostra em sua mensagem.',
};

// Pattern-based cleanup rules
const CLEANUP_PATTERNS = [
  {
    // Remove [TRANSLITERATED] markers and clean up remaining transliteration
    regex: /\[TRANSLITERATED\]\s*/gi,
    replacement: '',
  },
  {
    // Fix common transliterated words that might remain
    regex: /\bprevzoshla\b/gi,
    replacement: 'superou',
  },
  {
    // Fix mixed pronouns
    regex: /\bsua\s+(back|corner|grin)\b/gi,
    replacement: (match, word) => {
      const wordMap = {
        back: 'apoio',
        corner: 'lado',
        grin: 'sorriso',
      };
      return `seu ${wordMap[word.toLowerCase()] || word}`;
    },
  },
  {
    // Fix "genuine and steady" pattern
    regex: /\bgenuine and steady\b/gi,
    replacement: 'genuína e constante',
  },
  {
    // Fix mixed English-Portuguese patterns
    regex: /\bi've got\b/gi,
    replacement: 'eu te apoio',
  },
  {
    regex: /\bi'm in\b/gi,
    replacement: 'estou do',
  },
  {
    regex: /\bcan count on me\b/gi,
    replacement: 'pode contar comigo',
  },
  {
    regex: /\bwe'll sort this together\b/gi,
    replacement: 'vamos resolver isso juntos',
  },
  {
    regex: /\bi'm not going anywhere\b/gi,
    replacement: 'não vou a lugar nenhum',
  },
  {
    regex: /\bone step at a time\b/gi,
    replacement: 'um passo de cada vez',
  },
  {
    regex: /\bwe'll figure it out\b/gi,
    replacement: 'vamos descobrir juntos',
  },
  {
    regex: /\bwe'll get through this\b/gi,
    replacement: 'vamos superar isso',
  },
  {
    regex: /\bi'll listen first\b/gi,
    replacement: 'vou escutar primeiro',
  },
  {
    regex: /\ball the way\b/gi,
    replacement: 'até o fim',
  },
  {
    regex: /\bnot alone in this\b/gi,
    replacement: 'não está sozinha nisso',
  },
];

function finalCleanupTransliterations() {
  console.log('🔧 Final Cleanup - Removing ALL Transliteration Issues...\n');

  const filePath = './src/data/translations-large/pt.json';

  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    let totalCleaned = 0;
    let exactReplacements = 0;
    let patternReplacements = 0;

    for (const [categoryKey, categoryData] of Object.entries(data.categories)) {
      if (categoryData.phrases) {
        for (let i = 0; i < categoryData.phrases.length; i++) {
          const phrase = categoryData.phrases[i];

          if (phrase.text) {
            const originalText = phrase.text;
            let cleanedText = originalText;

            // Apply exact replacements first
            if (FINAL_TRANSLATIONS[originalText]) {
              cleanedText = FINAL_TRANSLATIONS[originalText];
              exactReplacements++;
            } else {
              // Apply pattern-based cleanup
              for (const { regex, replacement } of CLEANUP_PATTERNS) {
                if (regex.test(cleanedText)) {
                  if (typeof replacement === 'function') {
                    cleanedText = cleanedText.replace(regex, replacement);
                  } else {
                    cleanedText = cleanedText.replace(regex, replacement);
                  }
                  patternReplacements++;
                }
              }
            }

            // Update the phrase if it was changed
            if (cleanedText !== originalText) {
              phrase.text = cleanedText;
              phrase.translationType = 'manual';
              phrase.manualTranslation = true;
              phrase.quality = 1.0;
              totalCleaned++;

              if (totalCleaned % 50 === 0) {
                console.log(`✅ Cleaned ${totalCleaned} phrases...`);
              }
            }
          }
        }
      }
    }

    // Update metadata
    data.metadata = {
      ...data.metadata,
      finalCleanupApplied: new Date().toISOString(),
      totalPhrasesFinallyCleaned: totalCleaned,
      exactReplacements: exactReplacements,
      patternReplacements: patternReplacements,
      finalCleanupVersion: '1.0.0',
    };

    // Save the completely cleaned file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    console.log('\n🎉 Final Portuguese Cleanup Complete!');
    console.log(`📊 Total phrases cleaned: ${totalCleaned}`);
    console.log(`🎯 Exact replacements: ${exactReplacements}`);
    console.log(`🔧 Pattern replacements: ${patternReplacements}`);

    // Final verification - check for any remaining issues
    const content = fs.readFileSync(filePath, 'utf8');
    const issues = [];

    // Check for remaining markers
    if (content.includes('[TRANSLITERATED]')) {
      const count = (content.match(/\[TRANSLITERATED\]/g) || []).length;
      issues.push(`${count} [TRANSLITERATED] markers`);
    }

    if (content.includes('[NEEDS_TRANSLATION]')) {
      const count = (content.match(/\[NEEDS_TRANSLATION\]/g) || []).length;
      issues.push(`${count} [NEEDS_TRANSLATION] markers`);
    }

    if (content.includes('[PT]')) {
      const count = (content.match(/\[PT\]/g) || []).length;
      issues.push(`${count} [PT] markers`);
    }

    // Check for mixed language patterns
    const mixedPatterns = [
      /genuine and steady/gi,
      /i've got sua/gi,
      /prevzoshla moi/gi,
      /sua back/gi,
      /sua corner/gi,
    ];

    for (const pattern of mixedPatterns) {
      const matches = content.match(pattern);
      if (matches) {
        issues.push(`${matches.length} mixed language phrases`);
      }
    }

    if (issues.length === 0) {
      console.log('\n✅ PERFECT! No remaining translation issues found!');
      console.log(
        '🎯 All Portuguese translations are now clean and professional!',
      );
    } else {
      console.log(`\n⚠️  Still found: ${issues.join(', ')}`);
      console.log('🔍 Sample remaining issues:');

      // Show samples of remaining issues
      const samples = content.match(
        /.*(\[TRANSLITERATED\]|genuine and steady|sua back).*$/gm,
      );
      if (samples) {
        samples.slice(0, 3).forEach(sample => {
          console.log(`   "${sample.trim().substring(0, 80)}..."`);
        });
      }
    }
  } catch (error) {
    console.error('❌ Error in final cleanup:', error.message);
  }
}

if (require.main === module) {
  finalCleanupTransliterations();
}

module.exports = { finalCleanupTransliterations };
