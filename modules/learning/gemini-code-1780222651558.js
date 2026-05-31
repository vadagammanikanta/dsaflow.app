// quiz_engine_v2.js
// ═══════════════════════════════════════════════════════════════════════════
//  Premium Quiz Engine for DSA Modules (v2 Extension Support)
// ═══════════════════════════════════════════════════════════════════════════

export class DSAQuizEngine {
  constructor(quizData, onCompleteCallback) {
    this.quizData = quizData;
    this.questions = quizData.questions;
    this.currentIndex = 0;
    this.score = 0;
    this.isAnswered = false;
    this.onComplete = onCompleteCallback;
  }

  // Gets the current question object with progress metrics
  getCurrentQuestion() {
    return {
      ...this.questions[this.currentIndex],
      questionNumber: this.currentIndex + 1,
      totalQuestions: this.questions.length,
      progress: ((this.currentIndex) / this.questions.length) * 100
    };
  }

  // Handles the user selecting an option
  submitAnswer(selectedIndex) {
    if (this.isAnswered) return null; // Lock after submission
    this.isAnswered = true;
    
    const currentQ = this.questions[this.currentIndex];
    const isCorrect = selectedIndex === currentQ.answer;
    
    if (isCorrect) this.score++;

    return {
      isCorrect,
      correctIndex: currentQ.answer,
      explanation: currentQ.explanation
    };
  }

  // Advances to the next question or completes the quiz
  next() {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
      this.isAnswered = false;
      return true; // Continuation signal
    } else {
      this.finish();
      return false; // Termination signal
    }
  }

  finish() {
    const percentage = (this.score / this.questions.length) * 100;
    let feedback = "";
    
    if (percentage === 100) feedback = "🏆 Masterful! You crushed the advanced concepts.";
    else if (percentage >= 80) feedback = "🌟 Excellent! You have a solid grasp of this phase.";
    else if (percentage >= 60) feedback = "👍 Good effort. Make sure to review the explanations closely.";
    else feedback = "📚 Keep pushing! Re-read the module notes and try again.";

    if (this.onComplete) {
      this.onComplete({
        score: this.score,
        total: this.questions.length,
        percentage,
        feedback
      });
    }
  }

  reset() {
    this.currentIndex = 0;
    this.score = 0;
    this.isAnswered = false;
  }
}