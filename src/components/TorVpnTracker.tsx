import { useState, useEffect } from 'react';

interface TorNode {
  id: string;
  ip: string;
  country: string;
  type: 'entry' | 'relay' | 'exit';
  bandwidth: string;
  uptime: string;
  flagged: boolean;
}

interface VpnDetection {
  provider: string;
  ip: string;
  country: string;
  protocol: string;
  risk: 'low' | 'medium' | 'high';
  activity: string;
}

const torNodes: TorNode[] = [
  { id: 'T1', ip: '185.220.101.1', country: 'Allemagne', type: 'entry', bandwidth: '45 MB/s', uptime: '99.2%', flagged: false },
  { id: 'T2', ip: '51.15.87.44', country: 'France', type: 'relay', bandwidth: '22 MB/s', uptime: '97.8%', flagged: true },
  { id: 'T3', ip: '185.129.62.62', country: 'Pays-Bas', type: 'exit', bandwidth: '18 MB/s', uptime: '95.1%', flagged: true },
  { id: 'T4', ip: '176.10.99.200', country: 'Suisse', type: 'relay', bandwidth: '31 MB/s', uptime: '99.9%', flagged: false },
  { id: 'T5', ip: '37.218.247.10', country: 'Danemark', type: 'exit', bandwidth: '12 MB/s', uptime: '88.4%', flagged: true },
  { id: 'T6', ip: '204.8.156.142', country: 'Canada', type: 'entry', bandwidth: '55 MB/s', uptime: '99.7%', flagged: false },
  { id: 'T7', ip: '109.70.100.24', country: 'Autriche', type: 'relay', bandwidth: '28 MB/s', uptime: '96.3%', flagged: false },
  { id: 'T8', ip: '199.249.230.65', country: 'USA', type: 'exit', bandwidth: '41 MB/s', uptime: '98.1%', flagged: true },
];

const vpnDetections: VpnDetection[] = [
  { provider: 'ExpressVPN', ip: '104.244.72.115', country: 'UK', protocol: 'OpenVPN', risk: 'high', activity: 'Accès à service bancaire' },
  { provider: 'NordVPN', ip: '193.218.118.183', country: 'NL', protocol: 'WireGuard', risk: 'medium', activity: 'Téléchargements P2P' },
  { provider: 'ProtonVPN', ip: '146.70.86.18', country: 'CH', protocol: 'WireGuard', risk: 'low', activity: 'Navigation standard' },
  { provider: 'Mullvad', ip: '193.138.218.74', country: 'SE', protocol: 'OpenVPN', risk: 'high', activity: 'Accès darknet détecté' },
  { provider: 'Surfshark', ip: '178.162.199.55', country: 'DE', protocol: 'IKEv2', risk: 'medium', activity: 'Connexion multi-pays' },
  { provider: 'CyberGhost', ip: '89.187.181.20', country: 'RO', protocol: 'OpenVPN', risk: 'low', activity: 'Streaming' },
  { provider: 'PIA', ip: '143.244.49.177', country: 'US', protocol: 'WireGuard', risk: 'high', activity: 'Tentative accès admin' },
];

