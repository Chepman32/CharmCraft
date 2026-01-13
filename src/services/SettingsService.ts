import AsyncStorage from '@react-native-async-storage/async-storage';
import HapticService, { HapticType } from './HapticService';
import SoundService from './SoundService';

const SETTINGS_KEYS = {
  THEME: 'kissio_theme',
  LANGUAGE: 'kissio_language',
  HAPTICS_ENABLED: 'kissio_haptics_enabled',
  SPLASH_BLOB_STYLE: 'kissio_splash_blob_style',
  ONBOARDING_COMPLETE: 'kissio_onboarding_complete',
};

export interface AppSettings {
  theme: string;
  language: string;
  hapticsEnabled: boolean;
  splashBlobStyle: string;
}

class SettingsService {
  private settings: AppSettings = {
    theme: 'light',
    language: 'en',
    hapticsEnabled: true,
    splashBlobStyle: 'aqua',
  };

  async initialize(): Promise<void> {
    try {
      await this.loadAllSettings();
      await HapticService.initialize();
      await SoundService.initialize();
    } catch (error) {
      console.error('Error initializing SettingsService:', error);
    }
  }

  private async loadAllSettings(): Promise<void> {
    try {
      const [theme, language, hapticsEnabled, splashBlobStyle] =
        await Promise.all([
          this.getTheme(),
          this.getLanguage(),
          this.getHapticsEnabled(),
          this.getSplashBlobStyle(),
        ]);

      this.settings = {
        theme,
        language,
        hapticsEnabled,
        splashBlobStyle,
      };
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  }

  // Theme Settings
  async getTheme(): Promise<string> {
    try {
      const theme = await AsyncStorage.getItem(SETTINGS_KEYS.THEME);
      return theme || 'light';
    } catch (error) {
      console.error('Error getting theme:', error);
      return 'light';
    }
  }

  async setTheme(theme: string): Promise<void> {
    try {
      await AsyncStorage.setItem(SETTINGS_KEYS.THEME, theme);
      this.settings.theme = theme;
    } catch (error) {
      console.error('Error setting theme:', error);
      throw error;
    }
  }

  // Language Settings
  async getLanguage(): Promise<string> {
    try {
      const language = await AsyncStorage.getItem(SETTINGS_KEYS.LANGUAGE);
      return language || 'en';
    } catch (error) {
      console.error('Error getting language:', error);
      return 'en';
    }
  }

  async setLanguage(language: string): Promise<void> {
    try {
      await AsyncStorage.setItem(SETTINGS_KEYS.LANGUAGE, language);
      this.settings.language = language;
    } catch (error) {
      console.error('Error setting language:', error);
      throw error;
    }
  }

  // Haptics Settings
  async getHapticsEnabled(): Promise<boolean> {
    try {
      const hapticsEnabled = await AsyncStorage.getItem(
        SETTINGS_KEYS.HAPTICS_ENABLED,
      );
      return hapticsEnabled !== null ? JSON.parse(hapticsEnabled) : true;
    } catch (error) {
      console.error('Error getting haptics enabled:', error);
      return true;
    }
  }

  async setHapticsEnabled(enabled: boolean): Promise<void> {
    try {
      await AsyncStorage.setItem(
        SETTINGS_KEYS.HAPTICS_ENABLED,
        JSON.stringify(enabled),
      );
      this.settings.hapticsEnabled = enabled;
    } catch (error) {
      console.error('Error setting haptics enabled:', error);
      throw error;
    }
  }

  // Splash Blob Style
  async getSplashBlobStyle(): Promise<string> {
    try {
      const style = await AsyncStorage.getItem(SETTINGS_KEYS.SPLASH_BLOB_STYLE);
      return style || 'aqua';
    } catch (error) {
      console.error('Error getting splash blob style:', error);
      return 'aqua';
    }
  }

  async setSplashBlobStyle(style: string): Promise<void> {
    try {
      await AsyncStorage.setItem(SETTINGS_KEYS.SPLASH_BLOB_STYLE, style);
      this.settings.splashBlobStyle = style;
    } catch (error) {
      console.error('Error setting splash blob style:', error);
      throw error;
    }
  }

  // Onboarding
  async getOnboardingComplete(): Promise<boolean> {
    try {
      const value = await AsyncStorage.getItem(
        SETTINGS_KEYS.ONBOARDING_COMPLETE,
      );
      return value !== null ? JSON.parse(value) : false;
    } catch (error) {
      console.error('Error getting onboarding status:', error);
      return false;
    }
  }

  async setOnboardingComplete(complete: boolean): Promise<void> {
    try {
      await AsyncStorage.setItem(
        SETTINGS_KEYS.ONBOARDING_COMPLETE,
        JSON.stringify(complete),
      );
    } catch (error) {
      console.error('Error setting onboarding status:', error);
      throw error;
    }
  }

  // Get all settings at once
  getSettings(): AppSettings {
    return { ...this.settings };
  }

  // Bulk update settings
  async updateSettings(newSettings: Partial<AppSettings>): Promise<void> {
    const updates: Promise<void>[] = [];

    if (newSettings.theme !== undefined) {
      updates.push(this.setTheme(newSettings.theme));
    }
    if (newSettings.language !== undefined) {
      updates.push(this.setLanguage(newSettings.language));
    }
    if (newSettings.hapticsEnabled !== undefined) {
      updates.push(this.setHapticsEnabled(newSettings.hapticsEnabled));
    }
    if (newSettings.splashBlobStyle !== undefined) {
      updates.push(this.setSplashBlobStyle(newSettings.splashBlobStyle));
    }

    try {
      await Promise.all(updates);
    } catch (error) {
      console.error('Error updating settings:', error);
      throw error;
    }
  }

  // Utility methods for feedback
  triggerHapticFeedback(type: HapticType = 'light'): void {
    if (this.settings.hapticsEnabled) {
      HapticService.triggerHaptic(type);
    }
  }

  triggerSoundFeedback(
    type: 'tap' | 'success' | 'error' | 'notification' = 'tap',
  ): void {
    void SoundService.playSound(type);
  }

  // Reset all settings to defaults
  async resetToDefaults(): Promise<void> {
    try {
      await Promise.all([
        AsyncStorage.removeItem(SETTINGS_KEYS.THEME),
        AsyncStorage.removeItem(SETTINGS_KEYS.LANGUAGE),
        AsyncStorage.removeItem(SETTINGS_KEYS.HAPTICS_ENABLED),
        AsyncStorage.removeItem(SETTINGS_KEYS.SPLASH_BLOB_STYLE),
        AsyncStorage.removeItem(SETTINGS_KEYS.ONBOARDING_COMPLETE),
      ]);

      this.settings = {
        theme: 'light',
        language: 'en',
        hapticsEnabled: true,
        splashBlobStyle: 'aqua',
      };
    } catch (error) {
      console.error('Error resetting settings:', error);
      throw error;
    }
  }
}

export default new SettingsService();
