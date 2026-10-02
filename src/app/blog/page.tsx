import Link from "next/link";
import { allPosts, formatDate } from "@/lib/blog";
import { pageMeta } from "@/lib/meta";
import { CtaBand, Disclaimer, PageHero } from "@/components/Blocks";

export const metadata = pageMeta({
  title: "Blog",
  description: "Articles on passive real estate investing, syndications, taxes, and how to vet a deal.",
  path: "/blog",
  eyebrow: "The blog",
});

export default function BlogPage() {
  return (
    <>
      <PageHero eyebrow="The blog" title={<>Articles for <em>passive investors.</em></>} lede="Plain English explanations of syndications, taxes, markets, and how to evaluate a deal." />
      <section className="section bg-paper">
        <div className="wrap">
          <div className="grid grid-3">
            {allPosts.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="card reveal" style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                <p className="small" style={{ margin: 0, fontFamily: "var(--cond)", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--gold-deep)" }}>{formatDate(p.date)}</p>
                <h3>{p.title}</h3>
                <p className="small">{p.description.slice(0, 160)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBand source="blog" />
      <Disclaimer />
    </>
  );
}
