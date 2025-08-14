import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import LoginForm from "@/components/login-form"

export default async function LoginPage() {
  // Check if user is already logged in
  const supabase = createServerClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If user is logged in, redirect to admin page
  if (session) {
    redirect("/admin")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background to-red-50/20 px-4 py-12 sm:px-6 lg:px-8">
      <LoginForm />
    </div>
  )
}
