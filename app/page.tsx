import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChefHat, Star, Clock, MapPin } from "lucide-react"

export default function LandingPage() {
  const featuredItems = [
    {
      name: "Prime Ribeye",
      description: "Aged to perfection, grilled to your liking with our signature seasoning",
      price: "$65",
      image: "/dry-aged-ribeye.png",
    },
    {
      name: "Wagyu Carpaccio",
      description: "Thinly sliced premium wagyu with truffle oil and parmesan",
      price: "$28",
      image: "/wagyu-carpaccio-plating.png",
    },
    {
      name: "Filet Mignon",
      description: "The most tender cut, served with roasted vegetables and red wine reduction",
      price: "$58",
      image: "/elegant-filet-mignon.png",
    },
  ]

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0  bg-white backdrop-blur-sm border-b border-border z-50 w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <img src="/logo.png" alt="Shish&Go Steakhouse" className="h-18 w-auto" />
            <div className="flex space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/menu">Menu</Link>
              </Button>
              <Button variant="ghost" asChild className="hidden">
                <Link href="/admin">Admin</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-black/40"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/portion.png')",
          }}
        ></div>
        <div className="relative z-10 text-center text-white bold w-full mx-auto px-4">
          <h1 className="font-serif font-black mb-6 leading-tight md:text-5xl text-4xl">
            Mutfakta Mükemmelliğin Tadını Çıkarın
          </h1>
          <p className="font-sans text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Her detayın sizin keyfiniz için tasarlandığı zarif bir atmosferde et sanatını deneyimleyin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg flex" asChild>
              <Link href="/menu">Menü</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg bg-transparent hidden"
            >
              Make Reservation
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Cuts Section */}
      <section className="py-20 bg-slate-50 hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif font-black text-4xl md:text-5xl text-gray-800 mb-4">Featured Cuts</h2>
            <p className="font-sans text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our signature dishes, crafted with the finest ingredients and prepared by our master chefs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 hidden">
            {featuredItems.map((item, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white border-0 shadow-lg"
              >
                <div className="aspect-square overflow-hidden rounded-t-lg">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-serif font-bold text-xl text-gray-800">{item.name}</h3>
                    <span className="font-sans font-semibold text-lg text-purple-600">{item.price}</span>
                  </div>
                  <p className="font-sans text-gray-600 leading-relaxed">{item.description}</p>
                  <div className="flex items-center mt-4 text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Restaurant Atmosphere Section */}
      <section className="py-20 bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif font-black text-4xl md:text-5xl mb-6">Eşsiz Bir Lezzet Deneyimi</h2>
              <p className="font-sans text-xl text-gray-300 mb-8 leading-relaxed">
                Her detayın keyfiniz için tasarlandığı lüks bir ambiyansa kendinizi bırakın.
              </p>

              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center space-x-3">
                  <ChefHat className="w-6 h-6 text-purple-400" />
                  <span className="font-sans">Usta Şefler</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-6 h-6 text-purple-400" />
                  <span className="font-sans">Çalışma Saatleri (Pazartesi Kapalı): 11.00-21.00</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="w-6 h-6 text-purple-400" />
                  <span className="font-sans">Yüksek Kaliteli Servis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-6 h-6 text-purple-400" />
                  <span className="font-sans">
                    <Link href="https://maps.app.goo.gl/F6eZzGHe8MNaDQQS8" target="_blank" rel="noopener noreferrer">
                      Yol Tarifi Alın
                    </Link>
                  </span>
                </div>
              </div>

              <Button size="lg" className="bg-red-600 hover:bg-red-700 px-8 py-4 text-lg" asChild>
                <Link href="/menu">Menü</Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img src="/portion.png" alt="Dining Room" className="w-full h-48 object-cover rounded-lg shadow-lg" />
                <img src="/sis.webp" alt="Grilling" className="w-full h-32 object-cover rounded-lg shadow-lg" />
              </div>
              <div className="space-y-4 mt-8">
                <img src="/pirzola.webp" alt="Wine Cellar" className="w-full h-32 object-cover rounded-lg shadow-lg" />
                <img
                  src="/placeholder-bwfaq.png"
                  alt="Table Setting"
                  className="w-full h-48 object-cover rounded-lg shadow-lg hidden"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-slate-50 hidden">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 hidden">
          <h2 className="font-serif font-black text-4xl md:text-5xl text-gray-800 mb-6">
            Ready for an Unforgettable Experience?
          </h2>
          <p className="font-sans text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join us for an evening of exceptional cuisine, impeccable service, and memories that will last a lifetime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg" asChild>
              <Link href="/menu">View Menu & Order</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white px-8 py-4 text-lg bg-transparent"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-serif font-black text-2xl mb-4">Shish&Go Steakhouse</h3>
            </div>
            <div>
              <h4 className="font-sans font-semibold text-lg mb-4">Çalışma Saatleri</h4>
              <div className="font-sans text-gray-400 space-y-1">
                <p>Pazartesi - Kapalı</p>
                <p>Salı - Pazar: 11.00 - 21:00</p>
              </div>
            </div>
            <div>
              <h4 className="font-sans font-semibold text-lg mb-4">İletişim</h4>
              <div className="font-sans text-gray-400 space-y-1">
                <p>Cumhuriyet Mahallesi</p>
                <p>Mehmet Topaç Bulvarı No:180/A Uşak/MERKEZ</p>
                <p>+905413344541</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="font-sans text-gray-400">Shish&Go Steakhouse</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
