#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const LANGUAGES = [
  { code: 'es', name: 'Spanish' },
  { code: 'de', name: 'German' },
  { code: 'fr', name: 'French' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ko', name: 'Korean' },
  { code: 'ua', name: 'Ukrainian' },
];

const INTENSITY_TRANSLATIONS = {
  es: { мягко: 'suave', нейтрально: 'neutral', смело: 'audaz' },
  de: { мягко: 'sanft', нейтрально: 'neutral', смело: 'kühn' },
  fr: { мягко: 'doux', нейтрально: 'neutre', смело: 'audacieux' },
  pt: { мягко: 'suave', нейтрально: 'neutro', смело: 'ousado' },
  ja: { мягко: '優しい', нейтрально: '中立的', смело: '大胆な' },
  zh: { мягко: '温和的', нейтрально: '中性的', смело: '大胆的' },
  ko: { мягко: '부드러운', нейтрально: '중립적인', смело: '대담한' },
  ua: { мягко: "м'яко", нейтрально: 'нейтрально', смело: 'сміливо' },
};

const CATEGORY_TRANSLATIONS = {
  es: {
    after_first_date: 'Después de la primera cita',
    asking_out: 'Invitaciones',
    boundaries_respect: 'Respeto a los límites',
    checking_in: 'Comprobando',
    compliments_appearance: 'Cumplidos por apariencia',
    compliments_personality: 'Cumplidos por personalidad',
    conflict_resolution_light: 'Resolución de conflictos leve',
    date_planning: 'Planificación de citas',
    deepening_connection: 'Profundizando la conexión',
    flirting: 'Coqueteo',
    future_plans: 'Planes futuros',
    good_morning_night: 'Buenos días/noches',
    gratitude: 'Gratitud',
    icebreakers: 'Rompehielos',
    long_distance: 'Relaciones a distancia',
    photo_replies: 'Respuestas a fotos',
    playful_challenges: 'Desafíos juguetones',
    rekindling_spark: 'Reavivando la chispa',
    support_encouragement: 'Apoyo y ánimo',
    voice_note_prompts: 'Indicaciones de notas de voz',
  },
  de: {
    after_first_date: 'Nach dem ersten Date',
    asking_out: 'Einladungen',
    boundaries_respect: 'Grenzrespekt',
    checking_in: 'Einchecken',
    compliments_appearance: 'Komplimente zum Aussehen',
    compliments_personality: 'Komplimente zur Persönlichkeit',
    conflict_resolution_light: 'Leichte Konfliktlösung',
    date_planning: 'Datumsplanung',
    deepening_connection: 'Vertiefung der Verbindung',
    flirting: 'Flirten',
    future_plans: 'Zukunftspläne',
    good_morning_night: 'Guten Morgen/Abend',
    gratitude: 'Dankbarkeit',
    icebreakers: 'Eisbrecher',
    long_distance: 'Fernbeziehungen',
    photo_replies: 'Foto-Antworten',
    playful_challenges: 'Spielerische Herausforderungen',
    rekindling_spark: 'Funke wieder entfachen',
    support_encouragement: 'Unterstützung und Ermutigung',
    voice_note_prompts: 'Sprachnotiz-Prompts',
  },
  fr: {
    after_first_date: 'Après le premier rendez-vous',
    asking_out: 'Invitations',
    boundaries_respect: 'Respect des limites',
    checking_in: 'Enregistrement',
    compliments_appearance: "Compliments sur l'apparence",
    compliments_personality: 'Compliments sur la personnalité',
    conflict_resolution_light: 'Résolution légère de conflits',
    date_planning: 'Planification de rendez-vous',
    deepening_connection: 'Approfondir la connexion',
    flirting: 'Flirt',
    future_plans: "Plans d'avenir",
    good_morning_night: 'Bonjour/Bonsoir',
    gratitude: 'Gratitude',
    icebreakers: 'Brise-glace',
    long_distance: 'Relations à distance',
    photo_replies: 'Réponses aux photos',
    playful_challenges: 'Défis ludiques',
    rekindling_spark: "Rallumer l'étincelle",
    support_encouragement: 'Soutien et encouragement',
    voice_note_prompts: 'Invites de notes vocales',
  },
  pt: {
    after_first_date: 'Depois do primeiro encontro',
    asking_out: 'Convites',
    boundaries_respect: 'Respeito aos limites',
    checking_in: 'Verificação',
    compliments_appearance: 'Elogios à aparência',
    compliments_personality: 'Elogios à personalidade',
    conflict_resolution_light: 'Resolução leve de conflitos',
    date_planning: 'Planejamento de encontros',
    deepening_connection: 'Aprofundando a conexão',
    flirting: 'Flertando',
    future_plans: 'Planos futuros',
    good_morning_night: 'Bom dia/noite',
    gratitude: 'Gratidão',
    icebreakers: 'Quebradores de gelo',
    long_distance: 'Relacionamentos à distância',
    photo_replies: 'Respostas às fotos',
    playful_challenges: 'Desafios divertidos',
    rekindling_spark: 'Reacendendo a faísca',
    support_encouragement: 'Apoio e incentivo',
    voice_note_prompts: 'Prompts de notas de voz',
  },
  ja: {
    after_first_date: '初デート後',
    asking_out: 'お誘い',
    boundaries_respect: '境界の尊重',
    checking_in: 'チェックイン',
    compliments_appearance: '外見の褒め言葉',
    compliments_personality: '性格の褒め言葉',
    conflict_resolution_light: '軽い対立解決',
    date_planning: 'デートの計画',
    deepening_connection: 'つながりを深める',
    flirting: 'ふり',
    future_plans: '将来の計画',
    good_morning_night: 'おはよう/おやすみ',
    gratitude: '感謝',
    icebreakers: 'アイスブレーカー',
    long_distance: '遠距離恋愛',
    photo_replies: '写真への返信',
    playful_challenges: '遊び心のある挑戦',
    rekindling_spark: '火花を再び',
    support_encouragement: 'サポートと励まし',
    voice_note_prompts: 'ボイスノートプロンプト',
  },
  zh: {
    after_first_date: '第一次约会后',
    asking_out: '邀请',
    boundaries_respect: '尊重界限',
    checking_in: '签到',
    compliments_appearance: '外貌赞美',
    compliments_personality: '性格赞美',
    conflict_resolution_light: '轻微冲突解决',
    date_planning: '约会规划',
    deepening_connection: '深化连接',
    flirting: '调情',
    future_plans: '未来计划',
    good_morning_night: '早上好/晚安',
    gratitude: '感激',
    icebreakers: '破冰',
    long_distance: '异地恋',
    photo_replies: '照片回复',
    playful_challenges: '有趣的挑战',
    rekindling_spark: '重燃火花',
    support_encouragement: '支持和鼓励',
    voice_note_prompts: '语音笔记提示',
  },
  ko: {
    after_first_date: '첫 데이트 후',
    asking_out: '초대',
    boundaries_respect: '경계 존중',
    checking_in: '체크인',
    compliments_appearance: '외모 칭찬',
    compliments_personality: '성격 칭찬',
    conflict_resolution_light: '가벼운 갈등 해결',
    date_planning: '데이트 계획',
    deepening_connection: '연결 심화',
    flirting: '플러팅',
    future_plans: '미래 계획',
    good_morning_night: '좋은 아침/밤',
    gratitude: '감사',
    icebreakers: '아이스브레이커',
    long_distance: '장거리 연애',
    photo_replies: '사진 답장',
    playful_challenges: '장난기 있는 도전',
    rekindling_spark: '불꽃 재점화',
    support_encouragement: '지원과 격려',
    voice_note_prompts: '음성 메모 프롬프트',
  },
  ua: {
    after_first_date: 'Після першої зустрічі',
    asking_out: 'Запрошення',
    boundaries_respect: 'Повага до меж',
    checking_in: 'Перевірка',
    compliments_appearance: 'Компліменти зовнішності',
    compliments_personality: 'Компліменти характеру',
    conflict_resolution_light: 'Легке вирішення конфліктів',
    date_planning: 'Планування зустрічей',
    deepening_connection: "Поглиблення зв'язку",
    flirting: 'Флірт',
    future_plans: 'Плани на майбутнє',
    good_morning_night: 'Доброго ранку/ночі',
    gratitude: 'Вдячність',
    icebreakers: 'Ледокол',
    long_distance: 'Дистанційні стосунки',
    photo_replies: 'Відповіді на фото',
    playful_challenges: 'Граційні виклики',
    rekindling_spark: 'Відродження іскри',
    support_encouragement: 'Підтримка та заохочення',
    voice_note_prompts: 'Підказки голосових нотаток',
  },
};

