import { Question } from '../data/types';

interface ReviewScreenProps {
  questions: Question[];
  answers: Record<number, string[]>;
  onBack: () => void;
  onRestart: () => void;
}

const difficultyColors = {
  facile: 'bg-green-100 text-green-800',
  intermédiaire: 'bg-yellow-100 text-yellow-800',
  difficile: 'bg-red-100 text-red-800',
};

export function ReviewScreen({ questions, answers, onBack, onRestart }: ReviewScreenProps) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Corrigé détaillé</h2>
        <button
          onClick={onBack}
          className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
        >
          Retour aux résultats
        </button>
      </div>

      {questions.map((q, index) => {
        const userAnswers = (answers[q.id] || []).sort();
        const correct = [...q.correctAnswers].sort();
        const isCorrect =
          userAnswers.length === correct.length &&
          userAnswers.every((a, i) => a === correct[i]);

        return (
          <div
            key={q.id}
            className={`bg-white rounded-xl shadow-md p-6 mb-6 border-l-4 ${
              isCorrect ? 'border-l-green-500' : 'border-l-red-500'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-500">
                  Question {index + 1}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {isCorrect ? 'Correct' : 'Incorrect'}
                </span>
              </div>
              <div className="flex gap-2">
                <span className={`text-xs px-2 py-1 rounded-full ${difficultyColors[q.difficulty]}`}>
                  {q.difficulty}
                </span>
              </div>
            </div>

            {/* Question */}
            <p className="text-gray-900 font-medium mb-4">{q.question}</p>

            {/* Options with correct/incorrect markings */}
            <div className="space-y-2 mb-4">
              {q.options.map((option) => {
                const isUserSelected = userAnswers.includes(option.label);
                const isCorrectAnswer = q.correctAnswers.includes(option.label);

                let style = 'border-gray-200 text-gray-600';
                if (isCorrectAnswer) {
                  style = 'border-green-400 bg-green-50 text-green-900';
                } else if (isUserSelected && !isCorrectAnswer) {
                  style = 'border-red-400 bg-red-50 text-red-900';
                }

                return (
                  <div
                    key={option.label}
                    className={`p-3 rounded-lg border-2 ${style}`}
                  >
                    <div className="flex items-start gap-2">
                      <span className="font-semibold">{option.label}.</span>
                      <span className="flex-1">{option.text}</span>
                      <div className="flex gap-1 shrink-0">
                        {isCorrectAnswer && (
                          <span className="text-green-600 font-bold text-lg" title="Bonne réponse">&#10003;</span>
                        )}
                        {isUserSelected && !isCorrectAnswer && (
                          <span className="text-red-600 font-bold text-lg" title="Votre réponse">&#10007;</span>
                        )}
                        {isUserSelected && isCorrectAnswer && (
                          <span className="text-blue-500 text-xs mt-1">(votre réponse)</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Explanation */}
            <div className="bg-blue-50 rounded-lg p-4 mb-3">
              <h4 className="font-semibold text-blue-900 mb-1">Explication</h4>
              <p className="text-blue-800 text-sm">{q.explanation}</p>
            </div>

            {/* Why others are wrong */}
            <div className="bg-gray-50 rounded-lg p-4 mb-3">
              <h4 className="font-semibold text-gray-700 mb-2">Pourquoi les autres options sont incorrectes</h4>
              <div className="space-y-1">
                {Object.entries(q.whyOthersWrong).map(([label, reason]) => (
                  <p key={label} className="text-sm text-gray-600">
                    <span className="font-semibold">{label}.</span> {reason}
                  </p>
                ))}
              </div>
            </div>

            {/* GCP Link */}
            {q.gcpLink && (
              <a
                href={q.gcpLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
              >
                Documentation GCP associée
              </a>
            )}
          </div>
        );
      })}

      <div className="text-center py-8">
        <button
          onClick={onRestart}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors cursor-pointer"
        >
          Recommencer l'examen
        </button>
      </div>
    </div>
  );
}
