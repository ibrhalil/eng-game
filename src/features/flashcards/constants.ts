import type { CSSProperties } from 'react';
import { FiCheck, FiRotateCcw, FiStar } from 'react-icons/fi';
import type { Word } from '../../types';
import type { SwipeDirection } from './types';

export const DEAD_ZONE = 12;
export const SWIPE_THRESHOLD = 72;
export const INDICATOR_THRESHOLD = 36;
export const SWIPE_RELEASE_DELAY_MS = 70;
export const SWIPE_EXIT_ANIMATION_MS = 260;

export const DRAG_BORDER_STYLE_BY_DIRECTION: Record<SwipeDirection, CSSProperties> = {
  right: { borderColor: 'rgba(16, 185, 129, 0.6)', borderWidth: '3px' },
  left: { borderColor: 'rgba(245, 158, 11, 0.6)', borderWidth: '3px' },
  up: { borderColor: 'rgba(59,130, 246, 0.6)', borderWidth: '3px' },
  down: { borderColor: 'rgba(239, 68, 68, 0.6)', borderWidth: '3px' },
};

export const PART_OF_SPEECH_LABEL: Record<Word['partOfSpeech'], string> = {
  noun: 'Noun',
  verb: 'Verb',
  adjective: 'Adjective',
  adverb: 'Adverb',
  numeral: 'Numeral',
  phrase: 'Phrase',
};

export const SWIPE_ACTIONS = [
  { direction: 'left' as const, label: 'Review', icon: FiRotateCcw },
  { direction: 'up' as const, label: 'Favorite', icon: FiStar },
  { direction: 'right' as const, label: 'Learned', icon: FiCheck },
];
