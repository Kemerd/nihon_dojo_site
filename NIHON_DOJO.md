# 🇯🇵 NihonDojo

**NihonDojo** is a comprehensive Japanese learning app built with **Flutter** and **Dart**, featuring AI-powered content generation, complete formality switching, FSRS-based spaced repetition, and immersive audio-visual learning. It offers a modern approach to Japanese language acquisition with structured lessons, intelligent flashcards, and contextual learning.

---

## 🧠 Key Features

### ✅ Core 6000 Vocabulary Module
- Based on the Core 6000 vocabulary frequency list with AI-enhanced learning
- **Dynamic AI sentence generation** using OpenAI/LLM with context-aware prompts
- New words introduced progressively using **FSRS spaced repetition algorithm**
- **Formality-aware sentences** - every example includes casual, standard, and formal versions
- Intelligent vocabulary building that uses only previously learned words in examples
- Local SQLite database with offline-first design for seamless performance

### ✅ Real-Time Formality Switching
- Every sentence supports instant formality level switching:
  - **ため口 (Tameguchi)** – casual/informal speech for close friends
  - **普通形 (Futsū)** – standard/plain form with neutral politeness  
  - **敬語 (Keigo)** – formal/respectful language with proper honorifics
- AI-powered natural tone adaptation that maintains exact meaning across formalities
- UI formality selector with persistent user preferences

### ✅ Comprehensive Grammar Learning
- **Structured grammar lessons** organized by difficulty (beginner → advanced)
- Multiple learning modes: **Guided Path** (progressive) and **Manual Selection**
- Grammar patterns integrated with vocabulary for contextual learning
- Example-driven explanations using familiar vocabulary
- Progress tracking with lesson completion states and spaced review

### ✅ Cultural Immersion Module  
- **Interactive cultural lessons** covering real Japanese social behaviors
- Topics include: politeness levels, etiquette nuances, honorifics, gendered speech
- Multiple-choice format with AI-generated content for variety
- **Guided cultural path** and manual browsing modes
- Cultural concepts tied to language patterns for deeper understanding

### ✅ Kana Mastery System
- **Dedicated kana learning minigame** with gamified practice
- **Complete audio pronunciation** library (70+ native recordings)
- Covers standard kana plus advanced combinations (きゃ, しゅ, etc.)
- Progress tracking and spaced repetition for kana recognition

### ✅ Premium Audio Experience
- **Native Japanese pronunciation** for all kana characters
- **Advanced audio engine** with haptic feedback integration  
- Sound effects for UI interactions (button presses, transitions, achievements)
- Configurable audio preferences and volume controls
- Offline audio playback with pre-cached assets

---

## 📲 Learning Modules

From the main interface, users can access:

- 📘 **Core 6000** – AI-powered vocabulary flashcards with contextual sentences
- 📙 **Grammar Points** – Structured grammar lessons with guided progression
- 🎎 **Cultural Points** – Interactive cultural insight lessons  
- 🈵 **Kana Practice** – Gamified hiragana/katakana learning with audio
- ⚙️ **Settings** – FSRS tuning, audio preferences, formality defaults

---

## 🔧 Technology Stack

| Feature                        | Implementation                         |
|-------------------------------|---------------------------------------|
| **Frontend Framework**        | Flutter (Dart) with Riverpod state management |
| **Spaced Repetition**         | [FSRS Algorithm](https://github.com/open-spaced-repetition/fsrs-rs-dart) with Japanese-optimized parameters |
| **AI Content Generation**     | OpenAI/LLM integration via Supabase Functions |
| **Backend & Authentication**  | Supabase (PostgreSQL, Auth, Edge Functions) |
| **Local Database**            | SQLite with Drift ORM for offline-first experience |
| **Audio Engine**              | SoLoud with haptic feedback integration |
| **UI Framework**              | Cupertino design with custom glassmorphism effects |
| **Formality Transformation**  | AI-powered prompt engineering with linguistic rules |
| **Text Processing**           | Custom furigana parsing and Japanese text analysis |

---

## 🎯 Advanced Features

### **FSRS Optimization**
- Customizable desired retention rates (80-95%)
- Japanese-optimized learning and relearning intervals
- Fuzzing and maximum interval controls
- Real-time algorithm parameter adjustment

### **Intelligent Content Generation**
- Context-aware sentence creation using learned vocabulary
- Grammar pattern recognition and integration
- Batch sentence generation for session preparation
- AI formality transformation maintaining semantic accuracy

### **Modern UI/UX**
- **Glassmorphism design** with frosted glass effects
- Smooth spring animations and micro-interactions
- **Apple Human Interface Guidelines** compliance
- Responsive design for mobile, tablet, and desktop
- Dark theme with carefully crafted visual hierarchy

### **Offline-First Architecture**
- Complete functionality without internet connection
- Local caching of AI-generated content
- Background sync when connection available
- Progressive loading and performance optimization

---

## 🚧 Future Enhancements

- ✍️ Handwriting recognition for kanji practice
- 📊 Advanced analytics dashboard with learning insights
- 🎌 Custom deck creation and Anki import
- 🗣️ Speech recognition for pronunciation practice
- 🌐 Community features and shared content
- 📱 Apple Watch companion app

---

## 📦 Development Setup

```bash
# Clone and setup
git clone <repository-url>
cd nihon_dojo

# Install dependencies
flutter pub get

# Generate database types (if using Supabase)
dart run tool/generators/generate_supabase_types.dart

# Run the app
flutter run

# For iOS/macOS development
cd ios && pod install
cd ../macos && pod install
```

### Environment Configuration
Create `.env` file with:
```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
OPENAI_API_KEY=your_openai_key
```

---

## 🛡️ License & Ethics

- **Vocabulary**: Built from public domain frequency data, not proprietary sources
- **Content**: All examples are AI-generated, ensuring original content
- **Audio**: Native recordings with proper licensing
- **Code**: Open development with respect for intellectual property
- **Privacy**: Local-first design minimizes data collection

---

**NihonDojo** - *Where traditional Japanese learning meets modern AI innovation* 🥋
