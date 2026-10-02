import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  // Beta previews stay out of search until NEXT_PUBLIC_ALLOW_INDEXING=true at launch.
  if (process.env.NEXT_PUBLIC_ALLOW_INDEXING !== "true") return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/", disallow: ["/api/"] }, sitemap: `${site.url}/sitemap.xml` };
}
