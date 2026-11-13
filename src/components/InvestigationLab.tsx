import { useState, useEffect } from 'react';

interface Case {
  id: string;
  title: string;
  suspect: string;
  status: 'open' | 'investigating' | 'solved' | 'closed';
  priority: 'critical' | 'high' | 'medium';
  evidence: number;
  created: string;
  lastUpdate: string;
  tags: string[];
}

interface Evidence {
  id: number;
  type: string;
  description: string;
  hash: string;
  timestamp: string;
  linked: boolean;
}

const cases: Case[] = [
  { id: 'INV-2024-001', title: 'Opération Shadow Bank', suspect: 'APT-29 (Cozy Bear)', status: 'investigating', priority: 'critical', evidence: 47, created: '2024-01-10', lastUpdate: 'Il y a 2min', tags: ['APT', 'Banking', 'EU'] },
  { id: 'INV-2024-002', title: 'Ransomware LockBit 3.0', suspect: 'LockBit Affiliates', status: 'open', priority: 'critical', evidence: 23, created: '2024-01-15', lastUpdate: 'Il y a 15min', tags: ['Ransomware', 'Healthcare'] },
  { id: 'INV-2024-003', title: 'Campagne Phishing Gouv', suspect: 'Scattered Spider', status: 'investigating', priority: 'high', evidence: 89, created: '2024-01-18', lastUpdate: 'Il y a 1h', tags: ['Phishing', 'Government'] },
  { id: 'INV-2024-004', title: 'Exfiltration Crypto Exchange', suspect: 'Lazarus Group', status: 'investigating', priority: 'critical', evidence: 34, created: '2024-01-20', lastUpdate: 'Il y a 3h', tags: ['Crypto', 'Exchange', 'DPRK'] },
  { id: 'INV-2024-005', title: 'Botnet IoT Massif', suspect: 'Inconnu', status: 'open', priority: 'high', evidence: 12, created: '2024-01-22', lastUpdate: 'Il y a 5h', tags: ['IoT', 'Botnet', 'DDoS'] },
  { id: 'INV-2024-006', title: 'Marketplace DarkNet FR', suspect: 'French Connection', status: 'solved', priority: 'medium', evidence: 156, created: '2024-01-05', lastUpdate: 'Il y a 2j', tags: ['DarkNet', 'Marketplace', 'Solved'] },
];

const evidenceList: Evidence[] = [
  { id: 1, type: 'IP Address', description: 'IP C2 serveur principal', hash: '185.220.101.34', timestamp: '2024-01-28 14:23:11', linked: true },
  { id: 2, type: 'Domain', description: 'Domaine de phishing enregistré', hash: 'secure-bank-login.xyz', timestamp: '2024-01-28 14:25:33', linked: true },
  { id: 3, type: 'File Hash', description: 'Malware payload SHA256', hash: 'a3f2b8c9d1e4f5...', timestamp: '2024-01-28 14:28:45', linked: true },
  { id: 4, type: 'Email', description: 'Email C2 exfiltration', hash: 'drop@protonmail.com', timestamp: '2024-01-28 14:30:12', linked: false },
  { id: 5, type: 'Wallet', description: 'Adresse Bitcoin ransom', hash: 'bc1qxy2kgdyg...', timestamp: '2024-01-28 14:32:55', linked: true },
  { id: 6, type: 'Certificate', description: 'Cert SSL auto-signé', hash: 'SHA256:7f8a9b2c...', timestamp: '2024-01-28 14:35:08', linked: false },
  { id: 7, type: 'User Agent', description: 'Fingerprint navigateur custom', hash: 'Mozilla/5.0 (Custom)', timestamp: '2024-01-28 14:38:22', linked: true },
  { id: 8, type: 'DNS Record', description: 'Fast-flux DNS entry', hash: 'ns1.darkhost.ru', timestamp: '2024-01-28 14:40:17', linked: true },
];

