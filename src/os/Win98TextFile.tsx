/**
 * Classic Windows 98 text-document icon (Notepad .txt style).
 * Pure pixel-art: white page, stair-step folded corner, horizontal
 * text lines, and the iconic yellow "A" Notepad badge.
 * All shapes are 1×1 integer rects with crispEdges for pixel-perfect edges.
 */
export default function Win98TextFile() {
  const ink        = "#1A1410";
  const paper      = "#FFFFFF";
  const paperShade = "#CFC9B5";   // folded-back corner
  const paperInner = "#E9E4CF";   // subtle page sheen
  const line       = "#22190F";
  const lineSoft   = "#3D3326";
  const badge      = "#F5D02B";
  const badgeLight = "#FFE773";
  const badgeDark  = "#A87D08";

  return (
    <svg
      viewBox="0 0 60 54"
      width="64"
      height="58"
      shapeRendering="crispEdges"
      style={{ display: "block" }}
    >
      {/* drop shadow */}
      <rect x="7" y="5" width="47" height="47" fill={ink} opacity="0.22" />

      {/* white page body */}
      <rect x="5" y="3"  width="48" height="48" fill={paper} />
      {/* subtle inner sheen at top */}
      <rect x="6" y="4"  width="46" height="1"  fill={paperInner} />

      {/* folded-back corner (paperShade) — stair-step triangle */}
      <rect x="42" y="3"  width="11" height="1" fill={paperShade} />
      <rect x="43" y="4"  width="10" height="1" fill={paperShade} />
      <rect x="44" y="5"  width="9"  height="1" fill={paperShade} />
      <rect x="45" y="6"  width="8"  height="1" fill={paperShade} />
      <rect x="46" y="7"  width="7"  height="1" fill={paperShade} />
      <rect x="47" y="8"  width="6"  height="1" fill={paperShade} />
      <rect x="48" y="9"  width="5"  height="1" fill={paperShade} />
      <rect x="49" y="10" width="4"  height="1" fill={paperShade} />
      <rect x="50" y="11" width="3"  height="1" fill={paperShade} />
      <rect x="51" y="12" width="2"  height="1" fill={paperShade} />
      <rect x="52" y="13" width="1"  height="1" fill={paperShade} />

      {/* fold diagonal crease (ink stair-step) */}
      <rect x="41" y="3"  width="1" height="1" fill={ink} />
      <rect x="42" y="4"  width="1" height="1" fill={ink} />
      <rect x="43" y="5"  width="1" height="1" fill={ink} />
      <rect x="44" y="6"  width="1" height="1" fill={ink} />
      <rect x="45" y="7"  width="1" height="1" fill={ink} />
      <rect x="46" y="8"  width="1" height="1" fill={ink} />
      <rect x="47" y="9"  width="1" height="1" fill={ink} />
      <rect x="48" y="10" width="1" height="1" fill={ink} />
      <rect x="49" y="11" width="1" height="1" fill={ink} />
      <rect x="50" y="12" width="1" height="1" fill={ink} />
      <rect x="51" y="13" width="1" height="1" fill={ink} />

      {/* text lines — bold title line + body lines */}
      <rect x="10" y="22" width="30" height="2" fill={line} />
      <rect x="10" y="27" width="36" height="1" fill={lineSoft} />
      <rect x="10" y="31" width="32" height="1" fill={lineSoft} />
      <rect x="10" y="35" width="36" height="1" fill={lineSoft} />
      <rect x="10" y="39" width="28" height="1" fill={lineSoft} />
      <rect x="10" y="43" width="34" height="1" fill={lineSoft} />
      <rect x="10" y="47" width="22" height="1" fill={lineSoft} />

      {/* outer page outline (rectangular) */}
      <rect x="5"  y="3"  width="48" height="1"  fill={ink} />
      <rect x="5"  y="50" width="48" height="1"  fill={ink} />
      <rect x="5"  y="3"  width="1"  height="48" fill={ink} />
      <rect x="52" y="3"  width="1"  height="48" fill={ink} />

      {/* ===== Yellow Notepad "A" badge — top-left ===== */}
      {/* fill */}
      <rect x="7"  y="5"  width="13" height="12" fill={badge} />
      {/* bevel highlights */}
      <rect x="7"  y="5"  width="13" height="1"  fill={badgeLight} />
      <rect x="7"  y="5"  width="1"  height="12" fill={badgeLight} />
      {/* bevel shadows */}
      <rect x="19" y="6"  width="1"  height="11" fill={badgeDark} />
      <rect x="8"  y="16" width="12" height="1"  fill={badgeDark} />
      {/* outline */}
      <rect x="6"  y="4"  width="15" height="1"  fill={ink} />
      <rect x="6"  y="17" width="15" height="1"  fill={ink} />
      <rect x="6"  y="4"  width="1"  height="14" fill={ink} />
      <rect x="20" y="4"  width="1"  height="14" fill={ink} />

      {/* Letter "A" inside the badge */}
      <rect x="12" y="7"  width="3" height="1" fill={ink} />
      <rect x="11" y="8"  width="1" height="1" fill={ink} />
      <rect x="15" y="8"  width="1" height="1" fill={ink} />
      <rect x="11" y="9"  width="1" height="5" fill={ink} />
      <rect x="15" y="9"  width="1" height="5" fill={ink} />
      <rect x="11" y="11" width="5" height="1" fill={ink} />
    </svg>
  );
}
