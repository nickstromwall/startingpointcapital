import { disclaimer } from "@/config/site";
import { pageMeta } from "@/lib/meta";
import Legal from "@/components/Legal";

export const metadata = pageMeta({ title: "Disclosures", description: "Important disclosures about investing with Starting Point Capital.", path: "/disclosures" });

export default function Page() {
  return (
    <Legal title="Important disclosures" updated="October 1, 2026">
      <p>{disclaimer}</p>
      <h2>No offer or solicitation</h2>
      <p>Nothing on this website is an offer to sell, or a solicitation of an offer to buy, any security. Any offer will be made only to qualified investors through official offering documents, including a private placement memorandum, operating agreement, and subscription agreement. Many offerings are made under Rule 506(b) of Regulation D and are not advertised to the public.</p>
      <h2>Risk of loss</h2>
      <p>Private real estate investments are speculative and involve a high degree of risk, including the possible loss of your entire investment. They are illiquid, and you should be prepared to hold an investment for its full term.</p>
      <h2>Past performance</h2>
      <p>Past performance, including any track record of Starting Point Capital, its partners, or Rise48 Equity, is not indicative of future results. Figures shown on this site are as of the date noted and may change.</p>
      <h2>No tax, legal, or investment advice</h2>
      <p>Content on this site is educational. It is not tax, legal, or investment advice. Tax benefits such as depreciation, cost segregation, and bonus depreciation depend on your individual situation. Review any strategy with your CPA, attorney, and financial advisor.</p>
      <h2>Forward looking statements</h2>
      <p>Statements about goals, strategies, or expectations are forward looking and subject to risks and uncertainties. Actual results may differ materially.</p>
      <h2>Relationship with Rise48 Equity</h2>
      <p>Starting Point Capital raises capital for investments operated by Rise48 Equity and its affiliates. Members of our team hold roles with Rise48 Equity. Details of every relationship and any fees are described in each offering’s documents.</p>
    </Legal>
  );
}
