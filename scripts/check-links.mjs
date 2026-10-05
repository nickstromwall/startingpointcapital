// Site checker: crawls every page from the sitemap and checks internal links, images, anchors, share images,
// meta tags, em dashes in copy, and (with --external) every outbound link.
// Usage: npm run check:links -- https://startingpointcapital.vercel.app --external
const BASE = process.argv[2]?.replace(/\/$/, "") ?? "http://localhost:3200";
const CHECK_EXTERNAL = process.argv.includes("--external");
const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36";
const origin = new URL(BASE).origin;

const pages = new Map(); // path -> {status, html, from:Set}
const assets = new Map(); // url -> {status, from:Set}
const external = new Map(); // url -> {from:Set}
const anchors = []; // {from, path, id}
const issues = [];
const queue = [];

const decode = (s) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'");
const add = (map, key, from) => {
  if (!map.has(key)) map.set(key, { from: new Set() });
  map.get(key).from.add(from);
};

function enqueue(path, from) {
  if (!pages.has(path)) {
    pages.set(path, { from: new Set([from]) });
    queue.push(path);
  } else pages.get(path).from.add(from);
}

async function get(url, opts = {}) {
  const res = await fetch(url, { redirect: "manual", headers: { "User-Agent": UA }, signal: AbortSignal.timeout(20000), ...opts });
  return res;
}

async function crawlPage(path) {
  const rec = pages.get(path);
  let url = origin + path;
  let res;
  let hops = 0;
  try {
    res = await get(url);
    while (res.status >= 300 && res.status < 400 && hops < 5) {
      const loc = new URL(res.headers.get("location"), url);
      rec.redirect = (rec.redirect ? rec.redirect + " -> " : "") + loc.href;
      if (loc.origin !== origin) { rec.status = res.status; rec.externalRedirect = true; add(external, loc.href, path); return; }
      url = loc.href; hops++;
      res = await get(url);
    }
  } catch (e) {
    rec.status = "ERR " + e.message;
    return;
  }
  rec.status = res.status;
  rec.final = new URL(url).pathname;
  const type = res.headers.get("content-type") ?? "";
  if (!type.includes("text/html")) return;
  const html = await res.text();
  rec.html = html;

  // Links
  for (const [, raw] of html.matchAll(/<a\b[^>]*\shref="([^"]+)"/g)) {
    const href = decode(raw);
    if (/^(mailto:|tel:|javascript:)/.test(href)) { add(external, href, path); continue; }
    const u = new URL(href, origin + rec.final);
    if (u.origin === origin) {
      if (u.hash && u.pathname === rec.final) anchors.push({ from: path, path: u.pathname, id: decodeURIComponent(u.hash.slice(1)) });
      else if (u.hash) anchors.push({ from: path, path: u.pathname, id: decodeURIComponent(u.hash.slice(1)) });
      enqueue(u.pathname + u.search, path);
    } else add(external, u.href.replace(/#.*$/, ""), path);
  }
  // Assets: img src/srcset, link icons/css, script src, meta og/twitter images, iframes
  for (const [, raw] of html.matchAll(/<img\b[^>]*\ssrc="([^"]+)"/g)) add(assets, new URL(decode(raw), origin).href, path);
  for (const [, raw] of html.matchAll(/\ssrcset="([^"]+)"/g)) for (const part of decode(raw).split(",")) {
    const u = part.trim().split(/\s+/)[0]; if (u) add(assets, new URL(u, origin).href, path);
  }
  for (const [, raw] of html.matchAll(/<link\b[^>]*\shref="([^"]+)"[^>]*>/g)) {
    const u = new URL(decode(raw), origin); if (u.origin === origin && !/canonical|alternate/.test(raw)) add(assets, u.href, path);
  }
  for (const [, raw] of html.matchAll(/<script\b[^>]*\ssrc="([^"]+)"/g)) add(assets, new URL(decode(raw), origin).href, path);
  for (const [, raw] of html.matchAll(/<iframe\b[^>]*\ssrc="([^"]+)"/g)) add(external, decode(raw), path);
  const og = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
  rec.og = og ? decode(og) : null;
  if (og) add(assets, decode(og), path + " (og:image)");

  // Page checks
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
  if (!title) issues.push(`[${path}] missing <title>`);
  if (!/<meta name="description" content="[^"]{20,}"/.test(html)) issues.push(`[${path}] missing/short meta description`);
  if (!og) issues.push(`[${path}] missing og:image`);
  const h1s = (html.match(/<h1\b/g) || []).length;
  if (h1s !== 1) issues.push(`[${path}] has ${h1s} <h1> elements`);
  const text = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, "").replace(/<[^>]+>/g, " ");
  const dash = text.match(/.{0,40}[–—].{0,40}/);
  if (dash) issues.push(`[${path}] em/en dash in copy: "${dash[0].replace(/\s+/g, " ").trim()}"`);
  for (const [, alt] of html.matchAll(/<img\b(?![^>]*\salt=)[^>]*>/g)) issues.push(`[${path}] <img> without alt`);
  if (/>\s*(undefined|null|NaN|\[object Object\])\s*</.test(html)) issues.push(`[${path}] renders undefined/null/NaN`);
  if (/TODO|CONFIRM|lorem ipsum/i.test(text)) issues.push(`[${path}] visible TODO/CONFIRM/lorem text: ${text.match(/.{0,40}(TODO|CONFIRM|lorem ipsum).{0,40}/i)[0].trim()}`);
}

