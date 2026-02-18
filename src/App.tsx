import { useState, useEffect } from 'react';
import { questions } from './data/questions';
import type { Question } from './data/types';
import { StartScreen } from './components/StartScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultsScreen } from './components/ResultsScreen';

const QUIZ_SIZE = 10;

type Screen = 'start' | 'quiz' | 'results';

function pickRandom<T>(array: T[], count: number): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

function App() {
  const [screen, setScreen] = useState<Screen>('start');
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [finalScore, setFinalScore] = useState({ score: 0, total: 0 });

  const handleStart = () => {
    setQuizQuestions(pickRandom(questions, QUIZ_SIZE));
    setScreen('quiz');
  };

  const handleFinish = (score: number, total: number) => {
    setFinalScore({ score, total });
    setScreen('results');
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [screen]);

  return (
    <div className="min-h-screen bg-surface text-white">
      {/* Background gradient */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gcp-blue/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gcp-green/8 rounded-full blur-3xl" />
      </div>

      <header className="glass sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gcp-blue to-gcp-green flex items-center justify-center text-sm font-bold">
              GCP
            </div>
            <span className="font-semibold text-white/90">Data Engineer Quiz</span>
          </div>
          {screen !== 'start' && (
            <button
              onClick={() => setScreen('start')}
              className="text-sm text-white/50 hover:text-white/80 transition-colors cursor-pointer"
            >
              Quitter
            </button>
          )}
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        {screen === 'start' && (
          <StartScreen onStart={handleStart} totalQuestions={questions.length} quizSize={QUIZ_SIZE} />
        )}
        {screen === 'quiz' && (
          <QuizScreen questions={quizQuestions} onFinish={handleFinish} />
        )}
        {screen === 'results' && (
          <ResultsScreen
            score={finalScore.score}
            total={finalScore.total}
            onRestart={handleStart}
          />
        )}
      </main>
    </div>
  );
}

export default App;
