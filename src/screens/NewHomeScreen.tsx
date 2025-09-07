import React, { useState, useEffect } from 'react';
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
// import { LinearGradient } from 'react-native-linear-gradient';
import PhraseService, { SearchFilters } from '../services/PhraseService';
import { PhraseCategory, PhraseTone } from '../data/phrases';
import Clipboard from '@react-native-clipboard/clipboard';

const { width } = Dimensions.get('window');

const NewHomeScreen: React.FC = () => {
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

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      await PhraseService.initialize();
      await generateNewPhrase();
    } catch (error) {
      console.error('Error initializing app:', error);
    } finally {
      setInitializing(false);
    }
  };

  const categoryButtons = [
    { key: PhraseCategory.CONVERSATION_STARTER, label: 'Icebreakers' },
    { key: PhraseCategory.COMPLIMENT, label: 'Compliments' },
    { key: PhraseCategory.APOLOGY, label: 'Apologies' },
    { key: PhraseCategory.ROMANTIC, label: 'Long-distance' },
    { key: PhraseCategory.CASUAL, label: 'Everyday' },
    { key: PhraseCategory.GOOD_MORNING, label: 'Birthday' },
  ];

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

  const generateNewPhrase = async () => {
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
  };

  const handleCopyPhrase = () => {
    Clipboard.setString(currentPhrase);
    Alert.alert('Copied!', 'Phrase copied to clipboard');
  };

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
      <View style={styles.gradient}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>CharmCraft</Text>
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
                placeholder="Search"
                value={searchText}
                onChangeText={setSearchText}
                placeholderTextColor="#999"
              />
            </View>
          </View>

          {/* Category Buttons */}
          <View style={styles.categoryContainer}>
            {categoryButtons.map((category, index) => (
              <TouchableOpacity
                key={category.key}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.key &&
                    styles.categoryButtonActive,
                ]}
                onPress={() =>
                  setSelectedCategory(
                    selectedCategory === category.key ? null : category.key,
                  )
                }
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
            <Text style={styles.phraseText}>{currentPhrase}</Text>
          </TouchableOpacity>

          {/* Intensity Selector */}
          <View style={styles.intensityContainer}>
            <Text style={styles.intensityLabel}>Intensity</Text>
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
                    onPress={() => setIntensity(level as any)}
                  >
                    <Text
                      style={[
                        styles.intensityButtonText,
                        intensity === level && styles.intensityButtonTextActive,
                      ]}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* Get Suggestion Button */}
          <TouchableOpacity
            style={styles.suggestionButton}
            onPress={generateNewPhrase}
          >
            <Text style={styles.suggestionButtonText}>Get Suggestion</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  gradient: {
    flex: 1,
    backgroundColor: '#F0F8FF',
  },
  scrollView: {
    flex: 1,
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
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333333',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
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
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
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
  categoryButtonActive: {
    backgroundColor: '#E3F2FD',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  categoryButtonTextActive: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
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
  intensityContainer: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  intensityLabel: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '600',
    marginBottom: 15,
  },
  intensitySlider: {
    position: 'relative',
  },
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
  intensityButtonActive: {
    backgroundColor: 'transparent',
  },
  intensityButtonText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  intensityButtonTextActive: {
    color: '#333333',
    fontWeight: 'bold',
  },
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

export default NewHomeScreen;
