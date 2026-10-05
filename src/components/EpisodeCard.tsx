import Image from "next/image";
import Link from "next/link";
import { type Episode, formatDate, formatDuration, isPassiveInvestingMadeSimple, summary } from "@/lib/podcast";
import PimsArt from "./PimsArt";
import styles from "./EpisodeCard.module.css";

export default function EpisodeCard({ e, feature }: { e: Episode; feature?: boolean }) {
  return (
    <Link href={`/podcast/${e.slug}`} className={`${styles.card} ${feature ? styles.feature : ""}`}>
      <div className={styles.art}>
        {isPassiveInvestingMadeSimple(e) ? <PimsArt lesson={e.title.match(/#\s*(\d+)/)?.[1]} /> : e.image ? <Image src={e.image} alt="" fill sizes={feature ? "(max-width: 1020px) 100vw, 40vw" : "160px"} style={{ objectFit: "cover" }} /> : null}
      </div>
      <div className={styles.body}>
        <p className={styles.meta}>{formatDate(e.date)}{formatDuration(e.duration) ? ` · ${formatDuration(e.duration)}` : ""}</p>
        <h3>{e.title}</h3>
        <p className={styles.sum}>{summary(e, feature ? 300 : 140)}</p>
      </div>
    </Link>
  );
}
