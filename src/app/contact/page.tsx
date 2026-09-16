import type { Metadata } from "next";
import Image from "next/image";
import HighlightCircle from "@/components/HighlightCircle";

export const metadata: Metadata = {
  title: "Contact — Teddy Yullu",
  description:
    "Get in touch with Teddy Yullu — Physical Planner, Urban Designer and Graphic Designer.",
};

const WHATSAPP =
  "https://wa.me/254799467088?text=Hello%20Teddy,%20I%20came%20across%20your%20Professional%20Career%20Profile%20and%20would%20like%20to%20discuss%20a%20potential%20opportunity.";

const INTERESTS = [
  "Physical Planning",
  "Urban Design",
  "Graphic Design",
  "Branding & Visual Identity",
];

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M17.5 14.4c-.3-.1-1.6-.8-1.9-.9-.3-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.1.2-.3.2-.6.1-.3-.1-1.2-.4-2.2-1.4-.8-.7-1.4-1.6-1.5-1.9-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.2-.5.1-.2 0-.4 0-.5-.1-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.3s1 2.7 1.2 2.9c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.6-.7 1.9-1.3.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.6-.3z" />
      <path
        d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
      <rect x="4" y="4" width="16" height="16" rx="4.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="3.6" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16.6" cy="7.4" r="0.9" fill="currentColor" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
      <rect x="3" y="5.5" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="m3.8 7 8.2 6 8.2-6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function ChannelRow({
  icon,
  label,
  value,
  href,
  external,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const body = (
    <>
      <span className="glass flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[#cfe3d7]/70 transition-colors duration-300 group-hover/row:text-lux">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-[10px] font-medium uppercase tracking-[0.2em] text-[#cfe3d7]/45">
          {label}
        </span>
        <span className="mt-1 block truncate font-sans text-base font-medium text-[#f2faf5] transition-colors duration-300 group-hover/row:text-lux sm:text-lg">
          {value}
        </span>
      </span>
    </>
  );

  const className =
    "group/row flex items-center gap-4 border-b border-black/5 py-5 last:border-b-0";

  if (!href) return <div className={className}>{body}</div>;

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={className}
    >
      {body}
    </a>
  );
}

export default function ContactPage() {
  return (
    <main className="ink-panel relative min-h-[100svh] overflow-hidden px-6 pb-16 pt-32 sm:px-10 sm:pt-40">
      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-start gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div>
          <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-lux">
            Let&apos;s Connect
          </span>

          <h1 className="display-xl mt-6 max-w-xl text-[2.7rem] text-[#f2faf5] sm:text-[4rem]">
            Let&apos;s{" "}
            <HighlightCircle>
              <span className="italic font-display font-normal text-lux">connect</span>
            </HighlightCircle>
            .
          </h1>

          <p className="mt-6 max-w-xl text-sm leading-relaxed text-[#cfe3d7]/75">
            Whether you&apos;re looking for a Physical Planner, a Graphic Designer, or would
            simply like to discuss a project, collaboration, or professional opportunity,
            I&apos;d be glad to hear from you. Feel free to reach out through any of the
            channels below, and I&apos;ll respond as soon as possible.
          </p>

          <div className="mt-10 max-w-md">
            <ChannelRow
              icon={<MailIcon />}
              label="Email"
              value="yullulation@gmail.com"
              href="mailto:yullulation@gmail.com"
            />
            <ChannelRow
              icon={<WhatsAppIcon />}
              label="WhatsApp"
              value="+254 799 467 088"
              href={WHATSAPP}
              external
            />
            <ChannelRow
              icon={<InstagramIcon />}
              label="Instagram"
              value="@haveyoumet.ted_"
              href="https://www.instagram.com/haveyoumet.ted_/"
              external
            />
          </div>

          <div className="mt-12 grid max-w-md grid-cols-1 gap-8 border-t border-black/5 pt-8 sm:grid-cols-2">
            <div>
              <span className="block text-[10px] font-medium uppercase tracking-[0.2em] text-[#cfe3d7]/45">
                Current Location
              </span>
              <span className="mt-2 block text-sm text-foreground/80">Nairobi, Kenya</span>
            </div>
            <div>
              <span className="block text-[10px] font-medium uppercase tracking-[0.2em] text-[#cfe3d7]/45">
                Professional Interests
              </span>
              <ul className="mt-2 space-y-1.5">
                {INTERESTS.map((item) => (
                  <li key={item} className="text-sm text-foreground/80">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div
          className="relative mx-auto w-full max-w-sm overflow-hidden rounded-md lg:mx-0"
          style={{ aspectRatio: "1122 / 1402" }}
        >
          <Image
            src="/images/hero/portrait.jpg"
            alt="Portrait — Teddy Yullu"
            fill
            sizes="(max-width: 1024px) 80vw, 30vw"
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10" />
        </div>
      </div>

      {/* Closing note — the last thing on the profile */}
      <div className="mx-auto mt-20 max-w-6xl border-t border-black/5 pt-10">
        <p className="max-w-2xl font-display text-lg italic leading-snug text-[#cfe3d7]/70 sm:text-xl">
          Thank you for taking the time to explore my Professional Career Profile. I
          appreciate your interest and look forward to the opportunity to connect.
        </p>
      </div>

      <footer className="mx-auto mt-14 flex max-w-6xl flex-col gap-2 text-xs text-foreground/40 sm:flex-row sm:items-center sm:justify-between">
        <span>Teddy Yullu — Urban Planning × Design</span>
        <span>© {new Date().getFullYear()}. All rights reserved.</span>
      </footer>
    </main>
  );
}
