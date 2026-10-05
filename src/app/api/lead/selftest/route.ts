// TEMPORARY end to end check for the HubSpot connection. Delete after the Mickey Mouse test.
// Sends one fixed test lead through the exact same path as the site's forms.
import { forwardLead } from "@/lib/leads";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (new URL(request.url).searchParams.get("key") !== "377583ef05c0aeb8eba97105") return new Response("Not found", { status: 404 });
  const result = await forwardLead(
    {
      email: "nick+mickeymouse@oakandvinecapital.com",
      firstName: "Mickey",
      lastName: "Mouse",
      phone: "+1 612-555-0100",
      consent: true,
      newsletter: true,
      source: "invest",
      intent: "investor",
      page: "/invest",
      utm: { utm_source: "spc-website-test" },
    },
    null,
  );
  return Response.json(result);
}
