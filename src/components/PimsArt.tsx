import Image from "next/image";
import { podcast } from "@/config/site";
import styles from "./PimsArt.module.css";

/**
 * Series art for Passive Investing Made Simple (Jeremy, Oct 5: the series logo, not the On the Rise host photo).
 * Fills its positioned parent. Uses podcast.pimsLogo when a real logo file is set, otherwise a typeset title card.
 */
export default function PimsArt({ lesson }: { lesson?: string | null }) {
  if (podcast.pimsLogo) {
    return <Image src={podcast.pimsLogo} alt="Passive Investing Made Simple" fill sizes="(max-width: 640px) 100vw, 33vw" style={{ objectFit: "cover" }} />;
  }
  return (
    <div className={styles.art} role="img" aria-label="Passive Investing Made Simple">
      <span className={styles.kicker}>A monthly series</span>
      <span className={styles.title}>
        Passive Investing
        <em>Made Simple</em>
      </span>
      {lesson ? <span className={styles.lesson}>Lesson {lesson}</span> : <span className={styles.lesson}>On the Rise Podcast</span>}
    </div>
  );
}
