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
  const [selectedCategory, setSelectedCategory] = useState<PhraseCategory>(
    PhraseCategory.COMPLIMENT,
  );
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [limit, setLimit] = useState(2000);

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

  const categories = [
    { key: PhraseCategory.COMPLIMENT, label: t('collections.tabs.compliments') },
    { key: PhraseCategory.ROMANTIC, label: t('collections.tabs.romantic') },
    { key: PhraseCategory.FLIRTY, label: t('collections.tabs.flirty') },
    { key: PhraseCategory.SUPPORTIVE, label: t('collections.tabs.supportive') },
    { key: PhraseCategory.FUNNY, label: t('collections.tabs.funny') },
    { key: PhraseCategory.CONVERSATION_STARTER, label: t('collections.tabs.conversation') },
  ];

  useEffect(() => {
    // Reset pagination when category changes
    setLimit(50);
    loadPhrases();
  }, [selectedCategory]);

  const fetchCategoryPhrases = async (): Promise<Phrase[]> => {
    // Returns a potentially large set. Service lazily loads more on demand.
    if (selectedCategory === PhraseCategory.SUPPORTIVE) {
      const deep = await PhraseService.searchPhrases({
        category: PhraseCategory.DEEP,
      });
      const goodMorning = await PhraseService.searchPhrases({
        category: PhraseCategory.GOOD_MORNING,
      });
      const relationship = await PhraseService.searchPhrases({
        category: PhraseCategory.RELATIONSHIP_BUILDING,
      });
      return [...deep, ...goodMorning, ...relationship];
    } else if (selectedCategory === PhraseCategory.FUNNY) {
      // For Funny tab, use the dedicated FUNNY category (playful_challenges)
      return await PhraseService.searchPhrases({
        category: PhraseCategory.FUNNY,
      });
    } else {
      return await PhraseService.searchPhrases({
        category: selectedCategory,
      });
    }
  };

  const loadPhrases = async () => {
    try {
      setLoading(true);
      // Make sure we have a large pool ready for this tab
      if (selectedCategory === PhraseCategory.SUPPORTIVE) {
        await Promise.all([
          PhraseService.ensureMinPhrases(2000, PhraseCategory.DEEP),
          PhraseService.ensureMinPhrases(2000, PhraseCategory.GOOD_MORNING),
          PhraseService.ensureMinPhrases(2000, PhraseCategory.RELATIONSHIP_BUILDING),
        ]);
      } else if (selectedCategory === PhraseCategory.FUNNY) {
        await PhraseService.ensureMinPhrases(2000, PhraseCategory.FUNNY);
      } else {
        await PhraseService.ensureMinPhrases(2000, selectedCategory);
      }
      const result = await fetchCategoryPhrases();

      // Deduplicate by id and limit for performance
      const unique: Record<string, boolean> = {};
      const deduped = result.filter(p => (unique[p.id] ? false : (unique[p.id] = true)));
      setPhrases(deduped);
    } catch (error) {
      console.error('Error loading phrases:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (loadingMore) return;
    try {
      setLoadingMore(true);
      // Ensure the service loads more data for the currently visible tab
      // Some tabs are composites of multiple categories – load each one
      if (selectedCategory === PhraseCategory.SUPPORTIVE) {
        await Promise.all([
          PhraseService.loadMorePhrasesOnDemand(PhraseCategory.DEEP),
          PhraseService.loadMorePhrasesOnDemand(PhraseCategory.GOOD_MORNING),
          PhraseService.loadMorePhrasesOnDemand(PhraseCategory.RELATIONSHIP_BUILDING),
        ]);
      } else if (selectedCategory === PhraseCategory.FUNNY) {
        await PhraseService.loadMorePhrasesOnDemand(PhraseCategory.FUNNY);
      } else {
        await PhraseService.loadMorePhrasesOnDemand(selectedCategory);
      }
      const prevLen = phrases.length;
      const result = await fetchCategoryPhrases();
      const unique: Record<string, boolean> = Object.fromEntries(
        phrases.map(p => [p.id, true]),
      );
      const merged = [...phrases];
      for (const p of result) {
        if (!unique[p.id]) {
          unique[p.id] = true;
          merged.push(p);
        }
      }
      if (merged.length > prevLen) {
        setPhrases(merged);
      }
      setLimit(2000);
    } catch (e) {
      console.error('Error loading more phrases:', e);
    } finally {
      setLoadingMore(false);
    }
  };

  const renderPhraseItem = ({ item }: { item: Phrase }) => (
    <PhraseCard phrase={item} onFavoriteToggle={loadPhrases} />
  );

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
        data={phrases.slice(0, limit)}
        renderItem={renderPhraseItem}
        keyExtractor={item => item.id}
        refreshing={loading}
        onRefresh={loadPhrases}
        onEndReachedThreshold={0.5}
        onEndReached={loadMore}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};


export default CollectionsScreen;
