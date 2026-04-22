/**
 * Simplified Win98 text-document icon.
 * A single clean page with a folded corner and a few text lines —
 * no badge, no extra chrome. Pure pixel art for crisp edges.
 */
export default function Win98TextFile() {
  const ink      = "#1A1410";
  const paper    = "#FFFFFF";
  const fold     = "#C9C3AC";   // folded corner underside
  const title    = "#1A1410";   // bold title rule
  const body     = "#5A4F3C";   // thin body lines

  return (
    <svg
      viewBox="0 0 48 48"
      width="56"
      height="56"
      shapeRendering="crispEdges"
      style={{ display: "block" }}
    >
      {/* soft drop shadow */}
      <rect x="8" y="7" width="35" height="38" fill={ink} opacity="0.2" />

      {/* page body */}
      <rect x="6" y="4" width="35" height="40" fill={paper} />

      {/* dog-ear fold — simple 4-step triangle */}
      <rect x="33" y="4"  width="8" height="1" fill={fold} />
      <rect x="35" y="5"  width="6" height="1" fill={fold} />
      <rect x="37" y="6"  width="4" height="1" fill={fold} />
      <rect x="39" y="7"  width="2" height="1" fill={fold} />

      {/* fold diagonal edge (ink) */}
      <rect x="33" y="4"  width="1" height="1" fill={ink} />
      <rect x="34" y="5"  width="1" height="1" fill={ink} />
      <rect x="35" y="6"  width="1" height="1" fill={ink} />
      <rect x="36" y="7"  width="1" height="1" fill={ink} />
      <rect x="37" y="8"  width="1" height="1" fill={ink} />
      <rect x="38" y="9"  width="1" height="1" fill={ink} />
      <rect x="39" y="10" width="1" height="1" fill={ink} />
      <rect x="40" y="11" width="1" height="1" fill={ink} />

      {/* bold title line */}
      <rect x="11" y="16" width="18" height="2" fill={title} />

      {/* thin body lines */}
      <rect x="11" y="23" width="22" height="1" fill={body} />
      <rect x="11" y="28" width="22" height="1" fill={body} />
      <rect x="11" y="33" width="15" height="1" fill={body} />

      {/* outer page outline */}
      <rect x="6"  y="4"  width="27" height="1"  fill={ink} />
      <rect x="6"  y="43" width="35" height="1"  fill={ink} />
      <rect x="6"  y="4"  width="1"  height="40" fill={ink} />
      <rect x="40" y="11" width="1"  height="33" fill={ink} />
    </svg>
  );
}
