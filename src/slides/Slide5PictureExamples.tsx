import React, { useState } from 'react';
import { Volume2, Sparkles, CheckCircle2 } from 'lucide-react';
import { playSound } from '../utils/audio';
import { speakText } from '../utils/speech';

interface SlideProps {
  soundEnabled: boolean;
}

export const Slide5PictureExamples: React.FC<SlideProps> = ({ soundEnabled }) => {
  const [selectedExample, setSelectedExample] = useState<number>(0);

  const examples = [
    {
      id: 0,
      title: "The Sleeping Kitten",
      subject: "Mimi the cat",
      verb: "has been sleeping",
      detail: "since 1 o'clock.",
      sentence: "Mimi the cat has been sleeping since 1 o'clock.",
      themeColor: "from-amber-100 to-orange-100 border-amber-300",
      accentBg: "bg-amber-500",
      emoji: "🐱💤",
      illustration: (
        <svg viewBox="0 0 100 80" className="w-24 h-20 sm:w-28 sm:h-24">
          <ellipse cx="50" cy="55" rx="38" ry="18" fill="#FED7AA" />
          <ellipse cx="32" cy="45" rx="20" ry="18" fill="#FDBA74" />
          {/* Ears */}
          <polygon points="18,34 26,18 36,32" fill="#FB923C" />
          <polygon points="34,32 44,18 48,34" fill="#FB923C" />
          {/* Eyes closed sleeping */}
          <path d="M24 45 Q28 50 32 45" fill="none" stroke="#7C2D12" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M36 45 Q40 50 44 45" fill="none" stroke="#7C2D12" strokeWidth="2.5" strokeLinecap="round" />
          {/* Nose & Whiskers */}
          <polygon points="32,50 36,50 34,53" fill="#EF4444" />
          <line x1="16" y1="48" x2="28" y2="50" stroke="#7C2D12" strokeWidth="1.5" />
          <line x1="16" y1="53" x2="28" y2="53" stroke="#7C2D12" strokeWidth="1.5" />
          {/* Zzz floating */}
          <text x="65" y="30" fill="#F59E0B" fontSize="14" fontWeight="bold">Z</text>
          <text x="75" y="20" fill="#F59E0B" fontSize="18" fontWeight="bold">Z</text>
        </svg>
      ),
      note: "Started sleeping at 1:00... and Mimi is still snoozing right now!"
    },
    {
      id: 1,
      title: "Chef Ben Baking",
      subject: "Chef Ben",
      verb: "has been baking",
      detail: "cookies for 30 minutes.",
      sentence: "Chef Ben has been baking cookies for 30 minutes.",
      themeColor: "from-rose-100 to-pink-100 border-rose-300",
      accentBg: "bg-rose-500",
      emoji: "🍪👨‍🍳",
      illustration: (
        <svg viewBox="0 0 100 80" className="w-24 h-20 sm:w-28 sm:h-24">
          {/* Chef Hat */}
          <path d="M35 32 C30 18, 70 18, 65 32 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
          <circle cx="50" cy="22" r="14" fill="#FFFFFF" />
          <rect x="36" y="30" width="28" height="6" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
          {/* Face */}
          <circle cx="50" cy="45" r="14" fill="#FDE047" />
          <circle cx="45" cy="43" r="2" fill="#1E293B" />
          <circle cx="55" cy="43" r="2" fill="#1E293B" />
          <path d="M46 50 Q50 55 54 50" fill="none" stroke="#B45309" strokeWidth="2" strokeLinecap="round" />
          {/* Apron */}
          <path d="M38 58 L62 58 L66 75 L34 75 Z" fill="#EF4444" />
          {/* Cookie Tray */}
          <rect x="25" y="65" width="50" height="8" rx="2" fill="#94A3B8" />
          <circle cx="36" cy="69" r="3" fill="#B45309" />
          <circle cx="50" cy="69" r="3" fill="#B45309" />
          <circle cx="64" cy="69" r="3" fill="#B45309" />
        </svg>
      ),
      note: "Yummy cookies are still inside the hot oven right now!"
    },
    {
      id: 2,
      title: "Playground Match",
      subject: "The pupils",
      verb: "have been playing",
      detail: "football for an hour.",
      sentence: "The pupils have been playing football for an hour.",
      themeColor: "from-emerald-100 to-teal-100 border-emerald-300",
      accentBg: "bg-emerald-500",
      emoji: "⚽🏃‍♂️",
      illustration: (
        <svg viewBox="0 0 100 80" className="w-24 h-20 sm:w-28 sm:h-24">
          {/* Football */}
          <circle cx="35" cy="55" r="12" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
          <polygon points="35,47 40,51 38,57 32,57 30,51" fill="#1E293B" />
          {/* Runner */}
          <circle cx="65" cy="28" r="8" fill="#FDE047" />
          <path d="M65 36 L62 52 L55 68" fill="none" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" />
          <path d="M62 52 L72 65" fill="none" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" />
          {/* Arms running */}
          <path d="M52 42 L65 40 L76 46" fill="none" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" />
          {/* Motion lines */}
          <line x1="18" y1="52" x2="10" y2="52" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
          <line x1="18" y1="58" x2="8" y2="58" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      note: "They started an hour ago... and they are still kicking the ball!"
    }
  ];

  const current = examples[selectedExample];

  const handlePlayAudio = (text: string) => {
    playSound('pop', soundEnabled);
    speakText(text);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between py-1">
      {/* 3 Story Selector Tabs */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-2">
        {examples.map((item, idx) => {
          const isSelected = selectedExample === idx;
          return (
            <button
              key={item.id}
              id={`btn-example-tab-${idx}`}
              onClick={() => {
                playSound('click', soundEnabled);
                setSelectedExample(idx);
              }}
              className={`p-2.5 sm:p-3 rounded-2xl border-2 transition-all flex items-center justify-center gap-2 font-bold text-xs sm:text-sm cartoon-btn-shadow ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-700 scale-102'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              <span className="text-base sm:text-lg">{item.emoji}</span>
              <span className="truncate">{item.title}</span>
            </button>
          );
        })}
      </div>

      {/* Featured Example Hero Card */}
      <div className={`bg-gradient-to-br ${current.themeColor} rounded-3xl p-4 sm:p-6 border-2 cartoon-shadow my-auto flex flex-col sm:flex-row items-center gap-5 sm:gap-7`}>
        <div className="p-3 bg-white/90 rounded-3xl border-2 border-white shadow-md flex items-center justify-center shrink-0">
          {current.illustration}
        </div>

        <div className="flex-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
            <span className="px-3 py-1 bg-white/80 text-slate-800 font-extrabold text-xs rounded-full shadow-xs border border-slate-200">
              {current.title}
            </span>
            <button
              id="btn-speak-example"
              onClick={() => handlePlayAudio(current.sentence)}
              className="p-1.5 bg-white hover:bg-slate-100 text-blue-600 rounded-full border border-blue-200 shadow-xs transition-transform active:scale-95"
              title="Listen to sentence"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          {/* Grammar Break Down Boxes */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 sm:gap-2 my-2">
            <span className="px-3 py-1.5 bg-amber-300 text-amber-950 font-black rounded-xl text-sm sm:text-base">
              {current.subject}
            </span>
            <span className="text-slate-400 font-black">+</span>
            <span className="px-3 py-1.5 bg-emerald-400 text-emerald-950 font-black rounded-xl text-sm sm:text-base">
              {current.verb}
            </span>
            <span className="text-slate-400 font-black">+</span>
            <span className="px-3 py-1.5 bg-blue-300 text-blue-950 font-bold rounded-xl text-sm sm:text-base">
              {current.detail}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 font-bold mt-2 flex items-center justify-center sm:justify-start gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{current.note}</span>
          </p>
        </div>
      </div>

      {/* Interactive Helper Banner */}
      <div className="bg-white rounded-2xl p-3 border border-slate-200 flex items-center justify-between text-xs sm:text-sm text-slate-600 font-medium">
        <span>💡 Tap each of the 3 tabs above to see different subjects and actions!</span>
        <span className="font-bold text-blue-600">Scene {selectedExample + 1} of 3</span>
      </div>
    </div>
  );
};
