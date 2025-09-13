#!/bin/bash

# Fix mixed Russian-English patterns across all language files

echo "Fixing mixed Russian-English patterns..."

# German translations
echo "Fixing German mixed patterns..."
sed -i '' 's/Я хочу to be твой person\. talk to me—what'"'"'s up right now?/Ich möchte deine Person sein. Sprich mit mir—was ist gerade los?/g' src/data/translations-large/de.json
sed -i '' 's/Я хочу more people like ты—thoughtful and present\./Ich wünsche mir mehr Menschen wie dich—nachdenklich und präsent./g' src/data/translations-large/de.json
sed -i '' 's/Я хочу more people like ты—insightful and present\./Ich wünsche mir mehr Menschen wie dich—einsichtsvoll und präsent./g' src/data/translations-large/de.json
sed -i '' 's/Я хочу more people like ты—genuine and present\./Ich wünsche mir mehr Menschen wie dich—authentisch und präsent./g' src/data/translations-large/de.json
sed -i '' 's/Я хочу more people like ты—funny and present\./Ich wünsche mir mehr Menschen wie dich—lustig und präsent./g' src/data/translations-large/de.json
sed -i '' 's/Я хочу more people like ты—smart and present\./Ich wünsche mir mehr Menschen wie dich—klug und präsent./g' src/data/translations-large/de.json
sed -i '' 's/Я хочу more people like ты—curious and present\./Ich wünsche mir mehr Menschen wie dich—neugierig und präsent./g' src/data/translations-large/de.json
sed -i '' 's/Я хочу more people like ты—grounded and present\./Ich wünsche mir mehr Menschen wie dich—geerdet und präsent./g' src/data/translations-large/de.json
sed -i '' 's/Я хочу more people like ты—bright and present\./Ich wünsche mir mehr Menschen wie dich—hell und präsent./g' src/data/translations-large/de.json
sed -i '' 's/Я хочу more people like ты—confident and present\./Ich wünsche mir mehr Menschen wie dich—selbstbewusst und präsent./g' src/data/translations-large/de.json
sed -i '' 's/Я хочу more people like ты—calm and present\./Ich wünsche mir mehr Menschen wie dich—ruhig und präsent./g' src/data/translations-large/de.json
sed -i '' 's/Я хочу more people like ты—witty and present\./Ich wünsche mir mehr Menschen wie dich—witzig und präsent./g' src/data/translations-large/de.json
sed -i '' 's/Я хочу more people like ты—self‑aware and present\./Ich wünsche mir mehr Menschen wie dich—selbstbewusst und präsent./g' src/data/translations-large/de.json
sed -i '' 's/Я хочу more people like ты—creative and present\./Ich wünsche mir mehr Menschen wie dich—kreativ und präsent./g' src/data/translations-large/de.json
sed -i '' 's/Я хочу more people like ты—driven and present\./Ich wünsche mir mehr Menschen wie dich—zielstrebig und präsent./g' src/data/translations-large/de.json
sed -i '' 's/Я хочу more people like ты—patient and present\./Ich wünsche mir mehr Menschen wie dich—geduldig und präsent./g' src/data/translations-large/de.json
sed -i '' 's/Я хочу more people like ты—attentive and present\./Ich wünsche mir mehr Menschen wie dich—aufmerksam und präsent./g' src/data/translations-large/de.json
sed -i '' 's/Я хочу more people like ты—open‑minded and present\./Ich wünsche mir mehr Menschen wie dich—aufgeschlossen und präsent./g' src/data/translations-large/de.json
sed -i '' 's/Я хочу more people like ты—steady and present\./Ich wünsche mir mehr Menschen wie dich—beständig und präsent./g' src/data/translations-large/de.json
sed -i '' 's/Я хочу more people like ты—playful and present\./Ich wünsche mir mehr Menschen wie dich—verspielt und präsent./g' src/data/translations-large/de.json
sed -i '' 's/Я хочу more people like ты—caring and present\./Ich wünsche mir mehr Menschen wie dich—fürsorglich und präsent./g' src/data/translations-large/de.json
sed -i '' 's/Я хочу more people like ты—resilient and present\./Ich wünsche mir mehr Menschen wie dich—widerstandsfähig und präsent./g' src/data/translations-large/de.json
sed -i '' 's/Я хочу more people like ты—balanced and present\./Ich wünsche mir mehr Menschen wie dich—ausgeglichen und präsent./g' src/data/translations-large/de.json
sed -i '' 's/Я хочу more people like ты—articulate and present\./Ich wünsche mir mehr Menschen wie dich—eloquent und präsent./g' src/data/translations-large/de.json
sed -i '' 's/Я хочу more people like ты—observant and present\./Ich wünsche mir mehr Menschen wie dich—aufmerksam und präsent./g' src/data/translations-large/de.json
sed -i '' 's/Я хочу more people like ты—brave and present\./Ich wünsche mir mehr Menschen wie dich—mutig und präsent./g' src/data/translations-large/de.json
sed -i '' 's/Я хочу more people like ты—intentional and present\./Ich wünsche mir mehr Menschen wie dich—absichtlich und präsent./g' src/data/translations-large/de.json
sed -i '' 's/Я хочу more people like ты—reliable and present\./Ich wünsche mir mehr Menschen wie dich—zuverlässig und präsent./g' src/data/translations-large/de.json

