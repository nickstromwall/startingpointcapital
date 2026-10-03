import Link from "next/link";
import { guides } from "@/content/guides";
import { allPosts } from "@/lib/blog";
import { getEpisodes, isPassiveInvestingMadeSimple } from "@/lib/podcast";
import { podcast } from "@/config/site";
import { pageMeta } from "@/lib/meta";
import { CtaBand, Disclaimer, PageHero, ResourceCards } from "@/components/Blocks";
import EpisodeCard from "@/components/EpisodeCard";

export const revalidate = 86400;
export const metadata = pageMeta({
  title: "Resources",
  description: "The Investor Guide, the Passive Investing Made Simple series, The Fundamental Investor, our guide for sales professionals, and more.",
  path: "/resources",
  eyebrow: "Resources",
});

export default async function ResourcesPage() {
  const series = (await getEpisodes()).filter(isPassiveInvestingMadeSimple);
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title={<>Learn before <em>you invest.</em></>}
        lede="Everything we have built to help busy professionals understand passive real estate, in one place. Most of it is free."
      />

      <section className="section">
        <div className="wrap">
          <ResourceCards />
        </div>
      </section>

      <section className="section bg-paper" id="guides">
        <div className="wrap">
          <div className="head">
            <span className="eyebrow">Free guides</span>
            <h2>Start with the guide <em>that fits you.</em></h2>
          </div>
          <div className="grid grid-3">
            {guides.map((g) => (
              <Link key={g.slug} href={`/guides/${g.slug}`} className="card reveal" style={{ textDecoration: "none" }}>
                <p className="small" style={{ fontFamily: "var(--cond)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--gold-deep)" }}>{g.audience}</p>
                <h3>{g.title}</h3>
                <p className="mt-1">{g.lede}</p>
                <p className="mt-2"><span className="text-link small">Read the guide</span></p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="made-simple">
        <div className="wrap">
          <div className="head">
            <span className="eyebrow">Passive Investing Made Simple</span>
            <h2>Short lessons, <em>one concept at a time.</em></h2>
            <p className="lede">Our educational series inside the On the Rise Podcast. New lessons appear here on their own as they are published.</p>
          </div>
          {series.length ? (
            <div className="grid grid-3">
              {series.map((e) => <EpisodeCard key={e.slug} e={e} />)}
            </div>
          ) : (
            <p className="muted">The first lessons are on their way. <a href={podcast.apple} target="_blank" rel="noopener" className="text-link">Follow the podcast</a> to hear them first.</p>
          )}
        </div>
      </section>

      <section className="section bg-mist">
        <div className="wrap">
          <div className="head" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, flexWrap: "wrap" }}>
            <div>
              <span className="eyebrow">From the blog</span>
              <h2>Articles for <em>passive investors.</em></h2>
            </div>
            <Link href="/blog" className="text-link">All articles</Link>
          </div>
          <div className="grid grid-3">
            {allPosts.slice(0, 6).map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="card reveal" style={{ textDecoration: "none" }}>
                <h3>{p.title}</h3>
                <p className="mt-1 small">{p.description.slice(0, 140)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-sm">
        <div className="wrap split">
          <div>
            <span className="eyebrow">Retirement accounts</span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)" }}>Investing with a self directed IRA.</h2>
          </div>
          <div>
            <p className="muted">A self directed IRA lets a retirement account hold alternative assets like private real estate.</p>
            <Link href="/sdira" className="text-link">Learn more</Link>
          </div>
        </div>
      </section>

      <CtaBand source="resources" />
      <Disclaimer />
    </>
  );
}
