// GA4 events plus UTM capture. UTMs from the landing URL are kept for the session and sent with every form.
// Conversions to mark in GA4: generate_lead, get_access, call_booked, investor_login_click, book_click.

type GtagParams = Record<string, string | number | boolean | undefined>;
declare global {
  interface Window {
    gtag?: (command: "event", name: string, params?: GtagParams) => void;
  }
}

export function trackEvent(name: string, params: GtagParams = {}) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") window.gtag("event", name, params);
}

const UTM_KEY = "spc_utm";
const UTM_FIELDS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];

export function captureUtm() {
  try {
    const params = new URLSearchParams(window.location.search);
    const found = Object.fromEntries(UTM_FIELDS.map((k) => [k, params.get(k) ?? ""]).filter(([, v]) => v));
    if (Object.keys(found).length) sessionStorage.setItem(UTM_KEY, JSON.stringify(found));
  } catch {}
}

export function readUtm(): Record<string, string> {
  try {
    return JSON.parse(sessionStorage.getItem(UTM_KEY) || "{}");
  } catch {
    return {};
  }
}
