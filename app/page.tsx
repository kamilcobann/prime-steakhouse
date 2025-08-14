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
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-serif font-black text-2xl text-gray-800">Prime Steakhouse</div>
            <div className="flex space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/menu">Menu</Link>
              </Button>
              <Button variant="ghost" asChild>
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
            backgroundImage: "url('/elegant-steakhouse.png')",
          }}
        ></div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="font-serif font-black text-5xl md:text-7xl mb-6 leading-tight">
            Indulge in Culinary Excellence
          </h1>
          <p className="font-sans text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Experience the art of steak in a refined atmosphere where every detail is crafted for your enjoyment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg" asChild>
              <Link href="/menu">View Our Menu</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg bg-transparent"
            >
              Make Reservation
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Cuts Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif font-black text-4xl md:text-5xl text-gray-800 mb-4">Featured Cuts</h2>
            <p className="font-sans text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our signature dishes, crafted with the finest ingredients and prepared by our master chefs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
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
              <h2 className="font-serif font-black text-4xl md:text-5xl mb-6">A Dining Experience Like No Other</h2>
              <p className="font-sans text-xl text-gray-300 mb-8 leading-relaxed">
                Immerse yourself in an ambiance of luxury, where every detail is crafted for your enjoyment. From our
                carefully curated wine selection to our impeccable service, we create moments that last a lifetime.
              </p>

              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center space-x-3">
                  <ChefHat className="w-6 h-6 text-purple-400" />
                  <span className="font-sans">Master Chefs</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-6 h-6 text-purple-400" />
                  <span className="font-sans">Open Daily</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="w-6 h-6 text-purple-400" />
                  <span className="font-sans">5-Star Service</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-6 h-6 text-purple-400" />
                  <span className="font-sans">Prime Location</span>
                </div>
              </div>

              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 px-8 py-4 text-lg" asChild>
                <Link href="/menu">Explore Full Menu</Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="/elegant-steakhouse.png"
                  alt="Dining Room"
                  className="w-full h-48 object-cover rounded-lg shadow-lg"
                />
                <img
                  src="/premium-steak-grill.png"
                  alt="Grilling"
                  className="w-full h-32 object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="space-y-4 mt-8">
                <img
                  src="/premium-wine-cellar.png"
                  alt="Wine Cellar"
                  className="w-full h-32 object-cover rounded-lg shadow-lg"
                />
                <img
                  src="/placeholder-bwfaq.png"
                  alt="Table Setting"
                  className="w-full h-48 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
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
              <h3 className="font-serif font-black text-2xl mb-4">Prime Steakhouse</h3>
              <p className="font-sans text-gray-400">
                Where culinary excellence meets exceptional service in an atmosphere of refined elegance.
              </p>
            </div>
            <div>
              <h4 className="font-sans font-semibold text-lg mb-4">Hours</h4>
              <div className="font-sans text-gray-400 space-y-1">
                <p>Monday - Thursday: 5:00 PM - 10:00 PM</p>
                <p>Friday - Saturday: 5:00 PM - 11:00 PM</p>
                <p>Sunday: 4:00 PM - 9:00 PM</p>
              </div>
            </div>
            <div>
              <h4 className="font-sans font-semibold text-lg mb-4">Contact</h4>
              <div className="font-sans text-gray-400 space-y-1">
                <p>123 Steakhouse Avenue</p>
                <p>Downtown District</p>
                <p>(555) 123-STEAK</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="font-sans text-gray-400">© 2024 Prime Steakhouse. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
