import React, { useState } from 'react';
import { Mascot } from '../components/Mascot';
import { Award, CheckCircle2, XCircle, RotateCcw, Sparkles, Printer } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../utils/audio';

interface SlideProps {
  soundEnabled: boolean;
}

interface QuizItem {
  id: number;
  question: string;
  options: string[];
  correctIdx: number;
  explanation: string;
  badge: string;
}

const QUIZ_ITEMS: QuizItem[] = [
  {
    id: 1,
    question: "Which sentence is written correctly?",
    options: [
      "She has been drawing a picture for two hours.",
      "She have been drawing a picture for two hours.",
      "She has been draw a picture for two hours.",
    ],
    correctIdx: 0,
    explanation: "'She' is singular ('has') + 'been' + verb with -ing ('drawing')!",
    badge: "Formula Check",
  },
  {
    id: 2,
    question: "We use the keyword 'SINCE' when we want to tell:",
    options: [
      "The duration or how many hours it took",
      "The exact starting time, day, or date",
      "An action that stopped yesterday",
    ],
    correctIdx: 1,
    explanation: "'SINCE' points to the starting point like 8:00 AM, Monday, or yesterday!",
    badge: "Keyword Detective",
  },
  {
    id: 3,
    question: "Fill in the blank: 'The chef is tired! He _______ cooking all afternoon.'",
    options: [
      "has been",
      "have been",
      "is been",
    ],
    correctIdx: 0,
    explanation: "One chef ('He') takes 'has been'!",
    badge: "Subject Match",
  },
  {
    id: 4,
    question: "Choose the correct time word: 'The boys have been playing games _______ three hours.'",
    options: [
      "since",
      "for",
      "at",
    ],
    correctIdx: 1,
    explanation: "'Three hours' is an amount of time (duration), so we use 'for'!",
    badge: "Time Clue",
  },
];

