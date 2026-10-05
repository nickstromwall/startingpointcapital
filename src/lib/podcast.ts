// On the Rise Podcast episodes, read from the show's RSS feed (Riverside hosting; the old Libsyn feed redirects there).
//
// The feed also carries the Faith Driven Leaders series. Those episodes live on faithdrivenleaderpodcast.com,
// so we filter them out here. The live feed is cached and refreshed daily; if it is unreachable we fall back
// to the committed snapshot (src/content/podcast-snapshot.json) so the site never breaks.
//
// Episode slugs: episodes that existed on the old Squarespace site keep their old slug (see legacy-episodes.json),
// so /episodes/<old-slug> 301s straight to /podcast/<old-slug>.

import https from "node:https";
import snapshot from "@/content/podcast-snapshot.json";
import legacy from "@/content/legacy-episodes.json";
import { podcast } from "@/config/site";

const REVALIDATE = 60 * 60 * 24;
const FAITH_DRIVEN = /faith[\s-]*driven\s+leader|faith drive leaders/i;

export type Episode = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  descriptionHtml: string;
  audioUrl: string | null;
  image: string | null;
  duration: string | null;
};

const decode = (s: string) =>
  s
    .replace(/^<!\[CDATA\[|\]\]>$/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();

const norm = (t: string) => t.toLowerCase().replace(/[^a-z0-9]/g, "");
const slugify = (t: string) =>
  t
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/, "");

const legacyByTitle = legacy.byTitle as Record<string, string>;

function tag(xml: string, name: string) {
  const m = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`));
  return m ? decode(m[1]) : null;
}

function parseFeed(xml: string): Episode[] {
  const used = new Set<string>();
  const out: Episode[] = [];
  for (const [, item] of xml.matchAll(/<item>([\s\S]*?)<\/item>/g)) {
    const title = tag(item, "title");
    const pub = tag(item, "pubDate");
    if (!title || !pub) continue;
    const descriptionHtml = tag(item, "description") ?? "";
    if (FAITH_DRIVEN.test(`${title} ${descriptionHtml}`)) continue;
    let slug = legacyByTitle[norm(title)] ?? slugify(title);
    while (used.has(slug)) slug += "-2";
    used.add(slug);
    out.push({
      slug,
      title,
      date: new Date(pub).toISOString().slice(0, 10),
      descriptionHtml,
      audioUrl: item.match(/<enclosure[^>]*url="([^"]+)"/)?.[1] ?? null,
      image: item.match(/<itunes:image[^>]*href="([^"]+)"/)?.[1] ?? null,
      duration: tag(item, "itunes:duration"),
    });
  }
  return out.sort((a, b) => b.date.localeCompare(a.date));
}

// The raw feed is over 2MB, too large for Next's data cache, so we memoize the parsed list in memory
// for a day per server instance. This keeps the build to one fetch per worker.
// Plain node https (not fetch) so Next does not try to put the 2MB response in its data cache.
function getText(url: string, redirects = 3): Promise<string> {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { timeout: 15000 }, (res) => {
      const { statusCode = 0, headers } = res;
      if (statusCode >= 300 && statusCode < 400 && headers.location && redirects > 0) {
        res.resume();
        resolve(getText(new URL(headers.location, url).toString(), redirects - 1));
        return;
      }
      if (statusCode !== 200) {
        res.resume();
        reject(new Error(`feed ${statusCode}`));
        return;
      }
      res.setEncoding("utf8");
      let body = "";
      res.on("data", (c) => (body += c));
      res.on("end", () => resolve(body));
    });
    req.on("timeout", () => req.destroy(new Error("feed timeout")));
    req.on("error", reject);
  });
}

let memo: { at: number; data: Promise<Episode[]> } | null = null;

export function getEpisodes(): Promise<Episode[]> {
  if (!memo || Date.now() - memo.at > REVALIDATE * 1000) memo = { at: Date.now(), data: loadEpisodes() };
  return memo.data;
}

async function loadEpisodes(): Promise<Episode[]> {
  try {
    const live = parseFeed(await getText(podcast.feed));
    if (live.length >= snapshot.length * 0.8) return live;
  } catch (err) {
    console.warn("[podcast] live feed failed, using snapshot", err);
  }
  return snapshot as Episode[];
}

export async function getEpisode(slug: string) {
  return (await getEpisodes()).find((e) => e.slug === slug);
}

/** The educational series Jeremy runs inside the feed. */
export const isPassiveInvestingMadeSimple = (e: Episode) => /passive investing made simple/i.test(e.title);

/**
 * Episodes that get their own page on SPC: the latest few plus the Passive Investing Made Simple series.
 * New episodes arrive from the feed on their own (refreshed daily), so nobody has to update the site each week.
 */
export async function getShownEpisodes(): Promise<Episode[]> {
  const all = await getEpisodes();
  const latest = all.slice(0, podcast.latestCount);
  const series = all.filter((e) => isPassiveInvestingMadeSimple(e) && !latest.includes(e));
  return [...latest, ...series];
}

/** Plain text summary for cards and meta descriptions. */
export function summary(e: Episode, max = 220) {
  const text = e.descriptionHtml
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8212;|&#8211;|&mdash;|&ndash;|[\u2013\u2014]/g, ", ")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > max ? `${text.slice(0, max).replace(/\s+\S*$/, "")}…` : text;
}

/** Show notes come from the feed (HTML authored by the podcast team). Keep only simple formatting tags. */
export function cleanNotes(html: string) {
  return html
    .replace(/<(script|style|iframe)[\s\S]*?<\/\1>/gi, "")
    .replace(/<(\/?)(?!(?:p|br|ul|ol|li|strong|b|em|i|a)\b)[a-z0-9]+[^>]*>/gi, "")
    // Show notes sometimes link an email address as https://name@domain.com. Turn those into mailto links.
    .replace(/<a\s+[^>]*href="https?:\/\/([^/"@\s]+@[^/"\s]+?)\/?"[^>]*>/gi, '<a href="mailto:$1">')
    .replace(/<a\s+[^>]*href="(https?:\/\/[^"]+)"[^>]*>/gi, '<a href="$1" target="_blank" rel="noopener nofollow">')
    .replace(/\son\w+="[^"]*"/gi, "")
    .replace(/&#8212;|&#8211;|&mdash;|&ndash;|[\u2013\u2014]/g, ", ");
}

export const formatDate = (d: string) =>
  new Date(`${d}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

export const formatDuration = (d: string | null) => {
  if (!d) return null;
  const parts = d.split(":").map(Number);
  const secs = parts.length === 1 ? parts[0] : parts.reduce((a, n) => a * 60 + n, 0);
  return secs ? `${Math.round(secs / 60)} min` : null;
};
