export type ClientWork = {
  src: string;
  title: string;
  category: string;
  width: number;
  height: number;
};

export type Project = {
  title: string;
  kicker: string;
  description: string;
  /** Hero piece for the project — displayed large. */
  cover: ClientWork;
  gallery: ClientWork[];
  /** Optional recap film for the project. */
  video?: { src: string; label: string };
};

export type OverviewFact = { label: string; value: string };

export type Client = {
  slug: string;
  name: string;
  fullName?: string;
  logo: string;
  /** Each collaboration gets its own layout language, keyed off the brand. */
  mode: "light" | "gold";
  intro: string;
  overview: OverviewFact[];
  services: string[];
  projects: Project[];
  theme: { bg: string; accent: string; ink: string; muted: string; panel: string };
  reflection: { quote: string; author: string; placeholder: true };
  impact: string;
};

const J = "/images/clients/lifepool/jesus-fest/";
const M = "/images/clients/lifepool/malkias-summit/";
const VL = "/images/clients/vowebi/leadership/";
const VI = "/images/clients/vowebi/membership/";
const VS = "/images/clients/vowebi/social/";

const jesusFest: ClientWork[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => ({
  src: `${J}now-ministering-png-${n}.webp`,
  title: `Now Ministering — ${String(n - 1).padStart(2, "0")}`,
  category: "Speaker Announcement",
  width: 1400,
  height: 467,
}));

const malkias: ClientWork[] = [
  { src: `${M}malkias-summit-2025.webp`, title: "Malkias Summit 2025 — Key Visual", category: "Event Branding", width: 1400, height: 788 },
  { src: `${M}malkias-summit-2025-2.webp`, title: "Summit Programme", category: "Event Branding", width: 1400, height: 1050 },
  { src: `${M}malkias-summit-2025-3.webp`, title: "Speaker Line-up", category: "Event Branding", width: 1400, height: 1050 },
  { src: `${M}malkias-summit-2025-4.webp`, title: "Session Graphic", category: "Event Branding", width: 1400, height: 1050 },
  { src: `${M}malkias-summit-2025-5.webp`, title: "Summit Promo", category: "Event Branding", width: 1400, height: 1050 },
  { src: `${M}malkias-summit-2025-6.webp`, title: "Summit Promo II", category: "Event Branding", width: 1400, height: 1050 },
  { src: `${M}malkias-summit-2025-7.webp`, title: "Summit Promo III", category: "Event Branding", width: 1400, height: 1050 },
  { src: `${M}malkias-summit-2025-8.webp`, title: "Summit Promo IV", category: "Event Branding", width: 1400, height: 1050 },
  { src: `${M}malkias-summit-2025-10.webp`, title: "Summit Poster", category: "Event Poster", width: 1400, height: 1795 },
  { src: `${M}life-pool-instagram-carousel-1.webp`, title: "Instagram Carousel", category: "Social Campaign", width: 1400, height: 280 },
  { src: `${M}malkias-summit-2025-1.webp`, title: "Summit Visual", category: "Event Branding", width: 1400, height: 1050 },
];

const vowebiSocial: ClientWork[] = [
  { src: `${VS}splitimage-im-1.webp`, title: "Who We Are", category: "Brand Story", width: 1400, height: 1400 },
  { src: `${VS}splitimage-im-2.webp`, title: "What We Do", category: "Brand Story", width: 1400, height: 1400 },
  { src: `${VS}splitimage-im-3.webp`, title: "Why We Exist", category: "Brand Story", width: 1400, height: 1400 },
  { src: `${VS}splitimage-im-4.webp`, title: "Partner With Us", category: "Brand Story", width: 1400, height: 1400 },
];

/** A representative set rather than all twenty-two, to keep the section scannable. */
const vowebiIds: ClientWork[] = [5, 6, 21, 22].map((n) => ({
  src: `${VI}${n}.webp`,
  title: `Member Card — ${String(n).padStart(2, "0")}`,
  category: "Membership ID",
  width: 1000,
  height: 1500,
}));

