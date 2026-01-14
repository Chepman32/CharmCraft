import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from '../contexts/LocalizationContext';
import PhraseService from '../services/PhraseService';
import { Phrase } from '../data/phraseTypes';
import PhraseCard from '../components/PhraseCard';

const SearchScreen: React.FC = () => {
  const { theme } = useTheme();
  const { t, language } = useTranslation();
  const [searchText, setSearchText] = useState('');
  const [phrases, setPhrases] = useState<Phrase[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const loadPhrases = useCallback(async () => {
    const query = searchText.trim();
    if (!query) {
      setPhrases([]);
      return;
    }

    try {
      setLoading(true);
      const result = await PhraseService.searchPhrases({ searchText: query });
      setPhrases(result);
    } catch {
    } finally {
      setLoading(false);
    }
  }, [searchText]);

  const loadMore = useCallback(async () => {
    const query = searchText.trim();
    if (!query || loadingMore) return;

    try {
      setLoadingMore(true);
      await PhraseService.loadMorePhrasesOnDemand();
      const result = await PhraseService.searchPhrases(
        { searchText: query },
        false,
      );
      setPhrases(result);
    } catch {
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, searchText]);

  useEffect(() => {
    void loadPhrases();
  }, [loadPhrases, language]);

  if (!theme || !theme.colors) {
    return null;
  }

  const styles = StyleSheet.create({
    keyboardAvoidingView: {
      flex: 1,
    },
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
    searchContainer: {
      paddingHorizontal: 20,
      paddingVertical: 12,
      backgroundColor: theme.colors.background,
    },
    searchInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderRadius: 22,
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderWidth: 1,
      borderColor: theme.colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 3,
      elevation: 2,
    },
    searchIcon: {
      marginRight: 10,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      color: theme.colors.text,
    },
    emptyState: {
      padding: 32,
      alignItems: 'center',
    },
    emptyTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: 8,
    },
    emptyDescription: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },
  });

  const renderPhraseItem = ({ item }: { item: Phrase }) => (
    <PhraseCard phrase={item} onFavoriteToggle={loadPhrases} />
  );

  const renderEmptyState = () => {
    if (!searchText.trim()) {
      return (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>{t('search.helperTitle')}</Text>
          <Text style={styles.emptyDescription}>
            {t('search.helperDescription')}
          </Text>
        </View>
      );
    }

    if (loading) {
      return null;
    }

    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyTitle}>{t('search.emptyTitle')}</Text>
        <Text style={styles.emptyDescription}>
          {t('search.emptyDescription')}
        </Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{t('search.title')}</Text>
        </View>
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder={t('search.placeholder')}
              placeholderTextColor={theme.colors.textSecondary}
              value={searchText}
              onChangeText={setSearchText}
              returnKeyType="search"
            />
          </View>
        </View>
        <FlatList
          data={phrases}
          renderItem={renderPhraseItem}
          keyExtractor={item => item.id}
          refreshing={loading}
          onRefresh={loadPhrases}
          onEndReachedThreshold={0.5}
          onEndReached={loadMore}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmptyState}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SearchScreen;
