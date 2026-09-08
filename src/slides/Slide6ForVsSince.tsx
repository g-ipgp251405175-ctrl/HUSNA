import React, { useState } from 'react';
import { Mascot } from '../components/Mascot';
import { Hourglass, Calendar, Check, HelpCircle, ArrowRight } from 'lucide-react';
import { playSound } from '../utils/audio';

interface SlideProps {
  soundEnabled: boolean;
}

export const Slide6ForVsSince: React.FC<SlideProps> = ({ soundEnabled }) => {
  const [activeTab, setActiveTab] = useState<'both' | 'for' | 'since'>('both');

  return (
    <div className="w-full h-full flex flex-col justify-between py-1">
      {/* Intro banner */}
      <div className="text-center mb-1">
        <span className="text-xs sm:text-sm font-bold bg-amber-100 text-amber-900 border border-amber-300 px-3 py-0.5 rounded-full">
          Detective Clues 🕵️‍♂️
        </span>
        <h3 className="text-xl sm:text-2xl font-black text-slate-800 mt-1">
          How do we show <span className="text-blue-600">how long</span> the action has been going?
        </h3>
      </div>

      {/* Comparison Grid: FOR vs SINCE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 my-auto">
        {/* FOR Card */}
        <div className={`rounded-3xl p-4 sm:p-5 border-2 transition-all cartoon-shadow flex flex-col justify-between ${
          activeTab === 'since' ? 'opacity-40 scale-98 bg-slate-50 border-slate-200' : 'bg-gradient-to-br from-amber-50 to-orange-50/60 border-amber-400 ring-2 ring-amber-200'
        }`}>
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-amber-200">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center font-black">
                  <Hourglass className="w-5 h-5 animate-spin" style={{ animationDuration: '8s' }} />
                </div>
                <div>
                  <h4 className="text-2xl font-black text-amber-950">FOR</h4>
                  <span className="text-xs font-bold text-amber-700">Measures a Period of Time</span>
                </div>
              </div>
              <span className="text-xs font-extrabold bg-amber-200 text-amber-900 px-2.5 py-1 rounded-full">
                How long?
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 font-semibold mt-3">
              Use <strong>FOR</strong> when you count the number of seconds, minutes, hours, days, or years!
            </p>

            <div className="mt-3 space-y-1.5 text-xs sm:text-sm font-bold text-amber-950">
              <div className="bg-white/90 px-3 py-1.5 rounded-xl border border-amber-200 flex items-center gap-2">
                <span className="text-amber-500">⏳</span> for 20 minutes
              </div>
              <div className="bg-white/90 px-3 py-1.5 rounded-xl border border-amber-200 flex items-center gap-2">
                <span className="text-amber-500">⏳</span> for two hours
              </div>
              <div className="bg-white/90 px-3 py-1.5 rounded-xl border border-amber-200 flex items-center gap-2">
                <span className="text-amber-500">⏳</span> for three days
              </div>
            </div>
          </div>

          <div className="mt-3 p-2 bg-amber-100 rounded-xl text-xs font-bold text-amber-900 border border-amber-300">
            "I have been waiting <strong>for 30 minutes</strong>." 🕒
          </div>
        </div>

        {/* SINCE Card */}
        <div className={`rounded-3xl p-4 sm:p-5 border-2 transition-all cartoon-shadow flex flex-col justify-between ${
          activeTab === 'for' ? 'opacity-40 scale-98 bg-slate-50 border-slate-200' : 'bg-gradient-to-br from-blue-50 to-indigo-50/60 border-blue-400 ring-2 ring-blue-200'
        }`}>
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-blue-200">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-2xl bg-blue-500 text-white flex items-center justify-center font-black">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-2xl font-black text-blue-950">SINCE</h4>
                  <span className="text-xs font-bold text-blue-700">Points to the Starting Time</span>
                </div>
              </div>
              <span className="text-xs font-extrabold bg-blue-200 text-blue-900 px-2.5 py-1 rounded-full">
                Starting Point
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 font-semibold mt-3">
              Use <strong>SINCE</strong> when naming the exact starting clock time, day, month, or date!
            </p>

            <div className="mt-3 space-y-1.5 text-xs sm:text-sm font-bold text-blue-950">
              <div className="bg-white/90 px-3 py-1.5 rounded-xl border border-blue-200 flex items-center gap-2">
                <span className="text-blue-500">📍</span> since 8 o'clock
              </div>
              <div className="bg-white/90 px-3 py-1.5 rounded-xl border border-blue-200 flex items-center gap-2">
                <span className="text-blue-500">📍</span> since Monday morning
              </div>
              <div className="bg-white/90 px-3 py-1.5 rounded-xl border border-blue-200 flex items-center gap-2">
                <span className="text-blue-500">📍</span> since yesterday
              </div>
            </div>
          </div>

          <div className="mt-3 p-2 bg-blue-100 rounded-xl text-xs font-bold text-blue-900 border border-blue-300">
            "I have been waiting <strong>since 9:00 AM</strong>." ⏰
          </div>
        </div>
      </div>

      {/* Mascot Memory Tip */}
      <div className="mt-2 flex items-center justify-center">
        <Mascot
          mood="detective"
          size="sm"
          speech="Golden Rule: FOR counts duration (amount of time), while SINCE names the starting point!"
        />
      </div>
    </div>
  );
};
