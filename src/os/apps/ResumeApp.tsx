const SERIF = '"Newsreader", Georgia, serif';
const PDF_URL = "/Ruddy-Simonpour-Resume.pdf";

export default function ResumeApp() {
  return (
    <div className="flex flex-col h-full" style={{ background: "hsl(var(--cream-soft))" }}>
      {/* Toolbar */}
      <div
        className="flex items-center justify-between gap-3 px-3 py-2"
        style={{
          background: "hsl(var(--cream))",
          borderBottom: "1px solid hsl(var(--bevel-dark))",
          fontFamily: SERIF,
        }}
      >
        <div
          style={{
            fontFamily: SERIF,
            fontSize: "13px",
            color: "hsl(var(--ink))",
          }}
        >
          Ruddy-Simonpour-Resume.pdf
        </div>
        <div className="flex items-center gap-2">
          <a
            href={PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
            style={{ fontFamily: SERIF, fontSize: "13px" }}
          >
            Open in new tab
          </a>
          <a
            href={PDF_URL}
            download
            className="btn-os"
            style={{ fontFamily: SERIF, fontSize: "13px" }}
          >
            Download
          </a>
        </div>
      </div>

      {/* PDF embed */}
      <div
        className="flex-1 overflow-hidden"
        style={{ background: "hsl(var(--ink) / 0.08)" }}
      >
        <iframe
          src={`${PDF_URL}#view=FitH`}
          title="Ruddy Simonpour Resume"
          className="w-full h-full"
          style={{ border: 0, display: "block" }}
        />
      </div>
    </div>
  );
}
