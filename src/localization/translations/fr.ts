import { en } from './en';
export const fr: typeof en = {
  ...en,
  navigation: {
    ...en.navigation,
    home: 'Accueil',
    search: 'Rechercher',
    favorites: 'Favoris',
    collections: 'Collections',
    settings: 'Paramètres',
  },
  settings: {
    ...en.settings,
    title: 'Paramètres',
    theme: 'Thème',
    language: 'Langue',
    languageDescription: 'Choisis ta langue préférée',
    sound: 'Effets sonores',
    haptics: 'Retour haptique',
    splashBlobStyle: 'Style des gouttes',
    splashBlobStyleDescription:
      'Choisissez la manière dont les particules liquides bougent',
    blobStyleAqua: 'Dérive Aqua',
    blobStyleAquaDescription:
      'Gouttes douces et légères avec un léger balancement',
    blobStyleNeon: 'Pop Néon',
    blobStyleNeonDescription:
      'Énergie élevée avec un mouvement rapide et percutant',
    blobStyleLava: 'Flux de Lave',
    blobStyleLavaDescription:
      'Gouttes lourdes avec un mouvement lent et dense',
    blobStyleMidnight: 'Gelée Nocturne',
    blobStyleMidnightDescription:
      'Fort contraste avec un rebond souple',
    onboardingReset: 'Onboarding',
    onboardingResetDescription:
      'Affiche à nouveau l’onboarding au prochain lancement de l’app',
    onboardingResetButton: 'Réinitialiser l’onboarding',
    developedBy: 'Développé par Anton Chepur',
    about: 'À propos',
  },
  onboarding: {
    slides: {
      findWords: {
        title: 'Trouvez les bons mots',
        subtitle:
          'Découvrez rapidement des phrases qui correspondent au moment et à l’humeur.',
      },
      makePersonal: {
        title: 'Personnalisez-le',
        subtitle: 'Ajustez le ton pour paraître doux, sincère ou assuré.',
      },
      stayReady: {
        title: 'Restez prêt',
        subtitle:
          'Enregistrez vos favoris pour avoir la phrase parfaite toujours à portée de main.',
      },
      buildCollections: {
        title: 'Créez des collections',
        subtitle: 'Organisez les phrases par personne, occasion ou style.',
      },
      setVibe: {
        title: 'Définissez votre ambiance',
        subtitle:
          'Choisissez des thèmes et des retours haptiques qui vous conviennent parfaitement.',
      },
      startConfidence: {
        title: 'Commencez avec confiance',
        subtitle:
          'Chaque moment est plus agréable quand vous trouvez les bons mots.',
      },
    },
    skip: 'Passer',
    back: 'Retour',
    next: 'Suivant',
    getStarted: 'Commencer',
  },
  themes: {
    ...en.themes,
    light: 'Clair',
    dark: 'Sombre',
    solar: 'Solaire',
    mono: 'Mono',
  },
  home: {
    ...en.home,
    title: 'Kissio',
    search: 'Rechercher',
    getSuggestion: 'Obtenir une suggestion',
    intensity: 'Intensité',
    soft: 'Doux',
    neutral: 'Neutre',
    bold: 'Audacieux',
    loadingTitle: 'Kissio',
    loadingText: 'Chargement de vos phrases parfaites...',
  },
  search: {
    ...en.search,
    title: 'Rechercher',
    placeholder: 'Rechercher des phrases...',
    helperTitle: 'Rechercher des phrases',
    helperDescription: 'Commencez à saisir pour voir les résultats.',
    emptyTitle: 'Aucune phrase trouvée',
    emptyDescription: 'Essayez un autre mot-clé.',
  },
  categories: {
    ...en.categories,
    icebreakers: 'Brise-glace',
    compliments: 'Compliments',
    apologies: 'Excuses',
    longDistance: 'Longue distance',
    everyday: 'Quotidiennes',
    birthday: 'Anniversaire',
    goodMorning: 'Bonjour / Bonne Nuit',
  },
  favorites: {
    ...en.favorites,
    title: 'Favoris',
    empty: 'Aucun favori pour le moment',
    emptyDescription:
      "Commencez à ajouter des phrases à vos favoris depuis l'écran d'accueil !",
  },
  collections: {
    ...en.collections,
    title: 'Collections',
    tabs: {
      ...en.collections.tabs,
      compliments: 'Compliments',
      romantic: 'Romantique',
      flirty: 'Flirt',
      supportive: 'Soutien',
      funny: 'Amusant',
      conversation: 'Conversation',
    },
  },
  common: {
    ...en.common,
    copy: 'Copier',
    copied: 'Copié !',
    phraseCopied: 'Phrase copiée dans le presse-papiers',
    error: 'Erreur',
    close: 'Fermer',
    cancel: 'Annuler',
    save: 'Enregistrer',
    delete: 'Supprimer',
    edit: 'Modifier',
    done: 'Terminé',
  },
};
