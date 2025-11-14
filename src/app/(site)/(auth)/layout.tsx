import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Give Hope",
    default: "Authentication | Give Hope",
  },
  description: "Sign in or register to Give Hope - Making a difference together",
  keywords: ["login", "register", "donation", "charity", "Give Hope"],
  authors: [{ name: "Give Hope" }],
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Give Hope",
    title: "Give Hope Authentication",
    description: "Sign in or register to start making a difference",
  },
};


export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left Side - Images & Message */}
        <div className="hidden lg:flex flex-col justify-center items-center px-8 py-12 bg-gradient-to-br from-primary/5 to-primary/10 relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 text-center max-w-md">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Welcome Back</h1>
            <p className="text-lg text-muted-foreground mb-12">
              Join a community making real impact. Your contribution can create meaningful change.
            </p>

            {/* Floating Images Grid */}
            <div className="relative w-full h-96 flex items-center justify-center">
              {/* Image 1 - Top Left */}
              <div className="absolute top-0 left-8 w-24 h-24 rounded-full overflow-hidden border-4 border-background shadow-lg transform -rotate-12 hover:scale-110 transition-transform">
                <img src="/landing/girl_receiving_books.webp" alt="A Nepali Girl Receiving books" className="w-full h-full object-cover" />
              </div>

              {/* Image 2 - Top Right */}
              <div className="absolute top-12 right-12 w-20 h-20 rounded-full overflow-hidden border-4 border-background shadow-lg transform rotate-12 hover:scale-110 transition-transform">
                <img
                  src="/"
                  alt="People collaborating"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Image 3 - Center */}
              <div className="absolute w-32 h-32 rounded-full overflow-hidden border-4 border-background shadow-xl hover:scale-110 transition-transform">
                <img src="/landing/kid.webp" alt="Happy Kid" className="w-full h-full object-cover" />
              </div>

              {/* Image 4 - Bottom Left */}
              <div className="absolute bottom-8 left-0 w-20 h-20 rounded-full overflow-hidden border-4 border-background shadow-lg transform -rotate-6 hover:scale-110 transition-transform">
                <img src="/" alt="Community giving" className="w-full h-full object-cover" />
              </div>

              {/* Image 5 - Bottom Right */}
              <div className="absolute bottom-16 right-8 w-24 h-24 rounded-full overflow-hidden border-4 border-background shadow-lg transform rotate-6 hover:scale-110 transition-transform">
                <img src="/landing/receiving_books.webp" alt="Volunteers working" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Stats or Message */}
            <div className="mt-16 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground mb-2">Join thousands of supporters</p>
              <p className="text-2xl font-bold text-primary">Changing lives together</p>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex flex-col justify-center items-center px-4 sm:px-8">{children}</div>
      </div>
    </div>
  )
}
