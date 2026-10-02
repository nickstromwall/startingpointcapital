"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { flags, links, nav } from "@/config/site";
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
  }, [open]);

  const items = flags.showPartnerPath ? [...nav, { href: "/partner", label: "Partner" }] : nav;

  return (
    <header className={`${styles.header} ${scrolled || open ? styles.solid : ""}`}>
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
            <Link href="/contact" className="btn btn-ghost light btn-sm" onClick={() => setOpen(false)}>
              Contact
            </Link>
            <a
              href={links.investorLogin}
              target="_blank"
              rel="noopener"
              className="btn btn-gold btn-sm"
              onClick={() => trackEvent("investor_login_click", { location: "header" })}
            >
              Investor Login
            </a>
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
