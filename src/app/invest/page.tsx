import Link from "next/link";
import { cta, links, sdiraPartner } from "@/config/site";
import { pageMeta } from "@/lib/meta";
import { Disclaimer, PageHero, Steps, TrustStrip } from "@/components/Blocks";
import AccessForm from "@/components/AccessForm";
import styles from "./invest.module.css";

export const metadata = pageMeta({
  title: "Request Access",
  description: "Request access to our current portfolio, free investor guides, and newsletter, then book a call with the Starting Point Capital team.",
  path: "/invest",
  eyebrow: "Request access",
});

const FAQ = [
  {
    q: "Who can invest with Starting Point Capital?",
    a: "Our offerings are private placements. Most are available to accredited investors, and some are offered privately to investors who have an established relationship with us. That is why every investor relationship starts with a conversation.",
  },
  {
    q: "What happens after I request access?",
    a: "You can browse our current portfolio and every free guide right away, and the newsletter starts arriving in your inbox. We will reach out to schedule a short call, or you can book one yourself. When an opportunity fits your goals, you will receive the full offering documents and an invitation to the investor webinar.",
  },
  {
    q: "How do investors get paid?",
    a: "Depending on the deal, through distributions from property cash flow, a return of capital at refinance, and a share of profits at sale. None of these are guaranteed, and every deal's offering documents explain exactly how distributions work.",
  },
  {
    q: "How long is my money invested?",
    a: "Private real estate is illiquid. Plan on your capital being committed for the full hold period described in the offering documents, which is often several years.",
  },
  {
    q: "Can I invest with retirement funds?",
    a: "Many investors use a self directed IRA. See our self directed IRA page, and talk with the custodian and your advisor before you start.",
    link: { href: "/sdira", label: "Self directed IRA" },
  },
  {
    q: "What about taxes?",
    a: "Investors receive a Schedule K-1 each year. Depreciation can offset passive income from the property. Tax treatment depends on your situation, so review any strategy with your CPA.",
  },
];

export default function InvestPage() {
  return (
    <>
      <PageHero
        eyebrow="Request access"
        title={<>Start with a <em>conversation.</em></>}
        lede="Share a few details to unlock our current portfolio, our free guides, and the newsletter. Then book a short call with our team. Accredited status is a follow up question, never a gate."
      />

      <section className="section" id="book">
        <div className={`wrap ${styles.layout}`}>
          <div>
            <span className="eyebrow">Interested in partnering with us?</span>
            <h2>What you unlock.</h2>
            <ul className="checks mt-2">
              <li>Our current portfolio of properties and funds</li>
              <li>The Passive Real Estate Investing Guide, plus our guides for sales professionals and 1031 exchanges</li>
              <li>The newsletter: short, educational emails from Jeremy</li>
              <li>A 1 on 1 call with a member of our team</li>
              <li>Invitations to investor webinars when an opportunity fits</li>
            </ul>
            <p className="muted mt-2 small">
              Would rather talk first? <Link href={cta.secondary.href} className="text-link">{cta.secondary.label}</Link>
            </p>
            <p className="muted mt-1 small">
              Already investing with us? <a href={links.investorLogin} target="_blank" rel="noopener" className="text-link">Log in to your investor portal</a>
            </p>
          </div>
          <div className={styles.formCol}>
            <AccessForm source="invest" />
          </div>
        </div>
      </section>

      <section className="section bg-paper">
        <div className="wrap">
          <div className="head">
            <span className="eyebrow">How it works</span>
            <h2>From first call to <em>first distribution.</em></h2>
          </div>
          <Steps />
        </div>
      </section>

      <section className="section on-dark deep">
        <div className="wrap"><TrustStrip dark /></div>
      </section>

      <section className="section">
        <div className="wrap narrow">
          <div className="head">
            <span className="eyebrow">Questions</span>
            <h2>Good questions to ask.</h2>
          </div>
          <div className={styles.faq}>
            {FAQ.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>
                  {f.a} {f.link ? <Link href={f.link.href} className="text-link">{f.link.label}</Link> : null}
                </p>
              </details>
            ))}
          </div>
          <p className="small muted mt-3">Self directed IRA custodian partner: {sdiraPartner.name}.</p>
        </div>
      </section>
      <Disclaimer />
    </>
  );
}
