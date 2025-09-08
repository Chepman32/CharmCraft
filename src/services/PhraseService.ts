import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Phrase,
  PhraseCategory,
  PhraseSituation,
  PhraseTone,
  PhrasesDatabase,
  PhraseData,
  convertPhraseDataToLegacy,
} from '../data/phraseTypes';
import {
  handleAsyncStorageError,
  handleDatabaseError,
} from '../utils/errorHandler';

const PHRASES_STORAGE_KEY = 'charmcraft_phrases';
const FAVORITES_STORAGE_KEY = 'charmcraft_favorites';
const USAGE_STATS_KEY = 'charmcraft_usage_stats';

export interface SearchFilters {
  category?: PhraseCategory;
  situation?: PhraseSituation;
  tone?: PhraseTone;
  tags?: string[];
  searchText?: string;
}

export interface UsageStats {
  phraseId: string;
  usageCount: number;
  lastUsed: Date;
}

class PhraseService {
  private phrases: Phrase[] = [];
  private phrasesDatabase: PhrasesDatabase | null = null;
  private favorites: string[] = [];
  private usageStats: Map<string, UsageStats> = new Map();
  private initialized = false;

  private async getCurrentLanguage(): Promise<string> {
    try {
      const savedLanguage = await AsyncStorage.getItem('charmcraft_language');
      return savedLanguage || 'en';
    } catch {
      return 'en';
    }
  }

  private async getLocalizedPhraseText(phraseId: string, language: string): Promise<string> {
    try {
      // Try to load translation file
      if (language !== 'en') {
        try {
          // Use static require for each supported language
          let translations;
          switch (language) {
            case 'ru':
              translations = require('../data/translations/ru.json');
              break;
            case 'es':
              translations = require('../data/translations/es.json');
              break;
            default:
              translations = null;
          }
          
          if (translations) {
            // Find the phrase in translations
            for (const [categoryKey, categoryData] of Object.entries(translations.categories)) {
              const translatedPhrase = (categoryData as any).phrases.find((p: PhraseData) => 
                `${categoryKey}_${p.id}` === phraseId
              );
              if (translatedPhrase) {
                return translatedPhrase.text;
              }
            }
          }
        } catch (translationError) {
          console.warn(`Translation file for ${language} not found:`, translationError);
        }
      }
      
      // Fallback to original phrase text
      const originalPhrase = this.phrases.find(p => p.id === phraseId);
      return originalPhrase?.text || '';
    } catch (error) {
      console.warn('Failed to load translation:', error);
      // Fallback to original phrase text
      const originalPhrase = this.phrases.find(p => p.id === phraseId);
      return originalPhrase?.text || '';
    }
  }

  private async loadPhrasesFromJSON(): Promise<void> {
    try {
      const language = await this.getCurrentLanguage();
      
      // Load main phrases database using require for React Native
      const phrasesData = require('../data/phrases.json') as PhrasesDatabase;
      this.phrasesDatabase = phrasesData;
      
      // Convert JSON data to legacy format
      this.phrases = [];
      for (const [categoryKey, categoryData] of Object.entries(this.phrasesDatabase.categories)) {
        for (const phraseData of categoryData.phrases) {
          const legacyPhrase = convertPhraseDataToLegacy(phraseData, categoryKey, language);
          this.phrases.push(legacyPhrase);
        }
      }
      
      console.log(`✅ Loaded ${this.phrases.length} phrases from JSON database`);
    } catch (error) {
      console.error('Failed to load phrases from JSON:', error);
      handleDatabaseError(error);
      // Fallback to empty array
      this.phrases = [];
      this.phrasesDatabase = null;
    }
  }

  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      // Check if AsyncStorage is available
      if (!AsyncStorage) {
        throw new Error('AsyncStorage is not available');
      }

      // Load phrases from JSON files
      await this.loadPhrasesFromJSON();

      // Load favorites
      const storedFavorites = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
      if (storedFavorites) {
        this.favorites = JSON.parse(storedFavorites);
      }

      // Load usage stats
      const storedStats = await AsyncStorage.getItem(USAGE_STATS_KEY);
      if (storedStats) {
        const statsArray = JSON.parse(storedStats);
        this.usageStats = new Map(
          statsArray.map((stat: any) => [
            stat.phraseId,
            { ...stat, lastUsed: new Date(stat.lastUsed) },
          ]),
        );
      }

