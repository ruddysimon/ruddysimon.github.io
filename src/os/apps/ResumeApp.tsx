export default function ResumeApp() {
  return (
    <div className="p-10 flex flex-col items-center justify-center text-center min-h-full">
      <PixelDoc />

      <h1
        className="mt-5 mb-2"
        style={{
          fontFamily: '"Newsreader", Georgia, serif',
          fontWeight: 400,
          fontSize: "32px",
          color: "hsl(var(--ink))",
          letterSpacing: "-0.01em",
        }}
      >
        Here is my resume.
      </h1>

      <a
        href="/Ruddy-Simonpour-Resume.pdf"
        download
        className="btn-os mt-6"
        style={{ fontSize: "13px", padding: "8px 20px" }}
      >
        Download PDF
      </a>
    </div>
  );
}

/** Tiny pixel-art document — no react-icons, crisp SVG. */
function PixelDoc() {
  const ink   = "#1A1410";
  const paper = "#FFFEFA";
  const fold  = "#E8DFC8";
  const line  = "#1A1410";

  return (
    <svg
      viewBox="0 0 40 52"
      width="56"
      height="72"
      shapeRendering="crispEdges"
      style={{ display: "block" }}
    >
      {/* shadow */}
      <rect x="3" y="4" width="34" height="46" fill={ink} opacity="0.25" />

      {/* page body */}
      <rect x="2" y="2" width="33" height="46" fill={paper} />

      {/* folded top-right corner */}
      <polygon points="35,2 35,12 25,2" fill={paper} />
      <polygon points="25,2 35,12 25,12" fill={fold} />
      {/* fold outline */}
      <rect x="25" y="2" width="1" height="10" fill={ink} />
      <rect x="25" y="11" width="10" height="1" fill={ink} />

      {/* text lines */}
      <rect x="6"  y="16" width="20" height="1" fill={line} opacity="0.8" />
      <rect x="6"  y="20" width="24" height="1" fill={line} opacity="0.5" />
      <rect x="6"  y="23" width="22" height="1" fill={line} opacity="0.5" />
      <rect x="6"  y="26" width="25" height="1" fill={line} opacity="0.5" />
      <rect x="6"  y="30" width="18" height="1" fill={line} opacity="0.5" />
      <rect x="6"  y="33" width="23" height="1" fill={line} opacity="0.5" />
      <rect x="6"  y="36" width="20" height="1" fill={line} opacity="0.5" />
      <rect x="6"  y="39" width="24" height="1" fill={line} opacity="0.5" />
      <rect x="6"  y="42" width="16" height="1" fill={line} opacity="0.5" />

      {/* page outline */}
      <rect x="2" y="2" width="33" height="46" fill="none" stroke={ink} strokeWidth="1" />
    </svg>
  );
}
