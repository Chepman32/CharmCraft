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
import SimpleTest from './src/components/SimpleTest';
import LiquidSplashScreen from './src/components/LiquidSplashScreen';
import './src/utils/AppTester'; // Auto-run tests in development

const AppContent: React.FC = () => {
  const { theme } = useTheme();
  const [splashComplete, setSplashComplete] = useState(false);
  const [splashBlobStyle, setSplashBlobStyle] = useState('aqua');

  useEffect(() => {
    const initializeServices = async () => {
      try {
        await SettingsService.initialize();
        await SoundService.initialize();
        await HapticService.initialize();
        const settings = SettingsService.getSettings();
        setSplashBlobStyle(settings.splashBlobStyle || 'aqua');
      } catch (error) {
        console.error('Error initializing services:', error);
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
      <AppNavigator />
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
