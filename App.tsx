/**
 * Kissio - Relationship Advice App
 * Perfect words for every moment
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';
import { LocalizationProvider } from './src/contexts/LocalizationContext';
import SettingsService from './src/services/SettingsService';
import SoundService from './src/services/SoundService';
import HapticService from './src/services/HapticService';
import AppNavigator from './src/navigation/AppNavigator';
import LiquidSplashScreen from './src/components/LiquidSplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';

const AppContent: React.FC = () => {
  const { theme } = useTheme();
  const [splashComplete, setSplashComplete] = useState(false);
  const [splashBlobStyle, setSplashBlobStyle] = useState('aqua');
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [onboardingReady, setOnboardingReady] = useState(false);

  useEffect(() => {
    const initializeServices = async () => {
      try {
        await SettingsService.initialize();
        await SoundService.initialize();
        await HapticService.initialize();
        const settings = SettingsService.getSettings();
        setSplashBlobStyle(settings.splashBlobStyle || 'aqua');
        const onboardingStatus = await SettingsService.getOnboardingComplete();
        setOnboardingComplete(onboardingStatus);
        setOnboardingReady(true);
      } catch {
        setOnboardingReady(true);
      }
    };

    initializeServices();
  }, []);

  // Provide fallback theme if not ready
  const safeTheme = theme || {
    name: 'light',
    colors: {
      statusBarBackground: '#F0F8FF',
    },
  };

  return (
    <>
      <StatusBar
        barStyle={safeTheme.name === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={safeTheme.colors.statusBarBackground}
      />
      {onboardingReady &&
        (onboardingComplete ? (
          <AppNavigator />
        ) : (
          <OnboardingScreen
            onFinish={async () => {
              try {
                await SettingsService.setOnboardingComplete(true);
              } finally {
                setOnboardingComplete(true);
              }
            }}
          />
        ))}
      {!splashComplete && (
        <LiquidSplashScreen
          blobStyle={splashBlobStyle}
          onAnimationComplete={() => setSplashComplete(true)}
        />
      )}
    </>
  );
};

function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <LocalizationProvider>
          <AppContent />
        </LocalizationProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
