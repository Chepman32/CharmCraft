import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from '../contexts/LocalizationContext';
import SettingsService from '../services/SettingsService';

interface LanguageSelectorProps {
  onLanguageChange: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  onLanguageChange,
}) => {
  const { theme } = useTheme();
  const { language, setLanguage, availableLanguages } = useTranslation();

  const handleLanguageSelect = (selectedLanguage: string) => {
    SettingsService.triggerHapticFeedback('medium');
    SettingsService.triggerSoundFeedback('tap');
    setLanguage(selectedLanguage);
    onLanguageChange(selectedLanguage);
  };

  const renderLanguageOption = (lang: (typeof availableLanguages)[0]) => {
    const isSelected = language === lang.code;

    return (
      <TouchableOpacity
        key={lang.code}
        style={[
          styles.languageOption,
          {
            backgroundColor: isSelected
              ? theme.colors.primary + '20'
              : 'transparent',
            borderColor: theme.colors.border,
          },
        ]}
        onPress={() => handleLanguageSelect(lang.code)}
        activeOpacity={0.7}
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
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        {availableLanguages.map(renderLanguageOption)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 300,
  },
  scrollView: {
    flex: 1,
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
