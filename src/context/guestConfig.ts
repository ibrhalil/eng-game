import type { GuestUser } from '../types';

export const GUEST_STORAGE_KEY = 'guest.info';
export const LEGACY_GUEST_STORAGE_KEY = 'eng-game.guest.v1';

const createId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `guest-${Math.random().toString(36).slice(2, 10)}`;
};

export const createGuestUser = (): GuestUser => {
  const now = new Date().toISOString();
  const id = createId();
  const shortCode = id.replace(/-/g, '').slice(0, 4).toUpperCase();

  return {
    id,
    displayName: `Misafir-${shortCode}`,
    createdAt: now,
    lastActiveAt: now,
    version: 1,
  };
};

export const isGuestUser = (value: unknown): value is GuestUser => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const maybe = value as Partial<GuestUser>;
  return (
    typeof maybe.id === 'string' &&
    typeof maybe.displayName === 'string' &&
    typeof maybe.createdAt === 'string' &&
    typeof maybe.lastActiveAt === 'string' &&
    maybe.version === 1
  );
};
