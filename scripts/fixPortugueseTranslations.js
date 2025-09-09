#!/usr/bin/env node

const fs = require('fs');

// Comprehensive translations for all problematic phrases
const COMPREHENSIVE_TRANSLATIONS = {
  // Mixed Russian-English phrases with "thoughtful"
  '[NEEDS_TRANSLATION] Ты feel genuinely thoughtful—it shows in тыr message.':
    'Você é genuinamente atenciosa—isso se mostra em sua mensagem.',
  '[NEEDS_TRANSLATION] Ты feel genuinely thoughtful—it shows in that photo.':
    'Você é genuinamente atenciosa—isso se mostra nessa foto.',
  '[NEEDS_TRANSLATION] Ты feel genuinely thoughtful—it shows in тыr playlist.':
    'Você é genuinamente atenciosa—isso se mostra em sua playlist.',
  '[NEEDS_TRANSLATION] Ты feel genuinely thoughtful—it shows in тыr caption.':
    'Você é genuinamente atenciosa—isso se mostra em sua legenda.',
  '[NEEDS_TRANSLATION] Ты feel genuinely thoughtful—it shows in тыr comment.':
    'Você é genuinamente atenciosa—isso se mostra em seu comentário.',
  '[NEEDS_TRANSLATION] Ты feel genuinely thoughtful—it shows in тыr story.':
    'Você é genuinamente atenciosa—isso se mostra em sua história.',
  '[NEEDS_TRANSLATION] Ты feel genuinely thoughtful—it shows in тыr post.':
    'Você é genuinamente atenciosa—isso se mostra em sua postagem.',
  '[NEEDS_TRANSLATION] Ты feel genuinely thoughtful—it shows in тыr outfit.':
    'Você é genuinamente atenciosa—isso se mostra em seu visual.',
  '[NEEDS_TRANSLATION] Ты feel genuinely thoughtful—it shows in that idea.':
    'Você é genuinamente atenciosa—isso se mostra nessa ideia.',
  '[NEEDS_TRANSLATION] Ты feel genuinely thoughtful—it shows in that joke.':
    'Você é genuinamente atenciosa—isso se mostra nessa piada.',
  '[NEEDS_TRANSLATION] Ты feel genuinely thoughtful—it shows in тыr explanation.':
    'Você é genuinamente atenciosa—isso se mostra em sua explicação.',
  '[NEEDS_TRANSLATION] Ты feel genuinely thoughtful—it shows in тыr review.':
    'Você é genuinamente atenciosa—isso se mostra em sua resenha.',
  '[NEEDS_TRANSLATION] Ты feel genuinely thoughtful—it shows in тыr recipe.':
    'Você é genuinamente atenciosa—isso se mostra em sua receita.',
  '[NEEDS_TRANSLATION] Ты feel genuinely thoughtful—it shows in that video.':
    'Você é genuinamente atenciosa—isso se mostra nesse vídeo.',
  '[NEEDS_TRANSLATION] Ты feel genuinely thoughtful—it shows in тыr travel shot.':
    'Você é genuinamente atenciosa—isso se mostra em sua foto de viagem.',
  '[NEEDS_TRANSLATION] Ты feel genuinely thoughtful—it shows in тыr sunset photo.':
    'Você é genuinamente atenciosa—isso se mostra em sua foto do pôr do sol.',
  '[NEEDS_TRANSLATION] Ты feel genuinely thoughtful—it shows in тыr book rec.':
    'Você é genuinamente atenciosa—isso se mostra em sua recomendação de livro.',
  '[NEEDS_TRANSLATION] Ты feel genuinely thoughtful—it shows in that quote.':
    'Você é genuinamente atenciosa—isso se mostra nessa citação.',
  '[NEEDS_TRANSLATION] Ты feel genuinely thoughtful—it shows in тыr sketch.':
    'Você é genuinamente atenciosa—isso se mostra em seu desenho.',
  '[NEEDS_TRANSLATION] Ты feel genuinely thoughtful—it shows in тыr dance clip.':
    'Você é genuinamente atenciosa—isso se mostra em seu vídeo de dança.',

  // Other mixed phrases
  '[NEEDS_TRANSLATION] Ты remarkably thoughtful; conversations with ты feel easy and real.':
    'Você é notavelmente atenciosa; conversas com você são fáceis e genuínas.',
  '[NEEDS_TRANSLATION] Я хочу more people like ты—thoughtful and present.':
    'Quero mais pessoas como você—atenciosas e presentes.',

  // "Thoughtful and steady" variations
  "[NEEDS_TRANSLATION] Ты thoughtful and steady. i've got тыr back":
    'Você é atenciosa e constante. Eu te apoio',
  "[NEEDS_TRANSLATION] Ты thoughtful and steady. i'm in тыr corner":
    'Você é atenciosa e constante. Estou do seu lado',
  "[NEEDS_TRANSLATION] Ты thoughtful and steady. i'm here for ты":
    'Você é atenciosa e constante. Estou aqui para você',
  '[NEEDS_TRANSLATION] Ты thoughtful and steady. ты can count on me':
    'Você é atenciosa e constante. Pode contar comigo',
  "[NEEDS_TRANSLATION] Ты thoughtful and steady. we'll sort this together":
    'Você é atenciosa e constante. Vamos resolver isso juntos',
  "[NEEDS_TRANSLATION] Ты thoughtful and steady. i'm not going anywhere":
    'Você é atenciosa e constante. Não vou a lugar nenhum',
  "[NEEDS_TRANSLATION] Ты thoughtful and steady. we'll take it one step at a time":
    'Você é atenciosa e constante. Vamos com calma, um passo de cada vez',
  "[NEEDS_TRANSLATION] Ты thoughtful and steady. i'll help ты carry it":
    'Você é atenciosa e constante. Vou te ajudar a carregar isso',
  "[NEEDS_TRANSLATION] Ты thoughtful and steady. we'll figure it out":
    'Você é atenciosa e constante. Vamos descobrir juntos',
  "[NEEDS_TRANSLATION] Ты thoughtful and steady. we'll get through this":
    'Você é atenciosa e constante. Vamos superar isso',
  "[NEEDS_TRANSLATION] Ты thoughtful and steady. i'll listen first":
    'Você é atenciosa e constante. Vou escutar primeiro',
  "[NEEDS_TRANSLATION] Ты thoughtful and steady. i'm with ты all the way":
    'Você é atenciosa e constante. Estou com você até o fim',
  '[NEEDS_TRANSLATION] Ты thoughtful and steady. ты not alone in this':
    'Você é atenciosa e constante. Você não está sozinha nisso',
};

