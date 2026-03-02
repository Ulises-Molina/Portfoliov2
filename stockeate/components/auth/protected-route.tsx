"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { supabase } from "@/lib/supabase/client"

interface ProtectedRouteProps {
  children: React.ReactNode
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function checkSession() {
      const { data } = await supabase.auth.getSession()
      if (!data.session) {
        router.replace("/login")
        return
      }

      if (isMounted) {
        setIsChecking(false)
      }
    }

    checkSession()

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.replace("/login")
      }
    })

    return () => {
      isMounted = false
      data.subscription.unsubscribe()
    }
  }, [router])

  if (isChecking) {
    return (
      <div className="rounded-2xl border border-border/70 bg-white/80 p-6 text-sm text-muted-foreground">
        Verificando sesion...
      </div>
    )
  }

  return <>{children}</>
}

export default ProtectedRoute
