import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiSettings, FiX } from 'react-icons/fi';
import { HiOutlineLightBulb, HiOutlineMoon } from 'react-icons/hi2';
import { useTheme } from '../context/useTheme';
import Settings from './Settings';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/flashcards', label: 'Flashcards' },
    { to: '/quiz', label: 'Quiz' },
    { to: '/listening', label: 'Listening' },
    { to: '/phrases', label: 'Phrases' },
  ];

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <header className="app-header">
        <div className="app-header-content">
          <Link to="/" className="app-logo" onClick={handleNavClick}>
            Eng-Game
          </Link>
          
          <nav className={`app-nav ${menuOpen ? 'open' : ''}`}>
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`app-nav-link ${isActive(link.to) ? 'active' : ''}`}
                onClick={handleNavClick}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="app-header-actions">
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'light' ? (
                <HiOutlineMoon className="header-icon" aria-hidden="true" />
              ) : (
                <HiOutlineLightBulb className="header-icon" aria-hidden="true" />
              )}
            </button>
            <button className="settings-btn" onClick={() => setSettingsOpen(true)} aria-label="Settings">
              <FiSettings className="header-icon" aria-hidden="true" />
            </button>
            <button
              className="menu-toggle"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <FiX className="header-icon" aria-hidden="true" /> : <FiMenu className="header-icon" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      <Settings isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  );
};

export default Header;
