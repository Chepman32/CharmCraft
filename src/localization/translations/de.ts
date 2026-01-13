import { en } from './en';
export const de: typeof en = {
  ...en,
  navigation: {
    ...en.navigation,
    home: 'Startseite',
    search: 'Suchen',
    favorites: 'Favoriten',
    collections: 'Sammlungen',
    settings: 'Einstellungen',
  },
  settings: {
    ...en.settings,
    title: 'Einstellungen',
    theme: 'Design',
    language: 'Sprache',
    languageDescription: 'Wähle deine bevorzugte Sprache',
    sound: 'Soundeffekte',
    haptics: 'Haptisches Feedback',
    splashBlobStyle: 'Splash-Blob-Stil',
    splashBlobStyleDescription:
      'Wähle, wie sich die flüssigen Partikel bewegen',
    blobStyleAqua: 'Aqua-Drift',
    blobStyleAquaDescription: 'Sanfte, luftige Tropfen mit leichtem Wackeln',
    blobStyleNeon: 'Neon-Pop',
    blobStyleNeonDescription:
      'Hohe Energie mit schnellem, knackigem Bewegungsgefühl',
    blobStyleLava: 'Lavafluss',
    blobStyleLavaDescription: 'Schwere Tropfen mit langsamer, zäher Bewegung',
    blobStyleMidnight: 'Mitternachts-Gelee',
    blobStyleMidnightDescription:
      'Starker Kontrast mit federndem Wippen',
    onboardingReset: 'Onboarding',
    onboardingResetDescription:
      'Zeigt das Onboarding beim nächsten App-Start erneut',
    onboardingResetButton: 'Onboarding zurücksetzen',
    developedBy: 'Entwickelt von Anton Chepur',
    about: 'Über',
  },
  onboarding: {
    slides: {
      findWords: {
        title: 'Finde die richtigen Worte',
        subtitle:
          'Entdecke schnell Formulierungen, die zum Moment und zur Stimmung passen.',
      },
      makePersonal: {
        title: 'Mach es persönlich',
        subtitle:
          'Passe den Ton an, um sanft, ehrlich oder selbstbewusst zu klingen.',
      },
      stayReady: {
        title: 'Bleib bereit',
        subtitle:
          'Speichere Favoriten, damit der perfekte Satz immer griffbereit ist.',
      },
      buildCollections: {
        title: 'Erstelle Sammlungen',
        subtitle: 'Ordne Sätze nach Person, Anlass oder Stil.',
      },
      setVibe: {
        title: 'Finde deinen Vibe',
        subtitle: 'Wähle Themen und Haptik, die sich genau richtig anfühlen.',
      },
      startConfidence: {
        title: 'Starte mit Selbstvertrauen',
        subtitle:
          'Jeder Moment fühlt sich besser an, wenn du die richtigen Worte findest.',
      },
    },
    skip: 'Überspringen',
    back: 'Zurück',
    next: 'Weiter',
    getStarted: "Los geht's",
  },
  themes: {
    ...en.themes,
    light: 'Hell',
    dark: 'Dunkel',
    solar: 'Solar',
    mono: 'Mono',
  },
  home: {
    ...en.home,
    title: 'Kissio',
    search: 'Suchen',
    getSuggestion: 'Vorschlag erhalten',
    intensity: 'Intensität',
    soft: 'Sanft',
    neutral: 'Neutral',
    bold: 'Kühn',
    loadingTitle: 'Kissio',
    loadingText: 'Lade deine perfekten Phrasen...',
  },
  search: {
    ...en.search,
    title: 'Suchen',
    placeholder: 'Phrasen suchen...',
    helperTitle: 'Phrasen suchen',
    helperDescription: 'Tippe los, um Ergebnisse zu sehen.',
    emptyTitle: 'Keine Phrasen gefunden',
    emptyDescription: 'Versuche ein anderes Stichwort.',
  },
  categories: {
    ...en.categories,
    icebreakers: 'Eisbrecher',
    compliments: 'Komplimente',
    apologies: 'Entschuldigungen',
    longDistance: 'Fernbeziehung',
    everyday: 'Alltäglich',
    birthday: 'Geburtstag',
    goodMorning: 'Guten Morgen / Gute Nacht',
  },
  favorites: {
    ...en.favorites,
    title: 'Favoriten',
    empty: 'Noch keine Favoriten',
    emptyDescription:
      'Beginne damit, Phrasen zu deinen Favoriten vom Startbildschirm hinzuzufügen!',
  },
  collections: {
    ...en.collections,
    title: 'Sammlungen',
    tabs: {
      ...en.collections.tabs,
      compliments: 'Komplimente',
      romantic: 'Romantisch',
      flirty: 'Flirt',
      supportive: 'Unterstützend',
      funny: 'Witzig',
      conversation: 'Gespräch',
    },
  },
  common: {
    ...en.common,
    copy: 'Kopieren',
    copied: 'Kopiert!',
    phraseCopied: 'Phrase in die Zwischenablage kopiert',
    error: 'Fehler',
    close: 'Schließen',
    cancel: 'Abbrechen',
    save: 'Speichern',
    delete: 'Löschen',
    edit: 'Bearbeiten',
    done: 'Fertig',
  },
};
