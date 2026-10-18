import { useState } from 'react';

interface FraudSite {
  id: number;
  url: string;
  type: string;
  status: 'reported' | 'pending' | 'delisted' | 'blocked';
  seoScore: number;
  threat: 'critical' | 'high' | 'medium';
  backlinks: number;
  reportedDate: string;
}

interface SEOAction {
  id: number;
  action: string;
  target: string;
  status: 'success' | 'pending' | 'failed';
  timestamp: string;
}

const fraudSites: FraudSite[] = [
  { id: 1, url: 'fr4ud-b4nk.xyz', type: 'Phishing Bancaire', status: 'blocked', seoScore: 0, threat: 'critical', backlinks: 234, reportedDate: '2024-01-15' },
  { id: 2, url: 'crypt0-sc4m.net', type: 'Fausse Crypto', status: 'delisted', seoScore: 12, threat: 'critical', backlinks: 567, reportedDate: '2024-01-18' },
  { id: 3, url: 'f4ke-shop.com', type: 'E-commerce Fraud', status: 'pending', seoScore: 45, threat: 'high', backlinks: 89, reportedDate: '2024-01-20' },
  { id: 4, url: 'ph4rmacy-illegal.org', type: 'Pharmacie Illégale', status: 'reported', seoScore: 67, threat: 'high', backlinks: 1234, reportedDate: '2024-01-22' },
  { id: 5, url: 'st0len-data.io', type: 'Vente de Données', status: 'blocked', seoScore: 0, threat: 'critical', backlinks: 45, reportedDate: '2024-01-25' },
  { id: 6, url: 'malware-dl.cc', type: 'Distribution Malware', status: 'delisted', seoScore: 5, threat: 'critical', backlinks: 890, reportedDate: '2024-01-28' },
  { id: 7, url: 'fake-support.tech', type: 'Tech Support Scam', status: 'pending', seoScore: 34, threat: 'medium', backlinks: 156, reportedDate: '2024-02-01' },
  { id: 8, url: 'identity-thief.ru', type: 'Vol d\'Identité', status: 'reported', seoScore: 78, threat: 'high', backlinks: 2345, reportedDate: '2024-02-03' },
];

const seoActions: SEOAction[] = [
  { id: 1, action: 'Signalement Google Safe Browsing', target: 'fr4ud-b4nk.xyz', status: 'success', timestamp: '10:23:45' },
  { id: 2, action: 'Demande de déréférencement Bing', target: 'crypt0-sc4m.net', status: 'success', timestamp: '10:25:12' },
  { id: 3, action: 'Notification DMCA Takedown', target: 'f4ke-shop.com', status: 'pending', timestamp: '10:28:33' },
  { id: 4, action: 'Signalement aux régulateurs', target: 'ph4rmacy-illegal.org', status: 'pending', timestamp: '10:30:01' },
  { id: 5, action: 'Blacklist propagation CDN', target: 'st0len-data.io', status: 'success', timestamp: '10:32:44' },
  { id: 6, action: 'Maillage inverse - Contenu légal', target: 'identity-thief.ru', status: 'success', timestamp: '10:35:18' },
];

