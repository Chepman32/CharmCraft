export interface BlobStylePreset {
  key: string;
  labelKey: string;
  descriptionKey: string;
  background: string;
  colors: string[];
  delayMax: number;
  wobbleMin: number;
  wobbleMax: number;
  swimDuration: number;
  overshoot: number;
  zoomScale: number;
  size: {
    small: [number, number];
    medium: [number, number];
    large: [number, number];
    mediumChance: number;
    largeChance: number;
  };
}

export const blobStylePresets: BlobStylePreset[] = [
  {
    key: 'aqua',
    labelKey: 'settings.blobStyleAqua',
    descriptionKey: 'settings.blobStyleAquaDescription',
    background: '#0b1020',
    colors: ['#7BC0FF', '#4A90D9', '#5BA0E8', '#E8F4FF', '#FFFFFF'],
    delayMax: 0.25,
    wobbleMin: 3,
    wobbleMax: 9,
    swimDuration: 540,
    overshoot: 0.06,
    zoomScale: 22,
    size: {
      small: [3, 6],
      medium: [7, 12],
      large: [14, 22],
      mediumChance: 0.25,
      largeChance: 0.08,
    },
  },
  {
    key: 'neon',
    labelKey: 'settings.blobStyleNeon',
    descriptionKey: 'settings.blobStyleNeonDescription',
    background: '#0b0818',
    colors: ['#42F8FF', '#7C4DFF', '#FF4FD8', '#FFE56B', '#F8FBFF'],
    delayMax: 0.2,
    wobbleMin: 5,
    wobbleMax: 16,
    swimDuration: 420,
    overshoot: 0.08,
    zoomScale: 24,
    size: {
      small: [4, 7],
      medium: [9, 14],
      large: [16, 26],
      mediumChance: 0.32,
      largeChance: 0.12,
    },
  },
  {
    key: 'lava',
    labelKey: 'settings.blobStyleLava',
    descriptionKey: 'settings.blobStyleLavaDescription',
    background: '#1b0b0a',
    colors: ['#FF7A1A', '#FFB347', '#F4511E', '#F9E0C7', '#FFEFE0'],
    delayMax: 0.32,
    wobbleMin: 2,
    wobbleMax: 7,
    swimDuration: 680,
    overshoot: 0.04,
    zoomScale: 20,
    size: {
      small: [3, 5],
      medium: [6, 10],
      large: [18, 30],
      mediumChance: 0.18,
      largeChance: 0.18,
    },
  },
  {
    key: 'midnight',
    labelKey: 'settings.blobStyleMidnight',
    descriptionKey: 'settings.blobStyleMidnightDescription',
    background: '#071326',
    colors: ['#6EC6FF', '#3867D6', '#1B3B7A', '#92E3FF', '#FFFFFF'],
    delayMax: 0.28,
    wobbleMin: 6,
    wobbleMax: 18,
    swimDuration: 500,
    overshoot: 0.1,
    zoomScale: 26,
    size: {
      small: [5, 8],
      medium: [10, 16],
      large: [18, 28],
      mediumChance: 0.3,
      largeChance: 0.1,
    },
  },
];
