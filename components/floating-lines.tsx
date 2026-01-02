"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

export function FloatingLines() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // GSAP fade-in animation for canvas
        gsap.fromTo(
            canvas,
            { opacity: 0 },
            { opacity: 1, duration: 2, ease: "power2.out" }
        )

        let animationFrameId: number
        let time = 0

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        window.addEventListener("resize", resize)
        resize()

        // Wave parameters
        const numberOfLines = 18
        const centerY = canvas.height * 0.7 // Moved down further

        const animate = () => {
            time += 0.01
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            for (let i = 0; i < numberOfLines; i++) {
                ctx.beginPath()

                // Color matching user's theme (greenish) - can be changed to pink if preferred
                const opacity = 0.3 + Math.sin(i * 0.3 + time * 0.5) * 0.15 // Increased from 0.15 to 0.3
                ctx.strokeStyle = `rgba(138, 154, 140, ${opacity})`
                ctx.lineWidth = 1.5

                const points: { x: number; y: number }[] = []

                // Generate points for smooth curve
                for (let x = 0; x <= canvas.width; x += 10) {
                    // Normalized position (0 to 1)
                    const normalizedX = x / canvas.width

                    // Create converging effect at edges
                    const edgeFactor = Math.sin(normalizedX * Math.PI)

                    // Vertical offset for this specific line
                    const lineOffset = (i - numberOfLines / 2) * 8

                    // Wave calculation with multiple frequencies
                    const wave1 = Math.sin(x * 0.003 + time + i * 0.2) * 30 * edgeFactor
                    const wave2 = Math.sin(x * 0.001 - time * 0.5 + i * 0.1) * 20 * edgeFactor
                    const wave3 = Math.cos(x * 0.002 + time * 0.3) * 15 * edgeFactor

                    const y = centerY + lineOffset + wave1 + wave2 + wave3

                    points.push({ x, y })
                }

                // Draw smooth curve through points
                if (points.length > 0) {
                    ctx.moveTo(points[0].x, points[0].y)

                    for (let j = 1; j < points.length - 2; j++) {
                        const xc = (points[j].x + points[j + 1].x) / 2
                        const yc = (points[j].y + points[j + 1].y) / 2
                        ctx.quadraticCurveTo(points[j].x, points[j].y, xc, yc)
                    }

                    // Last segment
                    if (points.length > 2) {
                        ctx.quadraticCurveTo(
                            points[points.length - 2].x,
                            points[points.length - 2].y,
                            points[points.length - 1].x,
                            points[points.length - 1].y
                        )
                    }
                }

                ctx.stroke()
            }

            animationFrameId = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            window.removeEventListener("resize", resize)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
        />
    )
}
