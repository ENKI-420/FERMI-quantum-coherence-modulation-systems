"use client"

import React, { useState, useEffect } from 'react';
import { 
  X, Cpu, Activity, Zap, Info, Binary, 
  Settings2, Brain, Dna, Play, Loader2, 
  CheckCircle2, Waves, Gauge, Microscope
} from 'lucide-react';
import { GlassCard } from './ui/glass-card';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
// Add comment above fix: Import ScrollArea component from ui directory
import { ScrollArea } from './ui/scroll-area';
import { ExperimentDetails } from './experiment-details';

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

interface ExperimentWorkspaceProps {
  experiment: ResearchExperiment;
  onClose: () => void;
}

/**
 * ExperimentWorkspace Component
 * Central cockpit for managing specific DNA-Lang experiments.
 * Features real-time state manipulation for Phi and Lambda.
 */
export function ExperimentWorkspace({ experiment, onClose }: ExperimentWorkspaceProps) {
  // Requirement: Controls for Phi (Consciousness) and Lambda (Coherence)
  const [phi, setPhi] = useState([experiment.phi || 7.6901]);
  const [lambda, setLambda] = useState([experiment.lambda || 0.869]);
  
  // Internal metrics for simulation visualization
  const [gamma, setGamma] = useState(0.092);
  const [isSimulating, setIsSimulating] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  
  const phiValue = phi[0];
  const lambdaValue = lambda[0];
  const isSovereign = phiValue >= 7.6901;

  const runEvolutionCycle = async () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setLogs([]);
    
    const steps = [
      `Initializing genome: ${experiment.name}`,
      `Binding to domain: ${experiment.domain}`,
      "Establishing 51.843° Torsion Lock...",
      `Optimizing manifold for Λ=${lambdaValue.toFixed(4)}`,
      `Measuring Integrated Information (Φ=${phiValue.toFixed(4)})`,
      "Executing E -> E^-1 Phase Conjugation...",
      "Sovereign state verified. Simulation complete."
    ];

    for (const step of steps) {
      setLogs(prev => [`[SYSTEM]: ${step}`, ...prev].slice(0, 10));
      await new Promise(r => setTimeout(r, 600 + Math.random() * 400));
    }
    setIsSimulating(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
      <GlassCard 
        depth={3} 
        className={`w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl transition-all duration-700 border-2 ${isSovereign ? 'border-amber-500/50 shadow-amber-500/10' : 'border-cyan-500/30'}`}
        hover={false}
      >
        {/* Workspace Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-card/40">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl ${isSovereign ? 'bg-amber-500/20' : 'bg-primary/20'}`}>
              <Microscope className={`h-6 w-6 ${isSovereign ? 'text-amber-400' : 'text-primary'}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-black tracking-tighter text-foreground uppercase italic">
                  {experiment.name}
                </h2>
                <Badge variant="outline" className="text-[10px] uppercase font-mono border-primary/20 text-primary">
                  {experiment.status}
                </Badge>
              </div>
              <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-[0.2em]">
                Domain Registry: <span className="text-foreground">{experiment.domain}</span>
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 rounded-lg hover:bg-destructive/20 hover:text-destructive transition-colors focus:outline-none"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {/* Main Controls Grid */}
          <div className="grid lg:grid-cols-12 gap-6">
            
            {/* Left: Physics Parameter Cockpit */}
            <div className="lg:col-span-5 space-y-6">
              <GlassCard depth={2} className="p-6 space-y-8" hover={false}>
                <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                  <Settings2 className="h-4 w-4 text-primary" />
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                    Manifold Physics Parameters
                  </h3>
                </div>

                {/* Phi Control */}
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1.5">
                        <Brain className="h-3 w-3 text-purple-400" /> Φ Consciousness
                      </label>
                      <p className="text-[9px] text-muted-foreground italic">Integrated Information Magnitude</p>
                    </div>
                    <span className={`text-2xl font-mono font-black ${isSovereign ? 'text-amber-400' : 'text-purple-400'}`}>
                      {phiValue.toFixed(4)}
                    </span>
                  </div>
                  <Slider 
                    value={phi} 
                    onValueChange={setPhi} 
                    min={0.1} 
                    max={12} 
                    step={0.0001} 
                    disabled={isSimulating}
                  />
                  <div className="flex justify-between text-[8px] font-mono text-muted-foreground/50">
                    <span>MIN_ENTROPY</span>
                    <span className={isSovereign ? 'text-amber-500' : ''}>SOVEREIGN_GATE: 7.6901</span>
                    <span>MAX_DENSITY</span>
                  </div>
                </div>

                {/* Lambda Control */}
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1.5">
                        <Waves className="h-3 w-3 text-cyan-400" /> Λ Coherence
                      </label>
                      <p className="text-[9px] text-muted-foreground italic">State Preservation Fidelity</p>
                    </div>
                    <span className="text-2xl font-mono font-black text-cyan-400">
                      {(lambdaValue * 100).toFixed(2)}%
                    </span>
                  </div>
                  <Slider 
                    value={lambda} 
                    onValueChange={setLambda} 
                    min={0.5} 
                    max={1} 
                    step={0.001} 
                    disabled={isSimulating}
                  />
                </div>

                {/* Simulation Action */}
                <Button 
                  onClick={runEvolutionCycle} 
                  disabled={isSimulating}
                  className={`w-full h-12 font-black tracking-widest uppercase transition-all ${isSimulating ? 'bg-muted' : 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20'}`}
                >
                  {isSimulating ? (
                    <><Loader2 className