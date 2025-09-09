import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Phrase,
  PhraseCategory,
  PhraseSituation,
  PhraseTone,
  PhrasesDatabase,
  PhraseData,
  convertPhraseDataToLegacy,
  LARGE_CATEGORY_MAPPING,
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
  private largePhrasesDatabase: PhrasesDatabase | null = null;
  private loadedCategories: Set<string> = new Set();
  private favorites: string[] = [];
  private usageStats: Map<string, UsageStats> = new Map();
  private initialized = false;
  private useLargeDataset = false;

  // Lazy loading configuration
  private readonly CHUNK_SIZE = 1000; // Load phrases in chunks
  private readonly MAX_MEMORY_PHRASES = 5000; // Keep max phrases in memory
  private readonly INITIAL_LOAD_SIZE = 50; // Initial phrases per category

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
          // First try to load from large dataset translations
          let translations;
          switch (language) {
            case 'ru':
              try {
                translations = require('../data/translations-large/ru.json');
              } catch {
                translations = require('../data/translations/ru.json');
              }
              break;
            case 'es':
              try {
                translations = require('../data/translations-large/es.json');
              } catch {
                translations = require('../data/translations/es.json');
              }
              break;
            case 'de':
              try {
                translations = require('../data/translations-large/de.json');
              } catch {
                translations = require('../data/translations/de.json');
              }
              break;
            case 'fr':
              try {
                translations = require('../data/translations-large/fr.json');
              } catch {
                translations = require('../data/translations/fr.json');
              }
              break;
            case 'pt':
              try {
                translations = require('../data/translations-large/pt.json');
              } catch {
                translations = require('../data/translations/pt.json');
              }
              break;
            case 'ja':
              try {
                translations = require('../data/translations-large/ja.json');
              } catch {
                translations = require('../data/translations/ja.json');
              }
              break;
            case 'zh':
              try {
                translations = require('../data/translations-large/zh.json');
              } catch {
                translations = require('../data/translations/zh.json');
              }
              break;
            case 'ko':
              try {
                translations = require('../data/translations-large/ko.json');
              } catch {
                translations = require('../data/translations/ko.json');
              }
              break;
            case 'ua':
              try {
                translations = require('../data/translations-large/ua.json');
              } catch {
                translations = require('../data/translations/ua.json');
              }
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
      
      // Try to load large dataset first
      try {
        this.largePhrasesDatabase = require('../data/phrases-large.json') as PhrasesDatabase;
        this.useLargeDataset = true;
        console.log('✅ Large dataset available - using lazy loading');
        
        // Load only a small subset initially
        await this.loadInitialPhrases();
      } catch (largeError) {
        console.log('Large dataset not found, using standard dataset');
        // Fallback to standard dataset
        const phrasesData = require('../data/phrases.json') as PhrasesDatabase;
        this.phrasesDatabase = phrasesData;
        this.useLargeDataset = false;
        
        // Convert JSON data to legacy format
        this.phrases = [];
        for (const [categoryKey, categoryData] of Object.entries(this.phrasesDatabase.categories)) {
          for (const phraseData of categoryData.phrases) {
            const legacyPhrase = convertPhraseDataToLegacy(phraseData, categoryKey, language, false);
            this.phrases.push(legacyPhrase);
          }
        }
      }
      
      console.log(`✅ Loaded ${this.phrases.length} phrases from JSON database`);
    } catch (error) {
      console.error('Failed to load phrases from JSON:', error);
      handleDatabaseError(error);
      this.phrases = [];
      this.phrasesDatabase = null;
    }
  }

  private async loadInitialPhrases(): Promise<void> {
    if (!this.largePhrasesDatabase) return;
    
    const language = await this.getCurrentLanguage();
    this.phrases = [];
    
    // Load first few phrases from each category
    for (const [categoryKey, categoryData] of Object.entries(this.largePhrasesDatabase.categories)) {
      const initialPhrases = categoryData.phrases.slice(0, this.INITIAL_LOAD_SIZE);
      for (const phraseData of initialPhrases) {
        const legacyPhrase = convertPhraseDataToLegacy(phraseData, categoryKey, language, true);
        this.phrases.push(legacyPhrase);
      }
      this.loadedCategories.add(categoryKey);
    }
  }

  private async loadMorePhrases(category?: string, limit: number = this.CHUNK_SIZE): Promise<void> {
    if (!this.largePhrasesDatabase) return;
    
    const language = await this.getCurrentLanguage();
    
    if (category) {
      // Load more phrases for specific category
      const categoryData = this.largePhrasesDatabase.categories[category];
      if (categoryData) {
        const currentCount = this.phrases.filter(p => p.category === LARGE_CATEGORY_MAPPING[category]).length;
        const newPhrases = categoryData.phrases.slice(currentCount, currentCount + limit);
        
        for (const phraseData of newPhrases) {
          const legacyPhrase = convertPhraseDataToLegacy(phraseData, category, language, true);
          this.phrases.push(legacyPhrase);
        }
      }
    } else {
      // Load more phrases from all categories
      const categories = Object.keys(this.largePhrasesDatabase.categories);
      const phrasesPerCategory = Math.floor(limit / categories.length);
      
      for (const categoryKey of categories) {
        const categoryData = this.largePhrasesDatabase.categories[categoryKey];
        const currentCount = this.phrases.filter(p => p.category === LARGE_CATEGORY_MAPPING[categoryKey]).length;
        const newPhrases = categoryData.phrases.slice(currentCount, currentCount + phrasesPerCategory);
        
        for (const phraseData of newPhrases) {
          const legacyPhrase = convertPhraseDataToLegacy(phraseData, categoryKey, language, true);
          this.phrases.push(legacyPhrase);
        }
      }
    }
    
    // Clean up memory if we have too many phrases
    if (this.phrases.length > this.MAX_MEMORY_PHRASES) {
      // Keep the most recent phrases
      this.phrases = this.phrases.slice(-this.MAX_MEMORY_PHRASES);
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

  async searchPhrases(filters: SearchFilters = {}, loadMore: boolean = true): Promise<Phrase[]> {
    await this.initialize();

    let filteredPhrases = [...this.phrases];

    // If using large dataset and we need more results, load more phrases
    if (this.useLargeDataset && loadMore && filteredPhrases.length < 100) {
      const categoryKey = filters.category ? this.getCategoryKeyFromLegacy(filters.category) : undefined;
      await this.loadMorePhrases(categoryKey);
      filteredPhrases = [...this.phrases];
    }

    // Apply filters
    if (filters.category) {
      filteredPhrases = filteredPhrases.filter(
        phrase => phrase.category === filters.category,
      );
    }

    if (filters.situation) {
      filteredPhrases = filteredPhrases.filter(
        phrase => phrase.situation === filters.situation,
      );
    }

    if (filters.tone) {
      filteredPhrases = filteredPhrases.filter(
        phrase => phrase.tone === filters.tone,
      );
    }

    if (filters.tags && filters.tags.length > 0) {
      filteredPhrases = filteredPhrases.filter(phrase =>
        filters.tags!.some(tag => phrase.tags.includes(tag)),
      );
    }

    if (filters.searchText) {
      const searchLower = filters.searchText.toLowerCase();
      filteredPhrases = filteredPhrases.filter(
        phrase =>
          phrase.text.toLowerCase().includes(searchLower) ||
          phrase.tags.some(tag => tag.toLowerCase().includes(searchLower)),
      );
    }

    // Apply localization
    const lang = await this.getCurrentLanguage();
    const localizedPhrases = await Promise.all(
      filteredPhrases.map(async p => ({
        ...p,
        text: await this.getLocalizedPhraseText(p.id, lang),
      }))
    );
    
    return localizedPhrases;
  }

  // New method to get total phrase count
  async getTotalPhraseCount(): Promise<number> {
    if (this.useLargeDataset && this.largePhrasesDatabase) {
      return Object.values(this.largePhrasesDatabase.categories)
        .reduce((sum, cat) => sum + cat.phrases.length, 0);
    }
    return this.phrases.length;
  }

  // New method to load more phrases on demand
  async loadMorePhrasesOnDemand(category?: PhraseCategory): Promise<void> {
    if (this.useLargeDataset) {
      const categoryKey = category ? this.getCategoryKeyFromLegacy(category) : undefined;
      await this.loadMorePhrases(categoryKey);
    }
  }

  private getCategoryKeyFromLegacy(category: PhraseCategory): string {
    const reverseMapping: Record<PhraseCategory, string> = {
      [PhraseCategory.CONVERSATION_STARTER]: 'icebreakers',
      [PhraseCategory.COMPLIMENT]: 'compliments_appearance',
      [PhraseCategory.ROMANTIC]: 'asking_out',
      [PhraseCategory.DEEP]: 'deepening_connection',
      [PhraseCategory.FLIRTY]: 'flirting',
      [PhraseCategory.GOOD_MORNING]: 'good_morning_night',
      [PhraseCategory.GOODNIGHT]: 'good_morning_night',
      [PhraseCategory.SUPPORTIVE]: 'support_encouragement',
      [PhraseCategory.FUNNY]: 'playful_challenges',
      [PhraseCategory.APOLOGY]: 'conflict_resolution_light',
      [PhraseCategory.CASUAL]: 'icebreakers',
      [PhraseCategory.RELATIONSHIP_BUILDING]: 'future_plans',
    };
    return reverseMapping[category] || 'icebreakers';
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
}

export default new PhraseService();