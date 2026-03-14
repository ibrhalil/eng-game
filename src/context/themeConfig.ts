export type Theme = 'light' | 'dark';
export type Font = 'system' | 'serif' | 'mono';
export type FontSize = 'small' | 'medium' | 'large';

export const STORAGE_KEYS = {
  theme: 'theme',
  font: 'font',
  fontSize: 'fontSize',
  soundEnabled: 'soundEnabled',
} as const;

export const FONTS: Record<Font, string> = {
  system: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  serif: 'Georgia, "Times New Roman", serif',
  mono: '"Fira Code", "Courier New", monospace',
};

export const FONT_SIZES: Record<FontSize, string> = {
  small: '14px',
  medium: '16px',
  large: '18px',
};

export const isTheme = (value: string): value is Theme => value === 'light' || value === 'dark';

export const isFont = (value: string): value is Font =>
  value === 'system' || value === 'serif' || value === 'mono';

export const isFontSize = (value: string): value is FontSize =>
  value === 'small' || value === 'medium' || value === 'large';
