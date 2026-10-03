import { pageMeta } from "@/lib/meta";
import { Disclaimer, PageHero } from "@/components/Blocks";
import LeadForm from "@/components/LeadForm";

export const metadata = pageMeta({
  title: "Newsletter",
  description: "Short, educational emails about passive real estate investing from Jeremy Dyer and the Starting Point Capital team.",
  path: "/newsletter",
  eyebrow: "Newsletter",
});

export default function NewsletterPage() {
  return (
    <>
      <PageHero eyebrow="Newsletter" title={<>Learn passive investing, <em>one email at a time.</em></>} lede="Short, personal, educational emails from Jeremy every few days. No hype, no spam. Unsubscribe anytime. Want our portfolio and free guides too? Request access instead, and the newsletter comes with it." />
      <section className="section bg-paper">
        <div className="wrap" style={{ maxWidth: 620 }}>
          <LeadForm source="newsletter" buttonLabel="Subscribe" success="You are subscribed. Check your inbox." unlocks />
        </div>
      </section>
      <Disclaimer />
    </>
  );
}
