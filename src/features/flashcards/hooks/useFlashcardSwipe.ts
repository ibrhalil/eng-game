import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import {
  ACTION_BY_DIRECTION,
  DEAD_ZONE,
  DRAG_BORDER_STYLE_BY_DIRECTION,
  INDICATOR_THRESHOLD,
  SWIPE_EXIT_ANIMATION_MS,
  SWIPE_RELEASE_DELAY_MS,
  SWIPE_THRESHOLD,
} from '../constants';
import type { DragOffset, SwipeDirection, WordAction } from '../types';
import type { Word } from '../../../types';

interface UseFlashcardSwipeResult {
  currentIndex: number;
  isFlipped: boolean;
  actions: Record<string, WordAction>;
  dragDirection: SwipeDirection | null;
  currentAction: WordAction | undefined;
  currentWord: Word | null;
  cardStyle: CSSProperties;
  setIsFlipped: (value: boolean | ((value: boolean) => boolean)) => void;
  handleSwipe: (direction: SwipeDirection) => void;
  onPointerDown: (event: ReactPointerEvent<HTMLDivElement>) => void;
  onPointerMove: (event: ReactPointerEvent<HTMLDivElement>) => void;
  onPointerUp: (event: ReactPointerEvent<HTMLDivElement>) => void;
  onPointerCancel: () => void;
}

const getExitStyle = (direction: SwipeDirection, fromOffset: DragOffset = { x: 0, y: 0 }): CSSProperties => {
  const viewportWidth = typeof window === 'undefined' ? 900 : window.innerWidth;
  const viewportHeight = typeof window === 'undefined' ? 700 : window.innerHeight;

  if (direction === 'right') {
    return {
      transform: `translate(${fromOffset.x + viewportWidth}px, ${fromOffset.y}px) rotate(24deg)`,
      opacity: 0,
    };
  }

  if (direction === 'left') {
    return {
      transform: `translate(${fromOffset.x - viewportWidth}px, ${fromOffset.y}px) rotate(-24deg)`,
      opacity: 0,
    };
  }

  if (direction === 'down') {
    return {
      transform: `translate(${fromOffset.x}px, ${fromOffset.y + viewportHeight}px)`,
      opacity: 0,
    };
  }

  return {
    transform: `translate(${fromOffset.x}px, ${fromOffset.y - viewportHeight}px)`,
    opacity: 0,
  };
};

