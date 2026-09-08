import React from 'react';
import { MascotMood } from '../types';

interface MascotProps {
  mood?: MascotMood;
  speech?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Mascot: React.FC<MascotProps> = ({
  mood = 'happy',
  speech,
  size = 'md',
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24 sm:w-28 sm:h-28',
    lg: 'w-32 h-32 sm:w-36 sm:h-36',
  };

  return (
    <div className={`relative flex items-center gap-3 ${className}`}>
      {/* Cartoon Character: Timmy the Time Detective */}
      <div className={`relative ${sizeMap[size]} shrink-0 animate-float`}>
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full drop-shadow-md overflow-visible"
        >
          {/* Shadow */}
          <ellipse cx="60" cy="112" rx="34" ry="7" fill="rgba(0,0,0,0.12)" />

          {/* Body / Coat */}
          <path
            d="M36 70 C36 55, 84 55, 84 70 L90 102 C90 106, 84 108, 60 108 C36 108, 30 106, 30 102 Z"
            fill="#3B82F6"
          />
          {/* Coat Collar & Buttons */}
          <path d="M48 65 L60 82 L72 65" fill="#2563EB" stroke="#1D4ED8" strokeWidth="2" />
          <circle cx="60" cy="88" r="3" fill="#FBBF24" />
          <circle cx="60" cy="98" r="3" fill="#FBBF24" />

          {/* Detective Belt */}
          <rect x="36" y="98" width="48" height="6" rx="3" fill="#1E3A8A" />
          <rect x="55" y="96" width="10" height="10" rx="2" fill="#F59E0B" />

          {/* Head */}
          <circle cx="60" cy="48" r="28" fill="#FED7AA" stroke="#FDBA74" strokeWidth="2" />

          {/* Cheeks */}
          <ellipse cx="44" cy="54" rx="5" ry="3" fill="#FCA5A5" opacity="0.8" />
          <ellipse cx="76" cy="54" rx="5" ry="3" fill="#FCA5A5" opacity="0.8" />

          {/* Eyes depending on mood */}
          {mood === 'celebrating' ? (
            // Joyful curved squint eyes
            <>
              <path d="M44 46 Q49 39 54 46" fill="none" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
              <path d="M66 46 Q71 39 76 46" fill="none" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
            </>
          ) : mood === 'thinking' ? (
            // Curious upward glancing eyes
            <>
              <circle cx="49" cy="44" r="5" fill="#1E293B" />
              <circle cx="71" cy="42" r="5" fill="#1E293B" />
              <circle cx="51" cy="42" r="2" fill="#FFFFFF" />
              <circle cx="73" cy="40" r="2" fill="#FFFFFF" />
            </>
          ) : (
            // Friendly big eyes
            <>
              <circle cx="49" cy="46" r="5.5" fill="#1E293B" />
              <circle cx="71" cy="46" r="5.5" fill="#1E293B" />
              <circle cx="51" cy="44" r="2" fill="#FFFFFF" />
              <circle cx="73" cy="44" r="2" fill="#FFFFFF" />
            </>
          )}

          {/* Smile / Expression */}
          {mood === 'celebrating' ? (
            <path d="M50 56 Q60 68 70 56 Z" fill="#EF4444" stroke="#DC2626" strokeWidth="1.5" />
          ) : mood === 'thinking' ? (
            <path d="M52 58 Q60 55 67 59" fill="none" stroke="#B45309" strokeWidth="2.5" strokeLinecap="round" />
          ) : (
            <path d="M50 55 Q60 65 70 55" fill="none" stroke="#B45309" strokeWidth="3" strokeLinecap="round" />
          )}

          {/* Detective Cap */}
          <path
            d="M30 32 C34 16, 86 16, 90 32 C96 34, 96 40, 88 40 L32 40 C24 40, 24 34, 30 32 Z"
            fill="#D97706"
            stroke="#B45309"
            strokeWidth="2"
          />
          {/* Cap Ribbon */}
          <path d="M32 35 Q60 38 88 35 L89 39 Q60 42 31 39 Z" fill="#92400E" />
          {/* Cap badge / clock */}
          <circle cx="60" cy="28" r="6" fill="#FBBF24" stroke="#B45309" strokeWidth="1.5" />
          <path d="M60 25 L60 28 L63 28" fill="none" stroke="#92400E" strokeWidth="1.2" strokeLinecap="round" />

          {/* Hands & Prop: Magnifying Glass or Thumbs Up */}
          {mood === 'celebrating' ? (
            // Both hands up in celebration
            <>
              <path d="M30 76 Q20 62 26 50" fill="none" stroke="#3B82F6" strokeWidth="7" strokeLinecap="round" />
              <circle cx="26" cy="48" r="6" fill="#FED7AA" />
              <path d="M90 76 Q100 62 94 50" fill="none" stroke="#3B82F6" strokeWidth="7" strokeLinecap="round" />
              <circle cx="94" cy="48" r="6" fill="#FED7AA" />
            </>
          ) : (
            // Holding Magnifying Glass
            <>
              {/* Hand */}
              <circle cx="92" cy="74" r="6" fill="#FED7AA" />
              {/* Magnifying Glass handle */}
              <line x1="94" y1="74" x2="108" y2="60" stroke="#92400E" strokeWidth="5" strokeLinecap="round" />
              {/* Glass rim */}
              <circle cx="108" cy="54" r="14" fill="rgba(191, 219, 254, 0.4)" stroke="#F59E0B" strokeWidth="4" />
              {/* Glass shine */}
              <path d="M102 48 A 9 9 0 0 1 114 48" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
            </>
          )}
        </svg>
      </div>

      {/* Comic Speech Bubble */}
      {speech && (
        <div className="relative bg-white text-slate-800 px-4 py-2.5 rounded-2xl border-2 border-blue-200 shadow-md max-w-xs text-sm font-semibold leading-snug">
          {/* Speech bubble tail pointing left */}
          <div className="absolute top-1/2 -left-2.5 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-white border-b-8 border-b-transparent" />
          <div className="absolute top-1/2 -left-3.5 -translate-y-1/2 w-0 h-0 border-t-[9px] border-t-transparent border-r-[9px] border-r-blue-200 border-b-[9px] border-b-transparent -z-10" />
          <span>{speech}</span>
        </div>
      )}
    </div>
  );
};
