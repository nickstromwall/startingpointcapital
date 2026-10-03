import type { MetadataRoute } from "next";
import { flags, site } from "@/config/site";
import { guides } from "@/content/guides";
import { allPosts } from "@/lib/blog";
import { getShownEpisodes } from "@/lib/podcast";

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ["", "/about", "/invest", "/book", "/portfolio", "/resources", "/podcast", "/blog", "/sdira", "/newsletter", "/contact", "/disclosures", "/accreditation", "/privacy", "/terms", ...(flags.showPartnerPath ? ["/partner"] : [])];
  const episodes = await getShownEpisodes();
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.8 })),
    ...guides.map((g) => ({ url: `${site.url}/guides/${g.slug}`, changeFrequency: "yearly" as const, priority: 0.7 })),
    ...allPosts.map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: p.date, changeFrequency: "yearly" as const, priority: 0.5 })),
    ...episodes.map((e) => ({ url: `${site.url}/podcast/${e.slug}`, lastModified: e.date, changeFrequency: "yearly" as const, priority: 0.5 })),
  ];
}
