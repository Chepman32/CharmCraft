#!/bin/bash

# Final comprehensive fix for all remaining mixed-language patterns

echo "Fixing final mixed-language patterns..."

# Fix Korean (ko.json) patterns - massive "Я'd really like to встретитьсi" pattern
echo "Fixing Korean patterns..."
sed -i '' 's/Я'"'"'d really like to встретитьсi\./정말 만나고 싶습니다./g' src/data/translations-large/ko.json

# Fix remaining Korean mixed patterns
sed -i '' 's/당신은 превзошла мои ожидания — спокойно и искренне\. Раунд два?/당신은 제 기대를 뛰어넘었습니다 — 조용하고 진심으로. 라운드 2?/g' src/data/translations-large/ko.json
sed -i '' 's/Мне действительно было приятно\. С тобой легко\./정말 즐거웠습니다. 당신과 함께하면 편안해요./g' src/data/translations-large/ko.json
sed -i '' 's/До сих пор улыбаюсь, вспоминая наш разговор\. С тобой приятно\./우리 대화를 떠올리며 아직도 미소 짓고 있어요. 당신과 함께하면 즐거워요./g' src/data/translations-large/ko.json
sed -i '' 's/Хотел\(а\) бы увидеться ещё раз\. В какие дни удобно на следующей неделе?/다시 만나고 싶어요. 다음 주 언제가 편하신가요?/g' src/data/translations-large/ko.json
sed -i '' 's/Между нами есть импульс — не хочу его терять\./우리 사이에 끌림이 있어요 — 잃고 싶지 않아요./g' src/data/translations-large/ko.json

# Fix Ukrainian (ua.json) patterns
echo "Fixing Ukrainian patterns..."
sed -i '' 's/Мне действительно было приятно\. С тобой легко\./Мені справді було приємно. З тобою легко./g' src/data/translations-large/ua.json
sed -i '' 's/До сих пор улыбаюсь, вспоминая наш разговор\. С тобой приятно\./Досі посміхаюся, згадуючи нашу розмову. З тобою приємно./g' src/data/translations-large/ua.json
sed -i '' 's/Хотел\(а\) бы увидеться ещё раз\. В какие дни удобно на следующей неделе?/Хотів\(ла\) би зустрітися ще раз. Які дні зручні на наступному тижні?/g' src/data/translations-large/ua.json
sed -i '' 's/Между нами есть импульс — не хочу его терять\./Між нами є імпульс — не хочу його втрачати./g' src/data/translations-large/ua.json

# Fix remaining Russian patterns - these should be proper Russian
echo "Fixing Russian patterns..."
# The "мягко" is actually correct Russian, but let's check for any other mixed patterns

# Fix any remaining "тыr" patterns in all files
echo "Fixing remaining 'тыr' patterns..."
for file in src/data/translations-large/*.json; do
    if [[ "$file" == *"de.json" ]]; then
        sed -i '' 's/тыr/dein/g' "$file"
    elif [[ "$file" == *"es.json" ]]; then
        sed -i '' 's/тыr/tu/g' "$file"
    elif [[ "$file" == *"fr.json" ]]; then
        sed -i '' 's/тыr/ton/g' "$file"
    elif [[ "$file" == *"ja.json" ]]; then
        sed -i '' 's/тыr/あなたの/g' "$file"
    elif [[ "$file" == *"ko.json" ]]; then
        sed -i '' 's/тыr/당신의/g' "$file"
    elif [[ "$file" == *"zh.json" ]]; then
        sed -i '' 's/тыr/你的/g' "$file"
    elif [[ "$file" == *"ru.json" ]]; then
        sed -i '' 's/тыr/твой/g' "$file"
    fi
done

# Fix any remaining "Я" patterns in all files (except Russian where it's correct)
echo "Fixing remaining 'Я' patterns..."
for file in src/data/translations-large/*.json; do
    if [[ "$file" == *"de.json" ]]; then
        sed -i '' 's/Я /Ich /g' "$file"
    elif [[ "$file" == *"es.json" ]]; then
        sed -i '' 's/Я /Yo /g' "$file"
    elif [[ "$file" == *"fr.json" ]]; then
        sed -i '' 's/Я /Je /g' "$file"
    elif [[ "$file" == *"ja.json" ]]; then
        sed -i '' 's/Я /私は /g' "$file"
    elif [[ "$file" == *"ko.json" ]]; then
        sed -i '' 's/Я /나는 /g' "$file"
    elif [[ "$file" == *"zh.json" ]]; then
        sed -i '' 's/Я /我 /g' "$file"
    fi
done

echo "Final verification - checking for remaining patterns..."
echo "Remaining 'Ты' patterns:"
grep -c "Ты" src/data/translations-large/*.json || echo "0"
echo "Remaining 'тыr' patterns:"
grep -c "тыr" src/data/translations-large/*.json || echo "0"
echo "Remaining 'Я' patterns (excluding Russian):"
for file in src/data/translations-large/*.json; do
    if [[ "$file" != *"ru.json" ]]; then
        count=$(grep -c "Я" "$file" 2>/dev/null || echo "0")
        if [[ "$count" != "0" ]]; then
            echo "$file:$count"
        fi
    fi
done

echo "All mixed-language pattern fixes completed!"