# Common patterns for German
sed -i '' 's/Я own my tone\. i'"'"'ll do better\./Ich übernehme die Verantwortung für meinen Ton. Ich werde es besser machen./g' src/data/translations-large/de.json
sed -i '' 's/Я feel something special here\. do ты feel it too?/Ich spüre hier etwas Besonderes. Spürst du es auch?/g' src/data/translations-large/de.json
sed -i '' 's/Я appreciate the way ты listen—fully and warmly\./Ich schätze die Art, wie du zuhörst—vollständig und warmherzig./g' src/data/translations-large/de.json
sed -i '' 's/Я notice твой effort—even the quiet kind\. thank ты\./Ich bemerke deine Anstrengung—auch die stille Art. Danke dir./g' src/data/translations-large/de.json
sed -i '' 's/Я хочу ты to know i won'"'"'t take ты for granted\./Ich möchte, dass du weißt, dass ich dich nicht als selbstverständlich betrachten werde./g' src/data/translations-large/de.json
sed -i '' 's/Я miss ты gently today—like a soft background song\./Ich vermisse dich heute sanft—wie ein leises Hintergrundlied./g' src/data/translations-large/de.json
sed -i '' 's/Я хочу the in‑person version of that photo\./Ich möchte die persönliche Version dieses Fotos./g' src/data/translations-large/de.json
sed -i '' 's/Я хочу the in‑person version of that selfie\./Ich möchte die persönliche Version dieses Selfies./g' src/data/translations-large/de.json
sed -i '' 's/Я хочу the in‑person version of that portrait\./Ich möchte die persönliche Version dieses Porträts./g' src/data/translations-large/de.json
sed -i '' 's/Я хочу the in‑person version of that story\./Ich möchte die persönliche Version dieser Geschichte./g' src/data/translations-large/de.json
sed -i '' 's/Я хочу the in‑person version of that post\./Ich möchte die persönliche Version dieses Posts./g' src/data/translations-large/de.json
sed -i '' 's/Я хочу the in‑person version of that reel\./Ich möchte die persönliche Version dieses Reels./g' src/data/translations-large/de.json
sed -i '' 's/Я хочу the in‑person version of that shot\./Ich möchte die persönliche Version dieses Shots./g' src/data/translations-large/de.json
sed -i '' 's/Я хочу the in‑person version of that mirror pic\./Ich möchte die persönliche Version dieses Spiegelbilds./g' src/data/translations-large/de.json
sed -i '' 's/Я хочу the in‑person version of that candid\./Ich möchte die persönliche Version dieses spontanen Fotos./g' src/data/translations-large/de.json
sed -i '' 's/Я challenge ты to pick our date theme—no backing out\./Ich fordere dich heraus, unser Date-Thema zu wählen—kein Rückzieher./g' src/data/translations-large/de.json
sed -i '' 's/Я не want an unfinished story\. meet and see?/Ich möchte keine unvollendete Geschichte. Treffen und sehen?/g' src/data/translations-large/de.json

echo "German patterns fixed."

echo "All mixed Russian-English pattern fixes completed for German!"