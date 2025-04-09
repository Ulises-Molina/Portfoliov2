import type { ReactNode } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface ContactButtonProps {
  icon: ReactNode
  label: string
  href: string
}

export function ContactButton({ icon, label, href }: ContactButtonProps) {
  return (
    <Button variant="outline" asChild className="flex items-center">
      <Link href={href} target="_blank" rel="noopener noreferrer">
        {icon}
        {label}
      </Link>
    </Button>
  )
}

