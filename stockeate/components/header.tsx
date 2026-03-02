import Link from "next/link"

import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="w-full border-b border-[#E5E7EB] bg-[#F8FAFC]">
      <div className="max-w-[1060px] mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-8">
            <div className="text-[#0F172A] font-semibold text-lg">Brillance</div>
            <div className="hidden md:flex items-center space-x-6">
              <button className="text-[#0F172A] hover:text-[#1E40AF] text-sm font-medium transition-colors">Products</button>
              <button className="text-[#0F172A] hover:text-[#1E40AF] text-sm font-medium transition-colors">Pricing</button>
              <button className="text-[#0F172A] hover:text-[#1E40AF] text-sm font-medium transition-colors">Docs</button>
            </div>
          </div>
          <Button
            asChild
            variant="ghost"
            className="text-[#0F172A] hover:bg-[#EFF6FF] hover:text-[#1E40AF] cursor-pointer"
          >
            <Link href="/login">Iniciar sesión</Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}
