import { sdiraPartner, taxNote } from "@/config/site";
import { pageMeta } from "@/lib/meta";
import { CtaBand, Disclaimer, PageHero } from "@/components/Blocks";

export const metadata = pageMeta({
  title: "Self Directed IRA",
  description: "How investors use a self directed IRA to hold private real estate investments.",
  path: "/sdira",
  eyebrow: "Retirement accounts",
});

export default function SdiraPage() {
  return (
    <>
      <PageHero
        eyebrow="Retirement accounts"
        title={<>Put your retirement savings <em>to work in real estate.</em></>}
        lede="A self directed IRA is a retirement account held by a custodian that allows you to invest in alternative assets, such as those offered by Starting Point Capital."
      />
      <section className="section">
        <div className="wrap split">
          <div className="prose">
            <h2 style={{ marginTop: 0 }}>How it works</h2>
            <ul>
              <li>Open a self directed IRA with a custodian that supports private real estate.</li>
              <li>Transfer or roll over funds from an existing IRA or eligible retirement plan.</li>
              <li>Direct the custodian to invest in the offering once your subscription is approved.</li>
              <li>Distributions return to the IRA, keeping the tax advantages of the account.</li>
            </ul>
            <p>Self directed accounts have specific rules, including prohibited transactions and, in some cases, taxes on leveraged income (UBIT). {taxNote}</p>
          </div>
          <div className="card">
            <h3>Our custodian partner</h3>
            <p className="mt-1">We work with {sdiraPartner.name} to help investors open and fund a self directed IRA.</p>
            <a href={sdiraPartner.url} target="_blank" rel="noopener" className="btn btn-navy mt-2">Learn more <span className="arrow">→</span></a>
          </div>
        </div>
      </section>
      <CtaBand source="sdira" />
      <Disclaimer />
    </>
  );
}
