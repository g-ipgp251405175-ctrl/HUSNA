import React, { useState } from 'react';
import { Mascot } from '../components/Mascot';
import { Users, User, ArrowDown, Check, Sparkles } from 'lucide-react';
import { playSound } from '../utils/audio';

interface SlideProps {
  soundEnabled: boolean;
}

export const Slide4HaveVsHas: React.FC<SlideProps> = ({ soundEnabled }) => {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [sortedList, setSortedList] = useState<{ word: string; team: 'have' | 'has' }[]>([
    { word: 'He', team: 'has' },
    { word: 'They', team: 'have' },
  ]);

  const practiceSubjects: { word: string; correctTeam: 'have' | 'has' }[] = [
    { word: 'She', correctTeam: 'has' },
    { word: 'We', correctTeam: 'have' },
    { word: 'The cat', correctTeam: 'has' },
    { word: 'You', correctTeam: 'have' },
    { word: 'I', correctTeam: 'have' },
    { word: 'My brother', correctTeam: 'has' },
  ];

  const handleTestWord = (item: { word: string; correctTeam: 'have' | 'has' }) => {
    playSound('correct', soundEnabled);
    if (!sortedList.some((s) => s.word === item.word)) {
      setSortedList([...sortedList, { word: item.word, team: item.correctTeam }]);
    }
    setSelectedWord(item.word);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between py-1">
      {/* 2 Teams Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 my-auto">
        {/* Team HAS BEEN */}
        <div className="bg-gradient-to-b from-amber-50 to-amber-100/50 rounded-3xl p-4 sm:p-5 border-2 border-amber-300 cartoon-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-amber-200">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center font-black">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wide text-amber-700">
                    Solo Team (1 Person)
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-amber-950">
                    HAS BEEN
                  </h3>
                </div>
              </div>
              <span className="text-xs font-bold bg-amber-200 text-amber-900 px-2.5 py-1 rounded-full">
                Singular
              </span>
            </div>

            {/* Rule & Memory Trick */}
            <div className="mt-3 bg-white/90 rounded-2xl p-3 border border-amber-200 text-xs sm:text-sm text-slate-700">
              <strong className="text-amber-800">💡 Super Detective Trick:</strong>
              <p className="mt-0.5">
                Think of the <strong>S</strong> in ha<strong>s</strong> for <strong>S</strong>olo / <strong>S</strong>ingular!
              </p>
            </div>

            {/* Core Members */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {['He', 'She', 'It', 'Sara', 'The cat'].map((s) => (
                <span key={s} className="px-3 py-1 bg-amber-200 text-amber-950 rounded-xl font-bold text-xs sm:text-sm shadow-xs">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-2 text-xs font-semibold text-amber-800 border-t border-amber-200">
            Example: "<strong>She has been</strong> singing all morning." 🎤
          </div>
        </div>

        {/* Team HAVE BEEN */}
        <div className="bg-gradient-to-b from-blue-50 to-blue-100/50 rounded-3xl p-4 sm:p-5 border-2 border-blue-300 cartoon-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-blue-200">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-2xl bg-blue-500 text-white flex items-center justify-center font-black">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wide text-blue-700">
                    Group Team (Plural + I & You)
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-blue-950">
                    HAVE BEEN
                  </h3>
                </div>
              </div>
              <span className="text-xs font-bold bg-blue-200 text-blue-900 px-2.5 py-1 rounded-full">
                Plural + I / You
              </span>
            </div>

            {/* Rule & Memory Trick */}
            <div className="mt-3 bg-white/90 rounded-2xl p-3 border border-blue-200 text-xs sm:text-sm text-slate-700">
              <strong className="text-blue-800">💡 Remember:</strong>
              <p className="mt-0.5">
                Always use <strong>have</strong> with <strong>I</strong> and <strong>You</strong>, plus groups!
              </p>
            </div>

            {/* Core Members */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {['I', 'You', 'We', 'They', 'The kids'].map((s) => (
                <span key={s} className="px-3 py-1 bg-blue-200 text-blue-950 rounded-xl font-bold text-xs sm:text-sm shadow-xs">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-2 text-xs font-semibold text-blue-800 border-t border-blue-200">
            Example: "<strong>They have been</strong> playing football." ⚽
          </div>
        </div>
      </div>

      {/* Mini Interactive Buddy Tapper */}
      <div className="bg-white rounded-2xl p-3 sm:p-4 border-2 border-slate-200 cartoon-shadow flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500 shrink-0" />
          <span className="text-xs sm:text-sm font-bold text-slate-700">
            Tap a word chip to test which team it joins:
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 justify-center">
          {practiceSubjects.map((item) => {
            const isSorted = sortedList.some((s) => s.word === item.word);
            return (
              <button
                key={item.word}
                id={`btn-subject-${item.word.replace(/\s+/g, '-').toLowerCase()}`}
                onClick={() => handleTestWord(item)}
                className={`px-3 py-1.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all cartoon-btn-shadow ${
                  isSorted
                    ? item.correctTeam === 'has'
                      ? 'bg-amber-400 text-amber-950 border border-amber-500'
                      : 'bg-blue-500 text-white border border-blue-600'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
                }`}
              >
                {item.word} {isSorted && (item.correctTeam === 'has' ? '➡️ has' : '➡️ have')}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
