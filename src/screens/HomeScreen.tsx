import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Phrase } from '../data/phrases';
import PhraseService, { SearchFilters } from '../services/PhraseService';
import PhraseCard from '../components/PhraseCard';
import FilterModal from '../components/FilterModal';
import { useTranslation } from '../contexts/LocalizationContext';

const HomeScreen: React.FC = () => {
  const { language } = useTranslation();
  const [phrases, setPhrases] = useState<Phrase[]>([]);
  const [searchText, setSearchText] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({});
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'favorites' | 'popular'>(
    'all',
  );

  useEffect(() => {
    initializeApp();
  }, []);

  useEffect(() => {
    if (!initializing) {
      loadPhrases();
    }
  }, [filters, searchText, activeTab, initializing, language]);

  const initializeApp = async () => {
    try {
      setInitializing(true);
      await PhraseService.initialize();
    } catch (error) {
      console.error('Error initializing app:', error);
    } finally {
      setInitializing(false);
    }
  };

  const loadPhrases = async () => {
    try {
      setLoading(true);
      let result: Phrase[] = [];

      if (activeTab === 'favorites') {
        result = await PhraseService.getFavorites();
      } else if (activeTab === 'popular') {
        result = await PhraseService.getMostUsedPhrases(20);
      } else {
        const searchFilters = { ...filters };
        if (searchText.trim()) {
          searchFilters.searchText = searchText.trim();
        }
        result = await PhraseService.searchPhrases(searchFilters);
      }

      setPhrases(result);
    } catch (error) {
      console.error('Error loading phrases:', error);
      Alert.alert('Error', 'Failed to load phrases');
    } finally {
      setLoading(false);
    }
  };

  const handleGetRandomPhrase = async () => {
    try {
      const randomPhrase = await PhraseService.getRandomPhrase(filters);
      if (randomPhrase) {
        Alert.alert('Random Phrase', randomPhrase.text, [
          { text: 'Copy', onPress: () => copyPhrase(randomPhrase) },
          { text: 'Close', style: 'cancel' },
        ]);
      } else {
        Alert.alert('No Results', 'No phrases found with current filters');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to get random phrase');
    }
  };

  const copyPhrase = async (phrase: Phrase) => {
    try {
      await PhraseService.recordUsage(phrase.id);
      // Copy functionality is handled in PhraseCard
    } catch (error) {
      console.error('Error recording usage:', error);
    }
  };

  const handleApplyFilters = (newFilters: SearchFilters) => {
    setFilters(newFilters);
  };

  const getActiveFiltersCount = (): number => {
    let count = 0;
    if (filters.category) count++;
    if (filters.situation) count++;
    if (filters.tone) count++;
    return count;
  };

  const renderPhraseItem = ({ item }: { item: Phrase }) => (
    <PhraseCard phrase={item} onFavoriteToggle={loadPhrases} />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateTitle}>No phrases found</Text>
      <Text style={styles.emptyStateText}>
        Try adjusting your search or filters to find more phrases.
      </Text>
    </View>
  );

  if (initializing) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingTitle}>CharmCraft</Text>
          <Text style={styles.loadingText}>
            Loading your perfect phrases...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>CharmCraft</Text>
        <Text style={styles.subtitle}>Perfect words for every moment</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search phrases..."
          value={searchText}
          onChangeText={setSearchText}
          returnKeyType="search"
        />
        <TouchableOpacity
          style={[
            styles.filterButton,
            getActiveFiltersCount() > 0 && styles.filterButtonActive,
          ]}
          onPress={() => setShowFilters(true)}
        >
          <Text style={styles.filterButtonText}>
            Filters{' '}
            {getActiveFiltersCount() > 0 && `(${getActiveFiltersCount()})`}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'all' && styles.activeTab]}
          onPress={() => setActiveTab('all')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'all' && styles.activeTabText,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'favorites' && styles.activeTab]}
          onPress={() => setActiveTab('favorites')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'favorites' && styles.activeTabText,
            ]}
          >
            Favorites
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'popular' && styles.activeTab]}
          onPress={() => setActiveTab('popular')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'popular' && styles.activeTabText,
            ]}
          >
            Popular
          </Text>
        </TouchableOpacity>
      </View>

      {/* Random Phrase Button */}
      <TouchableOpacity
        style={styles.randomButton}
        onPress={handleGetRandomPhrase}
      >
        <Text style={styles.randomButtonText}>✨ Get Random Phrase</Text>
      </TouchableOpacity>

      {/* Phrases List */}
      <FlatList
        data={phrases}
        renderItem={renderPhraseItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={renderEmptyState}
        refreshing={loading}
        onRefresh={loadPhrases}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          phrases.length === 0 ? styles.emptyListContainer : undefined
        }
      />

      {/* Filter Modal */}
      <FilterModal
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        onApplyFilters={handleApplyFilters}
        currentFilters={filters}
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
    backgroundColor: '#2196F3',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#E3F2FD',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  filterButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#2196F3',
  },
  tabText: {
    fontSize: 16,
    color: '#666666',
  },
  activeTabText: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
  randomButton: {
    backgroundColor: '#FF9800',
    marginHorizontal: 16,
    marginBottom: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  randomButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
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
  loadingText: {
    fontSize: 16,
    color: '#E3F2FD',
  },
});

export default HomeScreen;
