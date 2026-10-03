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

## v2 decisions (Jeremy, Oct 3, 2026)

| Question | Decision | Where it shows up |
|---|---|---|
| Main action | Request access, then book a call, then the newsletter | `cta` in `site.ts`; header button, hero, CTA band, `/book` |
| Audience | Retail investors first, capital partners second | Investor path leads every page; "Partner With Us" in nav, a homepage band, and `/partner` with its own booking |
| Team | Jeremy is the lead voice, then Jerry, Nathan, Drew, Brad, Marlene | `team` order in `site.ts`; story and About written in Jeremy's first person |
| Rise48 | "Powered by Rise48 Equity," Elevest style; no Rise48 Marketing approval needed | Slim `PoweredBy` band on Home, full block on About, "Operated by Rise48 Equity" on Rise deals in the portfolio |
| Gating | The form unlocks lead magnets, the newsletter, and the current portfolio | `AccessForm` sends `newsletter: true` (tag `newsletter:subscribed`) |
| Story | "I am one of them," family, W2 and commission checks to passive income, active ownership, then passive as the family got busy | `StoryBlock` and `/about` |
| Lead magnets | Investor Guide first, then Passive Investing Made Simple, the book, the sales professionals guide | `ResourceCards`, guide order in `guides.ts` |
| Podcast | Only the latest few on SPC | `podcast.latestCount`; older episode URLs 308 to `/podcast` |
| Faith | Stays in the podcast | `flags.faithForward = false` |
| Success metric | Calls booked with investors and capital partners | GA4 `call_booked` with `location` of `book-investor`, `book-partner`, or `partner` |

**Podcast upkeep:** none. Episodes come from the RSS feed and refresh once a day, so publishing an episode on Riverside is the only step. Set `latestCount` to show more or fewer.

**30 email drip:** every access, guide, and newsletter signup is tagged `newsletter:subscribed` (HubSpot field `newsletter_opt_in`). Build the drip as a HubSpot workflow triggered by that tag.

## Environment variables (Vercel)

| Variable | Purpose |
|---|---|
| `LEAD_PROVIDER` | `hubspot` or `ghl`. Unset = test mode (leads accepted and logged, not forwarded). |
| `HUBSPOT_PORTAL_ID`, `HUBSPOT_FORM_ID` | HubSpot Forms API target (see `src/app/api/lead/route.ts` for field names). |
| `GHL_WEBHOOK_URL` | GoHighLevel inbound webhook, if switching to GHL. |
| `TEST_WEBHOOK_URL` | Optional mirror of every lead (for example webhook.site) while testing. |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 measurement ID. |
| `NEXT_PUBLIC_SITE_URL` | Set to `https://www.startingpointcapital.com` at launch so share images and canonicals use the real domain. |
| `NEXT_PUBLIC_ALLOW_INDEXING` | Set to `true` at launch. Until then the site is `noindex` and robots disallow all. |

## Before launch (CONFIRM items from the brief)

- [ ] Jeremy's brand guide: swap tokens in `globals.css` and fonts in `layout.tsx`. Logo is pulled from the current site.
- [ ] Stats marked `confirmed: false` in `site.ts` (deals 50+, LP 75+, $1B+ assets). Capital raised $100M+ and 8,000+ doors are confirmed.
- [x] Rise48 Marketing approval is not needed (Jeremy, Oct 3). Using the published rise48equity.com figures (`rise48.approvedSet = "A"`).
- [ ] Brad's exact title, and Jerry's Calendly link.
- [ ] Calendly link for Jeremy (or one routing link), plus a separate capital partner event for `links.calendlyPartner` so partner bookings count on their own.
- [ ] Load Jeremy's 30 email drip into HubSpot, triggered by `newsletter:subscribed`.
- [ ] Jeremy reads the first person story copy (home and About) and edits anything that does not sound like him.
- [ ] Fundamental Portal login URL and any other portals.
- [x] Partner With Us path stays on SPC, second to investors.
- [x] Portfolio stays gated behind the access form.
- [ ] SDIRA partner: Midland Trust (current) or Heritage IRA.
- [ ] Investor Guide PDF location; CPA review of the 1031 guide.
- [ ] Blog posts flagged in `src/lib/blog.ts` (`reviewSlugs`) and the two held back for return figures.
- [ ] Legal pages are drafts: counsel review.
- [ ] Google Business Profile, then `links.googleReviews` and `flags.showReviews`.
- [ ] Point the domain at Vercel and set `NEXT_PUBLIC_ALLOW_INDEXING=true`.

## Checks before every handoff

```bash
npm run lint && npx tsc --noEmit && npm run check:dashes && npm run build
```
