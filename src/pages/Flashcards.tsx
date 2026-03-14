import { useEffect, useMemo, useRef } from 'react';
import wordsData from '../data/words.json';
import type { Word } from '../types';
import FlashcardActions from '../features/flashcards/components/FlashcardActions';
import FlashcardDeck from '../features/flashcards/components/FlashcardDeck';
import FlashcardsHeader from '../features/flashcards/components/FlashcardsHeader';
import SwipeIndicators from '../features/flashcards/components/SwipeIndicators';
import { useFlashcardSwipe } from '../features/flashcards/hooks/useFlashcardSwipe';
import { useSwipeSounds } from '../features/flashcards/hooks/useSwipeSounds';
import { useProgress } from '../context/useProgress';
import { useTheme } from '../context/useTheme';
import './Flashcards.css';

const Flashcards = () => {
  const words = wordsData.words as Word[];
  const { progress, setCardFavorite, setCardStatus, trackCardExposure } = useProgress();
  const { soundEnabled } = useTheme();
  const { playSwipeSound } = useSwipeSounds(soundEnabled);

  const initialStatuses = useMemo(() => {
    return Object.entries(progress.items).reduce<Record<string, 'learned' | 'review'>>((accumulator, [cardId, item]) => {
      if (item.status) {
        accumulator[cardId] = item.status;
      }
      return accumulator;
    }, {});
  }, [progress.items]);

  const initialFavorites = useMemo(() => {
    return Object.entries(progress.items).reduce<Record<string, boolean>>((accumulator, [cardId, item]) => {
      if (item.isFavorite) {
        accumulator[cardId] = true;
      }
      return accumulator;
    }, {});
  }, [progress.items]);

  const {
    cardStyle,
    currentStatus,
    isCurrentFavorite,
    currentIndex,
    currentWord,
    dragDirection,
    swipeFeedbackDirection,
    swipeFeedbackStrength,
    handleSwipe,
    isFlipped,
    onPointerCancel,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    setIsFlipped,
  } = useFlashcardSwipe(words, {
    initialStatuses,
    initialFavorites,
    onStatusChange: setCardStatus,
    onFavoriteChange: setCardFavorite,
    onAction: playSwipeSound,
  });

  const lastTrackedCardIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!currentWord) {
      return;
    }

    if (lastTrackedCardIdRef.current === currentWord.id) {
      return;
    }

    trackCardExposure(currentWord.id);
    lastTrackedCardIdRef.current = currentWord.id;
  }, [currentWord, trackCardExposure]);

  if (words.length === 0 || !currentWord) {
    return (
      <div className="flashcards">
        <div className="flashcards-empty">No flashcards found.</div>
      </div>
    );
  }

  return (
    <div className="flashcards">
      <FlashcardsHeader currentIndex={currentIndex} total={words.length} />
      <SwipeIndicators dragDirection={dragDirection} />

      <FlashcardDeck
        word={currentWord}
        currentStatus={currentStatus}
        isFavorite={isCurrentFavorite}
        isFlipped={isFlipped}
        cardStyle={cardStyle}
        swipeFeedbackDirection={swipeFeedbackDirection}
        swipeFeedbackStrength={swipeFeedbackStrength}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        onToggleFlip={() => setIsFlipped((previous) => !previous)}
      />

      <FlashcardActions
        isFlipped={isFlipped}
        onSwipe={handleSwipe}
        onToggleFlip={() => setIsFlipped((previous) => !previous)}
      />
    </div>
  );
};

export default Flashcards;
