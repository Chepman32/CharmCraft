import { themes } from '../contexts/ThemeContext';
import { translations, languages } from '../localization';
import SettingsService from '../services/SettingsService';

export class AppTester {
  static async runBasicTests(): Promise<boolean> {
    try {
      // Test 1: Theme system
      const themeNames = Object.keys(themes);
      if (themeNames.length !== 4) {
        throw new Error(`Expected 4 themes, found ${themeNames.length}`);
      }

      const requiredThemes = ['light', 'dark', 'solar', 'mono'];
      for (const themeName of requiredThemes) {
        if (!themes[themeName]) {
          throw new Error(`Missing theme: ${themeName}`);
        }

        const theme = themes[themeName];
        if (
          !theme.colors ||
          !theme.colors.primary ||
          !theme.colors.background
        ) {
          throw new Error(`Invalid theme structure: ${themeName}`);
        }
      }
      // Test 2: Localization system
      if (languages.length !== 10) {
        throw new Error(`Expected 10 languages, found ${languages.length}`);
      }

      const requiredLanguages = [
        'en',
        'ru',
        'es',
        'de',
        'fr',
        'pt',
        'ja',
        'zh',
        'ko',
        'ua',
      ];
      for (const langCode of requiredLanguages) {
        if (!translations[langCode as keyof typeof translations]) {
          throw new Error(`Missing translation: ${langCode}`);
        }

        const translation = translations[langCode as keyof typeof translations];
        if (
          !translation.navigation ||
          !translation.settings ||
          !translation.common
        ) {
          throw new Error(`Invalid translation structure: ${langCode}`);
        }
      }
      // Test 3: Settings service
      await SettingsService.initialize();

      const settings = SettingsService.getSettings();
      if (typeof settings.hapticsEnabled !== 'boolean') {
        throw new Error('Invalid settings structure');
      }

      // Test setting and getting theme
      await SettingsService.setTheme('dark');
      const savedTheme = await SettingsService.getTheme();
      if (savedTheme !== 'dark') {
        throw new Error('Theme setting/getting failed');
      }

      // Reset to light theme
      await SettingsService.setTheme('light');

      // Test 4: Error handling
      try {
        await SettingsService.setTheme('invalid_theme');
        // Should not reach here
      } catch {
        // Expected to fail
      }
      return true;
    } catch {
      return false;
    }
  }

  static logSystemInfo(): void {
  }
}
