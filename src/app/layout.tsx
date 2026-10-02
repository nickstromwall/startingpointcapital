import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { GoogleAnalytics } from "@next/third-parties/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GuidePopup from "@/components/GuidePopup";
import Reveal from "@/components/Reveal";
import { links, site } from "@/config/site";
import "./globals.css";

// Montserrat matches the current site and the logo tagline. Barlow Condensed echoes the condensed SPC wordmark.
// Self hosted (src/fonts, latin subset from Google Fonts, OFL) so builds never depend on fetching fonts.
// Swap for the brand guide fonts when they arrive (update --font-sans / --font-cond only).
const sans = localFont({
  variable: "--font-sans",
  src: [{ path: "../fonts/montserrat-300-600-latin.woff2", weight: "300 600", style: "normal" }],
  display: "swap",
});
const cond = localFont({
  variable: "--font-cond",
  src: [
    { path: "../fonts/barlow-condensed-500-latin.woff2", weight: "500", style: "normal" },
    { path: "../fonts/barlow-condensed-600-latin.woff2", weight: "600", style: "normal" },
  ],
  display: "swap",
});

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
