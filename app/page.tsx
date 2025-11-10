import { Book, Heart, Mail, MapPin, Phone, ShoppingBag, Users } from "lucide-react"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="bg-primary text-white">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-8 h-8" fill="white" />
            <span className="text-2xl font-bold">GiveHope</span>
          </div>
          <div className="hidden md:flex gap-6">
            <a href="#about" className="hover:text-secondary transition-colors">
              About
            </a>
            <a href="#donate" className="hover:text-secondary transition-colors">
              Donate
            </a>
            <a href="#organizations" className="hover:text-secondary transition-colors">
              Organizations
            </a>
            <a href="#contact" className="hover:text-secondary transition-colors">
              Contact
            </a>
          </div>
        </nav>

        <div className="container mx-auto px-4 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Make a Difference Today</h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Donate books and clothes to help those in need. Together, we can create positive change.
          </p>
          <a
            href="#donate"
            className="inline-block bg-white text-primary px-8 py-4 rounded-full text-lg font-semibold hover:bg-secondary transition-colors shadow-lg"
          >
            Start Donating
          </a>
        </div>
      </header>

      {/* Stats Section */}
      <section className="bg-card py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-muted-foreground">Books Donated</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">5,000+</div>
              <div className="text-muted-foreground">Clothing Items</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Partner Organizations</div>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section id="donate" className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-card rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-border">
            <h2 className="text-3xl font-bold text-primary mb-6">How to Donate</h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="border-2 border-primary rounded-xl p-6 hover:shadow-lg transition-shadow">
                <Book className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-3 text-foreground">Donate Books</h3>
                <p className="text-muted-foreground mb-4">
                  Share the gift of knowledge. We accept books of all genres - textbooks, novels, children&apos;s books, and
                  more.
                </p>
                <ul className="space-y-2 text-foreground">
                  <li>✓ Educational textbooks</li>
                  <li>✓ Children&apos;s storybooks</li>
                  <li>✓ Fiction & non-fiction</li>
                  <li>✓ Reference materials</li>
                </ul>
              </div>

              <div className="border-2 border-primary rounded-xl p-6 hover:shadow-lg transition-shadow">
                <ShoppingBag className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-3 text-foreground">Donate Clothes</h3>
                <p className="text-muted-foreground mb-4">
                  Clean, gently used clothing can bring warmth and dignity to those in need.
                </p>
                <ul className="space-y-2 text-foreground">
                  <li>✓ Men&apos;s & women&apos;s clothing</li>
                  <li>✓ Children&apos;s apparel</li>
                  <li>✓ Shoes & accessories</li>
                  <li>✓ Winter wear</li>
                </ul>
              </div>
            </div>

            <div className="bg-secondary rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold text-primary mb-4">Donation Process</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold mb-3">
                    1
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Prepare Items</h4>
                  <p className="text-sm text-muted-foreground">Clean and sort your donations</p>
                </div>
                <div>
                  <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold mb-3">
                    2
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Schedule Pickup</h4>
                  <p className="text-sm text-muted-foreground">Contact us for free pickup</p>
                </div>
                <div>
                  <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold mb-3">
                    3
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Make Impact</h4>
                  <p className="text-sm text-muted-foreground">We distribute to those in need</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <a
                href="/donate"
                className="inline-block bg-primary text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary-dark transition-colors shadow-lg"
              >
                Schedule a Pickup
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Organization Section */}
      <section id="organizations" className="py-16 bg-muted">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-card rounded-2xl shadow-lg p-8 md:p-12 border border-border">
            <h2 className="text-3xl font-bold text-primary mb-6">Partner with Us</h2>

            <div className="mb-12">
              <p className="text-lg text-foreground mb-6">
                Are you a registered charity, NGO, or community organization? Partner with GiveHope to receive donations
                that will benefit your community.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start gap-4">
                  <Users className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg text-foreground mb-2">Direct Impact</h3>
                    <p className="text-muted-foreground">Receive donations directly to support your beneficiaries</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Heart className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg text-foreground mb-2">No Cost</h3>
                    <p className="text-muted-foreground">Our platform is completely free for organizations</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-secondary rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold text-primary mb-4">Requirements</h3>
              <ul className="space-y-3 text-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span>Registered non-profit or charitable organization</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span>Valid tax-exempt documentation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span>Clear mission aligned with community service</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span>Ability to pick up or receive donations</span>
                </li>
              </ul>
            </div>

            <div className="text-center">
              <a
                href="/partner"
                className="inline-block bg-primary text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary-dark transition-colors shadow-lg"
              >
                Apply to Partner
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-card py-16 border-t border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Get in Touch</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <MapPin className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Location</h3>
              <p className="text-muted-foreground">
                123 Hope Street
                <br />
                Kathmandu, Nepal
              </p>
            </div>
            <div>
              <Phone className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Phone</h3>
              <p className="text-muted-foreground">+977 1234567890</p>
            </div>
            <div>
              <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Email</h3>
              <p className="text-muted-foreground">info@givehope.org</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-6 h-6" fill="white" />
            <span className="text-xl font-bold">GiveHope</span>
          </div>
          <p className="text-blue-100">Making the world a better place, one donation at a time.</p>
          <p className="text-sm text-blue-200 mt-4">© 2025 GiveHope. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
