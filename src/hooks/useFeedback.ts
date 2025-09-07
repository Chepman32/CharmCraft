import { useCallback } from 'react';
import SoundService from '../services/SoundService';
import HapticService from '../services/HapticService';

export const useFeedback = () => {
  const playButtonTap = useCallback(async () => {
    await SoundService.playButtonTap();
    HapticService.lightImpact();
  }, []);

  const playSuccess = useCallback(async () => {
    await SoundService.playSuccess();
    HapticService.success();
  }, []);

  const playError = useCallback(async () => {
    await SoundService.playError();
    HapticService.error();
  }, []);

  const playSelectionChange = useCallback(async () => {
    await SoundService.playButtonTap();
    HapticService.selectionChanged();
  }, []);

  const playMediumImpact = useCallback(async () => {
    await SoundService.playButtonTap();
    HapticService.mediumImpact();
  }, []);

  const playHeavyImpact = useCallback(async () => {
    await SoundService.playButtonTap();
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
