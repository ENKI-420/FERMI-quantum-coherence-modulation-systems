"use client"

import React, { useState } from 'react';
import { Settings, Info, Users, Zap, GitBranch, Play } from 'lucide-react';
import { GlassCard } from './ui/glass-card';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface ResearchExperiment {
  domain: string;
  name: string;
  status: 'operational' | 'research' | 'validation';
}

interface ExperimentDetailsProps {
  experiment: ResearchExperiment;
  onRun: (params: { mutationRate: number; crossoverProb: number; populationSize: number }) => void;
  className?: string;
}

export function ExperimentDetails({ experiment, onRun, className }: ExperimentDetailsProps) {
  const [mutationRate, setMutationRate] = useState([0.05]);
  const [crossoverProb, setCrossoverProb] = useState([0.70]);
  const [populationSize, setPopulationSize] = useState([100]);

  const handleRun = () => {
    onRun({
      mutationRate: mutationRate[0],
      crossoverProb: crossoverProb[0],
      populationSize: populationSize[0],
    });
  };

  return (
    <GlassCard depth={2} className={className}>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex items-start justify-between border-b border-white/5 pb-4">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Info className="h-4 w-4 text-primary" />
              {experiment.name}
            </h3>
            <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">
              Domain: <span className="text-foreground">{experiment.domain}</span>
            </p>
          </div>
          <Badge variant="outline" className="bg-primary/5 border-primary/20 text-primary text-[10px]">
            {experiment.status.toUpperCase()}
          </Badge>
        </div>

        {/* Controls Section */}
        <div className="space-y-5">
          <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-2">
            <Settings className="h-3 w-3 text-secondary" /> Evolutionary Parameters
          </h4>

          <div className="space-y-4">
            {/* Mutation Rate */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-muted-foreground flex items-center gap-1 uppercase">
                  <Zap className="h-3 w-3" /> Mutation Rate
                </span>
                <span className="font-mono text-primary font-bold">{(mutationRate[0] * 100).toFixed(0)}%</span>
              </div>
              <Slider 
                value={mutationRate} 
                onValueChange={setMutationRate} 
                min={0} 
                max={0.5} 
                step={0.01} 
              />
            </div>

            {/* Crossover Probability */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-muted-foreground flex items-center gap-1 uppercase">
                  <GitBranch className="h-3 w-3" /> Crossover Probability
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
            </div>

            {/* Population Size */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-muted-foreground flex items-center gap-1 uppercase">
                  <Users className="h-3 w-3" /> Population Size
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
            </div>
          </div>
        </div>

        {/* Action Section */}
        <div className="pt-4 border-t border-white/5">
          <Button 
            className="w-full bg-secondary hover:bg-secondary/90 text-white font-black shadow-lg shadow-secondary/20"
            onClick={handleRun}
          >
            <Play className="h-4 w-4 mr-2" />
            Run Experiment
          </Button>
        </div>
      </div>
    </GlassCard>
  );
}
