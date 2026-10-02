import { readUtm } from "@/lib/analytics";

export async function submitLead(data: Record<string, unknown>) {
  const res = await fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, page: window.location.pathname, utm: readUtm() }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || !json.ok) throw new Error(json.error || "Something went wrong. Please try again.");
}
