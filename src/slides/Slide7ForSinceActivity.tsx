import React, { useState } from 'react';
import { Mascot } from '../components/Mascot';
import { Hourglass, Calendar, CheckCircle, XCircle, RotateCcw, Award } from 'lucide-react';
import { playSound } from '../utils/audio';

interface SlideProps {
  soundEnabled: boolean;
}

interface Item {
  phrase: string;
  correct: 'for' | 'since';
  reason: string;
  icon: string;
}

const ITEMS: Item[] = [
  { phrase: "3 hours", correct: 'for', reason: "It's a duration (amount of time)!", icon: "⏳" },
  { phrase: "Monday", correct: 'since', reason: "It names the specific starting day!", icon: "📅" },
  { phrase: "yesterday", correct: 'since', reason: "It points to the starting point!", icon: "🌅" },
  { phrase: "two weeks", correct: 'for', reason: "Counting 14 days of duration!", icon: "📆" },
  { phrase: "8:30 AM", correct: 'since', reason: "It's an exact starting clock time!", icon: "⏰" },
];

export const Slide7ForSinceActivity: React.FC<SlideProps> = ({ soundEnabled }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentItem = ITEMS[currentIndex];

  const handleAnswer = (choice: 'for' | 'since') => {
    if (feedback !== null || completed) return;

    if (choice === currentItem.correct) {
      playSound('correct', soundEnabled);
      setFeedback({ isCorrect: true, text: `Correct! ${currentItem.reason} 🎉` });
      setScore((s) => s + 1);
    } else {
      playSound('wrong', soundEnabled);
      setFeedback({
        isCorrect: false,
        text: `Oops! It should be "${currentItem.correct.toUpperCase()}". ${currentItem.reason}`,
      });
    }

    setTimeout(() => {
      setFeedback(null);
      if (currentIndex + 1 < ITEMS.length) {
        setCurrentIndex((i) => i + 1);
      } else {
        setCompleted(true);
        playSound('fanfare', soundEnabled);
      }
    }, 1500);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setFeedback(null);
    setScore(0);
    setCompleted(false);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between py-1">
      {/* Top Banner with Progress & Score */}
      <div className="flex items-center justify-between bg-white px-4 py-2 rounded-2xl border-2 border-slate-200 shadow-xs mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm font-extrabold text-blue-600 bg-blue-50 px-3 py-1 rounded-xl border border-blue-200">
            Question {Math.min(currentIndex + 1, ITEMS.length)} of {ITEMS.length}
          </span>
          <span className="text-xs sm:text-sm font-bold text-slate-500">
            Tap the correct clue button!
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm font-extrabold text-amber-900 bg-amber-100 px-3 py-1 rounded-xl border border-amber-300">
            Score: {score} ⭐
          </span>
          <button
            id="btn-reset-for-since"
            onClick={handleReset}
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg"
            title="Restart game"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Game Screen */}
      {!completed ? (
        <div className="my-auto flex flex-col items-center">
          {/* Target Phrase Box */}
          <div className="w-full max-w-md bg-gradient-to-r from-blue-50 via-sky-50 to-indigo-50 border-3 border-blue-300 rounded-3xl p-6 text-center cartoon-shadow relative mb-5">
            <div className="text-3xl mb-1">{currentItem.icon}</div>
            <p className="text-xs uppercase font-extrabold tracking-wider text-slate-500">
              Which clue belongs here?
            </p>
            <h3 className="text-3xl sm:text-4xl font-black text-slate-800 my-2">
              "_____ {currentItem.phrase}"
            </h3>
            <p className="text-xs font-semibold text-slate-500">
              Is it a duration or a starting point?
            </p>

            {/* Instant Feedback Overlay */}
            {feedback && (
              <div
                className={`absolute inset-0 rounded-3xl flex items-center justify-center p-4 text-center font-black text-base sm:text-lg animate-bounce ${
                  feedback.isCorrect
                    ? 'bg-emerald-500/95 text-white'
                    : 'bg-rose-500/95 text-white'
                }`}
              >
                <div className="flex flex-col items-center">
                  {feedback.isCorrect ? (
                    <CheckCircle className="w-8 h-8 mb-1 text-white" />
                  ) : (
                    <XCircle className="w-8 h-8 mb-1 text-white" />
                  )}
                  <span>{feedback.text}</span>
                </div>
              </div>
            )}
          </div>

          {/* Choice Buttons: FOR vs SINCE */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-md">
            <button
              id="btn-choose-for"
              onClick={() => handleAnswer('for')}
              disabled={feedback !== null}
              className="py-4 px-6 bg-amber-400 hover:bg-amber-500 text-amber-950 font-black text-xl sm:text-2xl rounded-2xl border-3 border-amber-600 cartoon-btn-shadow transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
            >
              <Hourglass className="w-6 h-6" />
              <span>FOR</span>
            </button>

            <button
              id="btn-choose-since"
              onClick={() => handleAnswer('since')}
              disabled={feedback !== null}
              className="py-4 px-6 bg-blue-500 hover:bg-blue-600 text-white font-black text-xl sm:text-2xl rounded-2xl border-3 border-blue-700 cartoon-btn-shadow transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
            >
              <Calendar className="w-6 h-6" />
              <span>SINCE</span>
            </button>
          </div>
        </div>
      ) : (
        /* Completion Victory Card */
        <div className="my-auto bg-gradient-to-b from-amber-50 to-orange-50 border-3 border-amber-300 rounded-3xl p-6 text-center max-w-md mx-auto cartoon-shadow">
          <div className="w-16 h-16 bg-amber-400 text-amber-950 rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-amber-600 shadow-md animate-bounce">
            <Award className="w-9 h-9" />
          </div>
          <h3 className="text-2xl font-black text-amber-950">Awesome Work, Detective!</h3>
          <p className="text-slate-600 font-bold mt-1 text-sm">
            You scored {score} out of {ITEMS.length} stars!
          </p>
          <div className="mt-4 flex justify-center">
            <button
              id="btn-replay-for-since"
              onClick={handleReset}
              className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-extrabold rounded-2xl border-2 border-blue-700 cartoon-btn-shadow text-sm"
            >
              Play Again 🔄
            </button>
          </div>
        </div>
      )}

      {/* Mascot bottom helper */}
      <div className="flex items-center justify-center mt-2">
        <Mascot
          mood={feedback?.isCorrect ? 'celebrating' : feedback ? 'thinking' : 'happy'}
          size="sm"
          speech="Remember: Clock time/Days = SINCE! Length of time/Hours = FOR!"
        />
      </div>
    </div>
  );
};