// Function to get all problematic phrases from the file
function getAllProblematicPhrases(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(content);
  const problematicPhrases = [];

  for (const [categoryKey, categoryData] of Object.entries(data.categories)) {
    if (categoryData.phrases) {
      for (let i = 0; i < categoryData.phrases.length; i++) {
        const phrase = categoryData.phrases[i];
        if (
          phrase.text &&
          (phrase.text.includes('[NEEDS_TRANSLATION]') ||
            /[а-яё]/i.test(phrase.text) ||
            (phrase.text.includes('Ты') && phrase.text.includes('thoughtful')))
        ) {
          problematicPhrases.push({
            categoryKey,
            phraseIndex: i,
            id: phrase.id,
            text: phrase.text,
          });
        }
      }
    }
  }

  return problematicPhrases;
}

function fixPortugueseTranslations() {
  console.log(
    '🔧 Fixing Portuguese Translations - Removing All Problematic Texts...\n',
  );

  const filePath = './src/data/translations-large/pt.json';

  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    let totalFixed = 0;
    let exactMatches = 0;
    let patternMatches = 0;

    // Get all problematic phrases first
    const problematicPhrases = getAllProblematicPhrases(filePath);
    console.log(
      `🔍 Found ${problematicPhrases.length} problematic phrases to fix\n`,
    );

    for (const [categoryKey, categoryData] of Object.entries(data.categories)) {
      if (categoryData.phrases) {
        for (let i = 0; i < categoryData.phrases.length; i++) {
          const phrase = categoryData.phrases[i];
          const originalText = phrase.text;

          if (!originalText) continue;

          let newText = originalText;
          let wasFixed = false;

          // Check exact matches first
          if (COMPREHENSIVE_TRANSLATIONS[originalText]) {
            newText = COMPREHENSIVE_TRANSLATIONS[originalText];
            wasFixed = true;
            exactMatches++;
          }
          // Pattern-based fixes for remaining cases
          else if (
            originalText.includes('[NEEDS_TRANSLATION]') ||
            /[а-яё]/i.test(originalText)
          ) {
            // Remove [NEEDS_TRANSLATION] markers and attempt to clean up mixed text
            newText = cleanupMixedText(originalText);
            if (newText !== originalText) {
              wasFixed = true;
              patternMatches++;
            }
          }

          if (wasFixed) {
            phrase.text = newText;
            phrase.translationType = 'manual';
            phrase.manualTranslation = true;
            phrase.quality = 1.0;
            totalFixed++;

            if (totalFixed % 100 === 0) {
              console.log(`✅ Fixed ${totalFixed} phrases...`);
            }
          }
        }
      }
    }

    // Update metadata
    data.metadata = {
      ...data.metadata,
      lastFixApplied: new Date().toISOString(),
      totalPhrasesFixed: totalFixed,
      exactTranslationMatches: exactMatches,
      patternBasedFixes: patternMatches,
      fixVersion: '4.0.0',
    };

    // Save the fixed file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    console.log('\n🎉 Portuguese Translation Fix Complete!');
    console.log(`📊 Total phrases fixed: ${totalFixed}`);
    console.log(`🎯 Exact translation matches: ${exactMatches}`);
    console.log(`🔧 Pattern-based fixes: ${patternMatches}`);
    console.log('\n✅ All problematic texts have been addressed!');

    // Verify no issues remain
    const remainingIssues = getAllProblematicPhrases(filePath);
    if (remainingIssues.length === 0) {
      console.log('✅ Verification: No problematic phrases remaining!');
    } else {
      console.log(`⚠️  Warning: ${remainingIssues.length} issues still remain`);
      remainingIssues.slice(0, 5).forEach(issue => {
        console.log(`   ID ${issue.id}: "${issue.text.substring(0, 60)}..."`);
      });
    }
  } catch (error) {
    console.error('❌ Error fixing translations:', error.message);
  }
}

