
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleGenAI } from "@google/genai";
import { ExperimentWorkspace } from './components/experiment-workspace';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { EnkiLiveTerminal } from './components/enki-live-terminal';

const COLORS = {
  bg: '#010409',
  panel: '#0d1117',
  blue: '#58a6ff', 
  orange: '#f0883e',
  cyan: '#39c5bb',
  gray: '#8b949e',
  border: '#30363d',
  success: '#238636',
  alert: '#da3633',
  ignition: '#ff007f', 
  fermiBlue: '#004c97',
  gold: '#d97706',
  emerald: '#10b981',
};

type Severity = 'info' | 'warning' | 'error' | 'success';

interface LogEntry {
  timestamp: Date;
  message: string;
  severity: Severity;
}

interface ResearchExperiment {
  domain: string;
  name: string;
  status: 'operational' | 'research' | 'validation';
  clade: 'METABOLIC' | 'TRANSDUCTIVE' | 'DEFENSIVE' | 'COGNITIVE' | 'SPECTRA';
  phi?: number;
  lambda?: number;
  gamma?: number;
  backend?: string;
}

const FERMI_CONFIG = {
  DOMAINS: [
    { id: 'orchestration', name: 'Orchestration Layer', icon: '🧠', desc: 'Genome & Evolution' },
    { id: 'bridge', name: 'Osiris Bridge', icon: '🌉', desc: '11D-CRSM Cockpit' },
    { id: 'hardware', name: 'Hardware Substrate', icon: '⚡', desc: 'QICK/Qblox/IBM' }
  ],
  ORGANISMS: [
    { domain: 'Transmutation', name: 'SPECTRA_COAL_ASH', status: 'research', clade: 'SPECTRA', backend: 'PHASE_CONJUGATE_REACTOR' },
    { domain: 'Orchestration', name: 'ADAPTIVE_AAF_V5', status: 'operational', clade: 'COGNITIVE', backend: 'IBM_TORINO' },
    { domain: 'Bridge', name: 'OSIRIS_SYNC_77', status: 'research', clade: 'TRANSDUCTIVE', backend: 'QBLOX_CLUSTER_01' },
    { domain: 'Hardware', name: 'SRF_CAVITY_RESONANCE', status: 'validation', clade: 'METABOLIC', backend: 'FERMI_PIP_II' },
  ] as ResearchExperiment[]
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: COLORS.bg,
    color: '#c9d1d9',
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 32px',
    background: COLORS.panel,
    borderBottom: `1px solid ${COLORS.border}`,
    zIndex: 100,
  },
  main: {
    flex: 1,
    display: 'flex',
    overflow: 'hidden',
  },
  sidebar: {
    width: '380px',
    background: COLORS.panel,
    borderRight: `1px solid ${COLORS.border}`,
    display: 'flex',
    flexDirection: 'column' as const,
    padding: '24px',
    overflowY: 'auto' as const,
  },
  workspace: {
    flex: 1,
    position: 'relative' as const,
    background: 'radial-gradient(circle at 50% 50%, #0d1117 0%, #010409 100%)',
    overflow: 'hidden',
  },
  card: (active: boolean) => ({
    background: active ? '#1c2128' : '#161b22',
    border: `1px solid ${active ? COLORS.cyan : COLORS.border}`,
    borderRadius: '8px',
    padding: '12px',
    marginBottom: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  }),
  statusHud: {
    display: 'flex',
    gap: '24px',
    padding: '12px 24px',
    background: 'rgba(13, 17, 23, 0.8)',
    borderBottom: `1px solid ${COLORS.border}`,
    fontSize: '11px',
    fontFamily: 'monospace',
  }
};

