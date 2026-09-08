import React, { useState } from 'react';
import { Mascot } from '../components/Mascot';
import { Clock, Play, CloudRain, CheckCircle, Sparkles } from 'lucide-react';
import { playSound } from '../utils/audio';

interface SlideProps {
  soundEnabled: boolean;
}

export const Slide2Concept: React.FC<SlideProps> = ({ soundEnabled }) => {
  const [timeStep, setTimeStep] = useState<1 | 2 | 3>(2);

  return (
    <div className="w-full h-full flex flex-col justify-between py-1 sm:py-2">
      {/* 2 Golden Rules Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-3">
        <div className="bg-amber-50 rounded-2xl p-4 sm:p-5 border-2 border-amber-300 cartoon-shadow flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-amber-950 font-black text-2xl flex items-center justify-center shrink-0 border border-amber-500">
            1
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-amber-950">
              Started in the Past ⏳
            </h3>
            <p className="text-sm sm:text-base text-amber-900 font-medium mt-1">
              The action began earlier (like 1 hour ago, this morning, or yesterday).
            </p>
          </div>
        </div>

        <div className="bg-emerald-50 rounded-2xl p-4 sm:p-5 border-2 border-emerald-300 cartoon-shadow flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-400 text-emerald-950 font-black text-2xl flex items-center justify-center shrink-0 border border-emerald-500">
            2
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-emerald-950">
              Still Continuing Now! 🔄
            </h3>
            <p className="text-sm sm:text-base text-emerald-900 font-medium mt-1">
              It hasn't stopped yet! It is still going on right now at this very moment.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Time Machine Demo: "It has been raining" */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border-2 border-blue-200 cartoon-shadow relative overflow-hidden my-auto">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600 animate-spin" style={{ animationDuration: '6s' }} />
            <span className="font-bold text-slate-800 text-sm sm:text-base">
              Interactive Story: Look Outside the Window!
            </span>
          </div>
          <span className="text-xs font-bold text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
            Tap time buttons below 👇
          </span>
        </div>

        {/* Timeline Visualization */}
        <div className="relative py-4">
          <div className="h-3 bg-slate-200 rounded-full w-full relative">
            <div
              className="h-full bg-gradient-to-r from-amber-400 via-blue-500 to-emerald-500 rounded-full transition-all duration-500"
              style={{ width: timeStep === 1 ? '30%' : timeStep === 2 ? '70%' : '100%' }}
            />
          </div>

          <div className="flex justify-between items-center text-xs sm:text-sm font-bold mt-2">
            <button
              id="btn-time-step-1"
              onClick={() => {
                playSound('pop', soundEnabled);
                setTimeStep(1);
              }}
              className={`px-3 py-1 rounded-xl transition-all ${
                timeStep === 1
                  ? 'bg-amber-400 text-amber-950 scale-105 shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              1. Started at 2:00 PM
            </button>

            <button
              id="btn-time-step-2"
              onClick={() => {
                playSound('pop', soundEnabled);
                setTimeStep(2);
              }}
              className={`px-3 py-1 rounded-xl transition-all ${
                timeStep === 2
                  ? 'bg-blue-500 text-white scale-105 shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              2. Kept raining at 3:00 PM
            </button>

            <button
              id="btn-time-step-3"
              onClick={() => {
                playSound('correct', soundEnabled);
                setTimeStep(3);
              }}
              className={`px-3 py-1 rounded-xl transition-all ${
                timeStep === 3
                  ? 'bg-emerald-500 text-white scale-105 shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              3. NOW: Still raining at 4:00 PM! 🌧️
            </button>
          </div>
        </div>

        {/* Dynamic Story Display */}
        <div className="bg-sky-50 rounded-2xl p-4 border border-sky-200 flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-100 border-2 border-blue-300 flex items-center justify-center text-blue-600 shrink-0">
              <CloudRain className="w-9 h-9 animate-bounce" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600">The Golden Sentence:</p>
              <h4 className="text-xl sm:text-2xl font-black text-blue-950 mt-0.5">
                "It <span className="text-emerald-600 underline decoration-2">has been raining</span> for two hours!"
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 font-semibold mt-1">
                Started 2 hours ago... and the raindrops are STILL falling on my umbrella!
              </p>
            </div>
          </div>
          <div className="hidden sm:block">
            <CheckCircle className="w-10 h-10 text-emerald-500 fill-emerald-100" />
          </div>
        </div>
      </div>

      {/* Mascot note */}
      <div className="mt-2 flex items-center justify-center">
        <Mascot
          mood="thinking"
          size="sm"
          speech="Notice that it did not stop! If it stopped, we wouldn't use continuous!"
        />
      </div>
    </div>
  );
};
