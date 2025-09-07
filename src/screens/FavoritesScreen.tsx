import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { Phrase } from '../data/phrases';
import PhraseService from '../services/PhraseService';
import PhraseCard from '../components/PhraseCard';

const FavoritesScreen: React.FC = () => {
  const [favorites, setFavorites] = useState<Phrase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      const result = await PhraseService.getFavorites();
      setFavorites(result);
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderFavoriteItem = ({ item }: { item: Phrase }) => (
    <PhraseCard phrase={item} onFavoriteToggle={loadFavorites} />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateTitle}>No favorites yet</Text>
      <Text style={styles.emptyStateText}>
        Start adding phrases to your favorites from the home screen!
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Favorites</Text>
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
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666666',
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'center',
    lineHeight: 20,
  },
  emptyListContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});

export default FavoritesScreen;
