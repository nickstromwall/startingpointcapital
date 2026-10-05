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
  { year: "25 yrs", text: "Jeremy builds a career in corporate and technology sales, most of it at ADP, living on the next paycheck and commission check." },
  { year: "2012", text: "Starts with fix and flips. Loves the entrepreneurial side, and learns that active investing can become another job." },
  { year: "Then", text: "As life gets busier with Marlene and four kids, moves into passive real estate investing." },
  { year: "Next", text: "Raises capital for other operators, and starts Starting Point Capital with a logo, a simple website, and a spreadsheet for a CRM." },
  { year: "2024", text: "Leaves his W-2 career behind and goes all in on real estate." },
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
                I spent nearly 25 years in corporate and technology sales. It was a great career that provided well for my family, but there was always one reality I couldn’t escape:
              </p>
              <p className="lede"><strong>Our financial future depended on my next paycheck.</strong></p>
              <p className="muted">If I stopped selling or had a bad month, the commission checks stopped too.</p>
              <p className="muted">
                I wanted to build something different. I wanted my money working as hard as I was, and eventually, I wanted the freedom to choose how I spent my time.
              </p>
              <p className="muted">
                My real estate journey started in 2012 with fix and flips. I loved the entrepreneurial side of real estate, but I quickly learned that active investing can become another job. As life got busier with my wife, Marlene, and our four kids, I transitioned into passive real estate investing.
              </p>
              <p className="muted"><strong>That decision changed the trajectory of my life.</strong></p>
              <p className="muted">
                Over the years, I’ve invested across more than 75 properties and built relationships with operators, investors and capital partners across the country. In 2024, I made the leap I had been working toward for years: I left my W-2 career behind and went all in on real estate.
              </p>
              <p className="muted">
                Today, I invest my own money alongside our investors, and our network has invested more than $100 million into real estate opportunities. Nearly all of that growth has come through relationships and referrals.
              </p>
              <p className="muted"><strong>That’s why I created Starting Point Capital.</strong></p>
              <p className="muted">
                We serve busy professionals, sales leaders and business owners who have spent years building successful careers but recognize that a high income and financial freedom are not the same thing.
              </p>
              <p className="muted">They don’t necessarily want another job managing properties.</p>
              <p className="muted">
                They want access to opportunities. They want education. They want experienced partners they can trust. And ultimately, they want more control over their time.
              </p>
              <p className="muted">I understand that because I lived it for 25 years.</p>
              <p className="lede"><strong>I’m not just someone bringing you investments. I’m an investor right alongside you.</strong></p>
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
