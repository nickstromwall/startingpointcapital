"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { flags } from "@/config/site";
import { useAccess } from "@/lib/access";
import { trackEvent } from "@/lib/analytics";
import styles from "./GuidePopup.module.css";

const KEY = "spc_popup_seen";
// Pages where an offer would interrupt a task already in progress.
const SKIP = ["/invest", "/book", "/guides", "/contact", "/partner", "/privacy", "/terms", "/disclosures", "/accreditation"];

/**
 * One subtle Investor Guide offer. Desktop: on exit intent, or after 45 seconds. Never on mobile entry:
 * on small screens it only appears after real scrolling and 30 seconds. Once per session, dismissible.
 */
export default function GuidePopup() {
  const [open, setOpen] = useState(false);
  const hasAccess = useAccess();
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!flags.guidePopup || hasAccess || SKIP.some((p) => pathname.startsWith(p))) return;
    try {
      if (sessionStorage.getItem(KEY)) return;
    } catch {}
    const show = () => {
      try {
        if (sessionStorage.getItem(KEY)) return;
        sessionStorage.setItem(KEY, "1");
      } catch {}
      setOpen(true);
      trackEvent("popup_shown", { offer: "investor-guide" });
    };
    const mobile = window.matchMedia("(max-width: 760px)").matches;
    let scrolled = false;
    const onScroll = () => { if (window.scrollY > window.innerHeight * 1.5) scrolled = true; };
    const onLeave = (e: MouseEvent) => { if (e.clientY <= 0) show(); };
    const timer = window.setTimeout(() => { if (!mobile || scrolled) show(); }, mobile ? 30000 : 45000);
    window.addEventListener("scroll", onScroll, { passive: true });
    if (!mobile) document.addEventListener("mouseout", onLeave);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseout", onLeave);
    };
  }, [hasAccess, pathname]);

  useEffect(() => {
    if (!open) return;
    ref.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;
  return (
    <div className={styles.card} role="dialog" aria-modal="false" aria-labelledby="guide-popup-title" tabIndex={-1} ref={ref}>
      <button className={styles.close} onClick={() => setOpen(false)} aria-label="Close">×</button>
      <Image src="/photos/book.jpg" alt="" width={120} height={120} className={styles.img} />
      <div>
        <p className={styles.kicker}>Free guide</p>
        <p id="guide-popup-title" className={styles.title}>A starting point for passive real estate investing.</p>
        <Link href="/guides/investor-guide" className="btn btn-gold btn-sm" onClick={() => { setOpen(false); trackEvent("popup_click", { offer: "investor-guide" }); }}>
          Read the guide <span className="arrow">→</span>
        </Link>
      </div>
    </div>
  );
}