export const useFlashcardSwipe = (words: Word[]): UseFlashcardSwipeResult => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [actions, setActions] = useState<Record<string, WordAction>>({});
  const [swiped, setSwiped] = useState<SwipeDirection | null>(null);
  const [dragDirection, setDragDirection] = useState<SwipeDirection | null>(null);
  const [dragOffset, setDragOffset] = useState<DragOffset>({ x: 0, y: 0 });
  const [isDraggingUi, setIsDraggingUi] = useState(false);
  const [exitStyle, setExitStyle] = useState<CSSProperties | null>(null);

  const pointerDown = useRef(false);
  const pointerId = useRef<number | null>(null);
  const startX = useRef(0);
  const startY = useRef(0);
  const hasMoved = useRef(false);
  const isAnimating = useRef(false);

  const currentWord = words[currentIndex] ?? null;
  const currentAction = currentWord ? actions[currentWord.id] : undefined;

  const resetPointer = useCallback(() => {
    pointerDown.current = false;
    pointerId.current = null;
    hasMoved.current = false;
    setIsDraggingUi(false);
    setDragOffset({ x: 0, y: 0 });
    setDragDirection(null);
  }, []);

  const handleSwipe = useCallback(
    (direction: SwipeDirection, fromOffset: DragOffset = { x: 0, y: 0 }) => {
      if (isAnimating.current || !currentWord || words.length === 0) {
        return;
      }

      if (direction === 'down') {
        setActions((previousActions) => {
          if (previousActions[currentWord.id] !== 'favorite') {
            return previousActions;
          }

          const nextActions = { ...previousActions };
          delete nextActions[currentWord.id];
          return nextActions;
        });
        resetPointer();
        return;
      }

      const actionKey = ACTION_BY_DIRECTION[direction];

      if (direction === 'up') {
        setActions((previousActions) => ({
          ...previousActions,
          [currentWord.id]: actionKey,
        }));
        resetPointer();
        return;
      }

      isAnimating.current = true;
      setActions((previousActions) => ({
        ...previousActions,
        [currentWord.id]: actionKey,
      }));

      setTimeout(() => {
        setIsDraggingUi(false);
        setExitStyle(getExitStyle(direction, fromOffset));
        setSwiped(direction);
      }, SWIPE_RELEASE_DELAY_MS);

      setTimeout(() => {
        setSwiped(null);
        setExitStyle(null);
        setIsFlipped(false);
        setCurrentIndex((previousIndex) => (previousIndex + 1) % words.length);
        resetPointer();
        isAnimating.current = false;
      }, SWIPE_RELEASE_DELAY_MS + SWIPE_EXIT_ANIMATION_MS);
    },
    [currentWord, resetPointer, words.length]
  );

  const handleKeyboard = useCallback(
    (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        handleSwipe('left');
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        handleSwipe('right');
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        handleSwipe('up');
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        handleSwipe('down');
      }
    },
    [handleSwipe]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, [handleKeyboard]);

  const cardStyle = useMemo(() => {
    const baseStyle: CSSProperties = {};

    if (swiped && exitStyle) {
      baseStyle.transform = exitStyle.transform;
      baseStyle.opacity = 0;
    } else {
      const rotation = Math.max(-18, Math.min(18, dragOffset.x * 0.08));
      baseStyle.transform = `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${rotation}deg)`;
      baseStyle.opacity = 1;
    }

    if (dragDirection) {
      return {
        ...baseStyle,
        ...DRAG_BORDER_STYLE_BY_DIRECTION[dragDirection],
        transition: isDraggingUi ? 'none' : undefined,
      };
    }

    return {
      ...baseStyle,
      transition: isDraggingUi ? 'none' : undefined,
    };
  }, [dragDirection, dragOffset.x, dragOffset.y, exitStyle, isDraggingUi, swiped]);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (isAnimating.current) {
      return;
    }

    pointerDown.current = true;
    pointerId.current = event.pointerId;
    hasMoved.current = false;
    setIsDraggingUi(true);
    setDragOffset({ x: 0, y: 0 });
    startX.current = event.clientX;
    startY.current = event.clientY;
    setDragDirection(null);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!pointerDown.current || event.pointerId !== pointerId.current) {
      return;
    }

    const deltaX = event.clientX - startX.current;
    const deltaY = event.clientY - startY.current;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    setDragOffset({ x: deltaX, y: deltaY });

    if (absX > DEAD_ZONE || absY > DEAD_ZONE) {
      hasMoved.current = true;
    }

    if (absY > absX && deltaY < -INDICATOR_THRESHOLD) {
      setDragDirection('up');
    } else if (absY > absX && deltaY > INDICATOR_THRESHOLD) {
      setDragDirection('down');
    } else if (deltaX > INDICATOR_THRESHOLD) {
      setDragDirection('right');
    } else if (deltaX < -INDICATOR_THRESHOLD) {
      setDragDirection('left');
    } else {
      setDragDirection(null);
    }
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!pointerDown.current || event.pointerId !== pointerId.current) {
      return;
    }

    const deltaX = event.clientX - startX.current;
    const deltaY = event.clientY - startY.current;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    if (!hasMoved.current) {
      setIsFlipped((previous) => !previous);
      resetPointer();
      return;
    }

    if (absY > absX && deltaY < -SWIPE_THRESHOLD) {
      handleSwipe('up', { x: deltaX, y: deltaY });
      return;
    }

    if (absY > absX && deltaY > SWIPE_THRESHOLD) {
      handleSwipe('down', { x: deltaX, y: deltaY });
      return;
    }

    if (absX > SWIPE_THRESHOLD) {
      handleSwipe(deltaX > 0 ? 'right' : 'left', { x: deltaX, y: deltaY });
      return;
    }

    resetPointer();
  };

  return {
    currentIndex,
    isFlipped,
    actions,
    dragDirection,
    currentAction,
    currentWord,
    cardStyle,
    setIsFlipped,
    handleSwipe,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel: resetPointer,
  };
};
