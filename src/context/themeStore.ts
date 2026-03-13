import { createContext } from 'react';
import type { Font, FontSize, Theme } from './themeConfig';

export interface ThemeContextType {
  theme: Theme;
  font: Font;
  fontSize: FontSize;
  toggleTheme: () => void;
  setFont: (font: Font) => void;
  setFontSize: (size: FontSize) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
