import { pageMeta } from "@/lib/meta";
import { portfolioSummary } from "@/lib/portfolio";
import { Disclaimer, PageHero } from "@/components/Blocks";
import Portfolio from "@/components/Portfolio";

export const metadata = pageMeta({
  title: "Portfolio",
  description: "The apartment communities, specialized assets, and funds Starting Point Capital investors have participated in.",
  path: "/portfolio",
  eyebrow: "Our portfolio",
});

export default function PortfolioPage() {
  const s = portfolioSummary();
  return (
    <>
      <PageHero
        eyebrow="Our portfolio"
        title={<>Real properties. <em>Real places.</em></>}
        lede="Our investors have participated in apartment communities, specialized assets, and funds across the country, most of them operated by our partner Rise48 Equity."
        photo="/properties/rise-bluestone.jpg"
      >
        <div className="stats mt-4">
          <div className="stat"><div className="stat-value">{s.count}</div><div className="stat-label">Properties and funds</div></div>
          <div className="stat"><div className="stat-value">{s.states.length}</div><div className="stat-label">States, including {s.states.slice(0, 3).join(", ")}</div></div>
          <div className="stat"><div className="stat-value">{s.funds}</div><div className="stat-label">Rise48 funds</div></div>
          <div className="stat"><div className="stat-value">{s.since}</div><div className="stat-label">Earliest acquisition shown</div></div>
        </div>
      </PageHero>
      <section className="section bg-paper">
        <div className="wrap">
          <Portfolio />
          <p className="disclosure mt-3">
            This list is shown for informational purposes only. It is not an offer to sell or a solicitation to buy any security, and it does not describe the terms or performance of any investment. Offerings are made only to qualified investors through official offering documents.
          </p>
        </div>
      </section>
      <Disclaimer />
    </>
  );
}
