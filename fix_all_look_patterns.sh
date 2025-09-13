#!/bin/bash

# Fix 'Ты look stunning' patterns in all remaining languages
echo "Fixing 'Ты look stunning' patterns in all languages..."

# German translations
echo "Fixing German patterns..."
sed -i '' 's/"Ты look stunning in that photo—so seriously\."/"Du siehst auf diesem Foto umwerfend aus—so ernst."/g' src/data/translations-large/de.json
sed -i '' 's/"Ты look stunning in that photo—so truly\."/"Du siehst auf diesem Foto umwerfend aus—so wahrhaftig."/g' src/data/translations-large/de.json
sed -i '' 's/"Ты look stunning in that photo—so quietly\."/"Du siehst auf diesem Foto umwerfend aus—so ruhig."/g' src/data/translations-large/de.json
sed -i '' 's/"Ты look stunning in that photo—so honestly\."/"Du siehst auf diesem Foto umwerfend aus—so ehrlich."/g' src/data/translations-large/de.json
sed -i '' 's/"Ты look stunning in that photo—so effortlessly\."/"Du siehst auf diesem Foto umwerfend aus—so mühelos."/g' src/data/translations-large/de.json
sed -i '' 's/"Ты look stunning in that photo—so intentionally\."/"Du siehst auf diesem Foto umwerfend aus—so absichtlich."/g' src/data/translations-large/de.json
sed -i '' 's/"Ты look stunning in that selfie—so seriously\."/"Du siehst auf diesem Selfie umwerfend aus—so ernst."/g' src/data/translations-large/de.json
sed -i '' 's/"Ты look stunning in that selfie—so truly\."/"Du siehst auf diesem Selfie umwerfend aus—so wahrhaftig."/g' src/data/translations-large/de.json
sed -i '' 's/"Ты look stunning in that selfie—so quietly\."/"Du siehst auf diesem Selfie umwerfend aus—so ruhig."/g' src/data/translations-large/de.json
sed -i '' 's/"Ты look stunning in that selfie—so honestly\."/"Du siehst auf diesem Selfie umwerfend aus—so ehrlich."/g' src/data/translations-large/de.json
sed -i '' 's/"Ты look stunning in that selfie—so effortlessly\."/"Du siehst auf diesem Selfie umwerfend aus—so mühelos."/g' src/data/translations-large/de.json
sed -i '' 's/"Ты look stunning in that selfie—so intentionally\."/"Du siehst auf diesem Selfie umwerfend aus—so absichtlich."/g' src/data/translations-large/de.json
sed -i '' 's/"Straight up—ты look stunning\. hard to scroll past\."/"Ehrlich gesagt—du siehst umwerfend aus. Schwer vorbeizuscrollen."/g' src/data/translations-large/de.json
sed -i '' 's/"Ты look /"Du siehst /g' src/data/translations-large/de.json
sed -i '' 's/"ты look /"du siehst /g' src/data/translations-large/de.json

# French translations
echo "Fixing French patterns..."
sed -i '' 's/"Ты look stunning in that photo—so seriously\."/"Tu es magnifique sur cette photo—si sérieusement."/g' src/data/translations-large/fr.json
sed -i '' 's/"Ты look stunning in that photo—so truly\."/"Tu es magnifique sur cette photo—si vraiment."/g' src/data/translations-large/fr.json
sed -i '' 's/"Ты look stunning in that photo—so quietly\."/"Tu es magnifique sur cette photo—si discrètement."/g' src/data/translations-large/fr.json
sed -i '' 's/"Ты look stunning in that photo—so honestly\."/"Tu es magnifique sur cette photo—si honnêtement."/g' src/data/translations-large/fr.json
sed -i '' 's/"Ты look stunning in that photo—so effortlessly\."/"Tu es magnifique sur cette photo—si naturellement."/g' src/data/translations-large/fr.json
sed -i '' 's/"Ты look stunning in that photo—so intentionally\."/"Tu es magnifique sur cette photo—si intentionnellement."/g' src/data/translations-large/fr.json
sed -i '' 's/"Ты look stunning in that selfie—so seriously\."/"Tu es magnifique sur ce selfie—si sérieusement."/g' src/data/translations-large/fr.json
sed -i '' 's/"Ты look stunning in that selfie—so truly\."/"Tu es magnifique sur ce selfie—si vraiment."/g' src/data/translations-large/fr.json
sed -i '' 's/"Ты look stunning in that selfie—so quietly\."/"Tu es magnifique sur ce selfie—si discrètement."/g' src/data/translations-large/fr.json
sed -i '' 's/"Ты look stunning in that selfie—so honestly\."/"Tu es magnifique sur ce selfie—si honnêtement."/g' src/data/translations-large/fr.json
sed -i '' 's/"Ты look stunning in that selfie—so effortlessly\."/"Tu es magnifique sur ce selfie—si naturellement."/g' src/data/translations-large/fr.json
sed -i '' 's/"Ты look stunning in that selfie—so intentionally\."/"Tu es magnifique sur ce selfie—si intentionnellement."/g' src/data/translations-large/fr.json
sed -i '' 's/"Straight up—ты look stunning\. hard to scroll past\."/"Franchement—tu es magnifique. Difficile de passer à côté."/g' src/data/translations-large/fr.json
sed -i '' 's/"Ты look /"Tu es /g' src/data/translations-large/fr.json
sed -i '' 's/"ты look /"tu es /g' src/data/translations-large/fr.json

