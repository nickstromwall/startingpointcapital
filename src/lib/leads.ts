// Receives every form on the site and forwards it to the CRM.
//
// Default: HubSpot. Each lead is submitted to the "SPC Lead Gen - Newsletter Form" in the Rise48 portal and tagged
// "SPC Newsletter/Prospect" (see `hubspot` in src/config/site.ts), which starts the SPC email sequence.
// The site never sets "SPC Investor"; the team adds that in HubSpot once someone invests.
//
// Optional HUBSPOT_TOKEN (private app, contacts read scope): the site first reads the contact's existing tags so a
// form submission never wipes them. Without it, the Tags field on an existing contact is replaced by the prospect tag.
//
// Other providers, by env var:
//   LEAD_PROVIDER=ghl   -> GoHighLevel inbound webhook. Needs GHL_WEBHOOK_URL.
//   LEAD_PROVIDER=test  -> leads are accepted and logged, not forwarded. Use for local work.
// Optional TEST_WEBHOOK_URL mirrors every lead to a test endpoint while verifying.

import { hubspot, site } from "@/config/site";

export async function forwardLead(lead: Lead, cookie: string | null) {
  const provider = (process.env.LEAD_PROVIDER ?? "hubspot").toLowerCase();
  try {
    if (process.env.TEST_WEBHOOK_URL) await post(process.env.TEST_WEBHOOK_URL, lead).catch(() => {});
    if (provider === "hubspot") await toHubSpot(lead, cookie);
    else if (provider === "ghl") await post(requireEnv("GHL_WEBHOOK_URL"), lead);
    else {
      console.warn("[lead] test mode, lead accepted but not forwarded", { source: lead.source, intent: lead.intent });
      return { ok: true, forwarded: false };
    }
    console.info("[lead] forwarded", { provider, source: lead.source, intent: lead.intent });
    return { ok: true, forwarded: true };
  } catch (err) {
    console.error("[lead] forward failed", err);
    return { ok: false, forwarded: false };
  }
}

function requireEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`${name} is not set`);
  return v;
}

async function post(url: string, data: unknown) {
  const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
  if (!res.ok) throw new Error(`${new URL(url).host} responded ${res.status}: ${(await res.text()).slice(0, 500)}`);
}

export type Lead = {
  email: string; firstName?: string; lastName?: string; phone?: string; consent: boolean; newsletter: boolean; accredited?: string;
  source: string; intent: string; resource?: string; message?: string; page?: string; utm: Record<string, string>;
};

/**
 * The Tags value to submit, or undefined to leave Tags alone.
 * Without HUBSPOT_TOKEN we cannot see existing tags, so we submit only the prospect tag.
 * With it, existing tags are kept, and anyone already tagged SPC Investor is not put back into the prospect sequence.
 */
async function tagsFor(email: string): Promise<string | undefined> {
  const token = process.env.HUBSPOT_TOKEN;
  if (!token) return hubspot.prospectTag;
  const res = await fetch(
    `https://api.hubapi.com/crm/v3/objects/contacts/${encodeURIComponent(email)}?idProperty=email&properties=${hubspot.tagProperty}`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  if (res.status === 404) return hubspot.prospectTag;
  if (!res.ok) throw new Error(`HubSpot contact lookup responded ${res.status}`);
  const current = String((await res.json()).properties?.[hubspot.tagProperty] ?? "").split(";").filter(Boolean);
  if (current.includes(hubspot.investorTag) || current.includes(hubspot.prospectTag)) return undefined;
  return [...current, hubspot.prospectTag].join(";");
}

async function toHubSpot(lead: Lead, cookie: string | null) {
  const portal = process.env.HUBSPOT_PORTAL_ID || hubspot.portalId;
  const form = process.env.HUBSPOT_FORM_ID || hubspot.formId;
  const fields: Record<string, string | undefined> = {
    email: lead.email,
    firstname: lead.firstName,
    lastname: lead.lastName,
    phone: lead.phone,
    message: [lead.message, `Website form: ${lead.source} (${lead.intent})`, lead.resource ? `Resource: ${lead.resource}` : "", lead.accredited ? `Accredited: ${lead.accredited}` : ""]
      .filter(Boolean)
      .join("\n"),
    [hubspot.tagProperty]: await tagsFor(lead.email),
    ...Object.fromEntries(Object.entries(lead.utm).map(([k, v]) => [hubspot.utmProperties[k], v]).filter(([k]) => k)),
  };
  const hutk = cookie?.match(/hubspotutk=([^;]+)/)?.[1];
  await post(`https://api.hsforms.com/submissions/v3/integration/submit/${portal}/${form}`, {
    fields: Object.entries(fields).filter(([, v]) => v).map(([name, value]) => ({ objectTypeId: "0-1", name, value })),
    context: { pageUri: `${site.url}${lead.page ?? "/"}`, pageName: `Starting Point Capital: ${lead.source}`, ...(hutk ? { hutk } : {}) },
    legalConsentOptions: lead.consent
      ? { consent: { consentToProcess: true, text: "I agree to receive emails, texts, and calls from Starting Point Capital." } }
      : undefined,
  });
}
