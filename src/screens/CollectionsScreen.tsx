import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from '../contexts/LocalizationContext';
import { Phrase, PhraseCategory } from '../data/phraseTypes';
import PhraseService from '../services/PhraseService';
import PhraseCard from '../components/PhraseCard';

const CollectionsScreen: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [phrases, setPhrases] = useState<Phrase[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<PhraseCategory>(PhraseCategory.COMPLIMENT);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);

  // Don't render until theme is ready
  if (!theme || !theme.colors) {
    return null;
  }

  const styles = React.useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      padding: 20,
      backgroundColor: theme.colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
    categoryContainer: {
      backgroundColor: theme.colors.surface,
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    categoryTab: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      marginHorizontal: 4,
      borderRadius: 20,
      backgroundColor: theme.colors.cardBackground,
    },
    categoryTabActive: {
      backgroundColor: theme.colors.primary,
    },
    categoryTabText: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      fontWeight: '500',
    },
    categoryTabTextActive: {
      color: theme.colors.surface,
      fontWeight: 'bold',
    },
  }), [theme]);

  // Updated categories to match the large dataset
  const categories = [
    { key: PhraseCategory.COMPLIMENT, label: t('categories.compliment') },
    { key: PhraseCategory.CONVERSATION_STARTER, label: t('categories.icebreakers') },
    { key: PhraseCategory.ROMANTIC, label: t('categories.asking_out') },
    { key: PhraseCategory.DEEP, label: t('categories.deepening_connection') },
    { key: PhraseCategory.FLIRTY, label: t('categories.flirting') },
    { key: PhraseCategory.GOOD_MORNING, label: t('categories.good_morning_night') },
  ];

  useEffect(() => {
    initializeApp();
  }, []);

  useEffect(() => {
    if (!initializing) {
      loadPhrases();
    }
  }, [selectedCategory, initializing]);

  const initializeApp = async () => {
    try {
      setInitializing(true);
      await PhraseService.initialize();
    } catch (error) {
      console.error('Error initializing PhraseService:', error);
    } finally {
      setInitializing(false);
    }
  };

  const loadPhrases = async () => {
    try {
      setLoading(true);
      const result = await PhraseService.searchPhrases({
        category: selectedCategory,
      });
      setPhrases(result.slice(0, 50)); // Show more phrases
    } catch (error) {
      console.error('Error loading phrases:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderPhraseItem = ({ item }: { item: Phrase }) => (
    <PhraseCard phrase={item} onFavoriteToggle={loadPhrases} />
  );

  if (initializing) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{t('collections.title')}</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: theme.colors.text }}>{t('common.loading')}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('collections.title')}</Text>
      </View>

      {/* Category Tabs */}
      <View style={styles.categoryContainer}>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.key}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryTab,
                selectedCategory === item.key && styles.categoryTabActive,
              ]}
              onPress={() => setSelectedCategory(item.key)}
            >
              <Text
                style={[
                  styles.categoryTabText,
                  selectedCategory === item.key && styles.categoryTabTextActive,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <FlatList
        data={phrases}
        renderItem={renderPhraseItem}
        keyExtractor={item => item.id}
        refreshing={loading}
        onRefresh={loadPhrases}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 50 }}>
            <Text style={{ color: theme.colors.textSecondary }}>
              {t('collections.noPhrases')}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};


export default CollectionsScreen;
