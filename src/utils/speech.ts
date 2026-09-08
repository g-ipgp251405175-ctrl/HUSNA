// Browser speech synthesis helper for young learners
export function speakText(text: string, onEnd?: () => void) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return;
  }

  window.speechSynthesis.cancel();

  const cleanText = text.replace(/[*#_~`]/g, '');
  const utterance = new SpeechSynthesisUtterance(cleanText);

  // Set friendly voice parameters
  utterance.rate = 0.9; // Slightly slower for primary school students
  utterance.pitch = 1.1; // Slightly higher, friendlier tone

  utterance.onend = () => {
    if (onEnd) onEnd();
  };

  utterance.onerror = () => {
    if (onEnd) onEnd();
  };

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
