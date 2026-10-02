import Link from "next/link";
import { PageHero } from "@/components/Blocks";

export default function NotFound() {
  return (
    <PageHero eyebrow="Page not found" title={<>Let us get you back to <em>your starting point.</em></>} lede="The page you were looking for has moved or no longer exists.">
      <div className="btn-row mt-3">
        <Link href="/" className="btn btn-gold">Home</Link>
        <Link href="/podcast" className="btn btn-ghost">Podcast</Link>
        <Link href="/resources" className="btn btn-ghost">Resources</Link>
      </div>
    </PageHero>
  );
}
