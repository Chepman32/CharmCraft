import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
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

const LANGUAGE_STORAGE_KEY = 'charmcraft_language';

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
      const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (
        savedLanguage &&
        translations[savedLanguage as keyof typeof translations]
      ) {
        setLanguageState(savedLanguage);
        setCurrentTranslations({
          ...translations[savedLanguage as keyof typeof translations],
        });
      }
    } catch (error) {
      console.error('Error loading language:', error);
      console.warn('Using default English language due to loading error');
      // Use default English - already set in initial state
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
      } catch (error) {
        console.error('Error saving language:', error);
        // Still apply language in memory even if saving fails
        setLanguageState(newLanguage);
        setCurrentTranslations({
          ...translations[newLanguage as keyof typeof translations],
        });
        console.warn('Language applied in memory only due to storage error');
      }
    } else {
      console.error(`Invalid language code: ${newLanguage}`);
      console.warn('Language not changed due to invalid code');
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
