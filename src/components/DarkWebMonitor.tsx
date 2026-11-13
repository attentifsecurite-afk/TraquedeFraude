import { useState, useEffect } from 'react';

interface DarkWebListing {
  id: number;
  marketplace: string;
  type: string;
  item: string;
  price: string;
  currency: string;
  seller: string;
  rating: number;
  detected: string;
  severity: 'critical' | 'high' | 'medium';
}

interface BreachData {
  id: number;
  source: string;
  records: string;
  date: string;
  dataTypes: string[];
  status: 'active' | 'archived' | 'new';
}

const darkWebListings: DarkWebListing[] = [
  { id: 1, marketplace: 'Hydra Market', type: 'Données Bancaires', item: '10,000 cartes CB EU complètes', price: '2.4', currency: 'BTC', seller: 'darkvendor_x7', rating: 4.8, detected: 'Il y a 2min', severity: 'critical' },
  { id: 2, marketplace: 'AlphaBay 2.0', type: 'Credentials', item: 'Accès admin entreprises Fortune 500', price: '15.0', currency: 'BTC', seller: 'breach_king', rating: 4.9, detected: 'Il y a 5min', severity: 'critical' },
  { id: 3, marketplace: 'Russian Market', type: 'RDP Access', item: '500 serveurs RDP Europe', price: '0.8', currency: 'BTC', seller: 'rdp_hunter', rating: 4.2, detected: 'Il y a 8min', severity: 'high' },
  { id: 4, marketplace: '2Easy Shop', type: 'Identités', item: '25,000 identités EU complètes', price: '5.2', currency: 'BTC', seller: 'id_factory', rating: 4.6, detected: 'Il y a 12min', severity: 'critical' },
  { id: 5, marketplace: 'Genesis Market', type: 'Fingerprints', item: 'Browser fingerprints premium', price: '0.3', currency: 'BTC', seller: 'fp_master', rating: 4.1, detected: 'Il y a 15min', severity: 'high' },
  { id: 6, marketplace: 'Exploit Forum', type: 'Zero-Days', item: 'Exploit CVE-2024-XXXX Windows', price: '50.0', currency: 'BTC', seller: 'zeroday_dealer', rating: 5.0, detected: 'Il y a 18min', severity: 'critical' },
  { id: 7, marketplace: 'BreachForums', type: 'Database', item: 'Dump base données hôpitaux FR', price: '3.5', currency: 'BTC', seller: 'med_hacker', rating: 4.4, detected: 'Il y a 22min', severity: 'critical' },
  { id: 8, marketplace: 'DarkOwl', type: 'MalwareaaS', item: 'Ransomware-as-a-Service license', price: '1.0', currency: 'BTC', seller: 'ransom_dev', rating: 4.7, detected: 'Il y a 25min', severity: 'high' },
];

const breachData: BreachData[] = [
  { id: 1, source: 'HealthCorp EU', records: '4.2M', date: '2024-01-28', dataTypes: ['Noms', 'SSN', 'Dossiers médicaux'], status: 'new' },
  { id: 2, source: 'BankTrust Intl', records: '1.8M', date: '2024-01-25', dataTypes: ['Cartes CB', 'PIN', 'Adresses'], status: 'active' },
  { id: 3, source: 'GovServices FR', records: '890K', date: '2024-01-22', dataTypes: ['Impôts', 'Sécurité sociale'], status: 'active' },
  { id: 4, source: 'TelecomPlus', records: '12.5M', date: '2024-01-20', dataTypes: ['Appels', 'SMS', 'Localisation'], status: 'archived' },
  { id: 5, source: 'EduPlatform', records: '3.1M', date: '2024-01-18', dataTypes: ['Étudiants', 'Notes', 'Paiements'], status: 'new' },
];

