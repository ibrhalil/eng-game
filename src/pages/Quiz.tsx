import { useState } from 'react';
import { FiArrowRight, FiAward, FiCheckCircle, FiTrendingUp } from 'react-icons/fi';
import quizzesData from '../data/quizzes.json';
import type { Quiz } from '../types';
import './Quiz.css';

const Quiz = () => {
  const quizzes: Quiz[] = quizzesData.quizzes as Quiz[];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuiz = quizzes[currentIndex];
  const resultMessage =
    score === quizzes.length
      ? { text: 'Perfect!', icon: FiAward }
      : score > quizzes.length / 2
      ? { text: 'Good job!', icon: FiCheckCircle }
      : { text: 'Keep practicing!', icon: FiTrendingUp };

  const handleAnswer = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    if (index === currentQuiz.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < quizzes.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <div className="quiz finished">
        <h1>Quiz Completed!</h1>
        <div className="final-score">
          <span className="score">{score}</span>
          <span className="total">/ {quizzes.length}</span>
        </div>
        <p className="message">
          <resultMessage.icon className="message-icon" aria-hidden="true" />
          <span>{resultMessage.text}</span>
        </p>
        <button onClick={handleRestart} className="btn primary">Try Again</button>
      </div>
    );
  }

  return (
    <div className="quiz">
      <div className="quiz-header">
        <h1>Quiz</h1>
        <p>{currentIndex + 1} / {quizzes.length}</p>
      </div>

      <div className="question-card">
        <h2>{currentQuiz.question}</h2>
        
        <div className="options">
          {currentQuiz.options.map((option, index) => {
            let optionClass = 'option';
            if (showExplanation) {
              if (index === currentQuiz.correctAnswer) {
                optionClass += ' correct';
              } else if (index === selectedAnswer) {
                optionClass += ' wrong';
              }
            } else if (selectedAnswer === index) {
              optionClass += ' selected';
            }
            
            return (
              <button
                key={index}
                className={optionClass}
                onClick={() => handleAnswer(index)}
                disabled={showExplanation}
              >
                {option}
              </button>
            );
          })}
        </div>

        {showExplanation && (
          <div className="explanation">
            <p>{currentQuiz.explanation}</p>
          </div>
        )}
      </div>

      {showExplanation && (
        <button onClick={handleNext} className="btn primary next-btn">
          <span>{currentIndex < quizzes.length - 1 ? 'Next Question' : 'Finish Quiz'}</span>
          {currentIndex < quizzes.length - 1 && <FiArrowRight className="next-icon" aria-hidden="true" />}
        </button>
      )}

      <div className="score-display">
        Score: {score}
      </div>
    </div>
  );
};

export default Quiz;