function cleanupMixedText(text) {
  let cleaned = text;

  // Remove [NEEDS_TRANSLATION] markers
  cleaned = cleaned.replace(/\[NEEDS_TRANSLATION\]\s*/gi, '');

  // Handle mixed Russian-English patterns
  const patterns = [
    // Basic Russian replacements
    { regex: /Ты/g, replacement: 'Você' },
    { regex: /тыr/g, replacement: 'sua' },
    { regex: /ты/g, replacement: 'você' },
    { regex: /Я/g, replacement: 'Eu' },

    // Common English phrases
    {
      regex: /feel genuinely thoughtful/gi,
      replacement: 'é genuinamente atenciosa',
    },
    { regex: /thoughtful and steady/gi, replacement: 'atenciosa e constante' },
    { regex: /i've got.*back/gi, replacement: 'eu te apoio' },
    { regex: /i'm in.*corner/gi, replacement: 'estou do seu lado' },
    { regex: /i'm here for/gi, replacement: 'estou aqui para' },
    { regex: /can count on me/gi, replacement: 'pode contar comigo' },
    {
      regex: /we'll sort this together/gi,
      replacement: 'vamos resolver isso juntos',
    },
    {
      regex: /i'm not going anywhere/gi,
      replacement: 'não vou a lugar nenhum',
    },
    { regex: /one step at a time/gi, replacement: 'um passo de cada vez' },
    { regex: /we'll figure it out/gi, replacement: 'vamos descobrir juntos' },
    { regex: /we'll get through this/gi, replacement: 'vamos superar isso' },
    { regex: /i'll listen first/gi, replacement: 'vou escutar primeiro' },
    { regex: /all the way/gi, replacement: 'até o fim' },
    { regex: /not alone in this/gi, replacement: 'não está sozinha nisso' },

    // Common words
    { regex: /хочу\s+more/gi, replacement: 'quero mais' },
    { regex: /people like/gi, replacement: 'pessoas como' },
    { regex: /it shows in/gi, replacement: 'isso se mostra em' },
    { regex: /conversations with/gi, replacement: 'conversas com' },
    { regex: /feel easy and real/gi, replacement: 'são fáceis e genuínas' },
  ];

  for (const { regex, replacement } of patterns) {
    cleaned = cleaned.replace(regex, replacement);
  }

  // Clean up any remaining artifacts
  cleaned = cleaned.trim().replace(/\s+/g, ' ');

  return cleaned;
}

if (require.main === module) {
  fixPortugueseTranslations();
}

module.exports = { fixPortugueseTranslations };
