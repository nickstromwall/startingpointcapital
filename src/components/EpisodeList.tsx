"use client";

import { useMemo, useState } from "react";
import type { Episode } from "@/lib/podcast";
import EpisodeCard from "./EpisodeCard";

const PAGE = 12;

/** Searchable archive. All episodes stay crawlable via their own pages and the sitemap. */
export default function EpisodeList({ episodes }: { episodes: Episode[] }) {
  const [q, setQ] = useState("");
  const [count, setCount] = useState(PAGE);
  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    return t ? episodes.filter((e) => `${e.title} ${e.descriptionHtml}`.toLowerCase().includes(t)) : episodes;
  }, [q, episodes]);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 20, flexWrap: "wrap", marginBottom: 32 }}>
        <div>
          <span className="eyebrow">All episodes</span>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)" }}>{episodes.length + 1} conversations and counting.</h2>
        </div>
        <label className="field" style={{ minWidth: "min(340px, 100%)", margin: 0 }}>
          <span>Search episodes</span>
          <input className="input" type="search" value={q} onChange={(e) => { setQ(e.target.value); setCount(PAGE); }} placeholder="Taxes, 1031, multifamily…" />
        </label>
      </div>
      <div className="grid grid-3">
        {filtered.slice(0, count).map((e) => <EpisodeCard key={e.slug} e={e} />)}
      </div>
      {filtered.length === 0 ? <p className="muted">No episodes match that search.</p> : null}
      {count < filtered.length ? (
        <div className="center mt-3">
          <button className="btn btn-navy" onClick={() => setCount((c) => c + PAGE)}>Load more episodes</button>
        </div>
      ) : null}
    </>
  );
}
