import { useState, useEffect } from 'react';

interface HeaderProps {
  systemStatus: string;
}

export default function Header({ systemStatus }: HeaderProps) {
  const [time, setTime] = useState(new Date());
  const [threatCount, setThreatCount] = useState(1247);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
      setThreatCount(prev => prev + Math.floor(Math.random() * 3));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="glass px-4 md:px-6 py-4 flex items-center justify-between flex-wrap gap-4">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-cyan-500 flex items-center justify-center animate-pulse-glow">
            <i className="fas fa-shield-halved text-white text-xl"></i>
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-gray-900 animate-pulse"></div>
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
            CYBERTRACKER AI
          </h1>
          <p className="text-xs text-gray-400 font-mono">
            Système de Traque de Fraude & Cybercriminalité v4.2.1
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        {/* Threat Counter */}
        <div className="text-right">
          <div className="text-xs text-gray-400">Menaces Détectées</div>
          <div className="text-xl font-bold text-red-400 font-mono">{threatCount.toLocaleString()}</div>
        </div>

        {/* System Status */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-xs font-mono text-green-400">{systemStatus}</span>
        </div>

        {/* Time */}
        <div className="hidden md:block text-right">
          <div className="text-xs text-gray-400">UTC</div>
          <div className="text-sm font-mono text-cyan-400">
            {time.toUTCString().split(' ')[4]}
          </div>
        </div>
      </div>
    </header>
  );
}
