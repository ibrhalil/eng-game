import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface UseWordPronunciationOptions {
  lang?: string;
  pitch?: number;
  rate?: number;
  volume?: number;
}

interface UseWordPronunciationResult {
  isSpeaking: boolean;
  isSupported: boolean;
  togglePronunciation: () => void;
  stopPronunciation: () => void;
}

const DEFAULT_OPTIONS: Required<UseWordPronunciationOptions> = {
  lang: 'en-US',
  pitch: 1,
  rate: 0.9,
  volume: 1,
};

export const useWordPronunciation = (
  text: string,
  options: UseWordPronunciationOptions = {}
): UseWordPronunciationResult => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const previousTextRef = useRef(text);

  const isSupported = useMemo(
    () => typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window,
    []
  );

  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };

  const stopPronunciation = useCallback(() => {
    if (!isSupported) {
      return;
    }

    window.speechSynthesis.cancel();
    utteranceRef.current = null;
    setIsSpeaking(false);
  }, [isSupported]);

  const startPronunciation = useCallback(() => {
    if (!isSupported || text.trim().length === 0) {
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const englishVoice = window.speechSynthesis
      .getVoices()
      .find((voice) => voice.lang.toLowerCase().startsWith('en'));

    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    utterance.lang = mergedOptions.lang;
    utterance.rate = mergedOptions.rate;
    utterance.pitch = mergedOptions.pitch;
    utterance.volume = mergedOptions.volume;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    utteranceRef.current = utterance;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }, [isSupported, mergedOptions.lang, mergedOptions.pitch, mergedOptions.rate, mergedOptions.volume, text]);

  const togglePronunciation = useCallback(() => {
    if (isSpeaking) {
      stopPronunciation();
      return;
    }

    startPronunciation();
  }, [isSpeaking, startPronunciation, stopPronunciation]);

  useEffect(() => {
    if (previousTextRef.current !== text) {
      stopPronunciation();
      previousTextRef.current = text;
    }
  }, [stopPronunciation, text]);

  useEffect(() => stopPronunciation, [stopPronunciation]);

  return {
    isSpeaking,
    isSupported,
    togglePronunciation,
    stopPronunciation,
  };
};