export const Slide12FinalQuiz: React.FC<SlideProps> = ({ soundEnabled }) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [studentName, setStudentName] = useState('Super Detective');

  const currentQ = QUIZ_ITEMS[currentQIndex];
  const userChoice = selectedAnswers[currentQ.id];

  const handleSelect = (idx: number) => {
    if (userChoice !== undefined) return;

    setSelectedAnswers((prev) => ({ ...prev, [currentQ.id]: idx }));
    setShowExplanation(true);

    if (idx === currentQ.correctIdx) {
      playSound('correct', soundEnabled);
    } else {
      playSound('wrong', soundEnabled);
    }
  };

  const handleNext = () => {
    playSound('pop', soundEnabled);
    setShowExplanation(false);
    if (currentQIndex + 1 < QUIZ_ITEMS.length) {
      setCurrentQIndex((i) => i + 1);
    } else {
      setIsFinished(true);
      playSound('fanfare', soundEnabled);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
      });
    }
  };

  const handleRestart = () => {
    playSound('click', soundEnabled);
    setCurrentQIndex(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    setIsFinished(false);
  };

  const calculateScore = () => {
    return QUIZ_ITEMS.filter((q) => selectedAnswers[q.id] === q.correctIdx).length;
  };

  const score = calculateScore();

  return (
    <div className="w-full h-full flex flex-col justify-between py-1">
      {!isFinished ? (
        <>
          {/* Question Header & Progress Bar */}
          <div className="flex items-center justify-between bg-white px-4 py-2 rounded-2xl border-2 border-slate-200 shadow-xs mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-extrabold text-blue-700 bg-blue-100 px-3 py-1 rounded-xl border border-blue-300">
                Question {currentQIndex + 1} of {QUIZ_ITEMS.length}
              </span>
              <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-xl border border-amber-300 hidden sm:inline">
                {currentQ.badge}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-bold text-slate-600">
                Current Score: {score} ⭐
              </span>
              <button
                id="btn-quiz-restart"
                onClick={handleRestart}
                className="p-1 text-slate-400 hover:text-slate-700"
                title="Restart quiz"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50/70 rounded-3xl p-5 sm:p-6 border-3 border-blue-300 cartoon-shadow my-auto">
            <h3 className="text-lg sm:text-2xl font-black text-slate-800 leading-snug">
              {currentQ.question}
            </h3>

            {/* Multiple Choice Options */}
            <div className="space-y-2.5 mt-4">
              {currentQ.options.map((opt, idx) => {
                const isPicked = userChoice === idx;
                const isCorrect = idx === currentQ.correctIdx;

                let btnStyle = 'bg-white hover:bg-slate-50 border-slate-300 text-slate-800';
                if (userChoice !== undefined) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-500 text-white border-emerald-600 ring-2 ring-emerald-300';
                  } else if (isPicked) {
                    btnStyle = 'bg-rose-500 text-white border-rose-600';
                  } else {
                    btnStyle = 'bg-slate-100 text-slate-400 border-slate-200 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    id={`btn-final-quiz-opt-${idx}`}
                    onClick={() => handleSelect(idx)}
                    disabled={userChoice !== undefined}
                    className={`w-full p-3.5 sm:p-4 rounded-2xl border-2 text-left font-bold text-xs sm:text-base transition-all flex items-center justify-between cartoon-btn-shadow ${btnStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                        userChoice !== undefined && isCorrect
                          ? 'bg-white text-emerald-700'
                          : 'bg-slate-200 text-slate-700'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </div>

                    {userChoice !== undefined && (
                      <div className="shrink-0">
                        {isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        ) : isPicked ? (
                          <XCircle className="w-5 h-5 text-white" />
                        ) : null}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation & Next button */}
            {showExplanation && (
              <div className="mt-4 pt-3 border-t border-blue-200/60 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-xs sm:text-sm font-bold text-slate-700">
                  💡 {currentQ.explanation}
                </p>
                <button
                  id="btn-next-quiz-question"
                  onClick={handleNext}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm rounded-2xl border-2 border-blue-700 cartoon-btn-shadow transition-all shrink-0"
                >
                  {currentQIndex + 1 < QUIZ_ITEMS.length ? 'Next Question ➡️' : 'View Certificate! 🏆'}
                </button>
              </div>
            )}
          </div>

          {/* Mascot feedback */}
          <div className="flex items-center justify-center mt-2">
            <Mascot
              mood={userChoice !== undefined && userChoice === currentQ.correctIdx ? 'celebrating' : 'thinking'}
              size="sm"
              speech="Take your time! Read each choice carefully like a true Detective!"
            />
          </div>
        </>
      ) : (
        /* Certificate & Final Victory Screen */
        <div className="my-auto flex flex-col items-center">
          {/* Printable / Viewable Certificate Card */}
          <div className="w-full max-w-xl bg-gradient-to-br from-amber-50 via-white to-amber-50 rounded-3xl p-6 sm:p-8 border-4 border-amber-400 cartoon-shadow text-center relative overflow-hidden">
            {/* Corner Decorative Ribbons */}
            <div className="absolute top-2 left-2 text-2xl">🌟</div>
            <div className="absolute top-2 right-2 text-2xl">🌟</div>

            <div className="w-16 h-16 bg-amber-400 text-amber-950 rounded-full flex items-center justify-center mx-auto mb-2 border-2 border-amber-600 shadow-md animate-bounce">
              <Award className="w-9 h-9" />
            </div>

            <span className="text-xs font-black uppercase tracking-widest text-amber-700 bg-amber-200/80 px-4 py-1 rounded-full border border-amber-300">
              Certificate of Achievement
            </span>

            <h3 className="text-2xl sm:text-3xl font-black text-slate-800 mt-2">
              Time Detective Grammar Master!
            </h3>

            <p className="text-xs sm:text-sm text-slate-500 font-bold mt-1">
              Presented for successfully mastering the Present Perfect Continuous Tense
            </p>

            {/* Editable Student Name */}
            <div className="my-3 max-w-xs mx-auto">
              <label htmlFor="student-name-input" className="text-[11px] font-bold text-slate-400 uppercase">
                Student Name / Class:
              </label>
              <input
                id="student-name-input"
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full text-center text-lg sm:text-xl font-black text-blue-900 border-b-2 border-blue-400 bg-transparent py-1 focus:outline-hidden focus:border-blue-600"
                placeholder="Enter Your Name"
              />
            </div>

            {/* Score & Badges */}
            <div className="flex items-center justify-center gap-3 my-3">
              <div className="px-4 py-1.5 bg-emerald-100 text-emerald-950 border border-emerald-300 rounded-xl text-xs sm:text-sm font-black">
                Score: {score} / {QUIZ_ITEMS.length} Questions Correct ({Math.round((score / QUIZ_ITEMS.length) * 100)}%)
              </div>
              <div className="px-4 py-1.5 bg-purple-100 text-purple-950 border border-purple-300 rounded-xl text-xs sm:text-sm font-black">
                Level: Primary Year 4, 5 & 6
              </div>
            </div>

            <p className="text-xs text-slate-600 font-medium italic">
              "Has successfully understood continuous actions, have/has been, and time clues!"
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 mt-4">
            <button
              id="btn-print-certificate"
              onClick={() => {
                playSound('pop', soundEnabled);
                window.print();
              }}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs sm:text-sm rounded-2xl border-2 border-blue-700 cartoon-btn-shadow transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print Certificate 🖨️</span>
            </button>

            <button
              id="btn-retake-quiz"
              onClick={handleRestart}
              className="flex items-center gap-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-amber-950 font-black text-xs sm:text-sm rounded-2xl border-2 border-amber-600 cartoon-btn-shadow transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Quiz 🔄</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
