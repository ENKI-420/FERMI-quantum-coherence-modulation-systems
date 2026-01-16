"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Dna,
  Code2,
  Puzzle,
  Layers,
  ArrowRight,
  Activity,
  Terminal,
  Workflow,
  FolderTree,
  Bug,
  Palette,
  Boxes,
  Sparkles,
  BookOpen,
  MessageSquare,
  ChevronRight,
  Shield,
  BarChart3,
  GitBranch,
  Check,
  Play,
  Zap,
  Brain,
  Server,
  Database,
  Globe,
  Lock,
} from "lucide-react"

const platformFeatures = [
  {
    icon: Code2,
    title: "Genome Editor",
    description:
      "Advanced code editor with DNA-Lang syntax highlighting, intelligent autocomplete, and real-time validation.",
    href: "/ide-platform/editor",
    category: "Core IDE",
    badge: null,
  },
  {
    icon: Workflow,
    title: "Circuit Designer",
    description: "Visual drag-and-drop genome circuit builder with quantum gate placement and DNA-Lang export.",
    href: "/ide-platform/circuit-designer",
    category: "Visual Tools",
    badge: null,
  },
  {
    icon: Bug,
    title: "Quantum Debugger",
    description:
      "Step-through debugging with quantum state visualization, entanglement maps, and breakpoint management.",
    href: "/ide-platform/debugger",
    category: "Core IDE",
    badge: null,
  },
  {
    icon: Brain,
    title: "Genomic Twin",
    description: "AI-powered genomic analysis with RAG pipelines, real-time inference, and clinical JSON outputs.",
    href: "/genomic-twin",
    category: "AI Tools",
    badge: "New",
  },
  {
    icon: Terminal,
    title: "Quantum Terminal",
    description: "Interactive command-line for executing organisms, running evolution cycles, and monitoring metrics.",
    href: "/ide-platform/terminal",
    category: "Core IDE",
    badge: null,
  },
  {
    icon: FolderTree,
    title: "Project Manager",
    description: "Organize organisms with templates, version control integration, and collaborative workspaces.",
    href: "/ide-platform/projects",
    category: "Management",
    badge: null,
  },
  {
    icon: Puzzle,
    title: "Extension Marketplace",
    description: "Browse, install, and manage extensions, themes, and plugins from the community.",
    href: "/ide-platform/marketplace",
    category: "Ecosystem",
    badge: null,
  },
  {
    icon: Palette,
    title: "IDE Builder",
    description: "Customize your workspace with drag-and-drop panel arrangement, themes, and keybindings.",
    href: "/ide-platform/builder",
    category: "Customization",
    badge: null,
  },
  {
    icon: Boxes,
    title: "Template Gallery",
    description: "Start projects faster with pre-built templates for common patterns and use cases.",
    href: "/ide-platform/templates",
    category: "Ecosystem",
    badge: null,
  },
  {
    icon: MessageSquare,
    title: "AI Assistant",
    description: "Quantum-enhanced AI for code generation, debugging help, and documentation queries.",
    href: "/ai-assistant",
    category: "AI Tools",
    badge: null,
  },
  {
    icon: BookOpen,
    title: "Documentation",
    description: "Comprehensive guides, API reference, tutorials, and best practices for DNA-Lang development.",
    href: "/ide-platform/docs",
    category: "Resources",
    badge: null,
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Monitor organism performance, resource usage, and quantum coherence metrics.",
    href: "/analytics",
    category: "Observability",
    badge: null,
  },
]

const industryComparison = [
  { feature: "Visual Circuit Designer", dnaLang: true, vscode: false, jetbrains: false, eclipse: false },
  { feature: "Quantum Debugging", dnaLang: true, vscode: false, jetbrains: false, eclipse: false },
  { feature: "Self-Healing Code", dnaLang: true, vscode: false, jetbrains: false, eclipse: false },
  { feature: "Built-in AI Assistant", dnaLang: true, vscode: true, jetbrains: true, eclipse: false },
  { feature: "Extension Marketplace", dnaLang: true, vscode: true, jetbrains: true, eclipse: true },
  { feature: "Custom IDE Builder", dnaLang: true, vscode: false, jetbrains: false, eclipse: true },
  { feature: "Real-time Collaboration", dnaLang: true, vscode: true, jetbrains: true, eclipse: false },
  { feature: "Biological Computing", dnaLang: true, vscode: false, jetbrains: false, eclipse: false },
]

