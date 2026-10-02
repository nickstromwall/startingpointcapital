import Image from "next/image";
import Link from "next/link";
import { book, disclaimer, flags, links, podcast, reviews, rise48, stats, statsUpdated, taxNote, team } from "@/config/site";
import AccessForm from "./AccessForm";
import styles from "./Blocks.module.css";

/** Dark page hero used on every page, so the transparent header always sits on navy or photography. */
export function PageHero({
  eyebrow,
  title,
  lede,
  photo,
  children,
  tall,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  photo?: string;
  children?: React.ReactNode;
  tall?: boolean;
}) {
  return (
    <section className={`on-dark deep ${styles.hero} ${tall ? styles.tall : ""}`}>
      {photo ? (
        <div className={styles.heroMedia} aria-hidden="true">
          <Image src={photo} alt="" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
        </div>
      ) : (
        <div className={styles.heroLines} aria-hidden="true" />
      )}
      <div className={`wrap ${styles.heroInner}`}>
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <h1>{title}</h1>
        {lede ? <p className={`lede ${styles.heroLede}`}>{lede}</p> : null}
        {children}
      </div>
    </section>
  );
}

export function TrustStrip({ dark }: { dark?: boolean }) {
  const shown = stats.filter((s) => s.show).slice(0, 4);
  return (
    <div className={dark ? "on-dark" : ""} style={{ background: "transparent" }}>
      <div className="stats">
        {shown.map((s) => (
          <div className="stat" key={s.key}>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
      <p className="note-updated">Figures as of {statsUpdated}. Past performance is not indicative of future results.</p>
    </div>
  );
}

export function Rise48Block({ compact }: { compact?: boolean }) {
  const set = rise48.sets[rise48.approvedSet];
  return (
    <section className={`section ${styles.rise}`} id="rise48">
      <div className="wrap">
        <div className={styles.riseTop}>
          <div className="reveal">
            <span className="eyebrow">Powered by Rise48 Equity</span>
            <h2>
              One team, from <em>raise</em> to <em>rent roll.</em>
            </h2>
          </div>
          <div className={`reveal ${styles.riseCopy}`}>
            <p className="lede">
              Starting Point Capital raises capital alongside Rise48 Equity, a vertically integrated multifamily operator in {rise48.markets}. We do not hide that partnership. We lead with it.
            </p>
            <p className="muted">
              The fund operator and the deal operator are one and the same team. Rise48 finds, finances, renovates, and manages the properties. We walk with our investors from the first conversation through every distribution.
            </p>
            {!compact ? (
              <a href={rise48.url} target="_blank" rel="noopener" className="text-link">Visit Rise48 Equity</a>
            ) : null}
          </div>
        </div>

        <div className={`reveal ${styles.riseCard}`}>
          <div className={styles.riseLogo}>
            <Image src="/brand/rise48.png" alt="Rise48 Equity" width={260} height={103} />
          </div>
          <div className={styles.riseStats}>
            {set.map((s) => (
              <div key={s.label}>
                <div className={styles.riseValue}>{s.value}</div>
                <div className={styles.riseLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <p className={`${styles.alongside} reveal`}>
          <span>Starting Point Capital invests alongside you in every deal.</span>
        </p>
        <p className="note-updated">Rise48 Equity figures as reported by Rise48, {rise48.updated}.</p>
      </div>
    </section>
  );
}

const PILLARS = [
  { n: "01", title: "Cash flow", body: "Rent collected from residents, after expenses and debt service, can be distributed to investors on a regular basis while the property is held." },
  { n: "02", title: "Equity", body: "Every mortgage payment is made from rental income, which pays down the loan and builds equity in the property over the hold period." },
  { n: "03", title: "Tax benefits", body: "Depreciation passes through to investors on a K-1 and can offset passive income. Cost segregation can accelerate it.", note: true },
  { n: "04", title: "Appreciation", body: "Improving the property and its operations can increase its value. That value is realized when the asset is refinanced or sold." },
];

export function Pillars() {
  return (
    <div className={styles.pillars}>
      {PILLARS.map((p) => (
        <div key={p.n} className={`reveal ${styles.pillar}`}>
          <span className={styles.pillarN}>{p.n}</span>
          <h3>{p.title}</h3>
          <p>{p.body}</p>
          {p.note ? <p className={styles.pillarNote}>{taxNote}</p> : null}
        </div>
      ))}
    </div>
  );
}

const STEPS = [
  { title: "Get access", body: "Share a few details to unlock our portfolio, investor guide, and educational resources." },
  { title: "Meet the team", body: "A short call to understand your goals, timeline, and questions. No pressure, ever." },
  { title: "Review the opportunity", body: "When a deal fits, you receive the full offering documents, webinar, and Q&A with the operator." },
  { title: "Invest through the portal", body: "Sign and fund securely online, then track distributions and reports in your investor portal." },
];

export function Steps({ dark }: { dark?: boolean }) {
  return (
    <ol className={`${styles.steps} ${dark ? styles.stepsDark : ""}`}>
      {STEPS.map((s, i) => (
        <li key={s.title} className="reveal">
          <span className={styles.stepN}>{String(i + 1).padStart(2, "0")}</span>
          <h3>{s.title}</h3>
          <p>{s.body}</p>
        </li>
      ))}
    </ol>
  );
}

export function StoryBlock() {
  return (
    <section className="section bg-paper">
      <div className="wrap">
        <div className={`offset ${styles.story}`}>
          <div className="offset-media reveal">
            <Image src="/team/jeremy-portrait.jpg" alt="Jeremy Dyer, Founder of Starting Point Capital" fill sizes="(max-width: 1020px) 100vw, 55vw" style={{ objectFit: "cover", objectPosition: "50% 20%" }} />
          </div>
          <div className="offset-panel reveal">
            <span className="eyebrow">One of you</span>
            <h2 style={{ fontSize: "clamp(1.9rem, 3.4vw, 2.7rem)" }}>A side hustle that became the <em>main hustle.</em></h2>
            <p className="mt-2">
              Jeremy Dyer spent 25 years in tech sales. He started flipping houses in 2012, moved to passive multifamily in 2015, and has since invested as an LP in 75+ deals. He invests his own money in every deal he brings to investors.
            </p>
            <p>
              He started Starting Point Capital with a logo, a simple website, and a spreadsheet for a CRM. Almost every dollar since has come through relationships and referrals.
            </p>
            <Link href="/about" className="btn btn-ghost mt-1">Read our story <span className="arrow">→</span></Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TeamGrid({ limit, detailed }: { limit?: number; detailed?: boolean }) {
  const people = team.filter((m) => m.confirmed || detailed).slice(0, limit);
  return (
    <div className={styles.team}>
      {people.map((m) => (
        <article key={m.slug} className={`reveal ${styles.member}`} id={m.slug}>
          {m.photo ? (
            <div className={styles.memberPhoto}>
              <Image src={m.photo} alt={m.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1020px) 50vw, 33vw" style={{ objectFit: "cover", objectPosition: "50% 25%" }} />
            </div>
          ) : null}
          <div className={styles.memberBody}>
            <h3>{m.name}</h3>
            <p className={styles.role}>{m.role}{m.location ? ` · ${m.location}` : ""}</p>
            <p className="muted small">{m.short}</p>
            {detailed && m.calendly ? (
              <a href={m.calendly} target="_blank" rel="noopener" className="text-link small">Schedule with {m.name.split(" ")[0]}</a>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}

export function Reviews() {
  if (!flags.showReviews || reviews.length === 0) return null;
  return (
    <section className="section bg-mist" id="reviews">
      <div className="wrap">
        <div className="head center">
          <span className="eyebrow">Investor reviews</span>
          <h2>In their <em>own words.</em></h2>
        </div>
        <div className="grid grid-3">
          {reviews.map((r) => (
            <figure key={r.name} className="card">
              <div aria-label={`${r.rating} out of 5 stars`} className={styles.stars}>{"★".repeat(r.rating)}</div>
              <blockquote className="mt-1">“{r.text}”</blockquote>
              <figcaption className="small muted mt-1">{r.name}, Google review</figcaption>
            </figure>
          ))}
        </div>
        {links.googleReviews ? (
          <p className="center mt-3"><a href={links.googleReviews} className="text-link" target="_blank" rel="noopener">Read all reviews on Google</a></p>
        ) : null}
      </div>
    </section>
  );
}

export function ResourceCards() {
  return (
    <div className={styles.resources}>
      <a href={book.url} target="_blank" rel="noopener" className={`reveal ${styles.resource}`}>
        <div className={styles.resourceImg}><Image src="/photos/book.jpg" alt="The Fundamental Investor by Jeremy Dyer" fill sizes="(max-width: 1020px) 100vw, 33vw" style={{ objectFit: "cover" }} /></div>
        <div className={styles.resourceBody}>
          <span className={styles.resourceKind}>The book</span>
          <h3>{book.title}</h3>
          <p className="muted small">“{book.endorsement.quote}” {book.endorsement.by}</p>
          <span className="text-link small">Order on Amazon</span>
        </div>
      </a>
      <Link href="/podcast" className={`reveal ${styles.resource}`}>
        <div className={styles.resourceImg}><Image src="/photos/podcast.jpg" alt="On the Rise Podcast with host Jeremy Dyer" fill sizes="(max-width: 1020px) 100vw, 33vw" style={{ objectFit: "cover" }} /></div>
        <div className={styles.resourceBody}>
          <span className={styles.resourceKind}>The podcast</span>
          <h3>{podcast.name}</h3>
          <p className="muted small">Conversations about building time freedom through passive real estate investing.</p>
          <span className="text-link small">Listen now</span>
        </div>
      </Link>
      <Link href="/guides/investor-guide" className={`reveal ${styles.resource}`}>
        <div className={styles.resourceImg}><Image src="/photos/creekside.jpg" alt="Rise Creekside apartments" fill sizes="(max-width: 1020px) 100vw, 33vw" style={{ objectFit: "cover" }} /></div>
        <div className={styles.resourceBody}>
          <span className={styles.resourceKind}>Free guide</span>
          <h3>Passive Real Estate Investing Guide</h3>
          <p className="muted small">A starting point for busy professionals who want cash flow without becoming a landlord.</p>
          <span className="text-link small">Read the guide</span>
        </div>
      </Link>
    </div>
  );
}

export function CtaBand({ title, lede, source = "cta-band" }: { title?: React.ReactNode; lede?: string; source?: string }) {
  return (
    <section className={`section on-dark ${styles.cta}`} id="get-access">
      <div className={styles.ctaGlow} aria-hidden="true" />
      <div className="wrap split">
        <div>
          <span className="eyebrow">Get access</span>
          <h2>{title ?? <>Your starting point <em>starts here.</em></>}</h2>
          <p className="lede mt-2">
            {lede ?? "Unlock our full portfolio and investor guide, then book a short call with the team. Accredited status is a follow up question, never a gate."}
          </p>
          <ul className={`checks mt-3 ${styles.ctaList}`}>
            <li>See every property our investors have participated in</li>
            <li>Get the Passive Real Estate Investing Guide</li>
            <li>Meet the team on a 1 on 1 call</li>
          </ul>
        </div>
        <AccessForm dark source={source} compact />
      </div>
    </section>
  );
}

export function Disclaimer() {
  return (
    <section className="section-sm">
      <div className="wrap narrow">
        <p className="disclosure"><strong>Important disclosure.</strong> {disclaimer} See our <Link href="/disclosures">full disclosures</Link>.</p>
      </div>
    </section>
  );
}
