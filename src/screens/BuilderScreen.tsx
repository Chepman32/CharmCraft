import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { PhraseCategory, PhraseSituation, PhraseTone } from '../data/phraseTypes';
import PhraseService from '../services/PhraseService';
import Clipboard from '@react-native-clipboard/clipboard';

const BuilderScreen: React.FC = () => {
  const [customText, setCustomText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<PhraseCategory>(
    PhraseCategory.COMPLIMENT,
  );
  const [selectedSituation, setSelectedSituation] = useState<PhraseSituation>(
    PhraseSituation.DAILY_CHAT,
  );
  const [selectedTone, setSelectedTone] = useState<PhraseTone>(
    PhraseTone.SINCERE,
  );
  const [generatedPhrase, setGeneratedPhrase] = useState('');

  const categories = Object.values(PhraseCategory);
  const situations = Object.values(PhraseSituation);
  const tones = Object.values(PhraseTone);

  const generatePhrase = async () => {
    try {
      const phrase = await PhraseService.getRandomPhrase({
        category: selectedCategory,
        situation: selectedSituation,
        tone: selectedTone,
        searchText: customText.trim() || undefined,
      });

      if (phrase) {
        setGeneratedPhrase(phrase.text);
        await PhraseService.recordUsage(phrase.id);
      } else {
        Alert.alert(
          'No Results',
          'No phrases found with these criteria. Try different options.',
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to generate phrase');
    }
  };

  const copyPhrase = () => {
    if (generatedPhrase) {
      Clipboard.setString(generatedPhrase);
      Alert.alert('Copied!', 'Phrase copied to clipboard');
    }
  };

  const formatLabel = (value: string): string => {
    return value.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Phrase Builder</Text>
        <Text style={styles.subtitle}>Customize your perfect message</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Custom Keywords */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Keywords (Optional)</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter keywords to include..."
            value={customText}
            onChangeText={setCustomText}
            multiline
          />
        </View>

        {/* Category Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Category</Text>
          <View style={styles.optionsContainer}>
            {categories.slice(0, 6).map(category => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.option,
                  selectedCategory === category && styles.selectedOption,
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedCategory === category && styles.selectedOptionText,
                  ]}
                >
                  {formatLabel(category)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Situation Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Situation</Text>
          <View style={styles.optionsContainer}>
            {situations.slice(0, 4).map(situation => (
              <TouchableOpacity
                key={situation}
                style={[
                  styles.option,
                  selectedSituation === situation && styles.selectedOption,
                ]}
                onPress={() => setSelectedSituation(situation)}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedSituation === situation &&
                      styles.selectedOptionText,
                  ]}
                >
                  {formatLabel(situation)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Tone Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tone</Text>
          <View style={styles.optionsContainer}>
            {tones.slice(0, 4).map(tone => (
              <TouchableOpacity
                key={tone}
                style={[
                  styles.option,
                  selectedTone === tone && styles.selectedOption,
                ]}
                onPress={() => setSelectedTone(tone)}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedTone === tone && styles.selectedOptionText,
                  ]}
                >
                  {formatLabel(tone)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Generate Button */}
        <TouchableOpacity
          style={styles.generateButton}
          onPress={generatePhrase}
        >
          <Text style={styles.generateButtonText}>Generate Phrase</Text>
        </TouchableOpacity>

        {/* Generated Phrase */}
        {generatedPhrase ? (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>Generated Phrase:</Text>
            <TouchableOpacity
              style={styles.phraseContainer}
              onPress={copyPhrase}
            >
              <Text style={styles.phraseText}>{generatedPhrase}</Text>
              <Text style={styles.tapToCopy}>Tap to copy</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </ScrollView>
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
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    minHeight: 80,
    textAlignVertical: 'top',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  option: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedOption: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  optionText: {
    fontSize: 14,
    color: '#666666',
  },
  selectedOptionText: {
    color: '#FFFFFF',
  },
  generateButton: {
    backgroundColor: '#FF9800',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  generateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginBottom: 24,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
  },
  phraseContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  phraseText: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 24,
    marginBottom: 8,
  },
  tapToCopy: {
    fontSize: 12,
    color: '#2196F3',
    textAlign: 'center',
  },
});

export default BuilderScreen;
