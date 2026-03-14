import type {
  CSSProperties,
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
} from 'react';
import { FiCheck, FiPlay, FiRotateCcw, FiSquare, FiStar } from 'react-icons/fi';
import type { FlashcardStatus, Word } from '../../../types';
import { PART_OF_SPEECH_LABEL } from '../constants';
import { useWordPronunciation } from '../hooks/useWordPronunciation';
import { highlightWordInExample } from '../utils/highlightWordInExample';

interface FlashcardDeckProps {
  word: Word;
  currentStatus?: FlashcardStatus;
  isFavorite: boolean;
  isFlipped: boolean;
  cardStyle: CSSProperties;
  onPointerDown: (event: ReactPointerEvent<HTMLDivElement>) => void;
  onPointerMove: (event: ReactPointerEvent<HTMLDivElement>) => void;
  onPointerUp: (event: ReactPointerEvent<HTMLDivElement>) => void;
  onPointerCancel: () => void;
  onToggleFlip: () => void;
}

const FlashcardDeck = ({
  word,
  currentStatus,
  isFavorite,
  isFlipped,
  cardStyle,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
  onToggleFlip,
}: FlashcardDeckProps) => {
  const StatusIcon = currentStatus === 'learned' ? FiCheck : currentStatus === 'review' ? FiRotateCcw : null;
  const { isSpeaking, isSupported, togglePronunciation } = useWordPronunciation(word.text);

  const handlePronouncePointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    event.stopPropagation();
  };

  const handlePronounceClick = (event: ReactMouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    togglePronunciation();
  };

  return (
    <div className="card-area">
      <div
        className={`card-container ${isFlipped ? 'flipped' : ''}`}
        style={cardStyle}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
      >
        <div className={`card-inner ${isFlipped ? 'flipped' : ''}`}>
          <div className="card-front" onDoubleClick={onToggleFlip}>
            <span className={`pos-badge ${word.partOfSpeech}`}>{PART_OF_SPEECH_LABEL[word.partOfSpeech]}</span>
            {currentStatus && StatusIcon && (
              <div className={`card-status-badge ${currentStatus}`}>
                <StatusIcon aria-hidden="true" />
              </div>
            )}
            {isFavorite && (
              <div className="card-favorite-badge" aria-label="Marked as favorite">
                <FiStar aria-hidden="true" />
              </div>
            )}
            <h2>{word.text}</h2>
            <p className="pronunciation">{word.pronunciation}</p>
            <button
              type="button"
              className={`card-pronounce-btn ${isSpeaking ? 'speaking' : ''}`}
              onPointerDown={handlePronouncePointerDown}
              onDoubleClick={(event) => event.stopPropagation()}
              onClick={handlePronounceClick}
              aria-label={isSpeaking ? 'Stop pronunciation' : 'Play pronunciation'}
              title={isSupported ? 'Play pronunciation' : 'Pronunciation is not supported on this device'}
              disabled={!isSupported}
            >
              {isSpeaking ? <FiSquare aria-hidden="true" /> : <FiPlay aria-hidden="true" />}
            </button>
            <span className="hint">Tap to flip • Swipe to act</span>
          </div>

          <div className="card-back" onDoubleClick={onToggleFlip}>
            <h2>{word.meaning}</h2>
            {word.meaningNote && <p className="meaning-note">[{word.meaningNote}]</p>}
            <p className="example">"{highlightWordInExample(word.example, word.text)}"</p>
            <button
              type="button"
              className={`card-pronounce-btn ${isSpeaking ? 'speaking' : ''}`}
              onPointerDown={handlePronouncePointerDown}
              onDoubleClick={(event) => event.stopPropagation()}
              onClick={handlePronounceClick}
              aria-label={isSpeaking ? 'Stop pronunciation' : 'Play pronunciation'}
              title={isSupported ? 'Play pronunciation' : 'Pronunciation is not supported on this device'}
              disabled={!isSupported}
            >
              {isSpeaking ? <FiSquare aria-hidden="true" /> : <FiPlay aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardDeck;
