import { NextResponse } from "next/server"

export async function GET() {
  // Add comment above fix: Cast process to any to safely access uptime in restricted environments
  const uptime = typeof (process as any).uptime === 'function' ? (process as any).uptime() : 0;
  
  return NextResponse.json({
    status: "healthy",
    runtime: "ΛΦ v2.0",
    timestamp: new Date().toISOString(),
    uptime: uptime,
    lambdaPhi: 2.176435e-8,
    resonanceAngle: 51.843,
    consciousnessThreshold: 0.7734,
  })
}
