import { useTheme } from '../context/useTheme';
import { FiX } from 'react-icons/fi';
import { HiOutlineLightBulb, HiOutlineMoon } from 'react-icons/hi2';
import './Settings.css';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const Settings = ({ isOpen, onClose }: SettingsProps) => {
  const { theme, font, fontSize, toggleTheme, setFont, setFontSize } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-panel" onClick={(e) => e.stopPropagation()}>
        <div className="settings-header">
          <h2>Ayarlar</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close settings">
            <FiX className="settings-icon" aria-hidden="true" />
          </button>
        </div>

        <div className="settings-section">
          <h3>Görünüm</h3>
          <div className="setting-row">
            <span>Tema</span>
            <button className="theme-btn" onClick={toggleTheme}>
              {theme === 'light' ? (
                <HiOutlineLightBulb className="settings-icon" aria-hidden="true" />
              ) : (
                <HiOutlineMoon className="settings-icon" aria-hidden="true" />
              )}
              <span>{theme === 'light' ? 'Açık' : 'Koyu'}</span>
            </button>
          </div>
        </div>

        <div className="settings-section">
          <h3>Yazı Tipi</h3>
          <div className="font-options">
            <button
              className={`font-option ${font === 'system' ? 'active' : ''}`}
              onClick={() => setFont('system')}
              style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
            >
              Sistem
            </button>
            <button
              className={`font-option ${font === 'serif' ? 'active' : ''}`}
              onClick={() => setFont('serif')}
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Serif
            </button>
            <button
              className={`font-option ${font === 'mono' ? 'active' : ''}`}
              onClick={() => setFont('mono')}
              style={{ fontFamily: 'monospace' }}
            >
              Mono
            </button>
          </div>
        </div>

        <div className="settings-section">
          <h3>Yazı Boyutu</h3>
          <div className="size-options">
            <button
              className={`size-option ${fontSize === 'small' ? 'active' : ''}`}
              onClick={() => setFontSize('small')}
            >
              A-
            </button>
            <button
              className={`size-option ${fontSize === 'medium' ? 'active' : ''}`}
              onClick={() => setFontSize('medium')}
            >
              A
            </button>
            <button
              className={`size-option ${fontSize === 'large' ? 'active' : ''}`}
              onClick={() => setFontSize('large')}
            >
              A+
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
