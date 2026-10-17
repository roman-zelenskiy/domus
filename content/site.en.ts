/** English content. Same shape as site.uk.ts; photos and numbers are shared. */
import * as uk from "./site.uk";

export const unsplash = uk.unsplash;

export const seo = {
  title: "Turnkey apartment renovation in Kyiv — fixed estimate | Domus",
  description:
    "Turnkey apartment renovation in Kyiv from 3,200 UAH/m²: a fixed estimate in the contract, a 3-year warranty and 350+ completed homes. Free measurement and an estimate in 3 days.",
};

export const company = {
  ...uk.company,
  address: "48 Antonovycha St, office 12",
  city: "Kyiv, 03150",
  hours: "Mon–Sat, 9:00–20:00",
};

export const nav = [
  { href: "#services", label: "Services" },
  { href: "#calculator", label: "Calculator" },
  { href: "#process", label: "Process" },
  { href: "#projects", label: "Projects" },
  { href: "#reviews", label: "Reviews" },
  { href: "#faq", label: "FAQ" },
];

export const heroImage = uk.heroImage;

export const problems: typeof uk.problems = [
  {
    title: "Deadlines slip",
    pain: "They promised two months, and half a year later you’re still at your parents’, hearing “almost done”.",
    painMetric: "+4 mo",
    painNote: "average delay with freelance crews",
    solutionTitle: "Deadline and penalty in the contract",
    solution:
      "A day-by-day schedule with someone responsible for each stage. If we’re late, we pay 0.1% of the estimate for every day of delay.",
    solutionMetric: "97%",
    solutionNote: "of homes handed over on the agreed date",
  },
  {
    title: "The estimate grows",
    pain: "600 thousand at the start, a million at the end, “because of what we found under the tiles”.",
    painMetric: "+38%",
    painNote: "over the initial estimate, market average",
    solutionTitle: "Fixed estimate",
    solution:
      "A detailed estimate of 200+ items before work starts. The contract price doesn’t change: we cover the risk of hidden work ourselves.",
    solutionMetric: "0 UAH",
    solutionNote: "in extra charges since 2021",
  },
  {
    title: "Quality by eye",
    pain: "Crooked corners, tiles falling off and a contractor who stops picking up once he’s paid.",
    painMetric: "1 in 3",
    painNote: "renovations have to be redone",
    solutionTitle: "Supervision and a 3-year warranty",
    solution:
      "An engineer signs off every stage against a 140-point checklist with a photo report. All work comes with a 3-year warranty written into the contract.",
    solutionMetric: "3 years",
    solutionNote: "written warranty on all work",
  },
];

export type PackageId = uk.PackageId;
export type ExtraId = uk.ExtraId;

const pkg: Record<PackageId, { name: string; tagline: string; term: string; imageAlt: string; includes: string[] }> = {
  cosmetic: {
    name: "Cosmetic",
    tagline: "Refresh your apartment without moving walls or replacing utilities",
    term: "30–45 days",
    imageAlt: "Bright living room with a white sofa and round mirrors",
    includes: [
      "Removal of old finishes",
      "Filling and painting walls and ceilings",
      "Laminate or vinyl flooring",
      "New doors and skirting boards",
      "New sockets, switches and lights",
      "Post-renovation cleaning",
    ],
  },
  capital: {
    name: "Full",
    tagline: "A complete renovation “from bare concrete” for new builds and older flats",
    term: "60–90 days",
    imageAlt: "Modern living room with a grey sofa and a wooden wall",
    includes: [
      "Everything in the cosmetic package",
      "New wiring and a distribution board",
      "Water and sewage pipework",
      "Floor screed and plastering on guides",
      "Turnkey bathroom with tiles",
      "Drywall partitions and ceilings",
      "Rough materials at wholesale prices",
    ],
  },
  design: {
    name: "Designer",
    tagline: "An interior built to a bespoke design, furnished and supervised",
    term: "90–140 days",
    imageAlt: "Designer living room with a blue wall and a cognac sofa",
    includes: [
      "Everything in the full package",
      "Design project with 3D renders",
      "Designer’s on-site supervision",
      "Furniture and lighting sourcing",
      "Hidden doors and complex ceilings",
      "Basic smart home",
    ],
  },
};

