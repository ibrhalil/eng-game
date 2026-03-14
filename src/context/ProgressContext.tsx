import { useCallback, useEffect, useState, type ReactNode } from 'react';
import type { FlashcardProgress, FlashcardProgressItem, FlashcardStatus } from '../types';
import { useGuest } from './useGuest';
import {
  createInitialProgress,
  createItemIfMissing,
  FLASHCARD_PROGRESS_STORAGE_KEY,
  loadProgress,
} from './progressConfig';
import { ProgressContext } from './progressStore';

const withUpdatedAt = (item: FlashcardProgressItem, now: string): FlashcardProgressItem => ({
  ...item,
  updatedAt: now,
});

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const { guestUser, touchGuestActivity } = useGuest();
  const [progress, setProgress] = useState<FlashcardProgress>(() => loadProgress(guestUser.id));

  useEffect(() => {
    setProgress(loadProgress(guestUser.id));
  }, [guestUser.id]);

  useEffect(() => {
    localStorage.setItem(FLASHCARD_PROGRESS_STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const setCardStatus = useCallback(
    (cardId: string, status: FlashcardStatus) => {
      const now = new Date().toISOString();

      setProgress((previous) => {
        if (previous.userId !== guestUser.id) {
          return createInitialProgress(guestUser.id);
        }

        const previousItem = createItemIfMissing(previous.items, cardId);
        const nextItem = withUpdatedAt(
          {
            ...previousItem,
            status,
            statusUpdatedAt: now,
          },
          now
        );

        return {
          ...previous,
          items: {
            ...previous.items,
            [cardId]: nextItem,
          },
          updatedAt: now,
        };
      });

      touchGuestActivity();
    },
    [guestUser.id, touchGuestActivity]
  );

  const setCardFavorite = useCallback(
    (cardId: string, isFavorite: boolean) => {
      const now = new Date().toISOString();

      setProgress((previous) => {
        if (previous.userId !== guestUser.id) {
          return createInitialProgress(guestUser.id);
        }

        const previousItem = createItemIfMissing(previous.items, cardId);
        const nextItem = withUpdatedAt(
          {
            ...previousItem,
            isFavorite,
            favoriteUpdatedAt: now,
          },
          now
        );

        return {
          ...previous,
          items: {
            ...previous.items,
            [cardId]: nextItem,
          },
          updatedAt: now,
        };
      });

      touchGuestActivity();
    },
    [guestUser.id, touchGuestActivity]
  );

  const trackCardExposure = useCallback(
    (cardId: string) => {
      const now = new Date().toISOString();

      setProgress((previous) => {
        if (previous.userId !== guestUser.id) {
          return createInitialProgress(guestUser.id);
        }

        const previousItem = createItemIfMissing(previous.items, cardId);
        const nextItem = withUpdatedAt(
          {
            ...previousItem,
            exposureCount: previousItem.exposureCount + 1,
            lastSeenAt: now,
          },
          now
        );

        return {
          ...previous,
          items: {
            ...previous.items,
            [cardId]: nextItem,
          },
          updatedAt: now,
        };
      });

      touchGuestActivity();
    },
    [guestUser.id, touchGuestActivity]
  );

  const getCardProgress = useCallback(
    (cardId: string) => {
      return progress.items[cardId] ?? null;
    },
    [progress.items]
  );

  return (
    <ProgressContext.Provider
      value={{
        progress,
        setCardStatus,
        setCardFavorite,
        trackCardExposure,
        getCardProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};
