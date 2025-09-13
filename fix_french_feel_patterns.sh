#!/bin/bash

# Fix French mixed-language patterns
echo "Fixing French mixed-language patterns..."

# Fix "Ты feel genuinely" patterns with various adjectives
sed -i '' 's/"Ты feel genuinely thoughtful"/"Tu te sens vraiment réfléchi"/g' src/data/translations-large/fr.json
sed -i '' 's/"Ты feel genuinely insightful"/"Tu te sens vraiment perspicace"/g' src/data/translations-large/fr.json
sed -i '' 's/"Ты feel genuinely kind"/"Tu te sens vraiment gentil"/g' src/data/translations-large/fr.json
sed -i '' 's/"Ты feel genuinely attentive"/"Tu te sens vraiment attentif"/g' src/data/translations-large/fr.json
sed -i '' 's/"Ты feel genuinely genuine"/"Tu te sens vraiment authentique"/g' src/data/translations-large/fr.json
sed -i '' 's/"Ты feel genuinely funny"/"Tu te sens vraiment drôle"/g' src/data/translations-large/fr.json
sed -i '' 's/"Ты feel genuinely smart"/"Tu te sens vraiment intelligent"/g' src/data/translations-large/fr.json
sed -i '' 's/"Ты feel genuinely curious"/"Tu te sens vraiment curieux"/g' src/data/translations-large/fr.json
sed -i '' 's/"Ты feel genuinely grounded"/"Tu te sens vraiment ancré"/g' src/data/translations-large/fr.json
sed -i '' 's/"Ты feel genuinely confident"/"Tu te sens vraiment confiant"/g' src/data/translations-large/fr.json
sed -i '' 's/"Ты feel genuinely creative"/"Tu te sens vraiment créatif"/g' src/data/translations-large/fr.json
sed -i '' 's/"Ты feel genuinely passionate"/"Tu te sens vraiment passionné"/g' src/data/translations-large/fr.json
sed -i '' 's/"Ты feel genuinely calm"/"Tu te sens vraiment calme"/g' src/data/translations-large/fr.json
sed -i '' 's/"Ты feel genuinely happy"/"Tu te sens vraiment heureux"/g' src/data/translations-large/fr.json
sed -i '' 's/"Ты feel genuinely excited"/"Tu te sens vraiment excité"/g' src/data/translations-large/fr.json
sed -i '' 's/"Ты feel genuinely relaxed"/"Tu te sens vraiment détendu"/g' src/data/translations-large/fr.json
sed -i '' 's/"Ты feel genuinely energetic"/"Tu te sens vraiment énergique"/g' src/data/translations-large/fr.json
sed -i '' 's/"Ты feel genuinely peaceful"/"Tu te sens vraiment paisible"/g' src/data/translations-large/fr.json
sed -i '' 's/"Ты feel genuinely optimistic"/"Tu te sens vraiment optimiste"/g' src/data/translations-large/fr.json
sed -i '' 's/"Ты feel genuinely grateful"/"Tu te sens vraiment reconnaissant"/g' src/data/translations-large/fr.json

# Fix "тыr" patterns
sed -i '' 's/"тыr genuinely thoughtful"/"Tu te sens vraiment réfléchi"/g' src/data/translations-large/fr.json
sed -i '' 's/"тыr genuinely insightful"/"Tu te sens vraiment perspicace"/g' src/data/translations-large/fr.json
sed -i '' 's/"тыr genuinely kind"/"Tu te sens vraiment gentil"/g' src/data/translations-large/fr.json
sed -i '' 's/"тыr genuinely attentive"/"Tu te sens vraiment attentif"/g' src/data/translations-large/fr.json

# Generic fallback for any remaining "Ты feel" patterns
sed -i '' 's/"Ты feel /"Tu te sens /g' src/data/translations-large/fr.json
sed -i '' 's/"тыr /"Tu te sens /g' src/data/translations-large/fr.json

echo "French patterns fixed. Checking for remaining patterns..."
grep -c "Ты feel" src/data/translations-large/fr.json || echo "0"