// 301 map from the old Squarespace site. Built from https://www.startingpointcapital.com/sitemap.xml (Oct 1, 2026).
// Next.js emits 308 for `permanent: true`, which search engines treat like a 301.
// Login redirects are temporary (307) until the Fundamental Portal URL is confirmed.

import { book, links, podcast } from "../config/site";

type Redirect = { source: string; destination: string; permanent: boolean };

// Old episode pages for the Faith Driven Leaders series now live on that show's own site.
const faithDrivenEpisodes = ["let-peace-be-your-umpire", "it-was-never-about-the-property", "pay-less-give-more-the-faith-driven-cpa", "bitcoin-through-a-biblical-lens-faith-driven-leaders", "compassionate-capitalism-building-wealth-by-creating-homeowners-with-john-laine", "faith-driven-leaders-with-cameron-clark", "faith-driven-leaders-with-brittany-deroche", "faith-driven-leaders-ryan-sudeck", "faith-driven-leaders-with-will-harvey", "faith-driven-leaders-with-henry-kaestner", "faith-driven-leaders-with-bondo-nyembwe", "faith-wealth-and-generational-impact-the-faith-driven-leaders-with-trey-taylor", "faith-driven-leaders-get-to-know-nick-stromwall", "faith-driven-leaders-series-with-cody-lutz", "faith-driven-leaders-series-with-jasonkish", "faith-driven-leaders-series-with-peter-shi", "faith-driven-leaders-series-with-jono-allen", "introducingthefaithdrivenleadersshow", "the-faith-behind-rise48-equity-zach-haptonstalls-journey", "from-ministry-to-the-sales-floor", "turning-suffering-into-purpose-keegan-oconnor", "a-300m-wealth-managers-case-for-radical-generosity", "my-ego-cost-me-not-my-faith-scott-wilson", "money-as-a-tool-for-the-kingdom", "investments-that-are-about-more-than-just-profits", "anchored-in-faith-not-achievement", "using-business-to-fight-poverty-erik-olson", "wisdom-anxiety-and-growing-your-internal-world-with-paul-poteat", "integrating-faith-into-every-area-of-life-with-dan-rosenblatt", "the-triple-win-framework-with-nick-stromwall", "intentional-fatherhood-with-nick-stromwall", "designing-your-life-backwards-with-nick-stromwall", "live-from-bec"];
// Old episode pages with no match in the current feed.
const retiredEpisodes = ["passive-real-estate-strategies-ideal-wealth-growers-blueprint-to-building-generational-wealth", "unlocking-the-power-of-private-money-transform-your-real-estate-investing-journey"];

export const legacyRedirects: Redirect[] = [
  { source: "/home", destination: "/", permanent: true },
  { source: "/home-test-1", destination: "/", permanent: true },
  { source: "/about-1", destination: "/about", permanent: true },
  { source: "/episodes", destination: "/podcast", permanent: true },
  { source: "/freedompointpodcast", destination: "/podcast", permanent: true },
  { source: "/guide", destination: "/guides/investor-guide", permanent: true },
  { source: "/investor-guide", destination: "/guides/investor-guide", permanent: true },
  { source: "/vettingthedealsponsor", destination: "/guides/investor-guide", permanent: true },
  { source: "/schedule-meeting", destination: "/contact", permanent: true },
  { source: "/newsletter-2", destination: "/newsletter", permanent: true },
  { source: "/thank-you-scan-page", destination: "/invest", permanent: true },
  { source: "/privacy-policy", destination: "/privacy", permanent: true },
  { source: "/social-media-link-landing-page", destination: "/", permanent: true },
  { source: "/freedomcalculator", destination: "/resources", permanent: true },
  { source: "/cart", destination: "/", permanent: true },
  { source: "/store", destination: book.url, permanent: true },
  { source: "/login-option-2", destination: links.investorLogin, permanent: false },
  { source: "/login2", destination: links.investorLogin, permanent: false },
  { source: "/login", destination: links.investorLogin, permanent: false },
  { source: "/blog/7-steps-to-investing-in-your-first-real-estate-syndication-j34lc", destination: "/blog/5-multifamily-investing-mistakes-to-avoid", permanent: true },
  { source: "/blog/a-peek-into-the-projected-returns-in-a-real-estate-syndication", destination: "/blog", permanent: true },
  { source: "/blog/locating-and-vetting-profitablenbspreal-estate-markets", destination: "/blog/locating-and-vetting-profitable-real-estate-markets", permanent: true },
  { source: "/blog/the-team-who-makes-a-real-estate-fund-soar", destination: "/blog/the-team-who-makes-a-real-estate-syndications-soar", permanent: true },
  { source: "/blog/blog-post-title-one-cbahc", destination: "/blog", permanent: true },
  { source: "/portfolio/:slug", destination: "/portfolio", permanent: true },
  ...faithDrivenEpisodes.map((s) => ({ source: `/episodes/${s}`, destination: podcast.faithDrivenLeaders, permanent: true })),
  ...retiredEpisodes.map((s) => ({ source: `/episodes/${s}`, destination: "/podcast", permanent: true })),
  // Every other old episode kept its slug.
  { source: "/episodes/:slug", destination: "/podcast/:slug", permanent: true },
  // Squarespace tag and category pages, and old slugs that contained a slash.
  { source: "/episodes/:path*", destination: "/podcast", permanent: true },
  { source: "/blog/tag/:path*", destination: "/blog", permanent: true },
  { source: "/blog/category/:path*", destination: "/blog", permanent: true },
];
