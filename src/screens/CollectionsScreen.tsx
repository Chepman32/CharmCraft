import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Phrase, PhraseCategory } from '../data/phrases';
import PhraseService from '../services/PhraseService';
import PhraseCard from '../components/PhraseCard';

const CollectionsScreen: React.FC = () => {
  const [phrases, setPhrases] = useState<Phrase[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<PhraseCategory>(
    PhraseCategory.COMPLIMENT,
  );
  const [loading, setLoading] = useState(true);

  const categories = [
    { key: PhraseCategory.COMPLIMENT, label: 'Compliments' },
    { key: PhraseCategory.ROMANTIC, label: 'Romantic' },
    { key: PhraseCategory.FLIRTY, label: 'Flirty' },
    { key: PhraseCategory.SUPPORTIVE, label: 'Supportive' },
    { key: PhraseCategory.FUNNY, label: 'Funny' },
    { key: PhraseCategory.CONVERSATION_STARTER, label: 'Conversation' },
  ];

  useEffect(() => {
    loadPhrases();
  }, [selectedCategory]);

  const loadPhrases = async () => {
    try {
      setLoading(true);
      const result = await PhraseService.searchPhrases({
        category: selectedCategory,
      });
      setPhrases(result.slice(0, 20)); // Limit to 20 for performance
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
        <Text style={styles.title}>Collections</Text>
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
  categoryContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  categoryTabActive: {
    backgroundColor: '#2196F3',
  },
  categoryTabText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  categoryTabTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default CollectionsScreen;
