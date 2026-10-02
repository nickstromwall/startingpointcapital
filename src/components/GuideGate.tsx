"use client";

import { useState } from "react";
import { useAccess } from "@/lib/access";
import LeadForm from "./LeadForm";
import AccessForm from "./AccessForm";
import styles from "./GuideGate.module.css";

/** Step one: name and email unlocks the rest of the guide. Step two: phone and booking via the access flow. */
export default function GuideGate({ slug, children }: { slug: string; title?: string; children: React.ReactNode }) {
  const hasAccess = useAccess();
  const [unlocked, setUnlocked] = useState(false);
  const open = hasAccess || unlocked;

  if (!open) {
    return (
      <div className={styles.gate}>
        <div className={styles.fade} aria-hidden="true" />
        <div className={styles.card}>
          <div>
            <span className="eyebrow">Keep reading, free</span>
            <h2 className={styles.title}>Unlock the rest of the guide.</h2>
            <p className="muted mt-1">Enter your name and email to read the full guide. We will also send you a copy to keep, plus our short educational emails. Unsubscribe anytime.</p>
          </div>
          <LeadForm source="guide" resource={slug} unlocks buttonLabel="Unlock the guide" success="Unlocked." onSuccess={() => setUnlocked(true)} />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="prose">{children}</div>
      <div className={styles.next} id="book">
        <span className="eyebrow">Your next step</span>
        <h2 className={styles.title}>Talk it through with our team.</h2>
        <p className="muted mt-1">Add your phone number and pick a time that works. A short, no pressure call about your goals and your questions.</p>
        <div className="mt-2"><AccessForm source={`guide-${slug}`} /></div>
      </div>
    </>
  );
}
