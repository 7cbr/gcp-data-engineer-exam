import { domains } from '../data/questions';

interface StartScreenProps {
  onStart: () => void;
  totalQuestions: number;
  quizSize: number;
  sizeOptions: number[];
  onSizeChange: (size: number) => void;
}

export function StartScreen({ onStart, totalQuestions, quizSize, sizeOptions, onSizeChange }: StartScreenProps) {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gcp-blue/10 border border-gcp-blue/20 text-gcp-blue text-sm mb-6">
          <span className="w-2 h-2 rounded-full bg-gcp-blue animate-pulse" />
          {totalQuestions} questions disponibles
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
          Google Cloud<br />Professional Data Engineer
        </h1>
        <p className="text-lg text-white/50">
          Testez vos connaissances avec un quiz de {quizSize} questions
        </p>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        <div className="glass rounded-xl p-4">
          <div className="text-2xl font-bold text-gcp-blue mb-1">{quizSize}</div>
          <div className="text-sm text-white/50">Questions par quiz</div>
        </div>
        <div className="glass rounded-xl p-4">
          <div className="text-2xl font-bold text-gcp-green mb-1">6</div>
          <div className="text-sm text-white/50">Domaines couverts</div>
        </div>
      </div>

      {/* Quiz size selector */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-3">Nombre de questions</h3>
        <div className="flex flex-wrap gap-2">
          {sizeOptions.map((size) => (
            <button
              key={size}
              onClick={() => onSizeChange(size)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                size === quizSize
                  ? 'bg-gcp-blue text-white shadow-lg shadow-gcp-blue/25'
                  : 'glass text-white/60 hover:text-white/80 hover:bg-white/10'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Domains */}
      <div className="glass rounded-xl p-5 mb-8">
        <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-4">Domaines</h3>
        <div className="space-y-2">
          {domains.map((domain, i) => (
            <div key={i} className="flex items-center gap-3 text-sm text-white/70">
              <span className="w-5 h-5 rounded-md bg-gradient-to-br from-gcp-blue/20 to-gcp-green/20 flex items-center justify-center text-xs text-white/50 shrink-0">
                {i + 1}
              </span>
              {domain}
            </div>
          ))}
        </div>
      </div>

      {/* Start button */}
      <button
        onClick={onStart}
        className="w-full py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-gcp-blue to-gcp-blue/80 hover:from-gcp-blue/90 hover:to-gcp-blue/70 text-white transition-all cursor-pointer shadow-lg shadow-gcp-blue/20 hover:shadow-gcp-blue/30"
      >
        Commencer le quiz
      </button>
    </div>
  );
}
