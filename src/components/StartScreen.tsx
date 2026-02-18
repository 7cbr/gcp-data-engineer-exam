import { domains } from '../data/questions';

interface StartScreenProps {
  onStart: () => void;
  questionCount: number;
}

export function StartScreen({ onStart, questionCount }: StartScreenProps) {
  return (
    <div className="max-w-3xl mx-auto text-center">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Google Cloud Professional Data Engineer
        </h1>
        <p className="text-xl text-blue-600 font-semibold">Examen Blanc</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 mb-8 text-left">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Informations</h2>
        <ul className="space-y-2 text-gray-600">
          <li><strong>{questionCount} questions</strong> à choix multiples</li>
          <li>Certaines questions ont <strong>plusieurs bonnes réponses</strong> (indiqué sur la question)</li>
          <li>Pas de limite de temps (l'examen réel dure 2h)</li>
          <li>Score affiché à la fin avec corrigé détaillé</li>
        </ul>

        <h3 className="text-md font-semibold text-gray-800 mt-6 mb-3">Domaines couverts :</h3>
        <ol className="space-y-1 text-gray-600 text-sm list-decimal list-inside">
          {domains.map((domain, i) => (
            <li key={i}>{domain}</li>
          ))}
        </ol>
      </div>

      <button
        onClick={onStart}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-12 rounded-lg text-lg transition-colors cursor-pointer"
      >
        Commencer l'examen
      </button>
    </div>
  );
}