export default function InvestigationLab() {
  const [selectedCase, setSelectedCase] = useState<Case | null>(cases[0]);
  const [timeline, setTimeline] = useState<string[]>([]);
  const [connectionMap, setConnectionMap] = useState<{ from: string; to: string; type: string }[]>([]);

  useEffect(() => {
    const events = [
      '🔍 Analyse initiale du malware lancée',
      '📡 Détection C2 communication - 185.220.101.34',
      '🌐 Domaine phishing identifié - secure-bank-login.xyz',
      '💰 Transaction Bitcoin tracée - 0.45 BTC',
      '📧 Email C2 intercepté - drop@protonmail.com',
      '🔐 Certificat SSL analysé - Auto-signé',
      '🖥️ Fingerprint navigateur corrélé - APT-29 pattern',
      '🌍 DNS fast-flux détecté - 12 domaines',
      '✅ Corrélation IA: Confiance 94.7%',
      '📋 Rapport préliminaire généré',
    ];
    setTimeline(events);

    setConnectionMap([
      { from: 'IP C2', to: 'Domaine Phishing', type: 'DNS' },
      { from: 'Domaine Phishing', to: 'Email Drop', type: 'Registration' },
      { from: 'Malware', to: 'IP C2', type: 'Beacon' },
      { from: 'Wallet BTC', to: 'Exchange', type: 'Laundering' },
      { from: 'DNS Fast-Flux', to: 'IP C2', type: 'Resolution' },
    ]);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-yellow-400 bg-yellow-500/20';
      case 'investigating': return 'text-cyan-400 bg-cyan-500/20';
      case 'solved': return 'text-green-400 bg-green-500/20';
      case 'closed': return 'text-gray-400 bg-gray-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'open': return 'OUVERT';
      case 'investigating': return 'EN COURS';
      case 'solved': return 'RÉSOLU';
      case 'closed': return 'FERMÉ';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Investigation Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
              <i className="fas fa-folder-open text-red-400"></i>
            </div>
            <div>
              <p className="text-xs text-gray-400">Cases Ouvertes</p>
              <p className="text-xl font-bold text-red-400 font-mono">{cases.filter(c => c.status === 'open' || c.status === 'investigating').length}</p>
            </div>
          </div>
        </div>
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <i className="fas fa-check-double text-green-400"></i>
            </div>
            <div>
              <p className="text-xs text-gray-400">Résolues</p>
              <p className="text-xl font-bold text-green-400 font-mono">{cases.filter(c => c.status === 'solved').length}</p>
            </div>
          </div>
        </div>
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <i className="fas fa-fingerprint text-purple-400"></i>
            </div>
            <div>
              <p className="text-xs text-gray-400">Preuves Collectées</p>
              <p className="text-xl font-bold text-purple-400 font-mono">{cases.reduce((acc, c) => acc + c.evidence, 0)}</p>
            </div>
          </div>
        </div>
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
              <i className="fas fa-link text-cyan-400"></i>
            </div>
            <div>
              <p className="text-xs text-gray-400">Liens Établis</p>
              <p className="text-xl font-bold text-cyan-400 font-mono">{connectionMap.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cases List */}
        <div className="glass rounded-xl p-4">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <i className="fas fa-briefcase text-orange-400"></i>
            Cases d'Investigation
          </h2>
          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            {cases.map(c => (
              <div
                key={c.id}
                onClick={() => setSelectedCase(c)}
                className={`p-3 rounded-lg cursor-pointer transition border ${
                  selectedCase?.id === c.id 
                    ? 'border-cyan-500/50 bg-cyan-500/10' 
                    : 'border-gray-800 hover:border-gray-600 bg-black/20'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono text-gray-400">{c.id}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(c.status)}`}>
                    {getStatusLabel(c.status)}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white">{c.title}</h3>
                <p className="text-xs text-gray-400 mt-1">Suspect: {c.suspect}</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex gap-1">
                    {c.tags.slice(0, 2).map((tag, i) => (
                      <span key={i} className="px-1.5 py-0.5 rounded bg-white/5 text-xs text-gray-300">{tag}</span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">{c.evidence} preuves</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Case Details */}
        <div className="lg:col-span-2 space-y-4">
          {selectedCase && (
            <>
              {/* Case Header */}
              <div className="glass rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-xs font-mono text-gray-400">{selectedCase.id}</span>
                    <h2 className="text-xl font-bold text-white">{selectedCase.title}</h2>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(selectedCase.status)}`}>
                    {getStatusLabel(selectedCase.status)}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-black/30 rounded-lg p-2">
                    <p className="text-xs text-gray-400">Suspect</p>
                    <p className="text-sm font-bold text-red-400">{selectedCase.suspect}</p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-2">
                    <p className="text-xs text-gray-400">Priorité</p>
                    <p className={`text-sm font-bold ${
                      selectedCase.priority === 'critical' ? 'text-red-400' : 'text-orange-400'
                    }`}>{selectedCase.priority.toUpperCase()}</p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-2">
                    <p className="text-xs text-gray-400">Preuves</p>
                    <p className="text-sm font-bold text-purple-400">{selectedCase.evidence}</p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-2">
                    <p className="text-xs text-gray-400">Dernière MAJ</p>
                    <p className="text-sm font-bold text-cyan-400">{selectedCase.lastUpdate}</p>
                  </div>
                </div>
              </div>

              {/* Evidence & Timeline */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Evidence */}
                <div className="glass rounded-xl p-4">
                  <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                    <i className="fas fa-fingerprint text-purple-400"></i>
                    Preuves Digitales
                  </h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {evidenceList.map(ev => (
                      <div key={ev.id} className={`p-2 rounded-lg border ${ev.linked ? 'border-green-500/30 bg-green-500/5' : 'border-gray-800 bg-black/20'}`}>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white">{ev.type}</span>
                          {ev.linked && <span className="text-xs text-green-400"><i className="fas fa-link"></i></span>}
                        </div>
                        <p className="text-xs text-gray-400 mt-1">{ev.description}</p>
                        <p className="text-xs font-mono text-cyan-400 mt-1 truncate">{ev.hash}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timeline */}
                <div className="glass rounded-xl p-4">
                  <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                    <i className="fas fa-clock-rotate-left text-cyan-400"></i>
                    Timeline Investigation
                  </h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {timeline.map((event, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className="flex flex-col items-center">
                          <div className="w-2 h-2 rounded-full bg-cyan-500 mt-1.5"></div>
                          {i < timeline.length - 1 && <div className="w-0.5 h-6 bg-gray-700"></div>}
                        </div>
                        <p className="text-xs text-gray-300 pt-0.5">{event}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Connection Map */}
              <div className="glass rounded-xl p-4">
                <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <i className="fas fa-project-diagram text-green-400"></i>
                  Carte de Connexions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {connectionMap.map((conn, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-black/30 border border-gray-800">
                      <span className="text-xs font-mono text-orange-400 bg-orange-500/10 px-2 py-1 rounded">{conn.from}</span>
                      <i className="fas fa-arrow-right text-gray-500 text-xs"></i>
                      <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded">{conn.to}</span>
                      <span className="text-xs text-gray-500 ml-auto">[{conn.type}]</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
