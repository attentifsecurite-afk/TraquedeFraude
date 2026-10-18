import { useState, useEffect } from 'react';

interface Anomaly {
  id: number;
  type: string;
  description: string;
  confidence: number;
  timestamp: string;
  status: 'detected' | 'analyzing' | 'confirmed' | 'blocked';
  source: string;
}

const anomalyTypes = [
  { type: 'Trafic Anormal', desc: 'Pic de trafic 340% au-dessus de la normale', source: 'CDN Edge Node #47' },
  { type: 'Comportement Utilisateur', desc: 'Pattern de navigation suspect - bot détecté', source: 'Module ML v3.2' },
  { type: 'Exfiltration Données', desc: 'Transfert massif de données vers IP externe', source: 'DLP Scanner' },
  { type: 'Authentification Anormale', desc: '50 tentatives de login depuis 12 pays en 5min', source: 'Auth Guard' },
  { type: 'DNS Anomaly', desc: 'Requêtes DNS vers domaines C2 connus', source: 'DNS Monitor' },
  { type: 'Port Scan', desc: 'Scan de ports détecté sur infrastructure critique', source: 'IDS Sensor #12' },
  { type: 'Crypto Anomaly', desc: 'Activité de minage cryptomonnaie détectée', source: 'Endpoint Agent' },
  { type: 'Lateral Movement', desc: 'Mouvement latéral détecté dans le réseau interne', source: 'NDR Engine' },
];

export default function AnomalyDetector() {
  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);
  const [aiScore, setAiScore] = useState(97.3);
  const [scanning, setScanning] = useState(true);

  useEffect(() => {
    // Generate initial anomalies
    const initial = anomalyTypes.slice(0, 5).map((a, i) => ({
      id: i + 1,
      type: a.type,
      description: a.desc,
      confidence: Math.floor(Math.random() * 30 + 70),
      timestamp: new Date(Date.now() - Math.random() * 3600000).toLocaleTimeString(),
      status: (['detected', 'analyzing', 'confirmed', 'blocked'] as const)[Math.floor(Math.random() * 4)],
      source: a.source,
    }));
    setAnomalies(initial);

    const interval = setInterval(() => {
      const randomType = anomalyTypes[Math.floor(Math.random() * anomalyTypes.length)];
      const newAnomaly: Anomaly = {
        id: Date.now(),
        type: randomType.type,
        description: randomType.desc,
        confidence: Math.floor(Math.random() * 30 + 70),
        timestamp: new Date().toLocaleTimeString(),
        status: 'detected',
        source: randomType.source,
      };
      setAnomalies(prev => [newAnomaly, ...prev.slice(0, 14)]);
      setAiScore(prev => Math.min(99.9, prev + (Math.random() - 0.3) * 0.5));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      detected: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      analyzing: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
      confirmed: 'bg-red-500/20 text-red-400 border-red-500/30',
      blocked: 'bg-green-500/20 text-green-400 border-green-500/30',
    };
    const labels: Record<string, string> = {
      detected: 'Détecté',
      analyzing: 'Analyse...',
      confirmed: 'Confirmé',
      blocked: 'Bloqué',
    };
    return (
      <span className={`px-2 py-0.5 rounded-full text-xs border ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* AI Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass rounded-xl p-4 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/30 to-cyan-500/30 flex items-center justify-center relative">
            <div className="absolute inset-0 rounded-full border-2 border-purple-500/50 animate-ping"></div>
            <i className="fas fa-brain text-2xl text-purple-400"></i>
          </div>
          <div>
            <p className="text-xs text-gray-400">Score IA Détection</p>
            <p className="text-2xl font-bold text-purple-400 font-mono">{aiScore.toFixed(1)}%</p>
            <p className="text-xs text-green-400">Modèle v4.2 - Actif</p>
          </div>
        </div>

        <div className="glass rounded-xl p-4 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-500/30 flex items-center justify-center">
            <i className="fas fa-satellite-dish text-2xl text-cyan-400"></i>
          </div>
          <div>
            <p className="text-xs text-gray-400">Points de Surveillance</p>
            <p className="text-2xl font-bold text-cyan-400 font-mono">2,847</p>
            <p className="text-xs text-green-400">Tous opérationnels</p>
          </div>
        </div>

        <div className="glass rounded-xl p-4 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500/30 to-orange-500/30 flex items-center justify-center">
            <i className="fas fa-exclamation-triangle text-2xl text-red-400"></i>
          </div>
          <div>
            <p className="text-xs text-gray-400">Anomalies Actives</p>
            <p className="text-2xl font-bold text-red-400 font-mono">{anomalies.length}</p>
            <p className="text-xs text-yellow-400">{anomalies.filter(a => a.status === 'confirmed').length} confirmées</p>
          </div>
        </div>
      </div>

      {/* Scanning Animation */}
      <div className="glass rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <i className="fas fa-radar text-green-400"></i>
            Scanner d'Anomalies IA
          </h2>
          <button 
            onClick={() => setScanning(!scanning)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              scanning ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
            }`}
          >
            <i className={`fas ${scanning ? 'fa-stop' : 'fa-play'} mr-2`}></i>
            {scanning ? 'Arrêter' : 'Démarrer'}
          </button>
        </div>

        {/* Scanning visualization */}
        <div className="relative h-24 bg-black/50 rounded-lg overflow-hidden mb-4">
          {scanning && (
            <>
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-green-500 to-transparent animate-pulse"></div>
              </div>
              <div className="absolute inset-0 animate-scan">
                <div className="w-full h-8 bg-gradient-to-b from-green-500/20 to-transparent"></div>
              </div>
            </>
          )}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex gap-1">
              {Array.from({ length: 40 }).map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-green-500 rounded-full transition-all"
                  style={{
                    height: `${scanning ? Math.random() * 60 + 10 : 10}%`,
                    opacity: scanning ? 0.3 + Math.random() * 0.7 : 0.2,
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Anomaly List */}
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {anomalies.map(anomaly => (
            <div key={anomaly.id} className="p-3 rounded-lg bg-black/30 border border-gray-800 hover:border-green-500/30 transition">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    anomaly.status === 'confirmed' ? 'bg-red-500' :
                    anomaly.status === 'blocked' ? 'bg-green-500' :
                    anomaly.status === 'analyzing' ? 'bg-cyan-500' : 'bg-yellow-500'
                  } animate-pulse`}></div>
                  <span className="text-sm font-medium text-white">{anomaly.type}</span>
                  {getStatusBadge(anomaly.status)}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400 font-mono">{anomaly.timestamp}</span>
                  <div className="flex items-center gap-1">
                    <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          anomaly.confidence > 90 ? 'bg-red-500' :
                          anomaly.confidence > 75 ? 'bg-orange-500' : 'bg-yellow-500'
                        }`}
                        style={{ width: `${anomaly.confidence}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-400 font-mono">{anomaly.confidence}%</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-400 ml-5">{anomaly.description}</p>
              <p className="text-xs text-gray-500 ml-5 mt-1">Source: {anomaly.source}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
