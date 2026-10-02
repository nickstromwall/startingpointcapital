import type { GuideSection } from "@/content/guides";

export default function Sections({ sections }: { sections: GuideSection[] }) {
  return (
    <>
      {sections.map((s) => (
        <section key={s.heading}>
          <h2>{s.heading}</h2>
          {s.paragraphs?.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
          {s.bullets ? (
            <ul>
              {s.bullets.map((b) => <li key={b.slice(0, 40)}>{b}</li>)}
            </ul>
          ) : null}
        </section>
      ))}
    </>
  );
}
