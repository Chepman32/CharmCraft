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
import { PhraseCategory, PhraseTone, Phrase } from '../data/phraseTypes';
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
  const [currentPhrase, setCurrentPhrase] = useState<Phrase | null>(null);
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
        setCurrentPhrase(phrase);
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
    { key: PhraseCategory.GOOD_MORNING, label: t('categories.birthday') },
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
        header: { alignItems: 'center', paddingTop: 20, paddingBottom: 30 },
        title: { fontSize: 32, fontWeight: 'bold', color: '#333333' },
        searchContainer: { paddingHorizontal: 20, marginBottom: 30 },
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
          marginBottom: 30,
          justifyContent: 'space-between',
        },
        categoryButton: {
          backgroundColor: '#FFFFFF',
          borderRadius: 20,
          paddingHorizontal: 20,
          paddingVertical: 10,
          marginBottom: 10,
          minWidth: (width - 60) / 2,
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
          padding: 25,
          marginHorizontal: 20,
          marginBottom: 30,
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
        intensityContainer: { paddingHorizontal: 20, marginBottom: 40 },
        intensityLabel: {
          fontSize: 16,
          color: '#333333',
          fontWeight: '600',
          marginBottom: 15,
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
          marginBottom: 30,
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
    if (currentPhrase) {
      Clipboard.setString(currentPhrase.text);
      playSuccess();
      Alert.alert(t('common.copied'), t('common.phraseCopied'));
    }
  };

  const getCategoryDisplayName = (category: string): string => {
    const categoryTranslations: { [key: string]: string } = {
      'compliment': t('categories.compliment'),
      'compliments_appearance': t('categories.compliment'),
      'compliments_personality': t('categories.compliment'),
      'icebreakers': t('categories.icebreakers'),
      'asking_out': t('categories.asking_out'),
      'deepening_connection': t('categories.deepening_connection'),
      'flirting': t('categories.flirting'),
      'good_morning_night': t('categories.good_morning_night'),
      'romantic': t('categories.asking_out'),
      'conversation_starter': t('categories.icebreakers'),
      'deep': t('categories.deepening_connection'),
      'flirty': t('categories.flirting'),
      'good_morning': t('categories.good_morning_night'),
      'goodnight': t('categories.good_morning_night'),
      'supportive': t('categories.supportive'),
      'funny': t('categories.funny'),
      'apology': t('categories.apologies'),
      'casual': t('categories.everyday'),
      'relationship_building': t('categories.longDistance'),
    };
    
    return categoryTranslations[category] || category.replace('_', ' ').toUpperCase();
  };

  const getCategoryColor = (category: string): string => {
    const colors: { [key: string]: string } = {
      conversation_starter: '#4CAF50',
      compliment: '#FF9800',
      compliments_appearance: '#FF9800',
      compliments_personality: '#FF9800',
      flirty: '#E91E63',
      flirting: '#E91E63',
      romantic: '#F44336',
      asking_out: '#F44336',
      supportive: '#2196F3',
      funny: '#FFEB3B',
      deep: '#9C27B0',
      deepening_connection: '#9C27B0',
      casual: '#607D8B',
      apology: '#795548',
      goodnight: '#3F51B5',
      good_morning: '#FF5722',
      good_morning_night: '#FF5722',
      relationship_building: '#009688',
      icebreakers: '#4CAF50',
    };
    return colors[category] || '#757575';
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
            {currentPhrase && (
              <>
                <View style={styles.phraseHeader}>
                  <View
                    style={[
                      styles.categoryBadge,
                      { backgroundColor: getCategoryColor(currentPhrase.category) },
                    ]}
                  >
                    <Text style={styles.categoryText}>
                      {getCategoryDisplayName(currentPhrase.category).toUpperCase()}
                    </Text>
                  </View>
                </View>
                <Text style={styles.phraseText}>{currentPhrase.text}</Text>
              </>
            )}
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
      paddingTop: 20,
      paddingBottom: 25,
    },
    title: {
      fontSize: 28,
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
      justifyContent: 'space-between',
    },
    categoryButton: {
      backgroundColor: theme.colors.surface,
      borderRadius: 20,
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginBottom: 10,
      minWidth: (width - 60) / 2,
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
      padding: 30,
      marginHorizontal: 20,
      marginBottom: 25,
      height: 180,
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
    },
    phraseHeader: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginBottom: 15,
    },
    categoryBadge: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
    },
    categoryText: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    phraseText: {
      fontSize: 22,
      color: theme.colors.text,
      textAlign: 'center',
      lineHeight: 32,
      fontWeight: '500',
    },
    intensityContainer: {
      paddingHorizontal: 20,
      marginBottom: 30,
    },
    intensityLabel: {
      fontSize: 16,
      color: theme.colors.text,
      fontWeight: '600',
      marginBottom: 12,
    },
    intensitySlider: {
      position: 'relative',
    },
    intensityTrack: {
      height: 4,
      backgroundColor: theme.colors.border,
      borderRadius: 2,
      marginVertical: 18,
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
      marginBottom: 30,
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
