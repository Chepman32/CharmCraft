import { useCallback } from 'react';
import SettingsService from '../services/SettingsService';

export const useFeedback = () => {
  const playButtonTap = useCallback(async () => {
    SettingsService.triggerHapticFeedback('light');
  }, []);

  const playSuccess = useCallback(async () => {
    SettingsService.triggerHapticFeedback('success');
  }, []);

  const playError = useCallback(async () => {
    SettingsService.triggerHapticFeedback('error');
  }, []);

  const playSelectionChange = useCallback(async () => {
    SettingsService.triggerHapticFeedback('light');
  }, []);

  const playMediumImpact = useCallback(async () => {
    SettingsService.triggerHapticFeedback('medium');
  }, []);

  const playHeavyImpact = useCallback(async () => {
    SettingsService.triggerHapticFeedback('heavy');
  }, []);

  return {
    playButtonTap,
    playSuccess,
    playError,
    playSelectionChange,
    playMediumImpact,
    playHeavyImpact,
  };
};
