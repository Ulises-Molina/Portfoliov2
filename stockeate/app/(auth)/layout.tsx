import type React from "react"

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#ffffff_0%,_#f7f5f3_45%,_#eef2ff_100%)]">
      <main className="mx-auto flex min-h-screen w-full max-w-[1200px] flex-col items-center justify-center gap-10 px-4 py-12 md:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}

export default AuthLayout
