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
  private currentLanguage: string | null = null;
  private translationMap: Map<string, string> = new Map();

  // Helper: accept only manual translations from JSON dictionaries
  private isManualTranslationEntry(p: any): boolean {
    if (!p) return false;
    if (typeof p.manualTranslation === 'boolean') return p.manualTranslation === true;
    if (typeof p.translationType === 'string') return p.translationType === 'manual';
    // If no flags are present (small dictionaries), treat as manual content
    return true;
  }

  // Lazy loading configuration
  private readonly CHUNK_SIZE = 1000; // Load phrases in chunks
  private readonly MAX_MEMORY_PHRASES = 20000; // Keep max phrases in memory (raised)
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
      // Fast path: use prebuilt translation map if available
      if (this.translationMap.size > 0) {
        const hit = this.translationMap.get(phraseId);
        if (hit) return hit;
        // Not translated manually – fall back immediately to original text
        const original = this.phrases.find(p => p.id === phraseId)?.text || '';
        return original;
      }
      // Try to load translation file
      if (language !== 'en') {
        try {
          // Prefer large translations when using the large dataset; fallback to small
          let translations;
          const preferLarge = this.useLargeDataset;
          switch (language) {
            case 'ru':
              try {
                translations = preferLarge
                  ? require('../data/translations-large/ru.json')
                  : require('../data/translations/ru.json');
              } catch {
                try {
                  translations = preferLarge
                    ? require('../data/translations/ru.json')
                    : require('../data/translations-large/ru.json');
                } catch {
                  translations = null;
                }
              }
              break;
            case 'es':
              try {
                translations = preferLarge
                  ? require('../data/translations-large/es.json')
                  : require('../data/translations/es.json');
              } catch {
                try {
                  translations = preferLarge
                    ? require('../data/translations/es.json')
                    : require('../data/translations-large/es.json');
                } catch {
                  translations = null;
                }
              }
              break;
            case 'de':
              try {
                translations = preferLarge
                  ? require('../data/translations-large/de.json')
                  : require('../data/translations/de.json');
              } catch {
                try {
                  translations = preferLarge
                    ? require('../data/translations/de.json')
                    : require('../data/translations-large/de.json');
                } catch {
                  translations = null;
                }
              }
              break;
            case 'fr':
              try {
                translations = preferLarge
                  ? require('../data/translations-large/fr.json')
                  : require('../data/translations/fr.json');
              } catch {
                try {
                  translations = preferLarge
                    ? require('../data/translations/fr.json')
                    : require('../data/translations-large/fr.json');
                } catch {
                  translations = null;
                }
              }
              break;
            case 'pt':
              try {
                translations = preferLarge
                  ? require('../data/translations-large/pt.json')
                  : require('../data/translations/pt.json');
              } catch {
                try {
                  translations = preferLarge
                    ? require('../data/translations/pt.json')
                    : require('../data/translations-large/pt.json');
                } catch {
                  translations = null;
                }
              }
              break;
            case 'ja':
              try {
                translations = preferLarge
                  ? require('../data/translations-large/ja.json')
                  : require('../data/translations/ja.json');
              } catch {
                try {
                  translations = preferLarge
                    ? require('../data/translations/ja.json')
                    : require('../data/translations-large/ja.json');
                } catch {
                  translations = null;
                }
              }
              break;
            case 'zh':
              try {
                translations = preferLarge
                  ? require('../data/translations-large/zh.json')
                  : require('../data/translations/zh.json');
              } catch {
                try {
                  translations = preferLarge
                    ? require('../data/translations/zh.json')
                    : require('../data/translations-large/zh.json');
                } catch {
                  translations = null;
                }
              }
              break;
            case 'ko':
              try {
                translations = preferLarge
                  ? require('../data/translations-large/ko.json')
                  : require('../data/translations/ko.json');
              } catch {
                try {
                  translations = preferLarge
                    ? require('../data/translations/ko.json')
                    : require('../data/translations-large/ko.json');
                } catch {
                  translations = null;
                }
              }
              break;
            case 'ua':
              try {
                // Large UA translation file is invalid; use small only
                translations = require('../data/translations/ua.json');
              } catch {
                translations = null;
              }
              break;
            default:
              translations = null;
          }

          if (translations) {
            // Find the phrase in translations but only if marked as manual
            for (const [categoryKey, categoryData] of Object.entries(translations.categories)) {
              const translatedPhrase = (categoryData as any).phrases.find((p: any) =>
                `${categoryKey}_${p.id}` === phraseId && this.isManualTranslationEntry(p)
              );
              if (translatedPhrase) {
                this.translationMap.set(phraseId, (translatedPhrase as any).text);
                return (translatedPhrase as any).text;
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

  /**
   * Build a translation index for the active language, preferring large files.
   */
  private async buildTranslationIndex(language: string): Promise<void> {
    this.translationMap.clear();
    if (language === 'en') return; // English uses source text

    let dict: any = null;
    let alt: any = null;
    // Use static requires for Metro compatibility
    switch (language) {
      case 'ru':
        dict = this.useLargeDataset ? require('../data/translations-large/ru.json') : null;
        alt = require('../data/translations/ru.json');
        break;
      case 'es':
        dict = this.useLargeDataset ? require('../data/translations-large/es.json') : null;
        alt = require('../data/translations/es.json');
        break;
      case 'de':
        dict = this.useLargeDataset ? require('../data/translations-large/de.json') : null;
        alt = require('../data/translations/de.json');
        break;
      case 'fr':
        dict = this.useLargeDataset ? require('../data/translations-large/fr.json') : null;
        alt = require('../data/translations/fr.json');
        break;
      case 'pt':
        dict = this.useLargeDataset ? require('../data/translations-large/pt.json') : null;
        alt = require('../data/translations/pt.json');
        break;
      case 'ja':
        dict = this.useLargeDataset ? require('../data/translations-large/ja.json') : null;
        alt = require('../data/translations/ja.json');
        break;
      case 'zh':
        dict = this.useLargeDataset ? require('../data/translations-large/zh.json') : null;
        alt = require('../data/translations/zh.json');
        break;
      case 'ko':
        dict = this.useLargeDataset ? require('../data/translations-large/ko.json') : null;
        alt = require('../data/translations/ko.json');
        break;
      case 'ua':
        // Skip large UA file (invalid JSON); only include small dictionary
        dict = null;
        alt = require('../data/translations/ua.json');
        break;
      default:
        dict = null;
        alt = null;
    }

    const addToIndex = (translations: any) => {
      if (!translations || !translations.categories) return;
      for (const [categoryKey, categoryData] of Object.entries(translations.categories)) {
        const phrases = (categoryData as any).phrases as PhraseData[] | undefined;
        if (!Array.isArray(phrases)) continue;
        for (const p of phrases) {
          const id = `${categoryKey}_${(p as any).id}`;
          // Only index manual translations; skip automated or mixed ones
          if (!this.translationMap.has(id) && this.isManualTranslationEntry(p)) {
            this.translationMap.set(id, (p as any).text);
          }
        }
      }
    };

    if (dict) addToIndex(dict);
    if (alt) addToIndex(alt);
  }

  /**
   * Determines whether we can safely use the large dataset for the
   * current language. We only use it for English or when a corresponding
   * large translation file exists for the language.
   */
  private canUseLargeDatasetForLanguage(language: string): boolean {
    // Allow large dataset for all languages; text localizes via manual-only dictionary
    return true;
  }

  private async loadPhrasesFromJSON(): Promise<void> {
    try {
      const language = await this.getCurrentLanguage();
      this.currentLanguage = language;
      
      try {
        // Prefer large dataset for breadth; show manual translations where available,
        // otherwise the original English phrase text.
        this.largePhrasesDatabase = require('../data/phrases-large.json') as PhrasesDatabase;
        this.useLargeDataset = true;
        console.log('✅ Large dataset enabled (lazy loading)');
        await this.loadInitialPhrases();
      } catch (largeError) {
        console.log('Large dataset not found, using standard dataset');
        const phrasesData = require('../data/phrases.json') as PhrasesDatabase;
        this.phrasesDatabase = phrasesData;
        this.useLargeDataset = false;
        this.phrases = [];
        for (const [categoryKey, categoryData] of Object.entries(this.phrasesDatabase.categories)) {
          for (const phraseData of categoryData.phrases) {
            const legacyPhrase = convertPhraseDataToLegacy(phraseData, categoryKey, language, false);
            this.phrases.push(legacyPhrase);
          }
        }
      }

      // Build translation index for current language
      await this.buildTranslationIndex(language);
      
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
        // Count only phrases that came from this exact large category by id prefix
        const currentCount = this.phrases.filter(p => p.id.startsWith(`${category}_`)).length;
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
        // Count only phrases that came from this exact large category by id prefix
        const currentCount = this.phrases.filter(p => p.id.startsWith(`${categoryKey}_`)).length;
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

      // Load phrases from JSON files (respect active language)
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

  /**
   * Ensure our in-memory dataset matches the current language settings.
   * Reloads data if the language has changed since last load.
   */
  private async ensureLanguageSynced(): Promise<void> {
    const lang = await this.getCurrentLanguage();
    if (this.currentLanguage !== lang) {
      // Reset state tied to dataset to avoid mixing data
      this.loadedCategories.clear();
      this.phrases = [];
      this.phrasesDatabase = null;
      this.largePhrasesDatabase = null;
      this.useLargeDataset = false;
      await this.loadPhrasesFromJSON();
    }
  }

  async searchPhrases(filters: SearchFilters = {}, loadMore: boolean = true): Promise<Phrase[]> {
    await this.initialize();
    await this.ensureLanguageSynced();

    let filteredPhrases = [...this.phrases];

    // Keep full breadth of phrases; manual translations are applied where available

    // Apply filters first so we can decide whether to load more based on filtered count
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

    // If using large dataset and filtered results look sparse, load more from relevant category
    if (this.useLargeDataset && loadMore) {
      const threshold = 100; // ensure at least this many per search
      if (filteredPhrases.length < threshold) {
        if (filters.category) {
          const keys = this.getAllLargeKeysForLegacy(filters.category);
          const perKey = Math.max(1, Math.floor(this.CHUNK_SIZE / Math.max(1, keys.length)));
          for (const k of keys) {
            await this.loadMorePhrases(k, perKey);
          }
        } else {
          await this.loadMorePhrases(undefined);
        }
        // Recompute after loading more
        filteredPhrases = [...this.phrases];
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
      }
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

  // Ensure at least a minimum number of phrases are loaded for a given legacy category
  async ensureMinPhrases(minCount: number, category?: PhraseCategory): Promise<void> {
    await this.initialize();
    await this.ensureLanguageSynced();
    if (!this.useLargeDataset || !this.largePhrasesDatabase) return;

    const countFor = (): number => {
      if (!category) return this.phrases.length;
      return this.phrases.filter(p => p.category === category).length;
    };

    let attempts = 0;
    const maxAttempts = 20; // safety guard
    while (countFor() < minCount && attempts < maxAttempts) {
      if (category) {
        const keys = this.getAllLargeKeysForLegacy(category);
        const perKey = Math.max(250, Math.floor(this.CHUNK_SIZE / Math.max(1, keys.length)));
        for (const k of keys) {
          await this.loadMorePhrases(k, perKey);
        }
      } else {
        await this.loadMorePhrases(undefined);
      }
      attempts++;
    }
  }

  // New method to load more phrases on demand
  async loadMorePhrasesOnDemand(category?: PhraseCategory): Promise<void> {
    if (!this.useLargeDataset) return;
    if (category) {
      const keys = this.getAllLargeKeysForLegacy(category);
      const perKey = Math.max(1, Math.floor(this.CHUNK_SIZE / Math.max(1, keys.length)));
      for (const k of keys) {
        await this.loadMorePhrases(k, perKey);
      }
    } else {
      await this.loadMorePhrases(undefined);
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

  // For large dataset: return all category keys that map to a given legacy category
  private getAllLargeKeysForLegacy(category: PhraseCategory): string[] {
    const keys: string[] = [];
    for (const [key, value] of Object.entries(LARGE_CATEGORY_MAPPING)) {
      if (value === category) keys.push(key);
    }
    // Fallback to a single key if none matched
    if (keys.length === 0) keys.push(this.getCategoryKeyFromLegacy(category));
    return keys;
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
    await this.ensureLanguageSynced();
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

  async getMostUsedPhrases(limit: number = 1000): Promise<Phrase[]> {
    await this.initialize();
    await this.ensureLanguageSynced();

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
