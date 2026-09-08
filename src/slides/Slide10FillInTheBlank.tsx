import React, { useState } from 'react';
import { Mascot } from '../components/Mascot';
import { CheckCircle2, XCircle, Sparkles, Award, RotateCcw } from 'lucide-react';
import { playSound } from '../utils/audio';

interface SlideProps {
  soundEnabled: boolean;
}

interface BlankQuestion {
  id: number;
  subject: string;
  verbBase: string;
  sentenceBefore: string;
  sentenceAfter: string;
  timeClue: string;
  options: { text: string; correct: boolean; hint: string }[];
  icon: string;
}

const QUESTIONS: BlankQuestion[] = [
  {
    id: 1,
    subject: "Tom and Jerry (2 characters)",
    verbBase: "chase",
    sentenceBefore: "Tom and Jerry",
    sentenceAfter: "each other for ten minutes!",
    timeClue: "Duration: 10 minutes",
    icon: "🐱🐭",
    options: [
      { text: "has been chasing", correct: false, hint: "'Tom and Jerry' is 2 people (plural), so we need 'have'!" },
      { text: "have been chasing", correct: true, hint: "Correct! Plural subject + have been + chasing! 🎉" },
      { text: "have chasing", correct: false, hint: "Don't forget the bridge word 'been'!" },
    ],
  },
  {
    id: 2,
    subject: "The baby (1 person)",
    verbBase: "sleep",
    sentenceBefore: "The cute baby",
    sentenceAfter: "peacefully since 2 o'clock.",
    timeClue: "Starting point: 2 o'clock",
    icon: "👶🍼",
    options: [
      { text: "has been sleeping", correct: true, hint: "Superb! 'The baby' is 1 person ('has') + been + sleeping! 🎉" },
      { text: "have been sleeping", correct: false, hint: "Remember: 1 baby takes 'has', not 'have'!" },
      { text: "has be sleeping", correct: false, hint: "The bridge word must be 'been', not 'be'!" },
    ],
  },
  {
    id: 3,
    subject: "I (First person)",
    verbBase: "learn",
    sentenceBefore: "I",
    sentenceAfter: "English for three years.",
    timeClue: "Duration: 3 years",
    icon: "🎒📖",
    options: [
      { text: "has been learning", correct: false, hint: "'I' always pairs with 'have', never 'has'!" },
      { text: "have been learning", correct: true, hint: "Spot on! 'I have been learning' is 100% correct! 🎉" },
      { text: "have been learn", correct: false, hint: "Remember the action word needs '-ing'!" },
    ],
  },
];

