import { podcast } from "@/config/site";
import { getEpisodes } from "@/lib/podcast";
import { pageMeta } from "@/lib/meta";
import { CtaBand, Disclaimer, PageHero } from "@/components/Blocks";
import EpisodeCard from "@/components/EpisodeCard";
import EpisodeList from "@/components/EpisodeList";

export const revalidate = 86400;
export const metadata = pageMeta({
  title: "On the Rise Podcast",
  description: "Conversations about creating more time freedom through passive real estate investing, hosted by Jeremy Dyer.",
  path: "/podcast",
  eyebrow: "The podcast",
});

export default async function PodcastPage() {
  const episodes = await getEpisodes();
  const [latest, ...rest] = episodes;
  return (
    <>
      <PageHero
        eyebrow="On the Rise Podcast"
        title={<>Conversations about <em>time freedom.</em></>}
        lede={`${podcast.blurb} Formerly ${podcast.formerName}.`}
      >
        <div className="btn-row mt-3">
          <a href={podcast.apple} target="_blank" rel="noopener" className="btn btn-gold">Apple Podcasts</a>
          <a href={podcast.spotify} target="_blank" rel="noopener" className="btn btn-ghost">Spotify</a>
          <a href={podcast.youtube} target="_blank" rel="noopener" className="btn btn-ghost">YouTube</a>
        </div>
      </PageHero>
      <section className="section bg-paper">
        <div className="wrap">
          {latest ? (
            <>
              <span className="eyebrow">Latest episode</span>
              <EpisodeCard e={latest} feature />
            </>
          ) : null}
          <div className="mt-4">
            <EpisodeList episodes={rest} />
          </div>
        </div>
      </section>
      <CtaBand source="podcast" title={<>Ready to go from <em>listening to investing?</em></>} />
      <Disclaimer />
    </>
  );
}
