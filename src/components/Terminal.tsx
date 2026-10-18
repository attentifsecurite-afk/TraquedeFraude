import { useState, useRef, useEffect } from 'react';

interface CommandEntry {
  type: 'input' | 'output' | 'error' | 'success' | 'info';
  content: string;
}

const COMMANDS: Record<string, (args: string[]) => string[]> = {
  help: () => [
    '╔══════════════════════════════════════════════════╗',
    '║       CYBERTRACKER AI - Terminal de Commande     ║',
    '╠══════════════════════════════════════════════════╣',
    '║  scan <ip>        - Scanner une adresse IP       ║',
    '║  trace <target>   - Tracer une cible             ║',
    '║  block <ip>       - Bloquer une IP               ║',
    '║  whois <domain>   - Recherche WHOIS              ║',
    '║  nmap <target>    - Scan de ports                 ║',
    '║  tor-circuit      - Analyser circuit Tor          ║',
    '║  vpn-detect       - Détecter VPN actifs           ║',
    '║  threat-feed      - Flux de menaces               ║',
    '║  seo-report <url> - Rapport SEO frauduleux        ║',
    '║  delist <url>     - Déréférencer un site          ║',
    '║  status           - Statut du système             ║',
    '║  clear            - Effacer le terminal           ║',
    '╚══════════════════════════════════════════════════╝',
  ],
  scan: (args) => {
    if (!args[0]) return ['[ERREUR] Usage: scan <adresse_ip>'];
    const ip = args[0];
    return [
      `[*] Scan de ${ip} initié...`,
      `[+] Résolution DNS: ${ip} -> node-${Math.floor(Math.random() * 99)}.tor-exit.net`,
      `[+] OS détecté: Linux 5.x (probabilité: 87%)`,
      `[+] Ports ouverts: 22(SSH), 80(HTTP), 443(HTTPS), 9050(Tor), 9051`,
      `[+] Services: OpenSSH 8.9, nginx 1.24, Tor 0.4.7`,
      `[!] VULNÉRABILITÉ: CVE-2024-1234 - Critical`,
      `[+] Géolocalisation: 55.7558°N, 37.6173°E (Moscou, RU)`,
      `[+] FAI: Rostelecom AS12389`,
      `[+] Score de menace: 9.2/10 - CRITIQUE`,
      `[✓] Scan terminé en 3.42s`,
    ];
  },
  trace: (args) => {
    if (!args[0]) return ['[ERREUR] Usage: trace <cible>'];
    return [
      `[*] Traçage de ${args[0]}...`,
      `[+] Hop 1: 10.0.0.1 (1.2ms)`,
      `[+] Hop 2: 172.16.0.1 (5.4ms)`,
      `[+] Hop 3: 185.220.101.1 - Tor Entry Node (45ms)`,
      `[+] Hop 4: 51.15.87.44 - Tor Relay (120ms)`,
      `[+] Hop 5: 185.129.62.62 - Tor Exit Node (230ms)`,
      `[!] ATTENTION: Routage Tor détecté - Anonymisation active`,
      `[+] Tentative de dé-anonymisation via correlation attack...`,
      `[+] Pattern de trafic corrélé avec activité suspecte`,
      `[+] Localisation estimée: Europe de l'Est (confiance: 73%)`,
      `[✓] Traçage terminé - Rapport généré: trace_${Date.now()}.log`,
    ];
  },
  block: (args) => {
    if (!args[0]) return ['[ERREUR] Usage: block <ip>'];
    return [
      `[*] Blocage de ${args[0]}...`,
      `[+] Ajout à la blacklist: ${args[0]}`,
      `[+] Propagation aux nœuds CDN: 47/47 OK`,
      `[+] Mise à jour des règles pare-feu: DONE`,
      `[+] Notification envoyée aux FAI partenaires`,
      `[+] Signalement ICANN/abus transmis`,
      `[✓] IP ${args[0]} bloquée sur tous les systèmes`,
    ];
  },
  whois: (args) => {
    if (!args[0]) return ['[ERREUR] Usage: whois <domaine>'];
    return [
      `[*] Recherche WHOIS pour ${args[0]}...`,
      `[+] Domaine: ${args[0]}`,
      `[+] Registrant: REDACTED FOR PRIVACY`,
      `[+] Registrar: NameCheap, Inc.`,
      `[+] Création: 2023-06-15`,
      `[+] Expiration: 2024-06-15`,
      `[+] DNS: ns1.offshore-host.com, ns2.offshore-host.com`,
      `[!] ALERTE: Domaine enregistré avec identité masquée`,
      `[!] ALERTE: Hébergement offshore (Seychelles)`,
      `[+] Score de risque: 8.7/10`,
    ];
  },
  nmap: (args) => {
    if (!args[0]) return ['[ERREUR] Usage: nmap <cible>'];
    return [
      `[*] Nmap scan pour ${args[0]}...`,
      `Starting Nmap 7.94 ( https://nmap.org )`,
      ``,
      `PORT     STATE  SERVICE      VERSION`,
      `22/tcp   open   ssh          OpenSSH 8.9`,
      `80/tcp   open   http         nginx 1.24.0`,
      `443/tcp  open   ssl/http     nginx 1.24.0`,
      `9050/tcp open   tor-socks    Tor 0.4.7.14`,
      `9051/tcp open   tor-control  Tor 0.4.7.14`,
      `3306/tcp closed mysql`,
      ``,
      `[+] 5 ports ouverts, 1 fermé, 64549 filtrés`,
      `[✓] Scan terminé - 12.34s écoulées`,
    ];
  },
  'tor-circuit': () => [
    '[*] Analyse du circuit Tor actif...',
    '[+] Circuit ID: #48A7F2',
    '[+] Entry Guard: DE-01 (Allemagne) - 45 MB/s',
    '[+] Middle Relay: NL-14 (Pays-Bas) - 22 MB/s',
    '[+] Exit Relay: CH-07 (Suisse) - 18 MB/s',
    '[+] Latence totale: 340ms',
    '[!] Exit relay flaggé: BadExit',
    '[+] Traffic pattern: Correspondance avec activité C2',
    '[✓] Circuit analysé - Risque: ÉLEVÉ',
  ],
  'vpn-detect': () => [
    '[*] Scan de détection VPN en cours...',
    '[+] Protocoles analysés: OpenVPN, WireGuard, IKEv2, Shadowsocks',
    '[+] 7 connexions VPN détectées',
    '[!] ExpressVPN - 104.244.72.115 - UK - RISQUE HAUT',
    '[+] NordVPN - 193.218.118.183 - NL - Risque moyen',
    '[!] Mullvad - 193.138.218.74 - SE - RISQUE HAUT',
    '[+] ProtonVPN - 146.70.86.18 - CH - Risque bas',
    '[+] Fingerprinting terminé: 3 VPNs à haut risque identifiés',
    '[✓] Rapport complet: vpn_scan_' + Date.now() + '.json',
  ],
  'threat-feed': () => [
    '[*] Flux de menaces en temps réel...',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '[🔴 CRITICAL] Ransomware - LockBit 3.0 - Cible: Hôpitaux EU',
    '[🔴 CRITICAL] APT29 - Opération active - Cible: Gouvernements OTAN',
    '[🟠 HIGH] Phishing - Campagne massive - 12,000 emails/h',
    '[🟠 HIGH] DDoS - Botnet Mirai - Cible: Infrastructures DNS',
    '[🟡 MEDIUM] Cryptojacking - 340 serveurs compromis',
    '[🔴 CRITICAL] Zero-Day - CVE-2024-9999 - Exploit public',
    '[🟠 HIGH] Data Breach - 2.4M enregistrements en vente',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '[✓] 7 menaces actives - 3 critiques',
  ],
  'seo-report': (args) => {
    if (!args[0]) return ['[ERREUR] Usage: seo-report <url>'];
    return [
      `[*] Rapport SEO pour ${args[0]}...`,
      `[+] Domain Authority: 12/100`,
      `[+] PageRank estimé: 0.02`,
      `[+] Backlinks: 234 (89% toxiques)`,
      `[+] Contenu dupliqué: 78% avec sources connues`,
      `[!] ALERTE: Site listé dans 4 blacklists`,
      `[!] ALERTE: Certificat SSL auto-signé`,
      `[+] Mots-clés frauduleux détectés: 47`,
      `[+] Recommandation: Déréférencement immédiat`,
      `[✓] Rapport SEO terminé`,
    ];
  },
  delist: (args) => {
    if (!args[0]) return ['[ERREUR] Usage: delist <url>'];
    return [
      `[*] Processus de déréférencement pour ${args[0]}...`,
      `[+] Étape 1/5: Signalement Google Safe Browsing... OK`,
      `[+] Étape 2/5: Demande de suppression Bing... OK`,
      `[+] Étape 3/5: Notification DMCA Takedown... ENVOYÉ`,
      `[+] Étape 4/5: Mise à jour des listes noires CDN... OK`,
      `[+] Étape 5/5: Propagation DNS sinkhole... EN COURS`,
      `[✓] Déréférencement initié - Délai estimé: 24-48h`,
    ];
  },
  status: () => [
    '╔══════════════════════════════════════════════════╗',
    '║           SYSTÈME CYBERTRACKER AI                ║',
    '╠══════════════════════════════════════════════════╣',
    '║  Version: 4.2.1 (Build 20240203)                ║',
    '║  Statut: ● ACTIF                                ║',
    '║  Uptime: 47j 12h 33m                            ║',
    '║  CPU: 23% | RAM: 4.2GB/16GB | DISK: 34%        ║',
    '║  Menaces bloquées: 24,891                       ║',
    '║  IPs traquées: 1,247                            ║',
    '║  Sites déréférencés: 892                        ║',
    '║  Modèle IA: v4.2 - Précision: 99.7%             ║',
    '║  Nœuds de surveillance: 2,847/2,847             ║',
    '╚══════════════════════════════════════════════════╝',
  ],
};

