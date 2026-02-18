import { useState, useRef } from 'react';
import { Question } from '../data/types';
import { QuestionCard } from './QuestionCard';

interface ExamScreenProps {
  questions: Question[];
  onSubmit: (answers: Record<number, string[]>) => void;
}

export function ExamScreen({ questions, onSubmit }: ExamScreenProps) {
  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const [showConfirm, setShowConfirm] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  const handleSelectAnswer = (questionId: number, answer: string) => {
    const question = questions.find((q) => q.id === questionId)!;
    const isMultiple = question.correctAnswers.length > 1;
    const current = answers[questionId] || [];

    let updated: string[];
    if (isMultiple) {
      updated = current.includes(answer)
        ? current.filter((a) => a !== answer)
        : [...current, answer];
    } else {
      updated = current.includes(answer) ? [] : [answer];
    }

    setAnswers({ ...answers, [questionId]: updated });
  };

  const answeredCount = Object.values(answers).filter((a) => a.length > 0).length;
  const progress = Math.round((answeredCount / questions.length) * 100);

  const handleSubmit = () => {
    if (answeredCount < questions.length) {
      setShowConfirm(true);
    } else {
      onSubmit(answers);
    }
  };

  return (
    <div className="max-w-3xl mx-auto" ref={topRef}>
      {/* Sticky progress bar */}
      <div className="sticky top-0 z-10 bg-gray-50 pb-4 pt-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">
            {answeredCount}/{questions.length} réponses
          </span>
          <span className="text-sm font-medium text-blue-600">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {questions.map((q, i) => (
        <QuestionCard
          key={q.id}
          question={q}
          index={i}
          total={questions.length}
          selectedAnswers={answers[q.id] || []}
          onSelectAnswer={handleSelectAnswer}
        />
      ))}

      <div className="text-center py-8">
        <button
          onClick={handleSubmit}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-12 rounded-lg text-lg transition-colors cursor-pointer"
        >
          Terminer l'examen
        </button>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md mx-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Attention</h3>
            <p className="text-gray-600 mb-6">
              Vous n'avez répondu qu'à <strong>{answeredCount}</strong> questions
              sur <strong>{questions.length}</strong>. Les questions sans réponse
              seront comptées comme incorrectes.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer"
              >
                Continuer l'examen
              </button>
              <button
                onClick={() => onSubmit(answers)}
                className="flex-1 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer"
              >
                Soumettre
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
