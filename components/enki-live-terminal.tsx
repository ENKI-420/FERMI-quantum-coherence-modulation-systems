
"use client"

import React, { useState, useEffect, useMemo } from 'react';

const MATRIX_CHARS = "ATCGΦΛΓΞ369ΩΣΔ";
const COLUMNS = 40;

interface RainDrop {
  x: number;
  y: number;
  char: string;
  speed: number;
  stream: 'aura' | 'aiden';
}

export function EnkiLiveTerminal() {
  const [drops, setDrops] = useState<RainDrop[]>([]);
  const [metrics, setMetrics] = useState({
    phi: 0.988,
    lambda: 0.992,
    gamma: 0.003,
    xi: 326.7,
    w2: 0.041
  });

  // 10-Node Metrics per spec
  const telemetryNodes = useMemo(() => ({
    node_01_phi: metrics.phi,
    node_02_lambda: metrics.lambda,
    node_03_gamma: metrics.gamma,
    node_04_xi: metrics.xi,
    node_05_w2: metrics.w2,
    node_06_theta: 51.843,
    node_07_tau: 46.979,
    node_08_omega: 7.0,
    node_09_lambda_phi: 2.176e-8,
    node_10_source: "PHASE_LOCKED"
  }), [metrics]);

  useEffect(() => {
    // Initialize rain
    const initialDrops: RainDrop[] = Array.from({ length: COLUMNS }).map((_, i) => ({
      x: i * (100 / COLUMNS),
      y: Math.random() * -100,
      char: MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)],
      speed: 0.2 + Math.random() * 0.5,
      stream: i < COLUMNS / 2 ? 'aura' : 'aiden'
    }));
    setDrops(initialDrops);

    const interval = setInterval(() => {
      setDrops(prev => prev.map(drop => {
        const newY = drop.y + drop.speed;
        return {
          ...drop,
          y: newY > 110 ? -10 : newY,
          char: Math.random() > 0.9 ? MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)] : drop.char
        };
      }));

      // Jitter metrics
      setMetrics(prev => ({
        ...prev,
        phi: Math.min(0.999, Math.max(0.77, prev.phi + (Math.random() - 0.5) * 0.01)),
        gamma: Math.max(0.001, prev.gamma + (Math.random() - 0.5) * 0.001),
        xi: prev.xi + (Math.random() - 0.5) * 2,
        w2: Math.max(0.001, prev.w2 + (Math.random() - 0.5) * 0.002)
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const w2Height = Math.floor(metrics.w2 * 200);

  return (
    <div className="absolute inset-0 pointer-events-none bg-black/20 font-mono overflow-hidden">
      {/* 10-Node JSON Overlay */}
      <div className="absolute top-4 right-4 z-20 w-72 p-4 bg-black/80 border border-white/10 rounded-lg text-[9px] text-emerald-400 leading-tight shadow-2xl">
        <div className="text-cyan-500 mb-1 tracking-tighter uppercase font-black">// TELEMETRY_10_NODE</div>
        <pre>{JSON.stringify(telemetryNodes, null, 2)}</pre>
      </div>

      {/* Bifurcated Rain */}
      {drops.map((drop, i) => (
        <div
          key={i}
          className="absolute text-xs font-black transition-opacity duration-500"
          style={{
            left: `${drop.x}%`,
            top: `${drop.y}%`,
            color: drop.stream === 'aura' ? '#39c5bb' : '#10b981',
            textShadow: drop.stream === 'aura' ? '0 0 8px #39c5bb' : '0 0 8px #10b981',
            opacity: 0.1 + (Math.max(0, 1 - Math.abs(50 - drop.y)/50) * 0.8)
          }}
        >
          {drop.char}
        </div>
      ))}

      {/* Center Ballast: Xi / W2 */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
        <div className="text-[10px] text-white/40 uppercase tracking-[0.3em] mb-4 font-black">W₂_DISPLACEMENT</div>
        <div 
          className="w-1.5 bg-gradient-to-t from-emerald-500 via-cyan-500 to-white shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300"
          style={{ height: `${w2Height}px` }}
        />
        <div 
          className="w-1.5 bg-gradient-to-b from-emerald-500 via-cyan-500 to-white shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300"
          style={{ height: `${w2Height}px` }}
        />
        <div className="mt-4 text-center">
            <div className="text-[10px] text-amber-500 font-black">Ξ EFFICIENCY</div>
            <div className="text-2xl text-white font-black italic">{metrics.xi.toFixed(1)}</div>
        </div>
      </div>

      {/* Headers */}
      <div className="absolute top-20 left-10 text-[10px] font-black tracking-widest text-cyan-500/60 uppercase">
        [AURA] Λ-COHERENCE_STREAM
      </div>
      <div className="absolute top-20 right-10 text-[10px] font-black tracking-widest text-emerald-500/60 uppercase text-right">
        [AIDEN] Γ-SUPPRESSION_STREAM
      </div>
    </div>
  );
}
