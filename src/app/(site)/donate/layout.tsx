import type { Metadata } from "next";


export const metadata: Metadata = {
  title: {
    template: "%s | Give Hope",
    default: "Donate | Give Hope",
  },
  description: "Make a donation to Give Hope and help us create a better world together.",
  keywords: ["donate", "charity", "give hope", "support", "cause"],
  authors: [{ name: "Give Hope" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Give Hope",
    title: "Donate to Give Hope",
    description: "Make a donation to start making a difference today",
  },
};

export default function DonateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-background">{children}</div>;
}