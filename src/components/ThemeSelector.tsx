import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme, themes } from '../contexts/ThemeContext';
import { useTranslation } from '../contexts/LocalizationContext';
import { useFeedback } from '../hooks/useFeedback';
import SettingsService from '../services/SettingsService';

interface ThemeSelectorProps {
  onThemeChange: (themeName: string) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ onThemeChange }) => {
  const { theme, themeName, setTheme } = useTheme();
  const { t } = useTranslation();
  const { playMediumImpact } = useFeedback();

  const handleThemeSelect = (selectedTheme: string) => {
    SettingsService.triggerSoundFeedback('tap');
    setTheme(selectedTheme);
    onThemeChange(selectedTheme);
  };

  const renderThemeOption = (
    themeKey: string,
    themeData: typeof themes.light,
  ) => {
    const isSelected = themeName === themeKey;

    return (
      <TouchableOpacity
        key={themeKey}
        style={[
          styles.themeOption,
          {
            backgroundColor: themeData.colors.surface,
            borderColor: isSelected
              ? themeData.colors.primary
              : themeData.colors.border,
            borderWidth: isSelected ? 2 : 1,
          },
        ]}
        onPress={() => handleThemeSelect(themeKey)}
        onPressIn={() => {
          void playMediumImpact();
        }}
        activeOpacity={0.7}
      >
        <View style={styles.themePreview}>
          <View
            style={[
              styles.previewBar,
              { backgroundColor: themeData.colors.primary },
            ]}
          />
          <View
            style={[
              styles.previewContent,
              { backgroundColor: themeData.colors.background },
            ]}
          >
            <View
              style={[
                styles.previewText,
                { backgroundColor: themeData.colors.text },
              ]}
            />
            <View
              style={[
                styles.previewText,
                {
                  backgroundColor: themeData.colors.textSecondary,
                  width: '60%',
                },
              ]}
            />
          </View>
        </View>
        <Text
          style={[
            styles.themeName,
            {
              color: theme.colors.text,
              fontWeight: isSelected ? 'bold' : 'normal',
            },
          ]}
        >
          {t(`themes.${themeKey}`)}
        </Text>
        {isSelected && (
          <View
            style={[
              styles.selectedIndicator,
              { backgroundColor: theme.colors.primary },
            ]}
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {Object.entries(themes).map(([key, themeData]) =>
          renderThemeOption(key, themeData),
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  themeOption: {
    width: '48%',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    position: 'relative',
  },
  themePreview: {
    height: 60,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
  },
  previewBar: {
    height: 20,
    width: '100%',
  },
  previewContent: {
    flex: 1,
    padding: 8,
    justifyContent: 'center',
  },
  previewText: {
    height: 4,
    borderRadius: 2,
    marginBottom: 4,
    width: '80%',
  },
  themeName: {
    fontSize: 14,
    textAlign: 'center',
  },
  selectedIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ThemeSelector;
