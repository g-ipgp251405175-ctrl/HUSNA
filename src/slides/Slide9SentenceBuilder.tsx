import React, { useState } from 'react';
import { Mascot } from '../components/Mascot';
import { Sparkles, Check, RotateCcw, ArrowRight, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../utils/audio';

interface SlideProps {
  soundEnabled: boolean;
}

interface Puzzle {
  id: number;
  prompt: string;
  cartoon: string;
  target: string[];
  words: string[];
}

const PUZZLES: Puzzle[] = [
  {
    id: 1,
    prompt: "Build the sentence about Lily studying for her English exam!",
    cartoon: "👧📚",
    target: ["She", "has", "been", "studying", "since morning"],
    words: ["studying", "She", "since morning", "been", "has"],
  },
  {
    id: 2,
    prompt: "Build the sentence about the friends waiting for the school bus!",
    cartoon: "🚌🎒",
    target: ["We", "have", "been", "waiting", "for thirty minutes"],
    words: ["for thirty minutes", "have", "We", "waiting", "been"],
  }
];

export const Slide9SentenceBuilder: React.FC<SlideProps> = ({ soundEnabled }) => {
  const [currentPuzzleIdx, setCurrentPuzzleIdx] = useState(0);
  const [assembled, setAssembled] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const puzzle = PUZZLES[currentPuzzleIdx];

  const availableWords = puzzle.words.filter((word) => {
    // Count how many times it was picked vs total in puzzle words
    const pickedCount = assembled.filter((w) => w === word).length;
    const totalCount = puzzle.words.filter((w) => w === word).length;
    return pickedCount < totalCount;
  });

  const handlePickWord = (word: string) => {
    playSound('pop', soundEnabled);
    setIsCorrect(null);
    setAssembled([...assembled, word]);
  };

  const handleRemoveWord = (indexToRemove: number) => {
    playSound('click', soundEnabled);
    setIsCorrect(null);
    setAssembled(assembled.filter((_, idx) => idx !== indexToRemove));
  };

  const handleCheck = () => {
    const isMatch =
      assembled.length === puzzle.target.length &&
      assembled.every((word, idx) => word === puzzle.target[idx]);

    if (isMatch) {
      playSound('fanfare', soundEnabled);
      setIsCorrect(true);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });
    } else {
      playSound('wrong', soundEnabled);
      setIsCorrect(false);
    }
  };

  const handleResetPuzzle = () => {
    playSound('click', soundEnabled);
    setAssembled([]);
    setIsCorrect(null);
  };

  const handleNextPuzzle = () => {
    playSound('whoosh', soundEnabled);
    const nextIdx = (currentPuzzleIdx + 1) % PUZZLES.length;
    setCurrentPuzzleIdx(nextIdx);
    setAssembled([]);
    setIsCorrect(null);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between py-1">
      {/* Top Banner & Switcher */}
      <div className="flex items-center justify-between bg-white px-4 py-2 rounded-2xl border-2 border-slate-200 shadow-xs mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">{puzzle.cartoon}</span>
          <span className="text-xs sm:text-sm font-bold text-slate-700">
            Puzzle {currentPuzzleIdx + 1} of {PUZZLES.length}: {puzzle.prompt}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            id="btn-switch-puzzle"
            onClick={handleNextPuzzle}
            className="px-3 py-1 bg-sky-100 hover:bg-sky-200 text-sky-800 rounded-xl text-xs font-bold border border-sky-300"
          >
            Switch Puzzle 🔄
          </button>
          <button
            id="btn-reset-sentence"
            onClick={handleResetPuzzle}
            className="p-1 text-slate-500 hover:text-slate-800"
            title="Reset words"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Assembly Area (Train Track / Sentence Slots) */}
      <div className="bg-gradient-to-b from-blue-50 to-indigo-50/50 rounded-3xl p-4 sm:p-5 border-3 border-dashed border-blue-300 cartoon-shadow my-auto min-h-[140px] sm:min-h-[160px] flex flex-col justify-between">
        <div className="flex items-center justify-between text-xs font-extrabold text-blue-600">
          <span>Tap blocks to add them in order:</span>
          <span>
            {assembled.length} of {puzzle.target.length} words placed
          </span>
        </div>

        {/* Selected Word Blocks in Sentence Line */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 my-3 min-h-[48px]">
          {assembled.length === 0 ? (
            <div className="text-slate-400 font-bold italic text-xs sm:text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Click the word chips below to start building! (Subject first!)</span>
            </div>
          ) : (
            assembled.map((word, idx) => (
              <button
                key={`${word}-${idx}`}
                id={`btn-assembled-word-${idx}`}
                onClick={() => handleRemoveWord(idx)}
                className="px-3 sm:px-4 py-2 bg-white hover:bg-rose-50 text-blue-900 border-2 border-blue-400 hover:border-rose-400 rounded-2xl font-black text-xs sm:text-base cartoon-btn-shadow transition-all active:scale-95 group flex items-center gap-1.5"
                title="Click to remove"
              >
                <span>{word}</span>
                <span className="text-slate-300 group-hover:text-rose-500 text-xs">✕</span>
              </button>
            ))
          )}
        </div>

        {/* Check & Result Message */}
        <div className="flex items-center justify-between pt-2 border-t border-blue-200/60">
          <div className="text-xs sm:text-sm font-bold">
            {isCorrect === true && (
              <span className="text-emerald-700 flex items-center gap-1.5">
                <Check className="w-5 h-5 text-emerald-600" />
                Awesome! You built a 100% correct sentence! ⭐
              </span>
            )}
            {isCorrect === false && (
              <span className="text-rose-600">
                Not quite right! Remember the formula: Subject + have/has + been + verb-ing!
              </span>
            )}
          </div>

          <button
            id="btn-check-sentence"
            onClick={handleCheck}
            disabled={assembled.length === 0}
            className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-extrabold text-xs sm:text-sm rounded-2xl border-2 border-emerald-600 cartoon-btn-shadow transition-all"
          >
            Check Sentence ✅
          </button>
        </div>
      </div>

      {/* Available Word Chips Tray */}
      <div className="bg-white rounded-2xl p-3 sm:p-4 border-2 border-slate-200 cartoon-shadow">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
          Word Bank (Tap to add):
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {availableWords.map((word, idx) => (
            <button
              key={`${word}-${idx}`}
              id={`btn-available-word-${idx}`}
              onClick={() => handlePickWord(word)}
              className="px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-950 border-2 border-amber-300 rounded-2xl font-black text-xs sm:text-sm cartoon-btn-shadow transition-all active:scale-95"
            >
              {word} +
            </button>
          ))}
          {availableWords.length === 0 && (
            <span className="text-xs font-bold text-slate-400">All words have been placed!</span>
          )}
        </div>
      </div>

      {/* Mascot cheer */}
      <div className="flex items-center justify-center mt-2">
        <Mascot
          mood={isCorrect ? 'celebrating' : 'happy'}
          size="sm"
          speech="Secret Recipe Chant: 1. Subject, 2. have/has, 3. been, 4. verb-ing, 5. time clue!"
        />
      </div>
    </div>
  );
};
