"use client"

import React, { useState } from 'react';
import { Settings, Info, Users, Zap, GitBranch, Play, Activity } from 'lucide-react';
import { GlassCard } from './ui/glass-card';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

/**
 * ResearchExperiment type as defined in the platform core
 */
interface ResearchExperiment {
  domain: string;
  name: string;
  status: 'operational' | 'research' | 'validation';
  // Add comment above fix: Add 'SPECTRA' to clade union type for cross-component compatibility
  clade: 'METABOLIC' | 'TRANSDUCTIVE' | 'DEFENSIVE' | 'COGNITIVE' | 'SPECTRA';
  phi?: number;
  lambda?: number;
  gamma?: number;
  backend?: string;
}

interface ExperimentDetailsProps {
  experiment: ResearchExperiment;
  onRun: (params: { mutationRate: number; crossoverProb: number; populationSize: number }) => void;
  className?: string;
}

/**
 * ExperimentDetails Component
 * Displays experiment metadata and allows adjustment of DNA-Lang evolutionary parameters.
 */
export function ExperimentDetails({ experiment, onRun, className }: ExperimentDetailsProps) {
  // Local state for evolutionary parameters
  const [mutationRate, setMutationRate] = useState([0.05]);
  const [crossoverProb, setCrossoverProb] = useState([0.70]);
  const [populationSize, setPopulationSize] = useState([100]);

  // Triggers the orchestrator with current slider values
  const handleRun = () => {
    onRun({
      mutationRate: mutationRate[0],
      crossoverProb: crossoverProb[0],
      populationSize: populationSize[0],
    });
  };

  return (
    <GlassCard depth={2} className={className} hover={false}>
      <div className="space-y-6">
        {/* Header: Experiment Metadata */}
        <div className="flex items-start justify-between border-b border-white/5 pb-4">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2 tracking-tight">
              <div className="p-1 rounded-md bg-primary/10">
                <Info className="h-4 w-4 text-primary" />
              </div>
              {experiment.name}
            </h3>
            <div className="flex flex-col gap-1">
              <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">
                Domain: <span className="text-foreground">{experiment.domain}</span>
              </p>
              <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">
                Clade: <span className="text-foreground">{experiment.clade}</span>
              </p>
            </div>
          </div>
          <Badge 
            variant="outline" 
            className={`
              text-[10px] uppercase font-bold tracking-tighter
              ${experiment.status === 'operational' ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/5' : 
                experiment.status === 'research' ? 'border-cyan-500/30 text-cyan-400 bg-cyan-500/5' : 
                'border-amber-500/30 text-amber-400 bg-amber-500/5'}
            `}
          >
            {experiment.status}
          </Badge>
        </div>

        {/* Evolutionary Controls Section */}
        <div className="space-y-5">
          <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-2">
            <Settings className="h-3 w-3 text-secondary" /> Evolutionary Parameters
          </h4>

          <div className="space-y-6">
            {/* Mutation Rate Control */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-muted-foreground flex items-center gap-1.5 uppercase font-medium">
                  <Zap className="h-3 w-3 text-primary" /> Mutation Rate (μ)
                </span>
                <span className="font-mono text-primary font-bold">{(mutationRate[0] * 100).toFixed(1)}%</span>
              </div>
              <Slider 
                value={mutationRate} 
                onValueChange={setMutationRate} 
                min={0} 
                max={0.5} 
                step={0.01} 
              />
              <p className="text-[9px] text-muted-foreground italic">Governs structural variance probability</p>
            </div>

            {/* Crossover Probability Control */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-muted-foreground flex items-center gap-1.5 uppercase font-medium">
                  <GitBranch className="h-3 w-3 text-secondary" /> Crossover Probability (χ)
                </span>
                <span className="font-mono text-secondary font-bold">{(crossoverProb[0] * 100).toFixed(0)}%</span>
              </div>
              <Slider 
                value={crossoverProb} 
                onValueChange={setCrossoverProb} 
                min={0.1} 
                max={1.0} 
                step={0.05} 
              />
              <p className="text-[9px] text-muted-foreground italic">Recombination weight across lineages</p>
            </div>

            {/* Population Size Control */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-muted-foreground flex items-center gap-1.5 uppercase font-medium">
                  <Users className="h-3 w-3 text-accent" /> Population Size (P)
                </span>
                <span className="font-mono text-accent font-bold">{populationSize[0]}</span>
              </div>
              <Slider 
                value={populationSize} 
                onValueChange={setPopulationSize} 
                min={10} 
                max={1000} 
                step={10} 
              />
              <p className="text-[9px] text-muted-foreground italic">Concurrent active swarm density</p>
            </div>
          </div>
        </div>

        {/* Action: Run Experiment */}
        <div className="pt-4 border-t border-white/5">
          <Button 
            className="w-full bg-secondary hover:bg-secondary/90 text-white font-black shadow-lg shadow-secondary/20 h-11 transition-all active:scale-[0.98]"
            onClick={handleRun}
          >
            <Activity className="h-4 w-4 mr-2" />
            Express Genome
          </Button>
        </div>
      </div>
    </GlassCard>
  );
}
