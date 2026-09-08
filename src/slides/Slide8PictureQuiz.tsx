import React, { useState } from 'react';
import { Mascot } from '../components/Mascot';
import { CheckCircle2, XCircle, Sparkles, HelpCircle } from 'lucide-react';
import { playSound } from '../utils/audio';

interface SlideProps {
  soundEnabled: boolean;
}

interface PictureCase {
  id: number;
  title: string;
  badge: string;
  scenario: string;
  illustration: React.ReactNode;
  question: string;
  options: { text: string; correct: boolean; feedback: string }[];
}

export const Slide8PictureQuiz: React.FC<SlideProps> = ({ soundEnabled }) => {
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const cases: PictureCase[] = [
    {
      id: 1,
      title: "Case 1: Bookworm Dan",
      badge: "Clue: 1 Person (Dan) + Started at 9 AM",
      scenario: "Dan sat down with his storybook at 9:00 AM. It is now 11:00 AM, and he is STILL reading happily!",
      illustration: (
        <svg viewBox="0 0 100 80" className="w-28 h-24">
          {/* Desk */}
          <rect x="15" y="60" width="70" height="6" rx="2" fill="#78350F" />
          {/* Dan's Body */}
          <circle cx="50" cy="30" r="14" fill="#FED7AA" />
          {/* Hair */}
          <path d="M38 28 C42 16, 58 16, 62 28 Z" fill="#451A03" />
          {/* Eyes & Smile */}
          <circle cx="45" cy="30" r="1.8" fill="#1E293B" />
          <circle cx="55" cy="30" r="1.8" fill="#1E293B" />
          <path d="M47 35 Q50 38 53 35" fill="none" stroke="#7C2D12" strokeWidth="1.5" strokeLinecap="round" />
          {/* Blue Shirt */}
          <path d="M38 44 L62 44 L66 60 L34 60 Z" fill="#3B82F6" />
          {/* Open Book */}
          <polygon points="32,56 50,58 50,66 32,63" fill="#FFFFFF" stroke="#CBD5E1" />
          <polygon points="50,58 68,56 68,63 50,66" fill="#FFFFFF" stroke="#CBD5E1" />
          <line x1="50" y1="58" x2="50" y2="66" stroke="#EF4444" strokeWidth="2" />
          {/* Clock on wall */}
          <circle cx="80" cy="22" r="9" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
          <line x1="80" y1="22" x2="80" y2="16" stroke="#713F12" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="80" y1="22" x2="85" y2="22" stroke="#713F12" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      question: "Which sentence matches Dan's picture correctly?",
      options: [
        {
          text: "Dan has been read since 9 AM.",
          correct: false,
          feedback: "Remember: The verb needs -ING! It must be 'reading', not 'read'."
        },
        {
          text: "Dan has been reading since 9 AM.",
          correct: true,
          feedback: "Spot on! Dan is 1 person ('has'), with 'been', verb-ING, and 'since 9 AM'!"
        },
        {
          text: "Dan have been reading for 9 AM.",
          correct: false,
          feedback: "Oops! Dan is singular so we use 'has', and 9 AM is a starting point so we use 'since'!"
        }
      ]
    },
    {
      id: 2,
      title: "Case 2: Playful Puppies",
      badge: "Clue: More than 1 puppy (Plural) + Duration (1 hour)",
      scenario: "Look at the two cute puppies! They started chasing the red ball 1 hour ago and are STILL playing!",
      illustration: (
        <svg viewBox="0 0 100 80" className="w-28 h-24">
          {/* Puppy 1 */}
          <ellipse cx="32" cy="50" rx="16" ry="12" fill="#D97706" />
          <circle cx="22" cy="40" r="10" fill="#D97706" />
          <polygon points="14,35 18,25 22,35" fill="#92400E" />
          <circle cx="19" cy="39" r="1.5" fill="#000000" />
          <circle cx="15" cy="42" r="1.5" fill="#000000" />
          {/* Puppy 2 */}
          <ellipse cx="68" cy="50" rx="16" ry="12" fill="#FBBF24" />
          <circle cx="78" cy="40" r="10" fill="#FBBF24" />
          <polygon points="78,35 82,25 86,35" fill="#B45309" />
          <circle cx="81" cy="39" r="1.5" fill="#000000" />
          {/* Red Ball in middle */}
          <circle cx="50" cy="56" r="7" fill="#EF4444" stroke="#B91C1C" strokeWidth="1.5" />
          <path d="M46 54 Q50 50 54 54" stroke="#FFFFFF" strokeWidth="1.2" fill="none" />
        </svg>
      ),
      question: "Which sentence matches the puppies correctly?",
      options: [
        {
          text: "The puppies has been playing for an hour.",
          correct: false,
          feedback: "Watch out! 'The puppies' is plural (more than 1), so use 'have been'!"
        },
        {
          text: "The puppies have been playing for an hour.",
          correct: true,
          feedback: "Brilliant! Plural subject ('puppies') + have been + playing + for 1 hour!"
        },
        {
          text: "The puppies have be play since an hour.",
          correct: false,
          feedback: "Not quite! You need 'been' and '-ing', and 'for' for 1 hour of duration."
        }
      ]
    }
  ];

  const current = cases[currentCaseIndex];

  const handleSelectOption = (idx: number, isCorrect: boolean) => {
    setSelectedOption(idx);
    if (isCorrect) {
      playSound('correct', soundEnabled);
    } else {
      playSound('wrong', soundEnabled);
    }
  };

  const handleSwitchCase = (idx: number) => {
    playSound('pop', soundEnabled);
    setCurrentCaseIndex(idx);
    setSelectedOption(null);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between py-1">
      {/* Case Switcher Tabs */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          {cases.map((c, idx) => (
            <button
              key={c.id}
              id={`btn-case-${c.id}`}
              onClick={() => handleSwitchCase(idx)}
              className={`px-4 py-1.5 rounded-2xl font-bold text-xs sm:text-sm border-2 transition-all cartoon-btn-shadow ${
                currentCaseIndex === idx
                  ? 'bg-blue-600 text-white border-blue-700'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              {c.title}
            </button>
          ))}
        </div>
        <span className="text-xs font-extrabold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 hidden sm:inline">
          {current.badge}
        </span>
      </div>

      {/* Picture & Scenario Presentation Card */}
      <div className="bg-white rounded-3xl p-3 sm:p-4 border-2 border-slate-200 cartoon-shadow flex flex-col sm:flex-row items-center gap-4 my-auto">
        <div className="bg-sky-50 rounded-2xl p-2 border-2 border-sky-200 shadow-inner flex items-center justify-center shrink-0">
          {current.illustration}
        </div>
        <div>
          <p className="text-xs font-extrabold uppercase tracking-wider text-blue-600">Scene Description:</p>
          <h4 className="text-sm sm:text-base font-bold text-slate-800 mt-0.5">
            {current.scenario}
          </h4>
          <p className="text-sm sm:text-base font-black text-amber-900 mt-2">
            ❓ {current.question}
          </p>
        </div>
      </div>

      {/* 3 Interactive Options */}
      <div className="space-y-2 my-2">
        {current.options.map((opt, idx) => {
          const isSelected = selectedOption === idx;
          return (
            <button
              key={idx}
              id={`btn-case-option-${idx}`}
              onClick={() => handleSelectOption(idx, opt.correct)}
              className={`w-full p-3 rounded-2xl border-2 text-left font-bold text-xs sm:text-sm transition-all flex items-center justify-between cartoon-btn-shadow ${
                isSelected
                  ? opt.correct
                    ? 'bg-emerald-50 text-emerald-950 border-emerald-400 ring-2 ring-emerald-200'
                    : 'bg-rose-50 text-rose-950 border-rose-400 ring-2 ring-rose-200'
                  : 'bg-slate-50 hover:bg-white text-slate-800 border-slate-200 hover:border-blue-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black ${
                  isSelected
                    ? opt.correct
                      ? 'bg-emerald-500 text-white'
                      : 'bg-rose-500 text-white'
                    : 'bg-slate-200 text-slate-700'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{opt.text}</span>
              </div>

              {isSelected && (
                <div className="shrink-0 ml-2">
                  {opt.correct ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-600" />
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback Message Bar */}
      {selectedOption !== null && (
        <div
          className={`p-3 rounded-2xl text-xs sm:text-sm font-bold border ${
            current.options[selectedOption].correct
              ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
              : 'bg-rose-100 text-rose-900 border-rose-300'
          }`}
        >
          {current.options[selectedOption].feedback}
        </div>
      )}

      {/* Bottom helper */}
      <div className="flex items-center justify-center">
        <Mascot
          mood={selectedOption !== null && current.options[selectedOption].correct ? 'celebrating' : 'thinking'}
          size="sm"
          speech="Look closely at the subject (one vs many) and whether we use FOR or SINCE!"
        />
      </div>
    </div>
  );
};
