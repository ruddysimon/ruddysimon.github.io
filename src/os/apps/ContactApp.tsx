const SERIF = '"Newsreader", Georgia, serif';

const links = [
  { label: "Email",    value: "ruddy.simonpour@gmail.com", href: "mailto:ruddy.simonpour@gmail.com" },
  { label: "LinkedIn", value: "/in/ruddysimon",            href: "https://www.linkedin.com/in/ruddysimon/", external: true },
  { label: "GitHub",   value: "@ruddysimon",               href: "https://github.com/ruddysimon", external: true },
];

const ink = "hsl(var(--ink))";
const inkSoft = "hsl(var(--ink-soft))";

export default function ContactApp() {
  return (
    <div
      className="px-8 py-7 max-w-[560px] mx-auto"
      style={{ color: ink, fontFamily: SERIF }}
    >
      <h1
        style={{
          fontFamily: SERIF,
          fontWeight: 400,
          fontSize: "34px",
          letterSpacing: "-0.01em",
          lineHeight: 1.1,
        }}
      >
        Contact
      </h1>
      <p
        className="mt-1 mb-6"
        style={{ fontFamily: SERIF, fontSize: "14px", color: inkSoft }}
      >
      </p>

      <div className="flex flex-col">
        {links.map((l, i) => (
          <a
            key={l.label}
            href={l.href}
            target={l.external ? "_blank" : undefined}
            rel={l.external ? "noopener noreferrer" : undefined}
            className="flex items-baseline justify-between gap-6 py-3.5"
            style={{
              borderTop: i === 0 ? "1px solid hsl(var(--ink) / 0.18)" : "none",
              borderBottom: "1px solid hsl(var(--ink) / 0.18)",
            }}
          >
            <span
              style={{
                fontFamily: SERIF,
                fontSize: "13px",
                color: inkSoft,
                letterSpacing: "0.04em",
                minWidth: "90px",
              }}
            >
              {l.label}
            </span>
            <span
              className="flex-1"
              style={{
                fontFamily: SERIF,
                fontSize: "15px",
                color: ink,
                textDecoration: "underline",
                textUnderlineOffset: "3px",
                textDecorationColor: "hsl(var(--ink) / 0.35)",
              }}
            >
              {l.value}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
