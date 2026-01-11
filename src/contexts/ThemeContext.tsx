import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    accent: string;
    success: string;
    warning: string;
    error: string;
    cardBackground: string;
    tabBarBackground: string;
    statusBarBackground: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
}

export const themes: Record<string, Theme> = {
  light: {
    name: 'Light',
    colors: {
      primary: '#2196F3',
      secondary: '#FF9800',
      background: '#F0F8FF',
      surface: '#FFFFFF',
      text: '#333333',
      textSecondary: '#666666',
      border: '#E0E0E0',
      accent: '#4CAF50',
      success: '#4CAF50',
      warning: '#FF9800',
      error: '#F44336',
      cardBackground: '#FFFFFF',
      tabBarBackground: '#FFFFFF',
      statusBarBackground: '#F0F8FF',
    },
    spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 },
  },
  dark: {
    name: 'Dark',
    colors: {
      primary: '#64B5F6',
      secondary: '#FFB74D',
      background: '#121212',
      surface: '#1E1E1E',
      text: '#FFFFFF',
      textSecondary: '#B0B0B0',
      border: '#333333',
      accent: '#81C784',
      success: '#81C784',
      warning: '#FFB74D',
      error: '#E57373',
      cardBackground: '#2D2D2D',
      tabBarBackground: '#1E1E1E',
      statusBarBackground: '#121212',
    },
    spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 },
  },
  solar: {
    name: 'Solar',
    colors: {
      primary: '#FF8F00',
      secondary: '#FFC107',
      background: '#FFF8E1',
      surface: '#FFFDE7',
      text: '#5D4037',
      textSecondary: '#8D6E63',
      border: '#FFE0B2',
      accent: '#FF6F00',
      success: '#689F38',
      warning: '#F57C00',
      error: '#D32F2F',
      cardBackground: '#FFFDE7',
      tabBarBackground: '#FFFDE7',
      statusBarBackground: '#FFF8E1',
    },
    spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 },
  },
  mono: {
    name: 'Mono',
    colors: {
      primary: '#616161',
      secondary: '#9E9E9E',
      background: '#FAFAFA',
      surface: '#FFFFFF',
      text: '#212121',
      textSecondary: '#757575',
      border: '#E0E0E0',
      accent: '#424242',
      success: '#616161',
      warning: '#757575',
      error: '#424242',
      cardBackground: '#F5F5F5',
      tabBarBackground: '#FFFFFF',
      statusBarBackground: '#FAFAFA',
    },
    spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 },
  },
};

interface ThemeContextType {
  theme: Theme;
  themeName: string;
  setTheme: (themeName: string) => void;
  availableThemes: string[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'kissio_theme';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeName, setThemeName] = useState<string>('light');
  const [theme, setThemeState] = useState<Theme>(themes.light);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme && themes[savedTheme]) {
        setThemeName(savedTheme);
        setThemeState(themes[savedTheme]);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
      // Use default light theme - already set in initial state
      console.warn('Using default light theme due to loading error');
    }
  };

  const setTheme = async (newThemeName: string) => {
    if (themes[newThemeName]) {
      try {
        await AsyncStorage.setItem(THEME_STORAGE_KEY, newThemeName);
        setThemeName(newThemeName);
        setThemeState(themes[newThemeName]);
      } catch (error) {
        console.error('Error saving theme:', error);
        // Still apply theme in memory even if saving fails
        setThemeName(newThemeName);
        setThemeState(themes[newThemeName]);
        console.warn('Theme applied in memory only due to storage error');
      }
    } else {
      console.error(`Invalid theme name: ${newThemeName}`);
      console.warn('Theme not changed due to invalid name');
    }
  };

  const value: ThemeContextType = {
    theme,
    themeName,
    setTheme,
    availableThemes: Object.keys(themes),
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    console.error('useTheme called outside of ThemeProvider');
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