      this.initialized = true;
    } catch (error) {
      handleAsyncStorageError(error);
      // Fallback to empty array
      this.phrases = [];
      this.initialized = true;
    }
  }

  private async savePhrases(): Promise<void> {
    try {
      if (!AsyncStorage) {
        console.warn('AsyncStorage not available, skipping save');
        return;
      }
      await AsyncStorage.setItem(
        PHRASES_STORAGE_KEY,
        JSON.stringify(this.phrases),
      );
    } catch (error) {
      console.error('Error saving phrases:', error);
    }
  }

  private async saveFavorites(): Promise<void> {
    try {
      if (!AsyncStorage) {
        console.warn('AsyncStorage not available, skipping save');
        return;
      }
      await AsyncStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify(this.favorites),
      );
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  }

  private async saveUsageStats(): Promise<void> {
    try {
      if (!AsyncStorage) {
        console.warn('AsyncStorage not available, skipping save');
        return;
      }
      const statsArray = Array.from(this.usageStats.entries()).map(
        ([phraseId, stats]) => ({
          phraseId,
          usageCount: stats.usageCount,
          lastUsed: stats.lastUsed.toISOString(),
        }),
      );
      await AsyncStorage.setItem(USAGE_STATS_KEY, JSON.stringify(statsArray));
    } catch (error) {
      console.error('Error saving usage stats:', error);
    }
  }

  async searchPhrases(filters: SearchFilters = {}): Promise<Phrase[]> {
    await this.initialize();

    let filteredPhrases = [...this.phrases];

    // Filter by category
    if (filters.category) {
      filteredPhrases = filteredPhrases.filter(
        phrase => phrase.category === filters.category,
      );
    }

    // Filter by situation
    if (filters.situation) {
      filteredPhrases = filteredPhrases.filter(
        phrase => phrase.situation === filters.situation,
      );
    }

    // Filter by tone
    if (filters.tone) {
      filteredPhrases = filteredPhrases.filter(
        phrase => phrase.tone === filters.tone,
      );
    }

    // Filter by tags
    if (filters.tags && filters.tags.length > 0) {
      filteredPhrases = filteredPhrases.filter(phrase =>
        filters.tags!.some(tag => phrase.tags.includes(tag)),
      );
    }

    // Filter by search text
    if (filters.searchText) {
      const searchLower = filters.searchText.toLowerCase();
      filteredPhrases = filteredPhrases.filter(
        phrase =>
          phrase.text.toLowerCase().includes(searchLower) ||
          phrase.tags.some(tag => tag.toLowerCase().includes(searchLower)),
      );
    }

    // Apply localization to phrase text based on selected language
    const lang = await this.getCurrentLanguage();
    const localizedPhrases = await Promise.all(
      filteredPhrases.map(async p => ({
        ...p,
        text: await this.getLocalizedPhraseText(p.id, lang),
      }))
    );
    return localizedPhrases;
  }

  async getRandomPhrase(filters: SearchFilters = {}): Promise<Phrase | null> {
    const phrases = await this.searchPhrases(filters);
    if (phrases.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * phrases.length);
    return phrases[randomIndex];
  }

  async addToFavorites(phraseId: string): Promise<void> {
    await this.initialize();
    if (!this.favorites.includes(phraseId)) {
      this.favorites.push(phraseId);
      await this.saveFavorites();
    }
  }

  async removeFromFavorites(phraseId: string): Promise<void> {
    await this.initialize();
    this.favorites = this.favorites.filter(id => id !== phraseId);
    await this.saveFavorites();
  }

  async getFavorites(): Promise<Phrase[]> {
    await this.initialize();
    const lang = await this.getCurrentLanguage();
    const favoritePhrases = this.phrases.filter(phrase => this.favorites.includes(phrase.id));
    
    const localizedPhrases = await Promise.all(
      favoritePhrases.map(async p => ({
        ...p,
        text: await this.getLocalizedPhraseText(p.id, lang),
      }))
    );
    return localizedPhrases;
  }

  isFavorite(phraseId: string): boolean {
    return this.favorites.includes(phraseId);
  }

  async recordUsage(phraseId: string): Promise<void> {
    await this.initialize();

    const existing = this.usageStats.get(phraseId);
    if (existing) {
      existing.usageCount++;
      existing.lastUsed = new Date();
    } else {
      this.usageStats.set(phraseId, {
        phraseId,
        usageCount: 1,
        lastUsed: new Date(),
      });
    }

    await this.saveUsageStats();
  }

  async getMostUsedPhrases(limit: number = 10): Promise<Phrase[]> {
    await this.initialize();

    const sortedStats = Array.from(this.usageStats.values())
      .sort((a, b) => b.usageCount - a.usageCount)
      .slice(0, limit);

    const lang = await this.getCurrentLanguage();
    const mostUsedPhrases = this.phrases
      .filter(phrase => sortedStats.some(stat => stat.phraseId === phrase.id));
    
    const localizedPhrases = await Promise.all(
      mostUsedPhrases.map(async p => ({
        ...p,
        text: await this.getLocalizedPhraseText(p.id, lang),
      }))
    );
    return localizedPhrases;
  }

  async getAllCategories(): Promise<PhraseCategory[]> {
    return Object.values(PhraseCategory);
  }

  async getAllSituations(): Promise<PhraseSituation[]> {
    return Object.values(PhraseSituation);
  }

  async getAllTones(): Promise<PhraseTone[]> {
    return Object.values(PhraseTone);
  }
}

export default new PhraseService();