export const Slide10FillInTheBlank: React.FC<SlideProps> = ({ soundEnabled }) => {
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

  const question = QUESTIONS[activeQuestionIdx];
  const selectedOptionIdx = selectedAnswers[question.id] ?? null;

  const handleChoose = (idx: number, isCorrect: boolean) => {
    if (selectedOptionIdx !== null) return;

    setSelectedAnswers((prev) => ({ ...prev, [question.id]: idx }));
    if (isCorrect) {
      playSound('correct', soundEnabled);
    } else {
      playSound('wrong', soundEnabled);
    }
  };

  const handleNextQuestion = () => {
    playSound('whoosh', soundEnabled);
    setActiveQuestionIdx((i) => (i + 1) % QUESTIONS.length);
  };

  const handleReset = () => {
    playSound('pop', soundEnabled);
    setSelectedAnswers({});
    setActiveQuestionIdx(0);
  };

  const totalAnswered = Object.keys(selectedAnswers).length;
  const correctCount = QUESTIONS.filter(
    (q) => selectedAnswers[q.id] !== undefined && q.options[selectedAnswers[q.id]].correct
  ).length;

  return (
    <div className="w-full h-full flex flex-col justify-between py-1">
      {/* Question Selector & Score header */}
      <div className="flex items-center justify-between bg-white px-4 py-2 rounded-2xl border-2 border-slate-200 shadow-xs mb-2">
        <div className="flex items-center gap-2">
          {QUESTIONS.map((q, idx) => {
            const ans = selectedAnswers[q.id];
            const isDone = ans !== undefined;
            const isCorrect = isDone && q.options[ans].correct;

            return (
              <button
                key={q.id}
                id={`btn-mission-${q.id}`}
                onClick={() => {
                  playSound('click', soundEnabled);
                  setActiveQuestionIdx(idx);
                }}
                className={`px-3 py-1 rounded-xl text-xs sm:text-sm font-extrabold border-2 transition-all ${
                  activeQuestionIdx === idx
                    ? 'bg-blue-600 text-white border-blue-700 scale-105'
                    : isDone
                    ? isCorrect
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      : 'bg-rose-100 text-rose-800 border-rose-300'
                    : 'bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                Mission {q.id} {isDone ? (isCorrect ? '✅' : '❌') : ''}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm font-bold bg-amber-100 text-amber-900 px-3 py-1 rounded-xl border border-amber-300">
            Solved: {correctCount}/{QUESTIONS.length}
          </span>
          <button
            id="btn-reset-fill-in"
            onClick={handleReset}
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg"
            title="Reset answers"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Fill in the Blank Card */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-5 sm:p-6 border-3 border-blue-300 cartoon-shadow my-auto text-center">
        <div className="text-3xl mb-1">{question.icon}</div>
        <span className="text-xs font-black uppercase tracking-wider text-blue-700 bg-white px-3 py-1 rounded-full border border-blue-200">
          Clue: {question.subject} • Verb: ({question.verbBase})
        </span>

        {/* The Incomplete Sentence with Blank Hole */}
        <h3 className="text-xl sm:text-3xl font-black text-slate-800 my-4 leading-relaxed">
          {question.sentenceBefore}{' '}
          <span className="inline-block px-4 py-1 rounded-2xl bg-amber-200 text-amber-950 border-2 border-dashed border-amber-500 shadow-inner">
            {selectedOptionIdx !== null
              ? question.options[selectedOptionIdx].text
              : '__________ ?'}
          </span>{' '}
          {question.sentenceAfter}
        </h3>

        <p className="text-xs sm:text-sm font-bold text-slate-500">
          Which helping words complete the continuous action?
        </p>
      </div>

      {/* 3 Choice Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 my-2">
        {question.options.map((opt, idx) => {
          const isChosen = selectedOptionIdx === idx;
          return (
            <button
              key={idx}
              id={`btn-blank-option-${idx}`}
              onClick={() => handleChoose(idx, opt.correct)}
              disabled={selectedOptionIdx !== null}
              className={`p-3 sm:p-4 rounded-2xl border-2 font-black text-sm sm:text-base transition-all cartoon-btn-shadow text-center active:scale-95 ${
                isChosen
                  ? opt.correct
                    ? 'bg-emerald-500 text-white border-emerald-600'
                    : 'bg-rose-500 text-white border-rose-600'
                  : selectedOptionIdx !== null && opt.correct
                  ? 'bg-emerald-100 text-emerald-950 border-emerald-300'
                  : 'bg-white hover:bg-sky-50 text-slate-800 border-slate-300 hover:border-blue-400'
              }`}
            >
              {opt.text}
            </button>
          );
        })}
      </div>

      {/* Feedback Banner */}
      {selectedOptionIdx !== null && (
        <div
          className={`p-3 rounded-2xl text-xs sm:text-sm font-bold border flex items-center justify-between gap-2 ${
            question.options[selectedOptionIdx].correct
              ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
              : 'bg-rose-100 text-rose-900 border-rose-300'
          }`}
        >
          <span>{question.options[selectedOptionIdx].hint}</span>
          <button
            id="btn-next-mission"
            onClick={handleNextQuestion}
            className="px-3 py-1 bg-white text-slate-800 rounded-xl text-xs font-bold border border-slate-300 shadow-xs shrink-0"
          >
            Next Mission ➡️
          </button>
        </div>
      )}

      {/* Bottom Mascot */}
      <div className="flex items-center justify-center">
        <Mascot
          mood={selectedOptionIdx !== null && question.options[selectedOptionIdx].correct ? 'celebrating' : 'thinking'}
          size="sm"
          speech="Step 1: Check if the subject is singular or plural! Step 2: Add been! Step 3: Add -ing!"
        />
      </div>
    </div>
  );
};
