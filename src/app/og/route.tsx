import { ImageResponse } from "next/og";

// Branded 1200x630 share image: property photo, navy wash, SPC logo, page title.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const title = (searchParams.get("title") ?? "Passive multifamily investing for busy professionals").slice(0, 110);
  const eyebrow = (searchParams.get("eyebrow") ?? "Starting Point Capital").slice(0, 60);
  const photo = searchParams.get("photo") === "creekside" ? "creekside" : "desert-cove";

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#0e1730" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${origin}/photos/${photo}.jpg`} alt="" width={1200} height={630} style={{ position: "absolute", inset: 0, objectFit: "cover", opacity: 0.38 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(14,23,48,0.96) 0%, rgba(14,23,48,0.7) 60%, rgba(14,23,48,0.35) 100%)" }} />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", width: "100%" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${origin}/brand/logo-white-notag.png`} alt="" width={250} height={113} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, color: "#c9a646", fontSize: 24, letterSpacing: 5, textTransform: "uppercase" }}>
              <div style={{ width: 44, height: 3, background: "#c9a646" }} />
              {eyebrow}
            </div>
            <div style={{ marginTop: 22, color: "white", fontSize: title.length > 60 ? 54 : 66, lineHeight: 1.1, maxWidth: 940, letterSpacing: -1 }}>{title}</div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630, headers: { "Cache-Control": "public, max-age=86400, s-maxage=604800" } },
  );
}
