import { useState, useEffect } from 'react';

const threats = [
  { id: 1, type: 'Ransomware', country: 'Russie', ip: '185.220.101.xx', severity: 'critical', time: '00:02:14' },
  { id: 2, type: 'Phishing', country: 'Nigeria', ip: '41.190.2.xx', severity: 'high', time: '00:05:33' },
  { id: 3, type: 'DDoS', country: 'Chine', ip: '223.71.167.xx', severity: 'critical', time: '00:08:45' },
  { id: 4, type: 'SQL Injection', country: 'Iran', ip: '5.160.218.xx', severity: 'high', time: '00:12:01' },
  { id: 5, type: 'Brute Force', country: 'Brésil', ip: '177.54.150.xx', severity: 'medium', time: '00:15:22' },
  { id: 6, type: 'Zero-Day', country: 'Corée du Nord', ip: '175.45.176.xx', severity: 'critical', time: '00:18:44' },
  { id: 7, type: 'Crypto Mining', country: 'Ukraine', ip: '91.215.85.xx', severity: 'medium', time: '00:21:09' },
  { id: 8, type: 'Data Exfiltration', country: 'Roumanie', ip: '185.156.46.xx', severity: 'high', time: '00:24:33' },
];

const stats = [
  { label: 'Menaces Bloquées', value: '24,891', icon: 'fa-shield-virus', color: 'text-green-400', bg: 'from-green-500/20 to-green-500/5' },
  { label: 'IPs Traquées', value: '1,247', icon: 'fa-crosshairs', color: 'text-cyan-400', bg: 'from-cyan-500/20 to-cyan-500/5' },
  { label: 'Sites Bloqués', value: '892', icon: 'fa-ban', color: 'text-red-400', bg: 'from-red-500/20 to-red-500/5' },
  { label: 'Alertes Actives', value: '37', icon: 'fa-bell', color: 'text-yellow-400', bg: 'from-yellow-500/20 to-yellow-500/5' },
];

export default function Dashboard() {
  const [animatedStats, setAnimatedStats] = useState(stats.map(s => ({ ...s, displayValue: '0' })));
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const logMessages = [
      '[SCAN] Analyse réseau en cours... 847 paquets/s',
      '[ALERT] Activité suspecte détectée: 185.220.101.34',
      '[BLOCK] IP bloquée: 41.190.2.18 - Phishing confirmé',
      '[TRACE] Routage Tor détecté: 3 nœuds identifiés',
      '[AI] Modèle ML mis à jour - Précision: 99.7%',
      '[VPN] Détection VPN: ExpressVPN, NordVPN, ProtonVPN',
      '[SEO] Site frauduleux signalé aux moteurs de recherche',
      '[DEFENSE] Pare-feu adaptatif activé - Niveau 4',
      '[TRACK] Localisation pirate: 55.7558°N, 37.6173°E',
      '[ANALYSIS] Signature malware: Trojan.Win32.Agent.xx',
    ];

    const interval = setInterval(() => {
      const msg = logMessages[Math.floor(Math.random() * logMessages.length)];
      const timestamp = new Date().toLocaleTimeString();
      setLogs(prev => [`[${timestamp}] ${msg}`, ...prev.slice(0, 19)]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className={`glass rounded-xl p-4 bg-gradient-to-br ${stat.bg}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">{stat.label}</p>
                <p className={`text-2xl font-bold font-mono ${stat.color} mt-1`}>{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${stat.bg} flex items-center justify-center`}>
                <i className={`fas ${stat.icon} ${stat.color} text-xl`}></i>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span className="text-xs text-green-400">
                <i className="fas fa-arrow-up"></i> +{Math.floor(Math.random() * 20 + 5)}%
              </span>
              <span className="text-xs text-gray-500">vs dernière heure</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Threat Feed */}
        <div className="lg:col-span-2 glass rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <i className="fas fa-radar text-red-400"></i>
              Flux de Menaces en Temps Réel
            </h2>
            <span className="px-2 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-mono animate-pulse">
              ● LIVE
            </span>
          </div>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {threats.map(threat => (
              <div key={threat.id} className={`p-3 rounded-lg threat-${threat.severity} flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    threat.severity === 'critical' ? 'bg-red-500' :
                    threat.severity === 'high' ? 'bg-orange-500' :
                    threat.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  } animate-pulse`}></div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white">{threat.type}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-gray-300">{threat.country}</span>
                    </div>
                    <div className="text-xs text-gray-400 font-mono mt-1">
                      IP: {threat.ip} | {threat.time}
                    </div>
                  </div>
                </div>
                <button className="px-3 py-1 rounded-lg bg-red-500/20 text-red-400 text-xs hover:bg-red-500/30 transition">
                  <i className="fas fa-ban mr-1"></i>Bloquer
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Live Logs */}
        <div className="glass rounded-xl p-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
            <i className="fas fa-terminal text-green-400"></i>
            Logs Système
          </h2>
          <div className="bg-black/50 rounded-lg p-3 font-mono text-xs space-y-1 max-h-96 overflow-y-auto">
            {logs.map((log, i) => (
              <div key={i} className={`${
                log.includes('[ALERT]') ? 'text-red-400' :
                log.includes('[BLOCK]') ? 'text-orange-400' :
                log.includes('[AI]') ? 'text-purple-400' :
                'text-green-400'
              } opacity-${Math.max(0.3, 1 - i * 0.05)}`}>
                {log}
              </div>
            ))}
            <div className="text-green-400 animate-pulse">█</div>
          </div>
        </div>
      </div>

      {/* Network Activity Visualization */}
      <div className="glass rounded-xl p-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
          <i className="fas fa-wave-square text-cyan-400"></i>
          Activité Réseau Globale
        </h2>
        <div className="relative h-32 overflow-hidden rounded-lg bg-black/30">
          <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path
              d="M0,60 Q150,20 300,60 T600,60 T900,60 T1200,60"
              fill="none"
              stroke="rgba(0,255,136,0.3)"
              strokeWidth="2"
            />
            <path
              d="M0,60 Q100,80 200,40 T400,70 T600,30 T800,80 T1000,40 T1200,60"
              fill="none"
              stroke="rgba(0,212,255,0.5)"
              strokeWidth="1.5"
            />
            <path
              d="M0,60 Q200,10 400,90 T800,30 T1200,70"
              fill="none"
              stroke="rgba(255,0,85,0.3)"
              strokeWidth="1"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center gap-6 text-xs font-mono">
              <span className="text-green-400">● Trafic Normal</span>
              <span className="text-cyan-400">● Trafic Anormal</span>
              <span className="text-red-400">● Attaques</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
