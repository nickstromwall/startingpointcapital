"use client";

import Image from "next/image";
import { useState } from "react";
import { flags } from "@/config/site";
import { useAccess } from "@/lib/access";
import { categories, dealOperator, dealUnits, deals } from "@/lib/portfolio";
import AccessForm from "./AccessForm";
import styles from "./Portfolio.module.css";

export default function Portfolio() {
  const hasAccess = useAccess();
  const [cat, setCat] = useState<string>("all");
  // Unlocked from this page: keep the form mounted so the accredited follow up still shows.
  const [followUp, setFollowUp] = useState(false);
  const open = flags.publicPortfolioNames || hasAccess;

  const shown = cat === "all" ? deals : deals.filter((d) => d.category === cat);
  return (
    <div className={open ? undefined : styles.locked}>
      {!open ? (
        <div className={styles.mosaic} aria-hidden="true">
          {deals.slice(0, 12).map((d) => (
            <div key={d.slug} className={styles.tile}>
              <Image src={d.image} alt="" fill sizes="25vw" style={{ objectFit: "cover" }} />
            </div>
          ))}
        </div>
      ) : null}
      {!open || followUp ? (
        <div className={open ? styles.followUp : styles.lockCard}>
          {!open ? (
            <div>
              <span className="eyebrow">Investor access</span>
              <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)" }}>See our current portfolio.</h2>
              <p className="muted mt-1">Every property and fund our investors have participated in, with market, size, and year. Request access to unlock it, along with our free guides and newsletter.</p>
            </div>
          ) : null}
          <AccessForm source="portfolio" compact onGranted={() => setFollowUp(true)} />
        </div>
      ) : null}
      {open ? (
        <>
      <div className={styles.filters} role="tablist" aria-label="Filter portfolio">
        {[{ key: "all", label: "All" }, ...categories].map((c) => (
          <button key={c.key} role="tab" aria-selected={cat === c.key} className={styles.filter} onClick={() => setCat(c.key)}>
            {c.label}
            <span>{c.key === "all" ? deals.length : deals.filter((d) => d.category === c.key).length}</span>
          </button>
        ))}
      </div>
      <ul className={styles.grid}>
        {shown.map((d) => (
          <li key={d.slug} className={styles.card}>
            <div className={styles.img}>
              <Image src={d.image} alt={d.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1020px) 50vw, 33vw" style={{ objectFit: "cover" }} />
              {d.year ? <span className={styles.year}>{d.year}</span> : null}
            </div>
            <div className={styles.body}>
              <h3>{d.name}</h3>
              <p className={styles.loc}>{d.location}</p>
              <p className={styles.meta}>{dealUnits(d)}</p>
              {dealOperator(d) ? <p className={styles.operator}>{dealOperator(d)}</p> : null}
            </div>
          </li>
        ))}
      </ul>
        </>
      ) : null}
    </div>
  );
}
