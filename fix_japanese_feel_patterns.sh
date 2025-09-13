#!/bin/bash

# Fix Japanese mixed-language patterns
echo "Fixing Japanese mixed-language patterns..."

# Fix "Ты feel genuinely" patterns with various adjectives
sed -i '' 's/"Ты feel genuinely thoughtful"/"あなたは本当に思慮深く感じています"/g' src/data/translations-large/ja.json
sed -i '' 's/"Ты feel genuinely insightful"/"あなたは本当に洞察力があると感じています"/g' src/data/translations-large/ja.json
sed -i '' 's/"Ты feel genuinely kind"/"あなたは本当に優しく感じています"/g' src/data/translations-large/ja.json
sed -i '' 's/"Ты feel genuinely attentive"/"あなたは本当に注意深く感じています"/g' src/data/translations-large/ja.json
sed -i '' 's/"Ты feel genuinely genuine"/"あなたは本当に誠実に感じています"/g' src/data/translations-large/ja.json
sed -i '' 's/"Ты feel genuinely funny"/"あなたは本当に面白く感じています"/g' src/data/translations-large/ja.json
sed -i '' 's/"Ты feel genuinely smart"/"あなたは本当に賢く感じています"/g' src/data/translations-large/ja.json
sed -i '' 's/"Ты feel genuinely curious"/"あなたは本当に好奇心旺盛に感じています"/g' src/data/translations-large/ja.json
sed -i '' 's/"Ты feel genuinely grounded"/"あなたは本当に落ち着いて感じています"/g' src/data/translations-large/ja.json
sed -i '' 's/"Ты feel genuinely confident"/"あなたは本当に自信を持って感じています"/g' src/data/translations-large/ja.json
sed -i '' 's/"Ты feel genuinely creative"/"あなたは本当に創造的に感じています"/g' src/data/translations-large/ja.json
sed -i '' 's/"Ты feel genuinely passionate"/"あなたは本当に情熱的に感じています"/g' src/data/translations-large/ja.json
sed -i '' 's/"Ты feel genuinely calm"/"あなたは本当に穏やかに感じています"/g' src/data/translations-large/ja.json
sed -i '' 's/"Ты feel genuinely happy"/"あなたは本当に幸せに感じています"/g' src/data/translations-large/ja.json
sed -i '' 's/"Ты feel genuinely excited"/"あなたは本当に興奮して感じています"/g' src/data/translations-large/ja.json
sed -i '' 's/"Ты feel genuinely relaxed"/"あなたは本当にリラックスして感じています"/g' src/data/translations-large/ja.json
sed -i '' 's/"Ты feel genuinely energetic"/"あなたは本当にエネルギッシュに感じています"/g' src/data/translations-large/ja.json
sed -i '' 's/"Ты feel genuinely peaceful"/"あなたは本当に平和に感じています"/g' src/data/translations-large/ja.json
sed -i '' 's/"Ты feel genuinely optimistic"/"あなたは本当に楽観的に感じています"/g' src/data/translations-large/ja.json
sed -i '' 's/"Ты feel genuinely grateful"/"あなたは本当に感謝して感じています"/g' src/data/translations-large/ja.json

# Fix "тыr" patterns
sed -i '' 's/"тыr genuinely thoughtful"/"あなたは本当に思慮深く感じています"/g' src/data/translations-large/ja.json
sed -i '' 's/"тыr genuinely insightful"/"あなたは本当に洞察力があると感じています"/g' src/data/translations-large/ja.json
sed -i '' 's/"тыr genuinely kind"/"あなたは本当に優しく感じています"/g' src/data/translations-large/ja.json
sed -i '' 's/"тыr genuinely attentive"/"あなたは本当に注意深く感じています"/g' src/data/translations-large/ja.json

# Generic fallback for any remaining "Ты feel" patterns
sed -i '' 's/"Ты feel /"あなたは感じています /g' src/data/translations-large/ja.json
sed -i '' 's/"тыr /"あなたは感じています /g' src/data/translations-large/ja.json

echo "Japanese patterns fixed. Checking for remaining patterns..."
grep -c "Ты feel" src/data/translations-large/ja.json || echo "0"