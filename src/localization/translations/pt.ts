import { en } from './en';
export const pt: typeof en = {
  ...en,
  navigation: {
    ...en.navigation,
    home: 'Início',
    search: 'Pesquisar',
    favorites: 'Favoritos',
    collections: 'Coleções',
    settings: 'Configurações',
  },
  settings: {
    ...en.settings,
    title: 'Configurações',
    theme: 'Tema',
    language: 'Idioma',
    languageDescription: 'Escolha seu idioma preferido',
    sound: 'Efeitos sonoros',
    haptics: 'Feedback tátil',
    splashBlobStyle: 'Estilo das gotas',
    splashBlobStyleDescription:
      'Escolha como as partículas líquidas se movem',
    blobStyleAqua: 'Deriva Aqua',
    blobStyleAquaDescription: 'Gotas suaves e leves com balanço sutil',
    blobStyleNeon: 'Estouro Neon',
    blobStyleNeonDescription: 'Alta energia com movimento rápido e marcante',
    blobStyleLava: 'Fluxo de Lava',
    blobStyleLavaDescription: 'Gotas pesadas com movimento lento e denso',
    blobStyleMidnight: 'Gelatina da Meia-Noite',
    blobStyleMidnightDescription:
      'Alto contraste com balanço elástico',
    onboardingReset: 'Onboarding',
    onboardingResetDescription:
      'Mostre o onboarding novamente na próxima vez que abrir o app',
    onboardingResetButton: 'Redefinir onboarding',
    developedBy: 'Desenvolvido por Anton Chepur',
    about: 'Sobre',
  },
  onboarding: {
    slides: {
      findWords: {
        title: 'Encontre as palavras certas',
        subtitle:
          'Descubra rapidamente frases que combinam com o momento e o clima.',
      },
      makePersonal: {
        title: 'Torne pessoal',
        subtitle: 'Ajuste o tom para soar suave, sincero ou confiante.',
      },
      stayReady: {
        title: 'Esteja pronto',
        subtitle:
          'Salve favoritos para que a frase perfeita esteja sempre por perto.',
      },
      buildCollections: {
        title: 'Crie coleções',
        subtitle: 'Organize frases por pessoa, ocasião ou estilo.',
      },
      setVibe: {
        title: 'Defina seu clima',
        subtitle:
          'Escolha temas e feedback háptico que sejam perfeitos para você.',
      },
      startConfidence: {
        title: 'Comece com confiança',
        subtitle: 'Cada momento fica melhor quando você diz bem.',
      },
    },
    skip: 'Pular',
    back: 'Voltar',
    next: 'Próximo',
    getStarted: 'Começar',
  },
  themes: {
    ...en.themes,
    light: 'Claro',
    dark: 'Escuro',
    solar: 'Solar',
    mono: 'Mono',
  },
  home: {
    ...en.home,
    title: 'Kissio',
    search: 'Pesquisar',
    getSuggestion: 'Obter sugestão',
    intensity: 'Intensidade',
    soft: 'Suave',
    neutral: 'Neutro',
    bold: 'Ousado',
    loadingTitle: 'Kissio',
    loadingText: 'Carregando suas frases perfeitas...',
  },
  search: {
    ...en.search,
    title: 'Pesquisar',
    placeholder: 'Pesquisar frases...',
    helperTitle: 'Pesquisar frases',
    helperDescription: 'Comece a digitar para ver resultados.',
    emptyTitle: 'Nenhuma frase encontrada',
    emptyDescription: 'Tente outra palavra-chave.',
  },
  categories: {
    ...en.categories,
    icebreakers: 'Quebra-gelo',
    compliments: 'Elogios',
    apologies: 'Desculpas',
    longDistance: 'Longa distância',
    everyday: 'Cotidianas',
    birthday: 'Aniversário',
    goodMorning: 'Bom Dia / Boa Noite',
  },
  favorites: {
    ...en.favorites,
    title: 'Favoritos',
    empty: 'Nenhum favorito ainda',
    emptyDescription:
      'Comece a adicionar frases aos seus favoritos na tela inicial!',
  },
  collections: {
    ...en.collections,
    title: 'Coleções',
  },
  common: {
    ...en.common,
    copy: 'Copiar',
    copied: 'Copiado!',
    phraseCopied: 'Frase copiada para a área de transferência',
    error: 'Erro',
    close: 'Fechar',
    cancel: 'Cancelar',
    save: 'Salvar',
    delete: 'Excluir',
    edit: 'Editar',
    done: 'Concluído',
  },
};
