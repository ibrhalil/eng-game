import wordsData from '../data/words.json';
import type { Word } from '../types';
import FlashcardActions from '../features/flashcards/components/FlashcardActions';
import FlashcardDeck from '../features/flashcards/components/FlashcardDeck';
import FlashcardsHeader from '../features/flashcards/components/FlashcardsHeader';
import ProgressDots from '../features/flashcards/components/ProgressDots';
import SwipeIndicators from '../features/flashcards/components/SwipeIndicators';
import { useFlashcardSwipe } from '../features/flashcards/hooks/useFlashcardSwipe';
import './Flashcards.css';

const Flashcards = () => {
  const words = wordsData.words as Word[];

  const {
    actions,
    cardStyle,
    currentAction,
    currentIndex,
    currentWord,
    dragDirection,
    handleSwipe,
    isFlipped,
    onPointerCancel,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    setIsFlipped,
  } = useFlashcardSwipe(words);

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
        currentAction={currentAction}
        isFlipped={isFlipped}
        cardStyle={cardStyle}
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

      <ProgressDots
        total={words.length}
        currentIndex={currentIndex}
        isDone={(index) => Boolean(actions[words[index].id])}
      />
    </div>
  );
};

export default Flashcards;
