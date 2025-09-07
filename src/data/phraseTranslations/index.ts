import { Phrase } from '../../data/phrases';
import { phraseTranslationsEs } from './es';
import { phraseTranslationsRu } from './ru';
import { phraseTranslationsDe } from './de';
import { phraseTranslationsFr } from './fr';
import { phraseTranslationsPt } from './pt';
import { phraseTranslationsJa } from './ja';
import { phraseTranslationsZh } from './zh';
import { phraseTranslationsKo } from './ko';
import { phraseTranslationsUa } from './ua';

// Registry of available phrase translations per language code
export const phraseTranslationsByLang: Record<string, Record<string, string>> = {
  es: phraseTranslationsEs,
  ru: phraseTranslationsRu,
  de: phraseTranslationsDe,
  fr: phraseTranslationsFr,
  pt: phraseTranslationsPt,
  ja: phraseTranslationsJa,
  zh: phraseTranslationsZh,
  ko: phraseTranslationsKo,
  ua: phraseTranslationsUa,
  // Additional languages can be added here, e.g.:
  // fr: phraseTranslationsFr,
  // de: phraseTranslationsDe,
};

export function getLocalizedPhraseText(
  phrase: Phrase,
  language: string,
): string {
  const langMap = phraseTranslationsByLang[language];
  if (langMap && langMap[phrase.id]) return langMap[phrase.id];
  return phrase.text;
}
