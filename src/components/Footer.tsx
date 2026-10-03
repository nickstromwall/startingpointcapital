import Link from "next/link";
import Image from "next/image";
import { disclaimer, flags, links, podcast, site } from "@/config/site";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="wrap">
        <div className={styles.top}>
          <div className={styles.brandCol}>
            <Image src="/brand/logo-white.png" alt="Starting Point Capital, Passive Real Estate Investing" width={190} height={107} />
            <p className={styles.tag}>{site.emailSignatureTagline}</p>
            <p className={styles.powered}>
              Powered by <a href={links.rise48} target="_blank" rel="noopener">Rise48 Equity</a>
            </p>
          </div>
          <div>
            <h4>Invest</h4>
            <ul>
              <li><Link href="/invest">Request access</Link></li>
              <li><Link href="/book">Book a call</Link></li>
              <li><Link href="/portfolio">Portfolio</Link></li>
              <li><Link href="/sdira">Self directed IRA</Link></li>
              <li><a href={links.investorLogin} target="_blank" rel="noopener">Investor login</a></li>
            </ul>
          </div>
          <div>
            <h4>Learn</h4>
            <ul>
              <li><Link href="/resources">Resources</Link></li>
              <li><Link href="/guides/investor-guide">Investor guide</Link></li>
              <li><Link href="/newsletter">Newsletter</Link></li>
              <li><Link href="/podcast">{podcast.name}</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><a href={links.book} target="_blank" rel="noopener">The book</a></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><Link href="/about">About</Link></li>
              {flags.showPartnerPath ? <li><Link href="/partner">Partner With Us</Link></li> : null}
              <li><Link href="/contact">Contact</Link></li>
              <li><a href={site.phoneHref}>{site.phone}</a></li>
              <li><a href={`mailto:${site.email}`}>Email us</a></li>
            </ul>
          </div>
        </div>

        <div className={styles.social}>
          <a href={links.linkedin} target="_blank" rel="noopener">LinkedIn</a>
          <a href={links.instagram} target="_blank" rel="noopener">Instagram</a>
          <a href={podcast.youtube} target="_blank" rel="noopener">YouTube</a>
          <a href={podcast.apple} target="_blank" rel="noopener">Apple Podcasts</a>
        </div>

        <p className={styles.legal}>{disclaimer}</p>
        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} Starting Point Capital. All rights reserved.</span>
          <nav aria-label="Legal">
            <Link href="/disclosures">Disclosures</Link>
            <Link href="/accreditation">Accreditation</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
