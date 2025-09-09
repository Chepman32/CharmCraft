import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Clipboard from '@react-native-clipboard/clipboard';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from '../contexts/LocalizationContext';
import { Phrase } from '../data/phraseTypes';
import PhraseService from '../services/PhraseService';

interface PhraseCardProps {
  phrase: Phrase;
  onFavoriteToggle?: () => void;
}

const PhraseCard: React.FC<PhraseCardProps> = ({
  phrase,
  onFavoriteToggle,
}) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const isFavorite = PhraseService.isFavorite(phrase.id);

  const styles = React.useMemo(() => StyleSheet.create({
    container: {
      backgroundColor: theme.colors.cardBackground,
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
      color: theme.colors.text,
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
      color: theme.colors.textSecondary,
      textTransform: 'capitalize',
    },
    copyButton: {
      backgroundColor: theme.colors.primary,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
    },
    copyButtonText: {
      color: '#FFFFFF',
      fontSize: 12,
      fontWeight: 'bold',
    },
  }), [theme]);

  const handleCopy = async () => {
    try {
      Clipboard.setString(phrase.text);
      await PhraseService.recordUsage(phrase.id);
      Alert.alert(t('common.copied'), t('common.phraseCopied'));
    } catch (error) {
      Alert.alert(t('common.error'), 'Failed to copy phrase');
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
      Alert.alert(t('common.error'), 'Failed to update favorites');
    }
  };

  const getCategoryDisplayName = (category: string): string => {
    const categoryTranslations: { [key: string]: string } = {
      'compliment': t('categories.compliment'),
      'compliments_appearance': t('categories.compliment'),
      'compliments_personality': t('categories.compliment'),
      'icebreakers': t('categories.icebreakers'),
      'asking_out': t('categories.asking_out'),
      'deepening_connection': t('categories.deepening_connection'),
      'flirting': t('categories.flirting'),
      'good_morning_night': t('categories.good_morning_night'),
      'romantic': t('categories.asking_out'),
      'conversation_starter': t('categories.icebreakers'),
      'deep': t('categories.deepening_connection'),
      'flirty': t('categories.flirting'),
      'good_morning': t('categories.good_morning_night'),
      'goodnight': t('categories.good_morning_night'),
      'supportive': t('categories.supportive'),
      'funny': t('categories.funny'),
      'apology': t('categories.apologies'),
      'casual': t('categories.everyday'),
      'relationship_building': t('categories.longDistance'),
    };
    
    return categoryTranslations[category] || category.replace('_', ' ').toUpperCase();
  };

  const getCategoryColor = (category: string): string => {
    const colors: { [key: string]: string } = {
      conversation_starter: '#4CAF50',
      compliment: '#FF9800',
      compliments_appearance: '#FF9800',
      compliments_personality: '#FF9800',
      flirty: '#E91E63',
      flirting: '#E91E63',
      romantic: '#F44336',
      asking_out: '#F44336',
      supportive: '#2196F3',
      funny: '#FFEB3B',
      deep: '#9C27B0',
      deepening_connection: '#9C27B0',
      casual: '#607D8B',
      apology: '#795548',
      goodnight: '#3F51B5',
      good_morning: '#FF5722',
      good_morning_night: '#FF5722',
      relationship_building: '#009688',
      icebreakers: '#4CAF50',
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
            {getCategoryDisplayName(phrase.category).toUpperCase()}
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
            {t(`situations.${phrase.situation}`)} • {t(`tones.${phrase.tone}`)}
          </Text>
        </View>
        <TouchableOpacity onPress={handleCopy} style={styles.copyButton}>
          <Text style={styles.copyButtonText}>{t('common.copy')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default PhraseCard;
