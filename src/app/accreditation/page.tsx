import { pageMeta } from "@/lib/meta";
import Legal from "@/components/Legal";

export const metadata = pageMeta({ title: "Accreditation", description: "What it means to be an accredited investor.", path: "/accreditation" });

export default function Page() {
  return (
    <Legal title="What is an accredited investor?" updated="October 1, 2026">
      <p>Many private real estate offerings are available only to accredited investors, as defined by the SEC in Rule 501 of Regulation D. In general, you may qualify as an individual if you meet one of the following:</p>
      <ul>
        <li>Income over $200,000 in each of the past two years ($300,000 together with a spouse or spousal equivalent), with a reasonable expectation of the same this year.</li>
        <li>Net worth over $1 million, alone or with a spouse or spousal equivalent, excluding your primary residence.</li>
        <li>You hold a Series 7, 65, or 82 license in good standing.</li>
      </ul>
      <p>Entities such as trusts, LLCs, and retirement accounts have their own tests. Some offerings made under Rule 506(b) may also be available to a limited number of sophisticated investors who are not accredited and who have a prior relationship with the sponsor.</p>
      <p>Not sure where you stand? That is a normal question, and a good one to bring to your first call with us and to your CPA or attorney. This page is a summary for education only. The SEC’s rules control.</p>
    </Legal>
  );
}
