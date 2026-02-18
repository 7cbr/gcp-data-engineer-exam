import { Question } from '../data/types';
import { domains } from '../data/questions';

interface ResultsScreenProps {
  questions: Question[];
  answers: Record<number, string[]>;
  onShowReview: () => void;
  onRestart: () => void;
}

export function ResultsScreen({ questions, answers, onShowReview, onRestart }: ResultsScreenProps) {
  const results = questions.map((q) => {
    const userAnswers = (answers[q.id] || []).sort();
    const correct = [...q.correctAnswers].sort();
    const isCorrect =
      userAnswers.length === correct.length &&
      userAnswers.every((a, i) => a === correct[i]);
    return { question: q, userAnswers, isCorrect };
  });

  const score = results.filter((r) => r.isCorrect).length;
  const percentage = Math.round((score / questions.length) * 100);
  const passed = percentage >= 70;

  // Score by domain
  const domainScores = domains.map((domain) => {
    const domainResults = results.filter((r) => r.question.domain === domain);
    const domainCorrect = domainResults.filter((r) => r.isCorrect).length;
    return {
      domain,
      correct: domainCorrect,
      total: domainResults.length,
      percentage: domainResults.length > 0 ? Math.round((domainCorrect / domainResults.length) * 100) : 0,
    };
  });

  // Score by difficulty
  const difficultyScores = (['facile', 'intermédiaire', 'difficile'] as const).map((diff) => {
    const diffResults = results.filter((r) => r.question.difficulty === diff);
    const diffCorrect = diffResults.filter((r) => r.isCorrect).length;
    return {
      difficulty: diff,
      correct: diffCorrect,
      total: diffResults.length,
      percentage: diffResults.length > 0 ? Math.round((diffCorrect / diffResults.length) * 100) : 0,
    };
  });

  return (
    <div className="max-w-3xl mx-auto">
      {/* Score principal */}
      <div className={`rounded-xl shadow-lg p-8 mb-8 text-center ${passed ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'}`}>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Résultat de l'examen</h2>
        <div className={`text-6xl font-bold mb-2 ${passed ? 'text-green-600' : 'text-red-600'}`}>
          {percentage}%
        </div>
        <p className="text-lg text-gray-600 mb-1">
          {score}/{questions.length} réponses correctes
        </p>
        <p className={`text-lg font-semibold ${passed ? 'text-green-600' : 'text-red-600'}`}>
          {passed ? 'REUSSI (seuil : 70%)' : 'ECHEC (seuil : 70%)'}
        </p>
      </div>

      {/* Score par domaine */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Score par domaine</h3>
        <div className="space-y-3">
          {domainScores.map((ds) => (
            <div key={ds.domain}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700 truncate mr-4">{ds.domain}</span>
                <span className="font-medium text-gray-900 whitespace-nowrap">
                  {ds.correct}/{ds.total} ({ds.percentage}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${ds.percentage >= 70 ? 'bg-green-500' : 'bg-red-400'}`}
                  style={{ width: `${ds.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Score par difficulté */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Score par difficulté</h3>
        <div className="grid grid-cols-3 gap-4">
          {difficultyScores.map((ds) => (
            <div key={ds.difficulty} className="text-center p-4 rounded-lg bg-gray-50">
              <p className="text-sm text-gray-500 capitalize mb-1">{ds.difficulty}</p>
              <p className="text-2xl font-bold text-gray-900">{ds.percentage}%</p>
              <p className="text-xs text-gray-500">{ds.correct}/{ds.total}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4 justify-center pb-8">
        <button
          onClick={onShowReview}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors cursor-pointer"
        >
          Voir le corrigé détaillé
        </button>
        <button
          onClick={onRestart}
          className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-bold py-3 px-8 rounded-lg transition-colors cursor-pointer"
        >
          Recommencer
        </button>
      </div>
    </div>
  );
}
