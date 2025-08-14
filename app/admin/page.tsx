import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AdminDashboard } from "@/components/admin-dashboard"

export default async function AdminPage() {
  // Check if user is authenticated
  const supabase = createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // If no user, redirect to login
  if (!user) {
    redirect("/auth/login")
  }

  return (
    <main className="min-h-screen bg-background">
      <AdminDashboard />
    </main>
  )
}
