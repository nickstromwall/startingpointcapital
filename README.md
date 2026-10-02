# startingpointcapital.com

Beta rebuild of the Starting Point Capital website. Next.js 16 (App Router), CSS Modules, deployed on Vercel.
The build brief (BRIEF.md) is kept out of git because it contains private call notes. Get it from the shared Drive folder "AI/startingpoint capital website refresh" and drop it in the project root.

## Where to change things

| What | Where |
|---|---|
| Stats, links, team, Rise48 numbers, feature flags, disclaimer | `src/config/site.ts` |
| Brand colors and fonts | `src/app/globals.css` (`:root` tokens) and `src/app/layout.tsx` (fonts) |
| Portfolio | `src/content/portfolio.json` + photos in `public/properties/` |
| Lead magnet guides (`/guides/[slug]`) | `src/content/guides.ts` |
| Blog posts (carried over from Squarespace) | `src/content/blog.json` |
| Podcast | Live from the On the Rise RSS feed, Faith Driven Leaders filtered out (`src/lib/podcast.ts`) |
| Old URL redirects | `src/lib/redirects.ts` |

## Environment variables (Vercel)

| Variable | Purpose |
|---|---|
| `LEAD_PROVIDER` | `hubspot` or `ghl`. Unset = test mode (leads accepted and logged, not forwarded). |
| `HUBSPOT_PORTAL_ID`, `HUBSPOT_FORM_ID` | HubSpot Forms API target (see `src/app/api/lead/route.ts` for field names). |
| `GHL_WEBHOOK_URL` | GoHighLevel inbound webhook, if switching to GHL. |
| `TEST_WEBHOOK_URL` | Optional mirror of every lead (for example webhook.site) while testing. |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 measurement ID. |
| `NEXT_PUBLIC_ALLOW_INDEXING` | Set to `true` at launch. Until then the site is `noindex` and robots disallow all. |

## Before launch (CONFIRM items from the brief)

- [ ] Jeremy's brand guide: swap tokens in `globals.css` and fonts in `layout.tsx`. Logo is pulled from the current site.
- [ ] Stats marked `confirmed: false` in `site.ts` (deals 50+, LP 75+, $1B+ assets). Capital raised $100M+ and 8,000+ doors are confirmed.
- [ ] Which Rise48 stat set Rise48 Marketing approves (`rise48.approvedSet`).
- [ ] Team roster (Brad, liaisons, whether Nick appears), Jerry's Calendly link.
- [ ] Calendly link for Jeremy (or one routing link).
- [ ] Fundamental Portal login URL and any other portals.
- [ ] Partner With Us path on SPC (`flags.showPartnerPath`).
- [ ] Public portfolio names vs gated (`flags.publicPortfolioNames`, currently gated).
- [ ] SDIRA partner: Midland Trust (current) or Heritage IRA.
- [ ] Investor Guide PDF location; CPA review of the 1031 guide.
- [ ] Blog posts flagged in `src/lib/blog.ts` (`reviewSlugs`) and the two held back for return figures.
- [ ] Legal pages are drafts: counsel review.
- [ ] Rise48 Equity Marketing review (give them a few days).
- [ ] Google Business Profile, then `links.googleReviews` and `flags.showReviews`.
- [ ] Point the domain at Vercel and set `NEXT_PUBLIC_ALLOW_INDEXING=true`.

## Checks before every handoff

```bash
npm run lint && npx tsc --noEmit && npm run check:dashes && npm run build
```
