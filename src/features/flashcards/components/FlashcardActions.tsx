import type { SwipeDirection } from '../types';
import { FiCheck, FiRefreshCw, FiRotateCcw } from 'react-icons/fi';

interface FlashcardActionsProps {
  isFlipped: boolean;
  onSwipe: (direction: SwipeDirection) => void;
  onToggleFlip: () => void;
}

const FlashcardActions = ({ isFlipped, onSwipe, onToggleFlip }: FlashcardActionsProps) => {
  return (
    <div className="action-buttons">
      <button className="action-btn review" onClick={() => onSwipe('left')} aria-label="Mark for review">
        <FiRotateCcw aria-hidden="true" />
      </button>
      <button className="action-btn flip" onClick={onToggleFlip} aria-label={isFlipped ? 'Show front' : 'Show back'}>
        <FiRefreshCw aria-hidden="true" />
      </button>
      <button className="action-btn learned" onClick={() => onSwipe('right')} aria-label="Mark as learned">
        <FiCheck aria-hidden="true" />
      </button>
    </div>
  );
};

export default FlashcardActions;
