import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { PhraseCategory, PhraseSituation, PhraseTone } from '../data/phraseTypes';
import { SearchFilters } from '../services/PhraseService';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApplyFilters: (filters: SearchFilters) => void;
  currentFilters: SearchFilters;
}

const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  onApplyFilters,
  currentFilters,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<
    PhraseCategory | undefined
  >(currentFilters.category);
  const [selectedSituation, setSelectedSituation] = useState<
    PhraseSituation | undefined
  >(currentFilters.situation);
  const [selectedTone, setSelectedTone] = useState<PhraseTone | undefined>(
    currentFilters.tone,
  );

  useEffect(() => {
    setSelectedCategory(currentFilters.category);
    setSelectedSituation(currentFilters.situation);
    setSelectedTone(currentFilters.tone);
  }, [currentFilters]);

  const handleApply = () => {
    onApplyFilters({
      category: selectedCategory,
      situation: selectedSituation,
      tone: selectedTone,
    });
    onClose();
  };

  const handleClear = () => {
    setSelectedCategory(undefined);
    setSelectedSituation(undefined);
    setSelectedTone(undefined);
  };

  const formatLabel = (value: string): string => {
    return value.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancelButton}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Filters</Text>
          <TouchableOpacity onPress={handleClear}>
            <Text style={styles.clearButton}>Clear</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          {/* Category Filter */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Category</Text>
            <View style={styles.optionsContainer}>
              {Object.values(PhraseCategory).map(category => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.option,
                    selectedCategory === category && styles.selectedOption,
                  ]}
                  onPress={() =>
                    setSelectedCategory(
                      selectedCategory === category ? undefined : category,
                    )
                  }
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedCategory === category &&
                        styles.selectedOptionText,
                    ]}
                  >
                    {formatLabel(category)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Situation Filter */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Situation</Text>
            <View style={styles.optionsContainer}>
              {Object.values(PhraseSituation).map(situation => (
                <TouchableOpacity
                  key={situation}
                  style={[
                    styles.option,
                    selectedSituation === situation && styles.selectedOption,
                  ]}
                  onPress={() =>
                    setSelectedSituation(
                      selectedSituation === situation ? undefined : situation,
                    )
                  }
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

          {/* Tone Filter */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tone</Text>
            <View style={styles.optionsContainer}>
              {Object.values(PhraseTone).map(tone => (
                <TouchableOpacity
                  key={tone}
                  style={[
                    styles.option,
                    selectedTone === tone && styles.selectedOption,
                  ]}
                  onPress={() =>
                    setSelectedTone(selectedTone === tone ? undefined : tone)
                  }
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
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  cancelButton: {
    fontSize: 16,
    color: '#666666',
  },
  clearButton: {
    fontSize: 16,
    color: '#2196F3',
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
  footer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  applyButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FilterModal;
