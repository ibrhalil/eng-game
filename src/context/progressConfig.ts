import type { FlashcardProgress, FlashcardProgressItem, FlashcardStatus } from '../types';

export const FLASHCARD_PROGRESS_STORAGE_KEY = 'progress.flashcard';
const LEGACY_PROGRESS_STORAGE_KEY = 'eng-game.progress.v1';

interface LegacyProgress {
  userId: string;
  flashcards?: {
    actions?: Record<string, 'learned' | 'review' | 'favorite'>;
  };
}

const createEmptyItem = (cardId: string): FlashcardProgressItem => ({
  cardId,
  status: null,
  isFavorite: false,
  exposureCount: 0,
  lastSeenAt: null,
  statusUpdatedAt: null,
  favoriteUpdatedAt: null,
  updatedAt: new Date().toISOString(),
});

export const createInitialProgress = (userId: string): FlashcardProgress => ({
  version: 2,
  userId,
  items: {},
  updatedAt: new Date().toISOString(),
});

const isFlashcardStatus = (value: unknown): value is FlashcardStatus => value === 'review' || value === 'learned';

const isFlashcardProgressItem = (value: unknown): value is FlashcardProgressItem => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const maybe = value as Partial<FlashcardProgressItem>;
  return (
    typeof maybe.cardId === 'string' &&
    (maybe.status === null || isFlashcardStatus(maybe.status)) &&
    typeof maybe.isFavorite === 'boolean' &&
    typeof maybe.exposureCount === 'number' &&
    (typeof maybe.lastSeenAt === 'string' || maybe.lastSeenAt === null) &&
    (typeof maybe.statusUpdatedAt === 'string' || maybe.statusUpdatedAt === null) &&
    (typeof maybe.favoriteUpdatedAt === 'string' || maybe.favoriteUpdatedAt === null) &&
    typeof maybe.updatedAt === 'string'
  );
};

export const isFlashcardProgress = (value: unknown): value is FlashcardProgress => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const maybe = value as Partial<FlashcardProgress>;
  if (maybe.version !== 2 || typeof maybe.userId !== 'string' || typeof maybe.updatedAt !== 'string') {
    return false;
  }

  if (!maybe.items || typeof maybe.items !== 'object') {
    return false;
  }

  return Object.values(maybe.items).every(isFlashcardProgressItem);
};

const mapLegacyActionToItem = (cardId: string, action: 'learned' | 'review' | 'favorite'): FlashcardProgressItem => {
  const now = new Date().toISOString();

  if (action === 'favorite') {
    return {
      ...createEmptyItem(cardId),
      isFavorite: true,
      favoriteUpdatedAt: now,
      updatedAt: now,
    };
  }

  return {
    ...createEmptyItem(cardId),
    status: action,
    statusUpdatedAt: now,
    updatedAt: now,
  };
};

const parseLegacyProgress = (raw: string | null): LegacyProgress | null => {
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== 'object') {
      return null;
    }

    const legacy = parsed as LegacyProgress;
    if (typeof legacy.userId !== 'string') {
      return null;
    }

    return legacy;
  } catch {
    return null;
  }
};

export const loadProgress = (userId: string): FlashcardProgress => {
  const saved = localStorage.getItem(FLASHCARD_PROGRESS_STORAGE_KEY);

  if (saved) {
    try {
      const parsed = JSON.parse(saved) as unknown;

      if (isFlashcardProgress(parsed) && parsed.userId === userId) {
        return parsed;
      }
    } catch {
      return createInitialProgress(userId);
    }
  }

  const legacy = parseLegacyProgress(localStorage.getItem(LEGACY_PROGRESS_STORAGE_KEY));

  if (!legacy || legacy.userId !== userId) {
    return createInitialProgress(userId);
  }

  const entries = Object.entries(legacy.flashcards?.actions ?? {});
  const items = entries.reduce<Record<string, FlashcardProgressItem>>((accumulator, [cardId, action]) => {
    if (action === 'learned' || action === 'review' || action === 'favorite') {
      accumulator[cardId] = mapLegacyActionToItem(cardId, action);
    }
    return accumulator;
  }, {});

  const migrated: FlashcardProgress = {
    version: 2,
    userId,
    items,
    updatedAt: new Date().toISOString(),
  };

  localStorage.setItem(FLASHCARD_PROGRESS_STORAGE_KEY, JSON.stringify(migrated));
  return migrated;
};

export const createItemIfMissing = (
  items: Record<string, FlashcardProgressItem>,
  cardId: string
): FlashcardProgressItem => items[cardId] ?? createEmptyItem(cardId);
