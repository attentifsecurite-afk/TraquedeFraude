import { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import ThreatMap from './components/ThreatMap';
import AnomalyDetector from './components/AnomalyDetector';
import TorVpnTracker from './components/TorVpnTracker';
import SEODefense from './components/SEODefense';
import Terminal from './components/Terminal';
import Header from './components/Header';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [systemStatus, setSystemStatus] = useState('ACTIVE');

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStatus(prev => prev === 'ACTIVE' ? 'SCANNING' : 'ACTIVE');
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'threatmap': return <ThreatMap />;
      case 'anomaly': return <AnomalyDetector />;
      case 'torvpn': return <TorVpnTracker />;
      case 'seo': return <SEODefense />;
      case 'terminal': return <Terminal />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen grid-bg">
      <Header systemStatus={systemStatus} />
      
      {/* Navigation */}
      <nav className="glass sticky top-0 z-40 px-4 py-2 flex items-center gap-1 overflow-x-auto">
        {[
          { id: 'dashboard', icon: 'fa-gauge-high', label: 'Dashboard' },
          { id: 'threatmap', icon: 'fa-globe', label: 'Carte Menaces' },
          { id: 'anomaly', icon: 'fa-triangle-exclamation', label: 'Anomalies' },
          { id: 'torvpn', icon: 'fa-user-secret', label: 'VPN/Tor' },
          { id: 'seo', icon: 'fa-shield-halved', label: 'SEO Defense' },
          { id: 'terminal', icon: 'fa-terminal', label: 'Terminal' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'text-gray-400 hover:text-green-400 hover:bg-white/5'
            }`}
          >
            <i className={`fas ${tab.icon}`}></i>
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main className="p-4 md:p-6">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
