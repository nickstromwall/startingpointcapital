// Portfolio of deals SPC investors have participated in, all operated by Rise48 Equity or prior sponsors.
// Compliance: name, market, size, and year only. Never terms, returns, or "invest now" language for a live deal.

import data from "@/content/portfolio.json";

export type Deal = {
  slug: string;
  name: string;
  location: string;
  state: string;
  units: number | null;
  assetType: string;
  year: number | null;
  category: "multifamily" | "specialized" | "fund";
  image: string;
  legacyPath: string;
};

export const deals = data as Deal[];

export const categories = [
  { key: "multifamily", label: "Multifamily" },
  { key: "specialized", label: "Specialized" },
  { key: "fund", label: "Funds" },
] as const;

const STATE_NAMES: Record<string, string> = {
  AZ: "Arizona", TX: "Texas", NC: "North Carolina", MN: "Minnesota", KY: "Kentucky",
  TN: "Tennessee", OH: "Ohio", WI: "Wisconsin",
};

export const portfolioSummary = () => {
  const properties = deals.filter((d) => d.category !== "fund");
  const states = [...new Set(properties.map((d) => d.state))].map((s) => STATE_NAMES[s] ?? s);
  const since = Math.min(...deals.map((d) => d.year ?? 9999));
  return { count: deals.length, properties: properties.length, funds: deals.length - properties.length, states, since };
};

const UNIT_WORD: Record<string, string> = {
  Multifamily: "units", Townhome: "townhomes", "Assisted Living": "assisted living units",
  "Modular Apartment": "modular apartments", "Flex space": "flex buildings",
};

export const dealUnits = (d: Deal) =>
  d.category === "fund"
    ? `Fund, ${d.units?.toLocaleString()} units`
    : d.units
      ? `${d.units.toLocaleString()} ${UNIT_WORD[d.assetType] ?? d.assetType.toLowerCase()}`
      : d.assetType;

/**
 * Deal level operator credit, the Elevest pattern. Rise48 deals all carry the "Rise" name.
 * CONFIRM the sponsor of any non Rise deal before naming it here.
 */
export const dealOperator = (d: Deal) => (/^rise\b/i.test(d.name) ? "Operated by Rise48 Equity" : null);