export const CLIENTS: Client[] = [
  {
    slug: "life-pool-chapel",
    name: "Life-Pool Chapel",
    logo: "/images/clients/logos/lifepool.png",
    mode: "light",
    intro:
      "I am a son in Life Pool Chapel, Embakasi. One of the ways I serve is by using my design skills to support its communication and ministry activities. Through event branding, weekly programme graphics, and promotional campaigns, I help communicate the church's message with consistency and professionalism.",
    overview: [
      { label: "Sector", value: "Church & Community" },
      { label: "Duration", value: "2025 – Present" },
      { label: "Projects Delivered", value: "3 flagship events" },
    ],
    services: [
      "Event Branding",
      "Weekly Ministry Communication",
      "Campaign Design",
      "Digital Communication",
    ],
    theme: {
      bg: "#eef5f0",
      accent: "#2f7d4f",
      ink: "#16261f",
      muted: "rgba(22,38,31,0.62)",
      panel: "rgba(255,255,255,0.62)",
    },
    projects: [
      {
        title: "Malkias Summit",
        kicker: "Annual Summit",
        description:
          "Complete event branding for the 2025 summit: key visual, speaker line-up, session graphics, and the social campaign that carried it — all built from one identity.",
        cover: malkias[0],
        gallery: malkias.slice(1),
      },
      {
        title: "Jesus Fest",
        kicker: "Flagship Festival",
        description:
          "A full speaker-announcement series for the church's flagship outreach — one template, eleven ministers, published across the run-up to the event without a single inconsistent frame.",
        cover: jesusFest[0],
        gallery: jesusFest.slice(1),
      },
      {
        title: "Q Fest",
        kicker: "Leadership Summit",
        description:
          "Motion and event coverage for the Q Fest leadership summit at Life-Pool Chapel Northlands, cut into a recap film for the church's channels.",
        cover: {
          src: `${M}chatgpt-image-apr-28-2026-02-45-29-pm.webp`,
          title: "Q Fest",
          category: "Leadership Summit",
          width: 1110,
          height: 1417,
        },
        gallery: [],
        video: { src: "/videos/clients/q-fest.mp4", label: "Q Fest — event recap" },
      },
    ],
    reflection: {
      quote:
        "Placeholder reflection — to be replaced with the church's own words. The system Teddy built means our team can publish service graphics every week without waiting on a designer.",
      author: "Life-Pool Chapel",
      placeholder: true,
    },
    impact:
      "Developed a repeatable visual communication system that enabled consistent publication of ministry announcements, weekly programmes, and flagship events while strengthening the church's visual identity.",
  },
  {
    slug: "vowebi",
    name: "VOWEBI",
    fullName: "Vessels of Worship Evangelistic Band International",
    logo: "/images/clients/logos/vowebi.webp",
    mode: "gold",
    intro:
      "Since 2025, I have supported VOWEBI through an ongoing creative partnership focused on strengthening the ministry's visual communication. My role extends beyond designing individual graphics to maintaining a consistent visual identity across leadership communication, ministry events, and member engagement.",
    overview: [
      { label: "Sector", value: "Ministry & Evangelism" },
      { label: "Duration", value: "2025 – Present" },
      { label: "Projects Delivered", value: "22+" },
    ],
    services: [
      "Brand Identity",
      "Event Campaigns",
      "Leadership Communication",
      "Digital Media Design",
    ],
    theme: {
      bg: "#fdf6e6",
      accent: "#b8860b",
      ink: "#2a2317",
      muted: "rgba(42,35,23,0.66)",
      panel: "rgba(255,255,255,0.6)",
    },
    projects: [
      {
        title: "Social Identity",
        kicker: "Brand System",
        description:
          "The ministry's public voice — service posters and a brand-story series that answers who VOWEBI is, what it does, and why it exists, in one consistent typographic language.",
        cover: vowebiSocial[0],
        gallery: vowebiSocial.slice(1),
      },
      {
        title: "Membership ID Cards",
        kicker: "Brand Collateral",
        description:
          "A branded membership identification system — twenty-two cards issued from a single template, strengthening organisational identity and member recognition.",
        cover: vowebiIds[0],
        gallery: vowebiIds.slice(1),
      },
      {
        title: "Leadership & Online Service",
        kicker: "Weekly Communication",
        description:
          "Graphics supporting leadership announcements and the ministry's online services, keeping weekly communication on-brand and on schedule.",
        cover: { src: `${VL}2.webp`, title: "Leadership Announcement", category: "Leadership Communication", width: 1080, height: 1080 },
        gallery: [
          { src: `${VL}8.webp`, title: "Online Service", category: "Leadership Communication", width: 540, height: 540 },
        ],
      },
    ],
    reflection: {
      quote:
        "Placeholder reflection — to be replaced with the ministry's own words. Teddy delivered a consistent visual identity across every service and event, and turned briefs around quickly without losing quality.",
      author: "Vessels of Worship Evangelistic Band International",
      placeholder: true,
    },
    impact:
      "Established a consistent visual communication system across leadership announcements, weekly services, ministry campaigns, and member engagement — strengthening the ministry's visual identity while improving consistency across all communication platforms.",
  },
];
