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

export const handleAsyncStorageError = (_error: any): void => {};

export const handleDatabaseError = (_error: any): void => {};

export const handleThemeError = (
  _error: any,
  fallbackTheme: string = 'light',
): string => {
  return fallbackTheme;
};

export const handleTranslationError = (
  _error: any,
  key: string,
  _fallbackLanguage: string = 'en',
): string => {
  return key; // Return the key itself as fallback
};

export const handleSoundError = (_error: any): void => {};

export const handleHapticError = (_error: any): void => {};

export const logError = (_error: Error | string, _context?: string): void => {};

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

    componentDidCatch(error: Error, _errorInfo: any) {
      logError(error, 'ErrorBoundary');
    }

    render() {
      if ((this.state as any).hasError) {
        return React.createElement(fallbackComponent);
      }

      return (this.props as any).children;
    }
  };
};
