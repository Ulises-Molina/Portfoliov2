"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { supabase } from "@/lib/supabase/client"

function PasswordForm() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [confirmTouched, setConfirmTouched] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const passwordValid = password.trim().length >= 6
  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setSuccess(null)

    if (!passwordValid || !passwordsMatch) {
      setConfirmTouched(true)
      setError("Revisa la contrasena e intenta de nuevo.")
      return
    }

    setIsSaving(true)
    const { error: updateError } = await supabase.auth.updateUser({ password })
    setIsSaving(false)

    if (updateError) {
      setError(updateError.message || "No pudimos actualizar la contrasena.")
      return
    }

    setPassword("")
    setConfirmPassword("")
    setConfirmTouched(false)
    setSuccess("Contrasena actualizada correctamente.")
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="animate-in fade-in slide-in-from-bottom-2 duration-500">
        <CardHeader>
          <CardTitle>Cambiar contrasena</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Nueva contrasena</p>
            <Input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Minimo 6 caracteres"
              aria-invalid={!passwordValid && password.length > 0}
              required
            />
            {!passwordValid && password.length > 0 ? (
              <p className="text-xs text-destructive">La contrasena debe tener al menos 6 caracteres.</p>
            ) : null}
          </div>
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Repetir contrasena</p>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              onBlur={() => setConfirmTouched(true)}
              placeholder="Repeti la nueva contrasena"
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
          {success ? (
            <div className="rounded-lg border border-border/70 bg-muted/30 px-3 py-2 text-xs text-muted-foreground">
              {success}
            </div>
          ) : null}
          <Button type="submit" disabled={isSaving}>
            {isSaving ? "Guardando..." : "Actualizar contrasena"}
          </Button>
        </CardContent>
      </Card>
    </form>
  )
}

export default PasswordForm
