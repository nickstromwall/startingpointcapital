import { notFound } from "next/navigation";
import { getGuide, guides } from "@/content/guides";
import { pageMeta } from "@/lib/meta";
import { Disclaimer, PageHero } from "@/components/Blocks";
import Sections from "@/components/Sections";
import GuideGate from "@/components/GuideGate";

export const dynamicParams = false;
export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/guides/[slug]">) {
  const g = getGuide((await params).slug);
  if (!g) return {};
  return pageMeta({ title: g.title, description: g.lede, path: `/guides/${g.slug}`, eyebrow: g.eyebrow });
}

export default async function GuidePage({ params }: PageProps<"/guides/[slug]">) {
  const g = getGuide((await params).slug);
  if (!g) notFound();
  return (
    <>
      <PageHero eyebrow={g.eyebrow} title={g.title} lede={g.lede} photo={g.photo}>
        <p className="muted small mt-2">For {g.audience.toLowerCase()}. About a 6 minute read.</p>
      </PageHero>
      <section className="section">
        <div className="wrap narrow">
          <div className="prose"><Sections sections={g.intro} /></div>
          <GuideGate slug={g.slug} title={g.title}>
            <Sections sections={g.body} />
          </GuideGate>
        </div>
      </section>
      <Disclaimer />
    </>
  );
}
