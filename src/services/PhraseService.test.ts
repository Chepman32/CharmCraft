// Simple test to verify PhraseService works
import PhraseService from './PhraseService';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
}));

describe('PhraseService', () => {
  beforeEach(() => {
    // Reset the service state
    (PhraseService as any).initialized = false;
    (PhraseService as any).phrases = [];
  });

  it('should initialize with sample phrases when no stored data exists', async () => {
    await PhraseService.initialize();
    const phrases = await PhraseService.searchPhrases();

    expect(phrases.length).toBeGreaterThan(0);
    expect(phrases[0]).toHaveProperty('id');
    expect(phrases[0]).toHaveProperty('text');
    expect(phrases[0]).toHaveProperty('category');
  });

  it('should return random phrase', async () => {
    await PhraseService.initialize();
    const randomPhrase = await PhraseService.getRandomPhrase();

    expect(randomPhrase).toBeTruthy();
    expect(randomPhrase).toHaveProperty('text');
  });

  it('should handle favorites', async () => {
    await PhraseService.initialize();
    const phrases = await PhraseService.searchPhrases();
    const firstPhrase = phrases[0];

    // Add to favorites
    await PhraseService.addToFavorites(firstPhrase.id);
    expect(PhraseService.isFavorite(firstPhrase.id)).toBe(true);

    // Remove from favorites
    await PhraseService.removeFromFavorites(firstPhrase.id);
    expect(PhraseService.isFavorite(firstPhrase.id)).toBe(false);
  });
});
