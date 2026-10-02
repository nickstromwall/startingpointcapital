import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Montserrat } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GuidePopup from "@/components/GuidePopup";
import Reveal from "@/components/Reveal";
import { links, site } from "@/config/site";
import "./globals.css";

// Montserrat matches the current site and the logo tagline. Barlow Condensed echoes the condensed SPC wordmark.
// Swap for the brand guide fonts when they arrive (update --font-sans / --font-cond only).
const sans = Montserrat({ variable: "--font-sans", subsets: ["latin"], weight: ["300", "400", "500", "600"], display: "swap" });
const cond = Barlow_Condensed({ variable: "--font-cond", subsets: ["latin"], weight: ["500", "600"], display: "swap" });

const gaId = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Passive Multifamily Real Estate Investing`, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} | Passive Multifamily Real Estate Investing`,
    description: site.description,
    images: [{ url: "/og", width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: "summary_large_image", images: ["/og"] },
  icons: { icon: "/brand/icon.png", apple: "/brand/icon.png" },
  // Beta: keep the preview out of search until Jeremy and Rise48 Marketing approve launch.
  robots: process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true" ? undefined : { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#0e1730" };

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: site.name,
  url: site.url,
  logo: `${site.url}/brand/logo-navy.png`,
  email: site.email,
  telephone: site.phone,
  founder: { "@type": "Person", name: "Jeremy Dyer", sameAs: [links.linkedin] },
  sameAs: [links.linkedin, links.instagram],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${cond.variable}`}>
      <body>
        <a href="#main" className="skip">Skip to content</a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <GuidePopup />
        <Reveal />
      </body>
      {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
    </html>
  );
}
