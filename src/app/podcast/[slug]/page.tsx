import Image from "next/image";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { podcast } from "@/config/site";
import { cleanNotes, formatDate, formatDuration, getEpisode, getShownEpisodes, summary } from "@/lib/podcast";
import { pageMeta } from "@/lib/meta";
import { CtaBand, Disclaimer, PageHero } from "@/components/Blocks";
import styles from "./episode.module.css";

export const revalidate = 86400;
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getShownEpisodes()).map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps<"/podcast/[slug]">) {
  const e = await getEpisode((await params).slug);
  if (!e) return {};
  return pageMeta({ title: e.title, description: summary(e, 155), path: `/podcast/${e.slug}`, eyebrow: podcast.name });
}

export default async function EpisodePage({ params }: PageProps<"/podcast/[slug]">) {
  const { slug } = await params;
  const e = (await getShownEpisodes()).find((x) => x.slug === slug);
  if (!e) {
    // Older episodes live on the podcast apps now. Forward them to the podcast page instead of a 404.
    if (await getEpisode(slug)) permanentRedirect("/podcast");
    notFound();
  }
  return (
    <>
      <PageHero eyebrow={`${podcast.name} · ${formatDate(e.date)}`} title={e.title}>
        <p className="mt-2"><Link href="/podcast" className="text-link small">Latest episodes</Link></p>
      </PageHero>
      <section className="section">
        <div className={`wrap ${styles.layout}`}>
          <div>
            {e.audioUrl ? (
              <div className={styles.player}>
                <audio controls preload="none" src={e.audioUrl} />
                {formatDuration(e.duration) ? <span>{formatDuration(e.duration)}</span> : null}
              </div>
            ) : null}
            <div className="prose mt-3" dangerouslySetInnerHTML={{ __html: cleanNotes(e.descriptionHtml) }} />
          </div>
          <aside className={styles.aside}>
            {e.image ? <div className={styles.art}><Image src={e.image} alt="" fill sizes="320px" style={{ objectFit: "cover" }} /></div> : null}
            <p className="small muted mt-2">Listen and subscribe</p>
            <div className={styles.listen}>
              <a href={podcast.apple} target="_blank" rel="noopener" className="btn btn-ghost btn-sm">Apple</a>
              <a href={podcast.spotify} target="_blank" rel="noopener" className="btn btn-ghost btn-sm">Spotify</a>
              <a href={podcast.youtube} target="_blank" rel="noopener" className="btn btn-ghost btn-sm">YouTube</a>
            </div>
          </aside>
        </div>
      </section>
      <CtaBand source="episode" title={<>Ready to go from <em>listening to investing?</em></>} />
      <Disclaimer />
    </>
  );
}
