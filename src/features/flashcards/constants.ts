import type { CSSProperties } from 'react';
import type { IconType } from 'react-icons';
import { FiCheck, FiRotateCcw, FiStar } from 'react-icons/fi';
import type { Word } from '../../types';
import type { SwipeDirection, WordAction } from './types';

export const DEAD_ZONE = 12;
export const SWIPE_THRESHOLD = 60;
export const INDICATOR_THRESHOLD = 30;
export const SWIPE_RELEASE_DELAY_MS = 300;
export const SWIPE_EXIT_ANIMATION_MS = 450;

export const ACTION_BY_DIRECTION: Record<'left' | 'right' | 'up', WordAction> = {
  left: 'review',
  right: 'learned',
  up: 'favorite',
};

export const DRAG_BORDER_STYLE_BY_DIRECTION: Record<SwipeDirection, CSSProperties> = {
  right: { borderColor: 'rgba(16, 185, 129, 0.6)', borderWidth: '3px' },
  left: { borderColor: 'rgba(245, 158, 11, 0.6)', borderWidth: '3px' },
  up: { borderColor: 'rgba(59,130, 246, 0.6)', borderWidth: '3px' },
  down: { borderColor: 'rgba(239, 68, 68, 0.6)', borderWidth: '3px' },
};

export const BADGE_COLOR_BY_ACTION: Record<WordAction, string> = {
  learned: '#10b981',
  review: '#f59e0b',
  favorite: '#3b82f6',
};

export const BADGE_ICON_BY_ACTION: Record<WordAction, IconType> = {
  learned: FiCheck,
  review: FiRotateCcw,
  favorite: FiStar,
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
