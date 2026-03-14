'use client'

import { useEffect, useState } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'

function LenisController({ stopped }: { stopped: boolean }) {
  const lenis = useLenis()
  useEffect(() => {
    if (!lenis) return
    stopped ? lenis.stop() : lenis.start()
  }, [stopped, lenis])
  return null
}

export function SmoothScroll({ children, stopped }: { children: React.ReactNode; stopped?: boolean }) {
  const [isTouch, setIsTouch] = useState<boolean | null>(null)

  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none) and (pointer: coarse)").matches)
  }, [])

  if (isTouch !== false) return <>{children}</>

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.09,
        duration: 1.4,
        smoothWheel: true,
      }}
    >
      <LenisController stopped={!!stopped} />
      {children}
    </ReactLenis>
  )
}
