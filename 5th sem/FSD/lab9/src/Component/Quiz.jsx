import { useState } from "react";

const QUESTIONS = [
  {
    id: 1,
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Mark Language",
    ],
    correctIndex: 0,
  },
  {
    id: 2,
    question: "Which hook is used for state in React?",
    options: ["useEffect", "useState", "useContext", "useRef"],
    correctIndex: 1,
  },
  {
    id: 3,
    question: "What is the default port for HTTP?",
    options: ["443", "8080", "80", "3000"],
    correctIndex: 2,
  },
  {
    id: 4,
    question: "Which symbol is used for comments in JavaScript?",
    options: ["#", "//", "<!--", "/* only */"],
    correctIndex: 1,
  },
  {
    id: 5,
    question: "CSS stands for?",
    options: [
      "Creative Style Sheets",
      "Computer Style Sheets",
      "Cascading Style Sheets",
      "Colorful Style Sheets",
    ],
    correctIndex: 2,
  },
];

function getResultEmoji(score, total) {
  const ratio = score / total;
  if (ratio === 1) return "🏆🎉✨";
  if (ratio >= 0.6) return "👍😊";
  return "📚💪";
}

function Quiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [finished, setFinished] = useState(false);

  const current = QUESTIONS[currentIndex];
  const answered = selectedIndex !== null;

  function handleSelect(optionIndex) {
    if (answered) return;

    setSelectedIndex(optionIndex);
    const isCorrect = optionIndex === current.correctIndex;
    if (isCorrect) {
      setScore((s) => s + 1);
      setFeedback({ emoji: "✅🎉", message: "Correct! Great job!" });
    } else {
      setFeedback({
        emoji: "❌😔",
        message: `Wrong. Correct answer: ${current.options[current.correctIndex]}`,
      });
    }
  }

  function handleNext() {
    if (currentIndex + 1 >= QUESTIONS.length) {
      setFinished(true);
      return;
    }
    setCurrentIndex((i) => i + 1);
    setSelectedIndex(null);
    setFeedback(null);
  }

  function handleRestart() {
    setCurrentIndex(0);
    setScore(0);
    setSelectedIndex(null);
    setFeedback(null);
    setFinished(false);
  }

  if (finished) {
    const resultEmoji = getResultEmoji(score, QUESTIONS.length);
    return (
      <div className="quiz">
        <h1>Quiz Complete {resultEmoji}</h1>
        <p className="score">
          You scored {score} out of {QUESTIONS.length}
        </p>
        <p className="feedback-emoji" aria-hidden="true">
          {score === QUESTIONS.length
            ? "Perfect score! You're a star ⭐"
            : score >= 3
              ? "Nice work! Keep it up 🚀"
              : "Review and try again — you’ve got this 💡"}
        </p>
        <button type="button" onClick={handleRestart}>
          Play again 🔄
        </button>
      </div>
    );
  }

  return (
    <div className="quiz">
      <h1>🧠 Quick Quiz</h1>
      <p className="progress">
        Question {currentIndex + 1} of {QUESTIONS.length} · Score: {score}
      </p>

      <div className="question-card">
        <h2>{current.question}</h2>
        <ul className="options">
          {current.options.map((option, index) => {
            let className = "option-btn";
            if (answered) {
              if (index === current.correctIndex) className += " correct";
              else if (index === selectedIndex) className += " wrong";
            }
            return (
              <li key={option}>
                <button
                  type="button"
                  className={className}
                  onClick={() => handleSelect(index)}
                  disabled={answered}
                >
                  {option}
                </button>
              </li>
            );
          })}
        </ul>

        {feedback && (
          <div
            className={`feedback ${selectedIndex === current.correctIndex ? "feedback-correct" : "feedback-wrong"}`}
            role="status"
          >
            <span className="feedback-emoji">{feedback.emoji}</span>
            <span>{feedback.message}</span>
          </div>
        )}

        {answered && (
          <button type="button" className="next-btn" onClick={handleNext}>
            {currentIndex + 1 >= QUESTIONS.length ? "See results 📊" : "Next ➡️"}
          </button>
        )}
      </div>
    </div>
  );
}

export default Quiz;
