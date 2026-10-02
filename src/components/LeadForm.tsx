"use client";

import Link from "next/link";
import { useState } from "react";
import { grantAccess } from "@/lib/access";
import { trackEvent } from "@/lib/analytics";
import { submitLead } from "./submitLead";
import styles from "./Forms.module.css";

/** General purpose form: newsletter, guides, contact, partner interest. */
export default function LeadForm({
  source,
  intent = "investor",
  resource,
  fields = "name-email",
  buttonLabel = "Submit",
  success = "Thank you. We will be in touch shortly.",
  successBody,
  dark,
  unlocks,
  onSuccess,
}: {
  source: string;
  intent?: "investor" | "partner";
  resource?: string;
  fields?: "name-email" | "full" | "contact";
  buttonLabel?: string;
  success?: string;
  successBody?: React.ReactNode;
  dark?: boolean;
  /** Treat this form as an access form too (guides unlock the rest of the site's gated content). */
  unlocks?: boolean;
  onSuccess?: () => void;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setStatus("sending");
    setError("");
    try {
      const email = String(f.get("email") ?? "");
      await submitLead({
        firstName: f.get("firstName"),
        lastName: f.get("lastName"),
        email,
        phone: f.get("phone"),
        message: f.get("message"),
        consent: f.get("consent") === "on",
        website: f.get("website"),
        source,
        intent,
        resource,
      });
      if (unlocks) grantAccess(email);
      trackEvent("generate_lead", { source, resource });
      setStatus("done");
      onSuccess?.();
    } catch (err) {
      setError((err as Error).message);
      setStatus("error");
    }
  }

  const box = `${styles.box} ${dark ? styles.dark : ""}`;
  if (status === "done") {
    return (
      <div className={box} aria-live="polite">
        <h3>{success}</h3>
        {successBody ? <div className={`${styles.body} mt-1`}>{successBody}</div> : null}
      </div>
    );
  }

  const phone = fields === "full" || fields === "contact";
  return (
    <form className={box} onSubmit={onSubmit}>
      <div className="form-row">
        <label className="field"><span>First name</span><input className="input" name="firstName" autoComplete="given-name" required maxLength={80} /></label>
        <label className="field"><span>Last name</span><input className="input" name="lastName" autoComplete="family-name" maxLength={80} required={fields !== "name-email"} /></label>
      </div>
      <label className="field"><span>Email</span><input className="input" name="email" type="email" autoComplete="email" required maxLength={254} /></label>
      {phone ? <label className="field"><span>Phone {fields === "contact" ? "(optional)" : ""}</span><input className="input" name="phone" type="tel" autoComplete="tel" maxLength={40} required={fields === "full"} /></label> : null}
      {fields === "contact" ? <label className="field"><span>How can we help?</span><textarea className="input" name="message" maxLength={2000} /></label> : null}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
      {phone ? (
        <label className="check">
          <input type="checkbox" name="consent" required={fields === "full"} />
          <span>I agree to receive emails, text messages, and calls from Starting Point Capital. Message and data rates may apply. Reply STOP to opt out.</span>
        </label>
      ) : null}
      <button className={`btn ${dark ? "btn-gold" : "btn-navy"} ${styles.submit}`} disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : <>{buttonLabel} <span className="arrow">→</span></>}
      </button>
      {status === "error" ? <p className="form-error" role="alert">{error}</p> : null}
      <p className="form-note">No spam. Unsubscribe anytime. <Link href="/privacy">Privacy policy</Link>.</p>
    </form>
  );
}
