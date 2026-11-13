import { useState, useEffect } from 'react';

interface Notification {
  id: number;
  type: 'critical' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  icon: string;
}

const initialNotifications: Notification[] = [
  { id: 1, type: 'critical', title: 'Attaque Ransomware Détectée', message: 'LockBit 3.0 ciblant infrastructure hospitalière en France. 12 serveurs compromis.', timestamp: 'Il y a 1min', read: false, icon: 'fa-skull-crossbones' },
  { id: 2, type: 'critical', title: 'APT-29 Activity', message: 'Communication C2 détectée depuis IP 185.220.101.34 vers réseau interne.', timestamp: 'Il y a 3min', read: false, icon: 'fa-bug' },
  { id: 3, type: 'warning', title: 'VPN Non Autorisé', message: 'Connexion ExpressVPN détectée depuis poste de travail ADMIN-04.', timestamp: 'Il y a 5min', read: false, icon: 'fa-mask' },
  { id: 4, type: 'success', title: 'Site Frauduleux Bloqué', message: 'fr4ud-b4nk.xyz déréférencé avec succès de Google et Bing.', timestamp: 'Il y a 8min', read: true, icon: 'fa-shield-check' },
  { id: 5, type: 'info', title: 'Mise à jour IA', message: 'Modèle de détection mis à jour v4.2.1 - Précision améliorée de 0.3%.', timestamp: 'Il y a 12min', read: true, icon: 'fa-brain' },
  { id: 6, type: 'warning', title: 'Scan de Ports', message: 'Scan agressif détecté depuis 223.71.167.99 sur plage 10.0.0.0/24.', timestamp: 'Il y a 15min', read: true, icon: 'fa-radar' },
  { id: 7, type: 'critical', title: 'Exfiltration Données', message: 'Transfert de 2.3GB vers serveur externe non autorisé détecté.', timestamp: 'Il y a 18min', read: false, icon: 'fa-database' },
  { id: 8, type: 'info', title: 'Nouveau Nœud Tor', message: 'Exit node flaggé identifié: 185.129.62.62 (Pays-Bas) - Activité malveillante.', timestamp: 'Il y a 22min', read: true, icon: 'fa-onion' },
];

export default function NotificationPanel({ onClose }: { onClose: () => void }) {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [filter, setFilter] = useState<'all' | 'unread' | 'critical'>('all');

  const unreadCount = notifications.filter(n => !n.read).length;
  const criticalCount = notifications.filter(n => n.type === 'critical').length;

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'critical') return n.type === 'critical';
    return true;
  });

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'critical': return 'border-red-500/50 bg-red-500/10';
      case 'warning': return 'border-yellow-500/50 bg-yellow-500/10';
      case 'info': return 'border-cyan-500/50 bg-cyan-500/10';
      case 'success': return 'border-green-500/50 bg-green-500/10';
      default: return 'border-gray-500/50 bg-gray-500/10';
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'critical': return 'text-red-400';
      case 'warning': return 'text-yellow-400';
      case 'info': return 'text-cyan-400';
      case 'success': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 pt-20" onClick={onClose}>
      <div 
        className="w-full max-w-md glass rounded-xl shadow-2xl border border-gray-700 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-white">Notifications</h2>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-red-500 text-white text-xs font-bold">{unreadCount}</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={markAllRead} className="text-xs text-cyan-400 hover:text-cyan-300">
              Tout lire
            </button>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="px-4 py-2 flex gap-2 border-b border-gray-800">
          {[
            { id: 'all', label: 'Toutes' },
            { id: 'unread', label: `Non lues (${unreadCount})` },
            { id: 'critical', label: `Critiques (${criticalCount})` },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id as any)}
              className={`px-3 py-1 rounded-full text-xs transition ${
                filter === f.id ? 'bg-green-500/20 text-green-400' : 'text-gray-400 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="max-h-96 overflow-y-auto p-2">
          {filteredNotifications.map(notification => (
            <div
              key={notification.id}
              onClick={() => markAsRead(notification.id)}
              className={`p-3 rounded-lg border mb-2 cursor-pointer transition hover:scale-[1.01] ${getTypeStyles(notification.type)} ${
                !notification.read ? 'ring-1 ring-white/10' : 'opacity-70'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-black/30 ${getIconColor(notification.type)}`}>
                  <i className={`fas ${notification.icon} text-sm`}></i>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white">{notification.title}</h3>
                    {!notification.read && <div className="w-2 h-2 rounded-full bg-blue-500"></div>}
                  </div>
                  <p className="text-xs text-gray-300 mt-1">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{notification.timestamp}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-gray-700 text-center">
          <button className="text-xs text-cyan-400 hover:text-cyan-300">
            Voir toutes les notifications →
          </button>
        </div>
      </div>
    </div>
  );
}