const userJourneySteps = [
  {
    step: 1,
    title: "Choose Your Foundation",
    description: "Select from 42+ pre-built templates or start with a blank canvas",
    icon: Boxes,
    color: "bg-primary",
  },
  {
    step: 2,
    title: "Customize Everything",
    description: "Arrange panels, configure themes, add extensions, set keybindings",
    icon: Palette,
    color: "bg-secondary",
  },
  {
    step: 3,
    title: "Build & Debug",
    description: "Write DNA-Lang code with AI assistance and quantum debugging",
    icon: Code2,
    color: "bg-accent",
  },
  {
    step: 4,
    title: "Evolve & Scale",
    description: "Let your organisms evolve, optimize performance, deploy anywhere",
    icon: Sparkles,
    color: "bg-chart-4",
  },
]

const stats = [
  { value: "35+", label: "Platform Features", icon: Layers },
  { value: "156", label: "Extensions Available", icon: Puzzle },
  { value: "42", label: "Starter Templates", icon: Boxes },
  { value: "99.9%", label: "Uptime SLA", icon: Shield },
]

const apiEndpoints = [
  { endpoint: "/api/generate", description: "Single-turn generation", icon: Zap },
  { endpoint: "/api/chat", description: "Multi-agent conversations", icon: MessageSquare },
  { endpoint: "/api/embed", description: "Vector embeddings", icon: Database },
  { endpoint: "/api/show", description: "Model metadata", icon: Server },
]

const categories = [
  "All",
  "Core IDE",
  "Visual Tools",
  "AI Tools",
  "Ecosystem",
  "Management",
  "Customization",
  "Resources",
  "Observability",
]