async function pool(items, n, fn) {
  const it = items[Symbol.iterator]();
  await Promise.all(Array.from({ length: n }, async () => { for (const x of it) await fn(x); }));
}

// Seed from sitemap and home.
const sm = await (await fetch(`${BASE}/sitemap.xml`)).text();
for (const [, loc] of sm.matchAll(/<loc>([^<]+)<\/loc>/g)) enqueue(new URL(loc).pathname, "sitemap");
enqueue("/", "seed");
while (queue.length) {
  const batch = queue.splice(0, queue.length);
  await pool(batch, 8, crawlPage);
}

// Anchors
for (const a of anchors) {
  const p = pages.get(a.path);
  if (!p?.html) continue;
  if (!new RegExp(`id="${a.id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`).test(p.html)) issues.push(`[${a.from}] anchor #${a.id} not found on ${a.path}`);
}

// Assets
await pool([...assets.keys()], 10, async (u) => {
  try {
    const r = await fetch(u, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(20000) });
    assets.get(u).status = r.status;
    const len = Number(r.headers.get("content-length") || (await r.arrayBuffer()).byteLength);
    assets.get(u).size = len;
    if (r.status !== 200) issues.push(`asset ${r.status}: ${u} (from ${[...assets.get(u).from][0]})`);
  } catch (e) { issues.push(`asset ERR ${u}: ${e.message}`); }
});

// External links
const extResults = [];
if (CHECK_EXTERNAL) {
  await pool([...external.keys()].filter((u) => /^https?:/.test(u)), 6, async (u) => {
    let status;
    try {
      let r = await fetch(u, { method: "GET", redirect: "follow", headers: { "User-Agent": UA, Accept: "text/html,*/*" }, signal: AbortSignal.timeout(20000) });
      status = r.status;
    } catch (e) { status = "ERR " + (e.cause?.code || e.message); }
    extResults.push({ u, status, from: [...external.get(u).from].slice(0, 3) });
  });
}

// Report
const bad = [...pages.entries()].filter(([, r]) => !(r.status === 200 || r.externalRedirect));
const report = {
  base: BASE,
  pagesCrawled: pages.size,
  htmlPages: [...pages.values()].filter((r) => r.html).length,
  badPages: bad.map(([p, r]) => ({ path: p, status: r.status, redirect: r.redirect, from: [...r.from].slice(0, 3) })),
  redirects: [...pages.entries()].filter(([, r]) => r.redirect).map(([p, r]) => `${p} -> ${r.redirect}`),
  assetsChecked: assets.size,
  bigAssets: [...assets.entries()].filter(([, a]) => a.size > 400_000).map(([u, a]) => `${Math.round(a.size / 1024)}KB ${u}`),
  externalCount: external.size,
  externalProblems: extResults.filter((r) => !(typeof r.status === "number" && r.status < 400)).sort((a, b) => a.u.localeCompare(b.u)),
  externalOk: extResults.filter((r) => typeof r.status === "number" && r.status < 400).length,
  mailtoTel: [...external.keys()].filter((u) => /^(mailto|tel):/.test(u)),
  issues: [...new Set(issues)],
};
console.log(JSON.stringify(report, null, 1));
