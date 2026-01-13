declare module 'react-native-haptic-feedback' {
  type HapticFeedbackOptions = {
    enableVibrateFallback?: boolean;
    ignoreAndroidSystemSettings?: boolean;
  };

  const HapticFeedback: {
    trigger: (type: string, options?: HapticFeedbackOptions) => void;
  };

  export default HapticFeedback;
}
