import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyCtaBar from "@/components/layout/StickyCtaBar";
import FloatingChat from "@/components/layout/FloatingChat";
import SocialProofToast from "@/components/sections/SocialProofToast";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "WebsitesForFree | Get A Professional Website Built For Free",
  description:
    "We build your professional website for free. Try it for 10 days — if you love it, continue for just £29/month. No upfront cost, no design fees, cancel anytime.",
  keywords:
    "free website, professional website, small business website, UK website builder, free web design",
  openGraph: {
    title: "WebsitesForFree | Get A Professional Website Built For Free",
    description:
      "We build your professional website for free. Try it for 10 days — if you love it, continue for just £29/month.",
    type: "website",
    locale: "en_GB",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col font-[Inter,sans-serif]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyCtaBar />
        <FloatingChat />
        <SocialProofToast />
      </body>
    </html>
  );
}
