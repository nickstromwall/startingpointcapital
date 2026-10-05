// Starting Point Capital: central site configuration.
//
// Every stat, link, team member, and CTA lives here so values can change without touching layout.
// Anything marked CONFIRM is a placeholder or unverified. Do not treat it as final until Nick or Jeremy signs off.
// v2 follows Jeremy's answers from Oct 3, 2026 (see "v2 decisions" in README.md).
// Copy rule for this file and the whole site: no em dashes or en dashes. Reword instead.

export const site = {
  name: "Starting Point Capital",
  shortName: "SPC",
  url: "https://www.startingpointcapital.com",
  tagline: "Passive multifamily investing for busy professionals.",
  description:
    "Starting Point Capital helps busy professionals invest passively in institutional quality multifamily real estate, alongside a team that invests its own money in every deal.",
  email: "jeremy@startingpointcapital.com",
  phone: "+1 952-200-2173",
  phoneHref: "tel:+19522002173",
  location: "Lake Elmo, Minnesota",
  emailSignatureTagline: "Multifamily real estate investing. Partner with us on our next deal.",
};

/**
 * Calls to action, in Jeremy's order of priority (Oct 3): request access, book a call, join the newsletter.
 * Every page leads with `primary`, offers `secondary` next to it, and keeps `tertiary` as the quiet fallback.
 */
export const cta = {
  primary: { label: "Request Access", href: "/invest" },
  secondary: { label: "Book a call", href: "/book" },
  tertiary: { label: "Join the newsletter", href: "/newsletter" },
};

export const links = {
  // CONFIRM: the site uses calendly.com/jeremy-rise48equity; Jeremy's email signature uses calendly.com/startingpointcapital.
  // Consider one routing link for the whole team instead of five separate calendars.
  calendly: "https://calendly.com/jeremy-rise48equity",
  // CONFIRM: a separate Calendly event for capital partner conversations, so those bookings can be counted on their own.
  // Until one exists, partner calls book on Jeremy's main link and are told apart by the GA4 `call_booked` path.
  calendlyPartner: "https://calendly.com/jeremy-rise48equity",
  // CONFIRM: exact Fundamental Portal URL for the SPC instance (the call transcript was garbled).
  investorLogin: "https://startingpointcapital.fundamentalportal.com",
  // Additional portals, if any deals use a different provider. CONFIRM names and URLs.
  otherPortals: [] as { name: string; url: string }[],
  book: "https://a.co/d/dUVrRsk",
  linkedin: "https://www.linkedin.com/in/jeremydyer",
  instagram: "https://www.instagram.com/jeremyjdyer",
  rise48: "https://rise48equity.com",
  // Google Business Profile does not exist yet. Paste the review link here once it does.
  googleReviews: "",
};

export const podcast = {
  name: "On the Rise Podcast",
  formerName: "The Freedom Point Podcast",
  host: "Jeremy Dyer",
  // The Libsyn feed now redirects here (Riverside hosting). Faith Driven Leaders episodes are filtered out in src/lib/podcast.ts.
  feed: "https://api.riverside.com/hosting/Ba87vNZN.rss",
  apple: "https://podcasts.apple.com/us/podcast/the-on-the-rise-podcast/id1661860400",
  spotify: "https://open.spotify.com/show/5j8WuDE5NOYwjfNFL6dwFT",
  youtube: "https://www.youtube.com/@TheOnTheRisePodcast",
  // Old Faith Driven Leaders episode URLs forward here.
  faithDrivenLeaders: "https://faithdrivenleaderpodcast.com",
  // Only the latest few episodes live on SPC (Jeremy, Oct 3). They refresh from the feed daily, so there is no weekly upkeep.
  // Older episodes forward to /podcast, and the full archive stays on Apple, Spotify, and YouTube.
  latestCount: 6,
  blurb:
    "Conversations about creating more time freedom through passive real estate investing. We created On the Rise to help you rethink conventional investing wisdom and learn from people who have done it.",
};

export const book = {
  title: "The Fundamental Investor",
  subtitle: "How Passive Real Estate Investing Will Build Your Future",
  url: links.book,
  endorsement: {
    quote:
      "A must read for anyone looking to learn the fundamentals of passive real estate investing and achieve financial freedom.",
    by: "Ken McElroy",
  },
  blurb:
    "A step by step guide to building lasting wealth through passive real estate syndications, drawn from Jeremy's own experience and years of due diligence as an investor.",
};

/**
 * Headline stats. `confirmed: false` values are placeholders until Nick or Jeremy signs off.
 * The homepage trust strip shows the first four entries whose `show` is true.
 */
export const statsUpdated = "October 1, 2026";
export const stats = [
  { key: "capital", value: "$100M+", label: "Capital raised from our investor network", confirmed: true, show: true },
  { key: "doors", value: "8,000+", label: "Multifamily doors invested in", confirmed: true, show: true },
  // CONFIRM: "50+ passive multifamily deals" appears on the current homepage.
  { key: "deals", value: "50+", label: "Passive real estate deals", confirmed: false, show: true },
  // CONFIRM: Jeremy says "LP in 75+ deals" on calls.
  { key: "lp", value: "75+", label: "Personal LP investments by our founder", confirmed: false, show: true },
  // CONFIRM: "Passive equity investor in over $1B in total assets" appears on the current homepage.
  { key: "assets", value: "$1B+", label: "Total assets invested in", confirmed: false, show: false },
];

