#!/bin/bash

# Fix Korean mixed-language "Ты feel genuinely" patterns - comprehensive version
echo "Fixing Korean mixed-language patterns..."

# Fix all "Ты feel genuinely [adjective]" patterns with Korean translations
sed -i '' 's/Ты feel genuinely genuine—it shows in тыr message\./당신은 진심으로 진실해 보입니다—메시지에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely genuine—it shows in that photo\./당신은 진심으로 진실해 보입니다—그 사진에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely genuine—it shows in тыr playlist\./당신은 진심으로 진실해 보입니다—플레이리스트에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely genuine—it shows in тыr caption\./당신은 진심으로 진실해 보입니다—캡션에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely genuine—it shows in тыr comment\./당신은 진심으로 진실해 보입니다—댓글에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely genuine—it shows in тыr story\./당신은 진심으로 진실해 보입니다—스토리에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely genuine—it shows in тыr post\./당신은 진심으로 진실해 보입니다—게시물에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely genuine—it shows in тыr outfit\./당신은 진심으로 진실해 보입니다—옷차림에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely genuine—it shows in that idea\./당신은 진심으로 진실해 보입니다—그 아이디어에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely genuine—it shows in that joke\./당신은 진심으로 진실해 보입니다—그 농담에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely genuine—it shows in тыr explanation\./당신은 진심으로 진실해 보입니다—설명에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely genuine—it shows in тыr review\./당신은 진심으로 진실해 보입니다—리뷰에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely genuine—it shows in тыr recipe\./당신은 진심으로 진실해 보입니다—레시피에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely genuine—it shows in that video\./당신은 진심으로 진실해 보입니다—그 비디오에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely genuine—it shows in тыr travel shot\./당신은 진심으로 진실해 보입니다—여행 사진에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely genuine—it shows in тыr sunset photo\./당신은 진심으로 진실해 보입니다—석양 사진에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely genuine—it shows in тыr book rec\./당신은 진심으로 진실해 보입니다—책 추천에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely genuine—it shows in that quote\./당신은 진심으로 진실해 보입니다—그 인용구에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely genuine—it shows in тыr sketch\./당신은 진심으로 진실해 보입니다—스케치에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely genuine—it shows in тыr dance clip\./당신은 진심으로 진실해 보입니다—댄스 클립에서 그것이 드러납니다./g' src/data/translations-large/ko.json

# Fix "funny" patterns
sed -i '' 's/Ты feel genuinely funny—it shows in тыr message\./당신은 진심으로 재미있어 보입니다—메시지에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely funny—it shows in that photo\./당신은 진심으로 재미있어 보입니다—그 사진에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely funny—it shows in тыr playlist\./당신은 진심으로 재미있어 보입니다—플레이리스트에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely funny—it shows in тыr caption\./당신은 진심으로 재미있어 보입니다—캡션에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely funny—it shows in тыr comment\./당신은 진심으로 재미있어 보입니다—댓글에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely funny—it shows in тыr story\./당신은 진심으로 재미있어 보입니다—스토리에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely funny—it shows in тыr post\./당신은 진심으로 재미있어 보입니다—게시물에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely funny—it shows in тыr outfit\./당신은 진심으로 재미있어 보입니다—옷차림에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely funny—it shows in that idea\./당신은 진심으로 재미있어 보입니다—그 아이디어에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely funny—it shows in that joke\./당신은 진심으로 재미있어 보입니다—그 농담에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely funny—it shows in тыr explanation\./당신은 진심으로 재미있어 보입니다—설명에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely funny—it shows in тыr review\./당신은 진심으로 재미있어 보입니다—리뷰에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely funny—it shows in тыr recipe\./당신은 진심으로 재미있어 보입니다—레시피에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely funny—it shows in that video\./당신은 진심으로 재미있어 보입니다—그 비디오에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely funny—it shows in тыr travel shot\./당신은 진심으로 재미있어 보입니다—여행 사진에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely funny—it shows in тыr sunset photo\./당신은 진심으로 재미있어 보입니다—석양 사진에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely funny—it shows in тыr book rec\./당신은 진심으로 재미있어 보입니다—책 추천에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely funny—it shows in that quote\./당신은 진심으로 재미있어 보입니다—그 인용구에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely funny—it shows in тыr sketch\./당신은 진심으로 재미있어 보입니다—스케치에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely funny—it shows in тыr dance clip\./당신은 진심으로 재미있어 보입니다—댄스 클립에서 그것이 드러납니다./g' src/data/translations-large/ko.json

