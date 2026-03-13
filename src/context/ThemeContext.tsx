import { useState, useEffect, type ReactNode } from 'react';
import {
  FONT_SIZES,
  FONTS,
  STORAGE_KEYS,
  isFont,
  isFontSize,
  isTheme,
  type Font,
  type FontSize,
  type Theme,
} from './themeConfig';
import { ThemeContext } from './themeStore';

const getInitialTheme = (): Theme => {
  const savedTheme = localStorage.getItem(STORAGE_KEYS.theme);
  return savedTheme && isTheme(savedTheme) ? savedTheme : 'light';
};

const getInitialFont = (): Font => {
  const savedFont = localStorage.getItem(STORAGE_KEYS.font);
  return savedFont && isFont(savedFont) ? savedFont : 'system';
};

const getInitialFontSize = (): FontSize => {
  const savedFontSize = localStorage.getItem(STORAGE_KEYS.fontSize);
  return savedFontSize && isFontSize(savedFontSize) ? savedFontSize : 'medium';
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [font, setFont] = useState<Font>(getInitialFont);
  const [fontSize, setFontSize] = useState<FontSize>(getInitialFontSize);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.theme, theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.font, font);
    document.documentElement.style.setProperty('--font-family', FONTS[font]);
  }, [font]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.fontSize, fontSize);
    document.documentElement.style.setProperty('--font-size', FONT_SIZES[fontSize]);
  }, [fontSize]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, font, fontSize, toggleTheme, setFont, setFontSize }}>
      {children}
    </ThemeContext.Provider>
  );
};