export const packages: typeof uk.packages = uk.packages.map((p) => ({ ...p, ...pkg[p.id] }));

const ex: Record<ExtraId, { label: string; hint: string }> = {
  designProject: { label: "Design project", hint: "+900 UAH/m²" },
  warmFloor: { label: "Underfloor heating", hint: "+420 UAH/m²" },
  soundproof: { label: "Soundproofing", hint: "+380 UAH/m²" },
  climate: { label: "Air conditioning, 2 lines", hint: "+38,000 UAH" },
  smartHome: { label: "Smart home", hint: "+46,000 UAH" },
  fastTrack: { label: "Fast-track schedule", hint: "+12%, time −25%" },
};

export const extras: typeof uk.extras = uk.extras.map((e) => ({ ...e, ...ex[e.id] }));

export const steps: typeof uk.steps = [
  {
    title: "Measurement and consultation",
    duration: "1 day",
    text: "An engineer comes at a time that suits you, takes laser measurements and photos, and answers your questions. Free, with no obligation.",
  },
  {
    title: "Estimate and contract",
    duration: "3–5 days",
    text: "We prepare an estimate of 200+ items and a day-by-day schedule. The price, timing and penalty go into the contract.",
  },
  {
    title: "Design and purchasing",
    duration: "1–3 weeks",
    text: "We agree the layout and finishes. We buy rough materials ourselves, from suppliers who give us up to 15% off.",
  },
  {
    title: "Rough work",
    duration: "3–6 weeks",
    text: "Demolition, wiring, plumbing, screed and plaster. We photograph all hidden work before the walls are closed.",
  },
  {
    title: "Finishing",
    duration: "3–5 weeks",
    text: "Tiles, paint, flooring, doors and lighting. Our supervisor signs off each stage against a 140-point checklist.",
  },
  {
    title: "Handover and warranty",
    duration: "1 day",
    text: "Final inspection, cleaning, a sign-off certificate and a 3-year warranty. You move in, and we stay in touch.",
  },
];

const pj = [
  { title: "Warm minimalism", place: "Faina Town, Holosiivskyi district", budget: "1.2M UAH", type: "Full", alt: "Living room in warm tones with a leather sofa and a photo gallery wall" },
  { title: "A Stalin-era flat with character", place: "Pechersk, Lieskova St", budget: "2.4M UAH", type: "Designer", alt: "Bright living room with a corner sofa and a feature wall" },
  { title: "One-bedroom for rent", place: "Pozniaky, Drahomanova St", budget: "390K UAH", type: "Cosmetic", alt: "Minimalist room with a yellow armchair and a floor lamp" },
  { title: "Family apartment", place: "Novi Pecherski Lypky", budget: "3.1M UAH", type: "Designer", alt: "Dining room with emerald chairs and a round chandelier" },
  { title: "Luxury bedroom", place: "Obolon, Volodymyra Ivasiuka Ave", budget: "1.5M UAH", type: "Full", alt: "Bedroom with a dark wall, a quilted bed and a brass chandelier" },
  { title: "Graphite kitchen", place: "Comfort Town, Dniprovskyi district", budget: "940K UAH", type: "Full", alt: "Kitchen with graphite fronts, white tiles and open shelves" },
];

export const projects: typeof uk.projects = uk.projects.map((p, i) => ({ ...p, ...pj[i] }));

export const beforeAfter: typeof uk.beforeAfter = {
  ...uk.beforeAfter,
  title: "A Stalin-era flat in Pechersk",
  meta: "92 m² · 118 days · laser-levelled walls, approved replanning",
  beforeAlt: "The apartment before renovation: stripped plaster, exposed brick and building debris",
  afterAlt: "The same apartment after renovation: a bright living room with a sofa and decor",
};

export const stats = uk.stats;

