// Quiz Engine Module for DSA Learning Hub
import { quizQuestions } from './content.js';

let currentQuestionIndex = 0;
let score = 0;
let answered = false;
let onQuizCompleteCallback = null;

// DOM Elements
const welcomeScreen = document.getElementById('quiz-welcome-screen');
const activeScreen = document.getElementById('quiz-active-screen');
const resultsScreen = document.getElementById('quiz-results-screen');
const startBtn = document.getElementById('btn-start-quiz');
const nextBtn = document.getElementById('btn-next-question');
const restartBtn = document.getElementById('btn-restart-quiz');
const progressLbl = document.getElementById('quiz-progress-lbl');
const questionLbl = document.getElementById('quiz-question-lbl');
const optionsContainer = document.getElementById('quiz-options-container');
const explanationDiv = document.getElementById('quiz-explanation');
const scoreVal = document.getElementById('quiz-score-val');
const feedbackMsg = document.getElementById('quiz-feedback-msg');

export function initQuiz(onComplete) {
  onQuizCompleteCallback = onComplete;
  
  // Wire up listeners
  startBtn.addEventListener('click', startQuiz);
  nextBtn.addEventListener('click', handleNextQuestion);
  restartBtn.addEventListener('click', startQuiz);
}

export function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  answered = false;

  // Swap screens
  welcomeScreen.style.display = 'none';
  resultsScreen.style.display = 'none';
  activeScreen.style.display = 'block';

  showQuestion();
}

function showQuestion() {
  answered = false;
  nextBtn.disabled = true;
  explanationDiv.style.display = 'none';
  optionsContainer.innerHTML = '';

  const currentQuestion = quizQuestions[currentQuestionIndex];
  
  // Update labels & progress bar
  progressLbl.textContent = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
  const fillEl = document.getElementById('quiz-progress-fill');
  if (fillEl) fillEl.style.width = `${(currentQuestionIndex / quizQuestions.length) * 100}%`;
  const emojiEl = document.getElementById('quiz-result-emoji');
  if (emojiEl) emojiEl.textContent = '🎯 Placement Quiz';
  questionLbl.textContent = currentQuestion.question;

  // Render options
  currentQuestion.options.forEach((optionText, idx) => {
    const optionBtn = document.createElement('div');
    optionBtn.className = 'quiz-option';
    
    // Alphabet letters (A, B, C, D)
    const letterCode = String.fromCharCode(65 + idx); // 65 is 'A'
    
    optionBtn.innerHTML = `
      <span class="quiz-option-letter">${letterCode}</span>
      <span class="quiz-option-text">${escapeHTML(optionText)}</span>
    `;

    optionBtn.addEventListener('click', () => selectOption(idx, optionBtn));
    optionsContainer.appendChild(optionBtn);
  });
}

function selectOption(selectedIndex, selectedElem) {
  if (answered) return; // Prevent clicking after selection
  
  answered = true;
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const correctIndex = currentQuestion.answer;

  const options = optionsContainer.children;
  
  // Visual validation
  if (selectedIndex === correctIndex) {
    selectedElem.classList.add('correct');
    score++;
  } else {
    selectedElem.classList.add('wrong');
    // Highlight correct answer in green
    options[correctIndex].classList.add('correct');
  }

  // Display explanation
  explanationDiv.innerHTML = `<strong>Explanation:</strong> ${currentQuestion.explanation}`;
  explanationDiv.style.display = 'block';

  // Enable Next button
  nextBtn.disabled = false;
}

function handleNextQuestion() {
  currentQuestionIndex++;
  
  if (currentQuestionIndex < quizQuestions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  activeScreen.style.display = 'none';
  resultsScreen.style.display = 'block';

  scoreVal.textContent = score;

  // Feedback messaging
  const percent = (score / quizQuestions.length) * 100;
  if (percent === 100) {
    feedbackMsg.textContent = "🏆 Perfect Score! You've mastered the fundamentals!";
    feedbackMsg.style.color = 'var(--accent-emerald)';
  } else if (percent >= 70) {
    feedbackMsg.textContent = "🌟 Great Job! You have a solid grasp of DSA.";
    feedbackMsg.style.color = 'var(--accent-cyan)';
  } else {
    feedbackMsg.textContent = "📚 Keep practicing! Re-read the learning paths and try again.";
    feedbackMsg.style.color = 'var(--text-secondary)';
  }

  // Trigger callback to save state
  if (onQuizCompleteCallback) {
    onQuizCompleteCallback(score, quizQuestions.length);
  }
}

function escapeHTML(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
