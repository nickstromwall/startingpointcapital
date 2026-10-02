import { PageHero } from "./Blocks";

/** Shared layout for legal pages. Drafts: have counsel and Rise48 Marketing review before launch. */
export default function Legal({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} lede={`Last updated ${updated}.`} />
      <section className="section">
        <div className="wrap narrow prose">{children}</div>
      </section>
    </>
  );
}