export default function Page() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredFeatures =
    activeCategory === "All" ? platformFeatures : platformFeatures.filter((f) => f.category === activeCategory)

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Enhanced with better visual hierarchy */}
      <section className="relative py-12 sm:py-20 lg:py-28 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

        <div className="max-w-[1200px] mx-auto relative">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-1.5">
              <Dna className="h-3.5 w-3.5 mr-2" />
              The Complete IDE Development Platform
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
              <span className="text-foreground">Build the IDE</span>
              <br />
              <span className="dnalang-gradient">You&apos;ve Always Wanted</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
              A revolutionary platform for creating, customizing, and extending integrated development environments
              using <strong className="text-foreground">biological computing paradigms</strong>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/ide-platform">
                <Button size="lg" className="w-full sm:w-auto text-base h-12 px-8 gap-2">
                  <Play className="h-4 w-4" />
                  Launch IDE Platform
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/capabilities">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto text-base h-12 px-8 gap-2 bg-transparent"
                >
                  <Layers className="h-4 w-4" />
                  Explore Capabilities
                </Button>
              </Link>
            </div>
          </div>

          {/* Live IDE Preview - Enhanced with smoother animations */}
          <div className="mt-12 sm:mt-16 relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-2xl blur-xl opacity-50" />
            <Card className="relative bg-card/80 backdrop-blur border-border/50 overflow-hidden shadow-2xl">
              {/* Window chrome */}
              <div className="flex items-center gap-3 px-4 py-3 bg-muted/50 border-b border-border">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-accent/60" />
                  <div className="w-3 h-3 rounded-full bg-secondary/60" />
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <span className="text-xs text-muted-foreground font-mono px-3 py-1 bg-muted rounded-md">
                    quantum_processor.dna — DNA-Lang IDE
                  </span>
                </div>
                <Badge variant="outline" className="text-[10px]">
                  <Activity className="h-2.5 w-2.5 mr-1 text-secondary animate-pulse" />
                  LIVE
                </Badge>
              </div>

              {/* IDE content grid */}
              <div className="grid grid-cols-12 min-h-[300px] sm:min-h-[400px]">
                {/* File explorer */}
                <div className="col-span-3 border-r border-border p-3 hidden sm:block">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2 font-medium">
                    Explorer
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2 p-1.5 rounded bg-primary/10 text-primary">
                      <Code2 className="h-3 w-3" />
                      quantum_processor.dna
                    </div>
                    <div className="flex items-center gap-2 p-1.5 rounded text-muted-foreground hover:bg-muted transition-colors cursor-pointer">
                      <FolderTree className="h-3 w-3" />
                      organisms/
                    </div>
                    <div className="flex items-center gap-2 p-1.5 rounded text-muted-foreground hover:bg-muted transition-colors cursor-pointer">
                      <Workflow className="h-3 w-3" />
                      circuits/
                    </div>
                  </div>
                </div>

                {/* Code editor */}
                <div className="col-span-12 sm:col-span-6 p-4 font-mono text-xs sm:text-sm">
                  <div className="space-y-1 leading-relaxed">
                    <div>
                      <span className="text-chart-4">organism</span>{" "}
                      <span className="text-primary">QuantumProcessor</span> {"{"}
                    </div>
                    <div className="pl-4">
                      <span className="text-chart-4">genome</span> {"{"}
                    </div>
                    <div className="pl-8">
                      <span className="text-secondary">helix</span> coherence_core{" "}
                      <span className="text-muted-foreground">// Φ = 0.618</span>
                    </div>
                    <div className="pl-8">
                      <span className="text-secondary">codon</span> entangle(a, b){" "}
                      <span className="text-accent">@quantum</span>
                    </div>
                    <div className="pl-8">
                      <span className="text-secondary">bond</span> superposition{" "}
                      <span className="text-accent">@evolve</span>
                    </div>
                    <div className="pl-4">{"}"}</div>
                    <div className="pl-4">
                      <span className="text-chart-4">metabolism</span> {"{"}
                    </div>
                    <div className="pl-8">
                      <span className="text-muted-foreground">// Self-healing logic</span>
                    </div>
                    <div className="pl-8">
                      <span className="text-secondary">repair</span> on_decoherence
                    </div>
                    <div className="pl-4">{"}"}</div>
                    <div>{"}"}</div>
                  </div>
                </div>

                {/* Right panel - Quantum state */}
                <div className="col-span-3 border-l border-border p-3 hidden sm:block">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2 font-medium">
                    Quantum State
                  </div>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px]">
                        <span className="text-muted-foreground">Coherence</span>
                        <span className="text-secondary font-medium">94.2%</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full w-[94%] bg-secondary rounded-full transition-all duration-1000" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px]">
                        <span className="text-muted-foreground">Φ Value</span>
                        <span className="text-primary font-medium">0.618</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full w-[62%] bg-primary rounded-full transition-all duration-1000" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px]">
                        <span className="text-muted-foreground">Evolution</span>
                        <span className="text-accent font-medium">Gen 847</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Bar - Enhanced with better spacing */}
      <section className="border-y border-border bg-muted/30">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-border">
            {stats.map((stat) => (
              <div key={stat.label} className="py-6 sm:py-8 px-4 text-center group">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <stat.icon className="h-4 w-4 text-primary opacity-60 group-hover:opacity-100 transition-opacity" />
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold">{stat.value}</div>
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4 sm:px-6 border-b border-border">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-8">
            <Badge variant="outline" className="mb-4">
              <Server className="h-3 w-3 mr-1" />
              Model-Serving API
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Genomic Twin Integration</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Enterprise-grade LLM backbone for genomic analysis, clinical outputs, and RAG pipelines.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {apiEndpoints.map((api) => (
              <Card key={api.endpoint} className="p-4 hover:border-primary/50 transition-colors group">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <api.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <code className="text-xs font-mono text-primary">{api.endpoint}</code>
                    <p className="text-sm text-muted-foreground mt-1">{api.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-secondary" />
              <span>SHA-256 verified blobs</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-secondary" />
              <span>Edge deployment ready</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-secondary" />
              <span>HIPAA compliant</span>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features Grid - Enhanced with better visual feedback */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <Badge variant="outline" className="mb-4">
              <Sparkles className="h-3 w-3 mr-1" />
              Platform Capabilities
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Everything You Need to Build IDEs</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A comprehensive suite of tools designed for creating, customizing, and extending development environments.
            </p>
          </div>

          {/* Category filter */}
          <div className="flex gap-2 overflow-x-auto scrollbar-none pb-4 mb-6 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Features grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFeatures.map((feature, i) => (
              <Link key={feature.href} href={feature.href}>
                <Card
                  className={`h-full p-5 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all group ${mounted ? "animate-fade-in" : ""}`}
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-primary/10 text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold group-hover:text-primary transition-colors">{feature.title}</h3>
                        {feature.badge && (
                          <Badge className="text-[10px] px-1.5 py-0 bg-secondary text-secondary-foreground">
                            {feature.badge}
                          </Badge>
                        )}
                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0 ml-auto">
                          {feature.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{feature.description}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/capabilities">
              <Button variant="outline" size="lg" className="gap-2 bg-transparent">
                View All Capabilities
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* User Journey Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-muted/30 border-y border-border">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <Badge variant="outline" className="mb-4">
              <GitBranch className="h-3 w-3 mr-1" />
              User Journey
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">From Template to Production</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A seamless workflow designed to get you from idea to deployed IDE in minutes.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {userJourneySteps.map((step, i) => (
              <div key={step.step} className="relative">
                {i < userJourneySteps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[calc(50%+40px)] w-[calc(100%-80px)] h-0.5 bg-border" />
                )}
                <Card className="p-6 text-center h-full relative hover:shadow-lg transition-shadow">
                  <div
                    className={`w-10 h-10 rounded-full ${step.color} text-white flex items-center justify-center font-bold text-lg mx-auto mb-4 shadow-lg`}
                  >
                    {step.step}
                  </div>
                  <step.icon className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Comparison */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4">
              <BarChart3 className="h-3 w-3 mr-1" />
              Industry Comparison
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">How We Compare</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See how DNA-Lang IDE Platform stacks up against traditional development environments.
            </p>
          </div>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left p-4 font-semibold">Feature</th>
                    <th className="text-center p-4 font-semibold">
                      <div className="flex items-center justify-center gap-2">
                        <Dna className="h-4 w-4 text-primary" />
                        DNA-Lang
                      </div>
                    </th>
                    <th className="text-center p-4 font-semibold text-muted-foreground">VS Code</th>
                    <th className="text-center p-4 font-semibold text-muted-foreground">JetBrains</th>
                    <th className="text-center p-4 font-semibold text-muted-foreground">Eclipse</th>
                  </tr>
                </thead>
                <tbody>
                  {industryComparison.map((row, i) => (
                    <tr key={row.feature} className={i % 2 === 0 ? "bg-muted/20" : ""}>
                      <td className="p-4 font-medium">{row.feature}</td>
                      <td className="text-center p-4">
                        {row.dnaLang ? (
                          <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-secondary/20">
                            <Check className="h-4 w-4 text-secondary" />
                          </div>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="text-center p-4">
                        {row.vscode ? (
                          <Check className="h-4 w-4 text-muted-foreground mx-auto" />
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="text-center p-4">
                        {row.jetbrains ? (
                          <Check className="h-4 w-4 text-muted-foreground mx-auto" />
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="text-center p-4">
                        {row.eclipse ? (
                          <Check className="h-4 w-4 text-muted-foreground mx-auto" />
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Ready to Build Your IDE?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of developers creating next-generation development environments with biological computing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/ide-platform">
              <Button size="lg" className="w-full sm:w-auto text-base h-12 px-8 gap-2">
                <Play className="h-4 w-4" />
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/ide-platform/docs">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base h-12 px-8 gap-2 bg-transparent">
                <BookOpen className="h-4 w-4" />
                Read Documentation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
