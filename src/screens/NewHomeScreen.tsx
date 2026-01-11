import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from '../contexts/LocalizationContext';
import { useFeedback } from '../hooks/useFeedback';
import PhraseService, { SearchFilters } from '../services/PhraseService';
import { PhraseCategory, PhraseTone } from '../data/phraseTypes';
import Clipboard from '@react-native-clipboard/clipboard';

const { width } = Dimensions.get('window');

const NewHomeScreen: React.FC = () => {
  const { theme } = useTheme();
  const { t, language } = useTranslation();
  const { playButtonTap, playSuccess } = useFeedback();
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] =
    useState<PhraseCategory | null>(null);
  const [intensity, setIntensity] = useState<'soft' | 'neutral' | 'bold'>(
    'neutral',
  );
  const [currentPhrase, setCurrentPhrase] = useState(
    'You make my day so much brighter',
  );
  const [initializing, setInitializing] = useState(true);

  const intensityToTone = (intensity: string): PhraseTone => {
    switch (intensity) {
      case 'soft':
        return PhraseTone.GENTLE;
      case 'bold':
        return PhraseTone.CONFIDENT;
      default:
        return PhraseTone.SINCERE;
    }
  };

  const generateNewPhrase = useCallback(async () => {
    try {
      const filters: SearchFilters = {};

      if (selectedCategory) {
        filters.category = selectedCategory;
      }

      filters.tone = intensityToTone(intensity);

      if (searchText.trim()) {
        filters.searchText = searchText.trim();
      }

      const phrase = await PhraseService.getRandomPhrase(filters);
      if (phrase) {
        setCurrentPhrase(phrase.text);
        await PhraseService.recordUsage(phrase.id);
      }
    } catch (error) {
      console.error('Error generating phrase:', error);
    }
  }, [selectedCategory, intensity, searchText]);

  const initializeApp = useCallback(async () => {
    try {
      await PhraseService.initialize();
      await generateNewPhrase();
    } catch (error) {
      console.error('Error initializing app:', error);
    } finally {
      setInitializing(false);
    }
  }, [generateNewPhrase]);

  useEffect(() => {
    initializeApp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Regenerate phrase when language changes
  useEffect(() => {
    if (!initializing) {
      generateNewPhrase();
    }
  }, [language, initializing, generateNewPhrase]);

  // Regenerate phrase when filters change
  useEffect(() => {
    if (!initializing) {
      generateNewPhrase();
    }
  }, [selectedCategory, intensity, searchText, initializing, generateNewPhrase]);

  const categoryButtons = React.useMemo(() => [
    {
      key: PhraseCategory.CONVERSATION_STARTER,
      label: t('categories.icebreakers'),
    },
    { key: PhraseCategory.COMPLIMENT, label: t('categories.compliments') },
    { key: PhraseCategory.APOLOGY, label: t('categories.apologies') },
    { key: PhraseCategory.ROMANTIC, label: t('categories.longDistance') },
    { key: PhraseCategory.CASUAL, label: t('categories.everyday') },
    { key: PhraseCategory.GOOD_MORNING, label: t('categories.goodMorning') },
  ], [t]);

  const styles = React.useMemo(() => {
    if (!theme || !theme.colors) {
      // Return basic styles if theme is not ready
      return StyleSheet.create({
        container: { flex: 1, backgroundColor: '#F0F8FF' },
        gradient: { flex: 1, backgroundColor: '#F0F8FF' },
        scrollView: { flex: 1 },
        loadingContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#2196F3',
        },
        loadingTitle: {
          fontSize: 32,
          fontWeight: 'bold',
          color: '#FFFFFF',
          marginBottom: 16,
        },
        loadingText: { fontSize: 16, color: '#E3F2FD' },
        header: { alignItems: 'center', paddingTop: 16, paddingBottom: 20 },
        title: { fontSize: 32, fontWeight: 'bold', color: '#333333' },
        searchContainer: { paddingHorizontal: 20, marginBottom: 20 },
        searchInputContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          borderRadius: 25,
          paddingHorizontal: 20,
          paddingVertical: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        },
        searchIcon: { marginRight: 10 },
        searchInput: { flex: 1, fontSize: 16, color: '#333333' },
        categoryContainer: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          paddingHorizontal: 20,
          marginBottom: 20,
          justifyContent: 'flex-start',
          gap: 10,
        },
        categoryButton: {
          backgroundColor: '#FFFFFF',
          borderRadius: 20,
          paddingHorizontal: 20,
          paddingVertical: 10,
          marginBottom: 10,
          width: (width - 60) / 2 - 5,
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 2,
        },
        categoryButtonActive: { backgroundColor: '#E3F2FD' },
        categoryButtonText: {
          fontSize: 14,
          color: '#666666',
          fontWeight: '500',
        },
        categoryButtonTextActive: { color: '#2196F3', fontWeight: 'bold' },
        phraseContainer: {
          backgroundColor: '#FFFFFF',
          borderRadius: 20,
          padding: 20,
          marginHorizontal: 20,
          marginBottom: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 5,
        },
        phraseText: {
          fontSize: 20,
          color: '#333333',
          textAlign: 'center',
          lineHeight: 28,
          fontWeight: '500',
        },
        intensityContainer: { paddingHorizontal: 20, marginBottom: 25 },
        intensityLabel: {
          fontSize: 16,
          color: '#333333',
          fontWeight: '600',
          marginBottom: 10,
        },
        intensitySlider: { position: 'relative' },
        intensityTrack: {
          height: 4,
          backgroundColor: '#E0E0E0',
          borderRadius: 2,
          marginVertical: 20,
        },
        intensityButtons: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
        },
        intensityButton: {
          backgroundColor: 'transparent',
          paddingVertical: 8,
          paddingHorizontal: 12,
        },
        intensityButtonActive: { backgroundColor: 'transparent' },
        intensityButtonText: {
          fontSize: 14,
          color: '#666666',
          fontWeight: '500',
        },
        intensityButtonTextActive: { color: '#333333', fontWeight: 'bold' },
        suggestionButton: {
          backgroundColor: '#FF9800',
          borderRadius: 25,
          paddingVertical: 15,
          marginHorizontal: 20,
          marginBottom: 20,
          shadowColor: '#FF9800',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 5,
        },
        suggestionButtonText: {
          color: '#FFFFFF',
          fontSize: 18,
          fontWeight: 'bold',
          textAlign: 'center',
        },
      });
    }
    return createStyles(theme);
  }, [theme]);

  // Don't render until theme is ready
  if (!theme || !theme.colors) {
    return null;
  }

  const handleCopyPhrase = () => {
    Clipboard.setString(currentPhrase);
    playSuccess();
    Alert.alert(t('common.copied'), t('common.phraseCopied'));
  };

  if (initializing) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingTitle}>{t('home.loadingTitle')}</Text>
          <Text style={styles.loadingText}>{t('home.loadingText')}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.gradient}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>{t('home.title')}</Text>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <Icon
                name="search"
                size={20}
                color="#999"
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchInput}
                placeholder={t('home.search')}
                value={searchText}
                onChangeText={setSearchText}
                placeholderTextColor={theme?.colors?.textSecondary || '#999'}
              />
            </View>
          </View>

          {/* Category Buttons */}
          <View style={styles.categoryContainer}>
            {categoryButtons.map((category) => (
              <TouchableOpacity
                key={category.key}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.key &&
                    styles.categoryButtonActive,
                ]}
                onPress={() => {
                  playButtonTap();
                  setSelectedCategory(
                    selectedCategory === category.key ? null : category.key,
                  );
                }}
              >
                <Text
                  style={[
                    styles.categoryButtonText,
                    selectedCategory === category.key &&
                      styles.categoryButtonTextActive,
                  ]}
                >
                  {category.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Current Phrase Display */}
          <TouchableOpacity
            style={styles.phraseContainer}
            onPress={handleCopyPhrase}
            activeOpacity={0.8}
          >
            <Text
              style={styles.phraseText}
              adjustsFontSizeToFit={true}
              minimumFontScale={0.85}
              numberOfLines={7}
            >
              {currentPhrase}
            </Text>
          </TouchableOpacity>

          {/* Intensity Selector */}
          <View style={styles.intensityContainer}>
            <Text style={styles.intensityLabel}>{t('home.intensity')}</Text>
            <View style={styles.intensitySlider}>
              <View style={styles.intensityTrack} />
              <View style={styles.intensityButtons}>
                {['soft', 'neutral', 'bold'].map(level => (
                  <TouchableOpacity
                    key={level}
                    style={[
                      styles.intensityButton,
                      intensity === level && styles.intensityButtonActive,
                    ]}
                    onPress={() => {
                      playButtonTap();
                      setIntensity(level as any);
                    }}
                  >
                    <Text
                      style={[
                        styles.intensityButtonText,
                        intensity === level && styles.intensityButtonTextActive,
                      ]}
                    >
                      {t(`home.${level}`)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* Get Suggestion Button */}
          <TouchableOpacity
            style={styles.suggestionButton}
            onPress={() => {
              playButtonTap();
              generateNewPhrase();
            }}
          >
            <Text style={styles.suggestionButtonText}>
              {t('home.getSuggestion')}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    gradient: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollView: {
      flex: 1,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.primary,
    },
    loadingTitle: {
      fontSize: 32,
      fontWeight: 'bold',
      color: theme.colors.surface,
      marginBottom: 16,
    },
    loadingText: {
      fontSize: 16,
      color: theme.colors.surface,
    },
    header: {
      alignItems: 'center',
      paddingTop: 16,
      paddingBottom: 20,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
    searchContainer: {
      paddingHorizontal: 20,
      marginBottom: 20,
    },
    searchInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderRadius: 25,
      paddingHorizontal: 20,
      paddingVertical: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    searchIcon: {
      marginRight: 10,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      color: theme.colors.text,
    },
    categoryContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingHorizontal: 20,
      marginBottom: 20,
      justifyContent: 'flex-start',
      gap: 10,
    },
    categoryButton: {
      backgroundColor: theme.colors.surface,
      borderRadius: 20,
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginBottom: 10,
      width: (width - 60) / 2 - 5,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    categoryButtonActive: {
      backgroundColor: theme.colors.primary + '20',
    },
    categoryButtonText: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      fontWeight: '500',
    },
    categoryButtonTextActive: {
      color: theme.colors.primary,
      fontWeight: 'bold',
    },
    phraseContainer: {
      backgroundColor: theme.colors.cardBackground,
      borderRadius: 20,
      padding: 20,
      marginHorizontal: 20,
      marginBottom: 20,
      minHeight: 140,
      maxHeight: 200,
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
    },
    phraseText: {
      fontSize: 20,
      color: theme.colors.text,
      textAlign: 'center',
      lineHeight: 28,
      fontWeight: '500',
    },
    intensityContainer: {
      paddingHorizontal: 20,
      marginBottom: 25,
    },
    intensityLabel: {
      fontSize: 16,
      color: theme.colors.text,
      fontWeight: '600',
      marginBottom: 10,
    },
    intensitySlider: {
      position: 'relative',
    },
    intensityTrack: {
      height: 4,
      backgroundColor: theme.colors.border,
      borderRadius: 2,
      marginVertical: 20,
    },
    intensityButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
    },
    intensityButton: {
      backgroundColor: 'transparent',
      paddingVertical: 8,
      paddingHorizontal: 12,
    },
    intensityButtonActive: {
      backgroundColor: 'transparent',
    },
    intensityButtonText: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      fontWeight: '500',
    },
    intensityButtonTextActive: {
      color: theme.colors.text,
      fontWeight: 'bold',
    },
    suggestionButton: {
      backgroundColor: theme.colors.secondary,
      borderRadius: 25,
      paddingVertical: 15,
      marginHorizontal: 20,
      marginBottom: 20,
      shadowColor: theme.colors.secondary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 5,
    },
    suggestionButtonText: {
      color: theme.colors.surface,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });

export default NewHomeScreen;
