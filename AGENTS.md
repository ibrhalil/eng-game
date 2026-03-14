# English Learning Platform - AI Agent Documentation

## Project Status: IN PROGRESS

---

## Project Overview

**Project Name:** Eng-Game  
**Type:** Web Application (SPA)  
**Purpose:** English learning platform with flashcards, quizzes, listening exercises, and speaking phrases

### Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.x | UI Framework |
| TypeScript | 5.x | Type Safety |
| Vite | 6.x | Build Tool |
| React Router | 6.x | Routing |

---

## ✅ Completed Tasks

- [x] Initialize Vite + React + TypeScript project
- [x] Install dependencies (react-router-dom)
- [x] Create project folder structure
- [x] Setup routing with React Router
- [x] Create Home page
- [x] Create Flashcards page with card flip functionality
- [x] Create Quiz page with multiple choice questions
- [x] Create Listening page with audio placeholders
- [x] Create Speaking Phrases page with categories
- [x] Create dummy JSON data files
- [x] Setup global styles (Modern Minimalist design)
- [x] Create reusable UI components (Header, Settings)
- [x] Implement Dark Mode with toggle
- [x] Implement Font selection (system, serif, mono)
- [x] Implement Font Size selection (small, medium, large)
- [x] Add Mobile Responsive design
- [x] Add flashcard pronunciation button (Web Speech API)
- [x] Add local guest session with auto-generated username
- [x] Add local progress tracking context (quiz + flashcards)
- [x] Upgrade flashcards with Tinder-like swipe animation and action overlay
- [x] Add per-action swipe sound effects with settings toggle

---

## ⏳ Pending Tasks

- [ ] Add backend integration
- [ ] Add actual audio files
- [ ] Add user authentication (optional)

---

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Header.tsx       # Navigation header with theme toggle
│   └── Settings.tsx     # Settings modal (font, fontSize, theme)
├── pages/               # Page components
│   ├── Home.tsx         # Landing page
│   ├── Flashcards.tsx   # Flashcard learning
│   ├── Quiz.tsx         # Quiz system
│   ├── Listening.tsx    # Listening exercises
│   └── Phrases.tsx      # Speaking phrases
├── data/                # Dummy JSON data
│   ├── words.json       # Flashcard words
│   ├── quizzes.json     # Quiz questions
│   ├── listening.json   # Listening exercises
│   └── phrases.json     # Speaking phrases
├── context/             # React Context
│   ├── ThemeContext.tsx    # Theme, font, fontSize management
│   ├── GuestContext.tsx    # Local guest session management
│   ├── ProgressContext.tsx # User progress management
│   ├── useTheme.ts
│   ├── useGuest.ts
│   └── useProgress.ts
├── types/               # TypeScript interfaces
│   └── index.ts
├── App.tsx              # Main app component
├── App.css              # Global styles
└── index.css            # CSS variables & base styles
```

---

## 📦 Settings System

### ThemeContext (`src/context/ThemeContext.tsx`)

Manages:
- **theme**: 'light' | 'dark'
- **font**: 'system' | 'serif' | 'mono'
- **fontSize**: 'small' (14px) | 'medium' (16px) | 'large' (18px)
- **soundEnabled**: flashcard swipe sound effects on/off

All settings persisted to localStorage.

---

## 👤 Guest Session & Progress

### GuestContext (`src/context/GuestContext.tsx`)
Manages:
- **guestUser.id**: local guest identity (UUID/random)
- **guestUser.displayName**: auto name (`Misafir-XXXX`)
- **guestUser.createdAt / lastActiveAt**

Storage:
- `guest.info`

### ProgressContext (`src/context/ProgressContext.tsx`)
Manages:
- **flashcard progress** (user + card based)
- **status**: `learned | review` (favorite'dan bagimsiz)
- **favorite state**: `isFavorite`
- **exposure count**: `exposureCount` (kart kullaniciya kac kez gosterildi)

Storage:
- `progress.flashcard`
- Progress data includes `userId` to stay compatible with future backend sync flow.

---

## 📦 Data Schemas

### words.json
```json
{
  "words": [
    {
      "id": "string",
      "text": "string",
      "pronunciation": "string",
      "meaning": "string",
      "meaningNote": "string (optional)",
      "example": "string",
      "partOfSpeech": "noun | verb | adjective | adverb | numeral | phrase",
      "difficulty": "easy | medium | hard",
      "isActive": "boolean (optional)"
    }
  ]
}
```

### quizzes.json
```json
{
  "quizzes": [
    {
      "id": "string",
      "question": "string",
      "options": ["string", "string", "string", "string"],
      "correctAnswer": "number (0-3)",
      "explanation": "string"
    }
  ]
}
```

### listening.json
```json
{
  "exercises": [
    {
      "id": "string",
      "title": "string",
      "audioUrl": "string",
      "transcript": "string",
      "level": "beginner | intermediate | advanced"
    }
  ]
}
```

### phrases.json
```json
{
  "categories": [
    {
      "id": "string",
      "name": "string",
      "phrases": [
        {
          "id": "string",
          "english": "string",
          "turkish": "string",
          "pronunciation": "string"
        }
      ]
    }
  ]
}
```

---

## 🎨 CSS Variables

Located in `src/index.css`:

```css
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f5f7fa;
  --text-primary: #1a1a1a;
  --text-secondary: #555555;
  --border-color: #e0e0e0;
  --card-bg: #ffffff;
  --shadow: rgba(0, 0, 0, 0.1);
  --hover-bg: #f0f0f0;
  --accent: #0066cc;
  --accent-hover: #0052a3;
}

[data-theme="dark"] {
  --bg-primary: #0d1117;
  --bg-secondary: #161b22;
  --text-primary: #e6edf3;
  --text-secondary: #8b949e;
  --border-color: #30363d;
  --card-bg: #21262d;
  --shadow: rgba(0, 0, 0, 0.4);
  --hover-bg: #30363d;
  --accent: #58a6ff;
  --accent-hover: #79b8ff;
}
```

---

## 🔧 Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📝 Notes for Future Agents

- This project uses **dummy JSON data** - no backend integration yet
- Design style: **Modern Minimalist** - clean, simple, user-friendly
- State management: React Context for theme/font/fontSize
- All components are TypeScript with proper interfaces
- Use functional components with hooks
- Settings are persisted to localStorage
- When adding new features, update both AGENTS.md and README.md
