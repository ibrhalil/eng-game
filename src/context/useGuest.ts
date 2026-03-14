import { useContext } from 'react';
import { GuestContext } from './guestStore';

export const useGuest = () => {
  const context = useContext(GuestContext);

  if (!context) {
    throw new Error('useGuest must be used within a GuestProvider');
  }

  return context;
};
