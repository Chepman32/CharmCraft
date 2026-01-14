import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from '../contexts/LocalizationContext';
import { Phrase } from '../data/phraseTypes';
import PhraseService from '../services/PhraseService';
import PhraseCard from '../components/PhraseCard';

const FavoritesScreen: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [favorites, setFavorites] = useState<Phrase[]>([]);
  const [loading, setLoading] = useState(true);

  // Don't render until theme is ready
  if (!theme || !theme.colors) {
    return null;
  }

  const loadFavorites = useCallback(async () => {
    try {
      setLoading(true);
      const result = await PhraseService.getFavorites();
      setFavorites(result);
    } catch {
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [loadFavorites]),
  );

  const renderFavoriteItem = ({ item }: { item: Phrase }) => (
    <PhraseCard phrase={item} onFavoriteToggle={loadFavorites} />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text
        style={[styles.emptyStateTitle, { color: theme.colors.textSecondary }]}
      >
        {t('favorites.empty')}
      </Text>
      <Text
        style={[styles.emptyStateText, { color: theme.colors.textSecondary }]}
      >
        {t('favorites.emptyDescription')}
      </Text>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View
        style={[
          styles.header,
          {
            backgroundColor: theme.colors.surface,
            borderBottomColor: theme.colors.border,
          },
        ]}
      >
        <Text style={[styles.title, { color: theme.colors.text }]}>
          {t('favorites.title')}
        </Text>
      </View>

      <FlatList
        data={favorites}
        renderItem={renderFavoriteItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={renderEmptyState}
        refreshing={loading}
        onRefresh={loadFavorites}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          favorites.length === 0 ? styles.emptyListContainer : undefined
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  emptyListContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});

export default FavoritesScreen;
