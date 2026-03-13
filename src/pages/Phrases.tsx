import { useState } from 'react';
import { HiOutlineSpeakerWave, HiOutlineSpeakerXMark } from 'react-icons/hi2';
import phrasesData from '../data/phrases.json';
import type { PhraseCategory } from '../types';
import './Phrases.css';

const Phrases = () => {
  const categories: PhraseCategory[] = phrasesData.categories as PhraseCategory[];
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.id || '');
  const [playingId, setPlayingId] = useState<string | null>(null);

  const currentCategory = categories.find(c => c.id === activeCategory);

  return (
    <div className="phrases">
      <h1>Speaking Phrases</h1>
      <p className="phrases-subtitle">Günlük hayatta kullanılan İngilizce kalıplar</p>

      <div className="tabs">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`tab ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="phrases-list">
        {currentCategory?.phrases.map((phrase) => (
          <div key={phrase.id} className="phrase-card">
            <div className="phrase-main">
              <h3>{phrase.english}</h3>
              <p className="turkish">{phrase.turkish}</p>
            </div>
            <div className="phrase-footer">
              <p className="phrase-pronunciation">{phrase.pronunciation}</p>
              <button 
                className={`play-btn ${playingId === phrase.id ? 'playing' : ''}`}
                onClick={() => setPlayingId(playingId === phrase.id ? null : phrase.id)}
                aria-label={playingId === phrase.id ? 'Stop pronunciation' : 'Play pronunciation'}
              >
                {playingId === phrase.id ? (
                  <HiOutlineSpeakerXMark aria-hidden="true" />
                ) : (
                  <HiOutlineSpeakerWave aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Phrases;
