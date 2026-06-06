import React, { useState } from 'react';
import { quizQuestions } from '../../../modules/learning/content';
import { useApp } from '../../context/AppContext';

export default function MockQuiz() {
  const { appState, updateAppState } = useApp();
  
  const [screen, setScreen] = useState('welcome'); // 'welcome', 'active', 'results'
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const startQuiz = () => {
    setScreen('active');
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswered(false);
    setSelectedOption(null);
  };

  const handleSelectOption = (idx) => {
    if (answered) return;
    setAnswered(true);
    setSelectedOption(idx);
    
    const correctIndex = quizQuestions[currentQuestionIndex].answer;
    if (idx === correctIndex) {
      setScore(s => s + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(i => i + 1);
      setAnswered(false);
      setSelectedOption(null);
    } else {
      setScreen('results');
      updateAppState({ quizHighScore: Math.max(appState.quizHighScore || 0, score) });
    }
  };

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progressPercent = ((currentQuestionIndex) / quizQuestions.length) * 100;
  const scorePercent = (score / quizQuestions.length) * 100;

  return (
    <div className="tab-pane active" id="quiz" style={{ height: '100%', overflowY: 'auto', padding: '40px' }}>
      
      {screen === 'welcome' && (
        <div id="quiz-welcome-screen" className="card" style={{ maxWidth: '600px', margin: '40px auto', padding: '40px', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🎯</div>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '12px' }}>Placement Quiz</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', lineHeight: 1.6 }}>
            Test your knowledge of Data Structures and Algorithms with this comprehensive mock quiz.
          </p>
          <button id="btn-start-quiz" className="btn btn-accent" style={{ padding: '12px 32px', fontSize: '1.1rem' }} onClick={startQuiz}>
            Start Quiz 🚀
          </button>
        </div>
      )}

      {screen === 'active' && (
        <div id="quiz-active-screen" className="card" style={{ maxWidth: '800px', margin: '40px auto', padding: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <span id="quiz-progress-lbl" style={{ color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.9rem' }}>
              Question {currentQuestionIndex + 1} of {quizQuestions.length}
            </span>
            <span id="quiz-result-emoji">🎯 Placement Quiz</span>
          </div>
          
          <div style={{ width: '100%', height: '6px', background: 'var(--bg-input)', borderRadius: '3px', marginBottom: '32px', overflow: 'hidden' }}>
            <div id="quiz-progress-fill" style={{ width: `${progressPercent}%`, height: '100%', background: 'var(--accent-cyan)', transition: 'width 0.3s ease' }}></div>
          </div>
          
          <h2 id="quiz-question-lbl" style={{ fontSize: '1.4rem', marginBottom: '24px', lineHeight: 1.4 }}>
            {currentQuestion?.question}
          </h2>
          
          <div id="quiz-options-container" style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            {currentQuestion?.options.map((opt, idx) => {
              const isCorrectOption = idx === currentQuestion.answer;
              const isSelected = selectedOption === idx;
              
              let className = 'quiz-option';
              if (answered) {
                if (isCorrectOption) className += ' correct';
                else if (isSelected && !isCorrectOption) className += ' wrong';
              }

              return (
                <div 
                  key={idx} 
                  className={className} 
                  onClick={() => handleSelectOption(idx)}
                >
                  <span className="quiz-option-letter">{String.fromCharCode(65 + idx)}</span>
                  <span className="quiz-option-text">{opt}</span>
                </div>
              );
            })}
          </div>

          {answered && (
            <div id="quiz-explanation" style={{ background: 'rgba(0, 229, 255, 0.05)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-md)', padding: '16px', marginBottom: '24px', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              <strong>Explanation:</strong> {currentQuestion.explanation}
            </div>
          )}

          <div style={{ textAlign: 'right' }}>
            <button 
              id="btn-next-question" 
              className="btn btn-primary" 
              disabled={!answered}
              onClick={handleNextQuestion}
              style={{ padding: '10px 24px' }}
            >
              {currentQuestionIndex < quizQuestions.length - 1 ? 'Next Question ➡' : 'View Results 🏆'}
            </button>
          </div>
        </div>
      )}

      {screen === 'results' && (
        <div id="quiz-results-screen" className="card" style={{ maxWidth: '600px', margin: '40px auto', padding: '40px', textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🏆</div>
          <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>Quiz Completed!</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '32px' }}>
            You scored <strong id="quiz-score-val" style={{ color: 'var(--accent-cyan)', fontSize: '1.4rem' }}>{score}</strong> out of {quizQuestions.length}
          </p>
          
          <div id="quiz-feedback-msg" style={{ marginBottom: '32px', fontSize: '1.1rem', fontWeight: 500, color: scorePercent === 100 ? 'var(--accent-emerald)' : (scorePercent >= 70 ? 'var(--accent-cyan)' : 'var(--text-secondary)') }}>
            {scorePercent === 100 
              ? "🏆 Perfect Score! You've mastered the fundamentals!" 
              : scorePercent >= 70 
                ? "🌟 Great Job! You have a solid grasp of DSA." 
                : "📚 Keep practicing! Re-read the learning paths and try again."}
          </div>

          <button id="btn-restart-quiz" className="btn btn-secondary" onClick={startQuiz}>
            🔄 Retake Quiz
          </button>
        </div>
      )}

    </div>
  );
}
