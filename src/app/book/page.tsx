import Link from "next/link";
import { cta, site } from "@/config/site";
import { pageMeta } from "@/lib/meta";
import { Disclaimer, PageHero } from "@/components/Blocks";
import BookingChooser from "@/components/BookingChooser";

export const metadata = pageMeta({
  title: "Book a Call",
  description: "Book a short call with the Starting Point Capital team, as an investor or as a prospective capital partner.",
  path: "/book",
  eyebrow: "Book a call",
});

export default function BookPage() {
  return (
    <>
      <PageHero
        eyebrow="Book a call"
        title={<>Let&apos;s <em>talk.</em></>}
        lede="Pick a time that works for you. Every conversation starts with your goals, not a pitch."
      />
      <section className="section bg-paper">
        <div className="wrap">
          <BookingChooser />
          <p className="small muted mt-3">
            Prefer to look around first? <Link href={cta.primary.href} className="text-link">{cta.primary.label}</Link> to see our portfolio and free guides. You can also call us at <a href={site.phoneHref}>{site.phone}</a>.
          </p>
        </div>
      </section>
      <Disclaimer />
    </>
  );
}
