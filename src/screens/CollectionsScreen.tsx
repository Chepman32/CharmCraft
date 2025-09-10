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
    loadPhrases();
  }, [selectedCategory]);

  const loadPhrases = async () => {
    try {
      setLoading(true);
      let result: Phrase[] = [];

      if (selectedCategory === PhraseCategory.SUPPORTIVE) {
        // Combine supportive-like categories from the standard dataset
        const deep = await PhraseService.searchPhrases({
          category: PhraseCategory.DEEP,
        });
        const goodMorning = await PhraseService.searchPhrases({
          category: PhraseCategory.GOOD_MORNING,
        });
        const relationship = await PhraseService.searchPhrases({
          category: PhraseCategory.RELATIONSHIP_BUILDING,
        });
        result = [...deep, ...goodMorning, ...relationship];
      } else if (selectedCategory === PhraseCategory.FUNNY) {
        // Use conversation starters and flirty as playful/funny content
        const starters = await PhraseService.searchPhrases({
          category: PhraseCategory.CONVERSATION_STARTER,
        });
        const flirty = await PhraseService.searchPhrases({
          category: PhraseCategory.FLIRTY,
        });
        result = [...starters, ...flirty];
      } else {
        result = await PhraseService.searchPhrases({
          category: selectedCategory,
        });
      }

      // Deduplicate by id and limit for performance
      const unique: Record<string, boolean> = {};
      const deduped = result.filter(p => (unique[p.id] ? false : (unique[p.id] = true)));
      setPhrases(deduped.slice(0, 20));
    } catch (error) {
      console.error('Error loading phrases:', error);
    } finally {
      setLoading(false);
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
        data={phrases}
        renderItem={renderPhraseItem}
        keyExtractor={item => item.id}
        refreshing={loading}
        onRefresh={loadPhrases}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};


export default CollectionsScreen;
