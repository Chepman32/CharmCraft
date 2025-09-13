#!/bin/bash

# Fix Chinese mixed-language patterns
echo "Fixing Chinese mixed-language patterns..."

# Fix "Ты feel genuinely" patterns with various adjectives
sed -i '' 's/"Ты feel genuinely thoughtful"/"你真的感到很有思想"/g' src/data/translations-large/zh.json
sed -i '' 's/"Ты feel genuinely insightful"/"你真的感到很有洞察力"/g' src/data/translations-large/zh.json
sed -i '' 's/"Ты feel genuinely kind"/"你真的感到很善良"/g' src/data/translations-large/zh.json
sed -i '' 's/"Ты feel genuinely attentive"/"你真的感到很专注"/g' src/data/translations-large/zh.json
sed -i '' 's/"Ты feel genuinely genuine"/"你真的感到很真诚"/g' src/data/translations-large/zh.json
sed -i '' 's/"Ты feel genuinely funny"/"你真的感到很有趣"/g' src/data/translations-large/zh.json
sed -i '' 's/"Ты feel genuinely smart"/"你真的感到很聪明"/g' src/data/translations-large/zh.json
sed -i '' 's/"Ты feel genuinely curious"/"你真的感到很好奇"/g' src/data/translations-large/zh.json
sed -i '' 's/"Ты feel genuinely grounded"/"你真的感到很踏实"/g' src/data/translations-large/zh.json
sed -i '' 's/"Ты feel genuinely confident"/"你真的感到很自信"/g' src/data/translations-large/zh.json
sed -i '' 's/"Ты feel genuinely creative"/"你真的感到很有创意"/g' src/data/translations-large/zh.json
sed -i '' 's/"Ты feel genuinely passionate"/"你真的感到很有激情"/g' src/data/translations-large/zh.json
sed -i '' 's/"Ты feel genuinely calm"/"你真的感到很平静"/g' src/data/translations-large/zh.json
sed -i '' 's/"Ты feel genuinely happy"/"你真的感到很快乐"/g' src/data/translations-large/zh.json
sed -i '' 's/"Ты feel genuinely excited"/"你真的感到很兴奋"/g' src/data/translations-large/zh.json
sed -i '' 's/"Ты feel genuinely relaxed"/"你真的感到很放松"/g' src/data/translations-large/zh.json
sed -i '' 's/"Ты feel genuinely energetic"/"你真的感到很有活力"/g' src/data/translations-large/zh.json
sed -i '' 's/"Ты feel genuinely peaceful"/"你真的感到很平和"/g' src/data/translations-large/zh.json
sed -i '' 's/"Ты feel genuinely optimistic"/"你真的感到很乐观"/g' src/data/translations-large/zh.json
sed -i '' 's/"Ты feel genuinely grateful"/"你真的感到很感激"/g' src/data/translations-large/zh.json

# Fix "тыr" patterns
sed -i '' 's/"тыr genuinely thoughtful"/"你真的感到很有思想"/g' src/data/translations-large/zh.json
sed -i '' 's/"тыr genuinely insightful"/"你真的感到很有洞察力"/g' src/data/translations-large/zh.json
sed -i '' 's/"тыr genuinely kind"/"你真的感到很善良"/g' src/data/translations-large/zh.json
sed -i '' 's/"тыr genuinely attentive"/"你真的感到很专注"/g' src/data/translations-large/zh.json

# Generic fallback for any remaining "Ты feel" patterns
sed -i '' 's/"Ты feel /"你感到 /g' src/data/translations-large/zh.json
sed -i '' 's/"тыr /"你感到 /g' src/data/translations-large/zh.json

echo "Chinese patterns fixed. Checking for remaining patterns..."
grep -c "Ты feel" src/data/translations-large/zh.json || echo "0"