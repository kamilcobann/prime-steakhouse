"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/client"
import { AdminDashboard } from "@/components/admin-dashboard"
import {LoginForm} from "@/components/login-form"
export default function AdminPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.replace("/auth/login")
      } else {
      setLoading(false)
      }
    })
  }, [router])

  if (loading) {
    return  <LoginForm />
  }

  return (
    <main className="min-h-screen bg-background">
      <AdminDashboard />
    </main>
  )
}
