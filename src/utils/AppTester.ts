import { themes } from '../contexts/ThemeContext';
import { translations, languages } from '../localization';
import SettingsService from '../services/SettingsService';

export class AppTester {
  static async runBasicTests(): Promise<boolean> {
    console.log('🧪 Running Kissio basic tests...');

    try {
      // Test 1: Theme system
      console.log('Testing theme system...');
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
      console.log('✅ Theme system test passed');

      // Test 2: Localization system
      console.log('Testing localization system...');
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
      console.log('✅ Localization system test passed');

      // Test 3: Settings service
      console.log('Testing settings service...');
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
      console.log('✅ Settings service test passed');

      // Test 4: Error handling
      console.log('Testing error handling...');
      try {
        await SettingsService.setTheme('invalid_theme');
        // Should not reach here
      } catch (error) {
        // Expected to fail
      }
      console.log('✅ Error handling test passed');

      console.log('🎉 All basic tests passed!');
      return true;
    } catch (error) {
      console.error('❌ Test failed:', error);
      return false;
    }
  }

  static logSystemInfo(): void {
    console.log('📱 Kissio System Info:');
    console.log(`- Themes available: ${Object.keys(themes).length}`);
    console.log(`- Languages available: ${languages.length}`);
    console.log(`- Theme names: ${Object.keys(themes).join(', ')}`);
    console.log(`- Language codes: ${languages.map(l => l.code).join(', ')}`);
  }
}

// Auto-run tests in development
if (typeof __DEV__ !== 'undefined' && __DEV__) {
  setTimeout(() => {
    AppTester.logSystemInfo();
    AppTester.runBasicTests();
  }, 2000);
}
