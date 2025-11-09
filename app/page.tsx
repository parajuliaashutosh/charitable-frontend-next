import { Book, Heart, Mail, MapPin, Phone, ShoppingBag, Users } from 'lucide-react';

export default function CharitablePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="bg-[#002868] text-white">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-8 h-8" fill="white" />
            <span className="text-2xl font-bold">GiveHope</span>
          </div>
          <div className="hidden md:flex gap-6">
            <a href="#about" className="hover:text-blue-200 transition">About</a>
            <a href="#donate" className="hover:text-blue-200 transition">Donate</a>
            <a href="#organizations" className="hover:text-blue-200 transition">Organizations</a>
            <a href="#contact" className="hover:text-blue-200 transition">Contact</a>
          </div>
        </nav>
        
        <div className="container mx-auto px-4 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Make a Difference Today</h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Donate books and clothes to help those in need. Together, we can create positive change.
          </p>
          <a 
            href="#donate"
            className="inline-block bg-white text-[#002868] px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-50 transition shadow-lg"
          >
            Start Donating
          </a>
        </div>
      </header>

      {/* Stats Section */}
      <section className="bg-white py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#002868] mb-2">10,000+</div>
              <div className="text-gray-600">Books Donated</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#002868] mb-2">5,000+</div>
              <div className="text-gray-600">Clothing Items</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#002868] mb-2">50+</div>
              <div className="text-gray-600">Partner Organizations</div>
            </div>
          </div>
        </div>
      </section>

      {/* Donor Section */}
      <section id="donate" className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-bold text-[#002868] mb-6">How to Donate</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="border-2 border-[#002868] rounded-xl p-6 hover:shadow-lg transition">
                <Book className="w-12 h-12 text-[#002868] mb-4" />
                <h3 className="text-2xl font-bold mb-3">Donate Books</h3>
                <p className="text-gray-600 mb-4">
                  Share the gift of knowledge. We accept books of all genres - textbooks, novels, children's books, and more.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Educational textbooks</li>
                  <li>✓ Children's storybooks</li>
                  <li>✓ Fiction & non-fiction</li>
                  <li>✓ Reference materials</li>
                </ul>
              </div>

              <div className="border-2 border-[#002868] rounded-xl p-6 hover:shadow-lg transition">
                <ShoppingBag className="w-12 h-12 text-[#002868] mb-4" />
                <h3 className="text-2xl font-bold mb-3">Donate Clothes</h3>
                <p className="text-gray-600 mb-4">
                  Clean, gently used clothing can bring warmth and dignity to those in need.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Men's & women's clothing</li>
                  <li>✓ Children's apparel</li>
                  <li>✓ Shoes & accessories</li>
                  <li>✓ Winter wear</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold text-[#002868] mb-4">Donation Process</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="w-10 h-10 bg-[#002868] text-white rounded-full flex items-center justify-center font-bold mb-3">1</div>
                  <h4 className="font-semibold mb-2">Prepare Items</h4>
                  <p className="text-sm text-gray-600">Clean and sort your donations</p>
                </div>
                <div>
                  <div className="w-10 h-10 bg-[#002868] text-white rounded-full flex items-center justify-center font-bold mb-3">2</div>
                  <h4 className="font-semibold mb-2">Schedule Pickup</h4>
                  <p className="text-sm text-gray-600">Contact us for free pickup</p>
                </div>
                <div>
                  <div className="w-10 h-10 bg-[#002868] text-white rounded-full flex items-center justify-center font-bold mb-3">3</div>
                  <h4 className="font-semibold mb-2">Make Impact</h4>
                  <p className="text-sm text-gray-600">We distribute to those in need</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <a href="/donate" className="inline-block bg-[#002868] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#001a4d] transition shadow-lg">
                Schedule a Pickup
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Organization Section */}
      <section id="organizations" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-[#002868] mb-6">Partner with Us</h2>
            
            <div className="mb-12">
              <p className="text-lg text-gray-700 mb-6">
                Are you a registered charity, NGO, or community organization? Partner with GiveHope to receive donations that will benefit your community.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start gap-4">
                  <Users className="w-8 h-8 text-[#002868] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">Direct Impact</h3>
                    <p className="text-gray-600">Receive donations directly to support your beneficiaries</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Heart className="w-8 h-8 text-[#002868] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">No Cost</h3>
                    <p className="text-gray-600">Our platform is completely free for organizations</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold text-[#002868] mb-4">Requirements</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-[#002868] font-bold">✓</span>
                  <span>Registered non-profit or charitable organization</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#002868] font-bold">✓</span>
                  <span>Valid tax-exempt documentation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#002868] font-bold">✓</span>
                  <span>Clear mission aligned with community service</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#002868] font-bold">✓</span>
                  <span>Ability to pick up or receive donations</span>
                </li>
              </ul>
            </div>

            <div className="text-center">
              <a href="/partner" className="inline-block bg-[#002868] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#001a4d] transition shadow-lg">
                Apply to Partner
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-white py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-[#002868] mb-12">Get in Touch</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <MapPin className="w-8 h-8 text-[#002868] mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Location</h3>
              <p className="text-gray-600">123 Hope Street<br />Kathmandu, Nepal</p>
            </div>
            <div>
              <Phone className="w-8 h-8 text-[#002868] mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Phone</h3>
              <p className="text-gray-600">+977 1234567890</p>
            </div>
            <div>
              <Mail className="w-8 h-8 text-[#002868] mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-gray-600">info@givehope.org</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#002868] text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-6 h-6" fill="white" />
            <span className="text-xl font-bold">GiveHope</span>
          </div>
          <p className="text-blue-200">Making the world a better place, one donation at a time.</p>
          <p className="text-sm text-blue-300 mt-4">© 2025 GiveHope. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}