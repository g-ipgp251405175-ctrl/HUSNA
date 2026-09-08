import React, { useState } from 'react';
import { Mascot } from '../components/Mascot';
import { Sparkles, Compass, Award, ArrowRight, Play } from 'lucide-react';
import { playSound } from '../utils/audio';

interface SlideProps {
  soundEnabled: boolean;
  onNext: () => void;
}

export const Slide1Welcome: React.FC<SlideProps> = ({ soundEnabled, onNext }) => {
  const [stampUnlocked, setStampUnlocked] = useState(false);

  const handleUnlockBadge = () => {
    playSound('fanfare', soundEnabled);
    setStampUnlocked(true);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-between py-2 sm:py-4">
      {/* Target Level Badges */}
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center">
        <span className="px-3 py-1 bg-amber-400 text-amber-950 font-extrabold text-xs sm:text-sm rounded-full shadow-sm flex items-center gap-1.5 border border-amber-500">
          <Sparkles className="w-4 h-4 fill-amber-950" /> Year 4
        </span>
        <span className="px-3 py-1 bg-emerald-400 text-emerald-950 font-extrabold text-xs sm:text-sm rounded-full shadow-sm flex items-center gap-1.5 border border-emerald-500">
          <Sparkles className="w-4 h-4 fill-emerald-950" /> Year 5
        </span>
        <span className="px-3 py-1 bg-purple-400 text-purple-950 font-extrabold text-xs sm:text-sm rounded-full shadow-sm flex items-center gap-1.5 border border-purple-500">
          <Sparkles className="w-4 h-4 fill-purple-950" /> Year 6
        </span>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 font-bold text-xs sm:text-sm rounded-full border border-blue-300">
          Primary School Grammar Series
        </span>
      </div>

      {/* Main Title Hero Card */}
      <div className="text-center my-auto max-w-2xl px-2">
        <div className="inline-block p-1 bg-gradient-to-r from-blue-400 via-indigo-400 to-amber-400 rounded-3xl cartoon-shadow mb-4">
          <div className="bg-white px-6 sm:px-10 py-5 sm:py-7 rounded-[22px] border-2 border-blue-100">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight">
              Present Perfect <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Continuous Tense
              </span>
            </h1>
            <p className="text-base sm:text-xl font-bold text-slate-600 mt-2">
              The Mystery of Actions Still Happening! 🔍
            </p>
          </div>
        </div>

        {/* Mascot & Mission Box */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2">
          <Mascot
            mood="happy"
            size="md"
            speech="Hello Detectives! Let's discover how to talk about actions that started in the past and are STILL happening right now!"
          />

          {/* Interactive Badge Stamp */}
          <div className="flex flex-col items-center">
            {!stampUnlocked ? (
              <button
                id="btn-unlock-detective-badge"
                onClick={handleUnlockBadge}
                className="flex items-center gap-2 px-5 py-3 bg-amber-400 hover:bg-amber-500 text-amber-950 font-extrabold rounded-2xl border-2 border-amber-600 cartoon-btn-shadow transition-all text-sm animate-wiggle"
              >
                <Award className="w-5 h-5 text-amber-950" />
                <span>Tap to Claim Detective Badge! ⭐</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 px-5 py-2.5 bg-emerald-100 border-2 border-emerald-400 text-emerald-800 rounded-2xl font-bold text-sm shadow-inner animate-bounce">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                <span>Badge Activated: Time Detective Cadet!</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Slide Footer Call To Action */}
      <div className="w-full flex items-center justify-between pt-2 border-t border-slate-200">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-500">
          <Compass className="w-4 h-4 text-blue-500" />
          <span>12 Interactive Cartoon Slides • Games & Challenges</span>
        </div>

        <button
          id="btn-start-presentation"
          onClick={() => {
            playSound('pop', soundEnabled);
            onNext();
          }}
          className="flex items-center gap-2 px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-extrabold text-sm sm:text-base rounded-2xl border-2 border-blue-600 cartoon-btn-shadow transition-all"
        >
          <span>Start Adventure</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