export default function TorVpnTracker() {
  const [activeTab, setActiveTab] = useState<'tor' | 'vpn'>('tor');
  const [selectedNode, setSelectedNode] = useState<TorNode | null>(null);
  const [circuitPath, setCircuitPath] = useState<string[]>([]);

  useEffect(() => {
    // Simulate Tor circuit
    const path = ['Entry', 'Relay 1', 'Relay 2', 'Exit'];
    setCircuitPath(path);
  }, []);

  return (
    <div className="space-y-6">
      {/* Tab Switcher */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('tor')}
          className={`px-6 py-3 rounded-xl font-medium transition ${
            activeTab === 'tor' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'text-gray-400 hover:text-white'
          }`}
        >
          <i className="fas fa-onion mr-2"></i>Réseau Tor
        </button>
        <button
          onClick={() => setActiveTab('vpn')}
          className={`px-6 py-3 rounded-xl font-medium transition ${
            activeTab === 'vpn' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-gray-400 hover:text-white'
          }`}
        >
          <i className="fas fa-lock mr-2"></i>Détection VPN
        </button>
      </div>

      {activeTab === 'tor' ? (
        <>
          {/* Tor Circuit Visualization */}
          <div className="glass rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <i className="fas fa-project-diagram text-purple-400"></i>
              Circuit Tor Actif - Analyse en Cours
            </h2>
            
            <div className="relative py-8">
              {/* Circuit path */}
              <div className="flex items-center justify-between relative">
                {/* Connection lines */}
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 via-purple-500 to-red-500 opacity-50"></div>
                
                {/* Nodes */}
                {circuitPath.map((node, i) => (
                  <div key={i} className="relative z-10 flex flex-col items-center">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center border-2 ${
                      i === 0 ? 'border-green-500 bg-green-500/20' :
                      i === circuitPath.length - 1 ? 'border-red-500 bg-red-500/20' :
                      'border-purple-500 bg-purple-500/20'
                    }`}>
                      <i className={`fas ${
                        i === 0 ? 'fa-sign-in-alt text-green-400' :
                        i === circuitPath.length - 1 ? 'fa-sign-out-alt text-red-400' :
                        'fa-random text-purple-400'
                      } text-xl`}></i>
                    </div>
                    <span className="mt-2 text-xs text-gray-400">{node}</span>
                    <span className="text-xs font-mono text-gray-500">{torNodes[i]?.country}</span>
                  </div>
                ))}
              </div>

              {/* Data flow animation */}
              <div className="absolute top-1/2 left-0 right-0 h-2 -translate-y-1/2 overflow-hidden pointer-events-none">
                <div className="w-4 h-4 rounded-full bg-green-500 animate-data-flow absolute top-0" style={{ boxShadow: '0 0 10px #00ff88' }}></div>
              </div>
            </div>
          </div>

          {/* Tor Nodes Table */}
          <div className="glass rounded-xl p-4">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <i className="fas fa-network-wired text-purple-400"></i>
              Nœuds Tor Identifiés
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-2 px-3 text-gray-400 text-xs uppercase">ID</th>
                    <th className="text-left py-2 px-3 text-gray-400 text-xs uppercase">IP</th>
                    <th className="text-left py-2 px-3 text-gray-400 text-xs uppercase">Pays</th>
                    <th className="text-left py-2 px-3 text-gray-400 text-xs uppercase">Type</th>
                    <th className="text-left py-2 px-3 text-gray-400 text-xs uppercase">Bande</th>
                    <th className="text-left py-2 px-3 text-gray-400 text-xs uppercase">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {torNodes.map(node => (
                    <tr 
                      key={node.id}
                      className={`border-b border-gray-800 hover:bg-white/5 cursor-pointer ${node.flagged ? 'bg-red-500/5' : ''}`}
                      onClick={() => setSelectedNode(node)}
                    >
                      <td className="py-2 px-3 font-mono text-gray-300">{node.id}</td>
                      <td className="py-2 px-3 font-mono text-cyan-400">{node.ip}</td>
                      <td className="py-2 px-3 text-gray-300">{node.country}</td>
                      <td className="py-2 px-3">
                        <span className={`px-2 py-0.5 rounded text-xs ${
                          node.type === 'entry' ? 'bg-green-500/20 text-green-400' :
                          node.type === 'exit' ? 'bg-red-500/20 text-red-400' :
                          'bg-purple-500/20 text-purple-400'
                        }`}>{node.type}</span>
                      </td>
                      <td className="py-2 px-3 font-mono text-gray-400">{node.bandwidth}</td>
                      <td className="py-2 px-3">
                        {node.flagged ? (
                          <span className="text-red-400 text-xs"><i className="fas fa-flag mr-1"></i>Flaggé</span>
                        ) : (
                          <span className="text-green-400 text-xs"><i className="fas fa-check mr-1"></i>OK</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* VPN Detection */}
          <div className="glass rounded-xl p-4">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <i className="fas fa-mask text-cyan-400"></i>
              Détection & Analyse VPN
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {vpnDetections.map((vpn, i) => (
                <div key={i} className={`p-4 rounded-xl border ${
                  vpn.risk === 'high' ? 'border-red-500/30 bg-red-500/5' :
                  vpn.risk === 'medium' ? 'border-yellow-500/30 bg-yellow-500/5' :
                  'border-green-500/30 bg-green-500/5'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-white">{vpn.provider}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      vpn.risk === 'high' ? 'bg-red-500/20 text-red-400' :
                      vpn.risk === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {vpn.risk === 'high' ? '⚠ Haut' : vpn.risk === 'medium' ? '⚡ Moyen' : '✓ Bas'}
                    </span>
                  </div>
                  <div className="space-y-1 text-xs">
                    <p className="text-gray-400">IP: <span className="text-cyan-400 font-mono">{vpn.ip}</span></p>
                    <p className="text-gray-400">Pays: <span className="text-white">{vpn.country}</span></p>
                    <p className="text-gray-400">Protocole: <span className="text-purple-400">{vpn.protocol}</span></p>
                    <p className="text-gray-400">Activité: <span className="text-orange-400">{vpn.activity}</span></p>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button className="flex-1 px-2 py-1 rounded bg-red-500/20 text-red-400 text-xs hover:bg-red-500/30">
                      <i className="fas fa-ban mr-1"></i>Bloquer
                    </button>
                    <button className="flex-1 px-2 py-1 rounded bg-cyan-500/20 text-cyan-400 text-xs hover:bg-cyan-500/30">
                      <i className="fas fa-search mr-1"></i>Analyser
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* VPN Protocol Analysis */}
          <div className="glass rounded-xl p-4">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <i className="fas fa-chart-bar text-cyan-400"></i>
              Analyse des Protocoles VPN
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { protocol: 'OpenVPN', detected: 342, bypass: '12%', color: 'text-blue-400' },
                { protocol: 'WireGuard', detected: 256, bypass: '5%', color: 'text-green-400' },
                { protocol: 'IKEv2', detected: 189, bypass: '18%', color: 'text-purple-400' },
                { protocol: 'Shadowsocks', detected: 97, bypass: '34%', color: 'text-red-400' },
              ].map((p, i) => (
                <div key={i} className="bg-black/30 rounded-lg p-4 text-center">
                  <p className={`text-lg font-bold ${p.color}`}>{p.protocol}</p>
                  <p className="text-2xl font-mono text-white mt-2">{p.detected}</p>
                  <p className="text-xs text-gray-400 mt-1">Détectés</p>
                  <p className="text-xs text-yellow-400 mt-2">Bypass: {p.bypass}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
