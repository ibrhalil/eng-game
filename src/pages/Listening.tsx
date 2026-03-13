import { useState } from 'react';
import { FiArrowLeft, FiPlay } from 'react-icons/fi';
import listeningData from '../data/listening.json';
import type { ListeningExercise } from '../types';
import './Listening.css';

const Listening = () => {
  const exercises: ListeningExercise[] = listeningData.exercises as ListeningExercise[];
  const [currentExercise, setCurrentExercise] = useState<ListeningExercise | null>(null);
  const [showTranscript, setShowTranscript] = useState(false);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'easy';
      case 'intermediate': return 'medium';
      case 'advanced': return 'hard';
      default: return 'easy';
    }
  };

  return (
    <div className="listening">
      <h1>Listening</h1>
      <p className="listening-subtitle">Dinleme alıştırmaları ile İngilizce dinleme becerilerini geliştir</p>

      {!currentExercise ? (
        <div className="exercise-list">
          {exercises.map((exercise) => (
            <div key={exercise.id} className="exercise-card" onClick={() => setCurrentExercise(exercise)}>
              <div className="exercise-info">
                <h3>{exercise.title}</h3>
                <span className={`level ${getLevelColor(exercise.level)}`}>
                  {exercise.level}
                </span>
              </div>
              <button className="btn-play" aria-label={`Play ${exercise.title}`}>
                <FiPlay aria-hidden="true" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="player-view">
          <button className="back-btn" onClick={() => { setCurrentExercise(null); setShowTranscript(false); }}>
            <FiArrowLeft className="back-icon" aria-hidden="true" />
            <span>Back to list</span>
          </button>
          
          <div className="player-card">
            <h2>{currentExercise.title}</h2>
            <span className={`level ${getLevelColor(currentExercise.level)}`}>
              {currentExercise.level}
            </span>

            <div className="audio-placeholder">
              <div className="audio-visualizer">
                <span></span><span></span><span></span><span></span><span></span>
              </div>
              <p>Audio Player (placeholder)</p>
            </div>

            <button 
              className="btn transcript-btn" 
              onClick={() => setShowTranscript(!showTranscript)}
            >
              {showTranscript ? 'Hide Transcript' : 'Show Transcript'}
            </button>

            {showTranscript && (
              <div className="transcript">
                <h3>Transcript</h3>
                <p>{currentExercise.transcript}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Listening;
