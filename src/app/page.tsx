import Link from "next/link";
import Image from "next/image";
import { cta, flags } from "@/config/site";
import { pageMeta } from "@/lib/meta";
import {
  CtaBand, CtaButtons, Disclaimer, PageHero, Pillars, PoweredBy, ResourceCards, Reviews, Steps, StoryBlock, TeamGrid, TrustStrip,
} from "@/components/Blocks";
import styles from "./home.module.css";

export const metadata = pageMeta({
  title: "Passive Multifamily Real Estate Investing",
  description:
    "Passive cash flow without being a landlord. Starting Point Capital helps busy professionals invest in institutional quality apartment communities, powered by Rise48 Equity.",
  path: "/",
  // Pre-rendered JPG of the /og design (with Jeremy), small enough for iMessage, WhatsApp, and LinkedIn previews.
  image: "/share/home.jpg?v=2",
});

export default function Home() {
  return (
    <>
      <PageHero
        tall
        photo="/photos/desert-cove.jpg"
        eyebrow="Passive multifamily investing"
        title={<>Passive cash flow, <em>without being a landlord.</em></>}
        lede="Starting Point Capital helps busy professionals invest in institutional quality apartment communities, alongside a team that puts its own money into every deal."
      >
        <CtaButtons />
        <div className={styles.heroStats}>
          <TrustStrip dark />
        </div>
      </PageHero>

      <PoweredBy />

      <section className="section on-dark deep">
        <div className="wrap">
          <div className={`head ${styles.whyHead}`}>
            <div>
              <span className="eyebrow">Why passive multifamily</span>
              <h2>Real assets. <em>Real income.</em> Your time back.</h2>
            </div>
            <div>
              <p className="lede">
                Passive investing means cash flow received on a regular basis, with little effort required to maintain it. Busy professionals focused on their careers often lack the time to build wealth on the side. Owning a share of a professionally managed apartment community changes that.
              </p>
              <p className="muted small">
                Historically, real estate has shown resilience across economic cycles. Every investment carries risk, including the loss of principal, and past performance does not guarantee future results.
              </p>
            </div>
          </div>
          <Pillars />
          <p className={`${styles.noLandlord} reveal`}>All without the tenants, toilets, and trash of being a landlord.</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="head">
            <span className="eyebrow">How it works</span>
            <h2>Four simple steps from <em>curious to invested.</em></h2>
          </div>
          <Steps />
          <div className="btn-row mt-3">
            <Link href={cta.primary.href} className="btn btn-navy">{cta.primary.label} <span className="arrow">→</span></Link>
            <Link href={cta.secondary.href} className="btn btn-ghost">{cta.secondary.label}</Link>
          </div>
        </div>
      </section>

      <StoryBlock />

      <section className="section">
        <div className="wrap">
          <div className={`head ${styles.teamHead}`}>
            <div>
              <span className="eyebrow">Our team</span>
              <h2>Led by Jeremy. <em>Built as a team that invests with you.</em></h2>
            </div>
            <Link href="/about#team" className="text-link">Read every bio</Link>
          </div>
          <TeamGrid />
        </div>
      </section>

      {flags.showPartnerPath ? (
        <section className={styles.partner}>
          <div className="wrap">
            <div className={styles.partnerInner}>
              <Image src="/brand/mark-white.png" alt="" width={120} height={90} className={styles.partnerMark} />
              <div>
                <span className="eyebrow">For capital partners</span>
                <h3>Have a network that trusts you? Build your own capital raising business with us.</h3>
              </div>
              <Link href="/partner" className="btn btn-gold">Partner With Us <span className="arrow">→</span></Link>
            </div>
          </div>
        </section>
      ) : null}

      <Reviews />

      <section className="section bg-paper">
        <div className="wrap">
          <div className="head">
            <span className="eyebrow">Learn first</span>
            <h2>Education before <em>investment.</em></h2>
            <p className="lede">We believe the best investors understand exactly what they own. Start with the free investor guide, then keep going at your own pace.</p>
          </div>
          <ResourceCards />
        </div>
      </section>

      <CtaBand source="home" />
      <Disclaimer />
    </>
  );
}
