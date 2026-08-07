export type EvidenceType =
  | "Report"
  | "Planning Drawing"
  | "Map"
  | "Site Photo"
  | "Official Document"
  | "Presentation";

export type Highlight = {
  title: string;
  detail: string;
};

export type ExperienceEvidence = {
  type: EvidenceType;
  label: string;
  note: string;
  /** Optional photographic proof. */
  image?: string;
};

export type Experience = {
  slug: string;
  organization: string;
  /** Office / posting, where the CV specifies one. */
  unit?: string;
  position: string;
  period: string;
  initials: string;
  theme: { bg: string; badge: string };
  image: string;
  logo?: string;
  /** One-line summary for the gallery card. */
  summary: string;
  /** Why this chapter mattered and where it sits in the journey. */
  roleOverview: string;
  /** The practical environments and responsibilities encountered. */
  exposure: string[];
  /** Memorable contributions and milestones, not standalone projects. */
  highlights: Highlight[];
  /** Practical planning skills strengthened, not software proficiency. */
  skillsDeveloped: string[];
  /** What the experience taught. */
  growth: string;
  /** Only present where genuine documentation exists. */
  evidence?: ExperienceEvidence[];
};

export const EXPERIENCES: Experience[] = [
  {
    slug: "makueni-kibwezi-west-volunteer",
    organization: "County Government of Makueni",
    unit: "Kibwezi West Sub County — Physical Planning Office",
    position: "Urban Planner, Volunteer",
    period: "2026 — Present",
    initials: "MK",
    theme: { bg: "#e3efe7", badge: "#c3ddcd" },
    image: "/images/mock/experience/makueni-county-government.jpg",
    logo: "/images/logos/makueni-county.png",
    summary:
      "Ongoing volunteer planning role at the Kibwezi West sub county physical planning office.",
    roleOverview:
      "A continuing return to the office where my planning career began — this time carrying my own workload rather than shadowing one. Volunteering here keeps me close to live development control decisions at the level where they affect people most directly, while the wider profile builds around it.",
    exposure: [
      "Day-to-day operations of a sub county physical planning office",
      "Live development applications moving from submission to determination",
      "Working alongside county planners on land use questions as they arise",
      "Field verification of sites against what was submitted on paper",
    ],
    highlights: [
      {
        title: "Carrying a live caseload",
        detail:
          "Moving from observer to contributor — handling planning tasks that feed directly into decisions the office has to defend.",
      },
      {
        title: "Returning with sharper judgement",
        detail:
          "Coming back to Kibwezi West after national-level exposure made the connection between policy and local determination far clearer.",
      },
    ],
    skillsDeveloped: [
      "Development Control",
      "Land Use Planning",
      "Development Application Review",
      "Site Analysis",
      "Planning Administration",
    ],
    growth:
      "Volunteering after graduating taught me that professional value is not only measured by a job title. Choosing to stay useful at the sub county level kept my judgement sharp, kept me close to the communities planning decisions actually land on, and reminded me that consistency counts for more than position.",
  },
  {
    slug: "state-department-housing-urban-development",
    organization: "State Department for Housing & Urban Development",
    position: "Urban Planner, Intern",
    period: "2026",
    initials: "HU",
    theme: { bg: "#e4ebf2", badge: "#c8d6e4" },
    image: "/images/mock/experience/state-department-housing-urban-development.jpg",
    logo: "/images/logos/state-department-housing.png",
    summary:
      "National-level planning internship at Kenya's housing and urban development department.",
    roleOverview:
      "The chapter that widened the frame. After working at sub county level, this internship placed me inside the national department where housing and urban development policy is shaped — showing how a decision made centrally eventually reaches a plot boundary in a sub county office.",
    exposure: [
      "A national government department and how its planning function operates",
      "The affordable housing programme and the machinery that delivers it",
      "Site visits to live housing developments alongside senior officers",
      "How planning documentation is prepared for institutional scrutiny",
    ],
    highlights: [
      {
        title: "Site visits on the affordable housing programme",
        detail:
          "Attending live housing sites in PPE alongside the delivery team — seeing planning intent become built work, which no drawing fully conveys.",
      },
      {
        title: "Reading planning at national scale",
        detail:
          "Working with physical planning models and land use studies that cover whole settlements rather than single applications.",
      },
    ],
    skillsDeveloped: [
      "Land Use Planning",
      "Development Control",
      "Stakeholder Collaboration",
      "Professional Communication",
      "Planning Administration",
    ],
    growth:
      "Seeing planning from the national level changed how I read every local decision. I learned that policy only matters once someone implements it carefully, and that the distance between a national programme and a household receiving a home is filled with quiet, unglamorous coordination. It gave me patience for process.",
    evidence: [
      {
        type: "Site Photo",
        label: "On site in PPE",
        note: "Site visit during the affordable housing programme.",
        image: "/images/evidence/housing/20260410-125546.webp",
      },
      {
        type: "Site Photo",
        label: "Affordable housing site",
        note: "Handover event at an affordable housing development.",
        image: "/images/evidence/housing/20260410-093658.webp",
      },
      {
        type: "Planning Drawing",
        label: "Urban planning model",
        note: "Physical model showing land use zoning and circulation.",
        image: "/images/evidence/housing/20260410-121533.webp",
      },
      {
        type: "Site Photo",
        label: "Site documentation",
        note: "Field record from the programme.",
        image: "/images/evidence/housing/20260410-124024.webp",
      },
      {
        type: "Site Photo",
        label: "Development progress",
        note: "Construction progress on site.",
        image: "/images/evidence/housing/20260410-121439.webp",
      },
      {
        type: "Site Photo",
        label: "Housing units",
        note: "Completed and in-progress housing blocks.",
        image: "/images/evidence/housing/20260410-093704.webp",
      },
    ],
  },
  {
    slug: "makueni-kibwezi-west-attachment",
    organization: "County Government of Makueni",
    unit: "Kibwezi West Sub County — Physical Planning Office",
    position: "Urban Planner, Attaché",
    period: "2023",
    initials: "KW",
    theme: { bg: "#f1ece1", badge: "#ded4c0" },
    image: "/images/mock/experience/physical-planning-volunteer-programme.jpg",
    logo: "/images/logos/makueni-county.png",
    summary: "Attachment with the Kibwezi West sub county physical planning office.",
    roleOverview:
      "The chapter where classroom planning met a real counter. Placed at a sub county office mid-degree, I saw how applications actually arrive, how residents ask their questions, and how a planner answers when the textbook does not quite fit the plot in front of them.",
    exposure: [
      "A sub county planning counter and the public who walk up to it",
      "Development applications assessed against approved plans",
      "Site inspections where paperwork is tested against ground conditions",
      "The rhythm of an office serving a whole sub county",
    ],
    highlights: [
      {
        title: "First direct contact with applicants",
        detail:
          "Explaining planning requirements to people whose plans depended on the answer — a very different exercise from writing them in an exam.",
      },
      {
        title: "Learning the gap between plan and ground",
        detail:
          "Site inspections repeatedly showed how a drawing and a site can disagree, and why verification is not optional.",
      },
    ],
    skillsDeveloped: [
      "Site Analysis",
      "Development Application Review",
      "Client Engagement",
      "Land Use Planning",
    ],
    growth:
      "This attachment taught me that planning is a public-facing profession before it is a technical one. The most useful thing I built here was not a drawing — it was the habit of explaining a technical requirement in plain language to someone who needed to act on it.",
  },
  {
    slug: "makueni-hq-wote-attachment",
    organization: "County Government of Makueni",
    unit: "HQ, Wote — Physical Planning Office",
    position: "Urban Planner, Attaché",
    period: "2022",
    initials: "WO",
    theme: { bg: "#f3e6e1", badge: "#e5cec5" },
    image: "/images/mock/experience/internship-experience.jpg",
    logo: "/images/logos/makueni-county.png",
    summary: "First planning attachment, based at the county headquarters in Wote.",
    roleOverview:
      "The starting point. My first placement inside county government, based at the headquarters planning office in Wote — the chapter where I learned what the profession looks like from the inside before I had any standing in it.",
    exposure: [
      "A county headquarters planning office and how it is organised",
      "Planning records, files and the discipline of keeping them",
      "Senior planners at work on county-level planning matters",
      "Field visits accompanying the professional team",
    ],
    highlights: [
      {
        title: "First time inside the profession",
        detail:
          "Moving from studying planning to watching it practised daily — the moment the career stopped being theoretical.",
      },
      {
        title: "Learning the value of the record",
        detail:
          "Organising planning documentation showed me that a decision no one can trace is a decision no one can defend.",
      },
    ],
    skillsDeveloped: [
      "Planning Administration",
      "Professional Communication",
      "Site Analysis",
    ],
    growth:
      "As my first exposure to the profession, this placement set my standards. I learned that most planning work is careful, documented and unglamorous, and that being trusted with small tasks reliably is how you earn the larger ones later.",
  },
];

export function getExperienceBySlug(slug: string) {
  return EXPERIENCES.find((e) => e.slug === slug);
}