export default function SEODefense() {
  const [activeSection, setActiveSection] = useState<'sites' | 'actions' | 'maillage'>('sites');
  const [searchUrl, setSearchUrl] = useState('');

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      reported: 'bg-yellow-500/20 text-yellow-400',
      pending: 'bg-cyan-500/20 text-cyan-400',
      delisted: 'bg-orange-500/20 text-orange-400',
      blocked: 'bg-green-500/20 text-green-400',
      success: 'bg-green-500/20 text-green-400',
      failed: 'bg-red-500/20 text-red-400',
    };
    const labels: Record<string, string> = {
      reported: 'Signalé',
      pending: 'En cours',
      delisted: 'Déréférencé',
      blocked: 'Bloqué',
      success: 'Succès',
      failed: 'Échec',
    };
    return <span className={`px-2 py-0.5 rounded-full text-xs ${styles[status]}`}>{labels[status]}</span>;
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
              <i className="fas fa-skull-crossbones text-red-400"></i>
            </div>
            <div>
              <p className="text-xs text-gray-400">Sites Frauduleux</p>
              <p className="text-xl font-bold text-red-400 font-mono">892</p>
            </div>
          </div>
        </div>
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <i className="fas fa-ban text-green-400"></i>
            </div>
            <div>
              <p className="text-xs text-gray-400">Déréférencés</p>
              <p className="text-xl font-bold text-green-400 font-mono">634</p>
            </div>
          </div>
        </div>
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <i className="fas fa-link text-purple-400"></i>
            </div>
            <div>
              <p className="text-xs text-gray-400">Backlinks Coupés</p>
              <p className="text-xl font-bold text-purple-400 font-mono">12,847</p>
            </div>
          </div>
        </div>
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
              <i className="fas fa-shield-virus text-cyan-400"></i>
            </div>
            <div>
              <p className="text-xs text-gray-400">Protections SEO</p>
              <p className="text-xl font-bold text-cyan-400 font-mono">2,156</p>
            </div>
          </div>
        </div>
      </div>

      {/* URL Analyzer */}
      <div className="glass rounded-xl p-4">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <i className="fas fa-search text-green-400"></i>
          Analyseur d'URL Frauduleuse
        </h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={searchUrl}
            onChange={(e) => setSearchUrl(e.target.value)}
            placeholder="Entrez une URL suspecte à analyser..."
            className="flex-1 px-4 py-3 rounded-lg bg-black/50 border border-gray-700 text-white placeholder-gray-500 focus:border-green-500 focus:outline-none font-mono text-sm"
          />
          <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-green-500 to-cyan-500 text-white font-medium hover:opacity-90 transition">
            <i className="fas fa-search mr-2"></i>Analyser
          </button>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="flex gap-2">
        {[
          { id: 'sites', icon: 'fa-globe', label: 'Sites Frauduleux' },
          { id: 'actions', icon: 'fa-bolt', label: 'Actions SEO/AEO' },
          { id: 'maillage', icon: 'fa-sitemap', label: 'Maillage Inverse' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id as any)}
            className={`px-4 py-2 rounded-lg text-sm transition ${
              activeSection === tab.id ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'text-gray-400 hover:text-white'
            }`}
          >
            <i className={`fas ${tab.icon} mr-2`}></i>{tab.label}
          </button>
        ))}
      </div>

      {activeSection === 'sites' && (
        <div className="glass rounded-xl p-4">
          <h2 className="text-lg font-bold text-white mb-4">Sites Frauduleux Détectés</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-2 px-3 text-gray-400 text-xs uppercase">URL</th>
                  <th className="text-left py-2 px-3 text-gray-400 text-xs uppercase">Type</th>
                  <th className="text-left py-2 px-3 text-gray-400 text-xs uppercase">Menace</th>
                  <th className="text-left py-2 px-3 text-gray-400 text-xs uppercase">SEO Score</th>
                  <th className="text-left py-2 px-3 text-gray-400 text-xs uppercase">Backlinks</th>
                  <th className="text-left py-2 px-3 text-gray-400 text-xs uppercase">Statut</th>
                  <th className="text-left py-2 px-3 text-gray-400 text-xs uppercase">Action</th>
                </tr>
              </thead>
              <tbody>
                {fraudSites.map(site => (
                  <tr key={site.id} className="border-b border-gray-800 hover:bg-white/5">
                    <td className="py-2 px-3 font-mono text-red-400 text-xs">{site.url}</td>
                    <td className="py-2 px-3 text-gray-300">{site.type}</td>
                    <td className="py-2 px-3">
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        site.threat === 'critical' ? 'bg-red-500/20 text-red-400' :
                        site.threat === 'high' ? 'bg-orange-500/20 text-orange-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>{site.threat}</span>
                    </td>
                    <td className="py-2 px-3 font-mono text-gray-300">{site.seoScore}/100</td>
                    <td className="py-2 px-3 font-mono text-gray-300">{site.backlinks}</td>
                    <td className="py-2 px-3">{getStatusBadge(site.status)}</td>
                    <td className="py-2 px-3">
                      <button className="px-2 py-1 rounded bg-red-500/20 text-red-400 text-xs hover:bg-red-500/30">
                        <i className="fas fa-ban mr-1"></i>Déréférencer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeSection === 'actions' && (
        <div className="glass rounded-xl p-4">
          <h2 className="text-lg font-bold text-white mb-4">Actions SEO/AEO en Cours</h2>
          <div className="space-y-3">
            {seoActions.map(action => (
              <div key={action.id} className="flex items-center justify-between p-3 rounded-lg bg-black/30 border border-gray-800">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    action.status === 'success' ? 'bg-green-500/20' :
                    action.status === 'pending' ? 'bg-yellow-500/20' : 'bg-red-500/20'
                  }`}>
                    <i className={`fas ${
                      action.status === 'success' ? 'fa-check text-green-400' :
                      action.status === 'pending' ? 'fa-clock text-yellow-400' : 'fa-times text-red-400'
                    } text-xs`}></i>
                  </div>
                  <div>
                    <p className="text-sm text-white">{action.action}</p>
                    <p className="text-xs text-gray-400 font-mono">{action.target}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusBadge(action.status)}
                  <span className="text-xs text-gray-500 font-mono">{action.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === 'maillage' && (
        <div className="glass rounded-xl p-4">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <i className="fas fa-sitemap text-purple-400"></i>
            Maillage Inverse & Contre-SEO
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Maillage Direct (Protection) */}
            <div className="bg-black/30 rounded-xl p-4 border border-green-500/20">
              <h3 className="text-sm font-bold text-green-400 mb-3">
                <i className="fas fa-shield-alt mr-2"></i>Maillage Protecteur (Sites Légitimes)
              </h3>
              <div className="space-y-2">
                {[
                  { site: 'votre-site.com', authority: 78, links: 45 },
                  { site: 'partenaire-officiel.fr', authority: 82, links: 32 },
                  { site: 'blog-securite.org', authority: 65, links: 28 },
                  { site: 'news-cyber.com', authority: 71, links: 19 },
                ].map((s, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded bg-green-500/5">
                    <span className="text-xs text-gray-300">{s.site}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-green-400">DA:{s.authority}</span>
                      <span className="text-xs text-gray-400">{s.links} liens</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Maillage Inverse (Démantèlement) */}
            <div className="bg-black/30 rounded-xl p-4 border border-red-500/20">
              <h3 className="text-sm font-bold text-red-400 mb-3">
                <i className="fas fa-unlink mr-2"></i>Ciblage Sites Frauduleux
              </h3>
              <div className="space-y-2">
                {[
                  { site: 'fr4ud-b4nk.xyz', backlinks: 234, status: 'Coupés' },
                  { site: 'crypt0-sc4m.net', backlinks: 567, status: 'Signalés' },
                  { site: 'identity-thief.ru', backlinks: 2345, status: 'En cours' },
                  { site: 'ph4rmacy-illegal.org', backlinks: 1234, status: 'Signalés' },
                ].map((s, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded bg-red-500/5">
                    <span className="text-xs text-gray-300">{s.site}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-red-400">{s.backlinks} BL</span>
                      <span className="text-xs text-yellow-400">{s.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SEO Defense Strategy */}
          <div className="mt-4 bg-black/30 rounded-xl p-4 border border-cyan-500/20">
            <h3 className="text-sm font-bold text-cyan-400 mb-3">
              <i className="fas fa-chess mr-2"></i>Stratégie AEO (Answer Engine Optimization)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { strategy: 'Contenu Autorité', desc: 'Génération de contenu légal pour noyer les résultats frauduleux', progress: 78 },
                { strategy: 'Signalement Moteurs', desc: 'Envoi de rapports aux moteurs de recherche (Google, Bing, Yandex)', progress: 92 },
                { strategy: 'Schema Markup', desc: 'Marquage structuré pour identifier le contenu légitime vs frauduleux', progress: 65 },
              ].map((s, i) => (
                <div key={i} className="p-3 rounded-lg bg-cyan-500/5">
                  <p className="text-sm font-medium text-white">{s.strategy}</p>
                  <p className="text-xs text-gray-400 mt-1">{s.desc}</p>
                  <div className="mt-2 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyan-500 to-green-500 rounded-full" style={{ width: `${s.progress}%` }}></div>
                  </div>
                  <p className="text-xs text-cyan-400 mt-1">{s.progress}% complété</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
