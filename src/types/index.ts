export type PartOfSpeech = 'noun' | 'verb' | 'adjective' | 'adverb' | 'numeral' | 'phrase';

export interface Word {
  id: string;
  text: string;
  pronunciation: string;
  meaning: string;
  meaningNote?: string;
  example: string;
  partOfSpeech: PartOfSpeech;
  difficulty: 'easy' | 'medium' | 'hard';
  isActive?: boolean;
}

export interface Quiz {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface ListeningExercise {
  id: string;
  title: string;
  audioUrl: string;
  transcript: string;
  level: 'beginner' | 'intermediate' | 'advanced';
}

export interface Phrase {
  id: string;
  english: string;
  turkish: string;
  pronunciation: string;
}

export interface PhraseCategory {
  id: string;
  name: string;
  phrases: Phrase[];
}
