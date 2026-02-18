import { useState, useEffect } from 'react';
import { questions } from './data/questions';
import { Question } from './data/types';
import { StartScreen } from './components/StartScreen';
import { ExamScreen } from './components/ExamScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { ReviewScreen } from './components/ReviewScreen';

type Screen = 'start' | 'exam' | 'results' | 'review';

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function App() {
  const [screen, setScreen] = useState<Screen>('start');
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>(questions);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});

  const handleStart = () => {
    setShuffledQuestions(shuffleArray(questions));
    setAnswers({});
    setScreen('exam');
  };

  const handleSubmit = (submittedAnswers: Record<number, string[]>) => {
    setAnswers(submittedAnswers);
    setScreen('results');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [screen]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">&#9729;</span>
            <span className="font-bold text-gray-900">GCP Data Engineer</span>
          </div>
          {screen !== 'start' && (
            <button
              onClick={() => setScreen('start')}
              className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              Accueil
            </button>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {screen === 'start' && (
          <StartScreen onStart={handleStart} questionCount={questions.length} />
        )}
        {screen === 'exam' && (
          <ExamScreen questions={shuffledQuestions} onSubmit={handleSubmit} />
        )}
        {screen === 'results' && (
          <ResultsScreen
            questions={shuffledQuestions}
            answers={answers}
            onShowReview={() => setScreen('review')}
            onRestart={handleStart}
          />
        )}
        {screen === 'review' && (
          <ReviewScreen
            questions={shuffledQuestions}
            answers={answers}
            onBack={() => setScreen('results')}
            onRestart={handleStart}
          />
        )}
      </main>
    </div>
  );
}

export default App;