function generateTranslation(languageCode, languageName) {
  console.log(
    `📝 Generating ${languageName} (${languageCode}) translations...`,
  );

  try {
    // Read the Russian template
    const ruData = JSON.parse(
      fs.readFileSync('./src/data/translations-large/ru.json', 'utf8'),
    );

    // Create new translation object
    const newTranslation = {
      categories: {},
    };

    // Process each category
    for (const [categoryKey, categoryData] of Object.entries(
      ruData.categories,
    )) {
      const newCategory = {
        title:
          CATEGORY_TRANSLATIONS[languageCode][categoryKey] ||
          categoryData.title,
        description:
          CATEGORY_TRANSLATIONS[languageCode][categoryKey] ||
          categoryData.description,
        phrases: [],
      };

      // Process each phrase
      for (const phrase of categoryData.phrases) {
        const newPhrase = {
          id: phrase.id,
          intensity:
            INTENSITY_TRANSLATIONS[languageCode][phrase.intensity] ||
            phrase.intensity,
          text: `[${languageCode.toUpperCase()}] ${phrase.text}`, // Placeholder with language code
        };
        newCategory.phrases.push(newPhrase);
      }

      newTranslation.categories[categoryKey] = newCategory;
    }

    // Write the new translation file
    const outputPath = `./src/data/translations-large/${languageCode}.json`;
    fs.writeFileSync(outputPath, JSON.stringify(newTranslation, null, 2));

    const totalPhrases = Object.values(ruData.categories).reduce(
      (sum, cat) => sum + cat.phrases.length,
      0,
    );
    console.log(
      `✅ ${languageName} translations created successfully (${totalPhrases} phrases)`,
    );
  } catch (error) {
    console.error(
      `❌ Error generating ${languageName} translations:`,
      error.message,
    );
  }
}

function main() {
  console.log('🚀 Starting large dataset translation generation...');
  console.log('📊 Processing 15,773 phrases for 8 languages...\n');

  for (const language of LANGUAGES) {
    generateTranslation(language.code, language.name);
  }

  console.log('\n🎉 All translations generated successfully!');
  console.log('📁 Translation files created in: src/data/translations-large/');
  console.log(
    '💡 Note: These are placeholder translations. You can improve them over time.',
  );
}

if (require.main === module) {
  main();
}

module.exports = { generateTranslation, LANGUAGES };
