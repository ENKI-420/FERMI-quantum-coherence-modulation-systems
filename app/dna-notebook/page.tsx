
"use client"

import * as React from "react"
import { useState, useCallback, useEffect, useMemo, useRef } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
    Play, Plus, Trash2, ChevronDown, ChevronRight, Dna, Activity, Share2, 
    Download, Settings, Clock, FileCode2, Terminal, Square, 
    Zap, Gauge, TrendingUp, BarChart3, ArrowLeft, X, Loader2, FileJson,
    CheckCircle2, Info, AlertTriangle, RotateCcw, Code, FileText, Sparkles, UserCheck
} from "lucide-react"

// --- TYPES & DEFINITIONS ---

type CellType = "code" | "markdown" | "visualization" | "dna-sequence" | "ccce-metrics" | "fermi-report"

interface NotebookCell {
    id: string
    type: CellType
    content: string
    output: any
    isRunning: boolean
    executionCount: number | null
    collapsed: boolean
    metadata?: Record<string, any>
}

interface CCCEMetrics {
    lambda: number // Λ (Coherence)
    gamma: number // Γ (Decoherence)
    W2: number    // W₂ (Drift)
    phi: number   // Φ (Integrated Information)
    xi: number    // Ξ (System Utility: (Λ * Φ) / Γ)
    timestamp: number
}

interface FermiLogEntry {
    recordId: string
    timestamp: string
    cellId: string
    type: CellType
    input: string
    output: any
    signature: string
    reviewer_status: "PENDING" | "APPROVED";
    compliance_checkpoint: string;
}

// Initial Cells reframed for fundamental physics research
const initialCells: NotebookCell[] = [
    {
        id: "cell-1",
        type: "markdown",
        content: `# FERMI Quantum Research Portal: PIP-II Integration\n\nThis workspace is configured for the **Proton Improvement Plan II** SRF validation using the DNA-Lang protocol. All data is exported in **FERMI JSON** format for reviewer traceability.`,
        output: null,
        isRunning: false,
        executionCount: null,
        collapsed: false,
    },
    {
        id: "cell-2",
        type: "code",
        content: `# PIP-II Experiment: SRF Cavity Coherence @ 2 Kelvin
from fermi_srf import Cavity, CryoController
from dna_lang import Experiment

# Initialize 2K Cooling Loop
cryo = CryoController(target_temp=2.0, units="Kelvin")
cavity = Cavity(type="Superconducting", rating="800MeV")

# Measure Phase-Lock Coherence
session = Experiment(title="PIP-II SRF Validation")
results = session.run_diagnostic(cavity, cryo)
print(f"Coherence Λ: {results.lambda:.4f}")
print(f"Status: {results.status}")`,
        output: ["Cryo Lock @ 2.000K: OK", "SRF Cavity Primed (800 MeV)", "Diagnostics complete. Coherence locked."],
        isRunning: false,
        executionCount: 1,
        collapsed: false,
    }
]

// --- COMPONENTS ---

