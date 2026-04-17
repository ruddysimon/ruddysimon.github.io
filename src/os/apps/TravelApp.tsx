import { useState } from "react";
import { ArrowLeft, Folder, X } from "lucide-react";

type Country = {
  id: string;
  label: string;
  flag: string;
  photos: string[];
};

const COUNTRIES: Country[] = [
  {
    id: "iran",
    label: "Iran",
    flag: "🇮🇷",
    photos: ["/travel/iran/1.jpg", "/travel/iran/2.jpg"],
  },
  {
    id: "egypt",
    label: "Egypt",
    flag: "🇪🇬",
    photos: [
      "/travel/egypt/lea-kobal-UlHxDEtBDM0-unsplash.jpg",
      "/travel/egypt/osama-elsayed-vqRMXgVtGXM-unsplash.jpg",
    ],
  },
  {
    id: "japan",
    label: "Japan",
    flag: "🇯🇵",
    photos: ["/travel/japan/zhen-yao-_HknCS79FG4-unsplash.jpg"],
  },
  {
    id: "amalfi",
    label: "Amalfi Coast",
    flag: "🇮🇹",
    photos: [
      "/travel/amalfi%20coast/1.jpg",
      "/travel/amalfi%20coast/2.jpg",
      "/travel/amalfi%20coast/3.jpg",
    ],
  },
  {
    id: "vibe",
    label: "Vibe",
    flag: "✨",
    photos: [
      "/travel/vibe/caroline-badran-Qe8eMrwTW5g-unsplash.jpg",
      "/travel/vibe/clay-banks-HiIo-viWU40-unsplash.jpg",
    ],
  },
];

export default function TravelApp() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

  const current = COUNTRIES.find((c) => c.id === openId);

  return (
    <div className="flex flex-col h-full bg-cream-soft">
      {/* Path bar */}
      <div
        className="flex items-center gap-2 px-3 py-1.5 text-[12px]"
        style={{
          background: "hsl(var(--cream))",
          borderBottom: "1px solid hsl(var(--bevel-dark))",
          fontFamily: "var(--font-win98)",
        }}
      >
        <button
          onClick={() => setOpenId(null)}
          disabled={!current}
          className="btn-ghost !py-0.5 !px-2 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="w-3 h-3" />
          Back
        </button>
        <span className="text-ink-soft">
          C:\Travel{current ? `\\${current.label}` : ""}
        </span>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-auto win-scroll p-4">
        {!current && (
          <div className="grid grid-cols-3 gap-5">
            {COUNTRIES.map((c) => (
              <button
                key={c.id}
                onDoubleClick={() => setOpenId(c.id)}
                onClick={() => setOpenId(c.id)}
                className="flex flex-col items-center gap-2 p-3 hover:bg-accent/15"
                style={{ borderRadius: 0 }}
              >
                <div className="relative w-16 h-14">
                  {/* pixel folder */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "hsl(var(--accent))",
                      border: "2px solid hsl(var(--ink))",
                      borderTopColor: "hsl(var(--bevel-light))",
                      borderLeftColor: "hsl(var(--bevel-light))",
                    }}
                  />
                  <div
                    className="absolute -top-2 left-1.5 w-6 h-3"
                    style={{
                      background: "hsl(var(--accent))",
                      borderLeft: "2px solid hsl(var(--bevel-light))",
                      borderTop: "2px solid hsl(var(--bevel-light))",
                      borderRight: "2px solid hsl(var(--ink))",
                    }}
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-2xl">
                    {c.flag}
                  </span>
                </div>
                <span className="text-[13px]" style={{ fontFamily: "var(--font-win98)" }}>
                  {c.label}
                </span>
                <span className="text-[10px] text-ink-soft">
                  {c.photos.length} item{c.photos.length === 1 ? "" : "s"}
                </span>
              </button>
            ))}
          </div>
        )}

        {current && (
          <div className="grid grid-cols-2 gap-4">
            {current.photos.map((src, i) => (
              <button
                key={src}
                onClick={() => setLightbox(src)}
                className="group block overflow-hidden"
                style={{
                  border: "2px solid hsl(var(--bevel-dark))",
                  borderTopColor: "hsl(var(--bevel-light))",
                  borderLeftColor: "hsl(var(--bevel-light))",
                  background: "hsl(var(--cream))",
                }}
              >
                <img
                  src={src}
                  alt={`${current.label} ${i + 1}`}
                  className="w-full aspect-[4/3] object-cover group-hover:opacity-90 transition-opacity"
                  loading="lazy"
                />
                <div
                  className="px-2 py-1 text-[11px] text-left border-t"
                  style={{
                    borderColor: "hsl(var(--bevel-dark))",
                    fontFamily: "var(--font-win98)",
                    background: "hsl(var(--cream-soft))",
                  }}
                >
                  {current.label}_{i + 1}.jpg
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Status bar */}
      <div
        className="flex items-center justify-between px-3 py-1 text-[11px]"
        style={{
          background: "hsl(var(--cream))",
          borderTop: "1px solid hsl(var(--bevel-dark))",
          fontFamily: "var(--font-win98)",
          color: "hsl(var(--ink-soft))",
        }}
      >
        <span>
          {current
            ? `${current.photos.length} object${current.photos.length === 1 ? "" : "s"}`
            : `${COUNTRIES.length} folders`}
        </span>
        <span>{current ? current.label : "Travel"}</span>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center p-8"
          style={{ background: "hsl(var(--ink) / 0.85)" }}
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center"
            style={{
              background: "hsl(var(--cream))",
              border: "2px solid hsl(var(--ink))",
              borderTopColor: "hsl(var(--bevel-light))",
              borderLeftColor: "hsl(var(--bevel-light))",
              color: "hsl(var(--ink))",
            }}
            aria-label="Close"
          >
            <X className="w-4 h-4" strokeWidth={2.5} />
          </button>
          <img
            src={lightbox}
            alt=""
            className="max-w-full max-h-full object-contain"
            style={{ border: "3px solid hsl(var(--cream))" }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
