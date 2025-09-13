#!/bin/bash

# Comprehensive fix for all remaining mixed-language patterns

echo "Fixing all remaining mixed-language patterns..."

# Fix German (de.json) patterns
echo "Fixing German patterns..."
# Fix "Ты" patterns
sed -i '' 's/Ты /Du /g' src/data/translations-large/de.json
sed -i '' 's/ты /dich /g' src/data/translations-large/de.json
# Fix "тыr" patterns
sed -i '' 's/тыr /dein /g' src/data/translations-large/de.json
sed -i '' 's/Тыr /Dein /g' src/data/translations-large/de.json
# Fix "Я" patterns
sed -i '' 's/Я /Ich /g' src/data/translations-large/de.json
sed -i '' 's/Яf /Wenn /g' src/data/translations-large/de.json

# Fix Spanish (es.json) patterns
echo "Fixing Spanish patterns..."
# Fix "Ты" patterns
sed -i '' 's/Ты /Tú /g' src/data/translations-large/es.json
sed -i '' 's/ты /te /g' src/data/translations-large/es.json
# Fix "тыr" patterns
sed -i '' 's/тыr /tu /g' src/data/translations-large/es.json
sed -i '' 's/Тыr /Tu /g' src/data/translations-large/es.json
# Fix "Я" patterns
sed -i '' 's/Я /Yo /g' src/data/translations-large/es.json
sed -i '' 's/Яf /Si /g' src/data/translations-large/es.json

# Fix French (fr.json) patterns
echo "Fixing French patterns..."
# Fix "Ты" patterns
sed -i '' 's/Ты /Tu /g' src/data/translations-large/fr.json
sed -i '' 's/ты /te /g' src/data/translations-large/fr.json
# Fix "тыr" patterns
sed -i '' 's/тыr /ton /g' src/data/translations-large/fr.json
sed -i '' 's/Тыr /Ton /g' src/data/translations-large/fr.json
# Fix "Я" patterns
sed -i '' 's/Я /Je /g' src/data/translations-large/fr.json
sed -i '' 's/Яf /Si /g' src/data/translations-large/fr.json

# Fix Korean (ko.json) patterns
echo "Fixing Korean patterns..."
# Fix "Ты" patterns
sed -i '' 's/Ты /당신은 /g' src/data/translations-large/ko.json
sed -i '' 's/ты /당신을 /g' src/data/translations-large/ko.json
# Fix "тыr" patterns
sed -i '' 's/тыr /당신의 /g' src/data/translations-large/ko.json
sed -i '' 's/Тыr /당신의 /g' src/data/translations-large/ko.json
# Fix "Я" patterns
sed -i '' 's/Я /나는 /g' src/data/translations-large/ko.json
sed -i '' 's/Яf /만약 /g' src/data/translations-large/ko.json

# Fix Chinese (zh.json) patterns
echo "Fixing Chinese patterns..."
# Fix "Ты" patterns
sed -i '' 's/Ты /你 /g' src/data/translations-large/zh.json
sed -i '' 's/ты /你 /g' src/data/translations-large/zh.json
# Fix "тыr" patterns
sed -i '' 's/тыr /你的 /g' src/data/translations-large/zh.json
sed -i '' 's/Тыr /你的 /g' src/data/translations-large/zh.json
# Fix "Я" patterns
sed -i '' 's/Я /我 /g' src/data/translations-large/zh.json
sed -i '' 's/Яf /如果 /g' src/data/translations-large/zh.json

# Fix Russian (ru.json) patterns - these should be proper Russian
echo "Fixing Russian patterns..."
# Fix "тыr" patterns (should be "твой" in Russian)
sed -i '' 's/тыr /твой /g' src/data/translations-large/ru.json
sed -i '' 's/Тыr /Твой /g' src/data/translations-large/ru.json
# Fix "Яf" patterns (should be "Если" in Russian)
sed -i '' 's/Яf /Если /g' src/data/translations-large/ru.json

echo "Checking for remaining patterns..."
echo "Remaining 'Ты' patterns:"
grep -c "Ты" src/data/translations-large/*.json || echo "0"
echo "Remaining 'тыr' patterns:"
grep -c "тыr" src/data/translations-large/*.json || echo "0"
echo "Remaining 'Я' patterns:"
grep -c "Я" src/data/translations-large/*.json || echo "0"

echo "All mixed-language pattern fixes completed!"