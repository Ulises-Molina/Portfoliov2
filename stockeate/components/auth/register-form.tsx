"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { supabase } from "@/lib/supabase/client"

function RegisterForm() {
  const router = useRouter()
  const [storeName, setStoreName] = useState("")
  const [ownerName, setOwnerName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [storeTouched, setStoreTouched] = useState(false)
  const [ownerTouched, setOwnerTouched] = useState(false)
  const [emailTouched, setEmailTouched] = useState(false)
  const [passwordTouched, setPasswordTouched] = useState(false)
  const [confirmTouched, setConfirmTouched] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [cooldownSeconds, setCooldownSeconds] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const storeValid = storeName.trim().length >= 2
  const ownerValid = ownerName.trim().length >= 2
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const passwordValid = password.trim().length >= 6
  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword
  const storeError = storeTouched && !storeValid ? "Ingresa el nombre del negocio." : null
  const ownerError = ownerTouched && !ownerValid ? "Ingresa el nombre del responsable." : null
  const emailError = emailTouched && !emailValid ? "Ingresa un email valido." : null
  const passwordError =
    passwordTouched && !passwordValid ? "La contrasena debe tener al menos 6 caracteres." : null

  useEffect(() => {
    if (cooldownSeconds <= 0) {
      return
    }

    const timer = window.setInterval(() => {
      setCooldownSeconds((current) => Math.max(0, current - 1))
    }, 1000)

    return () => window.clearInterval(timer)
  }, [cooldownSeconds])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setNotice(null)
    setIsLoading(true)

    if (password !== confirmPassword) {
      setIsLoading(false)
      setError("Las contrasenas no coinciden. Revisa e intenta de nuevo.")
      return
    }

    if (!storeValid || !ownerValid || !emailValid || !passwordValid || !passwordsMatch) {
      setIsLoading(false)
      setStoreTouched(true)
      setOwnerTouched(true)
      setEmailTouched(true)
      setPasswordTouched(true)
      setConfirmTouched(true)
      setError("Revisa los campos marcados e intenta de nuevo.")
      return
    }

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: ownerName,
          store_name: storeName,
        },
      },
    })

    if (signUpError) {
      setIsLoading(false)
      if (signUpError.status === 429) {
        setCooldownSeconds(60)
        setError("Demasiados intentos. Espera un minuto y vuelve a intentar.")
        return
      }
      setError("No pudimos crear la cuenta. Revisa los datos e intenta de nuevo.")
      return
    }

    if (!data.session) {
      setIsLoading(false)
      setNotice("Cuenta creada. Revisa tu email para confirmar y luego inicia sesion.")
      setTimeout(() => {
        router.push("/login")
      }, 1200)
      return
    }

    const { error: storeError } = await supabase.rpc("create_store_with_trial", {
      p_store_name: storeName,
    })

    setIsLoading(false)

    if (storeError) {
      setError("La cuenta se creo, pero no pudimos activar el negocio. Contactanos.")
      return
    }

    setNotice("Cuenta creada y negocio listo. Redirigiendo al panel...")
    setTimeout(() => {
      router.push("/dashboard")
    }, 800)
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground" htmlFor="register-store">
            Nombre del negocio
          </label>
          <Input
            id="register-store"
            placeholder="Kiosco Central"
            value={storeName}
            onChange={(event) => setStoreName(event.target.value)}
            onBlur={() => setStoreTouched(true)}
            aria-invalid={!!storeError}
            required
          />
          {storeError ? (
            <p className="text-xs text-destructive">{storeError}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground" htmlFor="register-owner">
            Responsable
          </label>
          <Input
            id="register-owner"
            placeholder="Andrea Ruiz"
            value={ownerName}
            onChange={(event) => setOwnerName(event.target.value)}
            onBlur={() => setOwnerTouched(true)}
            aria-invalid={!!ownerError}
            required
          />
          {ownerError ? (
            <p className="text-xs text-destructive">{ownerError}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground" htmlFor="register-email">
            Email
          </label>
          <Input
            id="register-email"
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
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground" htmlFor="register-password">
            Contrasena
          </label>
          <Input
            id="register-password"
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
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground" htmlFor="register-password-confirm">
            Repetir contrasena
          </label>
          <Input
            id="register-password-confirm"
            type="password"
            placeholder="********"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            onBlur={() => setConfirmTouched(true)}
            aria-invalid={confirmTouched && !passwordsMatch}
            required
          />
          {confirmTouched && !passwordsMatch ? (
            <p className="text-xs text-destructive">Las contrasenas deben coincidir.</p>
          ) : null}
        </div>
        {error ? (
          <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">
            {error}
          </div>
        ) : null}
        {notice ? (
          <div className="rounded-lg border border-border/70 bg-muted/30 px-3 py-2 text-xs text-muted-foreground">
            {notice}
          </div>
        ) : null}
        <Button className="w-full" disabled={isLoading || cooldownSeconds > 0}>
          {isLoading
            ? "Creando cuenta..."
            : cooldownSeconds > 0
              ? `Espera ${cooldownSeconds}s`
              : "Crear cuenta"}
        </Button>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 text-xs text-muted-foreground">
        <span className="mt-2">Ya tienes cuenta?</span>
        <Button variant="outline" asChild className="w-full">
          <Link href="/login">Iniciar sesion</Link>
        </Button>
      </CardFooter>
    </form>
  )
}

export default RegisterForm
