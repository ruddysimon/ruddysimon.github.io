import { useEffect, useState } from "react";

/**
 * Classic Win98-era CRT monitor — 3D beveled chassis, sharp corners.
 * Interactive: power LED blinks; on hover the screen "turns on" and
 * shows a minimal face.
 */
type Props = { className?: string };

export default function HappyMacIcon({ className }: Props) {
  const [hover, setHover] = useState(false);
  const [ledOn, setLedOn] = useState(true);

  useEffect(() => {
    const id = window.setInterval(() => {
      setLedOn((v) => !v);
    }, 1200);
    return () => clearInterval(id);
  }, []);

  // Win98 beige palette + bevels
  const beige = "#C3C3B6";          // chassis
  const beigeLight = "#E8E6D8";     // top-left highlight
  const beigeDark = "#7B7968";      // bottom-right shadow
  const ink = "#1A1832";
  const screenOff = "#2A2F3A";      // dark CRT off
  const screenOn = "#76B9C4";       // teal CRT on
  const ledRed = "#D64545";
  const ledGreen = "#3FAE3F";

  return (
    <svg
      viewBox="0 0 32 36"
      className={className}
      shapeRendering="crispEdges"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ cursor: "pointer" }}
    >
      {/* ---- Monitor body ---- */}
      {/* Drop shadow */}
      <rect x="3" y="3" width="26" height="22" fill={ink} opacity="0.35" />

      {/* Chassis with beveled edges */}
      <rect x="1" y="1" width="28" height="22" fill={beige} />
      {/* Top + left highlight */}
      <rect x="1" y="1" width="28" height="1" fill={beigeLight} />
      <rect x="1" y="1" width="1" height="22" fill={beigeLight} />
      {/* Bottom + right shadow */}
      <rect x="1" y="22" width="28" height="1" fill={beigeDark} />
      <rect x="28" y="1" width="1" height="22" fill={beigeDark} />
      {/* Outer stroke */}
      <rect x="1" y="1" width="28" height="22" fill="none" stroke={ink} strokeWidth="0.5" />

      {/* Screen bezel (inset bevel — reversed) */}
      <rect x="4" y="4" width="22" height="15" fill={beigeDark} />
      <rect x="4" y="4" width="22" height="1" fill={beigeDark} />
      <rect x="4" y="4" width="1" height="15" fill={beigeDark} />
      <rect x="4" y="18" width="22" height="1" fill={beigeLight} />
      <rect x="25" y="4" width="1" height="15" fill={beigeLight} />

      {/* Screen itself */}
      <rect x="5" y="5" width="20" height="13" fill={hover ? screenOn : screenOff} />

      {/* Scan lines on CRT */}
      <g opacity="0.18">
        <rect x="5" y="7" width="20" height="1" fill={ink} />
        <rect x="5" y="10" width="20" height="1" fill={ink} />
        <rect x="5" y="13" width="20" height="1" fill={ink} />
        <rect x="5" y="16" width="20" height="1" fill={ink} />
      </g>

      {/* Face on the screen — only when powered on (hover) */}
      {hover && (
        <g fill={ink}>
          {/* eyes */}
          <rect x="10" y="9" width="2" height="2" />
          <rect x="18" y="9" width="2" height="2" />
          {/* flat smile */}
          <rect x="11" y="14" width="8" height="1" />
          <rect x="10" y="13" width="1" height="1" />
          <rect x="19" y="13" width="1" height="1" />
        </g>
      )}

      {/* Front panel */}
      <rect x="1" y="20" width="28" height="3" fill={beige} />
      <rect x="1" y="20" width="28" height="1" fill={beigeLight} />
      {/* Power LED */}
      <rect x="24" y="21" width="2" height="1" fill={hover || ledOn ? ledGreen : ledRed} />
      {/* Brand bar */}
      <rect x="4" y="21" width="6" height="1" fill={ink} opacity="0.55" />

      {/* ---- Base / stand ---- */}
      {/* Neck */}
      <rect x="10" y="23" width="10" height="2" fill={beige} />
      <rect x="10" y="23" width="10" height="1" fill={beigeLight} />
      <rect x="10" y="24" width="10" height="1" fill={beigeDark} />

      {/* Pedestal */}
      <rect x="4" y="25" width="22" height="6" fill={beige} />
      <rect x="4" y="25" width="22" height="1" fill={beigeLight} />
      <rect x="4" y="25" width="1" height="6" fill={beigeLight} />
      <rect x="4" y="30" width="22" height="1" fill={beigeDark} />
      <rect x="25" y="25" width="1" height="6" fill={beigeDark} />
      <rect x="4" y="25" width="22" height="6" fill="none" stroke={ink} strokeWidth="0.5" />

      {/* Floppy slot */}
      <rect x="8" y="27" width="10" height="1" fill={ink} opacity="0.7" />
      {/* Eject button */}
      <rect x="20" y="27" width="3" height="1" fill={beigeDark} />

      {/* Ground shadow */}
      <rect x="2" y="32" width="26" height="1" fill={ink} opacity="0.22" />
    </svg>
  );
}
