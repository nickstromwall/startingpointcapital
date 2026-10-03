"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cta, flags, links, nav, site } from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import styles from "./Header.module.css";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    // Close the menu if the screen grows past the mobile breakpoint (rotating a tablet, for example).
    const wide = window.matchMedia("(min-width: 1101px)");
    const onWide = () => wide.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    return () => {
      window.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
    };
  }, [open]);

  const items = flags.showPartnerPath ? [...nav, { href: "/partner", label: "Partner With Us" }] : nav;

  return (
    <header className={`${styles.header} ${scrolled || open ? styles.solid : ""} ${open ? styles.menuOpen : ""}`}>
      <div className={`wrap ${styles.inner}`}>
        <Link href="/" className={styles.brand} aria-label="Starting Point Capital home" onClick={() => setOpen(false)}>
          <Image src="/brand/logo-white-notag.png" alt="Starting Point Capital" width={132} height={60} priority />
        </Link>

        <nav id="site-nav" className={`${styles.nav} ${open ? styles.open : ""}`} aria-label="Main">
          <div className={styles.links}>
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={styles.link}
                aria-current={pathname.startsWith(item.href) ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className={styles.actions}>
            <a
              href={links.investorLogin}
              target="_blank"
              rel="noopener"
              className="btn btn-ghost light btn-sm"
              onClick={() => trackEvent("investor_login_click", { location: "header" })}
            >
              Investor Login
            </a>
            <Link href={cta.primary.href} className="btn btn-gold btn-sm" onClick={() => setOpen(false)}>
              {cta.primary.label}
            </Link>
          </div>
          <div className={styles.contact}>
            <Link href={cta.secondary.href} onClick={() => setOpen(false)}>{cta.secondary.label}</Link>
            <a href={site.phoneHref}>{site.phone}</a>
            <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
          </div>
        </nav>

        <button
          className={styles.toggle}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
