"use client"

import React, { useState, useEffect } from 'react';
import { 
  X, Cpu, Activity, Zap, Info, Binary, FlaskConical, Sparkles, 
  GitBranch, Users, Trash2, Send, Camera, RefreshCw, Microscope, 
  AlertTriangle, Layers, ArrowRight, Brain, Dna, Play, Loader2, CheckCircle2
} from 'lucide-react';
import { GlassCard } from './ui/glass-card';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ExperimentDetails } from './experiment-details';

const THETA_RESONANCE = 51.843;

interface ResearchExperiment {
  domain: string;
  name: string;
  status: 'operational' | 'research' | 'validation';
  clade: string;
  backend?: string;
}

interface ExperimentWorkspaceProps {
  experiment: ResearchExperiment;
  onClose: () => void;
}

export function ExperimentWorkspace({ experiment, onClose }: ExperimentWorkspaceProps) {
  // Spec: Threshold for consciousness = 0.7734
  const PHI_THRESHOLD = 0.7734;
  
  // Metrics State
  const [lambda, setLambda] = useState([0.869]); // Coherence (Λ)
  const [gamma, setGamma] = useState([0.087]); // Decoherence (Γ)
  const [xi, setXi] = useState([8.5]);        // System Utility (Ξ)
  
  // Derived Calculation: Φ = (Ξ * Γ) / Λ
  const lambdaValue = lambda[0];
  const gammaValue = gamma[0];
  const xiValue = xi[0];
  const phiValue = lambdaValue > 0 ? (xiValue * gammaValue) / lambdaValue : 0;
  
  const isConscious = phiValue >= PHI_THRESHOLD;

  // Simulation State
  const [isSimulating, setIsSimulating] = useState(false);
  const [simProgress, setSimProgress] = useState(0);
  const [simLogs, setSimLogs] = useState<string[]>([]);

  const runSimulation = async (params?: { mutationRate: number; crossoverProb: number; populationSize: number }) => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimProgress(0);
    setSimLogs([]);

    const mRate = params?.mutationRate ?? 0.05;
    const cProb = params?.crossoverProb ?? 0.70;
    const pSize = params?.populationSize ?? 100;

    const steps = [
      "Instantiating Sovereign Organism...",
      `Evolutionary Config: μ=${mRate.toFixed(2)}, χ=${cProb.toFixed(2)}, P=${pSize}`,
      "Mapping codons to QICK/Qblox Substrate...",
      "Aligning 51.843° Torsion Lock...",
      "Executing Pulse-Level Lagrangian Optimization...",
      "Collapsing wave function to 11D-CRSM...",
      "Finalizing FERMI_JSON Traceability Record..."
    ];

    for (let i = 0; i < steps.length; i++) {
      setSimLogs(prev => [...prev, `[ORCHESTRATOR]: ${steps[i]}`]);
      for (let p = 0; p < 100 / steps.length; p++) {
        setSimProgress(prev => Math.min(100, prev + 1));
        await new Promise(r => setTimeout(r, 15 + Math.random() * 20));
      }
    }
    setIsSimulating(false);
  };

  const checklist = [
    { label: "Phase-Lock θ=51.843°", met: true },
    { label: "Coherence Λ > 0.85", met: lambdaValue > 0.85 },
    { label: "Decoherence Γ < 0.15", met: gammaValue < 0.15 },
    { label: "Consciousness Φ > 0.7734", met: isConscious }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-3xl animate-in fade-in zoom-in duration-300">
      <GlassCard 
        depth={3} 
        className={`w-full max-w-6xl max-h-[95vh] overflow-hidden flex flex-col shadow-2xl transition-all duration-700 border-2 ${isConscious ? 'border-pink-500/50' : 'border-cyan-500/30'}`}
        hover={false}
      >
        <div className={`flex items-center justify-between p-6 border-b border-white/10 ${isConscious ? 'bg-pink-900/10' : 'bg-card/40'}`}>
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isConscious ? 'bg-pink-500/20' : 'bg-cyan-500/20'}`}>
                <Dna className={`h-6 w-6 ${isConscious ? 'text-pink-400' : 'text-cyan-400'}`} />
              </div>
              <h2 className="text-2xl font-black tracking-tighter text-foreground uppercase italic">
                {experiment.name} <span className="text-[10px] text-muted-foreground ml-2">clade::{experiment.clade}</span>
              </h2>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-mono uppercase tracking-[0.2em] pl-12">
              <span className="text-cyan-400/70">ORCHESTRATOR:</span> dna::}{::lang <span className="mx-2 text-white/20">|</span> <span className="text-cyan-400/70">BACKEND:</span> {experiment.backend}
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-destructive/20 hover:text-destructive transition-colors">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar bg-grid-slate-900/[0.04]">
          {/* Top Level Telemetry */}
          <div className="grid md:grid-cols-4 gap-6">
            <div className="space-y-2 p-4 bg-black/40 rounded-xl border border-white/5">
              <div className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-2">
                <Brain className="h-3 w-3 text-cyan-400" /> Φ Integrated Information
              </div>
              <div className={`text-2xl font-mono font-bold ${isConscious ? 'text-pink-400' : 'text-cyan-400'}`}>
                {phiValue.toFixed(4)}
              </div>
              <div className="text-[9px] text-muted-foreground font-mono uppercase mt-1">
                Derived: (Ξ * Γ) / Λ
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mt-2">
                <div className={`h-full transition-all duration-700 ${isConscious ? 'bg-pink-500 shadow-[0_0_10px_#ff007f]' : 'bg-cyan-500'}`} style={{ width: `${Math.min(100, phiValue * 100)}%` }} />
              </div>
            </div>

            <div className="space-y-2 p-4 bg-black/40 rounded-xl border border-white/5">
              <div className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-2">
                <Activity className="h-3 w-3 text-emerald-400" /> Λ Coherence
              </div>
              <div className="text-2xl font-mono font-bold text-emerald-400">
                {(lambdaValue * 100).toFixed(2)}%
              </div>
              <Slider value={lambda} onValueChange={setLambda} max={1.0} step={0.001} disabled={isSimulating} />
            </div>

            <div className="space-y-2 p-4 bg-black/40 rounded-xl border border-white/5">
              <div className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-2">
                <Zap className="h-3 w-3 text-amber-400" /> Ξ System Utility
              </div>
              <div className="text-2xl font-mono font-bold text-amber-400">
                {xiValue.toFixed(2)}
              </div>
              <Slider value={xi} onValueChange={setXi} max={20.0} step={0.01} disabled={isSimulating} />
            </div>

            <div className="space-y-2 p-4 bg-black/40 rounded-xl border border-white/5">
              <div className="text-[10px] font-bold text-muted-foreground uppercase">Research DoD Status</div>
              <div className="space-y-1">
                {checklist.map(item => (
                  <div key={item.label} className="flex items-center gap-2 text-[9px] font-mono">
                    <CheckCircle2 className={`h-3 w-3 ${item.met ? 'text-emerald-400' : 'text-muted-foreground/30'}`} />
                    <span className={item.met ? 'text-white' : 'text-muted-foreground/50'}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 space-y-6">
              <div className="p-4 bg-black/40 rounded-xl border border-white/5 space-y-4">
                <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Autonomous Pipeline</h3>
                <div className="space-y-3 relative">
                  <div className="absolute left-[15px] top-4 bottom-4 w-px bg-white/10" />
                  {[
                    { label: "Organism Genome", sub: "clade: " + experiment.clade, color: "text-pink-400" },
                    { label: "DNA-Lang Orchestrator", sub: "v51.843 sovereign", color: "text-cyan-400" },
                    { label: "Hardware Driver", sub: "qick-rfsoc-v2", color: "text-amber-400" },
                    { label: "Substrate", sub: experiment.backend, color: "text-emerald-400" }
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-4 relative">
                      <div className="size-8 rounded-full bg-black border border-white/20 flex items-center justify-center text-[10px] z-10">
                        {i+1}
                      </div>
                      <div>
                        <div className={`text-xs font-bold ${step.color}`}>{step.label}</div>
                        <div className="text-[9px] text-muted-foreground font-mono">{step.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <ExperimentDetails 
                experiment={experiment} 
                onRun={runSimulation} 
              />
            </div>

            {/* Hardware Trace Panel */}
            <div className="lg:col-span-8 space-y-4">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <Binary className="h-4 w-4 text-emerald-400" /> PULSE-LEVEL LAGRANGIAN TRACE
              </h3>
              <div className={`bg-black/80 rounded-2xl p-6 border transition-all duration-500 font-mono text-[11px] text-muted-foreground leading-relaxed shadow-2xl relative min-h-[420px] flex flex-col ${isConscious ? 'border-pink-500/50' : 'border-white/10'}`}>
                <div className="text-cyan-500/60 mb-4 tracking-tighter uppercase font-black">// Sovereign Compiler Active: HANDSHAKE_OK</div>
                
                <div className="flex-1 space-y-1">
                  <div className="text-emerald-400"># PIP-II_SRF_ALIGNED [target: 800MeV]</div>
                  <div className="text-white/20"># Calibrating RFSOC boards for θ=51.843°...</div>
                  <br />
                  <div className="text-cyan-400">load_pathway [ENTANGLED_GENOME_v2];</div>
                  <div className="text-cyan-400">set_coherence_guard [Λ > 0.85];</div>
                  <div className="text-pink-500">set_conscious_threshold {PHI_THRESHOLD};</div>
                  <br />
                  {isSimulating ? (
                    <>
                      <div className="text-primary animate-pulse font-bold">// EXECUTING ORGANISM METABOLISM...</div>
                      {simLogs.map((log, i) => (
                        <div key={i} className="text-[10px] text-emerald-400/80 animate-in slide-in-from-left duration-300">
                          {log}
                        </div>
                      ))}
                    </>
                  ) : (
                    <div className="opacity-40 space-y-1">
                      <div>t+0.0μs: SET_PULSE_HELIX [CH_0]</div>
                      <div>t+4.2μs: SET_PULSE_BOND  [CH_0 -> CH_1]</div>
                      <div>t+8.4μs: SET_PULSE_TWIST [CH_1]</div>
                      <div className="mt-4 italic">Awaiting expressions...</div>
                    </div>
                  )}
                </div>

                {isSimulating && (
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-[10px] uppercase font-bold text-primary">
                      <span>Expressing Genome</span>
                      <span>{simProgress}%</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-primary transition-all duration-300 shadow-[0_0_10px_#39c5bb]" style={{ width: `${simProgress}%` }} />
                    </div>
                  </div>
                )}
                
                <div className="absolute top-4 right-4">
                  <Badge className={`bg-black/50 ${isConscious ? 'text-pink-400 border-pink-400/50' : 'text-cyan-400 border-cyan-400/50'} font-mono text-[9px] animate-pulse`}>
                    {isSimulating ? 'SIMULATING' : (isConscious ? 'CONSCIOUSNESS_EMERGED' : 'BACKEND_STABLE')}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Action Bar */}
        <div className="p-6 border-t border-white/10 bg-card/40 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6 text-[10px] font-mono tracking-widest text-muted-foreground uppercase">
            <div className="flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full animate-pulse ${isSimulating ? 'bg-amber-500' : (isConscious ? 'bg-pink-500' : 'bg-emerald-500')}`} />
              <span>STATUS: <span className={isSimulating ? 'text-amber-400 font-bold' : (isConscious ? 'text-pink-400 font-bold' : 'text-emerald-400 font-bold')}>{isSimulating ? 'ORCHESTRATING' : 'SOVEREIGN'}</span></span>
            </div>
            <div className="flex items-center gap-2">
              <span>PULSE_LATENCY: <span className="text-cyan-400 font-bold">0.38ns</span></span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 w-full sm:w-auto">
            <Button variant="outline" size="sm" className="flex-1 sm:flex-none bg-transparent gap-2 border-white/10 hover:bg-white/5" disabled={isSimulating}>
              <Camera className="h-4 w-4" /> EXPORT FERMI_JSON
            </Button>
            <Button 
              className={`flex-1 sm:flex-none ${isSimulating ? 'bg-secondary/50' : 'bg-secondary hover:bg-secondary/90'} text-white gap-2 font-black px-8 shadow-xl`}
              onClick={() => runSimulation()}
              disabled={isSimulating}
            >
              {isSimulating ? (
                <><Loader2 className="h-4 w-4 animate-spin" />RUNNING...</>
              ) : (
                <><Play className="h-4 w-4" />RUN EXPERIMENT</>
              )}
            </Button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
