# CharmCraft - Relationship Advice App

Perfect words for every moment in your relationship. CharmCraft helps you find the right phrases for conversations, compliments, flirty messages, and romantic expressions.

## Features

- **20,000+ Phrases**: Optimized local database (5MB) of relationship advice phrases
- **4 Beautiful Themes**: Light, Dark, Solar, and Mono themes for personalized experience
- **10 Languages**: Full localization support (English, Russian, Spanish, German, French, Portuguese, Japanese, Chinese, Korean, Ukrainian)
- **Smart Filtering**: Filter by category, situation, tone, and search text
- **Favorites System**: Save your favorite phrases for quick access
- **Usage Tracking**: See your most-used phrases
- **Random Suggestions**: Get surprise phrase recommendations
- **Sound & Haptic Feedback**: Customizable audio and tactile feedback
- **Settings Screen**: Comprehensive settings with theme, language, sound, and haptic controls
- **Offline First**: All data stored locally, no internet required
- **Copy to Clipboard**: Easy sharing of phrases

## Categories

- **Conversation Starters**: Break the ice and start meaningful conversations
- **Compliments**: Make them feel special and appreciated
- **Flirty Messages**: Add some playful charm to your interactions
- **Romantic Expressions**: Deep, heartfelt messages for special moments
- **Supportive Messages**: Be there for them during tough times
- **Funny Messages**: Lighten the mood with humor
- **Good Morning/Night**: Start and end the day sweetly
- **Deep Conversations**: Meaningful phrases for deeper connections

## Situations

- First Message
- Early Dating
- Established Relationship
- Long Distance
- After Argument
- Special Occasion
- Daily Chat
- Missing Them

## Tones

- Sweet
- Playful
- Sincere
- Confident
- Gentle
- Passionate
- Humorous
- Caring

## Getting Started

### Prerequisites

- Node.js (>= 20)
- React Native development environment
- iOS Simulator or Android Emulator

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd CharmCraft
```

2. Install dependencies:

```bash
npm install
```

3. Generate the large phrase database:

```bash
node scripts/generatePhrases.js
```

4. Start the Metro bundler:

```bash
npm start
```

5. Run the app:

For iOS:

```bash
npm run ios
```

For Android:

```bash
npm run android
```

## Project Structure

```
src/
├── components/
│   ├── PhraseCard.tsx      # Individual phrase display component
│   └── FilterModal.tsx     # Filter selection modal
├── data/
│   ├── phrases.ts          # Type definitions and sample data
│   ├── extendedPhrases.ts  # Extended phrase collection
│   └── largePhraseDatabase.ts # Generated large database (200+ MB)
├── screens/
│   └── HomeScreen.tsx      # Main app screen
└── services/
    └── PhraseService.ts    # Data management and search logic

scripts/
└── generatePhrases.js      # Database generation script
```

## How It Works

1. **Local Storage**: All phrases are stored locally using AsyncStorage for offline access
2. **Smart Search**: Advanced filtering by multiple criteria simultaneously
3. **Template Generation**: The large database is generated using phrase templates with variable substitution
4. **Usage Analytics**: Track which phrases are used most frequently
5. **Favorites Management**: Personal collection of preferred phrases

## Database Generation

The app includes a script that generates 800,000+ unique phrases using:

- Template-based generation
- Word bank substitution
- Category-appropriate content
- Automatic tag generation

Run the generation script:

```bash
node scripts/generatePhrases.js
```

## Customization

### Adding New Categories

1. Update `PhraseCategory` enum in `src/data/phrases.ts`
2. Add templates in `scripts/generatePhrases.js`
3. Regenerate the database

### Adding New Phrase Templates

Edit the `phraseTemplates` object in `scripts/generatePhrases.js` and regenerate.

### Modifying Word Banks

Update the `wordBanks` object in `scripts/generatePhrases.js` for different vocabulary.

## Performance

- **Lazy Loading**: Phrases loaded on-demand
- **Efficient Search**: Optimized filtering algorithms
- **Memory Management**: Large database handled efficiently
- **Smooth UI**: Responsive interface with proper loading states

## Privacy

- **Fully Offline**: No data sent to external servers
- **Local Storage**: All preferences stored on device
- **No Tracking**: No analytics or user tracking

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue on the GitHub repository or contact the development team.

---

**CharmCraft** - Because the right words at the right time can make all the difference. ❤️