/**
 * Rise48 Equity, our operating partner. SPC is "powered by Rise48 Equity," shown the way Elevest does it:
 * a clear credit on every page and at the deal level, without Rise48 taking over the SPC brand.
 * Jeremy confirmed Oct 3 that Rise48 Marketing does not need to approve the wording.
 * Option A is the published rise48equity.com fund of funds page, so it is the default. Option B is what Jeremy said on Sep 8, 2026.
 */
export const rise48 = {
  name: "Rise48 Equity",
  url: links.rise48,
  approvedSet: "A" as "A" | "B",
  sets: {
    A: [
      { value: "$2.6B+", label: "Total transactions" },
      { value: "65+", label: "Assets" },
      { value: "12,000+", label: "Units since 2019" },
      { value: "11", label: "Full cycle dispositions" },
    ],
    B: [
      { value: "$2.8B", label: "Acquired since 2017" },
      { value: "70", label: "Properties" },
      { value: "13,000", label: "Units" },
      { value: "0", label: "Foreclosures" },
    ],
  },
  markets: "Arizona, Texas, and North Carolina",
  updated: "October 1, 2026",
};

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  photo?: string;
  location?: string;
  calendly?: string;
  linkedin?: string;
  short: string;
  bio: string[];
  /** CONFIRM roster before launch. */
  confirmed: boolean;
};

// Order confirmed by Jeremy (Oct 3): Jeremy is the lead voice, then Jerry, Nathan, Drew, Brad, and Marlene.
export const team: TeamMember[] = [
  {
    slug: "jeremy-dyer",
    name: "Jeremy Dyer",
    role: "Founder and Managing Partner",
    photo: "/team/jeremy.jpg",
    location: "Lake Elmo, MN",
    calendly: links.calendly,
    linkedin: links.linkedin,
    confirmed: true,
    short:
      "Twenty five years in tech sales, then a passive investor in 75+ deals. Jeremy invests his own money in every deal he brings to investors.",
    bio: [
      "Jeremy Dyer is the Founder and Managing Partner of Starting Point Capital, where he leads investor relations, strategic partnerships, and marketing. He also serves as Vice President of Capital Formation at Rise48 Equity, hosts the On the Rise Podcast, and wrote The Fundamental Investor.",
      "Before real estate, Jeremy spent 25 years in tech sales, most of them at ADP, where he was a consistent top performer. He holds a Bachelor of Science in Marketing from the Carlson School of Management.",
      "Real estate investing requires confidence in a sponsor's competence, credibility, and integrity. Jeremy has seen the business from both sides, as an active investor who started with fix and flips and as a passive investor in more than 75 deals across asset classes.",
      "Jeremy lives in Lake Elmo, Minnesota with his wife Marlene, their four children, and their dog Bosco. He coaches his kids' teams, travels, stays active, and never misses date night.",
    ],
  },
  {
    slug: "jerry-smith",
    name: "Jerry Smith",
    role: "Partner",
    photo: "/team/jerry.jpg",
    // The current Calendly link for Jerry is broken. CONFIRM a working link.
    calendly: undefined,
    confirmed: true,
    short:
      "Nearly three decades leading growth in the payments industry. Sold his payments business and has held a real estate license since 2001.",
    bio: [
      "Jerry Smith is a proven leader in the payments industry with nearly three decades of experience driving growth, building teams, and delivering value to clients. He is a multi year President's Club recipient, an honor reserved for top sales professionals.",
      "Jerry recently sold his payments business. He has held his real estate license since 2001 and has closed hundreds of transactions as an active investor, which gives him a practical view of market trends and investment strategy.",
      "He values relationships built on trust, performance, and shared success.",
    ],
  },
  {
    slug: "nathan-wagner",
    name: "Nathan Wagner",
    role: "Partner",
    photo: "/team/nathan.jpg",
    calendly: "https://calendly.com/startingpointcapital-nathan/1-on-1",
    confirmed: true,
    short:
      "Human capital management sales leader responsible for more than $100M in revenue. Aviator, father of four, and mentor to young leaders.",
    bio: [
      "Nathan Wagner is a sales professional in the Human Capital Management industry, directly responsible for more than $100M of top line revenue for his companies.",
      "Faced with the choice between a volatile stock market and real estate, Nathan chose real estate, and chose to be passive. Instead of becoming a landlord with a second full time job, he invests as a limited partner and spends his time on what matters to him.",
      "He is an avid aviator, goes on adventures with his wife and four kids, and mentors young men and women through his church. At Starting Point Capital he enjoys educating new investors and bringing only the right opportunities to his network.",
    ],
  },
  {
    slug: "drew-mcwilliams",
    name: "Drew McWilliams",
    role: "Partner",
    photo: "/team/drew.jpg",
    location: "Charlotte, NC",
    calendly: "https://calendly.com/drew-realestate",
    confirmed: true,
    short: "Licensed broker for 25+ years with $80M+ in transactions, and co founder of an Entrepreneur top 400 company.",
    bio: [
      "Drew McWilliams has more than 25 years of experience as a licensed real estate broker, with over $80M in transactions. He co founded a company named to Entrepreneur Magazine's top 400, and brings a business owner's lens to every investment he reviews.",
      "Drew lives in Charlotte, North Carolina with his wife Jennifer, their two children, and their Bernese Mountain dog Maple. He golfs, coaches his son's hockey team, and roots for the Pittsburgh Steelers.",
    ],
  },
  {
    slug: "brad-mosley",
    name: "Brad Mosley",
    role: "Partner",
    photo: "/team/brad.jpg",
    location: "Temecula, CA",
    calendly: "https://calendly.com/brad-mosley",
    // On the roster per Jeremy (Oct 3). CONFIRM his exact title.
    confirmed: true,
    short:
      "Owned and operated a Great Clips franchise organization for more than two decades before becoming a passive real estate investor.",
    bio: [
      "Bradford \"Brad\" Mosley helps investors build lasting wealth through passive real estate. For more than two decades he owned and operated a Great Clips franchise organization, which taught him that people are the heart of any enterprise and that trust belongs with the right partners.",
      "After selling the company he moved from active business owner to passive investor. Four years of managing his own rental property gave him a practical appreciation for professional sponsors and a truly passive role.",
      "Brad and his wife Jennifer live in Temecula, California. He enjoys good books, winemaking, and traveling the world with Jennifer.",
    ],
  },
  {
    slug: "marlene-dyer",
    name: "Marlene Dyer",
    role: "Director of Business Operations",
    photo: "/team/marlene.jpg",
    confirmed: true,
    short: "Former social studies teacher who keeps the back office running for our investors and partners.",
    bio: [
      "Marlene Dyer serves as Director of Business Operations for Starting Point Capital. She holds a Bachelor of Arts in History and a Master of Education in Curriculum and Instruction from the University of Minnesota, and taught social studies before joining SPC.",
      "Marlene is a homeschooling mother of four who supports her children's sports and activities, and enjoys date night, travel, reading, and time with friends.",
    ],
  },
];

