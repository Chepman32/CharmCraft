#!/bin/bash

# Fix remaining mixed-language patterns in all files

echo "Fixing remaining mixed-language patterns..."

# Fix Japanese (ja.json) patterns
echo "Fixing Japanese patterns..."

# Fix "Ты превзошла мои ожидания" pattern
sed -i '' 's/"Ты превзошла мои ожидания — спокойно и искренне\. Раунд два?"/"あなたは私の期待を上回りました — 静かに、そして心から。ラウンド2？"/g' src/data/translations-large/ja.json

# Fix "тыr" patterns
sed -i '' 's/We can take this at тыr pace—i'"'"'m in no rush\./私たちはあなたのペースで進めることができます — 急いでいません。/g' src/data/translations-large/ja.json
sed -i '' 's/Яf ты need quiet tonight, i'"'"'ll meet ты there\./今夜静かな時間が必要なら、そこでお会いしましょう。/g' src/data/translations-large/ja.json
sed -i '' 's/Name тыr pace and i'"'"'ll match it\./あなたのペースを教えてください、それに合わせます。/g' src/data/translations-large/ja.json
sed -i '' 's/Яf ты need space, i'"'"'ll honor it—promise\./スペースが必要なら、それを尊重します — 約束します。/g' src/data/translations-large/ja.json

# Fix "Just checking in" patterns with ты/тыr
sed -i '' 's/Just checking in—how are ты holding up today?/元気にしていますか？今日の調子はどうですか？/g' src/data/translations-large/ja.json
sed -i '' 's/Just checking in—how'"'"'s тыr energy right now?/元気にしていますか？今のエネルギーはどうですか？/g' src/data/translations-large/ja.json
sed -i '' 's/Just checking in—how'"'"'s тыr week treating ты?/元気にしていますか？今週の調子はどうですか？/g' src/data/translations-large/ja.json
sed -i '' 's/Just checking in—what color is тыr mood today?/元気にしていますか？今日の気分はどんな色ですか？/g' src/data/translations-large/ja.json
sed -i '' 's/Just checking in—what do ты need less of today\? more of?/元気にしていますか？今日は何を減らして、何を増やしたいですか？/g' src/data/translations-large/ja.json
sed -i '' 's/Just checking in—how'"'"'s тыr head and heart?/元気にしていますか？頭と心の調子はどうですか？/g' src/data/translations-large/ja.json
sed -i '' 's/Just checking in—any tiny win i can celebrate with ты?/元気にしていますか？一緒に祝える小さな勝利はありますか？/g' src/data/translations-large/ja.json
sed -i '' 's/Just checking in—how'"'"'s тыr focus today?/元気にしていますか？今日の集中力はどうですか？/g' src/data/translations-large/ja.json
sed -i '' 's/Just checking in—what'"'"'s one small comfort ты want right now?/元気にしていますか？今欲しい小さな慰めは何ですか？/g' src/data/translations-large/ja.json

