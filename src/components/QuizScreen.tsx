import { useState, useRef } from 'react';
import type { Question, DomainScore } from '../data/types';

interface QuizScreenProps {
  questions: Question[];
  onFinish: (score: number, total: number, domainScores: DomainScore[]) => void;
}

const difficultyConfig = {
  facile: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
  intermédiaire: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
  difficile: { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/20' },
};

export function QuizScreen({ questions, onFinish }: QuizScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const resultsRef = useRef<{ domain: string; correct: boolean }[]>([]);

  const question = questions[currentIndex];
  const isMultiple = question.correctAnswers.length > 1;
  const correctSet = new Set(question.correctAnswers);
  const diff = difficultyConfig[question.difficulty];

  const isCorrect =
    hasSubmitted &&
    selectedAnswers.length === question.correctAnswers.length &&
    selectedAnswers.every((a) => correctSet.has(a));

  const handleSelect = (label: string) => {
    if (hasSubmitted) return;
    if (isMultiple) {
      setSelectedAnswers((prev) =>
        prev.includes(label) ? prev.filter((a) => a !== label) : [...prev, label]
      );
    } else {
      setSelectedAnswers([label]);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswers.length === 0) return;
    setHasSubmitted(true);
    const wasCorrect =
      selectedAnswers.length === question.correctAnswers.length &&
      selectedAnswers.every((a) => correctSet.has(a));
    if (wasCorrect) {
      setScore((s) => s + 1);
    }
    resultsRef.current.push({ domain: question.domain, correct: wasCorrect });
  };

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      const domainMap = new Map<string, { correct: number; total: number }>();
      for (const r of resultsRef.current) {
        const entry = domainMap.get(r.domain) ?? { correct: 0, total: 0 };
        entry.total++;
        if (r.correct) entry.correct++;
        domainMap.set(r.domain, entry);
      }
      const domainScores: DomainScore[] = Array.from(domainMap, ([domain, { correct, total }]) => ({
        domain,
        correct,
        total,
      }));
      onFinish(score, questions.length, domainScores);
      return;
    }
    setCurrentIndex((i) => i + 1);
    setSelectedAnswers([]);
    setHasSubmitted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const progress = ((currentIndex + (hasSubmitted ? 1 : 0)) / questions.length) * 100;

  return (
    <div className="animate-fade-in">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-white/80">
              {currentIndex + 1}
              <span className="text-white/30">/{questions.length}</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-white/40">Score</span>
            <span className="text-sm font-semibold text-gcp-green">
              {score}/{currentIndex + (hasSubmitted ? 1 : 0)}
            </span>
          </div>
        </div>
        <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-gcp-blue to-gcp-green h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      <div className="glass rounded-2xl p-6 sm:p-8 mb-4 animate-slide-up" key={question.id}>
        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <span className={`text-xs px-2.5 py-1 rounded-full border ${diff.bg} ${diff.text} ${diff.border}`}>
            {question.difficulty}
          </span>
          <span className="text-xs px-2.5 py-1 rounded-full border border-white/10 bg-white/5 text-white/50">
            {question.domain}
          </span>
        </div>

        {/* Question text */}
        <p className="text-white/90 font-medium text-lg leading-relaxed mb-6">
          {question.question}
        </p>

        {isMultiple && !hasSubmitted && (
          <p className="text-sm text-amber-400 font-medium mb-4 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Selectionnez {question.correctAnswers.length} reponses
          </p>
        )}

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option) => {
            const isSelected = selectedAnswers.includes(option.label);
            const isCorrectAnswer = correctSet.has(option.label);

            let classes = 'border-white/8 hover:border-white/20 hover:bg-white/5 text-white/70';
            if (hasSubmitted) {
              if (isCorrectAnswer) {
                classes = 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300';
              } else if (isSelected && !isCorrectAnswer) {
                classes = 'border-rose-500/40 bg-rose-500/10 text-rose-300';
              } else {
                classes = 'border-white/5 text-white/25';
              }
            } else if (isSelected) {
              classes = 'border-gcp-blue/50 bg-gcp-blue/10 text-white';
            }

            return (
              <button
                key={option.label}
                onClick={() => handleSelect(option.label)}
                disabled={hasSubmitted}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${classes} ${hasSubmitted ? '' : 'cursor-pointer'}`}
              >
                <div className="flex items-start gap-3">
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm font-semibold shrink-0 ${
                    hasSubmitted && isCorrectAnswer ? 'bg-emerald-500/20 text-emerald-400' :
                    hasSubmitted && isSelected && !isCorrectAnswer ? 'bg-rose-500/20 text-rose-400' :
                    isSelected ? 'bg-gcp-blue/20 text-gcp-blue' :
                    'bg-white/5 text-white/40'
                  }`}>
                    {hasSubmitted && isCorrectAnswer ? '\u2713' :
                     hasSubmitted && isSelected && !isCorrectAnswer ? '\u2717' :
                     option.label}
                  </span>
                  <span className="flex-1 pt-0.5">{option.text}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Validate button */}
        {!hasSubmitted && (
          <button
            onClick={handleSubmit}
            disabled={selectedAnswers.length === 0}
            className={`mt-6 w-full py-3.5 rounded-xl font-semibold transition-all duration-200 ${
              selectedAnswers.length === 0
                ? 'bg-white/5 text-white/20 cursor-not-allowed'
                : 'bg-gradient-to-r from-gcp-blue to-gcp-blue/80 text-white cursor-pointer shadow-lg shadow-gcp-blue/20 hover:shadow-gcp-blue/30'
            }`}
          >
            Valider ma reponse
          </button>
        )}
      </div>

      {/* Correction section */}
      {hasSubmitted && (
        <div className="space-y-3 animate-slide-up">
          {/* Result banner */}
          <div className={`rounded-xl p-4 flex items-center gap-3 ${
            isCorrect
              ? 'bg-emerald-500/10 border border-emerald-500/20'
              : 'bg-rose-500/10 border border-rose-500/20'
          }`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
              isCorrect ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
            }`}>
              {isCorrect ? '\u2713' : '\u2717'}
            </div>
            <div>
              <p className={`font-semibold ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                {isCorrect ? 'Bonne reponse !' : 'Mauvaise reponse'}
              </p>
              {!isCorrect && (
                <p className="text-sm text-white/40 mt-0.5">
                  Reponse correcte : <span className="text-white/60 font-medium">{question.correctAnswers.join(', ')}</span>
                </p>
              )}
            </div>
          </div>

          {/* Explanation */}
          <div className="glass rounded-xl p-5">
            <h4 className="text-sm font-semibold text-gcp-blue mb-2 uppercase tracking-wider">Explication</h4>
            <p className="text-white/70 text-sm leading-relaxed">{question.explanation}</p>
          </div>

          {/* Why others wrong */}
          <div className="glass-light rounded-xl p-5">
            <h4 className="text-sm font-semibold text-white/40 mb-3 uppercase tracking-wider">Options incorrectes</h4>
            <div className="space-y-3">
              {Object.entries(question.whyOthersWrong).map(([label, reason]) => (
                <div key={label} className="flex gap-3">
                  <span className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center text-xs text-white/30 shrink-0 mt-0.5">
                    {label}
                  </span>
                  <p className="text-sm text-white/50 leading-relaxed">{reason}</p>
                </div>
              ))}
            </div>
          </div>

          {/* GCP link */}
          {question.gcpLink && (
            <a
              href={question.gcpLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gcp-blue/80 hover:text-gcp-blue transition-colors px-1"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              Documentation GCP
            </a>
          )}

          {/* Next button */}
          <button
            onClick={handleNext}
            className="w-full py-3.5 rounded-xl font-semibold bg-gradient-to-r from-gcp-blue to-gcp-blue/80 text-white cursor-pointer transition-all shadow-lg shadow-gcp-blue/20 hover:shadow-gcp-blue/30"
          >
            {currentIndex + 1 < questions.length ? 'Question suivante' : 'Voir les resultats'}
          </button>
        </div>
      )}
    </div>
  );
}