/**
 * HubSpot (Rise48 portal 5708005). Every form on the site submits to the existing "SPC Lead Gen - Newsletter Form".
 * New leads get ONE tag: "SPC Newsletter/Prospect", which starts the SPC email sequence.
 * "SPC Investor" is never set by the site. The team adds it in HubSpot once someone actually invests.
 * Tags live in the contact property "Tags" (internal name new_lead_status), a multiple checkbox.
 */
export const hubspot = {
  portalId: "5708005",
  formId: "cf7a5725-6de4-4101-a81d-cef424509522",
  tagProperty: "new_lead_status",
  prospectTag: "SPC Newsletter/Prospect",
  investorTag: "SPC Investor",
  // This portal stores UTMs in custom properties with generated names.
  utmProperties: {
    utm_source: "a4b2e62ec2d44350aa266eaf25f2837d56758161",
    utm_medium: "h489e1686b263c91ad724f16144dd63381d35f110",
    utm_campaign: "h0b59eb203725c81a009aaec9c4ba9c621fc6994b",
    utm_term: "f8ca392083b6bf5e73b0c8a9661881e70334a1cf",
    utm_content: "c98cf36d64c112db72e08b9e70ea9359a771d95a",
  } as Record<string, string>,
};

/** Feature flags for content waiting on a decision. */
export const flags = {
  // Confirmed Oct 3: investors first, capital partners second. The partner path stays on SPC.
  showPartnerPath: true,
  // Hidden until real Google reviews exist. Never fabricate reviews.
  showReviews: false,
  // Confirmed Oct 3: the portfolio, lead magnets, and newsletter unlock after the access form.
  publicPortfolioNames: false,
  // Confirmed Oct 3: faith stays in the podcast, not in the investor facing brand.
  faithForward: false,
  // Exit intent / timed Investor Guide offer.
  guidePopup: true,
};

/** Real reviews only. Leave empty until the Google Business Profile has reviews. */
export const reviews: { name: string; text: string; rating: number }[] = [];

// CONFIRM: keep Midland Trust (current site) or switch to Heritage IRA.
export const sdiraPartner = {
  name: "Midland Trust",
  url: "https://midlandtrust.com/startingpointcapital",
};

// Request Access sits in the header as the main button, so it is not repeated here.
export const nav = [
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/resources", label: "Resources" },
  { href: "/podcast", label: "Podcast" },
];

export const disclaimer =
  "This is not a solicitation for money or a direct offering. Investing involves risks which you assume. It is your duty to do your own due diligence. This is for informational purposes only and meant for accredited investors with an established relationship with an investment sponsor. Any offer to invest is made only through official offering documents. Past performance is not indicative of future results, and investments in real estate involve risk, including the possible loss of principal. Nothing on this site is tax, legal, or investment advice. Consult your own CPA, attorney, and financial advisor.";

export const taxNote = "Tax treatment depends on your situation. Review any tax strategy with your CPA.";
