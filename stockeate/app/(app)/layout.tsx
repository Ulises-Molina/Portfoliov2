import type React from "react"

import AppShell from "@/components/app-shell"

function AppLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>
}

export default AppLayout
