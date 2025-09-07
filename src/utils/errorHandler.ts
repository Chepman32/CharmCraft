export class AppError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'AppError';
  }
}

export const handleAsyncStorageError = (error: any): void => {
  console.error('AsyncStorage Error:', error);

  if (error.message?.includes('AsyncStorage is null')) {
    console.warn('AsyncStorage is not available. Running in fallback mode.');
  }
};

export const handleDatabaseError = (error: any): void => {
  console.error('Database Error:', error);

  if (error.message?.includes('out of memory')) {
    console.warn('Memory issue loading database. Using fallback data.');
  }
};
