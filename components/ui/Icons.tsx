import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = (props: P) => ({
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...props,
});

export const ArrowRight = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
);

export const ArrowUpRight = (p: P) => (
  <svg {...base(p)}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export const Check = (p: P) => (
  <svg {...base(p)}>
    <path d="m5 12.5 4.2 4.2L19 7" />
  </svg>
);

export const Plus = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const Close = (p: P) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const Phone = (p: P) => (
  <svg {...base(p)}>
    <path d="M5 4h3.5l1.6 4.2-2.2 1.4a11 11 0 0 0 6.5 6.5l1.4-2.2L20 15.5V19a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z" />
  </svg>
);

export const Star = (p: P) => (
  <svg {...base({ fill: "currentColor", stroke: "none", ...p })}>
    <path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8-4.3-4.1 5.9-.8L12 3.5Z" />
  </svg>
);

export const Replay = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4h4" />
  </svg>
);

export const Telegram = (p: P) => (
  <svg {...base({ fill: "currentColor", stroke: "none", ...p })}>
    <path d="M21.4 4.3 18.3 19c-.2 1-.9 1.3-1.7.8l-4.8-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.9 8.9-8c.4-.3-.1-.5-.6-.2L6.1 12.8l-4.7-1.5c-1-.3-1-1 .2-1.5l18.4-7.1c.9-.3 1.6.2 1.4 1.6Z" />
  </svg>
);

export const Viber = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 2.8c5 0 8.6 2.2 8.6 8.1 0 5.6-3.4 7.9-8.3 7.9-.8 0-1.6 0-2.4-.2L6.6 21v-3.4C4.2 16.4 3.4 14 3.4 10.9 3.4 5 7 2.8 12 2.8Z" />
    <path d="M13 6.2a4.2 4.2 0 0 1 4 4M13 8.4a2 2 0 0 1 1.9 1.9" />
    <path d="M9.4 7.7c.3-.3.8-.3 1 0l.9 1.3c.2.3.2.7-.1 1l-.5.5c.4 1 1.2 1.8 2.2 2.2l.5-.5c.3-.3.7-.3 1-.1l1.3.9c.3.2.3.7 0 1l-.6.6c-.5.5-1.3.6-2 .3a8 8 0 0 1-4.2-4.2c-.3-.7-.2-1.5.3-2l.6-.6Z" fill="currentColor" stroke="none" />
  </svg>
);

export const WhatsApp = (p: P) => (
  <svg {...base(p)}>
    <path d="M4.5 19.5 5.6 16A8.3 8.3 0 1 1 8.4 18.6l-3.9.9Z" />
    <path d="M9.2 8.3c.2-.4.6-.4.8-.1l.8 1.6c.1.3 0 .6-.2.8l-.4.4c.5 1.1 1.4 2 2.6 2.6l.4-.4c.2-.2.5-.3.8-.2l1.6.8c.3.2.3.6-.1.8-.6.6-1.5.9-2.3.6a7.6 7.6 0 0 1-4.4-4.4c-.3-.8 0-1.7.4-2.5Z" fill="currentColor" stroke="none" />
  </svg>
);

export const Instagram = (p: P) => (
  <svg {...base(p)}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r=".9" fill="currentColor" stroke="none" />
  </svg>
);

export const Facebook = (p: P) => (
  <svg {...base(p)}>
    <path d="M14.5 8H17V4.5h-2.5c-2.5 0-4 1.6-4 4V11H8v3.5h2.5V21H14v-6.5h2.6L17 11h-3V9c0-.6.4-1 1-1Z" />
  </svg>
);

export const YouTube = (p: P) => (
  <svg {...base(p)}>
    <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
    <path d="m10 9 5 3-5 3V9Z" fill="currentColor" stroke="none" />
  </svg>
);

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden>
        <rect x="1" y="1" width="28" height="28" rx="7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9.5 24V14.5a5.5 5.5 0 0 1 11 0V24" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="18" cy="18.5" r="1.4" fill="var(--color-terracotta)" />
      </svg>
      <span className="font-serif text-[1.7rem] leading-none tracking-[-0.02em]">Domus</span>
    </span>
  );
}
