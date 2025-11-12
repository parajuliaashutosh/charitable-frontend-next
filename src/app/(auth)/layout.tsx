// src/app/(auth)/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | GiveHope",
    default: "Authentication | GiveHope",
  },
  description: "Sign in or register to GiveHope - Making a difference together",
  keywords: ["login", "register", "donation", "charity", "GiveHope"],
  authors: [{ name: "GiveHope" }],
  robots: {
    index: false, // Don't index auth pages
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "GiveHope",
    title: "GiveHope Authentication",
    description: "Sign in or register to start making a difference",
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-600 via-blue-500 to-blue-700">
      {children}
    </div>
  );
}