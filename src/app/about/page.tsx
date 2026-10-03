import Image from "next/image";
import Link from "next/link";
import { book, podcast, team } from "@/config/site";
import { pageMeta } from "@/lib/meta";
import { CtaBand, Disclaimer, PageHero, Rise48Block, TeamGrid } from "@/components/Blocks";
import styles from "./about.module.css";

export const metadata = pageMeta({
  title: "About",
  description: "The Starting Point Capital story, our team of partners and co managers, and our operating partnership with Rise48 Equity.",
  path: "/about",
  eyebrow: "About us",
});

const MILESTONES = [
  { year: "25 yrs", text: "Jeremy builds a career in tech sales, most of it at ADP, living on a W2 and the next commission check." },
  { year: "2012", text: "Scratches the entrepreneurial itch with fix and flips and active real estate ownership. Learns what it really costs in time." },
  { year: "2015", text: "As life gets busier with four kids, shifts to passive multifamily investing as a limited partner." },
  { year: "Then", text: "Raises capital for other operators, and starts Starting Point Capital with a logo, a simple website, and a spreadsheet for a CRM." },
  { year: "Today", text: "Brings Starting Point Capital and Rise48 Equity together. The side hustle becomes the main hustle, and a team of partners grows around it." },
];

export default function AboutPage() {
  const jeremy = team[0];
  return (
    <>
      <PageHero
        eyebrow="About Starting Point Capital"
        title={<>Built by investors, <em>for investors.</em></>}
        lede="Starting Point Capital is a team of partners and co managers who invest their own money alongside the people they serve. We help busy professionals put their capital to work in real, professionally managed apartment communities."
        photo="/photos/creekside.jpg"
      />

      <section className="section">
        <div className="wrap split split-wide">
          <div className="reveal">
            <span className="eyebrow">Our story</span>
            <h2>“My biggest value is that <em>I am one of you.</em>”</h2>
            <div className="mt-3">
              <p className="lede">
                I spent 25 years in tech sales, most of them at ADP. It was a good career, but my family depended on a W2 and on chasing the next commission check. I wanted income that kept coming whether or not I closed a deal that quarter.
              </p>
              <p className="muted">
                Real estate scratched my entrepreneurial itch. I started with fix and flips in 2012 and learned how much of my time active ownership really takes. As life got busier with Marlene and our four kids, I made the move to passive investing in 2015.
              </p>
              <p className="muted">
                Today I invest my own money in every deal we bring to investors. I get paid twice: once as a partner and once as an investor right alongside you. Nearly all of the $100M+ our network has invested came through relationships and referrals, not cold outreach.
              </p>
              <p className="muted">
                That is why I started Starting Point Capital. The people we serve are busy professionals, sales leaders, and business owners who want what I wanted: their time back, and their money working without a second job. I am one of them.
              </p>
              <p className="small mt-2" style={{ fontFamily: "var(--cond)", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--gold-deep)" }}>
                {jeremy.name}, {jeremy.role}
              </p>
            </div>
          </div>
          <div className={`reveal ${styles.portrait}`}>
            <Image src="/team/jeremy-portrait.jpg" alt="Jeremy Dyer" fill sizes="(max-width: 1020px) 100vw, 45vw" style={{ objectFit: "cover", objectPosition: "50% 20%" }} />
          </div>
        </div>
      </section>

      <section className="section-sm bg-paper">
        <div className="wrap">
          <ol className={styles.timeline}>
            {MILESTONES.map((m) => (
              <li key={m.year} className="reveal">
                <span className={styles.year}>{m.year}</span>
                <p>{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Rise48Block />

      <section className="section bg-mist" id="team">
        <div className="wrap">
          <div className="head">
            <span className="eyebrow">Our team</span>
            <h2>Led by Jeremy, <em>supported by a team.</em></h2>
            <p className="lede">Our partners come from sales leadership, business ownership, and real estate brokerage. Each one invests passively, too.</p>
          </div>
          <TeamGrid detailed />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          {team.map((m) => (
            <article key={m.slug} className={`${styles.bio} reveal`} id={`bio-${m.slug}`}>
              <div>
                <h3>{m.name}</h3>
                <p className={styles.bioRole}>{m.role}</p>
                {m.calendly ? <a href={m.calendly} target="_blank" rel="noopener" className="btn btn-ghost btn-sm mt-1">Schedule a call</a> : null}
              </div>
              <div className="prose">{m.bio.map((p) => <p key={p.slice(0, 30)}>{p}</p>)}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-sm on-dark">
        <div className={`wrap ${styles.media}`}>
          <div>
            <span className="eyebrow">Author and host</span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)" }}>{book.title} and the {podcast.name}.</h2>
          </div>
          <div className="btn-row">
            <a href={book.url} target="_blank" rel="noopener" className="btn btn-gold">Get the book <span className="arrow">→</span></a>
            <Link href="/podcast" className="btn btn-ghost">Listen to the podcast</Link>
          </div>
        </div>
      </section>

      <CtaBand source="about" />
      <Disclaimer />
    </>
  );
}
