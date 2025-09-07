import React from 'react';

export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public originalError?: Error,
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const handleAsyncStorageError = (error: any): void => {
  console.error('AsyncStorage Error:', error);

  if (
    error.message?.includes('AsyncStorage is null') ||
    error.message?.includes('AsyncStorage is not available')
  ) {
    console.warn('AsyncStorage is not available. Running in fallback mode.');
  }
};

export const handleDatabaseError = (error: any): void => {
  console.error('Database Error:', error);

  if (
    error.message?.includes('out of memory') ||
    error.message?.includes('heap')
  ) {
    console.warn('Memory issue loading database. Using fallback data.');
  }
};

export const handleThemeError = (
  error: any,
  fallbackTheme: string = 'light',
): string => {
  console.error('Theme Error:', error);
  console.warn(`Theme loading failed, falling back to ${fallbackTheme} theme`);
  return fallbackTheme;
};

export const handleTranslationError = (
  error: any,
  key: string,
  fallbackLanguage: string = 'en',
): string => {
  console.error('Translation Error:', error);
  console.warn(
    `Translation missing for key: ${key}, falling back to ${fallbackLanguage}`,
  );
  return key; // Return the key itself as fallback
};

export const handleSoundError = (error: any): void => {
  console.error('Sound Error:', error);
  console.warn('Sound playback failed, continuing without sound');
};

export const handleHapticError = (error: any): void => {
  console.error('Haptic Error:', error);
  console.warn('Haptic feedback failed, continuing without haptics');
};

export const logError = (error: Error | string, context?: string): void => {
  const timestamp = new Date().toISOString();
  const errorMessage = typeof error === 'string' ? error : error.message;
  const stack = typeof error === 'object' && error.stack ? error.stack : '';

  console.error(
    `[${timestamp}] ${context ? `[${context}] ` : ''}${errorMessage}`,
  );
  if (stack) {
    console.error(stack);
  }
};

export const createErrorBoundary = (fallbackComponent: React.ComponentType) => {
  return class ErrorBoundary extends React.Component {
    constructor(props: any) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
      logError(error, 'ErrorBoundary');
      return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: any) {
      logError(error, 'ErrorBoundary');
      console.error('Error Info:', errorInfo);
    }

    render() {
      if ((this.state as any).hasError) {
        return React.createElement(fallbackComponent);
      }

      return (this.props as any).children;
    }
  };
};
