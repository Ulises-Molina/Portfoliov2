import type { ReactNode } from "react"

interface SectionHeadingProps {
  children: ReactNode
}

export function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <h2 className="text-2xl md:text-3xl font-bold mb-8 inline-block relative after:content-[''] after:absolute after:w-1/2 after:h-1 after:bg-primary after:bottom-0 after:left-0 after:-mb-2 pb-2">
      {children}
    </h2>
  )
}