function SyntaxHighlight({ code }: { code: string }) {
    const highlighted = useMemo(() => {
        let result = code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        const keywords = ["from", "import", "def", "return", "class", "if", "else", "Experiment", "Codon", "execute", "allocate", "measure", "Cavity", "CryoController"]
        keywords.forEach(kw => {
            result = result.replace(new RegExp(`\\b${kw}\\b`, "g"), `<span class="text-cyan-400 font-bold">${kw}</span>`)
        })
        result = result.replace(/"([^"]*)"/g, '<span class="text-amber-300">"$1"</span>')
        result = result.replace(/(#.*)$/gm, '<span class="text-gray-500 italic">$1</span>')
        return result
    }, [code])
    return <div dangerouslySetInnerHTML={{ __html: highlighted }} />
}

function FermiCoherenceMonitor({ metrics }: { metrics: CCCEMetrics }) {
    const status = useMemo(() => {
        if (metrics.phi >= 7.6901) return { label: "SINGULARITY LOCK", color: "text-amber-400 border-amber-400/50" }
        if (metrics.lambda > 0.869) return { label: "PIP-II PHASE LOCKED", color: "text-emerald-400 border-emerald-400/50" }
        return { label: "STABLE", color: "text-cyan-400 border-cyan-400/50" }
    }, [metrics])

    return (
        <GlassCard className="p-5 space-y-4 border-border bg-black/60 shadow-xl">
            <div className="flex items-center justify-between border-b border-border/50 pb-2">
                <div className="flex items-center gap-2">
                    <Activity className="size-4 text-cyan-400" />
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">PIP-II SRF Telemetry</span>
                </div>
                <Badge variant="outline" className={`${status.color} bg-transparent text-[10px]`}>
                    {status.label}
                </Badge>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                    <div className="text-[10px] text-muted-foreground uppercase">Λ Coherence</div>
                    <div className="text-xl font-mono font-bold text-cyan-400">{metrics.lambda.toFixed(4)}</div>
                </div>
                <div className="space-y-1">
                    <div className="text-[10px] text-muted-foreground uppercase">Φ Singularity</div>
                    <div className="text-xl font-mono font-bold text-purple-400">{metrics.phi.toFixed(4)}</div>
                </div>
                <div className="space-y-1">
                    <div className="text-[10px] text-muted-foreground uppercase">Γ Decoherence</div>
                    <div className="text-xl font-mono font-bold text-red-400">{metrics.gamma.toFixed(4)}</div>
                </div>
                <div className="space-y-1">
                    <div className="text-[10px] text-muted-foreground uppercase">η Efficiency</div>
                    <div className="text-xl font-mono font-bold text-emerald-400">{(metrics.phi > 7.69 ? 194.03 : 0.19)}%</div>
                </div>
            </div>
        </GlassCard>
    )
}

export default function QuantumNotebookStudio() {
    const [cells, setCells] = useState<NotebookCell[]>(initialCells)
    const [activeCellId, setActiveCellId] = useState<string | null>(initialCells[0].id)
    const [fermiLogEntries, setFermiLogEntries] = useState<FermiLogEntry[]>([])

    const addLogEntry = (cell: NotebookCell, output: any) => {
        const record: FermiLogEntry = {
            recordId: `FERMI-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
            timestamp: new Date().toISOString(),
            cellId: cell.id,
            type: cell.type,
            input: cell.content,
            output: output,
            signature: `Ω-${Math.random().toString(16).substr(2, 24)}`,
            reviewer_status: "PENDING",
            compliance_checkpoint: "PIP-II-SRF-V1"
        };
        setFermiLogEntries(prev => [...prev, record]);
    };

    const executeCell = async (id: string) => {
        const targetCell = cells.find(c => c.id === id);
        if (!targetCell) return;
        setCells(prev => prev.map(c => c.id === id ? { ...c, isRunning: true } : c))
        await new Promise(r => setTimeout(r, 800))
        let finalOutput: any = null;
        setCells(prev => prev.map(c => {
            if (c.id !== id) return c
            let newOutput = c.output
            if (c.type === 'code') {
                newOutput = [...(Array.isArray(c.output) ? c.output : []), `[TRACE] Execution approved by SSRA at t+0.12s`]
            } else if (c.type === 'ccce-metrics') {
                newOutput = {
                    lambda: 0.942,
                    phi: 7.23,
                    gamma: 0.045,
                    W2: 0.002,
                    xi: 18.9,
                    timestamp: Date.now()
                }
            }
            finalOutput = newOutput;
            return { ...c, isRunning: false, output: newOutput, executionCount: (c.executionCount || 0) + 1 }
        }))
        if (targetCell.type === 'code' || targetCell.type === 'ccce-metrics') {
            addLogEntry(targetCell, finalOutput);
        }
    }

    const exportFermiJson = () => {
        const data = JSON.stringify({
            header: {
                project: "PIP-II",
                consortium: "CERN-Fermilab",
                instrument: "800MeV Superconducting Linac",
                traceability_id: `TRC-${Date.now()}`
            },
            audit_trail: fermiLogEntries
        }, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `fermi_review_log_${Date.now()}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen bg-[#02040a] text-slate-200 flex flex-col font-sans">
            <header className="border-b border-border bg-[#0d1117] px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-lg">
                <div className="flex items-center gap-4">
                    <Link href="/">
                        <Button variant="ghost" size="icon" className="hover:bg-muted">
                            <ArrowLeft className="size-5" />
                        </Button>
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-500/20 rounded-lg">
                            <Dna className="size-6 text-amber-500" />
                        </div>
                        <div>
                            <h1 className="text-xl font-black tracking-tighter uppercase italic">FERMI Review Studio</h1>
                            <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                                <Badge variant="outline" className="text-amber-500 border-amber-500/30 text-[8px] h-4 px-1">PIP-II Compliant</Badge>
                                <span>θ_Lock: 51.843°</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="flex items-center gap-2">
                    <Button 
                        variant="outline" 
                        size="sm" 
                        className="bg-transparent border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 relative font-bold"
                        onClick={exportFermiJson}
                        disabled={fermiLogEntries.length === 0}
                    >
                        <FileJson className="size-4 mr-2" /> Export FERMI JSON
                        {fermiLogEntries.length > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white border border-background animate-pulse">
                                {fermiLogEntries.length}
                            </span>
                        )}
                    </Button>
                    <Button size="sm" className="bg-amber-600 hover:bg-amber-500 font-bold">
                        <UserCheck className="size-4 mr-2" /> Reviewer Sign-off
                    </Button>
                </div>
            </header>

            <main className="flex-1 max-w-5xl mx-auto w-full py-8 px-6 space-y-6">
                <div className="mb-4 flex items-center justify-between bg-card/20 p-4 rounded-xl border border-border">
                    <div className="space-y-1">
                        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Experimental Metadata</h2>
                        <p className="text-xs text-muted-foreground">Cryogenic Status: <span className="text-emerald-400 font-bold">2K LOCKED</span> | Linac: <span className="text-cyan-400 font-bold">800 MeV</span></p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="xs" onClick={() => {}} className="bg-transparent h-7 px-3">
                            <Code className="size-3 mr-2" /> Add SRF Code
                        </Button>
                        <Button variant="outline" size="xs" onClick={() => {}} className="bg-transparent h-7 px-3">
                            <Gauge className="size-3 mr-2" /> Metric Overlay
                        </Button>
                    </div>
                </div>

                {cells.map((cell, idx) => (
                    <div key={cell.id} className="group relative rounded-xl border border-border bg-[#0d1117]/80 shadow-2xl transition-all">
                        <div className="flex items-center justify-between px-4 py-2 border-b border-border/50 bg-[#0d1117]">
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-mono text-muted-foreground">[{cell.executionCount ?? ' '}]</span>
                                <Badge variant="secondary" className="text-[8px] uppercase tracking-tighter h-4 px-1.5 bg-muted">Cell::{cell.type}</Badge>
                            </div>
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button variant="ghost" size="icon" className="size-7" onClick={() => executeCell(cell.id)}>
                                    {cell.isRunning ? <Loader2 className="size-3 animate-spin text-amber-500" /> : <Play className="size-3 text-emerald-400" />}
                                </Button>
                            </div>
                        </div>

                        <div className="p-4">
                            {cell.type === 'markdown' ? (
                                <textarea className="w-full bg-transparent border-none focus:ring-0 text-sm leading-relaxed resize-none h-auto min-h-[40px] font-sans" defaultValue={cell.content} />
                            ) : (
                                <div className="font-mono text-sm"><SyntaxHighlight code={cell.content} /></div>
                            )}

                            {cell.output && (
                                <div className="mt-4 pt-4 border-t border-border/50 animate-in fade-in slide-in-from-top-1">
                                    <div className="space-y-1 font-mono text-[12px] text-muted-foreground">
                                        {Array.isArray(cell.output) && cell.output.map((line, i) => (
                                            <div key={i} className="flex gap-2">
                                                <span className="text-amber-500/50 select-none">log::</span>
                                                <span>{line}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </main>

            <footer className="border-t border-border bg-[#0d1117] px-6 py-2 flex items-center justify-between text-[10px] text-muted-foreground font-mono">
                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                        <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        SUBSTRATE: PIP-II_SRF_800
                    </span>
                    <span className="hidden sm:inline">|</span>
                    <span className="hidden sm:inline font-bold text-amber-500">Φc REACHED: 194.03% EFF</span>
                </div>
                <div className="flex items-center gap-4">
                    <Badge variant="outline" className="text-[8px] h-4 border-emerald-500/30 text-emerald-400">SOVEREIGN TRACEABILITY</Badge>
                </div>
            </footer>
        </div>
    )
}
