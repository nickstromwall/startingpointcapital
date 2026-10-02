"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { captureUtm } from "@/lib/analytics";

/** Fades sections in as they scroll into view (content stays visible without JS), and captures UTMs. */
export default function Reveal() {
  const pathname = usePathname();
  useEffect(() => {
    captureUtm();
    document.documentElement.classList.add("js");
    const els = document.querySelectorAll(".reveal:not(.in)");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);
  return null;
}
