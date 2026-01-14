import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { NativeModules, Platform, I18nManager } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  translations,
  languages,
  Language,
  Translations,
} from '../localization';

interface LocalizationContextType {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
  availableLanguages: Language[];
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(
  undefined,
);

const LANGUAGE_STORAGE_KEY = 'kissio_language';
const ONBOARDING_STORAGE_KEY = 'kissio_onboarding_complete';

const getSupportedLanguage = (locale?: string | null): string | null => {
  if (!locale) return null;
  const normalized = locale.replace(/_/g, '-').toLowerCase();
  const base = normalized.split('-')[0];
  const mapped = base === 'uk' ? 'ua' : base;
  return languages.some((lang) => lang.code === mapped) ? mapped : null;
};

const getLocaleFromI18nManager = (): string | null => {
  const i18nManager = NativeModules.I18nManager;
  return (
    i18nManager?.localeIdentifier ||
    i18nManager?.getConstants?.().localeIdentifier ||
    I18nManager.getConstants?.().localeIdentifier ||
    null
  );
};

const getDeviceLocale = (): string | null => {
  try {
    if (Platform.OS === 'ios') {
      const settingsManager = NativeModules.SettingsManager;
      const settings =
        settingsManager?.settings || settingsManager?.getConstants?.().settings;
      const locale =
        settings?.AppleLocale ||
        (Array.isArray(settings?.AppleLanguages)
          ? settings?.AppleLanguages?.[0]
          : null);
      if (locale) {
        return locale;
      }
    }
    return getLocaleFromI18nManager();
  } catch {
    return null;
  }
};

const getDeviceLanguage = (): string | null => {
  const nativeLocale = getDeviceLocale();
  const nativeMatch = getSupportedLanguage(nativeLocale);
  if (nativeMatch) return nativeMatch;
  try {
    const intlLocale = Intl.DateTimeFormat().resolvedOptions().locale;
    return getSupportedLanguage(intlLocale);
  } catch {
    return null;
  }
};

interface LocalizationProviderProps {
  children: ReactNode;
}

export const LocalizationProvider: React.FC<LocalizationProviderProps> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<string>('en');
  const [currentTranslations, setCurrentTranslations] = useState<Translations>(
    translations.en,
  );

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const [savedLanguage, onboardingStatus] = await Promise.all([
        AsyncStorage.getItem(LANGUAGE_STORAGE_KEY),
        AsyncStorage.getItem(ONBOARDING_STORAGE_KEY),
      ]);
      const onboardingComplete =
        onboardingStatus !== null ? JSON.parse(onboardingStatus) : false;
      const savedIsValid =
        savedLanguage &&
        translations[savedLanguage as keyof typeof translations];

      if (savedIsValid && onboardingComplete) {
        setLanguageState(savedLanguage);
        setCurrentTranslations({
          ...translations[savedLanguage as keyof typeof translations],
        });
        return;
      }

      const deviceLanguage = getDeviceLanguage();
      const nextLanguage =
        deviceLanguage || (savedIsValid ? savedLanguage : null) || 'en';

      setLanguageState(nextLanguage);
      setCurrentTranslations({
        ...translations[nextLanguage as keyof typeof translations],
      });

      if (nextLanguage !== savedLanguage) {
        await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
      }
    } catch {
    }
  };

  const setLanguage = async (newLanguage: string) => {
    if (translations[newLanguage as keyof typeof translations]) {
      try {
        await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, newLanguage);
        setLanguageState(newLanguage);
        // Create a new object reference to ensure re-renders
        setCurrentTranslations({
          ...translations[newLanguage as keyof typeof translations],
        });
      } catch {
        setLanguageState(newLanguage);
        setCurrentTranslations({
          ...translations[newLanguage as keyof typeof translations],
        });
      }
    }
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = currentTranslations;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to English if key not found
        let fallbackValue: any = translations.en;
        for (const fallbackKey of keys) {
          if (
            fallbackValue &&
            typeof fallbackValue === 'object' &&
            fallbackKey in fallbackValue
          ) {
            fallbackValue = fallbackValue[fallbackKey];
          } else {
            return key; // Return key if not found in fallback either
          }
        }
        return fallbackValue;
      }
    }

    return typeof value === 'string' ? value : key;
  };

  const value: LocalizationContextType = {
    language,
    setLanguage,
    t,
    availableLanguages: languages,
  };

  return (
    <LocalizationContext.Provider value={value}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useTranslation = (): LocalizationContextType => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error(
      'useTranslation must be used within a LocalizationProvider',
    );
  }
  return context;
};
