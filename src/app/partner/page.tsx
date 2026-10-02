import { notFound } from "next/navigation";
import { flags, rise48 } from "@/config/site";
import { pageMeta } from "@/lib/meta";
import { Disclaimer, PageHero } from "@/components/Blocks";
import LeadForm from "@/components/LeadForm";
import styles from "./partner.module.css";

export const metadata = pageMeta({
  title: "Partner With Us",
  description: "For professionals with a trusted network who want to build their own capital raising business, with a marketing team, back office, and operator behind them.",
  path: "/partner",
  eyebrow: "Partner with us",
});

const SUPPORT = [
  { title: "A proven operator", body: `Every deal is operated by Rise48 Equity, a vertically integrated multifamily operator in ${rise48.markets}. Your investors get institutional quality real estate.` },
  { title: "A marketing team", body: "Webinars, investor education, and campaign support, so you can focus on relationships instead of building materials from scratch." },
  { title: "A back office", body: "Subscriptions, investor portal, distributions, and reporting are handled for you. Your investors receive professional reports under your brand." },
  { title: "A mentor who has done it", body: "Jeremy built Starting Point Capital from a spreadsheet CRM into $100M+ raised from his own network. He will show you how." },
];

const FIT = [
  "You are 40 or older, with a career that built real relationships",
  "You have a network that already trusts you, such as physicians, pilots, or sales professionals",
  "You have invested in real estate yourself, actively or passively",
  "You want to build something of your own, without building an operating company",
];

export default function PartnerPage() {
  if (!flags.showPartnerPath) notFound();
  return (
    <>
      <PageHero
        eyebrow="For capital raisers"
        title={<>Your network. <em>Our platform.</em></>}
        lede="Many of our partners started exactly where you are: a successful career, a network that trusts them, and a desire to build something of their own. We make it possible to do that without building an operating company."
        photo="/properties/rise-avalon.jpg"
      />

      <section className="section">
        <div className="wrap">
          <div className="head">
            <span className="eyebrow">How we partner</span>
            <h2>Everything behind you, <em>so you can lead.</em></h2>
            <p className="lede">Join as a liaison or co manager. You bring the relationships. We bring the operator, the marketing, and the back office. Mostly, you invite people to a webinar and stay close to them.</p>
          </div>
          <div className="grid grid-4">
            {SUPPORT.map((s) => (
              <div key={s.title} className="card reveal">
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section on-dark deep">
        <div className="wrap split">
          <div className="reveal">
            <span className="eyebrow">Who thrives here</span>
            <h2>Your story can be <em>their story.</em></h2>
            <p className="lede mt-2">The people who do best with us are not real estate professionals. They are trusted professionals who discovered passive real estate for themselves and want to share it.</p>
          </div>
          <ul className="checks reveal">
            {FIT.map((f) => <li key={f}>{f}</li>)}
          </ul>
        </div>
      </section>

      <section className="section bg-paper" id="apply">
        <div className={`wrap ${styles.apply}`}>
          <div>
            <span className="eyebrow">Start a conversation</span>
            <h2>Explore partnering with us.</h2>
            <p className="lede mt-2">Tell us a little about yourself. Jeremy or a member of the team will reach out to set up a call.</p>
          </div>
          <LeadForm source="partner" intent="partner" fields="contact" buttonLabel="Start the conversation" success="Thank you. We will reach out shortly." />
        </div>
      </section>
      <Disclaimer />
    </>
  );
}
