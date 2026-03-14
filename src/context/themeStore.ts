import { createContext } from 'react';
import type { Font, FontSize, Theme } from './themeConfig';

export interface ThemeContextType {
  theme: Theme;
  font: Font;
  fontSize: FontSize;
  soundEnabled: boolean;
  toggleTheme: () => void;
  setFont: (font: Font) => void;
  setFontSize: (size: FontSize) => void;
  setSoundEnabled: (enabled: boolean) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
