#!/bin/bash

# Fix Spanish mixed-language patterns - comprehensive version
echo "Fixing Spanish mixed-language patterns..."

# Fix "Ты feel genuinely" patterns with various adjectives
sed -i '' 's/"Ты feel genuinely thoughtful"/"Te sientes genuinamente reflexivo"/g' src/data/translations-large/es.json
sed -i '' 's/"Ты feel genuinely insightful"/"Te sientes genuinamente perspicaz"/g' src/data/translations-large/es.json
sed -i '' 's/"Ты feel genuinely kind"/"Te sientes genuinamente amable"/g' src/data/translations-large/es.json
sed -i '' 's/"Ты feel genuinely attentive"/"Te sientes genuinamente atento"/g' src/data/translations-large/es.json
sed -i '' 's/"Ты feel genuinely genuine"/"Te sientes genuinamente auténtico"/g' src/data/translations-large/es.json
sed -i '' 's/"Ты feel genuinely funny"/"Te sientes genuinamente divertido"/g' src/data/translations-large/es.json
sed -i '' 's/"Ты feel genuinely smart"/"Te sientes genuinamente inteligente"/g' src/data/translations-large/es.json
sed -i '' 's/"Ты feel genuinely curious"/"Te sientes genuinamente curioso"/g' src/data/translations-large/es.json
sed -i '' 's/"Ты feel genuinely grounded"/"Te sientes genuinamente centrado"/g' src/data/translations-large/es.json
sed -i '' 's/"Ты feel genuinely confident"/"Te sientes genuinamente seguro"/g' src/data/translations-large/es.json
sed -i '' 's/"Ты feel genuinely creative"/"Te sientes genuinamente creativo"/g' src/data/translations-large/es.json
sed -i '' 's/"Ты feel genuinely passionate"/"Te sientes genuinamente apasionado"/g' src/data/translations-large/es.json
sed -i '' 's/"Ты feel genuinely calm"/"Te sientes genuinamente tranquilo"/g' src/data/translations-large/es.json
sed -i '' 's/"Ты feel genuinely happy"/"Te sientes genuinamente feliz"/g' src/data/translations-large/es.json
sed -i '' 's/"Ты feel genuinely excited"/"Te sientes genuinamente emocionado"/g' src/data/translations-large/es.json
sed -i '' 's/"Ты feel genuinely relaxed"/"Te sientes genuinamente relajado"/g' src/data/translations-large/es.json
sed -i '' 's/"Ты feel genuinely energetic"/"Te sientes genuinamente enérgico"/g' src/data/translations-large/es.json
sed -i '' 's/"Ты feel genuinely peaceful"/"Te sientes genuinamente en paz"/g' src/data/translations-large/es.json
sed -i '' 's/"Ты feel genuinely optimistic"/"Te sientes genuinamente optimista"/g' src/data/translations-large/es.json
sed -i '' 's/"Ты feel genuinely grateful"/"Te sientes genuinamente agradecido"/g' src/data/translations-large/es.json
sed -i '' 's/"Ты feel genuinely inspired"/"Te sientes genuinamente inspirado"/g' src/data/translations-large/es.json
sed -i '' 's/"Ты feel genuinely motivated"/"Te sientes genuinamente motivado"/g' src/data/translations-large/es.json
sed -i '' 's/"Ты feel genuinely focused"/"Te sientes genuinamente concentrado"/g' src/data/translations-large/es.json
sed -i '' 's/"Ты feel genuinely determined"/"Te sientes genuinamente decidido"/g' src/data/translations-large/es.json
sed -i '' 's/"Ты feel genuinely accomplished"/"Te sientes genuinamente realizado"/g' src/data/translations-large/es.json
sed -i '' 's/"Ты feel genuinely satisfied"/"Te sientes genuinamente satisfecho"/g' src/data/translations-large/es.json
sed -i '' 's/"Ты feel genuinely content"/"Te sientes genuinamente contento"/g' src/data/translations-large/es.json
sed -i '' 's/"Ты feel genuinely fulfilled"/"Te sientes genuinamente pleno"/g' src/data/translations-large/es.json
sed -i '' 's/"Ты feel genuinely proud"/"Te sientes genuinamente orgulloso"/g' src/data/translations-large/es.json
sed -i '' 's/"Ты feel genuinely appreciated"/"Te sientes genuinamente valorado"/g' src/data/translations-large/es.json

# Fix "тыr" patterns
sed -i '' 's/"тыr genuinely thoughtful"/"Te sientes genuinamente reflexivo"/g' src/data/translations-large/es.json
sed -i '' 's/"тыr genuinely insightful"/"Te sientes genuinamente perspicaz"/g' src/data/translations-large/es.json
sed -i '' 's/"тыr genuinely kind"/"Te sientes genuinamente amable"/g' src/data/translations-large/es.json
sed -i '' 's/"тыr genuinely attentive"/"Te sientes genuinamente atento"/g' src/data/translations-large/es.json

# Generic fallback for any remaining "Ты feel" patterns
sed -i '' 's/"Ты feel /"Te sientes /g' src/data/translations-large/es.json
sed -i '' 's/"тыr /"Te sientes /g' src/data/translations-large/es.json

echo "Spanish patterns fixed. Checking for remaining patterns..."
grep -c "Ты feel" src/data/translations-large/es.json || echo "0"