# Fix "smart" patterns
sed -i '' 's/Ты feel genuinely smart—it shows in тыr message\./당신은 진심으로 똑똑해 보입니다—메시지에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely smart—it shows in that photo\./당신은 진심으로 똑똑해 보입니다—그 사진에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely smart—it shows in тыr playlist\./당신은 진심으로 똑똑해 보입니다—플레이리스트에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely smart—it shows in тыr caption\./당신은 진심으로 똑똑해 보입니다—캡션에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely smart—it shows in тыr comment\./당신은 진심으로 똑똑해 보입니다—댓글에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely smart—it shows in тыr story\./당신은 진심으로 똑똑해 보입니다—스토리에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely smart—it shows in тыr post\./당신은 진심으로 똑똑해 보입니다—게시물에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely smart—it shows in тыr outfit\./당신은 진심으로 똑똑해 보입니다—옷차림에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely smart—it shows in that idea\./당신은 진심으로 똑똑해 보입니다—그 아이디어에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely smart—it shows in that joke\./당신은 진심으로 똑똑해 보입니다—그 농담에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely smart—it shows in тыr explanation\./당신은 진심으로 똑똑해 보입니다—설명에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely smart—it shows in тыr review\./당신은 진심으로 똑똑해 보입니다—리뷰에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely smart—it shows in тыr recipe\./당신은 진심으로 똑똑해 보입니다—레시피에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely smart—it shows in that video\./당신은 진심으로 똑똑해 보입니다—그 비디오에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely smart—it shows in тыr travel shot\./당신은 진심으로 똑똑해 보입니다—여행 사진에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely smart—it shows in тыr sunset photo\./당신은 진심으로 똑똑해 보입니다—석양 사진에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely smart—it shows in тыr book rec\./당신은 진심으로 똑똑해 보입니다—책 추천에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely smart—it shows in that quote\./당신은 진심으로 똑똑해 보입니다—그 인용구에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely smart—it shows in тыr sketch\./당신은 진심으로 똑똑해 보입니다—스케치에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely smart—it shows in тыr dance clip\./당신은 진심으로 똑똑해 보입니다—댄스 클립에서 그것이 드러납니다./g' src/data/translations-large/ko.json

# Fix "curious" patterns
sed -i '' 's/Ты feel genuinely curious—it shows in тыr message\./당신은 진심으로 호기심이 많아 보입니다—메시지에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely curious—it shows in that photo\./당신은 진심으로 호기심이 많아 보입니다—그 사진에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely curious—it shows in тыr playlist\./당신은 진심으로 호기심이 많아 보입니다—플레이리스트에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely curious—it shows in тыr caption\./당신은 진심으로 호기심이 많아 보입니다—캡션에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely curious—it shows in тыr comment\./당신은 진심으로 호기심이 많아 보입니다—댓글에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely curious—it shows in тыr story\./당신은 진심으로 호기심이 많아 보입니다—스토리에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely curious—it shows in тыr post\./당신은 진심으로 호기심이 많아 보입니다—게시물에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely curious—it shows in тыr outfit\./당신은 진심으로 호기심이 많아 보입니다—옷차림에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely curious—it shows in that idea\./당신은 진심으로 호기심이 많아 보입니다—그 아이디어에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely curious—it shows in that joke\./당신은 진심으로 호기심이 많아 보입니다—그 농담에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely curious—it shows in тыr explanation\./당신은 진심으로 호기심이 많아 보입니다—설명에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely curious—it shows in тыr review\./당신은 진심으로 호기심이 많아 보입니다—리뷰에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely curious—it shows in тыr recipe\./당신은 진심으로 호기심이 많아 보입니다—레시피에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely curious—it shows in that video\./당신은 진심으로 호기심이 많아 보입니다—그 비디오에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely curious—it shows in тыr travel shot\./당신은 진심으로 호기심이 많아 보입니다—여행 사진에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely curious—it shows in тыr sunset photo\./당신은 진심으로 호기심이 많아 보입니다—석양 사진에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely curious—it shows in тыr book rec\./당신은 진심으로 호기심이 많아 보입니다—책 추천에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely curious—it shows in that quote\./당신은 진심으로 호기심이 많아 보입니다—그 인용구에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely curious—it shows in тыr sketch\./당신은 진심으로 호기심이 많아 보입니다—스케치에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely curious—it shows in тыr dance clip\./당신은 진심으로 호기심이 많아 보입니다—댄스 클립에서 그것이 드러납니다./g' src/data/translations-large/ko.json

# Fix "grounded" patterns
sed -i '' 's/Ты feel genuinely grounded—it shows in тыr message\./당신은 진심으로 차분해 보입니다—메시지에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely grounded—it shows in that photo\./당신은 진심으로 차분해 보입니다—그 사진에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely grounded—it shows in тыr playlist\./당신은 진심으로 차분해 보입니다—플레이리스트에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely grounded—it shows in тыr caption\./당신은 진심으로 차분해 보입니다—캡션에서 그것이 드러납니다./g' src/data/translations-large/ko.json
sed -i '' 's/Ты feel genuinely grounded—it shows in тыr comment\./당신은 진심으로 차분해 보입니다—댓글에서 그것이 드러납니다./g' src/data/translations-large/ko.json

echo "Korean patterns fixed. Checking for remaining patterns..."
grep -c "Ты feel genuinely" src/data/translations-large/ko.json || echo "No remaining patterns found"