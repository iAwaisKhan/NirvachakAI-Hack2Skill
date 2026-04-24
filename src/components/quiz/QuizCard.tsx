'use client';

import { useState, useCallback } from 'react';
import styles from './QuizCard.module.css';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export function QuizCard() {
  const [difficulty, setDifficulty] = useState<string>('beginner');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const startQuiz = useCallback(async () => {
    setIsLoading(true);
    setHasStarted(true);
    setScore(0);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setIsFinished(false);

    try {
      const response = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ difficulty }),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to generate quiz: ${response.statusText}`);
      }
      
      const data = await response.json();
      setQuestions(data.questions || []);
    } catch (error) {
      console.error(error);
      setQuestions([]);
    } finally {
      setIsLoading(false);
    }
  }, [difficulty]);

  const handleAnswer = useCallback((index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    if (index === questions[currentIndex]?.correctAnswer) {
      setScore((s) => s + 1);
    }
  }, [selectedAnswer, questions, currentIndex]);

  const handleNext = useCallback(() => {
    if (currentIndex + 1 >= questions.length) {
      setIsFinished(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  }, [currentIndex, questions.length]);

  const currentQuestion = questions[currentIndex];

  // Difficulty selection
  if (!hasStarted) {
    return (
      <div className={styles.container}>
        <div className={styles.startCard}>
          <span className={styles.quizEmoji}>🧠</span>
          <h3 className={styles.startTitle}>Test Your Election Knowledge</h3>
          <p className={styles.startDesc}>
            5 AI-generated questions about the Indian election process.
            Powered by Gemini AI — every quiz is unique!
          </p>
          <div className={styles.difficultySelect} role="radiogroup" aria-label="Select difficulty">
            {['beginner', 'intermediate', 'advanced'].map((d) => (
              <button
                key={d}
                className={`${styles.diffBtn} ${d === difficulty ? styles.diffActive : ''}`}
                onClick={() => setDifficulty(d)}
                role="radio"
                aria-checked={d === difficulty}
              >
                {d === 'beginner' ? '🌱' : d === 'intermediate' ? '🌿' : '🌳'}
                {d.charAt(0).toUpperCase() + d.slice(1)}
              </button>
            ))}
          </div>
          <button className="btn btn-primary btn-lg" onClick={startQuiz}>
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingCard}>
          <div className="animate-spin" style={{ fontSize: '2rem' }}>🗳️</div>
          <p>Generating your quiz with Gemini AI...</p>
        </div>
      </div>
    );
  }

  if (hasStarted && questions.length === 0 && !isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.startCard}>
          <span className={styles.quizEmoji}>🚫</span>
          <h3 className={styles.startTitle}>Connection Error</h3>
          <p className={styles.startDesc}>
            Could not generate the quiz. The API may be unavailable or rate-limited.
          </p>
          <button className="btn btn-primary" onClick={() => setHasStarted(false)}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Question Card (only render if questions are present)
  if (hasStarted && questions.length > 0 && !isFinished) {
    const currentQuestion = questions[currentIndex];
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.progress}>
            Question {currentIndex + 1} of {questions.length}
          </div>
          <div className={styles.score}>Score: {score}</div>
        </div>

        <div className={styles.questionCard}>
          <h2 className={styles.question}>{currentQuestion.question}</h2>
          <div className={styles.options}>
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = currentQuestion.correctAnswer === index;
              const showResult = selectedAnswer !== null;

              let btnClass = styles.optionBtn;
              if (showResult) {
                if (isCorrect) btnClass += ` ${styles.correct}`;
                else if (isSelected) btnClass += ` ${styles.incorrect}`;
              }

              return (
                <button
                  key={index}
                  className={btnClass}
                  onClick={() => handleAnswer(index)}
                  disabled={showResult}
                  aria-pressed={isSelected}
                >
                  <span className={styles.optionLetter}>{String.fromCharCode(65 + index)}. </span>
                  {option}
                </button>
              );
            })}
          </div>

          {showExplanation && (
            <div className={styles.explanation}>
              <p>
                {selectedAnswer === currentQuestion.correctAnswer ? '✅ Correct! ' : '❌ Incorrect. '}
                {currentQuestion.explanation}
              </p>
              <button className={`btn btn-primary ${styles.nextBtn}`} onClick={handleNext}>
                {currentIndex + 1 >= questions.length ? 'See Results' : 'Next Question ➔'}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (isFinished && questions.length > 0) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className={styles.container}>
        <div className={styles.resultCard}>
          <span className={styles.resultEmoji}>
            {percentage >= 80 ? '🏆' : percentage >= 50 ? '👏' : '📚'}
          </span>
          <h3 className={styles.resultTitle}>Quiz Complete!</h3>
          <div className={styles.scoreCircle}>
            <span className={styles.scoreValue}>{score}/{questions.length}</span>
            <span className={styles.scorePercent}>{percentage}%</span>
          </div>
          <p className={styles.resultMsg}>
            {percentage >= 80 ? 'Excellent! You know your elections!' :
             percentage >= 50 ? 'Good effort! Keep learning!' :
             'Keep exploring the timeline to learn more!'}
          </p>
          <div className={styles.resultActions}>
            <button className="btn btn-primary" onClick={startQuiz}>Play Again</button>
            <button className="btn btn-secondary" onClick={() => setHasStarted(false)}>
              Change Difficulty
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Question
  return (
    <div className={styles.container}>
      <div className={styles.questionCard}>
        <div className={styles.progress}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
          <span className={styles.progressText}>
            {currentIndex + 1} / {questions.length}
          </span>
        </div>

        <h3 className={styles.questionText}>{currentQuestion?.question}</h3>

        <div className={styles.options} role="listbox" aria-label="Answer options">
          {currentQuestion?.options.map((option, i) => {
            let optionClass = styles.option;
            if (selectedAnswer !== null) {
              if (i === currentQuestion.correctAnswer) optionClass += ` ${styles.correct}`;
              else if (i === selectedAnswer) optionClass += ` ${styles.incorrect}`;
            }
            return (
              <button
                key={i}
                className={optionClass}
                onClick={() => handleAnswer(i)}
                disabled={selectedAnswer !== null}
                role="option"
                aria-selected={selectedAnswer === i}
              >
                {option}
              </button>
            );
          })}
        </div>

        {showExplanation && currentQuestion && (
          <div className={styles.explanation}>
            <strong>{selectedAnswer === currentQuestion.correctAnswer ? '✅ Correct!' : '❌ Incorrect'}</strong>
            <p>{currentQuestion.explanation}</p>
          </div>
        )}

        {selectedAnswer !== null && (
          <button className="btn btn-primary" onClick={handleNext} style={{ marginTop: 'var(--space-4)' }}>
            {currentIndex + 1 >= questions.length ? 'See Results' : 'Next Question →'}
          </button>
        )}
      </div>
    </div>
  );
}
