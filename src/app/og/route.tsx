import { ImageResponse } from "next/og";

// Branded 1200x630 share image: navy and property photo on the left with the SPC logo and page title,
// Jeremy's headshot on the right so a texted or posted link shows a real face.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const title = (searchParams.get("title") ?? "Passive cash flow, without being a landlord").slice(0, 110);
  const eyebrow = (searchParams.get("eyebrow") ?? "Starting Point Capital").slice(0, 60);
  const photo = searchParams.get("photo") === "creekside" ? "creekside" : "desert-cove";
  const size = title.length > 70 ? 46 : title.length > 45 ? 54 : 62;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#0e1730" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${origin}/photos/${photo}.jpg`} alt="" width={1200} height={630} style={{ position: "absolute", inset: 0, objectFit: "cover", opacity: 0.3 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(14,23,48,0.97) 0%, rgba(14,23,48,0.85) 55%, rgba(14,23,48,0.6) 100%)" }} />

        {/* Jeremy, right side, fading into the navy */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${origin}/team/jeremy.jpg`} alt="" width={540} height={630} style={{ position: "absolute", right: 0, top: 0, width: 540, height: 630, objectFit: "cover", objectPosition: "50% 20%" }} />
        <div style={{ position: "absolute", right: 340, top: 0, width: 200, height: 630, background: "linear-gradient(90deg, rgba(14,23,48,1) 0%, rgba(14,23,48,0) 100%)" }} />
        <div style={{ position: "absolute", right: 0, bottom: 0, width: 540, height: 160, background: "linear-gradient(0deg, rgba(14,23,48,0.9) 0%, rgba(14,23,48,0) 100%)" }} />
        <div style={{ position: "absolute", right: 36, bottom: 30, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <div style={{ color: "white", fontSize: 26 }}>Jeremy Dyer</div>
          <div style={{ color: "#c9a646", fontSize: 17, letterSpacing: 3, textTransform: "uppercase", marginTop: 4 }}>Founder and Managing Partner</div>
        </div>

        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "60px 0 60px 68px", width: 700 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${origin}/brand/logo-white-notag.png`} alt="" width={230} height={104} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, color: "#c9a646", fontSize: 22, letterSpacing: 5, textTransform: "uppercase" }}>
              <div style={{ width: 44, height: 3, background: "#c9a646" }} />
              {eyebrow}
            </div>
            <div style={{ marginTop: 20, color: "white", fontSize: size, lineHeight: 1.12, letterSpacing: -1 }}>{title}</div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630, headers: { "Cache-Control": "public, max-age=86400, s-maxage=604800" } },
  );
}