function App() {
  const [selectedExpt, setSelectedExpt] = useState<ResearchExperiment | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [phi, setPhi] = useState(7.6901);

  const addLog = (msg: string, severity: Severity = 'info') => {
    setLogs(prev => [{ timestamp: new Date(), message: msg, severity }, ...prev].slice(0, 30));
  };

  useEffect(() => {
    addLog("FERMI Lab Workspace Initialized. 11D-CRSM Manifold active.", "success");
    addLog("Coupling with ibm_torino established (Λ=0.923).", "info");
    addLog("Project SPECTRA loaded: Awaiting coal-ash ionization.", "info");
  }, []);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ fontSize: '24px', fontWeight: 900, letterSpacing: '-1px' }}>
            FERMI<span style={{ color: COLORS.cyan }}>::</span>LAB
          </div>
          <Badge variant="outline" className="text-[10px] border-emerald-500/30 text-emerald-400">
            SOVEREIGN WORKSPACE v51.843
          </Badge>
        </div>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '9px', color: COLORS.gray, textTransform: 'uppercase' }}>Global Phi (Φ)</div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: COLORS.cyan, fontFamily: 'monospace' }}>{phi.toFixed(4)}</div>
          </div>
          <Button className="bg-primary hover:bg-primary/90" onClick={() => addLog("Calibrating Phase-Lock...", "warning")}>
            Global Sync
          </Button>
        </div>
      </header>

      <div style={styles.statusHud}>
        <span style={{ color: COLORS.emerald }}>● BRIDGE_ACTIVE</span>
        <span style={{ color: COLORS.gray }}>|</span>
        <span>LATENCY: 0.38ns</span>
        <span style={{ color: COLORS.gray }}>|</span>
        <span>BACKENDS: 4/4 LINKED</span>
        <span style={{ color: COLORS.gray }}>|</span>
        <span>THETA_LOCK: 51.843°</span>
        <span style={{ color: COLORS.gray }}>|</span>
        <span style={{ color: COLORS.gold }}>Ξ EFFICIENCY: 194.03%</span>
      </div>

      <div style={styles.main}>
        <aside style={styles.sidebar}>
          <h3 style={{ fontSize: '11px', fontWeight: 800, color: COLORS.blue, marginBottom: '16px', letterSpacing: '2px' }}>
            MANIFOLD REGISTRY
          </h3>
          {FERMI_CONFIG.ORGANISMS.map((org, i) => (
            <div key={i} style={styles.card(selectedExpt?.name === org.name)} onClick={() => setSelectedExpt(org)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <span style={{ fontSize: '13px', fontWeight: 700 }}>{org.name}</span>
                <span style={{ fontSize: '9px', opacity: 0.6 }}>{org.clade}</span>
              </div>
              <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '10px', color: COLORS.gray }}>{org.backend}</div>
                <div style={{ fontSize: '10px', color: org.status === 'operational' ? COLORS.emerald : COLORS.blue }}>
                  {org.status.toUpperCase()}
                </div>
              </div>
            </div>
          ))}

          <div style={{ marginTop: 'auto' }}>
            <h3 style={{ fontSize: '11px', fontWeight: 800, color: COLORS.gray, marginBottom: '12px' }}>EVENT LOG</h3>
            <div className="custom-scrollbar" style={{ height: '200px', background: '#010409', borderRadius: '4px', padding: '12px', fontSize: '10px', overflowY: 'auto', fontFamily: 'monospace' }}>
              {logs.map((l, i) => (
                <div key={i} style={{ marginBottom: '4px', color: l.severity === 'success' ? COLORS.emerald : l.severity === 'warning' ? COLORS.gold : l.severity === 'error' ? COLORS.alert : COLORS.cyan }}>
                  <span style={{ opacity: 0.4 }}>[{l.timestamp.toLocaleTimeString()}]</span> {l.message}
                </div>
              ))}
            </div>
          </div>
        </aside>

        <main style={styles.workspace}>
          <EnkiLiveTerminal />
          <div style={{ position: 'absolute', top: '40px', left: '40px', zIndex: 1 }}>
            <h2 style={{ fontSize: '32px', fontWeight: 900, margin: 0, textShadow: '0 0 20px rgba(57, 197, 187, 0.4)' }}>11D-CRSM</h2>
            <p style={{ color: COLORS.gray, margin: '4px 0 0 0', maxWidth: '400px', fontSize: '14px' }}>
              Programmable Reality Substrate.
              Coordinating distributed compute engines to manifest specific world-states.
            </p>
          </div>
          
          <div style={{ position: 'absolute', bottom: '40px', right: '40px', textAlign: 'right', zIndex: 1 }}>
            <div style={{ fontSize: '12px', color: COLORS.gold, fontWeight: 700 }}>AXIOM U := L[U]</div>
            <div style={{ fontSize: '10px', color: COLORS.gray }}>Universally Recursive Lagrangian active</div>
          </div>
        </main>
      </div>

      {selectedExpt && (
        <ExperimentWorkspace 
          experiment={selectedExpt} 
          onClose={() => setSelectedExpt(null)} 
        />
      )}
    </div>
  );
}

const root = createRoot(document.getElementById('root') || document.body);
root.render(<App />);
