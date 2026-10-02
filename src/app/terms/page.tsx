import { pageMeta } from "@/lib/meta";
import Legal from "@/components/Legal";

export const metadata = pageMeta({ title: "Terms of Use", description: "Terms for using the Starting Point Capital website.", path: "/terms" });

export default function Page() {
  return (
    <Legal title="Terms of use" updated="October 1, 2026">
      <p>By using this website you agree to these draft terms. If you do not agree, please do not use the site.</p>
      <h2>Informational use only</h2>
      <p>The content on this site is for general education. It is not an offer of securities, and it is not tax, legal, or investment advice. Do not rely on it to make an investment decision.</p>
      <h2>Accuracy</h2>
      <p>We work to keep information current, but figures and content may change without notice and may contain errors. Figures are as of the dates shown.</p>
      <h2>Third party links</h2>
      <p>Links to third party sites, including our operating partner, custodians, and podcast platforms, are provided for convenience. We are not responsible for their content or practices.</p>
      <h2>Intellectual property</h2>
      <p>The Starting Point Capital name, logo, and content belong to Starting Point Capital or its licensors and may not be used without permission.</p>
      <h2>Limitation of liability</h2>
      <p>To the fullest extent permitted by law, Starting Point Capital is not liable for any damages arising from your use of this website.</p>
    </Legal>
  );
}
