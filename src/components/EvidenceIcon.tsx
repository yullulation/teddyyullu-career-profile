import type { EvidenceType } from "@/data/experience";

export default function EvidenceIcon({ type, className }: { type: EvidenceType; className?: string }) {
  const common = { viewBox: "0 0 24 24", fill: "none", className };

  switch (type) {
    case "Report":
      return (
        <svg {...common}>
          <path d="M6 3h9l3 3v15H6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M9 11h6M9 14h6M9 17h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "Planning Drawing":
      return (
        <svg {...common}>
          <rect x="3.5" y="4" width="17" height="16" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <path d="M3.5 9h17M8 9v11M8 4v5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "Map":
      return (
        <svg {...common}>
          <path
            d="M9 4 4 6v14l5-2 6 2 5-2V4l-5 2-6-2Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M9 4v14M15 6v14" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "Site Photo":
      return (
        <svg {...common}>
          <rect x="3" y="6" width="18" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M3 9h4l1.5-2.5h7L17 9h4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <circle cx="12" cy="14" r="3" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "Presentation":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 20l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "Official Document":
    default:
      return (
        <svg {...common}>
          <path d="M6 3h9l3 3v15H6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M9 13l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
}
