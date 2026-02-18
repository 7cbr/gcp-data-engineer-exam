export interface Question {
  id: number;
  domain: string;
  difficulty: 'facile' | 'intermédiaire' | 'difficile';
  question: string;
  options: { label: string; text: string }[];
  correctAnswers: string[];
  explanation: string;
  whyOthersWrong: Record<string, string>;
  gcpLink?: string;
}
