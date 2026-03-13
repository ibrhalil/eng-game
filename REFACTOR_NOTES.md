# Refactor Notes

## Goals
- Improve readability by splitting vertically large components.
- Reduce style collision risk from generic global class names.
- Keep behavior stable while making lint/build clean.

## Completed
- Refactored `src/pages/Flashcards.tsx` into a lightweight container.
- Added flashcards feature structure:
  - `src/features/flashcards/components/*`
  - `src/features/flashcards/hooks/useFlashcardSwipe.ts`
  - `src/features/flashcards/constants.ts`
  - `src/features/flashcards/types.ts`
  - `src/features/flashcards/utils/highlightWordInExample.tsx`
- Fixed hook/lint issues in header and theme flow.
- Split theme context responsibilities:
  - `src/context/ThemeContext.tsx` (provider)
  - `src/context/useTheme.ts` (consumer hook)
  - `src/context/themeConfig.ts` (types/constants/validators)
  - `src/context/themeStore.ts` (context object)
- Reduced global style collisions by renaming generic classes:
  - Header: `.header` -> `.app-header`
  - Flashcards: `.header` -> `.flashcards-header`
  - Quiz: `.header` -> `.quiz-header`
  - Home/Listening/Phrases subtitles -> page-specific classes
  - Phrases pronunciation -> `.phrase-pronunciation`
- Removed duplicate global resets from `src/App.css`.
- Replaced emoji/symbol UI icons with `react-icons` and added theme-aware icon switches:
  - Header/settings/menu controls
  - Home feature cards
  - Listening play/back controls
  - Phrases audio controls
  - Quiz result/next indicators
  - Flashcards action, indicator, and badge icons

## Validation
- `npm run lint` passes.
- `npm run build` passes.

## Next Suggested Refactors
- Move complex gesture logic from `useFlashcardSwipe` into smaller hooks/utilities (`pointer`, `keyboard`, `animation`).
- Apply similar component extraction for:
  - `src/pages/Quiz.tsx`
  - `src/pages/Listening.tsx`
  - `src/pages/Phrases.tsx`
- Introduce shared UI primitives for repeated patterns (page title, section card, status badge).
- Consider CSS Modules or stricter naming conventions for all page-level styles.