const rv = [
  { name: "Alina Tkachenko", object: "2-bed, Faina Town, 64 m²", text: "My biggest fear was the estimate “drifting”. It didn’t move by a single hryvnia, even when they found an old pipe under the screed and replaced it at their own cost." },
  { name: "Maksym Lytvynenko", object: "3-bed, Obolon, 78 m²", text: "I travel for work, so I followed everything in a chat: photos every evening and a short report from the site manager. They finished two days ahead of schedule." },
  { name: "Olha and Serhii Kravets", object: "Stalin-era flat, Pechersk, 92 m²", text: "A tricky building, crooked walls, replanning. Domus even handled the approvals with the housing registry. A year later a crack appeared by the door, and they came and fixed it under warranty." },
  { name: "Viktor Andriichuk", object: "1-bed for rent, Pozniaky, 42 m²", text: "I needed it fast and with no extra costs. A cosmetic renovation in 38 days, and I rented the flat out a week after handover. We worked out the payback with the manager." },
  { name: "Daryna Moroz", object: "2-bed, Lypky, 68 m²", text: "I liked that the designer didn’t push what’s “trendy” but asked how we live. As a result, the kitchen fits us perfectly, not an Instagram picture." },
  { name: "Artem Honcharenko", object: "4-bed, Podil, 124 m²", text: "I compared four companies. Domus were the only ones who brought an estimate with 230 items instead of “turnkey — 1,500,000”. That settled it." },
];

export const reviews: typeof uk.reviews = uk.reviews.map((r, i) => ({ ...r, ...rv[i] }));

const tm = [
  { name: "Andrii Kovalenko", role: "Founder, civil engineer", note: "18 years in interior finishing; personally checks every estimate" },
  { name: "Olha Melnyk", role: "Lead architect and designer", note: "Kyiv National University of Construction graduate, 120+ completed projects" },
  { name: "Dmytro Savchuk", role: "Head of site supervision", note: "Author of our 140-point acceptance checklist" },
  { name: "Iryna Bondarenko", role: "Project manager", note: "Your single contact from measurement to keys" },
];

export const team: typeof uk.team = uk.team.map((m, i) => ({ ...m, ...tm[i] }));

export const aboutImage = uk.aboutImage;

export const faq: typeof uk.faq = [
  {
    q: "Will the estimate really stay the same?",
    a: "Yes. After measuring, we draw up a detailed estimate and fix the total cost of work and rough materials in the contract. If hidden problems turn up along the way, such as rotten pipes under the screed, we fix them at our own cost. The price only changes if you decide to add something, and then we sign a separate addendum.",
  },
  {
    q: "How much does the measurement cost and what does it include?",
    a: "Measurement is free. An engineer comes at a time that suits you, takes laser measurements, checks the walls, floor and utilities, photographs the property and advises on the layout. You get a preliminary estimate within 3 working days.",
  },
  {
    q: "Who buys the materials?",
    a: "We buy rough materials (mixes, profiles, cable, pipes) from trusted suppliers at up to 15% off, and their cost is already in the estimate. You can choose finishing materials yourself or leave it to us: the manager will put together a selection within your budget.",
  },
  {
    q: "How does payment work?",
    a: "In stages, with no large prepayments: 4–6 payments tied to the schedule. You pay for the next stage only after signing off the previous one. We work officially and accept payment to a sole-trader or company account.",
  },
  {
    q: "What does the 3-year warranty cover?",
    a: "All the work we did: wiring, plumbing, screed, plaster, tiles, painting, and fitting doors and ceilings. If anything goes wrong through our fault within three years, we come within 48 hours and fix it for free.",
  },
  {
    q: "Can I follow the renovation remotely?",
    a: "Yes, most of our clients do. Every project gets a Telegram chat with the site manager and project manager: daily photos, a weekly video report and online access to the schedule. We can also install a camera on site.",
  },
  {
    q: "Do you work in new builds with noise restrictions?",
    a: "Yes. We know the rules of most large residential complexes in Kyiv: we arrange passes, keep to quiet hours and remove debris according to the management company’s rules. We plan noisy work so that neighbours have nothing to complain about.",
  },
  {
    q: "Can I live in the apartment during the renovation?",
    a: "We don’t recommend it during a full renovation because of dust and utility shut-offs. During a cosmetic one we can work room by room, but it takes about 20% longer. We’ll help you plan the move to keep the inconvenience to a minimum.",
  },
];

export const contactTimes = ["Morning, 9–12", "Afternoon, 12–16", "Evening, 16–20", "Weekend"];
