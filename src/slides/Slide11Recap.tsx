import React, { useState } from 'react';
import { Mascot } from '../components/Mascot';
import { Sparkles, Check, CheckCircle2, Bookmark, ArrowRight, Volume2 } from 'lucide-react';
import { playSound } from '../utils/audio';
import { speakText } from '../utils/speech';

interface SlideProps {
  soundEnabled: boolean;
  onNext: () => void;
}

export const Slide11Recap: React.FC<SlideProps> = ({ soundEnabled, onNext }) => {
  const [checkedRules, setCheckedRules] = useState<number[]>([1]);

  const rules = [
    {
      id: 1,
      title: "1. The Big Concept ⏳",
      desc: "Actions that started in the past and are STILL happening right now at this moment!",
      tag: "Still Continuing",
      color: "bg-blue-50 border-blue-300 text-blue-950",
    },
    {
      id: 2,
      title: "2. The Magic Formula 🧪",
      desc: "Subject + have / has + been + verb-ING (Ali has been studying).",
      tag: "4 Parts",
      color: "bg-emerald-50 border-emerald-300 text-emerald-950",
    },
    {
      id: 3,
      title: "3. Have vs Has Buddies 🤝",
      desc: "He / She / It -> HAS BEEN. I / You / We / They -> HAVE BEEN.",
      tag: "Singular vs Plural",
      color: "bg-amber-50 border-amber-300 text-amber-950",
    },
    {
      id: 4,
      title: "4. Time Clues: For & Since 📍",
      desc: "FOR = How long (for 2 hours). SINCE = Starting point (since 8 AM, since Monday).",
      tag: "Time Clues",
      color: "bg-purple-50 border-purple-300 text-purple-950",
    },
  ];

  const toggleCheck = (id: number) => {
    playSound('pop', soundEnabled);
    if (checkedRules.includes(id)) {
      setCheckedRules(checkedRules.filter((r) => r !== id));
    } else {
      setCheckedRules([...checkedRules, id]);
    }
  };

  const handleReadRecap = () => {
    playSound('click', soundEnabled);
    speakText(
      "Present Perfect Continuous recap: Started in past, still happening now. Formula: Subject plus have or has, plus been, plus verb with -ing. For counts how long, and Since names when it started."
    );
  };

  return (
    <div className="w-full h-full flex flex-col justify-between py-1">
      {/* Top Banner */}
      <div className="flex items-center justify-between bg-white px-4 py-2 rounded-2xl border-2 border-slate-200 shadow-xs mb-2">
        <div className="flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-amber-500 fill-amber-300" />
          <span className="font-extrabold text-sm sm:text-base text-slate-800">
            Detective Golden Rules: Check all 4 to unlock the Quiz!
          </span>
        </div>
        <button
          id="btn-read-full-recap"
          onClick={handleReadRecap}
          className="flex items-center gap-1 px-3 py-1 bg-sky-100 hover:bg-sky-200 text-sky-800 rounded-xl text-xs font-bold border border-sky-300"
        >
          <Volume2 className="w-4 h-4" />
          <span>Listen Summary</span>
        </button>
      </div>

      {/* 4 Recap Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-auto">
        {rules.map((rule) => {
          const isDone = checkedRules.includes(rule.id);
          return (
            <button
              key={rule.id}
              id={`btn-recap-rule-${rule.id}`}
              onClick={() => toggleCheck(rule.id)}
              className={`p-4 rounded-3xl border-2 text-left transition-all cartoon-shadow flex flex-col justify-between ${
                isDone
                  ? `${rule.color} ring-2 ring-emerald-400 scale-101`
                  : 'bg-white border-slate-200 opacity-75 hover:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-black text-base sm:text-lg">{rule.title}</h4>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all ${
                    isDone
                      ? 'bg-emerald-500 border-emerald-600 text-white shadow-xs'
                      : 'border-slate-300 bg-slate-100 text-transparent'
                  }`}
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
              </div>
              <p className="text-xs sm:text-sm font-semibold opacity-90 leading-relaxed">
                {rule.desc}
              </p>
              <div className="mt-2 pt-2 border-t border-black/10 flex justify-between items-center text-[11px] font-bold">
                <span className="bg-white/80 px-2 py-0.5 rounded-full border border-black/10">
                  {rule.tag}
                </span>
                <span className="text-slate-500 underline">
                  {isDone ? 'Reviewed ✓' : 'Tap to mark reviewed'}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Mascot & Next Slide Prompt */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-2 bg-slate-50 p-3 rounded-2xl border border-slate-200">
        <Mascot
          mood="celebrating"
          size="sm"
          speech="You are now officially ready for the Final Mini Quiz! Let's get top marks!"
        />

        <button
          id="btn-go-to-quiz"
          onClick={() => {
            playSound('fanfare', soundEnabled);
            onNext();
          }}
          className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-sm sm:text-base rounded-2xl border-2 border-amber-600 cartoon-btn-shadow transition-all shrink-0 animate-wiggle"
        >
          <span>Take Final Challenge! 🏆</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
