import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SLIDES_DATA } from './data/slidesData';
import { SlideHeader } from './components/SlideHeader';
import { NavigationControls } from './components/NavigationControls';
import { TeacherTipModal } from './components/TeacherTipModal';
import { playSound } from './utils/audio';

// Import the 12 slides
import { Slide1Welcome } from './slides/Slide1Welcome';
import { Slide2Concept } from './slides/Slide2Concept';
import { Slide3Formula } from './slides/Slide3Formula';
import { Slide4HaveVsHas } from './slides/Slide4HaveVsHas';
import { Slide5PictureExamples } from './slides/Slide5PictureExamples';
import { Slide6ForVsSince } from './slides/Slide6ForVsSince';
import { Slide7ForSinceActivity } from './slides/Slide7ForSinceActivity';
import { Slide8PictureQuiz } from './slides/Slide8PictureQuiz';
import { Slide9SentenceBuilder } from './slides/Slide9SentenceBuilder';
import { Slide10FillInTheBlank } from './slides/Slide10FillInTheBlank';
import { Slide11Recap } from './slides/Slide11Recap';
import { Slide12FinalQuiz } from './slides/Slide12FinalQuiz';

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isTeacherTipOpen, setIsTeacherTipOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [slideResetKeys, setSlideResetKeys] = useState<Record<number, number>>({});

  const totalSlides = SLIDES_DATA.length;
  const slideMeta = SLIDES_DATA[currentSlide - 1];

  const handleNext = useCallback(() => {
    if (currentSlide < totalSlides) {
      setCurrentSlide((s) => s + 1);
    }
  }, [currentSlide, totalSlides]);

  const handlePrev = useCallback(() => {
    if (currentSlide > 1) {
      setCurrentSlide((s) => s - 1);
    }
  }, [currentSlide]);

  const handleGoToSlide = useCallback(
    (slideNum: number) => {
      if (slideNum >= 1 && slideNum <= totalSlides) {
        setCurrentSlide(slideNum);
      }
    },
    [totalSlides]
  );

  const handleResetCurrentSlide = useCallback(() => {
    setSlideResetKeys((prev) => ({
      ...prev,
      [currentSlide]: (prev[currentSlide] || 0) + 1,
    }));
  }, [currentSlide]);

  // Keyboard navigation for presentation mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid intercepting typing in input fields
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        playSound('whoosh', soundEnabled);
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        playSound('whoosh', soundEnabled);
        handlePrev();
      } else if (e.key === 'Home') {
        e.preventDefault();
        handleGoToSlide(1);
      } else if (e.key === 'End') {
        e.preventDefault();
        handleGoToSlide(totalSlides);
      } else if (e.key === 'f' || e.key === 'F') {
        // Toggle fullscreen shortcut
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, handleGoToSlide, totalSlides, soundEnabled]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  // Render the active slide component
  const renderSlideContent = () => {
    const resetKey = slideResetKeys[currentSlide] || 0;

    switch (currentSlide) {
      case 1:
        return <Slide1Welcome key={resetKey} soundEnabled={soundEnabled} onNext={handleNext} />;
      case 2:
        return <Slide2Concept key={resetKey} soundEnabled={soundEnabled} />;
      case 3:
        return <Slide3Formula key={resetKey} soundEnabled={soundEnabled} />;
      case 4:
        return <Slide4HaveVsHas key={resetKey} soundEnabled={soundEnabled} />;
      case 5:
        return <Slide5PictureExamples key={resetKey} soundEnabled={soundEnabled} />;
      case 6:
        return <Slide6ForVsSince key={resetKey} soundEnabled={soundEnabled} />;
      case 7:
        return <Slide7ForSinceActivity key={resetKey} soundEnabled={soundEnabled} />;
      case 8:
        return <Slide8PictureQuiz key={resetKey} soundEnabled={soundEnabled} />;
      case 9:
        return <Slide9SentenceBuilder key={resetKey} soundEnabled={soundEnabled} />;
      case 10:
        return <Slide10FillInTheBlank key={resetKey} soundEnabled={soundEnabled} />;
      case 11:
        return <Slide11Recap key={resetKey} soundEnabled={soundEnabled} onNext={handleNext} />;
      case 12:
        return <Slide12FinalQuiz key={resetKey} soundEnabled={soundEnabled} />;
      default:
        return null;
    }
  };

  return (
    <div
      id="deck-container"
      className="min-h-screen w-full bg-slate-900 text-slate-800 flex flex-col items-center justify-between p-2 sm:p-4 select-none"
    >
      {/* Slide Deck Canvas Frame */}
      <main className="w-full max-w-6xl aspect-[16/10] min-h-[580px] max-h-[85vh] bg-gradient-to-b from-sky-50/90 via-white to-sky-50/50 rounded-3xl sm:rounded-[36px] border-4 border-blue-400 cartoon-shadow flex flex-col justify-between p-4 sm:p-7 relative overflow-hidden my-auto">
        {/* Playful cartoon background decals */}
        <div className="absolute -top-10 -right-10 w-44 h-44 bg-blue-200/30 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-amber-200/30 rounded-full blur-2xl pointer-events-none" />

        {/* Slide Header */}
        <SlideHeader
          slideNumber={currentSlide}
          totalSlides={totalSlides}
          title={slideMeta.title}
          subtitle={slideMeta.subtitle}
          category={slideMeta.category}
          teacherTip={slideMeta.teacherTip}
          soundEnabled={soundEnabled}
          onOpenTeacherTip={() => setIsTeacherTipOpen(true)}
        />

        {/* Slide Body with Motion Transition */}
        <section aria-label={`Slide Content: ${slideMeta.title}`} className="flex-1 w-full flex flex-col justify-center relative overflow-y-auto sm:overflow-hidden py-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 25, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -25, scale: 0.98 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="w-full h-full flex flex-col justify-between"
            >
              {renderSlideContent()}
            </motion.div>
          </AnimatePresence>
        </section>
      </main>

      {/* Presentation Deck Bottom Controls */}
      <footer className="w-full max-w-6xl mt-2">
        <NavigationControls
          currentSlide={currentSlide}
          totalSlides={totalSlides}
          onPrev={handlePrev}
          onNext={handleNext}
          onGoToSlide={handleGoToSlide}
          onResetSlide={currentSlide >= 7 ? handleResetCurrentSlide : undefined}
          soundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled(!soundEnabled)}
          isFullscreen={isFullscreen}
          onToggleFullscreen={toggleFullscreen}
        />
      </footer>

      {/* Teacher's Guide Modal */}
      <TeacherTipModal
        isOpen={isTeacherTipOpen}
        onClose={() => setIsTeacherTipOpen(false)}
        slideNumber={currentSlide}
        slideTitle={slideMeta.title}
        tip={slideMeta.teacherTip}
        soundEnabled={soundEnabled}
      />
    </div>
  );
}
