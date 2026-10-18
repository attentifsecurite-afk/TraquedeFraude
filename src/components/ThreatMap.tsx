import { useState, useEffect } from 'react';

interface ThreatNode {
  id: number;
  x: number;
  y: number;
  type: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  country: string;
  ip: string;
  size: number;
}

const initialThreats: ThreatNode[] = [
  { id: 1, x: 65, y: 25, type: 'Ransomware', severity: 'critical', country: 'Russie', ip: '185.220.101.34', size: 12 },
  { id: 2, x: 45, y: 55, type: 'Phishing', severity: 'high', country: 'Nigeria', ip: '41.190.2.18', size: 8 },
  { id: 3, x: 75, y: 35, type: 'DDoS', severity: 'critical', country: 'Chine', ip: '223.71.167.99', size: 14 },
  { id: 4, x: 55, y: 40, type: 'APT', severity: 'critical', country: 'Iran', ip: '5.160.218.44', size: 10 },
  { id: 5, x: 30, y: 65, type: 'Brute Force', severity: 'medium', country: 'Brésil', ip: '177.54.150.22', size: 6 },
  { id: 6, x: 73, y: 32, type: 'Zero-Day', severity: 'critical', country: 'Corée du Nord', ip: '175.45.176.3', size: 16 },
  { id: 7, x: 52, y: 30, type: 'Crypto Mining', severity: 'medium', country: 'Ukraine', ip: '91.215.85.12', size: 7 },
  { id: 8, x: 50, y: 28, type: 'Data Exfil', severity: 'high', country: 'Roumanie', ip: '185.156.46.88', size: 9 },
  { id: 9, x: 20, y: 35, type: 'Botnet C2', severity: 'high', country: 'USA', ip: '45.33.32.156', size: 11 },
  { id: 10, x: 82, y: 45, type: 'Spyware', severity: 'medium', country: 'Inde', ip: '103.21.58.77', size: 7 },
];

