interface ResultsScreenProps {
  score: number;
  total: number;
  onRestart: () => void;
}

export function ResultsScreen({ score, total, onRestart }: ResultsScreenProps) {
  const percentage = Math.round((score / total) * 100);
  const passed = percentage >= 70;

  const getMessage = () => {
    if (percentage === 100) return 'Score parfait !';
    if (percentage >= 80) return 'Excellent travail !';
    if (percentage >= 70) return 'Bien joue, vous avez reussi !';
    if (percentage >= 50) return 'Presque, continuez a reviser !';
    return 'Il faut encore travailler...';
  };

  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="animate-fade-in text-center">
      <div className="glass rounded-2xl p-8 sm:p-10 mb-6">
        {/* Circular progress */}
        <div className="relative w-40 h-40 mx-auto mb-6">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
            <circle
              cx="60" cy="60" r="54" fill="none"
              stroke={passed ? '#34a853' : '#ea4335'}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-4xl font-bold ${passed ? 'text-gcp-green' : 'text-gcp-red'}`}>
              {percentage}%
            </span>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-2">{getMessage()}</h2>
        <p className="text-white/40 mb-6">
          {score} bonne{score > 1 ? 's' : ''} reponse{score > 1 ? 's' : ''} sur {total}
        </p>

        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
          passed
            ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
            : 'bg-rose-500/10 border border-rose-500/20 text-rose-400'
        }`}>
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: passed ? '#34a853' : '#ea4335' }} />
          {passed ? 'Seuil de 70% atteint' : 'Seuil de 70% non atteint'}
        </div>
      </div>

      <button
        onClick={onRestart}
        className="w-full py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-gcp-blue to-gcp-blue/80 text-white transition-all cursor-pointer shadow-lg shadow-gcp-blue/20 hover:shadow-gcp-blue/30"
      >
        Nouveau quiz
      </button>
    </div>
  );
}
