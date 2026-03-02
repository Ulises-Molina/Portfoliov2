import { NextResponse, type NextRequest } from "next/server"
import { createClient } from "@supabase/supabase-js"

import { AUTH_COOKIE_KEY } from "@/lib/supabase/auth-constants"

const PROTECTED_PREFIXES = [
  "/dashboard",
  "/products",
  "/sales",
  "/restock",
  "/cash-close",
  "/reports",
  "/customers",
  "/suppliers",
  "/history",
  "/profile",
  "/settings",
]

function safeDecode(value: string) {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

function createCookieStorage(request: NextRequest, response: NextResponse) {
  return {
    getItem: (key: string) => {
      const value = request.cookies.get(key)?.value
      return value ? safeDecode(value) : null
    },
    setItem: (key: string, value: string) => {
      response.cookies.set({
        name: key,
        value: encodeURIComponent(value),
        path: "/",
        sameSite: "lax",
        secure: request.nextUrl.protocol === "https:",
      })
    },
    removeItem: (key: string) => {
      response.cookies.set({
        name: key,
        value: "",
        path: "/",
        maxAge: 0,
        sameSite: "lax",
        secure: request.nextUrl.protocol === "https:",
      })
    },
  }
}

function isProtectedPath(pathname: string) {
  return PROTECTED_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (!isProtectedPath(pathname)) {
    return NextResponse.next()
  }

  const response = NextResponse.next()
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        storageKey: AUTH_COOKIE_KEY,
        storage: createCookieStorage(request, response),
        persistSession: true,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    },
  )

  const { data: userData, error: userError } = await supabase.auth.getUser()
  const user = userData.user

  if (!user || userError) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  let storeId = user.user_metadata?.store_id as string | undefined

  if (!storeId) {
    const { data: membership, error: membershipError } = await supabase
      .from("store_members")
      .select("store_id")
      .eq("user_id", user.id)
      .limit(1)
      .maybeSingle()

    if (membershipError || !membership?.store_id) {
      const url = new URL("/?plan=required&reason=membership", request.url)
      return NextResponse.redirect(url)
    }

    storeId = membership.store_id
  }

  const { data: subscription, error: subscriptionError } = await supabase
    .from("subscriptions")
    .select("status, current_period_end")
    .eq("store_id", storeId)
    .single()

  const status = subscription?.status
  const periodEnd = subscription?.current_period_end
  const isStatusActive = status === "active" || status === "trialing"
  const isPeriodActive = periodEnd ? Date.parse(periodEnd) > Date.now() : true
  const hasAccess = !subscriptionError && isStatusActive && isPeriodActive

  if (!hasAccess) {
    const url = new URL("/?plan=required&reason=subscription", request.url)
    return NextResponse.redirect(url)
  }

  return response
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/products/:path*",
    "/sales/:path*",
    "/restock/:path*",
    "/cash-close/:path*",
    "/reports/:path*",
    "/customers/:path*",
    "/suppliers/:path*",
    "/history/:path*",
    "/profile/:path*",
    "/settings/:path*",
  ],
}
