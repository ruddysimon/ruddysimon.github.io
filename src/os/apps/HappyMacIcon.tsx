import { useEffect, useState } from "react";

/**
 * Classic Windows 98 "My Computer" style desktop PC icon.
 * Beige CRT monitor sitting on a horizontal pizza-box case.
 * Interactive: screen powers on and shows a face on hover; LED blinks.
 */
type Props = { className?: string };

export default function HappyMacIcon({ className }: Props) {
  const [hover, setHover] = useState(false);
  const [ledOn, setLedOn] = useState(true);

  useEffect(() => {
    const id = window.setInterval(() => setLedOn((v) => !v), 1100);
    return () => clearInterval(id);
  }, []);

  // Authentic Win98 beige palette
  const ink        = "#1A1410";
  const beige      = "#C7C5B2";
  const beigeLt    = "#E6E4D2";
  const beigeSheen = "#D5D3C1";
  const beigeDk    = "#8A8879";
  const beigeDeep  = "#5A5949";
  const screenOff  = "#1B2237";
  const screenOn   = "#2D5EA8";   // classic Win98 desktop blue
  const screenSide = "#6A8ED0";
  const ledRed     = "#C43636";
  const ledGreen   = "#2E9F3C";
  const white      = "#FFFFFF";

  return (
    <svg
      viewBox="0 0 44 44"
      className={className}
      shapeRendering="crispEdges"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ cursor: "pointer" }}
    >
      {/* ================== MONITOR ================== */}

      {/* Drop shadow behind whole icon */}
      <rect x="5" y="3" width="32" height="24" fill={ink} opacity="0.35" />

      {/* Monitor back depth (right-side edge for 3D effect) */}
      <rect x="34" y="3" width="2" height="22" fill={beigeDeep} />
      <rect x="36" y="3" width="1" height="22" fill={ink} />

      {/* Chassis */}
      <rect x="3" y="2" width="31" height="23" fill={beige} />

      {/* Chassis bevel — highlights */}
      <rect x="3" y="2" width="31" height="1" fill={beigeLt} />
      <rect x="3" y="2" width="1"  height="23" fill={beigeLt} />

      {/* Chassis bevel — shadows */}
      <rect x="33" y="3"  width="1"  height="22" fill={beigeDk} />
      <rect x="3"  y="24" width="31" height="1"  fill={beigeDk} />

      {/* Chassis outline */}
      <rect x="2" y="1" width="1"  height="24" fill={ink} />
      <rect x="3" y="1" width="31" height="1"  fill={ink} />
      <rect x="3" y="25" width="31" height="1" fill={ink} />

      {/* Screen bezel — inset (reversed bevel) */}
      <rect x="5"  y="4"  width="26" height="17" fill={beigeDk} />
      <rect x="5"  y="4"  width="26" height="1"  fill={beigeDk} />
      <rect x="5"  y="4"  width="1"  height="17" fill={beigeDk} />
      <rect x="5"  y="20" width="26" height="1"  fill={beigeLt} />
      <rect x="30" y="4"  width="1"  height="17" fill={beigeLt} />

      {/* Screen */}
      <rect x="6" y="5" width="24" height="15" fill={hover ? screenOn : screenOff} />

      {/* Scanlines */}
      <g opacity="0.14">
        <rect x="6" y="7"  width="24" height="1" fill={ink} />
        <rect x="6" y="10" width="24" height="1" fill={ink} />
        <rect x="6" y="13" width="24" height="1" fill={ink} />
        <rect x="6" y="16" width="24" height="1" fill={ink} />
      </g>

      {/* Face (only on hover) */}
      {hover && (
        <>
          {/* eyes */}
          <rect x="11" y="9"  width="3" height="3" fill={white} />
          <rect x="12" y="10" width="1" height="1" fill={ink} />
          <rect x="22" y="9"  width="3" height="3" fill={white} />
          <rect x="23" y="10" width="1" height="1" fill={ink} />
          {/* smile */}
          <rect x="13" y="15" width="10" height="1" fill={white} />
          <rect x="12" y="14" width="1"  height="1" fill={white} />
          <rect x="23" y="14" width="1"  height="1" fill={white} />
          {/* subtle screen glow */}
          <rect x="6" y="5" width="24" height="1" fill={screenSide} opacity="0.5" />
        </>
      )}

      {/* Front panel: LED + brand */}
      <rect x="4" y="22" width="3" height="1" fill={ink} opacity="0.7" />
      <rect x="26" y="22" width="2" height="1" fill={hover || ledOn ? ledGreen : ledRed} />
      {/* LED border */}
      <rect x="25" y="22" width="1" height="1" fill={ink} opacity="0.4" />
      <rect x="28" y="22" width="1" height="1" fill={ink} opacity="0.4" />

      {/* ================== PIZZA-BOX CASE ================== */}

      {/* Case drop shadow */}
      <rect x="3" y="38" width="38" height="5" fill={ink} opacity="0.25" />

      {/* Top face of case (perspective — lighter, slightly wider at bottom) */}
      <rect x="1" y="27" width="40" height="4" fill={beigeSheen} />
      <rect x="1" y="27" width="40" height="1" fill={beigeLt} />
      <rect x="1" y="30" width="40" height="1" fill={beigeDk} />

      {/* Front face of case */}
      <rect x="1" y="31" width="40" height="9" fill={beige} />

      {/* Case bevel — highlight on top + left */}
      <rect x="1" y="31" width="40" height="1" fill={beigeLt} opacity="0.7" />
      <rect x="1" y="31" width="1"  height="9" fill={beigeLt} />

      {/* Case bevel — shadow on bottom + right */}
      <rect x="1"  y="39" width="40" height="1" fill={beigeDk} />
      <rect x="40" y="31" width="1"  height="9" fill={beigeDk} />

      {/* Case outline */}
      <rect x="1" y="26" width="40" height="1" fill={ink} />
      <rect x="0" y="27" width="1"  height="13" fill={ink} />
      <rect x="41" y="27" width="1" height="13" fill={ink} />
      <rect x="1" y="40" width="40" height="1" fill={ink} />

      {/* Floppy drive slot */}
      <rect x="28" y="33" width="10" height="3" fill={beigeDk} />
      <rect x="28" y="33" width="10" height="1" fill={beigeDeep} />
      <rect x="28" y="33" width="1"  height="3" fill={beigeDeep} />
      {/* floppy slot inner */}
      <rect x="29" y="34" width="8" height="1" fill={ink} />
      {/* eject button */}
      <rect x="36" y="35" width="2" height="1" fill={beigeLt} />

      {/* CD / 5.25" drive (small slot lower) */}
      <rect x="28" y="37" width="10" height="1" fill={ink} opacity="0.6" />

      {/* Power button (round-ish) */}
      <rect x="4" y="33" width="3" height="3" fill={beigeDk} />
      <rect x="4" y="33" width="3" height="1" fill={beigeDeep} />
      <rect x="5" y="34" width="1" height="1" fill={hover || ledOn ? ledGreen : ledRed} />

      {/* Brand plaque */}
      <rect x="10" y="34" width="14" height="2" fill={beigeLt} />
      <rect x="10" y="34" width="14" height="1" fill={white} opacity="0.4" />
      <rect x="11" y="35" width="2"  height="1" fill={ink} opacity="0.55" />
      <rect x="14" y="35" width="3"  height="1" fill={ink} opacity="0.55" />
      <rect x="18" y="35" width="2"  height="1" fill={ink} opacity="0.55" />
      <rect x="21" y="35" width="2"  height="1" fill={ink} opacity="0.55" />
    </svg>
  );
}