export default function Terminal() {
  const [entries, setEntries] = useState<CommandEntry[]>([
    { type: 'info', content: '╔══════════════════════════════════════════════════╗' },
    { type: 'info', content: '║   CYBERTRACKER AI - Terminal de Cybersécurité    ║' },
    { type: 'info', content: '║   Tapez "help" pour voir les commandes           ║' },
    { type: 'info', content: '╚══════════════════════════════════════════════════╝' },
    { type: 'info', content: '' },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [entries]);

  const processCommand = (cmd: string) => {
    const parts = cmd.trim().split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (command === 'clear') {
      setEntries([]);
      return;
    }

    if (command === '') return;

    const handler = COMMANDS[command];
    if (handler) {
      const output = handler(args);
      setEntries(prev => [
        ...prev,
        { type: 'input', content: `$ ${cmd}` },
        ...output.map(line => ({
          type: (line.startsWith('[!]') ? 'error' : line.startsWith('[✓]') ? 'success' : 'output') as CommandEntry['type'],
          content: line,
        })),
      ]);
    } else {
      setEntries(prev => [
        ...prev,
        { type: 'input', content: `$ ${cmd}` },
        { type: 'error', content: `[ERREUR] Commande inconnue: "${command}". Tapez "help" pour l'aide.` },
      ]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    processCommand(input);
    setHistory(prev => [...prev, input]);
    setHistoryIndex(-1);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(history[newIndex]);
        }
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="glass rounded-xl overflow-hidden">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 px-4 py-2 bg-black/50 border-b border-gray-800">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-xs text-gray-400 font-mono ml-2">cybertracker@ai:~$</span>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs text-green-400 font-mono">● CONNECTÉ</span>
          </div>
        </div>

        {/* Terminal Body */}
        <div 
          ref={containerRef}
          className="p-4 h-96 overflow-y-auto bg-black/70 font-mono text-sm"
          onClick={() => inputRef.current?.focus()}
        >
          {entries.map((entry, i) => (
            <div key={i} className={`leading-relaxed ${
              entry.type === 'input' ? 'text-green-400' :
              entry.type === 'error' ? 'text-red-400' :
              entry.type === 'success' ? 'text-cyan-400' :
              entry.type === 'info' ? 'text-purple-400' :
              'text-gray-300'
            }`}>
              {entry.content}
            </div>
          ))}
          
          {/* Input line */}
          <form onSubmit={handleSubmit} className="flex items-center mt-1">
            <span className="text-green-400 mr-2">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-white outline-none caret-green-400"
              autoFocus
              spellCheck={false}
            />
          </form>
        </div>
      </div>

      {/* Quick Commands */}
      <div className="glass rounded-xl p-4">
        <h3 className="text-sm font-bold text-white mb-3">Commandes Rapides</h3>
        <div className="flex flex-wrap gap-2">
          {[
            { cmd: 'status', label: 'Statut Système' },
            { cmd: 'threat-feed', label: 'Flux Menaces' },
            { cmd: 'vpn-detect', label: 'Détecter VPN' },
            { cmd: 'tor-circuit', label: 'Circuit Tor' },
            { cmd: 'help', label: 'Aide' },
          ].map(q => (
            <button
              key={q.cmd}
              onClick={() => {
                processCommand(q.cmd);
                inputRef.current?.focus();
              }}
              className="px-3 py-1.5 rounded-lg bg-white/5 border border-gray-700 text-xs text-gray-300 hover:border-green-500/50 hover:text-green-400 transition font-mono"
            >
              <i className="fas fa-terminal mr-1"></i>{q.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
