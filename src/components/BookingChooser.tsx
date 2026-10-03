"use client";

import { useState } from "react";
import { links } from "@/config/site";
import CalendlyEmbed from "./CalendlyEmbed";
import styles from "./BookingChooser.module.css";

// Calls booked with investors and capital partners are the number one result Jeremy wants (Oct 3).
// Each path tags its GA4 `call_booked` event with its own location so the two can be counted separately.
const PATHS = {
  investor: {
    label: "I want to invest",
    title: "A short call about your goals.",
    body: "We will learn what you want your money to do, answer your questions, and show you how our investors participate. No pressure, ever.",
    url: links.calendly,
  },
  partner: {
    label: "I want to partner with you",
    title: "A conversation about partnering.",
    body: "For professionals with a network that trusts them. We will talk about your background and how our capital partners work alongside us.",
    url: links.calendlyPartner,
  },
} as const;

type Path = keyof typeof PATHS;

export default function BookingChooser({ initial = "investor" }: { initial?: Path }) {
  const [path, setPath] = useState<Path>(initial);
  const p = PATHS[path];
  return (
    <div>
      <div className={styles.tabs} role="tablist" aria-label="What would you like to talk about?">
        {(Object.keys(PATHS) as Path[]).map((k) => (
          <button key={k} role="tab" aria-selected={path === k} className={styles.tab} onClick={() => setPath(k)}>
            {PATHS[k].label}
          </button>
        ))}
      </div>
      <div className={styles.intro}>
        <h2>{p.title}</h2>
        <p className="muted">{p.body}</p>
      </div>
      <CalendlyEmbed key={path} url={p.url} location={`book-${path}`} height={720} />
    </div>
  );
}
