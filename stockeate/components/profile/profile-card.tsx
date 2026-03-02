"use client"

import { useEffect, useState } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { supabase } from "@/lib/supabase/client"

interface ProfileState {
  fullName: string
  email: string
  storeName: string
  phone: string
}

function ProfileCard() {
  const [isLoading, setIsLoading] = useState(true)
  const [profile, setProfile] = useState<ProfileState>({
    fullName: "",
    email: "",
    storeName: "",
    phone: "",
  })

  useEffect(() => {
    let isMounted = true

    async function loadProfile() {
      const { data: userData } = await supabase.auth.getUser()
      const user = userData.user

      if (!user) {
        if (isMounted) {
          setIsLoading(false)
        }
        return
      }

      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle()

      const { data: membership } = await supabase
        .from("store_members")
        .select("store_id, stores(name)")
        .eq("user_id", user.id)
        .limit(1)
        .maybeSingle()

      if (!isMounted) {
        return
      }

      setProfile({
        fullName: profileData?.full_name ?? "",
        email: user.email ?? "",
        storeName: membership?.stores?.name ?? "",
        phone: profileData?.phone ?? "",
      })
      setIsLoading(false)
    }

    loadProfile()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <Card className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <CardHeader>
        <CardTitle>Datos principales</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Nombre</p>
          <Input value={profile.fullName} readOnly placeholder={isLoading ? "Cargando..." : "Sin definir"} />
        </div>
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Email</p>
          <Input value={profile.email} readOnly placeholder={isLoading ? "Cargando..." : "Sin definir"} />
        </div>
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Negocio</p>
          <Input value={profile.storeName} readOnly placeholder={isLoading ? "Cargando..." : "Sin definir"} />
        </div>
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Telefono</p>
          <Input value={profile.phone} readOnly placeholder={isLoading ? "Cargando..." : "Sin definir"} />
        </div>
      </CardContent>
    </Card>
  )
}

export default ProfileCard