export default function DarkWebMonitor() {
  const [listings, setListings] = useState(darkWebListings);
  const [activeFilter, setActiveFilter] = useState('all');
  const [scanning, setScanning] = useState(true);
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanProgress(prev => prev >= 100 ? 0 : prev + Math.random() * 5);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const filteredListings = activeFilter === 'all' 
    ? listings 
    : listings.filter(l => l.severity === activeFilter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass rounded-xl p-4 border-l-4 border-red-500">
          <p className="text-xs text-gray-400 uppercase">Marchés Surveillés</p>
          <p className="text-2xl font-bold text-red-400 font-mono">147</p>
          <p className="text-xs text-gray-500 mt-1">Dark Web + Telegram</p>
        </div>
        <div className="glass rounded-xl p-4 border-l-4 border-orange-500">
          <p className="text-xs text-gray-400 uppercase">Listings Actifs</p>
          <p className="text-2xl font-bold text-orange-400 font-mono">2,847</p>
          <p className="text-xs text-gray-500 mt-1">+342 dernières 24h</p>
        </div>
        <div className="glass rounded-xl p-4 border-l-4 border-purple-500">
          <p className="text-xs text-gray-400 uppercase">Vendeurs Identifiés</p>
          <p className="text-2xl font-bold text-purple-400 font-mono">892</p>
          <p className="text-xs text-gray-500 mt-1">En cours de traçage</p>
        </div>
        <div className="glass rounded-xl p-4 border-l-4 border-cyan-500">
          <p className="text-xs text-gray-400 uppercase">Données Exposées</p>
          <p className="text-2xl font-bold text-cyan-400 font-mono">22.6M</p>
          <p className="text-xs text-gray-500 mt-1">Enregistrements</p>
        </div>
      </div>

      {/* Scan Progress */}
      <div className="glass rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <i className="fas fa-spider text-purple-400"></i>
            Scanner Dark Web - Onion Routing
          </h2>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${scanning ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
            <span className="text-xs font-mono text-gray-400">{scanning ? 'ACTIF' : 'PAUSE'}</span>
          </div>
        </div>
        <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-full transition-all"
            style={{ width: `${scanProgress}%` }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-mono text-white drop-shadow-lg">{Math.floor(scanProgress)}% - Analyse des nœuds .onion</span>
          </div>
        </div>
        <div className="mt-2 flex justify-between text-xs text-gray-500 font-mono">
          <span>Nœuds analysés: {Math.floor(scanProgress * 14.7)}</span>
          <span>Dernier refresh: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {[
          { id: 'all', label: 'Tous', icon: 'fa-globe' },
          { id: 'critical', label: 'Critique', icon: 'fa-skull-crossbones' },
          { id: 'high', label: 'Élevé', icon: 'fa-exclamation-triangle' },
          { id: 'medium', label: 'Moyen', icon: 'fa-info-circle' },
        ].map(f => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={`px-4 py-2 rounded-lg text-sm transition flex items-center gap-2 ${
              activeFilter === f.id 
                ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' 
                : 'text-gray-400 hover:text-white bg-white/5'
            }`}
          >
            <i className={`fas ${f.icon}`}></i>{f.label}
          </button>
        ))}
      </div>

      {/* Dark Web Listings */}
      <div className="glass rounded-xl p-4">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <i className="fas fa-eye text-red-400"></i>
          Listings Détectés en Temps Réel
        </h2>
        <div className="space-y-3 max-h-[500px] overflow-y-auto">
          {filteredListings.map(listing => (
            <div key={listing.id} className={`p-4 rounded-xl border transition hover:scale-[1.01] ${
              listing.severity === 'critical' ? 'border-red-500/30 bg-red-500/5' :
              listing.severity === 'high' ? 'border-orange-500/30 bg-orange-500/5' :
              'border-yellow-500/30 bg-yellow-500/5'
            }`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                      listing.severity === 'critical' ? 'bg-red-500/30 text-red-400' :
                      listing.severity === 'high' ? 'bg-orange-500/30 text-orange-400' :
                      'bg-yellow-500/30 text-yellow-400'
                    }`}>
                      {listing.severity.toUpperCase()}
                    </span>
                    <span className="text-xs text-purple-400 font-mono">{listing.marketplace}</span>
                    <span className="text-xs text-gray-500">• {listing.detected}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white">{listing.item}</h3>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                    <span><i className="fas fa-tag mr-1"></i>{listing.type}</span>
                    <span><i className="fas fa-coins mr-1 text-yellow-400"></i>{listing.price} {listing.currency}</span>
                    <span><i className="fas fa-user mr-1"></i>{listing.seller}</span>
                    <span className="text-yellow-400">
                      {'★'.repeat(Math.floor(listing.rating))}{'☆'.repeat(5 - Math.floor(listing.rating))} {listing.rating}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <button className="px-3 py-1 rounded bg-red-500/20 text-red-400 text-xs hover:bg-red-500/30 transition">
                    <i className="fas fa-flag mr-1"></i>Signaler
                  </button>
                  <button className="px-3 py-1 rounded bg-purple-500/20 text-purple-400 text-xs hover:bg-purple-500/30 transition">
                    <i className="fas fa-crosshairs mr-1"></i>Tracer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Breaches */}
      <div className="glass rounded-xl p-4">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <i className="fas fa-database text-orange-400"></i>
          Fuites de Données Récentes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {breachData.map(breach => (
            <div key={breach.id} className="p-3 rounded-lg bg-black/30 border border-gray-800 hover:border-orange-500/30 transition">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-white">{breach.source}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  breach.status === 'new' ? 'bg-red-500/20 text-red-400 animate-pulse' :
                  breach.status === 'active' ? 'bg-orange-500/20 text-orange-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {breach.status === 'new' ? '🆕 NOUVEAU' : breach.status === 'active' ? '🔴 ACTIF' : '📦 ARCHIVÉ'}
                </span>
              </div>
              <p className="text-2xl font-bold text-orange-400 font-mono">{breach.records}</p>
              <p className="text-xs text-gray-400">enregistrements</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {breach.dataTypes.map((dt, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-white/5 text-xs text-gray-300">{dt}</span>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2 font-mono">{breach.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
