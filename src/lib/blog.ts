// Blog posts carried over from the Squarespace site (June 2022 to April 2024), deduped and cleaned.
// Two posts that quoted specific return figures are held back for compliance review and 301 to /blog.

import posts from "@/content/blog.json";

export type Post = { slug: string; title: string; date: string; description: string; blocks: [string, string][] };

export const allPosts = posts as Post[];
export const getPost = (slug: string) => allPosts.find((p) => p.slug === slug);

/** Posts that use hypothetical numbers or dated tax figures. They show an extra note and need Rise48 Marketing review. */
export const reviewSlugs = new Set([
  "7-eye-opening-things-every-passive-real-estate-investor-should-know-about-taxes",
  "7-things-to-look-for-in-a-real-estate-syndication-investment-summary-how-to-tell-if-its-a-good-opportunity",
  "how-we-protect-your-investment-and-minimize-the-risk",
  "reits-vs-real-estate-funds-whats-the-difference",
  "tax-benefits-of-real-estate-investing",
  "dont-go-chasing-waterfalls",
]);

export const formatDate = (d: string) =>
  new Date(`${d}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
