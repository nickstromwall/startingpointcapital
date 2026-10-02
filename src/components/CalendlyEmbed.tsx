"use client";

import { useEffect } from "react";
import { links } from "@/config/site";
import { trackEvent } from "@/lib/analytics";

/** Inline Calendly booking. Calendly posts a message when a booking completes; we record it as a GA4 conversion. */
export default function CalendlyEmbed({ url = links.calendly, location, height = 700, prefill }: {
  url?: string;
  location: string;
  height?: number;
  prefill?: { name?: string; email?: string };
}) {
  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.origin !== "https://calendly.com") return;
      if ((e.data as { event?: string })?.event === "calendly.event_scheduled") trackEvent("call_booked", { location });
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [location]);

  const params = new URLSearchParams({ hide_gdpr_banner: "1", embed_type: "Inline", embed_domain: "startingpointcapital.com" });
  if (prefill?.name) params.set("name", prefill.name);
  if (prefill?.email) params.set("email", prefill.email);
  return (
    <iframe
      src={`${url}?${params}`}
      title="Schedule a call with Starting Point Capital"
      loading="lazy"
      style={{ width: "100%", height, border: 0, borderRadius: 18, background: "var(--white)" }}
    />
  );
}
