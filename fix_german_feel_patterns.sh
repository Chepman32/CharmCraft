#!/bin/bash

# Fix German mixed-language patterns
echo "Fixing German mixed-language patterns..."

# Fix "Ты feel genuinely" patterns with various adjectives
sed -i '' 's/"Ты feel genuinely thoughtful"/"Du fühlst dich wirklich nachdenklich"/g' src/data/translations-large/de.json
sed -i '' 's/"Ты feel genuinely insightful"/"Du fühlst dich wirklich einsichtsvoll"/g' src/data/translations-large/de.json
sed -i '' 's/"Ты feel genuinely kind"/"Du fühlst dich wirklich freundlich"/g' src/data/translations-large/de.json
sed -i '' 's/"Ты feel genuinely attentive"/"Du fühlst dich wirklich aufmerksam"/g' src/data/translations-large/de.json
sed -i '' 's/"Ты feel genuinely genuine"/"Du fühlst dich wirklich authentisch"/g' src/data/translations-large/de.json
sed -i '' 's/"Ты feel genuinely funny"/"Du fühlst dich wirklich lustig"/g' src/data/translations-large/de.json
sed -i '' 's/"Ты feel genuinely smart"/"Du fühlst dich wirklich klug"/g' src/data/translations-large/de.json
sed -i '' 's/"Ты feel genuinely curious"/"Du fühlst dich wirklich neugierig"/g' src/data/translations-large/de.json
sed -i '' 's/"Ты feel genuinely grounded"/"Du fühlst dich wirklich geerdet"/g' src/data/translations-large/de.json
sed -i '' 's/"Ты feel genuinely confident"/"Du fühlst dich wirklich selbstbewusst"/g' src/data/translations-large/de.json
sed -i '' 's/"Ты feel genuinely creative"/"Du fühlst dich wirklich kreativ"/g' src/data/translations-large/de.json
sed -i '' 's/"Ты feel genuinely passionate"/"Du fühlst dich wirklich leidenschaftlich"/g' src/data/translations-large/de.json
sed -i '' 's/"Ты feel genuinely calm"/"Du fühlst dich wirklich ruhig"/g' src/data/translations-large/de.json
sed -i '' 's/"Ты feel genuinely happy"/"Du fühlst dich wirklich glücklich"/g' src/data/translations-large/de.json
sed -i '' 's/"Ты feel genuinely excited"/"Du fühlst dich wirklich aufgeregt"/g' src/data/translations-large/de.json
sed -i '' 's/"Ты feel genuinely relaxed"/"Du fühlst dich wirklich entspannt"/g' src/data/translations-large/de.json
sed -i '' 's/"Ты feel genuinely energetic"/"Du fühlst dich wirklich energiegeladen"/g' src/data/translations-large/de.json
sed -i '' 's/"Ты feel genuinely peaceful"/"Du fühlst dich wirklich friedlich"/g' src/data/translations-large/de.json
sed -i '' 's/"Ты feel genuinely optimistic"/"Du fühlst dich wirklich optimistisch"/g' src/data/translations-large/de.json
sed -i '' 's/"Ты feel genuinely grateful"/"Du fühlst dich wirklich dankbar"/g' src/data/translations-large/de.json

# Fix "тыr" patterns
sed -i '' 's/"тыr genuinely thoughtful"/"Du fühlst dich wirklich nachdenklich"/g' src/data/translations-large/de.json
sed -i '' 's/"тыr genuinely insightful"/"Du fühlst dich wirklich einsichtsvoll"/g' src/data/translations-large/de.json
sed -i '' 's/"тыr genuinely kind"/"Du fühlst dich wirklich freundlich"/g' src/data/translations-large/de.json
sed -i '' 's/"тыr genuinely attentive"/"Du fühlst dich wirklich aufmerksam"/g' src/data/translations-large/de.json

# Generic fallback for any remaining "Ты feel" patterns
sed -i '' 's/"Ты feel /"Du fühlst dich /g' src/data/translations-large/de.json
sed -i '' 's/"тыr /"Du fühlst dich /g' src/data/translations-large/de.json

echo "German patterns fixed. Checking for remaining patterns..."
grep -c "Ты feel" src/data/translations-large/de.json || echo "0"