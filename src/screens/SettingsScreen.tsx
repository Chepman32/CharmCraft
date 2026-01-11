import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from '../contexts/LocalizationContext';
import SettingsService from '../services/SettingsService';
import SettingSection from '../components/SettingSection';
import ThemeSelector from '../components/ThemeSelector';
import LanguageSelector from '../components/LanguageSelector';
import ToggleSwitch from '../components/ToggleSwitch';

const SettingsScreen: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hapticsEnabled, setHapticsEnabled] = useState(true);

  // Don't render until theme is ready
  if (!theme || !theme.colors) {
    return null;
  }

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const settings = SettingsService.getSettings();
      setSoundEnabled(settings.soundEnabled);
      setHapticsEnabled(settings.hapticsEnabled);
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const handleSoundToggle = async (enabled: boolean) => {
    try {
      await SettingsService.setSoundEnabled(enabled);
      setSoundEnabled(enabled);
    } catch (error) {
      console.error('Error updating sound setting:', error);
    }
  };

  const handleHapticsToggle = async (enabled: boolean) => {
    try {
      await SettingsService.setHapticsEnabled(enabled);
      setHapticsEnabled(enabled);
    } catch (error) {
      console.error('Error updating haptics setting:', error);
    }
  };

  const handleThemeChange = (themeName: string) => {
    // Theme change is handled by ThemeSelector
    console.log('Theme changed to:', themeName);
  };

  const handleLanguageChange = (language: string) => {
    // Language change is handled by LanguageSelector
    console.log('Language changed to:', language);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          {t('settings.title')}
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Theme Section */}
        <SettingSection
          title={t('settings.theme')}
          description={t('settings.themeDescription')}
        >
          <ThemeSelector onThemeChange={handleThemeChange} />
        </SettingSection>

        {/* Language Section */}
        <SettingSection
          title={t('settings.language')}
          description={t('settings.languageDescription')}
        >
          <LanguageSelector onLanguageChange={handleLanguageChange} />
        </SettingSection>

        {/* Sound Section */}
        <SettingSection
          title={t('settings.sound')}
          description={t('settings.soundDescription')}
        >
          <View style={styles.toggleRow}>
            <View style={styles.toggleInfo}>
              <Text style={[styles.toggleLabel, { color: theme.colors.text }]}>
                {t('settings.sound')}
              </Text>
              <Text
                style={[
                  styles.toggleDescription,
                  { color: theme.colors.textSecondary },
                ]}
              >
                {t('settings.soundToggleDescription')}
              </Text>
            </View>
            <ToggleSwitch
              value={soundEnabled}
              onValueChange={handleSoundToggle}
            />
          </View>
        </SettingSection>

        {/* Haptics Section */}
        <SettingSection
          title={t('settings.haptics')}
          description={t('settings.hapticsDescription')}
        >
          <View style={styles.toggleRow}>
            <View style={styles.toggleInfo}>
              <Text style={[styles.toggleLabel, { color: theme.colors.text }]}>
                {t('settings.haptics')}
              </Text>
              <Text
                style={[
                  styles.toggleDescription,
                  { color: theme.colors.textSecondary },
                ]}
              >
                {t('settings.hapticsToggleDescription')}
              </Text>
            </View>
            <ToggleSwitch
              value={hapticsEnabled}
              onValueChange={handleHapticsToggle}
            />
          </View>
        </SettingSection>

        {/* About Section */}
        <SettingSection
          title={t('settings.about')}
          description={t('settings.aboutDescription')}
        >
          <View style={styles.aboutContent}>
            <Text style={[styles.appName, { color: theme.colors.text }]}>
              Kissio
            </Text>
            <Text
              style={[styles.appVersion, { color: theme.colors.textSecondary }]}
            >
              Version 1.0.0
            </Text>
            <Text
              style={[
                styles.appDescription,
                { color: theme.colors.textSecondary },
              ]}
            >
              {t('settings.appDescription')}
            </Text>
          </View>
        </SettingSection>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 16,
    paddingBottom: 32,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  toggleInfo: {
    flex: 1,
    marginRight: 16,
  },
  toggleLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  toggleDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  aboutContent: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  appVersion: {
    fontSize: 14,
    marginBottom: 8,
  },
  appDescription: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default SettingsScreen;
