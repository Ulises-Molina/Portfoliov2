"use client"

import { useEffect, useRef } from "react"

export function WarpedGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let raf: number
    let time = 0
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const resize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio
      canvas.height = window.innerHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    const draw = () => {
      const w = canvas.width / window.devicePixelRatio
      const h = canvas.height / window.devicePixelRatio

      ctx.clearRect(0, 0, w, h)

      // Perspective grid parameters
      const horizonY = h * 0.38
      const vanishX = w * 0.5
      const gridColor = "rgba(45, 212, 170, 0.07)"
      const gridColorBright = "rgba(45, 212, 170, 0.12)"

      ctx.lineWidth = 0.5

      // Horizontal lines (parallel to horizon, with perspective spacing)
      const hLines = 20
      for (let i = 0; i <= hLines; i++) {
        const t = i / hLines
        // Exponential spacing for perspective
        const perspT = Math.pow(t, 2.2)
        const y = horizonY + perspT * (h - horizonY) * 1.1

        // Subtle wave distortion
        const waveAmount = prefersReduced ? 0 : Math.sin(time * 0.4 + i * 0.3) * (2 + t * 6)

        ctx.beginPath()
        ctx.strokeStyle = i % 4 === 0 ? gridColorBright : gridColor

        for (let x = 0; x <= w; x += 4) {
          const nx = x / w
          const wave = prefersReduced ? 0 : Math.sin(nx * Math.PI * 3 + time * 0.6 + i * 0.2) * waveAmount
          const py = y + wave

          if (x === 0) ctx.moveTo(x, py)
          else ctx.lineTo(x, py)
        }
        ctx.stroke()
      }

      // Vertical lines (converging to vanishing point)
      const vLines = 24
      for (let i = 0; i <= vLines; i++) {
        const t = i / vLines
        const bottomX = t * w

        // Wave on vertical lines
        const vWave = prefersReduced ? 0 : Math.sin(time * 0.3 + i * 0.5) * 3

        ctx.beginPath()
        ctx.strokeStyle = i % 4 === 0 ? gridColorBright : gridColor

        // Draw from bottom to vanishing point
        const steps = 40
        for (let s = 0; s <= steps; s++) {
          const st = s / steps
          const perspSt = Math.pow(st, 0.6)

          const x = vanishX + (bottomX - vanishX + vWave) * perspSt
          const y = horizonY + (h * 1.1 - horizonY) * perspSt

          // Add subtle wave
          const sWave = prefersReduced ? 0 : Math.sin(st * Math.PI * 2 + time * 0.5 + i * 0.4) * (2 * perspSt)

          if (s === 0) ctx.moveTo(x + sWave, y)
          else ctx.lineTo(x + sWave, y)
        }
        ctx.stroke()
      }

      // Horizon glow line
      ctx.beginPath()
      const gradient = ctx.createLinearGradient(0, horizonY, w, horizonY)
      gradient.addColorStop(0, "rgba(45, 212, 170, 0)")
      gradient.addColorStop(0.3, "rgba(45, 212, 170, 0.08)")
      gradient.addColorStop(0.5, "rgba(45, 212, 170, 0.15)")
      gradient.addColorStop(0.7, "rgba(45, 212, 170, 0.08)")
      gradient.addColorStop(1, "rgba(45, 212, 170, 0)")
      ctx.strokeStyle = gradient
      ctx.lineWidth = 1

      for (let x = 0; x <= w; x += 3) {
        const wave = prefersReduced ? 0 : Math.sin(x * 0.01 + time * 0.8) * 2
        if (x === 0) ctx.moveTo(x, horizonY + wave)
        else ctx.lineTo(x, horizonY + wave)
      }
      ctx.stroke()

      if (!prefersReduced) {
        time += 0.008
      }
      raf = requestAnimationFrame(draw)
    }

    window.addEventListener("resize", resize)
    resize()
    draw()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  )
}
