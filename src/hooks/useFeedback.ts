import { useCallback } from 'react';
import SoundService from '../services/SoundService';
import HapticService from '../services/HapticService';

export const useFeedback = () => {
  const playButtonTap = useCallback(() => {
    SoundService.playButtonTap();
    HapticService.lightImpact();
  }, []);

  const playSuccess = useCallback(() => {
    SoundService.playSuccess();
    HapticService.success();
  }, []);

  const playError = useCallback(() => {
    SoundService.playError();
    HapticService.error();
  }, []);

  const playSelectionChange = useCallback(() => {
    SoundService.playButtonTap();
    HapticService.selectionChanged();
  }, []);

  const playMediumImpact = useCallback(() => {
    SoundService.playButtonTap();
    HapticService.mediumImpact();
  }, []);

  const playHeavyImpact = useCallback(() => {
    SoundService.playButtonTap();
    HapticService.heavyImpact();
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
