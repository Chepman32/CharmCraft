import AsyncStorage from '@react-native-async-storage/async-storage';
import SoundService from './SoundService';
import HapticService from './HapticService';

const SETTINGS_KEYS = {
  THEME: 'kissio_theme',
  LANGUAGE: 'kissio_language',
  SOUND_ENABLED: 'kissio_sound_enabled',
  HAPTICS_ENABLED: 'kissio_haptics_enabled',
  SPLASH_BLOB_STYLE: 'kissio_splash_blob_style',
};

export interface AppSettings {
  theme: string;
  language: string;
  soundEnabled: boolean;
  hapticsEnabled: boolean;
  splashBlobStyle: string;
}

class SettingsService {
  private settings: AppSettings = {
    theme: 'light',
    language: 'en',
    soundEnabled: true,
    hapticsEnabled: true,
    splashBlobStyle: 'aqua',
  };

  async initialize(): Promise<void> {
    try {
      await this.loadAllSettings();
      await SoundService.initialize();
      await HapticService.initialize();
    } catch (error) {
      console.error('Error initializing SettingsService:', error);
    }
  }

  private async loadAllSettings(): Promise<void> {
    try {
      const [theme, language, soundEnabled, hapticsEnabled, splashBlobStyle] =
        await Promise.all([
          this.getTheme(),
          this.getLanguage(),
          this.getSoundEnabled(),
          this.getHapticsEnabled(),
          this.getSplashBlobStyle(),
        ]);

      this.settings = {
        theme,
        language,
        soundEnabled,
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

  // Sound Settings
  async getSoundEnabled(): Promise<boolean> {
    try {
      const soundEnabled = await AsyncStorage.getItem(
        SETTINGS_KEYS.SOUND_ENABLED,
      );
      return soundEnabled !== null ? JSON.parse(soundEnabled) : true;
    } catch (error) {
      console.error('Error getting sound enabled:', error);
      return true;
    }
  }

  async setSoundEnabled(enabled: boolean): Promise<void> {
    try {
      await AsyncStorage.setItem(
        SETTINGS_KEYS.SOUND_ENABLED,
        JSON.stringify(enabled),
      );
      this.settings.soundEnabled = enabled;
    } catch (error) {
      console.error('Error setting sound enabled:', error);
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
    if (newSettings.soundEnabled !== undefined) {
      updates.push(this.setSoundEnabled(newSettings.soundEnabled));
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
  triggerHapticFeedback(type: 'light' | 'medium' | 'heavy' = 'light'): void {
    if (this.settings.hapticsEnabled) {
      HapticService.triggerHaptic(type);
    }
  }

  // Sound feedback
  triggerSoundFeedback(soundType: 'tap' | 'success' | 'error' = 'tap'): void {
    if (this.settings.soundEnabled) {
      SoundService.playSound(soundType);
    }
  }

  // Reset all settings to defaults
  async resetToDefaults(): Promise<void> {
    try {
      await Promise.all([
        AsyncStorage.removeItem(SETTINGS_KEYS.THEME),
        AsyncStorage.removeItem(SETTINGS_KEYS.LANGUAGE),
        AsyncStorage.removeItem(SETTINGS_KEYS.SOUND_ENABLED),
        AsyncStorage.removeItem(SETTINGS_KEYS.HAPTICS_ENABLED),
        AsyncStorage.removeItem(SETTINGS_KEYS.SPLASH_BLOB_STYLE),
      ]);

      this.settings = {
        theme: 'light',
        language: 'en',
        soundEnabled: true,
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
