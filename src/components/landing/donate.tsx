import { Book, ShoppingBag } from "lucide-react";

export default function Donate() {
  return (
    <section id="donate" className="py-16 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-card rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-border">
          <h2 className="text-3xl font-bold text-primary mb-6">
            How to Donate
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="border-2 border-primary rounded-xl p-6 hover:shadow-lg transition-shadow">
              <Book className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-3 text-foreground">
                Donate Books
              </h3>
              <p className="text-muted-foreground mb-4">
                Share the gift of knowledge. We accept books of all genres -
                textbooks, novels, children&apos;s books, and more.
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
              <h3 className="text-2xl font-bold mb-3 text-foreground">
                Donate Clothes
              </h3>
              <p className="text-muted-foreground mb-4">
                Clean, gently used clothing can bring warmth and dignity to
                those in need.
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
            <h3 className="text-xl font-bold text-primary mb-4">
              Donation Process
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold mb-3">
                  1
                </div>
                <h4 className="font-semibold text-foreground mb-2">
                  Prepare Items
                </h4>
                <p className="text-sm text-muted-foreground">
                  Clean and sort your donations
                </p>
              </div>
              <div>
                <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold mb-3">
                  2
                </div>
                <h4 className="font-semibold text-foreground mb-2">
                  Schedule Pickup
                </h4>
                <p className="text-sm text-muted-foreground">
                  Contact us for free pickup
                </p>
              </div>
              <div>
                <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold mb-3">
                  3
                </div>
                <h4 className="font-semibold text-foreground mb-2">
                  Make Impact
                </h4>
                <p className="text-sm text-muted-foreground">
                  We distribute to those in need
                </p>
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
  );
}
