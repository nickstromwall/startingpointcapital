import Link from "next/link";
import { notFound } from "next/navigation";
import { taxNote } from "@/config/site";
import { allPosts, formatDate, getPost, reviewSlugs, excerpt } from "@/lib/blog";
import { pageMeta } from "@/lib/meta";
import { CtaBand, Disclaimer, PageHero } from "@/components/Blocks";

export const dynamicParams = false;
export function generateStaticParams() {
  return allPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">) {
  const p = getPost((await params).slug);
  if (!p) return {};
  return pageMeta({ title: p.title, description: excerpt(p), path: `/blog/${p.slug}`, eyebrow: "The blog" });
}

const ALLOWED = new Set(["h2", "h3", "h4", "p", "li", "blockquote"]);

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const p = getPost((await params).slug);
  if (!p) notFound();
  // Group consecutive list items into a <ul>.
  const html: string[] = [];
  let inList = false;
  for (const [tag, inner] of p.blocks) {
    if (!ALLOWED.has(tag)) continue;
    if (tag === "li" && !inList) { html.push("<ul>"); inList = true; }
    if (tag !== "li" && inList) { html.push("</ul>"); inList = false; }
    html.push(`<${tag}>${inner}</${tag}>`);
  }
  if (inList) html.push("</ul>");

  return (
    <>
      <PageHero eyebrow={`The blog · ${formatDate(p.date)}`} title={p.title}>
        <p className="mt-2"><Link href="/blog" className="text-link small">All articles</Link></p>
      </PageHero>
      <article className="section">
        <div className="wrap narrow">
          <p className="notice">
            <strong>Educational content.</strong> Any numbers in this article are hypothetical illustrations, not projections for any Starting Point Capital offering.{" "}
            {reviewSlugs.has(p.slug) ? `Figures and tax rules may be dated. ${taxNote}` : taxNote}
          </p>
          <div className="prose mt-3" dangerouslySetInnerHTML={{ __html: html.join("") }} />
        </div>
      </article>
      <CtaBand source="blog-post" />
      <Disclaimer />
    </>
  );
}
