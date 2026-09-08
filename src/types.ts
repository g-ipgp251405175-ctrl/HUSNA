export interface SlideInfo {
  id: number;
  title: string;
  subtitle?: string;
  category: 'intro' | 'concept' | 'grammar' | 'examples' | 'practice' | 'summary' | 'quiz';
  teacherTip: string;
}

export type MascotMood = 'happy' | 'thinking' | 'celebrating' | 'explaining' | 'detective';

export interface SentenceBuilderTask {
  id: number;
  prompt: string;
  cartoonIcon: string;
  targetSentence: string[];
  scrambledWords: string[];
  hint: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  imagePrompt?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  cartoon: string;
}
