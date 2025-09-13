#!/bin/bash

# Fix Russian translation file mixed-language strings
RU_FILE="/Users/antonchepur/CharmCraft/src/data/translations-large/ru.json"

# Replace all "look stunning" variations with proper Russian translations
sed -i '' 's/Ты look stunning in that photo—so honestly\./Ты выглядишь потрясающе на этом фото — честно говоря./g' "$RU_FILE"
sed -i '' 's/Ты look stunning in that photo—so effortlessly\./Ты выглядишь потрясающе на этом фото — без усилий./g' "$RU_FILE"
sed -i '' 's/Ты look stunning in that photo—so intentionally\./Ты выглядишь потрясающе на этом фото — намеренно./g' "$RU_FILE"

sed -i '' 's/Ты look stunning in that selfie—so seriously\./Ты выглядишь потрясающе на этом селфи — серьезно./g' "$RU_FILE"
sed -i '' 's/Ты look stunning in that selfie—so truly\./Ты выглядишь потрясающе на этом селфи — правда./g' "$RU_FILE"
sed -i '' 's/Ты look stunning in that selfie—so quietly\./Ты выглядишь потрясающе на этом селфи — тихо говоря./g' "$RU_FILE"
sed -i '' 's/Ты look stunning in that selfie—so honestly\./Ты выглядишь потрясающе на этом селфи — честно говоря./g' "$RU_FILE"
sed -i '' 's/Ты look stunning in that selfie—so effortlessly\./Ты выглядишь потрясающе на этом селфи — без усилий./g' "$RU_FILE"
sed -i '' 's/Ты look stunning in that selfie—so intentionally\./Ты выглядишь потрясающе на этом селфи — намеренно./g' "$RU_FILE"

sed -i '' 's/Ты look stunning in that portrait—so seriously\./Ты выглядишь потрясающе на этом портрете — серьезно./g' "$RU_FILE"
sed -i '' 's/Ты look stunning in that portrait—so truly\./Ты выглядишь потрясающе на этом портрете — правда./g' "$RU_FILE"
sed -i '' 's/Ты look stunning in that portrait—so quietly\./Ты выглядишь потрясающе на этом портрете — тихо говоря./g' "$RU_FILE"
sed -i '' 's/Ты look stunning in that portrait—so honestly\./Ты выглядишь потрясающе на этом портрете — честно говоря./g' "$RU_FILE"
sed -i '' 's/Ты look stunning in that portrait—so effortlessly\./Ты выглядишь потрясающе на этом портрете — без усилий./g' "$RU_FILE"
sed -i '' 's/Ты look stunning in that portrait—so intentionally\./Ты выглядишь потрясающе на этом портрете — намеренно./g' "$RU_FILE"

sed -i '' 's/Ты look stunning in that story—so seriously\./Ты выглядишь потрясающе в этой истории — серьезно./g' "$RU_FILE"
sed -i '' 's/Ты look stunning in that story—so truly\./Ты выглядишь потрясающе в этой истории — правда./g' "$RU_FILE"
sed -i '' 's/Ты look stunning in that story—so quietly\./Ты выглядишь потрясающе в этой истории — тихо говоря./g' "$RU_FILE"
sed -i '' 's/Ты look stunning in that story—so honestly\./Ты выглядишь потрясающе в этой истории — честно говоря./g' "$RU_FILE"
sed -i '' 's/Ты look stunning in that story—so effortlessly\./Ты выглядишь потрясающе в этой истории — без усилий./g' "$RU_FILE"
sed -i '' 's/Ты look stunning in that story—so intentionally\./Ты выглядишь потрясающе в этой истории — намеренно./g' "$RU_FILE"

sed -i '' 's/Ты look stunning in that post—so seriously\./Ты выглядишь потрясающе в этом посте — серьезно./g' "$RU_FILE"
sed -i '' 's/Ты look stunning in that post—so truly\./Ты выглядишь потрясающе в этом посте — правда./g' "$RU_FILE"
sed -i '' 's/Ты look stunning in that post—so quietly\./Ты выглядишь потрясающе в этом посте — тихо говоря./g' "$RU_FILE"
sed -i '' 's/Ты look stunning in that post—so honestly\./Ты выглядишь потрясающе в этом посте — честно говоря./g' "$RU_FILE"
sed -i '' 's/Ты look stunning in that post—so effortlessly\./Ты выглядишь потрясающе в этом посте — без усилий./g' "$RU_FILE"
sed -i '' 's/Ты look stunning in that post—so intentionally\./Ты выглядишь потрясающе в этом посте — намеренно./g' "$RU_FILE"

echo "Russian translation fixes completed!"