# Fix "No rush to reply" and similar patterns
sed -i '' 's/No rush to reply; just thinking of ты\. 🙂/返事は急がなくて大丈夫、あなたのことを考えています。🙂/g' src/data/translations-large/ja.json
sed -i '' 's/How are ты holding up today\? i'"'"'m all ears if ты want to vent\./今日の調子はどうですか？愚痴を言いたければ、喜んで聞きます。/g' src/data/translations-large/ja.json
sed -i '' 's/How'"'"'s тыr energy right now\? i'"'"'m all ears if ты want to vent\./今のエネルギーはどうですか？愚痴を言いたければ、喜んで聞きます。/g' src/data/translations-large/ja.json
sed -i '' 's/What would make today 5% better\? i'"'"'m all ears if ты want to vent\./今日を5%良くするには何が必要ですか？愚痴を言いたければ、喜んで聞きます。/g' src/data/translations-large/ja.json
sed -i '' 's/How'"'"'s тыr week treating ты\? i'"'"'m all ears if ты want to vent\./今週の調子はどうですか？愚痴を言いたければ、喜んで聞きます。/g' src/data/translations-large/ja.json
sed -i '' 's/What color is тыr mood today\? i'"'"'m all ears if ты want to vent\./今日の気分はどんな色ですか？愚痴を言いたければ、喜んで聞きます。/g' src/data/translations-large/ja.json
sed -i '' 's/What do ты need less of today\? more of\? i'"'"'m all ears if ты want to vent\./今日は何を減らして、何を増やしたいですか？愚痴を言いたければ、喜んで聞きます。/g' src/data/translations-large/ja.json
sed -i '' 's/How'"'"'s тыr head and heart\? i'"'"'m all ears if ты want to vent\./頭と心の調子はどうですか？愚痴を言いたければ、喜んで聞きます。/g' src/data/translations-large/ja.json
sed -i '' 's/Any tiny win i can celebrate with ты\? i'"'"'m all ears if ты want to vent\./一緒に祝える小さな勝利はありますか？愚痴を言いたければ、喜んで聞きます。/g' src/data/translations-large/ja.json
sed -i '' 's/How'"'"'s тыr focus today\? i'"'"'m all ears if ты want to vent\./今日の集中力はどうですか？愚痴を言いたければ、喜んで聞きます。/g' src/data/translations-large/ja.json
sed -i '' 's/What'"'"'s one small comfort ты want right now\? i'"'"'m all ears if ты want to vent\./今欲しい小さな慰めは何ですか？愚痴を言いたければ、喜んで聞きます。/g' src/data/translations-large/ja.json

# Fix "Я хочу to be тыr person" patterns
sed -i '' 's/Я хочу to be тыr person\. talk to me—what'"'"'s up right now?/あなたの人になりたいです。話してください — 今何が起こっていますか？/g' src/data/translations-large/ja.json
sed -i '' 's/Яf ты need a rescue mission from today, i'"'"'m on my way\./今日から救出が必要なら、向かいます。/g' src/data/translations-large/ja.json

# Fix "Тыr photo/selfie/portrait/story/post/reel/shot/mirror pic/candid has great" patterns
sed -i '' 's/Тыr \([a-z ]*\) has great \([a-z]*\)\. also, тыr \([a-z ]*\) wins\./あなたの\1は素晴らしい\2を持っています。また、あなたの\3が勝ちです。/g' src/data/translations-large/ja.json

# Fix "Ты have an elegant style" patterns
sed -i '' 's/Ты have an elegant style—\([a-z]*\) refined and confident\./あなたはエレガントなスタイルを持っています — \1洗練されて自信に満ちています。/g' src/data/translations-large/ja.json

# Fix "Straight up—ты look" patterns
sed -i '' 's/Straight up—ты look \([a-z‑]*\)\. hard to scroll past\./率直に言って — あなたは\1に見えます。スクロールするのが難しいです。/g' src/data/translations-large/ja.json

# Generic fallbacks for any remaining patterns
sed -i '' 's/Ты /あなたは /g' src/data/translations-large/ja.json
sed -i '' 's/ты /あなたを /g' src/data/translations-large/ja.json
sed -i '' 's/тыr /あなたの /g' src/data/translations-large/ja.json
sed -i '' 's/Тыr /あなたの /g' src/data/translations-large/ja.json
sed -i '' 's/Я /私は /g' src/data/translations-large/ja.json
sed -i '' 's/Яf /もし /g' src/data/translations-large/ja.json

# Fix Ukrainian (ua.json) pattern
echo "Fixing Ukrainian patterns..."
sed -i '' 's/"Ты превзошла мои ожидания — спокойно и искренне\. Раунд два?"/"Ти перевершила мої очікування — спокійно і щиро. Раунд два?"/g' src/data/translations-large/ua.json

echo "Checking for remaining patterns..."
echo "Remaining 'Ты' patterns:"
grep -c "Ты" src/data/translations-large/*.json || echo "0"
echo "Remaining 'тыr' patterns:"
grep -c "тыr" src/data/translations-large/*.json || echo "0"
echo "Remaining 'Я' patterns:"
grep -c "Я" src/data/translations-large/*.json || echo "0"

echo "Mixed-language pattern fix completed!"