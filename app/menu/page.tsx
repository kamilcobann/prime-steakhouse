import { MenuDisplay } from "@/components/menu-display"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function MenuPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Button variant="ghost" asChild>
              <Link href="/" className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Link>
            </Button>
            <div className="font-serif font-black text-2xl text-gray-800">Prime Steakhouse Menu</div>
            <Button variant="ghost" asChild>
              <Link href="/admin">Admin</Link>
            </Button>
          </div>
        </div>
      </nav>

      <MenuDisplay />
    </main>
  )
}
