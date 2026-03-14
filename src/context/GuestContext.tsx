import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { createGuestUser, GUEST_STORAGE_KEY, isGuestUser, LEGACY_GUEST_STORAGE_KEY } from './guestConfig';
import { GuestContext } from './guestStore';
import type { GuestUser } from '../types';

const getInitialGuest = (): GuestUser => {
  const savedGuest = localStorage.getItem(GUEST_STORAGE_KEY);

  if (savedGuest) {
    try {
      const parsed = JSON.parse(savedGuest) as unknown;
      return isGuestUser(parsed) ? parsed : createGuestUser();
    } catch {
      return createGuestUser();
    }
  }

  const legacyGuest = localStorage.getItem(LEGACY_GUEST_STORAGE_KEY);

  if (!legacyGuest) {
    return createGuestUser();
  }

  try {
    const parsed = JSON.parse(legacyGuest) as unknown;

    if (!isGuestUser(parsed)) {
      return createGuestUser();
    }

    localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(parsed));
    return parsed;
  } catch {
    return createGuestUser();
  }
};

export const GuestProvider = ({ children }: { children: ReactNode }) => {
  const [guestUser, setGuestUser] = useState<GuestUser>(getInitialGuest);

  useEffect(() => {
    localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(guestUser));
  }, [guestUser]);

  const touchGuestActivity = useCallback(() => {
    setGuestUser((previous) => ({
      ...previous,
      lastActiveAt: new Date().toISOString(),
    }));
  }, []);

  return <GuestContext.Provider value={{ guestUser, touchGuestActivity }}>{children}</GuestContext.Provider>;
};
