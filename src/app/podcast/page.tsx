import { podcast } from "@/config/site";
import { getShownEpisodes, isPassiveInvestingMadeSimple } from "@/lib/podcast";
import { pageMeta } from "@/lib/meta";
import { CtaBand, Disclaimer, PageHero } from "@/components/Blocks";
import EpisodeCard from "@/components/EpisodeCard";

export const revalidate = 86400;
export const metadata = pageMeta({
  title: "On the Rise Podcast",
  description: "Conversations about creating more time freedom through passive real estate investing, hosted by Jeremy Dyer.",
  path: "/podcast",
  eyebrow: "The podcast",
});

// Only the latest few episodes live here (Jeremy, Oct 3). They come straight from the feed and refresh daily,
// so publishing an episode is the only step. The full archive stays on the podcast apps.
export default async function PodcastPage() {
  const shown = (await getShownEpisodes()).slice(0, podcast.latestCount);
  const [latest, ...rest] = shown;
  const series = (await getShownEpisodes()).filter(isPassiveInvestingMadeSimple);
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
          {rest.length ? (
            <div className="mt-4">
              <span className="eyebrow">Recent episodes</span>
              <div className="grid grid-3 mt-2">
                {rest.map((e) => <EpisodeCard key={e.slug} e={e} />)}
              </div>
            </div>
          ) : null}
          <p className="muted mt-4">
            Looking for an older conversation? Every episode is on{" "}
            <a href={podcast.apple} target="_blank" rel="noopener" className="text-link">Apple Podcasts</a>,{" "}
            <a href={podcast.spotify} target="_blank" rel="noopener" className="text-link">Spotify</a>, and{" "}
            <a href={podcast.youtube} target="_blank" rel="noopener" className="text-link">YouTube</a>.
          </p>
        </div>
      </section>
      {series.length ? (
        <section className="section">
          <div className="wrap">
            <div className="head">
              <span className="eyebrow">Passive Investing Made Simple</span>
              <h2>Short lessons, <em>one concept at a time.</em></h2>
            </div>
            <div className="grid grid-3">
              {series.map((e) => <EpisodeCard key={e.slug} e={e} />)}
            </div>
          </div>
        </section>
      ) : null}
      <CtaBand source="podcast" title={<>Ready to go from <em>listening to investing?</em></>} />
      <Disclaimer />
    </>
  );
}
