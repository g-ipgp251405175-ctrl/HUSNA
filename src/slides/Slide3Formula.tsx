import React, { useState } from 'react';
import { Mascot } from '../components/Mascot';
import { Plus, Sparkles, Check, RefreshCw } from 'lucide-react';
import { playSound } from '../utils/audio';

interface SlideProps {
  soundEnabled: boolean;
}

export const Slide3Formula: React.FC<SlideProps> = ({ soundEnabled }) => {
  const [activeTab, setActiveTab] = useState<number | null>(null);

  const formulaParts = [
    {
      id: 1,
      name: "Subject",
      color: "bg-amber-100 border-amber-300 text-amber-900",
      badgeColor: "bg-amber-400 text-amber-950",
      example: "Ali / They / She",
      detail: "Who is doing the action? (A person, animal, or thing)",
      icon: "👤",
    },
    {
      id: 2,
      name: "have / has",
      color: "bg-blue-100 border-blue-300 text-blue-900",
      badgeColor: "bg-blue-500 text-white",
      example: "have OR has",
      detail: "The helping word! Pick 'has' for one person, 'have' for many.",
      icon: "🤝",
    },
    {
      id: 3,
      name: "been",
      color: "bg-purple-100 border-purple-300 text-purple-900",
      badgeColor: "bg-purple-500 text-white",
      example: "ALWAYS 'been'!",
      detail: "The magic bridge word! Never change it, it is always B-E-E-N.",
      icon: "🌉",
    },
    {
      id: 4,
      name: "Verb + ING",
      color: "bg-emerald-100 border-emerald-300 text-emerald-900",
      badgeColor: "bg-emerald-500 text-white",
      example: "read-ing / play-ing",
      detail: "The main action! Add -ING at the end to show it is continuing.",
      icon: "🏃‍♂️",
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between py-1">
      {/* Top Banner */}
      <div className="text-center mb-2">
        <p className="text-xs sm:text-sm font-bold text-blue-600 uppercase tracking-wider">
          The 4-Ingredient Grammar Recipe 🥪
        </p>
        <p className="text-sm sm:text-base font-semibold text-slate-600">
          Tap each ingredient block below to inspect its secret power!
        </p>
      </div>

      {/* Formula Blocks Container */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 my-auto">
        {formulaParts.map((part, index) => {
          const isSelected = activeTab === part.id;
          return (
            <div key={part.id} className="relative flex flex-col items-center">
              <button
                id={`btn-formula-part-${part.id}`}
                onClick={() => {
                  playSound('pop', soundEnabled);
                  setActiveTab(isSelected ? null : part.id);
                }}
                className={`w-full p-4 rounded-3xl border-2 text-center transition-all cartoon-shadow flex flex-col items-center justify-between min-h-[140px] sm:min-h-[160px] ${
                  isSelected
                    ? `${part.color} ring-4 ring-amber-300 scale-102`
                    : `${part.color} hover:scale-101`
                }`}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-black text-sm mb-1 bg-white/80 shadow-xs">
                  {part.icon}
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full mb-1 ${part.badgeColor}`}>
                    Part {part.id}
                  </span>
                  <h4 className="text-base sm:text-lg font-black">{part.name}</h4>
                  <p className="text-xs font-bold opacity-80 mt-1">e.g. {part.example}</p>
                </div>
                <span className="text-[11px] font-bold underline text-slate-600 mt-2">
                  {isSelected ? "Hide details ▲" : "Tap to inspect ▼"}
                </span>
              </button>

              {/* Plus icon between items for desktop */}
              {index < formulaParts.length - 1 && (
                <div className="hidden md:flex absolute -right-3.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-amber-400 border-2 border-amber-600 text-amber-950 font-black items-center justify-center z-10 text-xs shadow-sm">
                  +
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Explanatory Info Card when clicked */}
      <div className="bg-slate-50 rounded-2xl p-3 sm:p-4 border-2 border-slate-200 min-h-[72px] flex items-center justify-between gap-3">
        {activeTab ? (
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-amber-500 shrink-0" />
            <div>
              <span className="font-bold text-slate-800 text-sm sm:text-base">
                {formulaParts[activeTab - 1].name}:
              </span>{' '}
              <span className="text-xs sm:text-sm text-slate-600 font-medium">
                {formulaParts[activeTab - 1].detail}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-slate-500 text-xs sm:text-sm font-medium">
            <span>💡 Tip: Combine all 4 parts to make complete sentences like: </span>
            <strong className="text-slate-800">"They + have + been + playing"</strong>
          </div>
        )}

        <button
          id="btn-show-example-recipe"
          onClick={() => {
            playSound('correct', soundEnabled);
            setActiveTab(null);
          }}
          className="text-xs font-bold text-blue-600 hover:text-blue-800 px-3 py-1 bg-white rounded-xl border border-blue-200 shrink-0"
        >
          View Full Recipe
        </button>
      </div>

      {/* Interactive Complete Sentence Bar */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl p-3 sm:p-4 shadow-md flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-center">
        <span className="bg-amber-400 text-amber-950 px-3 py-1 rounded-xl font-black text-sm sm:text-base">
          Ali
        </span>
        <span className="text-lg font-black">+</span>
        <span className="bg-blue-400 text-blue-950 px-3 py-1 rounded-xl font-black text-sm sm:text-base">
          has
        </span>
        <span className="text-lg font-black">+</span>
        <span className="bg-purple-300 text-purple-950 px-3 py-1 rounded-xl font-black text-sm sm:text-base">
          been
        </span>
        <span className="text-lg font-black">+</span>
        <span className="bg-emerald-400 text-emerald-950 px-3 py-1 rounded-xl font-black text-sm sm:text-base">
          sleeping
        </span>
        <span className="text-sm font-semibold opacity-90 hidden sm:inline ml-2">
          = "Ali has been sleeping!" 😴
        </span>
      </div>
    </div>
  );
};