# Japanese translations
echo "Fixing Japanese patterns..."
sed -i '' 's/"Ты look stunning in that photo—so seriously\."/"その写真であなたは本当に美しく見えます—とても真剣に。"/g' src/data/translations-large/ja.json
sed -i '' 's/"Ты look stunning in that photo—so truly\."/"その写真であなたは本当に美しく見えます—とても本当に。"/g' src/data/translations-large/ja.json
sed -i '' 's/"Ты look stunning in that photo—so quietly\."/"その写真であなたは本当に美しく見えます—とても静かに。"/g' src/data/translations-large/ja.json
sed -i '' 's/"Ты look stunning in that photo—so honestly\."/"その写真であなたは本当に美しく見えます—とても正直に。"/g' src/data/translations-large/ja.json
sed -i '' 's/"Ты look stunning in that photo—so effortlessly\."/"その写真であなたは本当に美しく見えます—とても自然に。"/g' src/data/translations-large/ja.json
sed -i '' 's/"Ты look stunning in that photo—so intentionally\."/"その写真であなたは本当に美しく見えます—とても意図的に。"/g' src/data/translations-large/ja.json
sed -i '' 's/"Ты look stunning in that selfie—so seriously\."/"その自撮りであなたは本当に美しく見えます—とても真剣に。"/g' src/data/translations-large/ja.json
sed -i '' 's/"Ты look stunning in that selfie—so truly\."/"その自撮りであなたは本当に美しく見えます—とても本当に。"/g' src/data/translations-large/ja.json
sed -i '' 's/"Ты look stunning in that selfie—so quietly\."/"その自撮りであなたは本当に美しく見えます—とても静かに。"/g' src/data/translations-large/ja.json
sed -i '' 's/"Ты look stunning in that selfie—so honestly\."/"その自撮りであなたは本当に美しく見えます—とても正直に。"/g' src/data/translations-large/ja.json
sed -i '' 's/"Ты look stunning in that selfie—so effortlessly\."/"その自撮りであなたは本当に美しく見えます—とても自然に。"/g' src/data/translations-large/ja.json
sed -i '' 's/"Ты look stunning in that selfie—so intentionally\."/"その自撮りであなたは本当に美しく見えます—とても意図的に。"/g' src/data/translations-large/ja.json
sed -i '' 's/"Straight up—ты look stunning\. hard to scroll past\."/"率直に言って—あなたは美しく見えます。スクロールするのが難しい。"/g' src/data/translations-large/ja.json
sed -i '' 's/"Ты look /"あなたは見えます /g' src/data/translations-large/ja.json
sed -i '' 's/"ты look /"あなたは見えます /g' src/data/translations-large/ja.json

