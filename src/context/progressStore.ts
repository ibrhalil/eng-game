import { createContext } from 'react';
import type { FlashcardProgress, FlashcardProgressItem, FlashcardStatus } from '../types';

export interface ProgressContextType {
  progress: FlashcardProgress;
  setCardStatus: (cardId: string, status: FlashcardStatus) => void;
  setCardFavorite: (cardId: string, isFavorite: boolean) => void;
  trackCardExposure: (cardId: string) => void;
  getCardProgress: (cardId: string) => FlashcardProgressItem | null;
}

export const ProgressContext = createContext<ProgressContextType | undefined>(undefined);
