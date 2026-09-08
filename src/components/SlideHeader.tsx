import React, { useState } from 'react';
import { Volume2, VolumeX, Lightbulb } from 'lucide-react';
import { speakText, stopSpeaking } from '../utils/speech';
import { playSound } from '../utils/audio';

interface SlideHeaderProps {
  slideNumber: number;
  totalSlides: number;
  title: string;
  subtitle?: string;
  category: string;
  teacherTip: string;
  soundEnabled: boolean;
  onOpenTeacherTip: () => void;
  readAloudText?: string;
}

export const SlideHeader: React.FC<SlideHeaderProps> = ({
  slideNumber,
  totalSlides,
  title,
  subtitle,
  category,
  soundEnabled,
  onOpenTeacherTip,
  readAloudText,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'intro':
        return { label: '🌟 Welcome', bg: 'bg-amber-100 text-amber-800 border-amber-300' };
      case 'concept':
        return { label: '💡 The Big Idea', bg: 'bg-sky-100 text-sky-800 border-sky-300' };
      case 'grammar':
        return { label: '🧪 Grammar Recipe', bg: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
      case 'examples':
        return { label: '🎨 Real Life Stories', bg: 'bg-purple-100 text-purple-800 border-purple-300' };
      case 'practice':
        return { label: '🎮 Interactive Game', bg: 'bg-pink-100 text-pink-800 border-pink-300' };
      case 'summary':
        return { label: '📜 Cheat Sheet', bg: 'bg-blue-100 text-blue-800 border-blue-300' };
      case 'quiz':
        return { label: '🏆 Super Challenge', bg: 'bg-orange-100 text-orange-800 border-orange-300' };
      default:
        return { label: 'Slide', bg: 'bg-slate-100 text-slate-800 border-slate-300' };
    }
  };

  const badge = getCategoryBadge(category);

  const handleReadAloud = () => {
    playSound('pop', soundEnabled);
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      const textToSpeak = readAloudText || `${title}. ${subtitle || ''}`;
      speakText(textToSpeak, () => setIsSpeaking(false));
    }
  };

  return (
    <div className="w-full flex items-center justify-between pb-3 border-b-2 border-dashed border-sky-200/80 mb-3 sm:mb-4">
      {/* Title & Badge */}
      <div className="flex flex-col items-start gap-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-xs sm:text-sm font-bold px-3 py-0.5 rounded-full border ${badge.bg}`}>
            {badge.label}
          </span>
          <span className="text-xs sm:text-sm font-bold bg-white/80 text-slate-600 px-2.5 py-0.5 rounded-full border border-slate-200">
            Slide {slideNumber} / {totalSlides}
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight leading-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs sm:text-sm md:text-base font-semibold text-slate-500">
            {subtitle}
          </p>
        )}
      </div>

      {/* Action Buttons: Audio & Teacher Tip */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          id="btn-read-aloud"
          onClick={handleReadAloud}
          title={isSpeaking ? "Stop Speaking" : "Read Aloud"}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cartoon-btn-shadow ${
            isSpeaking
              ? 'bg-rose-500 text-white border-2 border-rose-600 animate-pulse'
              : 'bg-white hover:bg-sky-50 text-sky-700 border-2 border-sky-300'
          }`}
        >
          {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          <span className="hidden sm:inline">{isSpeaking ? 'Stop' : 'Listen'}</span>
        </button>

        <button
          id="btn-teacher-tip"
          onClick={() => {
            playSound('click', soundEnabled);
            onOpenTeacherTip();
          }}
          title="Teacher's Guide / Facilitation Tip"
          className="flex items-center gap-1.5 px-3 py-2 bg-amber-50 hover:bg-amber-100 text-amber-800 border-2 border-amber-300 rounded-xl text-xs sm:text-sm font-bold transition-all cartoon-btn-shadow"
        >
          <Lightbulb className="w-4 h-4 text-amber-600 fill-amber-300" />
          <span className="hidden sm:inline">Teacher Tip</span>
        </button>
      </div>
    </div>
  );
};
