import type { Metadata } from "next";
import { site } from "@/config/site";

/**
 * Per page metadata with a branded share image, so links look good when opened or texted on an iPhone.
 * The image is rendered by /og (src/app/og/route.tsx) from the page title, over real property photography.
 */
// Bump when the share image design changes, so iMessage, LinkedIn, and Facebook fetch the new one.
export const OG_VERSION = "2";

export function pageMeta({
  title,
  description,
  path,
  eyebrow,
  image,
}: {
  title: string;
  description: string;
  path: string;
  eyebrow?: string;
  image?: string;
}): Metadata {
  const og = image ?? `/og?${new URLSearchParams({ title, ...(eyebrow ? { eyebrow } : {}), v: OG_VERSION })}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: path,
      siteName: site.name,
      type: "website",
      images: [{ url: og, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description, images: [og] },
  };
}
