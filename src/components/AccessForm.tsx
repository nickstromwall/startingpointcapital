"use client";

import Link from "next/link";
import { useState } from "react";
import { grantAccess, useAccess } from "@/lib/access";
import { trackEvent } from "@/lib/analytics";
import { submitLead } from "./submitLead";
import CalendlyEmbed from "./CalendlyEmbed";
import styles from "./Forms.module.css";

type Step = "details" | "accredited" | "done";

/**
 * Get Access, the Elevest pattern.
 * Step 1: name, email, phone, consent. This unlocks gated content.
 * Step 2: accredited status, asked as a follow up and never a blocker.
 * Step 3: book a call with the team.
 */
export default function AccessForm({ dark, source = "access", compact, onGranted }: { dark?: boolean; source?: string; compact?: boolean; onGranted?: () => void }) {
  const hasAccess = useAccess();
  const [step, setStep] = useState<Step>("details");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [who, setWho] = useState({ name: "", email: "" });

  async function onDetails(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setSending(true);
    setError("");
    try {
      const email = String(f.get("email") ?? "");
      const firstName = String(f.get("firstName") ?? "");
      await submitLead({
        firstName,
        lastName: f.get("lastName"),
        email,
        phone: f.get("phone"),
        consent: f.get("consent") === "on",
        website: f.get("website"),
        source,
        intent: "investor",
      });
      onGranted?.();
      grantAccess(email);
      setWho({ name: `${firstName} ${f.get("lastName") ?? ""}`.trim(), email });
      trackEvent("get_access", { source });
      trackEvent("generate_lead", { source });
      setStep("accredited");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSending(false);
    }
  }

  async function onAccredited(answer: "yes" | "no" | "unsure") {
    setStep("done");
    submitLead({ email: who.email, accredited: answer, source: "accredited-followup", intent: "investor" }).catch(() => {});
    trackEvent("accredited_answer", { answer });
  }

  const box = `${styles.box} ${dark ? styles.dark : ""}`;

  if (step === "accredited") {
    return (
      <div className={box} aria-live="polite">
        <p className={styles.kicker}>Access granted</p>
        <h3>One quick question.</h3>
        <p className={styles.body}>
          Are you an accredited investor? This helps us share the right opportunities. Not sure? That is common, and we can walk you through it.
        </p>
        <div className={styles.choices}>
          <button className="btn btn-navy" onClick={() => onAccredited("yes")}>Yes, I am</button>
          <button className="btn btn-ghost" onClick={() => onAccredited("unsure")}>I’m not sure</button>
          <button className="btn btn-ghost" onClick={() => onAccredited("no")}>Not yet</button>
        </div>
        <p className="form-note"><Link href="/accreditation">What does accredited mean?</Link></p>
      </div>
    );
  }

  if (step === "done" || (hasAccess && step === "details")) {
    return (
      <div className={box} aria-live="polite">
        <p className={styles.kicker}>You have access</p>
        <h3>Welcome. Here is what is unlocked.</h3>
        <ul className={styles.unlocked}>
          <li><Link href="/portfolio">Our full portfolio</Link></li>
          <li><Link href="/guides/investor-guide">The Passive Real Estate Investing Guide</Link></li>
          <li><a href="#book">A 1 on 1 call with our team</a></li>
        </ul>
        {!compact ? (
          <div id="book" className={styles.book}>
            <p className={styles.body}>The best next step is a short call. We will learn your goals and show you how our investors participate.</p>
            <CalendlyEmbed location={source} prefill={who} height={680} />
          </div>
        ) : (
          <Link href="/invest#book" className="btn btn-navy mt-1">Book a call <span className="arrow">→</span></Link>
        )}
      </div>
    );
  }

  return (
    <form className={box} onSubmit={onDetails}>
      <div className="form-row">
        <label className="field"><span>First name</span><input className="input" name="firstName" autoComplete="given-name" required maxLength={80} /></label>
        <label className="field"><span>Last name</span><input className="input" name="lastName" autoComplete="family-name" required maxLength={80} /></label>
      </div>
      <label className="field"><span>Email</span><input className="input" name="email" type="email" autoComplete="email" required maxLength={254} /></label>
      <label className="field"><span>Phone</span><input className="input" name="phone" type="tel" autoComplete="tel" required maxLength={40} /></label>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
      <label className="check">
        <input type="checkbox" name="consent" required />
        <span>I agree to receive emails, text messages, and calls from Starting Point Capital about investment education and opportunities. Message and data rates may apply. Reply STOP to opt out.</span>
      </label>
      <button className={`btn ${dark ? "btn-gold" : "btn-navy"} ${styles.submit}`} disabled={sending}>
        {sending ? "Sending…" : <>Get Access <span className="arrow">→</span></>}
      </button>
      {error ? <p className="form-error" role="alert">{error}</p> : null}
      <p className="form-note">
        Free. We never sell your information. See our <Link href="/privacy">privacy policy</Link>.
      </p>
    </form>
  );
}
