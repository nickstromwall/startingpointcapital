"use client";
// Investor access gate (the Elevest pattern). Signing the access form unlocks gated content on this device.
// This is a soft gate for a marketing site. Anything that must be truly private belongs in the investor portal.

import { useSyncExternalStore } from "react";

const KEY = "spc_access";
const EVENT = "spc-access-change";

function read(): string {
  try {
    return localStorage.getItem(KEY) ?? "";
  } catch {
    return "";
  }
}

function subscribe(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener(EVENT, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(EVENT, cb);
  };
}

export function grantAccess(email: string) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ email, at: Date.now() }));
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}

export function accessEmail(): string {
  try {
    return JSON.parse(read() || "{}").email ?? "";
  } catch {
    return "";
  }
}

/** True once the visitor has completed the access form on this device. False during server render. */
export function useAccess() {
  return useSyncExternalStore(subscribe, () => read() !== "", () => false);
}
