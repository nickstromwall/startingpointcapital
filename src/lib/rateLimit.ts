// Small in-memory sliding window limiter for the lead form, so a script cannot flood HubSpot with fake contacts.
// Per server instance (Vercel reuses warm instances), which stops casual abuse. For stronger protection,
// add a Vercel Firewall rate limit rule on /api/lead.

const hits = new Map<string, number[]>();

export function rateLimited(key: string, limit: number, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (v.every((t) => now - t >= windowMs)) hits.delete(k);
  return recent.length > limit;
}

export function clientIp(request: Request) {
  return request.headers.get("x-real-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
}
