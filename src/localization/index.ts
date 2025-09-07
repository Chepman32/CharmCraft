import { en } from './translations/en';
import { ru } from './translations/ru';
import { es } from './translations/es';
import { de } from './translations/de';
import { fr } from './translations/fr';
import { pt } from './translations/pt';
import { ja } from './translations/ja';
import { zh } from './translations/zh';
import { ko } from './translations/ko';
import { ua } from './translations/ua';

export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

export const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
  { code: 'ua', name: 'Ukrainian', nativeName: 'Українська' },
];

export const translations = {
  en,
  ru,
  es,
  de,
  fr,
  pt,
  ja,
  zh,
  ko,
  ua,
};

export type TranslationKey = keyof typeof en;
export type Translations = typeof en;
