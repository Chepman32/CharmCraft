import { Vibration, Platform } from 'react-native';
import HapticFeedback from 'react-native-haptic-feedback';

export type HapticType =
  | 'light'
  | 'medium'
  | 'heavy'
  | 'success'
  | 'warning'
  | 'error';

const IOS_HAPTIC_MAP: Record<HapticType, string> = {
  light: 'impactLight',
  medium: 'impactMedium',
  heavy: 'impactHeavy',
  success: 'notificationSuccess',
  warning: 'notificationWarning',
  error: 'notificationError',
};

const HAPTIC_OPTIONS = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

class HapticService {
  private initialized = false;

  async initialize(): Promise<void> {
    if (this.initialized) return;

    this.initialized = true;
  }

  async triggerHaptic(type: HapticType = 'light'): Promise<void> {
    try {
      // Settings check is handled by SettingsService before calling this method

      if (Platform.OS === 'ios') {
        // iOS has more sophisticated haptic feedback
        this.triggerIOSHaptic(type);
      } else if (Platform.OS === 'android') {
        // Android uses vibration patterns
        this.triggerAndroidVibration(type);
      }
    } catch {
    }
  }

  private triggerIOSHaptic(type: HapticType): void {
    try {
      const feedbackType = IOS_HAPTIC_MAP[type] ?? IOS_HAPTIC_MAP.light;
      HapticFeedback.trigger(feedbackType, HAPTIC_OPTIONS);
    } catch {
      this.triggerIOSVibration(type);
    }
  }

  private triggerIOSVibration(type: HapticType): void {
    try {
      switch (type) {
        case 'light':
          Vibration.vibrate(10);
          break;
        case 'medium':
          Vibration.vibrate(25);
          break;
        case 'heavy':
          Vibration.vibrate(50);
          break;
        case 'success':
          Vibration.vibrate([0, 10, 50, 10]);
          break;
        case 'warning':
          Vibration.vibrate([0, 25, 100, 25]);
          break;
        case 'error':
          Vibration.vibrate([0, 50, 100, 50, 100, 50]);
          break;
        default:
          Vibration.vibrate(10);
      }
    } catch {
    }
  }

  private triggerAndroidVibration(type: HapticType): void {
    try {
      switch (type) {
        case 'light':
          Vibration.vibrate(15);
          break;
        case 'medium':
          Vibration.vibrate(30);
          break;
        case 'heavy':
          Vibration.vibrate(60);
          break;
        case 'success':
          Vibration.vibrate([0, 15, 60, 15]);
          break;
        case 'warning':
          Vibration.vibrate([0, 30, 120, 30]);
          break;
        case 'error':
          Vibration.vibrate([0, 60, 120, 60, 120, 60]);
          break;
        default:
          Vibration.vibrate(15);
      }
    } catch {
    }
  }

  // Convenience methods for common haptic patterns
  async tapFeedback(): Promise<void> {
    await this.triggerHaptic('light');
  }

  async buttonPress(): Promise<void> {
    await this.triggerHaptic('medium');
  }

  async successFeedback(): Promise<void> {
    await this.triggerHaptic('success');
  }

  async errorFeedback(): Promise<void> {
    await this.triggerHaptic('error');
  }

  async warningFeedback(): Promise<void> {
    await this.triggerHaptic('warning');
  }

  // Backwards-compatible aliases expected by some hooks/components
  lightImpact(): void {
    void this.triggerHaptic('light');
  }

  mediumImpact(): void {
    void this.triggerHaptic('medium');
  }

  heavyImpact(): void {
    void this.triggerHaptic('heavy');
  }

  success(): void {
    void this.triggerHaptic('success');
  }

  error(): void {
    void this.triggerHaptic('error');
  }

  selectionChanged(): void {
    void this.triggerHaptic('medium');
  }

  // Cancel any ongoing vibration
  cancelHaptic(): void {
    try {
      Vibration.cancel();
    } catch {
    }
  }

  // Check if haptic feedback is available on the device
  isHapticAvailable(): boolean {
    return Platform.OS === 'ios' || Platform.OS === 'android';
  }
}

export default new HapticService();
