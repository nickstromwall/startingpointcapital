// Lead magnet landing pages, rendered by /guides/[slug].
// Flow (agreed Oct 1): give value first, then ask for name and email, then offer phone plus a Calendly booking.
// Educational only. No deal terms, no return figures. Tax content always points to a CPA.
// To add a guide: add an entry here. It gets its own URL, share image, and form tag (resource:<slug>).

export type GuideSection = { heading: string; paragraphs?: string[]; bullets?: string[] };

export type Guide = {
  slug: string;
  title: string;
  eyebrow: string;
  audience: string;
  lede: string;
  photo: string;
  /** Free, visible before the form. */
  intro: GuideSection[];
  /** Unlocked after name and email. */
  body: GuideSection[];
  /** CONFIRM notes for Nick, shown nowhere on the page. */
  todo?: string;
};

export const guides: Guide[] = [
  {
    slug: "investor-guide",
    title: "The Passive Real Estate Investing Guide",
    eyebrow: "Free investor guide",
    audience: "Busy professionals",
    lede: "A starting point for busy professionals who want to invest in cash flowing real estate without becoming a landlord.",
    photo: "/photos/creekside.jpg",
    todo: "CONFIRM where the original Investor Guide PDF lives (/investor-guide returns 404). Link the PDF from the unlocked section once found.",
    intro: [
      {
        heading: "What passive investing actually means",
        paragraphs: [
          "Passive investing is cash flow received on a regular basis, with little effort required to maintain it. In real estate, that usually means owning a share of a large property alongside other investors, while a professional team handles everything from acquisition to resident move outs.",
          "Most of us were taught that real estate means buying a rental, fixing the toilet, and chasing rent. There is another way, and it is how many institutions and high earning professionals have invested for decades.",
        ],
      },
      {
        heading: "What a real estate syndication is",
        paragraphs: [
          "A syndication pools capital from a group of investors to buy a property that none of them would buy alone, such as a 200 unit apartment community. The sponsor (the general partner) finds the deal, secures the loan, executes the business plan, and manages the asset. Investors (the limited partners) contribute capital and receive a share of the cash flow and profits.",
        ],
      },
    ],
    body: [
      {
        heading: "How investors can get paid",
        bullets: [
          "Cash flow distributions while the property is held, typically paid monthly or quarterly when the property performs.",
          "A return of capital when the property is refinanced, if the value has grown enough to support it.",
          "A share of the profits when the property is sold at the end of the business plan.",
        ],
        paragraphs: ["None of these are guaranteed. The offering documents for each deal explain exactly how and when distributions are made."],
      },
      {
        heading: "The tax side, in plain English",
        paragraphs: [
          "Real estate investors can deduct depreciation, a non cash expense that reflects the wear on the building over time. In a syndication, depreciation passes through to you on a Schedule K-1, and it can offset the passive income the property produces. Strategies like cost segregation can accelerate that depreciation into the early years of ownership.",
          "Depreciation may be recaptured when a property is sold, and every investor's situation is different. Review any tax strategy with your CPA before you invest.",
        ],
      },
      {
        heading: "The risks to understand",
        bullets: [
          "You can lose some or all of your investment. Business plans do not always go as projected.",
          "Your capital is illiquid. Plan on it being committed for the full hold period, often several years.",
          "Interest rates, local markets, insurance, and operating costs can all change after a property is purchased.",
          "Past performance of any sponsor does not guarantee future results.",
        ],
      },
      {
        heading: "How to vet a sponsor",
        bullets: [
          "Track record: how many deals have they taken full cycle, and what happened in the hard years?",
          "Alignment: does the sponsor invest their own money alongside yours?",
          "Operations: do they manage properties themselves, or depend on third parties?",
          "Communication: will you receive regular reports, and can you reach a real person with questions?",
          "Conservatism: how do they underwrite debt, reserves, and exit assumptions?",
        ],
      },
      {
        heading: "Accredited investors and private offerings",
        paragraphs: [
          "Many private real estate offerings are made under Regulation D. Some are open only to accredited investors, and some are offered privately to people who have an established relationship with the sponsor. That is one reason we start every investor relationship with a conversation rather than an advertisement.",
        ],
      },
      {
        heading: "Your next step",
        paragraphs: [
          "The best way to learn whether passive multifamily fits your goals is a short conversation. We will listen first, answer your questions, and show you how our investors participate.",
        ],
      },
    ],
  },
  {
    slug: "sales-professionals",
    title: "Passive Real Estate for Sales Professionals",
    eyebrow: "Free guide for sales professionals",
    audience: "Sales professionals and recent business sellers",
    lede: "You spent a career building pipeline and closing deals. Here is how to put that hard earned capital to work without taking on a second job.",
    photo: "/properties/rise-sunridge.jpg",
    intro: [
      {
        heading: "Written by one of you",
        paragraphs: [
          "Jeremy Dyer spent 25 years in tech sales, most of them at ADP. Like a lot of top performers, he earned well and had almost no time to manage investments. Passive multifamily became the way he built wealth outside of his W2, and later the business he runs today.",
          "If you have recently retired from sales, or you recently sold a business, you are facing the same question he did: how do I keep my money working without becoming a landlord?",
        ],
      },
      {
        heading: "Why sales professionals tend to fit passive investing",
        bullets: [
          "You value leverage. A professional operator gives you scale you could not build alone.",
          "You know how to evaluate people. Vetting a sponsor is a lot like qualifying a prospect.",
          "Your time is your most valuable asset, and you would rather spend it with family than fixing furnaces.",
        ],
      },
    ],
    body: [
      {
        heading: "Treat it like a discovery call",
        paragraphs: ["The same questions you would ask a prospect apply to a sponsor. Before you invest, ask:"],
        bullets: [
          "What is your track record, including the deals that did not go as planned?",
          "How much of your own money is in this deal?",
          "Who manages the property day to day?",
          "How often will I hear from you, and what will the reports include?",
          "What happens if the business plan takes longer than expected?",
        ],
      },
      {
        heading: "If you recently sold a business",
        paragraphs: [
          "A liquidity event brings opportunity and pressure at the same time. Take your time. Build a plan with your CPA and financial advisor first, decide how much capital you can commit for a multi year hold, and diversify across operators, markets, and timelines.",
        ],
      },
      {
        heading: "Using retirement accounts",
        paragraphs: [
          "Some investors participate through a self directed IRA, which lets a retirement account hold alternative assets like private real estate. There are specific rules for these accounts, so talk with the custodian and your advisor before you start.",
        ],
      },
      {
        heading: "Start the conversation",
        paragraphs: [
          "Our team includes former sales leaders and business owners who made this same transition. Book a call and we will share how they did it.",
        ],
      },
    ],
  },
  {
    slug: "1031-guide",
    title: "The 1031 Exchange Guide for Rental Property Owners",
    eyebrow: "Free 1031 guide",
    audience: "Landlords ready to sell",
    lede: "Thinking about selling a rental property? Understand your options for deferring capital gains, and how some owners move from active landlord to passive investor.",
    photo: "/photos/desert-cove.jpg",
    todo: "CONFIRM with a CPA or 1031 specialist before launch, and confirm whether any current Rise48 offering accepts 1031 capital through a TIC or DST structure.",
    intro: [
      {
        heading: "What a 1031 exchange does",
        paragraphs: [
          "Section 1031 of the Internal Revenue Code lets an owner of investment real estate defer capital gains taxes by selling one property and reinvesting the proceeds into another like kind property. Done correctly, the tax is deferred, not forgiven, and your full equity keeps working for you.",
          "For many landlords, the exchange is the moment they ask a bigger question: do I want to keep managing property at all?",
        ],
      },
      {
        heading: "The rules that matter most",
        bullets: [
          "Both properties must be held for investment or business use, not as a personal residence.",
          "You have 45 days from the sale to identify replacement property in writing.",
          "You have 180 days from the sale to close on the replacement property.",
          "A qualified intermediary must hold the sale proceeds. If you touch the money, the exchange can fail.",
          "To defer all of the tax, you generally need to reinvest all of the proceeds and replace the debt.",
        ],
      },
    ],
    body: [
      {
        heading: "Can I 1031 into a syndication?",
        paragraphs: [
          "Usually not directly. An interest in a partnership or LLC is generally not considered like kind real estate, so a typical limited partner interest in a syndication does not qualify as replacement property.",
          "Some sponsors offer structures that can qualify, such as a tenant in common (TIC) interest or a Delaware Statutory Trust (DST), where each investor holds a direct fractional interest in the real estate. These structures have their own rules, fees, and limitations, and must be set up before you sell.",
        ],
      },
      {
        heading: "Another path some owners consider",
        paragraphs: [
          "Some owners choose not to exchange at all. They sell, pay the tax, and reinvest the proceeds into passive investments whose depreciation may offset future passive income. Whether that makes sense depends entirely on your tax picture, which is why this conversation belongs with your CPA.",
        ],
      },
      {
        heading: "Questions to ask before you list",
        bullets: [
          "What is my adjusted basis, and how much depreciation will be recaptured?",
          "Do I want to keep being an active landlord, or am I ready to be passive?",
          "Could a TIC or DST structure work for my timeline and goals?",
          "How much liquidity do I need over the next five years?",
          "Who is my qualified intermediary, and have they been engaged before closing?",
        ],
      },
      {
        heading: "Talk it through with us",
        paragraphs: [
          "We are not tax advisors, and we will always send you to your CPA for the final word. What we can do is walk you through how passive multifamily works, so you can make the decision with your eyes open.",
        ],
      },
    ],
  },
];

export const getGuide = (slug: string) => guides.find((g) => g.slug === slug);
