import Image from "next/image";
import { links, site, team } from "@/config/site";
import { pageMeta } from "@/lib/meta";
import { Disclaimer, PageHero } from "@/components/Blocks";
import LeadForm from "@/components/LeadForm";
import styles from "./contact.module.css";

export const metadata = pageMeta({
  title: "Contact",
  description: "Schedule a call with the Starting Point Capital team, or send us a message.",
  path: "/contact",
  eyebrow: "Contact",
});

export default function ContactPage() {
  const bookable = team.filter((m) => m.calendly);
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={<>Are you ready to <em>get started?</em></>}
        lede="We will help you define your investing goals, determine the right type of investment for you, and find vetted opportunities to put your hard earned money to work."
      />
      <section className="section">
        <div className={`wrap ${styles.layout}`}>
          <div>
            <span className="eyebrow">Schedule a call</span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)" }}>Book time with our team.</h2>
            <ul className={styles.people}>
              {bookable.map((m) => (
                <li key={m.slug}>
                  {m.photo ? <Image src={m.photo} alt="" width={64} height={64} className={styles.avatar} /> : null}
                  <div>
                    <strong>{m.name}</strong>
                    <span>{m.role}</span>
                  </div>
                  <a href={m.calendly} target="_blank" rel="noopener" className="btn btn-ghost btn-sm">Schedule</a>
                </li>
              ))}
            </ul>
            <div className={styles.direct}>
              <p><span>Phone</span><a href={site.phoneHref}>{site.phone}</a></p>
              <p><span>Email</span><a href={`mailto:${site.email}`}>{site.email}</a></p>
              <p><span>Investors</span><a href={links.investorLogin} target="_blank" rel="noopener">Investor portal login</a></p>
            </div>
          </div>
          <div>
            <span className="eyebrow">Send a message</span>
            <LeadForm source="contact" fields="contact" buttonLabel="Send message" success="Thank you. We will respond by email shortly to set up a personal call." />
          </div>
        </div>
      </section>
      <Disclaimer />
    </>
  );
}
