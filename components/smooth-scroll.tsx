'use client'

import { useEffect } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import { ScrollTrigger } from '@/lib/gsap'

function LenisController({ stopped }: { stopped: boolean }) {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return
    stopped ? lenis.stop() : lenis.start()
  }, [stopped, lenis])

  // Sync Lenis scroll events with GSAP ScrollTrigger so pin/scrub work correctly
  useEffect(() => {
    if (!lenis) return
    const update = () => ScrollTrigger.update()
    lenis.on('scroll', update)
    ScrollTrigger.refresh()
    return () => { lenis.off('scroll', update) }
  }, [lenis])

  return null
}

/* Siempre montado (también en el render del servidor) para que el árbol no cambie
   al hidratar: antes se alternaba entre <>children</> y <ReactLenis> y eso remontaba
   la página entera. En touch Lenis no intercepta el scroll (syncTouch: false),
   así que el scroll nativo del celular queda intacto. */
export function SmoothScroll({ children, stopped }: { children: React.ReactNode; stopped?: boolean }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.09,
        duration: 1.4,
        smoothWheel: true,
        syncTouch: false,
      }}
    >
      <LenisController stopped={!!stopped} />
      {children}
    </ReactLenis>
  )
}
