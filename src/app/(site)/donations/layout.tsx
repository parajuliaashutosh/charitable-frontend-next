import type { Metadata } from "next";


export const metadata: Metadata = {
  title: {
    template: "%s | Give Hope",
    default: "Donations | Give Hope",
  },
  description: "Donations made by users to Give Hope to support various charitable causes.",
  keywords: ["donations", "donation", "give hope", "educational donations", "clothe donations"],
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