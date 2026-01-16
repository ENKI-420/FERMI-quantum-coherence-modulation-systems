/**
 * Non-Causal LM Chat API
 * Drop-in replacement for Gemini API
 */

import { NextResponse } from "next/server"
import { NonCausalLM } from "@/lib/noncausal-lm/inference"

export async function POST(request: Request) {
  try {
    const { message, context = "" } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    const lm = new NonCausalLM()
    const plan = lm.generatePlan(message, context)
    const telemetry = lm.getTelemetry()

    return NextResponse.json({
      success: true,
      plan,
      telemetry,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[NC-LM] Chat error:", error)
    return NextResponse.json({ error: "Inference failed", details: String(error) }, { status: 500 })
  }
}
