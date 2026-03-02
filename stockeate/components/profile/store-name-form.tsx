"use client"

import { useEffect, useState } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { supabase } from "@/lib/supabase/client"

function StoreNameForm() {
  const [storeName, setStoreName] = useState("")
  const [storeId, setStoreId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [initialName, setInitialName] = useState("")

  useEffect(() => {
    let isMounted = true

    async function loadStore() {
      const { data: userData } = await supabase.auth.getUser()
      const userId = userData.user?.id
      if (!userId) {
        if (isMounted) {
          setIsLoading(false)
        }
        return
      }

      const { data: membership } = await supabase
        .from("store_members")
        .select("store_id, stores(name)")
        .eq("user_id", userId)
        .limit(1)
        .maybeSingle()

      if (!isMounted) {
        return
      }

      setStoreId(membership?.store_id ?? null)
      const resolvedName = membership?.stores?.name ?? ""
      setStoreName(resolvedName)
      setInitialName(resolvedName)
      setIsLoading(false)
    }

    loadStore()

    return () => {
      isMounted = false
    }
  }, [])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setSuccess(null)

    const trimmedName = storeName.trim()
    if (!storeId || trimmedName.length < 2) {
      setError("Ingresa un nombre valido para el negocio.")
      return
    }

    if (trimmedName === initialName) {
      setSuccess("No hay cambios para guardar.")
      return
    }

    setIsSaving(true)
    const { data: updatedStore, error: updateError } = await supabase
      .from("stores")
      .update({ name: trimmedName })
      .eq("id", storeId)
      .select("name")
      .maybeSingle()

    setIsSaving(false)

    if (updateError) {
      setError(updateError.message || "No pudimos guardar el nombre. Intenta nuevamente.")
      return
    }

    if (!updatedStore) {
      setError("No pudimos guardar el nombre. Verifica tus permisos.")
      return
    }

    setInitialName(updatedStore.name ?? trimmedName)
    setSuccess("Nombre actualizado correctamente.")
    window.dispatchEvent(
      new CustomEvent("store-name-updated", { detail: { name: trimmedName } }),
    )
  }

  return (
    <form id="store-name-form" onSubmit={handleSubmit}>
      <Card className="animate-in fade-in slide-in-from-bottom-2 duration-500">
        <CardHeader>
          <CardTitle>Datos del negocio</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Nombre del negocio</p>
            <Input
              value={storeName}
              onChange={(event) => setStoreName(event.target.value)}
              placeholder={isLoading ? "Cargando..." : "Mi negocio"}
              aria-invalid={!isLoading && storeName.trim().length < 2}
              disabled={isLoading || isSaving}
              required
            />
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
          {isSaving ? (
            <p className="text-xs text-muted-foreground">Guardando cambios...</p>
          ) : null}
        </CardContent>
      </Card>
    </form>
  )
}

export default StoreNameForm
