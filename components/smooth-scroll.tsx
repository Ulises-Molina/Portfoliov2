'use client'

import { useEffect } from 'react'
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
