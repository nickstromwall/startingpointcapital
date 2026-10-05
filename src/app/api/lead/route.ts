import { forwardLead } from "@/lib/leads";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

type LeadBody = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  consent?: boolean;
  newsletter?: boolean; // joins the newsletter list, which starts Jeremy's 30 email drip in the CRM
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
    ...(body.newsletter ? ["newsletter:subscribed"] : []),
  ];
  const lead = {
    email,
    firstName: firstName || undefined,
    lastName: lastName || undefined,
    phone: phone || undefined,
    consent: Boolean(body.consent),
    newsletter: Boolean(body.newsletter),
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

  const result = await forwardLead(lead, request.headers.get("cookie"));
  return result.ok
    ? Response.json({ ok: true, forwarded: result.forwarded })
    : Response.json({ ok: false, error: "Something went wrong. Please try again or email us." }, { status: 502 });
}
