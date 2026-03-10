"use client"

import { useRef, useEffect } from "react"
import { gsap } from "@/lib/gsap"

const ac = (a = 1) => `hsl(165 80% 48% / ${a})`
const BG = "hsl(220 15% 4%)"

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const lineRef    = useRef<HTMLDivElement>(null)
  const topRef     = useRef<HTMLDivElement>(null)
  const botRef     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.body.style.overflow = "hidden"

    const tl = gsap.timeline()

    // 1 — Line draws from center outward
    tl.fromTo(lineRef.current,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 0.65, ease: "power3.inOut" },
      0.2
    )

    // 2 — "Software Developer" slides in from the LEFT
    tl.fromTo(topRef.current,
      { x: "-60vw", opacity: 0 },
      { x: "0vw", opacity: 1, duration: 1.0, ease: "power4.out" },
      0.4
    )

    // 3 — "Buenos Aires" slides in from the RIGHT
    tl.fromTo(botRef.current,
      { x: "60vw", opacity: 0 },
      { x: "0vw", opacity: 1, duration: 1.0, ease: "power4.out" },
      0.47
    )

    // 4 — Hold
    tl.to({}, { duration: 0.75 })

    // 5 — Exit: each goes opposite to where it came from
    tl.to(topRef.current, { x: "60vw", opacity: 0, duration: 0.6, ease: "power3.in" })
    tl.to(lineRef.current, { scaleX: 0, opacity: 0, duration: 0.4, ease: "power2.in" }, "<")
    tl.to(botRef.current, { x: "-60vw", opacity: 0, duration: 0.6, ease: "power3.in" }, "<")

    // 6 — Iris close: circle shrinks to center with blur — slow, modern, camera-like
    tl.to(overlayRef.current, {
      clipPath: "circle(0% at 50% 50%)",
      filter: "blur(10px)",
      duration: 1.25,
      ease: "expo.inOut",
      onComplete: () => {
        document.body.style.overflow = ""
        onComplete()
      },
    }, "-=0.1")

    return () => { document.body.style.overflow = "" }
  }, [onComplete])

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[10000] overflow-hidden"
      style={{
        background: BG,
        clipPath: "circle(150% at 50% 50%)",
      }}
    >
      {/* "Software Developer" — sits just above the center line */}
      <div
        style={{
          position: "absolute",
          bottom: "50%",
          left: 0,
          right: 0,
          paddingBottom: "20px",
          textAlign: "center",
        }}
      >
        <span
          ref={topRef}
          style={{
            display: "inline-block",
            fontFamily: "var(--font-space), sans-serif",
            fontWeight: 600,
            fontSize: "clamp(1.1rem, 2.8vw, 2.2rem)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.82)",
            opacity: 0,
          }}
        >
          Software Developer
        </span>
      </div>

      {/* Line — centered, drawn via scaleX from center */}
      <div
        ref={lineRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, 0) scaleX(0)",
          width: "clamp(180px, 36vw, 520px)",
          height: "1px",
          background: `linear-gradient(to right, transparent, ${ac()}, transparent)`,
          transformOrigin: "center",
          opacity: 0,
        }}
      />

      {/* "Buenos Aires" — sits just below the center line */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          right: 0,
          paddingTop: "14px",
          textAlign: "center",
        }}
      >
        <span
          ref={botRef}
          style={{
            display: "inline-block",
            fontFamily: "var(--font-mono), monospace",
            fontSize: "clamp(9px, 0.9vw, 11px)",
            letterSpacing: "0.42em",
            textTransform: "uppercase",
            color: ac(0.55),
            opacity: 0,
          }}
        >
          Buenos Aires
        </span>
      </div>
    </div>
  )
}