export default function ThreatMap() {
  const [threats, setThreats] = useState<ThreatNode[]>(initialThreats);
  const [selectedThreat, setSelectedThreat] = useState<ThreatNode | null>(null);
  const [pulsePhase, setPulsePhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulsePhase(prev => (prev + 1) % 360);
      setThreats(prev => prev.map(t => ({
        ...t,
        x: t.x + (Math.random() - 0.5) * 0.5,
        y: t.y + (Math.random() - 0.5) * 0.5,
      })));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return '#ff0055';
      case 'high': return '#ff8800';
      case 'medium': return '#ffdd00';
      default: return '#00ff88';
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <i className="fas fa-globe text-cyan-400"></i>
            Carte Mondiale des Menaces
          </h2>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-500"></span> Critique</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-orange-500"></span> Élevé</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-yellow-500"></span> Moyen</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-green-500"></span> Faible</span>
          </div>
        </div>

        {/* World Map Visualization */}
        <div className="relative w-full h-96 bg-black/50 rounded-xl overflow-hidden border border-gray-800">
          {/* Grid overlay */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(0,255,136,0.03) 0%, transparent 70%)',
          }}></div>
          
          {/* Simplified world map outline using SVG */}
          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 50">
            {/* Continents simplified */}
            <path d="M15,15 Q20,10 25,12 L30,15 Q28,20 25,22 L20,25 Q15,22 15,15" fill="none" stroke="rgba(0,255,136,0.3)" strokeWidth="0.3"/>
            <path d="M42,10 Q50,8 55,12 L58,18 Q55,25 50,28 L45,25 Q42,20 42,10" fill="none" stroke="rgba(0,255,136,0.3)" strokeWidth="0.3"/>
            <path d="M55,15 Q65,10 75,15 L80,20 Q78,30 70,35 L60,32 Q55,25 55,15" fill="none" stroke="rgba(0,255,136,0.3)" strokeWidth="0.3"/>
            <path d="M25,30 Q30,28 35,32 L33,40 Q28,42 25,38 L25,30" fill="none" stroke="rgba(0,255,136,0.3)" strokeWidth="0.3"/>
            <path d="M70,35 Q78,32 85,38 L82,45 Q75,43 70,38 L70,35" fill="none" stroke="rgba(0,255,136,0.3)" strokeWidth="0.3"/>
          </svg>

          {/* Radar sweep */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 rounded-full border border-green-500/10 animate-radar" style={{
              background: `conic-gradient(from ${pulsePhase}deg, transparent 0deg, rgba(0,255,136,0.1) 30deg, transparent 60deg)`
            }}></div>
          </div>

          {/* Threat nodes */}
          {threats.map(threat => (
            <div
              key={threat.id}
              className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
              style={{ left: `${threat.x}%`, top: `${threat.y}%` }}
              onClick={() => setSelectedThreat(threat)}
            >
              {/* Pulse ring */}
              <div className="absolute inset-0 rounded-full animate-ping" style={{
                backgroundColor: getSeverityColor(threat.severity),
                opacity: 0.3,
                width: `${threat.size * 3}px`,
                height: `${threat.size * 3}px`,
                marginLeft: `-${threat.size}px`,
                marginTop: `-${threat.size}px`,
              }}></div>
              {/* Core dot */}
              <div className="rounded-full relative" style={{
                width: `${threat.size}px`,
                height: `${threat.size}px`,
                backgroundColor: getSeverityColor(threat.severity),
                boxShadow: `0 0 ${threat.size}px ${getSeverityColor(threat.severity)}`,
              }}></div>
            </div>
          ))}

          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {threats.map((t1, i) => 
              threats.slice(i + 1).filter(t2 => 
                Math.abs(t1.x - t2.x) < 20 && Math.abs(t1.y - t2.y) < 20
              ).map(t2 => (
                <line
                  key={`${t1.id}-${t2.id}`}
                  x1={`${t1.x}%`} y1={`${t1.y}%`}
                  x2={`${t2.x}%`} y2={`${t2.y}%`}
                  stroke="rgba(0,255,136,0.1)"
                  strokeWidth="0.5"
                  strokeDasharray="4 4"
                />
              ))
            )}
          </svg>
        </div>
      </div>

      {/* Selected Threat Details */}
      {selectedThreat && (
        <div className="glass rounded-xl p-4 border-l-4 border-red-500">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-white">
              <i className="fas fa-crosshairs text-red-400 mr-2"></i>
              Cible: {selectedThreat.country}
            </h3>
            <button onClick={() => setSelectedThreat(null)} className="text-gray-400 hover:text-white">
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-black/30 rounded-lg p-3">
              <p className="text-xs text-gray-400">Type de Menace</p>
              <p className="text-lg font-bold text-red-400">{selectedThreat.type}</p>
            </div>
            <div className="bg-black/30 rounded-lg p-3">
              <p className="text-xs text-gray-400">Adresse IP</p>
              <p className="text-lg font-bold text-cyan-400 font-mono">{selectedThreat.ip}</p>
            </div>
            <div className="bg-black/30 rounded-lg p-3">
              <p className="text-xs text-gray-400">Niveau</p>
              <p className="text-lg font-bold text-orange-400 uppercase">{selectedThreat.severity}</p>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 text-sm hover:bg-red-500/30 transition">
              <i className="fas fa-ban mr-2"></i>Bloquer IP
            </button>
            <button className="px-4 py-2 rounded-lg bg-cyan-500/20 text-cyan-400 text-sm hover:bg-cyan-500/30 transition">
              <i className="fas fa-search-location mr-2"></i>Tracer
            </button>
            <button className="px-4 py-2 rounded-lg bg-purple-500/20 text-purple-400 text-sm hover:bg-purple-500/30 transition">
              <i className="fas fa-file-alt mr-2"></i>Rapport
            </button>
          </div>
        </div>
      )}

      {/* Threat Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass rounded-xl p-4">
          <h3 className="text-sm font-bold text-white mb-3">Top Pays Attaquants</h3>
          <div className="space-y-2">
            {[
              { country: 'Russie', count: 342, pct: 85 },
              { country: 'Chine', count: 287, pct: 72 },
              { country: 'Corée du Nord', count: 198, pct: 50 },
              { country: 'Iran', count: 156, pct: 39 },
              { country: 'Nigeria', count: 134, pct: 34 },
            ].map((c, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xs text-gray-400 w-24">{c.country}</span>
                <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full transition-all" style={{ width: `${c.pct}%` }}></div>
                </div>
                <span className="text-xs text-gray-300 font-mono w-12 text-right">{c.count}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="glass rounded-xl p-4">
          <h3 className="text-sm font-bold text-white mb-3">Types d'Attaques</h3>
          <div className="space-y-2">
            {[
              { type: 'Ransomware', count: 456, color: 'bg-red-500' },
              { type: 'DDoS', count: 389, color: 'bg-orange-500' },
              { type: 'Phishing', count: 267, color: 'bg-yellow-500' },
              { type: 'Zero-Day', count: 134, color: 'bg-purple-500' },
              { type: 'APT', count: 98, color: 'bg-cyan-500' },
            ].map((t, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-black/20">
                <span className="text-sm text-gray-300">{t.type}</span>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${t.color}`}></div>
                  <span className="text-sm font-mono text-white">{t.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
