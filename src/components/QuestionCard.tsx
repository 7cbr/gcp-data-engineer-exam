import { Question } from '../data/types';

interface QuestionCardProps {
  question: Question;
  index: number;
  total: number;
  selectedAnswers: string[];
  onSelectAnswer: (questionId: number, answer: string) => void;
}

const difficultyColors = {
  facile: 'bg-green-100 text-green-800',
  intermédiaire: 'bg-yellow-100 text-yellow-800',
  difficile: 'bg-red-100 text-red-800',
};

export function QuestionCard({
  question,
  index,
  total,
  selectedAnswers,
  onSelectAnswer,
}: QuestionCardProps) {
  const isMultiple = question.correctAnswers.length > 1;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-500">
          Question {index + 1}/{total}
        </span>
        <div className="flex gap-2">
          <span className={`text-xs px-2 py-1 rounded-full ${difficultyColors[question.difficulty]}`}>
            {question.difficulty}
          </span>
          <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
            {question.domain}
          </span>
        </div>
      </div>

      <p className="text-gray-900 font-medium mb-4 leading-relaxed">
        {question.question}
      </p>

      {isMultiple && (
        <p className="text-sm text-orange-600 font-medium mb-3">
          Sélectionnez {question.correctAnswers.length} réponses
        </p>
      )}

      <div className="space-y-2">
        {question.options.map((option) => {
          const isSelected = selectedAnswers.includes(option.label);
          return (
            <button
              key={option.label}
              onClick={() => onSelectAnswer(question.id, option.label)}
              className={`w-full text-left p-3 rounded-lg border-2 transition-colors cursor-pointer ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 text-blue-900'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700'
              }`}
            >
              <span className="font-semibold mr-2">{option.label}.</span>
              {option.text}
            </button>
          );
        })}
      </div>
    </div>
  );
}
