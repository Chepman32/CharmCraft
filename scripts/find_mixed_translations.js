// Quick scanner to detect mixed-language strings across translation files
// Outputs report to mixed-translation-report.json in project root
const fs = require('fs');
const path = require('path');

const langs = ['ru','ua','es','pt','de','fr','ja','zh','ko'];

const report = {};

function isMixed(text, lang){
  const hasLatin = /[A-Za-z]/.test(text);
  switch(lang){
    case 'ru': return hasLatin && /[А-Яа-яЁё]/.test(text);
    case 'ua': return hasLatin && /[А-ЩЬЮЯЇІЄҐа-щьюяїієґ]/.test(text);
    case 'ja': return hasLatin && /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]/.test(text);
    case 'zh': return hasLatin && /[\u3400-\u4dbf\u4e00-\u9fff]/.test(text);
    case 'ko': return hasLatin && /[\u1100-\u11FF\u3130-\u318F\uAC00-\uD7AF]/.test(text);
    default: return hasLatin && /(\bYou\b|\byou\b|\blook\b|\blooks\b)/i.test(text);
  }
}

for (const lang of langs){
  const files = [
    path.join('src/data/translations', `${lang}.json`),
    path.join('src/data/translations-large', `${lang}.json`),
  ].filter(f => fs.existsSync(f));
  const entries = [];
  for (const file of files){
    try {
      const data = JSON.parse(fs.readFileSync(file,'utf8'));
      const cats = data.categories || {};
      for (const [ckey, cat] of Object.entries(cats)){
        const arr = (cat && cat.phrases) || [];
        for (const p of arr){
          if (p && typeof p.text === 'string' && isMixed(p.text, lang)){
            entries.push({ id: `${ckey}_${p.id}`, text: p.text, file: path.basename(file) });
          }
        }
      }
    } catch (e){
      entries.push({ error: `Failed to parse ${file}: ${e.message}` });
    }
  }
  report[lang] = { count: entries.length, samples: entries.slice(0, 50) };
}

fs.writeFileSync('mixed-translation-report.json', JSON.stringify(report, null, 2));
console.log('Report written to mixed-translation-report.json');

