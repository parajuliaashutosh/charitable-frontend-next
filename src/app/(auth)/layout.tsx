// src/app/(auth)/layout.tsx
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: {
    template: "%s | SKS Funding",
    default: "Authentication | SKS Funding",
  },
  description: "Sign in or register to SKS Funding - Making a difference together",
  keywords: ["login", "register", "donation", "charity", "SKS Funding"],
  authors: [{ name: "SKS Funding" }],
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "SKS Funding",
    title: "SKS Funding Authentication",
    description: "Sign in or register to start making a difference",
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Inspiring Images and Content */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary-light to-primary-lighter relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          {/* Logo and Brand */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              <span className="text-2xl font-bold">SKS Funding</span>
            </div>

            <h2 className="text-4xl font-bold mb-4 leading-tight">
              Your contribution can make happiness on peoples face
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Join our community of donors and organizations making a real difference in the world.
            </p>
          </div>

          {/* Inspiring Images Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="relative h-40 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
              <Image
                src="/api/placeholder/400/320"
                alt="Happy family receiving support"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-40 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
              <Image
                src="/api/placeholder/400/320"
                alt="Children smiling at school"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-40 rounded-2xl overflow-hidden shadow-2xl col-span-2 transform hover:scale-105 transition-transform duration-300">
              <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent" />
              <Image
                src="/api/placeholder/800/320"
                alt="Community gathering"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Stats or Social Proof */}
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">10K+</div>
              <div className="text-sm text-white/80">Happy Donors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">500+</div>
              <div className="text-sm text-white/80">Organizations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">$2M+</div>
              <div className="text-sm text-white/80">Donations</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form Content */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 md:p-8 bg-background">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}