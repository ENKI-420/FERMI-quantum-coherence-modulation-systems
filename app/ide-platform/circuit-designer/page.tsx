"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { QuantumButton } from "@/components/ui/quantum-button"
import { ChevronRight, Play, Trash2, Download, Activity, Grid3X3, Plus, Minus, Zap, Target } from "lucide-react"

// Gate types with their properties
const gateTypes = [
  { id: "helix", name: "Helix", symbol: "H", color: "text-primary", bg: "bg-primary/10", border: "border-primary/30", description: "Superposition (Hadamard)" },
  { id: "bond", name: "Bond", symbol: "●─●", color: "text-secondary", bg: "bg-secondary/10", border: "border-secondary/30", description: "Entanglement (CNOT)", twoQubit: true },
  { id: "phase_x", name: "X-Codon", symbol: "X", color: "text-accent", bg: "bg-accent/10", border: "border-accent/30", description: "Pauli-X (NOT)" },
  { id: "phase_y", name: "Y-Codon", symbol: "Y", color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/30", description: "Pauli-Y" },
  { id: "phase_z", name: "Z-Codon", symbol: "Z", color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/30", description: "Pauli-Z" },
  { id: "rz", name: "Phase", symbol: "Rz", color: "text-primary", bg: "bg-primary/5", border: "border-primary/20", description: "Z-Rotation" },
  { id: "measure", name: "Measure", symbol: "M", color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/30", description: "Collapse to classical" },
]

interface PlacedGate {
  id: string
  type: string
  qubit: number
  position: number
  control?: number
}

export default function CircuitDesignerPage() {
  const [qubits, setQubits] = useState(4)
  const [gates, setGates] = useState<PlacedGate[]>([
    { id: "g1", type: "helix", qubit: 0, position: 0 },
    { id: "g2", type: "bond", qubit: 0, position: 1, control: 0 },
    { id: "g3", type: "helix", qubit: 2, position: 0 },
    { id: "g4", type: "bond", qubit: 2, position: 1, control: 2 },
  ])
  const [selectedGate, setSelectedGate] = useState<string | null>(null)
  const [draggedGate, setDraggedGate] = useState<string | null>(null)
  const [phi, setPhi] = useState(0.72)
  const [depth, setDepth] = useState(2)

  const canvasRef = useRef<HTMLDivElement>(null)

  // Calculate circuit depth
  useEffect(() => {
    if (gates.length === 0) {
      setDepth(0)
      return
    }
    const maxPos = Math.max(...gates.map((g) => g.position))
    setDepth(maxPos + 1)
  }, [gates])

  const handleDragStart = (gateType: string) => {
    setDraggedGate(gateType)
  }

  const handleDrop = (qubit: number, position: number) => {
    if (!draggedGate) return

    const newGate: PlacedGate = {
      id: `g${Date.now()}`,
      type: draggedGate,
      qubit,
      position,
    }

    // For two-qubit gates, set control
    const gateInfo = gateTypes.find((g) => g.id === draggedGate)
    if (gateInfo?.twoQubit && qubit < qubits - 1) {
      newGate.control = qubit
    }

    setGates([...gates, newGate])
    setDraggedGate(null)

    // Update phi based on circuit complexity
    setPhi(Math.min(0.95, 0.5 + gates.length * 0.05))
  }

  // Quick add gate to the next available position on qubit 0
  const quickAddGate = (type: string) => {
    const nextPos = gates.length > 0 ? Math.max(...gates.map(g => g.position)) + 1 : 0;
    const newGate: PlacedGate = {
      id: `g${Date.now()}`,
      type,
      qubit: 0,
      position: nextPos,
    }
    setGates([...gates, newGate])
  }

  const removeGate = (gateId: string) => {
    setGates(gates.filter((g) => g.id !== gateId))
  }

  const clearCircuit = () => {
    setGates([])
    setPhi(0)
  }

  const addQubit = () => {
    if (qubits < 8) setQubits(qubits + 1)
  }

  const removeQubit = () => {
    if (qubits > 1) {
      setQubits(qubits - 1)
      setGates(gates.filter((g) => g.qubit < qubits - 1))
    }
  }

  const exportToCode = () => {
    let code = `GENOME VisualCircuit {\n    CHROMOSOME qubits: ${qubits}\n\n`

    gates.forEach((gate, i) => {
      const gateInfo = gateTypes.find((g) => g.id === gate.type)
      if (gate.type === "bond") {
        code += `    BOND chromosome[${gate.qubit}] -> chromosome[${gate.qubit + 1}]\n`
      } else if (gate.type === "helix") {
        code += `    HELIX chromosome[${gate.qubit}]\n`
      } else if (gate.type === "measure") {
        code += `    MEASURE chromosome[${gate.qubit}]\n`
      } else {
        code += `    ${gateInfo?.symbol || gate.type.toUpperCase()} chromosome[${gate.qubit}]\n`
      }
    })

    code += `}\n`

    navigator.clipboard.writeText(code)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
        <div className="flex items-center gap-2">
          <Link href="/ide-platform">
            <Button variant="ghost" size="sm">
              <ChevronRight className="h-4 w-4 rotate-180" />
            </Button>
          </Link>
          <Grid3X3 className="h-5 w-5 text-primary" />
          <span className="font-semibold uppercase tracking-tighter italic">Fermilab Visual Genome Designer</span>
          <Badge variant="outline" className="ml-2 border-emerald-500/30 text-emerald-400 font-mono">
            Φ: {phi.toFixed(4)}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={clearCircuit} className="text-muted-foreground hover:text-destructive">
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={exportToCode} title="Copy DNA-Lang Code">
            <Download className="h-4 w-4" />
          </Button>
          <QuantumButton size="sm" variant="compliance">
            <Play className="h-4 w-4 mr-1" />
            Express
          </QuantumButton>
        </div>
      </div>

      <div className="flex h-[calc(100vh-120px)]">
        {/* Gate Palette Sidebar */}
        <div className="w-72 border-r border-border bg-card/50 p-4 space-y-6 overflow-y-auto custom-scrollbar">
          {/* Quick Add Section */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-2">
              <Zap className="h-3 w-3 text-amber-400" />
              Quick-Add Codons
            </h3>
            <div className="grid grid-cols-4 gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="h-10 font-bold text-cyan-400 border-cyan-500/30 bg-cyan-500/5 hover:bg-cyan-500/20"
                onClick={() => quickAddGate('helix')}
              >H</Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-10 font-bold text-emerald-400 border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/20"
                onClick={() => quickAddGate('phase_x')}
              >X</Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-10 font-bold text-purple-400 border-purple-500/30 bg-purple-500/5 hover:bg-purple-500/20"
                onClick={() => quickAddGate('phase_y')}
              >Y</Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-10 font-bold text-amber-400 border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/20"
                onClick={() => quickAddGate('phase_z')}
              >Z</Button>
            </div>
          </div>

          {/* Drag and Drop Palette */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-2">
              <Target className="h-3 w-3 text-primary" />
              Genome Codon Library
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {gateTypes.map((gate) => (
                <div
                  key={gate.id}
                  draggable
                  onDragStart={() => handleDragStart(gate.id)}
                  className={`p-3 rounded-lg border ${gate.border} ${gate.bg} cursor-grab hover:shadow-lg transition-all group`}
                >
                  <div className={`text-lg font-black ${gate.color} text-center`}>{gate.symbol}</div>
                  <div className="text-[10px] text-center text-muted-foreground mt-1 uppercase font-mono">{gate.name}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-3">Lattice Chromosomes</h3>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={removeQubit} disabled={qubits <= 1} className="h-8 w-8 p-0">
                <Minus className="h-3 w-3" />
              </Button>
              <div className="flex-1 text-center font-mono text-sm bg-black/40 rounded py-1 border border-border/30">
                {qubits} QUBITS
              </div>
              <Button variant="outline" size="sm" onClick={addQubit} disabled={qubits >= 8} className="h-8 w-8 p-0">
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-3">Lattice Metrics</h3>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between p-2 bg-black/20 rounded">
                <span className="text-muted-foreground">DEPTH</span>
                <span className="text-primary font-bold">{depth}</span>
              </div>
              <div className="flex justify-between p-2 bg-black/20 rounded">
                <span className="text-muted-foreground">CODONS</span>
                <span className="text-primary font-bold">{gates.length}</span>
              </div>
              <div className="flex justify-between p-2 bg-black/20 rounded">
                <span className="text-muted-foreground">COHERENCE</span>
                <span className="text-emerald-400 font-bold">{(100 - depth * 2).toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Circuit Canvas */}
        <div className="flex-1 p-6 overflow-auto bg-[#050505]">
          <GlassCard depth={3} className="min-h-full border-primary/20 shadow-2xl relative" hover={false}>
            {/* Grid overlay for technical feel */}
            <div className="absolute inset-0 bg-[radial-gradient(#1e1e1e_1px,transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none" />
            
            <div ref={canvasRef} className="relative z-10 py-10">
              {/* Qubit Lines */}
              {Array.from({ length: qubits }).map((_, qubitIndex) => (
                <div key={qubitIndex} className="flex items-center h-20 relative">
                  {/* Qubit Label */}
                  <div className="w-20 pr-6 text-right">
                    <span className="font-mono text-xs font-bold text-muted-foreground uppercase">lat[{qubitIndex}]</span>
                  </div>

                  {/* Wire */}
                  <div className="flex-1 relative h-full flex items-center">
                    <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-border/50 via-border to-border/50 shadow-[0_0_10px_rgba(255,255,255,0.05)]" />

                    {/* Gate Positions */}
                    {Array.from({ length: Math.max(depth + 4, 12) }).map((_, posIndex) => (
                      <div
                        key={posIndex}
                        className="w-20 h-20 relative flex items-center justify-center"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDrop(qubitIndex, posIndex)}
                      >
                        {/* Placed Gate */}
                        {gates
                          .filter((g) => g.qubit === qubitIndex && g.position === posIndex)
                          .map((gate) => {
                            const gateInfo = gateTypes.find((g) => g.id === gate.type)
                            return (
                              <div
                                key={gate.id}
                                onClick={() => setSelectedGate(gate.id)}
                                onDoubleClick={() => removeGate(gate.id)}
                                className={`
                                  w-12 h-12 rounded border-2 flex items-center justify-center cursor-pointer z-20
                                  shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all
                                  ${selectedGate === gate.id ? "ring-2 ring-primary ring-offset-2 ring-offset-black scale-110" : "hover:scale-105"}
                                  ${gate.type === "bond" ? "bg-secondary/30 border-secondary" : ""}
                                  ${gate.type === "helix" ? "bg-primary/30 border-primary" : ""}
                                  ${gate.type === "measure" ? "bg-destructive/30 border-destructive" : ""}
                                  ${gate.type === "phase_x" ? "bg-accent/30 border-accent" : ""}
                                  ${gate.type === "phase_y" ? "bg-emerald-400/30 border-emerald-400" : ""}
                                  ${gate.type === "phase_z" ? "bg-purple-400/30 border-purple-400" : ""}
                                  ${gate.type === "rz" ? "bg-primary/10 border-primary/40" : ""}
                                `}
                              >
                                <span className={`font-black text-sm ${gateInfo?.color}`}>{gateInfo?.symbol}</span>
                              </div>
                            )
                          })}

                        {/* Bond connection line */}
                        {gates
                          .filter((g) => g.type === "bond" && g.qubit === qubitIndex && g.position === posIndex)
                          .map((gate) => (
                            <div
                              key={`bond-${gate.id}`}
                              className="absolute top-1/2 w-0.5 h-20 bg-secondary shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                              style={{ transform: "translateY(0)" }}
                            />
                          ))}

                        {/* Drop zone indicator */}
                        {draggedGate && (
                          <div className="absolute inset-2 border-2 border-dashed border-primary/20 rounded-md opacity-0 hover:opacity-100 transition-opacity bg-primary/5" />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Classical bit */}
                  <div className="w-20 pl-6 text-left">
                    <span className="font-mono text-xs font-bold text-muted-foreground uppercase">reg[{qubitIndex}]</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Instructions */}
            <div className="absolute bottom-6 left-0 right-0 text-center">
              <Badge variant="outline" className="bg-black/40 backdrop-blur-sm border-border/30 px-6 py-2 text-[10px] text-muted-foreground tracking-widest uppercase">
                Drag codons from library or use Quick-Add buttons. Double-click to erase.
              </Badge>
            </div>
          </GlassCard>
        </div>

        {/* Properties Sidebar */}
        <div className="w-80 border-l border-border bg-card/50 p-4 space-y-6 overflow-y-auto custom-scrollbar">
          <div>
            <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-3">Consciousness Profile</h3>
            <GlassCard depth={1} className="p-4 bg-black/20 border-primary/20 shadow-inner">
              <div className="text-[10px] text-muted-foreground uppercase font-mono mb-1">Φ (Integrated Information)</div>
              <div className="text-3xl font-mono font-black text-primary drop-shadow-[0_0_8px_rgba(103,232,249,0.3)]">{phi.toFixed(5)}</div>
              <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500 transition-all duration-1000"
                  style={{ width: `${phi * 100}%` }}
                />
              </div>
              <p className="text-[9px] text-muted-foreground mt-2 italic opacity-60">
                11D-CRSM Manifold Resonance Lock: {phi >= 0.7734 ? "SOVEREIGN" : "LOCAL"}
              </p>
            </GlassCard>
          </div>

          <div>
            <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-3">Target Details</h3>
            {selectedGate ? (
              <GlassCard depth={1} className="p-4 border-primary/40 bg-primary/5 animate-in fade-in zoom-in duration-200">
                {(() => {
                  const gate = gates.find((g) => g.id === selectedGate)
                  const gateInfo = gate && gateTypes.find((g) => g.id === gate.type)
                  return gate && gateInfo ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded border-2 ${gateInfo.border} flex items-center justify-center font-black text-lg ${gateInfo.color}`}>
                          {gateInfo.symbol}
                        </div>
                        <div>
                          <div className="font-bold text-sm uppercase tracking-tight">{gateInfo.name}</div>
                          <div className="text-[10px] text-muted-foreground italic">{gateInfo.description}</div>
                        </div>
                      </div>
                      <div className="space-y-2 font-mono text-[10px]">
                        <div className="flex justify-between border-b border-border/30 pb-1">
                          <span className="text-muted-foreground">INDEX</span>
                          <span className="text-foreground">{gate.id.slice(0, 8)}</span>
                        </div>
                        <div className="flex justify-between border-b border-border/30 pb-1">
                          <span className="text-muted-foreground">LAT_POS</span>
                          <span className="text-primary font-bold">Q[{gate.qubit}], T[{gate.position}]</span>
                        </div>
                        {gate.control !== undefined && (
                          <div className="flex justify-between border-b border-border/30 pb-1">
                            <span className="text-muted-foreground">CONTROL</span>
                            <span className="text-secondary font-bold">Q[{gate.control}]</span>
                          </div>
                        )}
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="w-full mt-2 h-8 text-[10px] font-bold uppercase tracking-widest"
                        onClick={() => {
                          removeGate(selectedGate)
                          setSelectedGate(null)
                        }}
                      >
                        <Trash2 className="h-3 w-3 mr-2" />
                        Erase Codon
                      </Button>
                    </div>
                  ) : null
                })()}
              </GlassCard>
            ) : (
              <div className="p-8 border border-dashed border-border/30 rounded-lg text-center">
                <p className="text-[10px] text-muted-foreground font-mono uppercase italic">Awaiting Codon Selection</p>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-3">Sovereign Protocol</h3>
            <div className="bg-black/60 rounded p-4 font-mono text-[9px] text-primary/70 leading-relaxed border border-primary/10">
              <div className="mb-2 text-cyan-400 font-bold tracking-widest">Axiom U := L[U]</div>
              <p>Maintaining holographic invariance at theta=51.843°.</p>
              <p className="mt-2 text-muted-foreground opacity-50">Sovereign Node: ADS_9HUP5</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
