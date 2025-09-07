# Settings Screen with Theme and Localization Design

## Overview

This design implements a comprehensive Settings screen with theme switching, multi-language localization, and user preference controls. The system uses React Context for theme management and AsyncStorage for persistence, ensuring a seamless user experience across app sessions.

## Architecture

### Theme System Architecture

```
ThemeContext (React Context)
├── ThemeProvider (Wraps entire app)
├── Theme definitions (4 themes with color palettes)
├── Theme switching logic
└── Persistent storage integration

Components consume theme via useTheme() hook
```

### Localization Architecture

```
LocalizationContext (React Context)
├── LocalizationProvider (Wraps entire app)
├── Translation files (10 languages)
├── Language switching logic
└── Persistent storage integration

Components consume translations via useTranslation() hook
```

### Settings Storage Architecture

```
SettingsService
├── Theme persistence
├── Language persistence
├── Sound/Haptics preferences
└── AsyncStorage integration
```

## Components and Interfaces

### 1. Theme System

#### Theme Interface

```typescript
interface Theme {
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
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
}
```

#### Theme Definitions

- **Light Theme**: White backgrounds, dark text, blue accents
- **Dark Theme**: Dark backgrounds, light text, blue accents
- **Solar Theme**: Warm yellow/orange palette, cream backgrounds
- **Mono Theme**: Grayscale palette, various gray shades

#### ThemeContext

```typescript
interface ThemeContextType {
  theme: Theme;
  themeName: string;
  setTheme: (themeName: string) => void;
  availableThemes: string[];
}
```

### 2. Localization System

#### Translation Interface

```typescript
interface Translations {
  navigation: {
    home: string;
    favorites: string;
    collections: string;
    settings: string;
  };
  settings: {
    title: string;
    theme: string;
    language: string;
    sound: string;
    haptics: string;
  };
  themes: {
    light: string;
    dark: string;
    solar: string;
    mono: string;
  };
  // ... more translation keys
}
```

#### LocalizationContext

```typescript
interface LocalizationContextType {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
  availableLanguages: Language[];
}
```

### 3. Settings Screen Components

#### SettingsScreen

- Main settings container
- Sections for Theme, Language, Sound, Haptics
- Uses theme colors and translations

#### SettingSection

- Reusable section component
- Title, description, and control elements
- Themed styling

#### ThemeSelector

- Grid of theme options with previews
- Visual indicators for current selection
- Immediate theme switching

#### LanguageSelector

- List of available languages with native names
- Current language indicator
- Immediate language switching

#### ToggleSwitch

- Custom toggle component for Sound/Haptics
- Themed styling and haptic feedback

### 4. Settings Service

#### SettingsService Class

```typescript
class SettingsService {
  async getTheme(): Promise<string>;
  async setTheme(theme: string): Promise<void>;
  async getLanguage(): Promise<string>;
  async setLanguage(language: string): Promise<void>;
  async getSoundEnabled(): Promise<boolean>;
  async setSoundEnabled(enabled: boolean): Promise<void>;
  async getHapticsEnabled(): Promise<boolean>;
  async setHapticsEnabled(enabled: boolean): Promise<void>;
}
```

## Data Models

### Theme Data Model

```typescript
const themes: Record<string, Theme> = {
  light: {
    name: 'Light',
    colors: {
      primary: '#2196F3',
      secondary: '#FF9800',
      background: '#FFFFFF',
      surface: '#F5F5F5',
      text: '#333333',
      textSecondary: '#666666',
      border: '#E0E0E0',
      accent: '#4CAF50',
      success: '#4CAF50',
      warning: '#FF9800',
      error: '#F44336',
    },
    spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 },
  },
  // ... other themes
};
```

### Language Data Model

```typescript
interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  // ... other languages
];
```

## Error Handling

### Theme Loading Errors

- Fallback to Light theme if saved theme is invalid
- Error logging for debugging
- Graceful degradation

### Translation Loading Errors

- Fallback to English if translation key missing
- Error logging for missing translations
- Partial translation support

### Storage Errors

- Handle AsyncStorage failures gracefully
- Use in-memory fallbacks
- Retry mechanisms for critical operations

## Testing Strategy

### Unit Tests

- Theme switching logic
- Translation key resolution
- Settings persistence
- Error handling scenarios

### Integration Tests

- Theme application across components
- Language switching flow
- Settings screen interactions
- Storage integration

### Visual Tests

- Theme color verification
- Component styling in all themes
- Text rendering in all languages
- Accessibility compliance

## Performance Considerations

### Theme Switching

- Minimize re-renders using React.memo
- Efficient context updates
- Smooth transitions

### Translation Loading

- Lazy loading of translation files
- Caching of frequently used translations
- Minimal bundle size impact

### Storage Operations

- Debounced settings saves
- Batch operations where possible
- Background persistence

## Accessibility

### Theme Support

- High contrast ratios in all themes
- Consistent focus indicators
- Screen reader compatibility

### Localization Support

- RTL language support preparation
- Cultural date/time formatting
- Accessible language selection

## Migration Strategy

### From Builder to Settings

- Replace BuilderScreen with SettingsScreen
- Update navigation configuration
- Maintain existing user data

### Theme Integration

- Wrap existing components with theme providers
- Gradually migrate components to use theme colors
- Maintain backward compatibility during transition
