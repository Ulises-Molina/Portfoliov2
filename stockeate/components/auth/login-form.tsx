"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { CardContent, CardFooter } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { createSupabaseClient } from "@/lib/supabase/client"

function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(true)
  const [emailTouched, setEmailTouched] = useState(false)
  const [passwordTouched, setPasswordTouched] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [planRequired, setPlanRequired] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const emailError = emailTouched && !emailValid ? "Ingresa un email valido." : null
  const passwordError =
    passwordTouched && password.trim().length < 6
      ? "La contrasena debe tener al menos 6 caracteres."
      : null

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsLoading(true)
    setPlanRequired(false)

    if (!emailValid || password.trim().length < 6) {
      setIsLoading(false)
      setEmailTouched(true)
      setPasswordTouched(true)
      return
    }

    window.localStorage.setItem("stockeate-remember", rememberMe ? "true" : "false")
    const authClient = createSupabaseClient({ remember: rememberMe })
    const { error: signInError } = await authClient.auth.signInWithPassword({
      email,
      password,
    })

    setIsLoading(false)

    if (signInError) {
      setError("No pudimos iniciar sesion. Revisa tus datos e intenta de nuevo.")
      return
    }

    const { data: userData } = await authClient.auth.getUser()
    const userId = userData.user?.id

    if (userId) {
      const { data: membership } = await authClient
        .from("store_members")
        .select("store_id")
        .eq("user_id", userId)
        .limit(1)
        .maybeSingle()

      const storeId = membership?.store_id
      if (!storeId) {
        const storeName = userData.user?.user_metadata?.store_name ?? "Mi negocio"
        const { error: createStoreError } = await authClient.rpc("create_store_with_trial", {
          p_store_name: storeName,
        })

        if (createStoreError) {
          setError("No pudimos activar la prueba. Contactanos para ayudarte.")
          return
        }

        const { data: newMembership } = await authClient
          .from("store_members")
          .select("store_id")
          .eq("user_id", userId)
          .limit(1)
          .maybeSingle()

        if (newMembership?.store_id) {
          await authClient.auth.updateUser({
            data: { store_id: newMembership.store_id },
          })
        }

        if (rememberMe) {
          router.push("/dashboard")
        } else {
          window.location.href = "/dashboard"
        }
        return
      }

      await authClient.auth.updateUser({
        data: { store_id: storeId },
      })

      const { data: billing, error: billingError } = await authClient.rpc("get_store_billing", {
        p_store_id: storeId,
      })
      const status = billing?.subscription?.status
      const periodEnd = billing?.subscription?.current_period_end
      const isStatusActive = status === "active" || status === "trialing"
      const isPeriodActive = periodEnd ? new Date(periodEnd).getTime() > Date.now() : true
      const hasAccess = isStatusActive && isPeriodActive

      if (billingError || !hasAccess) {
        setPlanRequired(true)
        return
      }
    }

    if (rememberMe) {
      router.push("/dashboard")
    } else {
      window.location.href = "/dashboard"
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardContent className="space-y-4">
        <AlertDialog open={planRequired} onOpenChange={setPlanRequired}>
          <AlertDialogContent className="max-w-[460px]">
            <AlertDialogHeader>
              <AlertDialogTitle>Necesitas un plan activo</AlertDialogTitle>
              <AlertDialogDescription>
                Para ingresar al panel, tu negocio debe tener un plan activo o en trial.
                Elegi un plan y volve a iniciar sesion.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction asChild>
                <Link href="/#pricing">Ver planes</Link>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground" htmlFor="login-email">
            Email
          </label>
          <Input
            id="login-email"
            type="email"
            placeholder="tu@kiosco.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            onBlur={() => setEmailTouched(true)}
            aria-invalid={!!emailError}
            required
          />
          {emailError ? (
            <p className="text-xs text-destructive">{emailError}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground" htmlFor="login-password">
            Contrasena
          </label>
          <Input
            id="login-password"
            type="password"
            placeholder="********"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onBlur={() => setPasswordTouched(true)}
            aria-invalid={!!passwordError}
            required
          />
          {passwordError ? (
            <p className="text-xs text-destructive">{passwordError}</p>
          ) : null}
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <label className="flex items-center gap-2">
            <Checkbox
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(Boolean(checked))}
            />
            Recordarme
          </label>
          <span className="font-medium text-foreground">Recupero disponible pronto</span>
        </div>
        {error ? (
          <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">
            {error}
          </div>
        ) : null}
        <Button className="w-full" disabled={isLoading}>
          {isLoading ? "Ingresando..." : "Entrar al panel"}
        </Button>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 text-xs text-muted-foreground">
        <span className="mt-2">Sin cuenta todavia?</span>
        <Button variant="outline" asChild className="w-full">
          <Link href="/register">Crear cuenta nueva</Link>
        </Button>
      </CardFooter>
    </form>
  )
}

export default LoginForm
