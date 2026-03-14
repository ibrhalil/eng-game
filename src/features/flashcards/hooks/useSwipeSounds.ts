import { useCallback, useRef } from 'react';
import type { SwipeDirection } from '../types';

const MASTER_GAIN = 0.045;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export const useSwipeSounds = (enabled: boolean) => {
  const contextRef = useRef<AudioContext | null>(null);

  const getContext = useCallback((): AudioContext | null => {
    if (typeof window === 'undefined') {
      return null;
    }

    const Context = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

    if (!Context) {
      return null;
    }

    if (!contextRef.current) {
      contextRef.current = new Context();
    }

    return contextRef.current;
  }, []);

  const playTone = useCallback(
    (
      context: AudioContext,
      options: {
        from: number;
        to: number;
        duration: number;
        wave?: OscillatorType;
        gain?: number;
        delay?: number;
      }
    ) => {
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();
      const now = context.currentTime + (options.delay ?? 0);
      const duration = clamp(options.duration, 0.03, 1.2);
      const peakGain = clamp(options.gain ?? MASTER_GAIN, 0.005, 0.2);

      oscillator.type = options.wave ?? 'sine';
      oscillator.frequency.setValueAtTime(options.from, now);
      oscillator.frequency.exponentialRampToValueAtTime(Math.max(options.to, 1), now + duration);

      gainNode.gain.setValueAtTime(0.0001, now);
      gainNode.gain.exponentialRampToValueAtTime(peakGain, now + 0.015);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      oscillator.connect(gainNode);
      gainNode.connect(context.destination);

      oscillator.start(now);
      oscillator.stop(now + duration);
    },
    []
  );

  const playSwipeSound = useCallback(
    (direction: SwipeDirection) => {
      if (!enabled) {
        return;
      }

      const context = getContext();

      if (!context) {
        return;
      }

      if (context.state === 'suspended') {
        void context.resume();
      }

      if (direction === 'right') {
        playTone(context, { from: 380, to: 670, duration: 0.16, wave: 'triangle', gain: 0.05 });
        playTone(context, { from: 700, to: 820, duration: 0.09, delay: 0.09, wave: 'sine', gain: 0.025 });
        return;
      }

      if (direction === 'left') {
        playTone(context, { from: 320, to: 230, duration: 0.14, wave: 'triangle', gain: 0.026 });
        playTone(context, { from: 250, to: 200, duration: 0.1, delay: 0.06, wave: 'sine', gain: 0.018 });
        return;
      }

      if (direction === 'up') {
        playTone(context, { from: 650, to: 880, duration: 0.08, wave: 'triangle', gain: 0.032 });
        playTone(context, { from: 980, to: 1180, duration: 0.12, delay: 0.06, wave: 'sine', gain: 0.022 });
        return;
      }

      playTone(context, { from: 300, to: 120, duration: 0.13, wave: 'triangle', gain: 0.026 });
    },
    [enabled, getContext, playTone]
  );

  return { playSwipeSound };
};
