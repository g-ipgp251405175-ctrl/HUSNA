import React from 'react';
import { X, Lightbulb, Sparkles, BookOpen } from 'lucide-react';
import { playSound } from '../utils/audio';

interface TeacherTipModalProps {
  isOpen: boolean;
  onClose: () => void;
  slideNumber: number;
  slideTitle: string;
  tip: string;
  soundEnabled: boolean;
}

export const TeacherTipModal: React.FC<TeacherTipModalProps> = ({
  isOpen,
  onClose,
  slideNumber,
  slideTitle,
  tip,
  soundEnabled,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-7 border-4 border-amber-300 shadow-2xl animate-float">
        {/* Close Button */}
        <button
          id="btn-close-tip"
          onClick={() => {
            playSound('click', soundEnabled);
            onClose();
          }}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl border-2 border-amber-300">
            <Lightbulb className="w-7 h-7 fill-amber-300" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
              Teacher's Classroom Guide
            </span>
            <h3 className="text-xl font-bold text-slate-800">
              Slide {slideNumber}: {slideTitle}
            </h3>
          </div>
        </div>

        {/* Tip Box */}
        <div className="bg-amber-50/80 rounded-2xl p-4 border border-amber-200 text-slate-700 text-base leading-relaxed mb-5">
          <p className="font-medium">{tip}</p>
        </div>

        {/* Primary School Pedagogical Suggestions */}
        <div className="space-y-2 text-sm text-slate-600 border-t border-slate-100 pt-4">
          <div className="flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span><strong>Target Level:</strong> Primary Year 4, Year 5 & Year 6 (CEFR A1–A2 English level)</span>
          </div>
          <div className="flex items-start gap-2">
            <BookOpen className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <span><strong>Suggested Action:</strong> Use choral repetition for the formula chanting and let pupils take turns tapping interactive choices on the smartboard.</span>
          </div>
        </div>

        {/* Close button at bottom */}
        <div className="mt-6 flex justify-end">
          <button
            id="btn-tip-got-it"
            onClick={() => {
              playSound('pop', soundEnabled);
              onClose();
            }}
            className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-2xl border-2 border-amber-600 cartoon-btn-shadow transition-all"
          >
            Got it, let's teach! 👍
          </button>
        </div>
      </div>
    </div>
  );
};
