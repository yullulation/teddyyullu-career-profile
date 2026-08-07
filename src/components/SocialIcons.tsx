"use client";

const ICONS: { label: string; path: React.ReactNode }[] = [
  {
    label: "WhatsApp",
    path: (
      <path
        fill="currentColor"
        d="M17.5 14.4c-.3-.1-1.6-.8-1.9-.9-.3-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.1.2-.3.2-.6.1-.3-.1-1.2-.4-2.2-1.4-.8-.7-1.4-1.6-1.5-1.9-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.2-.5.1-.2 0-.4 0-.5-.1-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.3s1 2.7 1.2 2.9c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.6-.7 1.9-1.3.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.6-.3z"
      />
    ),
  },
  {
    label: "Instagram",
    path: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="4.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="3.6" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="16.6" cy="7.4" r="0.9" fill="currentColor" />
      </>
    ),
  },
  {
    label: "TikTok",
    path: (
      <path
        fill="currentColor"
        d="M14.5 3.5c.3 1.7 1.4 2.9 3.1 3.1v2.2c-1.1 0-2.1-.3-3-.9v5.4c0 2.6-2.1 4.7-4.7 4.7S5.2 16 5.2 13.4c0-2.5 2-4.5 4.4-4.7v2.3c-1.2.2-2.1 1.2-2.1 2.4 0 1.3 1.1 2.4 2.4 2.4s2.4-1.1 2.4-2.4V3.5h2.2z"
      />
    ),
  },
  {
    label: "Facebook",
    path: (
      <path
        fill="currentColor"
        d="M13.5 21v-7.2h2.4l.4-2.8h-2.8V9.2c0-.8.2-1.3 1.4-1.3h1.5V5.4c-.3 0-1.1-.1-2.1-.1-2.1 0-3.5 1.3-3.5 3.6v2.1H8.4v2.8h2.4V21h2.7z"
      />
    ),
  },
];

export default function SocialIcons() {
  return (
    <div className="flex items-center gap-3">
      {ICONS.map((icon) => (
        <button
          key={icon.label}
          type="button"
          title={`${icon.label} — link coming soon`}
          aria-label={icon.label}
          className="glass hover-fill flex h-11 w-11 items-center justify-center rounded-full text-foreground/70"
        >
          <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]">
            {icon.path}
          </svg>
        </button>
      ))}
    </div>
  );
}