# Korean translations
echo "Fixing Korean patterns..."
sed -i '' 's/"Ты look stunning in that photo—so seriously\."/"그 사진에서 당신은 정말 멋져 보입니다—너무 진지하게."/g' src/data/translations-large/ko.json
sed -i '' 's/"Ты look stunning in that photo—so truly\."/"그 사진에서 당신은 정말 멋져 보입니다—너무 진실로."/g' src/data/translations-large/ko.json
sed -i '' 's/"Ты look stunning in that photo—so quietly\."/"그 사진에서 당신은 정말 멋져 보입니다—너무 조용히."/g' src/data/translations-large/ko.json
sed -i '' 's/"Ты look stunning in that photo—so honestly\."/"그 사진에서 당신은 정말 멋져 보입니다—너무 솔직하게."/g' src/data/translations-large/ko.json
sed -i '' 's/"Ты look stunning in that photo—so effortlessly\."/"그 사진에서 당신은 정말 멋져 보입니다—너무 자연스럽게."/g' src/data/translations-large/ko.json
sed -i '' 's/"Ты look stunning in that photo—so intentionally\."/"그 사진에서 당신은 정말 멋져 보입니다—너무 의도적으로."/g' src/data/translations-large/ko.json
sed -i '' 's/"Ты look stunning in that selfie—so seriously\."/"그 셀피에서 당신은 정말 멋져 보입니다—너무 진지하게."/g' src/data/translations-large/ko.json
sed -i '' 's/"Ты look stunning in that selfie—so truly\."/"그 셀피에서 당신은 정말 멋져 보입니다—너무 진실로."/g' src/data/translations-large/ko.json
sed -i '' 's/"Ты look stunning in that selfie—so quietly\."/"그 셀피에서 당신은 정말 멋져 보입니다—너무 조용히."/g' src/data/translations-large/ko.json
sed -i '' 's/"Ты look stunning in that selfie—so honestly\."/"그 셀피에서 당신은 정말 멋져 보입니다—너무 솔직하게."/g' src/data/translations-large/ko.json
sed -i '' 's/"Ты look stunning in that selfie—so effortlessly\."/"그 셀피에서 당신은 정말 멋져 보입니다—너무 자연스럽게."/g' src/data/translations-large/ko.json
sed -i '' 's/"Ты look stunning in that selfie—so intentionally\."/"그 셀피에서 당신은 정말 멋져 보입니다—너무 의도적으로."/g' src/data/translations-large/ko.json
sed -i '' 's/"Straight up—ты look stunning\. hard to scroll past\."/"솔직히—당신은 멋져 보입니다. 스크롤하기 어렵습니다."/g' src/data/translations-large/ko.json
sed -i '' 's/"Ты look /"당신은 보입니다 /g' src/data/translations-large/ko.json
sed -i '' 's/"ты look /"당신은 보입니다 /g' src/data/translations-large/ko.json

# Chinese translations
echo "Fixing Chinese patterns..."
sed -i '' 's/"Ты look stunning in that photo—so seriously\."/"你在那张照片中看起来很棒—如此认真。"/g' src/data/translations-large/zh.json
sed -i '' 's/"Ты look stunning in that photo—so truly\."/"你在那张照片中看起来很棒—如此真实。"/g' src/data/translations-large/zh.json
sed -i '' 's/"Ты look stunning in that photo—so quietly\."/"你在那张照片中看起来很棒—如此安静。"/g' src/data/translations-large/zh.json
sed -i '' 's/"Ты look stunning in that photo—so honestly\."/"你在那张照片中看起来很棒—如此诚实。"/g' src/data/translations-large/zh.json
sed -i '' 's/"Ты look stunning in that photo—so effortlessly\."/"你在那张照片中看起来很棒—如此轻松。"/g' src/data/translations-large/zh.json
sed -i '' 's/"Ты look stunning in that photo—so intentionally\."/"你在那张照片中看起来很棒—如此有意。"/g' src/data/translations-large/zh.json
sed -i '' 's/"Ты look stunning in that selfie—so seriously\."/"你在那张自拍中看起来很棒—如此认真。"/g' src/data/translations-large/zh.json
sed -i '' 's/"Ты look stunning in that selfie—so truly\."/"你在那张自拍中看起来很棒—如此真实。"/g' src/data/translations-large/zh.json
sed -i '' 's/"Ты look stunning in that selfie—so quietly\."/"你在那张自拍中看起来很棒—如此安静。"/g' src/data/translations-large/zh.json
sed -i '' 's/"Ты look stunning in that selfie—so honestly\."/"你在那张自拍中看起来很棒—如此诚实。"/g' src/data/translations-large/zh.json
sed -i '' 's/"Ты look stunning in that selfie—so effortlessly\."/"你在那张自拍中看起来很棒—如此轻松。"/g' src/data/translations-large/zh.json
sed -i '' 's/"Ты look stunning in that selfie—so intentionally\."/"你在那张自拍中看起来很棒—如此有意。"/g' src/data/translations-large/zh.json
sed -i '' 's/"Straight up—ты look stunning\. hard to scroll past\."/"直接说—你看起来很棒。很难滚动过去。"/g' src/data/translations-large/zh.json
sed -i '' 's/"Ты look /"你看起来 /g' src/data/translations-large/zh.json
sed -i '' 's/"ты look /"你看起来 /g' src/data/translations-large/zh.json

echo "All 'look stunning' patterns fixed!"
echo "Checking remaining patterns in all files..."
for lang in de fr ja ko zh; do
    count=$(grep -c "Ты look" src/data/translations-large/${lang}.json 2>/dev/null || echo "0")
    echo "${lang}.json: $count remaining patterns"
done