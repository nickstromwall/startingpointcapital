// Receives every form on the site and forwards it to the CRM.
//
// The provider is swappable with one env var, because a Rise wide HubSpot to GoHighLevel move is being discussed:
//   LEAD_PROVIDER=hubspot  -> HubSpot Forms API. Needs HUBSPOT_PORTAL_ID and HUBSPOT_FORM_ID.
//                             Create the form in HubSpot with these fields: firstname, lastname, email, phone,
//                             accredited_investor, lead_source, lead_intent, resource, utm_source, utm_medium,
//                             utm_campaign, utm_term, utm_content. Katie's workflows then pick it up.
//   LEAD_PROVIDER=ghl      -> GoHighLevel inbound webhook. Needs GHL_WEBHOOK_URL. Branch on `tags` in the workflow.
//   (unset)                -> test mode: the lead is accepted and logged, not forwarded. Good for previews.
//
// Optional TEST_WEBHOOK_URL mirrors every lead to a test endpoint (for example webhook.site) while we verify.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

type LeadBody = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  consent?: boolean;
  accredited?: string; // follow up answer: "yes" | "no" | "unsure"
  source?: string; // which form: access, guide, newsletter, contact, partner, popup
  intent?: string; // investor | partner
  resource?: string;
  message?: string;
  page?: string;
  utm?: Partial<Record<(typeof UTM_KEYS)[number], string>>;
  website?: string; // honeypot
};

const clip = (v: unknown, n: number) => (typeof v === "string" ? v.trim().slice(0, n) : "");
const tagSafe = (v: string) => v.replace(/[^a-z0-9-]/gi, "").slice(0, 60);

export async function POST(request: Request) {
  let body: LeadBody;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
  if (body.website) return Response.json({ ok: true }); // bots fill hidden fields

  const email = clip(body.email, 254).toLowerCase();
  const firstName = clip(body.firstName, 80);
  const lastName = clip(body.lastName, 80);
  const phone = clip(body.phone, 40);
  const source = tagSafe(body.source ?? "website") || "website";
  const intent = body.intent === "partner" ? "partner" : "investor";
  const resource = body.resource ? tagSafe(body.resource) : undefined;
  const accredited = ["yes", "no", "unsure"].includes(body.accredited ?? "") ? body.accredited : undefined;
  const isFollowUp = source === "accredited-followup";

  if (!EMAIL_RE.test(email)) return Response.json({ ok: false, error: "Please enter a valid email." }, { status: 400 });
  if (!isFollowUp && !firstName) return Response.json({ ok: false, error: "Please enter your first name." }, { status: 400 });

  const utm = Object.fromEntries(UTM_KEYS.map((k) => [k, clip(body.utm?.[k], 120)]).filter(([, v]) => v));
  const tags = [
    `source:${source}`,
    `intent:${intent}`,
    ...(resource ? [`resource:${resource}`] : []),
    ...(accredited ? [`accredited:${accredited}`] : []),
    ...(body.consent ? ["consent:email-sms-calls"] : []),
  ];
  const lead = {
    email,
    firstName: firstName || undefined,
    lastName: lastName || undefined,
    phone: phone || undefined,
    consent: Boolean(body.consent),
    accredited,
    source,
    intent,
    resource,
    message: clip(body.message, 2000) || undefined,
    page: clip(body.page, 200) || undefined,
    utm,
    tags,
    submittedAt: new Date().toISOString(),
  };

  const provider = (process.env.LEAD_PROVIDER ?? "").toLowerCase();
  try {
    if (process.env.TEST_WEBHOOK_URL) await post(process.env.TEST_WEBHOOK_URL, lead).catch(() => {});
    if (provider === "hubspot") await toHubSpot(lead, request);
    else if (provider === "ghl") await post(requireEnv("GHL_WEBHOOK_URL"), lead);
    else {
      console.warn("[lead] LEAD_PROVIDER not set; lead accepted in test mode", { source, intent, tags });
      return Response.json({ ok: true, forwarded: false });
    }
  } catch (err) {
    console.error("[lead] forward failed", err);
    return Response.json({ ok: false, error: "Something went wrong. Please try again or email us." }, { status: 502 });
  }
  return Response.json({ ok: true, forwarded: true });
}

function requireEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`${name} is not set`);
  return v;
}

async function post(url: string, data: unknown) {
  const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
  if (!res.ok) throw new Error(`${new URL(url).host} responded ${res.status}`);
}

type Lead = {
  email: string; firstName?: string; lastName?: string; phone?: string; consent: boolean; accredited?: string;
  source: string; intent: string; resource?: string; message?: string; page?: string; utm: Record<string, string>;
};

async function toHubSpot(lead: Lead, request: Request) {
  const portal = requireEnv("HUBSPOT_PORTAL_ID");
  const form = requireEnv("HUBSPOT_FORM_ID");
  const fields: Record<string, string | undefined> = {
    email: lead.email,
    firstname: lead.firstName,
    lastname: lead.lastName,
    phone: lead.phone,
    accredited_investor: lead.accredited,
    lead_source: lead.source,
    lead_intent: lead.intent,
    resource: lead.resource,
    message: lead.message,
    ...lead.utm,
  };
  const cookie = request.headers.get("cookie")?.match(/hubspotutk=([^;]+)/)?.[1];
  await post(`https://api.hsforms.com/submissions/v3/integration/submit/${portal}/${form}`, {
    fields: Object.entries(fields).filter(([, v]) => v).map(([name, value]) => ({ name, value })),
    context: { pageUri: lead.page ? `https://www.startingpointcapital.com${lead.page}` : undefined, hutk: cookie },
    legalConsentOptions: lead.consent
      ? { consent: { consentToProcess: true, text: "I agree to receive emails, texts, and calls from Starting Point Capital." } }
      : undefined,
  });
}
