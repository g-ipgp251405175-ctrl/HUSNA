import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  LayoutGrid,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { SLIDES_DATA } from '../data/slidesData';
import { playSound } from '../utils/audio';

interface NavigationControlsProps {
  currentSlide: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
  onGoToSlide: (slideNumber: number) => void;
  onResetSlide?: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export const NavigationControls: React.FC<NavigationControlsProps> = ({
  currentSlide,
  totalSlides,
  onPrev,
  onNext,
  onGoToSlide,
  onResetSlide,
  soundEnabled,
  onToggleSound,
  isFullscreen,
  onToggleFullscreen,
}) => {
  const [showGrid, setShowGrid] = useState(false);

  return (
    <>
      <nav aria-label="Slide Presentation Controls" className="w-full bg-white/95 backdrop-blur-md border-t-2 border-sky-200 px-3 sm:px-6 py-2.5 flex items-center justify-between shadow-lg z-40">
        {/* Left Side: Slide Grid Drawer & Audio Controls */}
        <div className="flex items-center gap-2">
          <button
            id="btn-slide-overview"
            onClick={() => {
              playSound('click', soundEnabled);
              setShowGrid(!showGrid);
            }}
            title="Slide Overview"
            className="flex items-center gap-1.5 px-3 py-2 bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-300 rounded-xl text-xs sm:text-sm font-bold transition-all"
          >
            <LayoutGrid className="w-4 h-4" />
            <span className="hidden md:inline">All Slides</span>
          </button>

          <button
            id="btn-toggle-sound"
            onClick={onToggleSound}
            title={soundEnabled ? "Mute Sound Effects" : "Enable Sound Effects"}
            className={`p-2 rounded-xl border text-xs sm:text-sm font-bold transition-all ${
              soundEnabled
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                : 'bg-slate-100 text-slate-400 border-slate-300'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {onResetSlide && (
            <button
              id="btn-reset-activity"
              onClick={() => {
                playSound('pop', soundEnabled);
                onResetSlide();
              }}
              title="Reset Slide Activity"
              className="flex items-center gap-1 px-2.5 py-2 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-300 rounded-xl text-xs sm:text-sm font-bold transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden lg:inline">Reset</span>
            </button>
          )}
        </div>

        {/* Center: Slide Navigator with Dots/Progress */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            id="btn-prev-slide"
            onClick={() => {
              playSound('whoosh', soundEnabled);
              onPrev();
            }}
            disabled={currentSlide <= 1}
            className={`flex items-center gap-1 px-3 sm:px-4 py-2 rounded-2xl font-bold text-xs sm:text-sm transition-all cartoon-btn-shadow ${
              currentSlide <= 1
                ? 'bg-slate-100 text-slate-300 border border-slate-200 cursor-not-allowed opacity-60'
                : 'bg-white hover:bg-sky-50 text-sky-700 border-2 border-sky-300 active:scale-95'
            }`}
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Prev</span>
          </button>

          {/* Slide dots and counter */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 hidden sm:flex">
              {SLIDES_DATA.map((slide) => (
                <button
                  key={slide.id}
                  id={`btn-dot-slide-${slide.id}`}
                  onClick={() => {
                    playSound('click', soundEnabled);
                    onGoToSlide(slide.id);
                  }}
                  title={`Go to Slide ${slide.id}: ${slide.title}`}
                  className={`h-2.5 rounded-full transition-all ${
                    slide.id === currentSlide
                      ? 'w-6 bg-blue-600'
                      : slide.id < currentSlide
                      ? 'w-2.5 bg-blue-300 hover:bg-blue-400'
                      : 'w-2.5 bg-slate-200 hover:bg-slate-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-bold text-slate-600 sm:mt-1">
              Slide {currentSlide} of {totalSlides}
            </span>
          </div>

          <button
            id="btn-next-slide"
            onClick={() => {
              playSound('whoosh', soundEnabled);
              onNext();
            }}
            disabled={currentSlide >= totalSlides}
            className={`flex items-center gap-1 px-4 sm:px-5 py-2 rounded-2xl font-bold text-xs sm:text-sm transition-all cartoon-btn-shadow ${
              currentSlide >= totalSlides
                ? 'bg-slate-100 text-slate-300 border border-slate-200 cursor-not-allowed opacity-60'
                : 'bg-blue-500 hover:bg-blue-600 text-white border-2 border-blue-600 active:scale-95 animate-pulse-none'
            }`}
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Right Side: Fullscreen & Quick jump */}
        <div className="flex items-center gap-2">
          <button
            id="btn-toggle-fullscreen"
            onClick={onToggleFullscreen}
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen (Present Mode)"}
            className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs sm:text-sm font-bold transition-all"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Slide Thumbnails Drawer Modal */}
      {showGrid && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[85vh] overflow-y-auto p-6 border-4 border-blue-300 shadow-2xl">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-amber-500" />
                <h3 className="text-xl font-bold text-slate-800">All 12 Presentation Slides</h3>
              </div>
              <button
                id="btn-close-grid"
                onClick={() => setShowGrid(false)}
                className="px-4 py-1.5 text-sm font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {SLIDES_DATA.map((slide) => {
                const isActive = slide.id === currentSlide;
                return (
                  <button
                    key={slide.id}
                    id={`btn-thumbnail-slide-${slide.id}`}
                    onClick={() => {
                      playSound('pop', soundEnabled);
                      onGoToSlide(slide.id);
                      setShowGrid(false);
                    }}
                    className={`p-3 rounded-2xl text-left border-2 transition-all flex flex-col justify-between h-28 relative ${
                      isActive
                        ? 'border-blue-500 bg-blue-50/80 ring-2 ring-blue-300 shadow-md scale-102'
                        : 'border-slate-200 hover:border-blue-300 bg-slate-50/70 hover:bg-blue-50/40'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
                      }`}>
                        Slide {slide.id}
                      </span>
                      {isActive && <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />}
                    </div>
                    <div className="mt-2">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-2 leading-tight">
                        {slide.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        {slide.subtitle}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
