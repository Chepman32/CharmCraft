import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from '../contexts/LocalizationContext';
import { useFeedback } from '../hooks/useFeedback';
import SettingsService from '../services/SettingsService';

interface LanguageSelectorProps {
  onLanguageChange: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  onLanguageChange,
}) => {
  const { theme } = useTheme();
  const { language, setLanguage, availableLanguages } = useTranslation();
  const { playMediumImpact } = useFeedback();

  const handleLanguageSelect = async (selectedLanguage: string) => {
    SettingsService.triggerSoundFeedback('tap');
    await setLanguage(selectedLanguage);
    onLanguageChange(selectedLanguage);
  };

  const renderLanguageOption = (lang: (typeof availableLanguages)[0]) => {
    const isSelected = language === lang.code;

    return (
      <Pressable
        key={lang.code}
        style={({ pressed }) => [
          styles.languageOption,
          {
            backgroundColor: isSelected
              ? theme.colors.primary + '20'
              : pressed
              ? theme.colors.border + '20'
              : 'transparent',
            borderColor: theme.colors.border,
          },
        ]}
        onPress={() => handleLanguageSelect(lang.code)}
        onPressIn={() => {
          void playMediumImpact();
        }}
      >
        <View style={styles.languageInfo}>
          <Text
            style={[
              styles.languageName,
              {
                color: theme.colors.text,
                fontWeight: isSelected ? 'bold' : 'normal',
              },
            ]}
          >
            {lang.nativeName}
          </Text>
          <Text
            style={[
              styles.languageEnglishName,
              { color: theme.colors.textSecondary },
            ]}
          >
            {lang.name}
          </Text>
        </View>
        {isSelected && (
          <Icon name="check" size={24} color={theme.colors.primary} />
        )}
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      {availableLanguages.map(renderLanguageOption)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Remove maxHeight since we're not scrolling
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderRadius: 8,
    marginBottom: 4,
    minHeight: 44, // Minimum touch target size for iOS
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    marginBottom: 2,
  },
  languageEnglishName: {
    fontSize: 14,
  },
});

export default LanguageSelector;
