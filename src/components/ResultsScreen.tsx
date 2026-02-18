import type { DomainScore } from '../data/types';
import { domains } from '../data/questions';

interface ResultsScreenProps {
  score: number;
  total: number;
  domainScores: DomainScore[];
  onRestart: () => void;
}

const SHORT_LABELS = [
  'Conception',
  'Ingestion',
  'Stockage',
  'Securite',
  'ML / AI',
  'Fiabilite',
] as const;

function RadarChart({ domainScores }: { domainScores: DomainScore[] }) {
  const cx = 150;
  const cy = 150;
  const maxR = 100;
  const axes = domains.length;
  const angleStep = (2 * Math.PI) / axes;
  const levels = [0.25, 0.5, 0.75, 1];

  const scoreMap = new Map(domainScores.map((d) => [d.domain, d]));

  const getPoint = (index: number, radius: number) => {
    const angle = angleStep * index - Math.PI / 2;
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  };

  const hexagonPath = (radius: number) => {
    const points = Array.from({ length: axes }, (_, i) => getPoint(i, radius));
    return points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + ' Z';
  };

  const dataValues = domains.map((domain) => {
    const entry = scoreMap.get(domain);
    if (!entry || entry.total === 0) return 0;
    return entry.correct / entry.total;
  });

  const dataPoints = dataValues.map((v, i) => getPoint(i, v * maxR));
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + ' Z';

  return (
    <svg viewBox="0 0 300 300" className="w-full max-w-[280px] mx-auto">
      {/* Concentric hexagons */}
      {levels.map((level) => (
        <path
          key={level}
          d={hexagonPath(maxR * level)}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
        />
      ))}

      {/* Axis lines */}
      {Array.from({ length: axes }, (_, i) => {
        const p = getPoint(i, maxR);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={p.x}
            y2={p.y}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />
        );
      })}

      {/* Data polygon */}
      <path d={dataPath} fill="rgba(66,133,244,0.2)" stroke="#4285f4" strokeWidth="2" />

      {/* Data points */}
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="4" fill="#4285f4" stroke="#1a1a2e" strokeWidth="2" />
      ))}

      {/* Labels */}
      {Array.from({ length: axes }, (_, i) => {
        const labelR = maxR + 28;
        const p = getPoint(i, labelR);
        return (
          <text
            key={i}
            x={p.x}
            y={p.y}
            textAnchor="middle"
            dominantBaseline="central"
            fill="rgba(255,255,255,0.5)"
            fontSize="10"
            fontWeight="500"
          >
            {SHORT_LABELS[i]}
          </text>
        );
      })}
    </svg>
  );
}

function DomainBreakdown({ domainScores }: { domainScores: DomainScore[] }) {
  const scoreMap = new Map(domainScores.map((d) => [d.domain, d]));

  return (
    <div className="space-y-3">
      {domains.map((domain, i) => {
        const entry = scoreMap.get(domain);
        const hasData = entry && entry.total > 0;
        const pct = hasData ? Math.round((entry.correct / entry.total) * 100) : 0;

        let barColor = 'bg-rose-500';
        if (pct >= 70) barColor = 'bg-emerald-500';
        else if (pct >= 40) barColor = 'bg-amber-500';

        return (
          <div key={i}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-white/70 truncate mr-2">{SHORT_LABELS[i]}</span>
              <span className="text-sm font-medium text-white/50 shrink-0">
                {hasData ? `${entry.correct}/${entry.total}` : '--'}
              </span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ease-out ${hasData ? barColor : 'bg-white/10'}`}
                style={{ width: `${hasData ? pct : 0}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function DomainSummary({ domainScores }: { domainScores: DomainScore[] }) {
  const scoreMap = new Map(domainScores.map((d) => [d.domain, d]));

  const strong: string[] = [];
  const weak: string[] = [];

  domains.forEach((domain, i) => {
    const entry = scoreMap.get(domain);
    if (!entry || entry.total === 0) return;
    const pct = (entry.correct / entry.total) * 100;
    if (pct >= 70) strong.push(SHORT_LABELS[i]);
    else if (pct < 50) weak.push(SHORT_LABELS[i]);
  });

  if (strong.length === 0 && weak.length === 0) return null;

  return (
    <div className="space-y-3">
      {strong.length > 0 && (
        <div className="flex items-start gap-2">
          <span className="w-5 h-5 rounded-md bg-emerald-500/20 flex items-center justify-center text-xs text-emerald-400 shrink-0 mt-0.5">
            ✓
          </span>
          <div>
            <span className="text-sm font-medium text-emerald-400">Points forts</span>
            <p className="text-sm text-white/50">{strong.join(', ')}</p>
          </div>
        </div>
      )}
      {weak.length > 0 && (
        <div className="flex items-start gap-2">
          <span className="w-5 h-5 rounded-md bg-rose-500/20 flex items-center justify-center text-xs text-rose-400 shrink-0 mt-0.5">
            !
          </span>
          <div>
            <span className="text-sm font-medium text-rose-400">A reviser</span>
            <p className="text-sm text-white/50">{weak.join(', ')}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export function ResultsScreen({ score, total, domainScores, onRestart }: ResultsScreenProps) {
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

      {/* Domain results */}
      {domainScores.length > 0 && (
        <div className="glass rounded-2xl p-6 sm:p-8 mb-6 text-left">
          <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-6 text-center">
            Resultats par domaine
          </h3>

          <RadarChart domainScores={domainScores} />

          <div className="mt-8">
            <DomainBreakdown domainScores={domainScores} />
          </div>

          <div className="mt-6 pt-6 border-t border-white/5">
            <DomainSummary domainScores={domainScores} />
          </div>
        </div>
      )}

      <button
        onClick={onRestart}
        className="w-full py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-gcp-blue to-gcp-blue/80 text-white transition-all cursor-pointer shadow-lg shadow-gcp-blue/20 hover:shadow-gcp-blue/30"
      >
        Nouveau quiz
      </button>
    </div>
  );
}
