import { createContext } from 'react';
import type { GuestUser } from '../types';

export interface GuestContextType {
  guestUser: GuestUser;
  touchGuestActivity: () => void;
}

export const GuestContext = createContext<GuestContextType | undefined>(undefined);
