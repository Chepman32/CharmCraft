const fs = require('fs');

function main() {
  const path = 'src/data/translations-large/ru.json';
  const raw = fs.readFileSync(path, 'utf8');
  const data = JSON.parse(raw);

  // 1) Vary endings for voice note prompts
  const voiceEndings = [
    '— послушаю по пути домой.',
    '— отвечу вечером.',
    '— включу в наушниках по дороге.',
    '— с радостью послушаю и отвечу.',
    '— буду ждать, обязательно отвечу.',
    '— пришли, хочу услышать.',
  ];
  let vIdx = 0;

  // 2) Normalize date-planning slots
  const dayMap = {
    'воскресенье': 'в воскресенье',
    'вторник': 'во вторник',
    'понедельник': 'в понедельник',
    'пятницу': 'в пятницу',
    'субботу': 'в субботу',
    'четверг': 'в четверг',
    'среду': 'в среду',
    'среда': 'в среду',
  };
  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const variants = [
    (pl, dp, tm) => `${dp} в ${tm}: ${capitalize(pl)}?`,
    (pl, dp, tm) => `${capitalize(pl)}: ${dp} в ${tm} — идём?`,
    (pl, dp, tm) => `План: ${capitalize(pl)}, ${dp}, ${tm}.`,
    (pl, dp, tm) => `${capitalize(pl)} ${dp}, ${tm} — поедем?`,
  ];
  let dIdx = 0;

  // 3) Gender normalization: narrator male (first person), addressee female (second person)
  const replacements = [
    // First-person masculine
    [/Я ожидал\(а\)/g, 'Я ожидал'],
    [/я ожидал\(а\)/g, 'я ожидал'],
    [/Я хотел\(а\)/g, 'Я хотел'],
    [/я хотел\(а\)/g, 'я хотел'],
    [/Я задел\(а\)/g, 'Я задел'],
    [/я задел\(а\)/g, 'я задел'],
    [/Я упустил\(а\)/g, 'Я упустил'],
    [/я упустил\(а\)/g, 'я упустил'],
    [/Я перегнул\(а\)/g, 'Я перегнул'],
    [/я перегнул\(а\)/g, 'я перегнул'],
    [/перегнул\(а\)/g, 'перегнул'],
    [/подумал\(а\)/g, 'подумал'],
    [/уверен\(а\)/g, 'уверен'],
    [/настроен\(а\)/g, 'настроен'],
    [/Свободен\(а\)/g, 'Свободен'],
    [/свободен\(а\)/g, 'свободен'],
    [/Готов\(а\) послушать/g, 'Готов послушать'],
    [/мог\(ла\)/g, 'мог'],
    [/обнял\(а\)/g, 'обнял'],
    [/встретился\(лась\)/g, 'встретился'],
    [/давно хотел\(а\)/g, 'давно хотел'],
    [/Просто хотел\(а\)/g, 'Просто хотел'],
    [/я давно хотела/g, 'я давно хотел'],
    [/Я давно хотела/g, 'Я давно хотел'],
    [/которое я давно хотела попробовать/g, 'которое я давно хотел попробовать'],
    [/который я давно хотела попробовать/g, 'который я давно хотел попробовать'],
    [/которая я давно хотела попробовать/g, 'которую я давно хотел попробовать'],
    [/ в неделю\?/g, ' на этой неделе?'],
    [/Я готов\(а\)/g, 'Я готов'],
    [/я готов\(а\)/g, 'я готов'],
    [/весь\(а\) во внимании/g, 'весь во внимании'],
    [/Увидел\(а\)/g, 'Увидел'],
    [/увидел\(а\)/g, 'увидел'],

    // Second-person feminine
    [/ты открыл\(а\)/gi, 'ты открыла'],
    [/ты сделал\(а\)/gi, 'ты сделала'],
    [/ты ожидал\(а\)/gi, 'ты ожидала'],
    [/ты готов\(а\)/gi, 'ты готова'],
    [/ты знал\(а\)/gi, 'ты знала'],
    [/ты провёл\(а\)/gi, 'ты провела'],
    [/ты заслужил\(а\)/gi, 'ты заслужила'],
    [/ты узнал\(а\)/gi, 'ты узнала'],
    [/ты посмотрел\(а\)/gi, 'ты посмотрела'],
    [/ты прочитал\(а\)/gi, 'ты прочитала'],
    [/ты заметил\(а\)/gi, 'ты заметила'],

    // Questions to her
    [/Готов\(а\)\?/g, 'Готова?'],
    [/Согласна\(ен\)\?/g, 'Согласна?'],

    // “Рад(а)” variations
    [/Рад\(а\)/g, 'Рад'],
    [/рад\(а\)/g, 'рад'],
  ];

  const applyReplacements = (text) => {
    let out = text;
    for (const [re, val] of replacements) {
      out = out.replace(re, val);
    }
    // Restructure clunky "Есть X, которое я давно хотел попробовать — ..."
    out = out.replace(/Есть ([^,]+), которое я давно хотел попробовать — (не хочешь сходить туда [^?]+\?)/g,
      'Есть $1 — давно хотел попробовать. $2');
    // Capitalize first Cyrillic letter after period and spaces
    out = out.replace(/\.\s+([а-яё])/g, (m, p1) => '. ' + p1.toUpperCase());
    // Context-sensitive tweaks for second-person feminine when words may have fillers between
    if (/ты [^\n]{0,80}?заслужил\(а\)/i.test(out)) out = out.replace(/заслужил\(а\)/gi, 'заслужила');
    if (/ты [^\n]{0,80}?готов\(а\)/i.test(out)) out = out.replace(/готов\(а\)/gi, 'готова');
    if (/ты [^\n]{0,80}?ожидал\(а\)/i.test(out)) out = out.replace(/ожидал\(а\)/gi, 'ожидала');
    if (/ты [^\n]{0,80}?знал\(а\)/i.test(out)) out = out.replace(/знал\(а\)/gi, 'знала');
    if (/ты [^\n]{0,80}?пров[её]л\(а\)/i.test(out)) out = out.replace(/пров[её]л\(а\)/gi, 'провела');
    if (/ты [^\n]{0,80}?сделал\(а\)/i.test(out)) out = out.replace(/сделал\(а\)/gi, 'сделала');
    if (/ты [^\n]{0,80}?открыл\(а\)/i.test(out)) out = out.replace(/открыл\(а\)/gi, 'открыла');
    if (/ты [^\n]{0,80}?узнал\(а\)/i.test(out)) out = out.replace(/узнал\(а\)/gi, 'узнала');
    if (/ты [^\n]{0,80}?прочитал\(а\)/i.test(out)) out = out.replace(/прочитал\(а\)/gi, 'прочитала');
    if (/ты [^\n]{0,80}?посмотрел\(а\)/i.test(out)) out = out.replace(/посмотрел\(а\)/gi, 'посмотрела');
    // Game prompts preference
    out = out.replace(/предпочёл\(а\)\?/g, 'предпочла?');
    return out;
  };

  for (const [key, cat] of Object.entries(data.categories)) {
    if (!cat || !Array.isArray(cat.phrases)) continue;
    for (const p of cat.phrases) {
      if (!p || typeof p.text !== 'string') continue;
      let t = p.text.trim();
      // Gender/voice normalization
      const nt = applyReplacements(t);
      if (nt !== t) {
        p.text = nt;
        p.translationType = 'manual';
        p.manualTranslation = true;
        t = nt;
      }

      // Voice note prompts
      if (/^Запиши голосовое про .+ — отвечу по дороге домой\.$/.test(t)) {
        const ending = voiceEndings[vIdx++ % voiceEndings.length];
        p.text = t.replace(/— отвечу по дороге домой\.$/, ending);
        p.translationType = 'manual';
        p.manualTranslation = true;
        continue;
      }

      // Date planning slots like ": ботанический сад воскресенье в 10:00."
      // Match original colon form
      let m = t.match(/^: ([^]+?) (воскресенье|вторник|понедельник|пятницу|субботу|четверг|среду|среда) в (\d{1,2}:\d{2})\.$/);
      if (m) {
        const [, place, day, time] = m;
        const dp = dayMap[day] || day;
        const v = variants[dIdx++ % variants.length];
        let out = v(place, dp, time);
        // Ensure sentence starts with uppercase
        out = out.charAt(0).toUpperCase() + out.slice(1);
        p.text = out;
        p.translationType = 'manual';
        p.manualTranslation = true;
        continue;
      }

      // Match first pass variants and re-normalize into safer phrasing
      const altPatterns = [
        /^Как насчёт (.+?) (в [^ ]+?) в (\d{1,2}:\d{2})\?$/,
        /^(.+?): (в [^ ]+?) в (\d{1,2}:\d{2}) — идём\?$/,
        /^Предлагаю (.+?) (в [^ ]+?), (\d{1,2}:\d{2})\.$/,
        /^(в [^ ]+?) в (\d{1,2}:\d{2}) (.+?) — согласна\(ен\)\?$/,
      ];
      for (const ap of altPatterns) {
        const am = t.match(ap);
        if (am) {
          let place, dp, tm;
          if (ap === altPatterns[0]) {
            [, place, dp, tm] = am;
          } else if (ap === altPatterns[1]) {
            [, place, dp, tm] = am;
          } else if (ap === altPatterns[2]) {
            [, place, dp, tm] = am;
          } else {
            [, dp, tm, place] = am;
          }
          const v = variants[dIdx++ % variants.length];
          let out = v(place, dp, tm);
          out = out.charAt(0).toUpperCase() + out.slice(1);
          p.text = out;
          p.translationType = 'manual';
          p.manualTranslation = true;
          break;
        }
      }

      // Ensure capitalization for date_planning category lines
      if (key === 'date_planning') {
        if (p.text && p.text.length > 0) {
          const first = p.text[0];
          const upper = first.toUpperCase();
          if (first !== upper) {
            p.text = upper + p.text.slice(1);
          }
        }
      }
    }
  }

  fs.writeFileSync(path, JSON.stringify(data, null, 2));
  console.log('Updated voice note prompts and date planning lines.');
}

main();
