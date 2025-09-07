import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Clipboard from '@react-native-clipboard/clipboard';
import { Phrase } from '../data/phrases';
import PhraseService from '../services/PhraseService';

interface PhraseCardProps {
  phrase: Phrase;
  onFavoriteToggle?: () => void;
}

const PhraseCard: React.FC<PhraseCardProps> = ({
  phrase,
  onFavoriteToggle,
}) => {
  const isFavorite = PhraseService.isFavorite(phrase.id);

  const handleCopy = async () => {
    try {
      Clipboard.setString(phrase.text);
      await PhraseService.recordUsage(phrase.id);
      Alert.alert('Copied!', 'Phrase copied to clipboard');
    } catch (error) {
      Alert.alert('Error', 'Failed to copy phrase');
    }
  };

  const handleFavoriteToggle = async () => {
    try {
      if (isFavorite) {
        await PhraseService.removeFromFavorites(phrase.id);
      } else {
        await PhraseService.addToFavorites(phrase.id);
      }
      onFavoriteToggle?.();
    } catch (error) {
      Alert.alert('Error', 'Failed to update favorites');
    }
  };

  const getCategoryColor = (category: string): string => {
    const colors: { [key: string]: string } = {
      conversation_starter: '#4CAF50',
      compliment: '#FF9800',
      flirty: '#E91E63',
      romantic: '#F44336',
      supportive: '#2196F3',
      funny: '#FFEB3B',
      deep: '#9C27B0',
      casual: '#607D8B',
      apology: '#795548',
      goodnight: '#3F51B5',
      good_morning: '#FF5722',
      relationship_building: '#009688',
    };
    return colors[category] || '#757575';
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View
          style={[
            styles.categoryBadge,
            { backgroundColor: getCategoryColor(phrase.category) },
          ]}
        >
          <Text style={styles.categoryText}>
            {phrase.category.replace('_', ' ').toUpperCase()}
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleFavoriteToggle}
          style={styles.favoriteButton}
        >
          <Icon
            name={isFavorite ? 'favorite' : 'favorite-border'}
            size={20}
            color={isFavorite ? '#F44336' : '#757575'}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.phraseText}>{phrase.text}</Text>

      <View style={styles.footer}>
        <View style={styles.tags}>
          <Text style={styles.situationText}>
            {phrase.situation.replace('_', ' ')} • {phrase.tone}
          </Text>
        </View>
        <TouchableOpacity onPress={handleCopy} style={styles.copyButton}>
          <Text style={styles.copyButtonText}>Copy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  favoriteButton: {
    padding: 4,
  },
  phraseText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333333',
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tags: {
    flex: 1,
  },
  situationText: {
    fontSize: 12,
    color: '#666666',
    textTransform: 'capitalize',
  },
  copyButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  copyButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default PhraseCard;
