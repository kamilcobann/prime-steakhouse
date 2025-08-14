"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/client"
import { AdminDashboard } from "@/components/admin-dashboard"

export default function AdminPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.replace("/auth/login")
      }
      setLoading(false)
    })
  }, [router])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <main className="min-h-screen bg-background">
      <AdminDashboard />
    </main>
  )
}
