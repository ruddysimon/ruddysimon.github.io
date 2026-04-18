/**
 * Classic Windows 98 pixel folder icon — plain manila folder.
 * Thin black outline, gold body, 1px bevel, tab on top-left.
 */
export default function Win98Folder() {
  const ink       = "#1A1410";
  const gold      = "#F4C430";
  const goldLight = "#FFE57A";
  const goldSheen = "#FFD95C";
  const goldDark  = "#C99612";
  const goldDeep  = "#8C6608";

  return (
    <svg
      viewBox="0 0 60 52"
      width="60"
      height="52"
      shapeRendering="crispEdges"
      style={{ display: "block" }}
    >
      {/* drop shadow */}
      <rect x="4" y="7"  width="21" height="5"  fill={goldDeep} opacity="0.35" />
      <rect x="4" y="11" width="55" height="40" fill={goldDeep} opacity="0.35" />

      {/* fills */}
      <rect x="3" y="5"  width="19" height="5"  fill={gold} />
      <rect x="3" y="10" width="54" height="39" fill={gold} />

      {/* sheen band */}
      <rect x="4" y="11" width="52" height="3"  fill={goldSheen} />

      {/* bevel highlights */}
      <rect x="3"  y="5"  width="19" height="1" fill={goldLight} />
      <rect x="3"  y="5"  width="1"  height="5" fill={goldLight} />
      <rect x="22" y="10" width="35" height="1" fill={goldLight} />
      <rect x="3"  y="10" width="1"  height="39" fill={goldLight} />

      {/* bevel shadows */}
      <rect x="3"  y="48" width="54" height="1"  fill={goldDark} />
      <rect x="56" y="10" width="1"  height="39" fill={goldDark} />
      <rect x="21" y="6"  width="1"  height="4"  fill={goldDark} />
      <rect x="4"  y="11" width="17" height="1"  fill={goldDark} opacity="0.4" />

      {/* outlines */}
      <rect x="2"  y="4"  width="21" height="1"  fill={ink} />
      <rect x="22" y="5"  width="1"  height="5"  fill={ink} />
      <rect x="22" y="9"  width="36" height="1"  fill={ink} />
      <rect x="57" y="10" width="1"  height="40" fill={ink} />
      <rect x="2"  y="49" width="56" height="1"  fill={ink} />
      <rect x="2"  y="5"  width="1"  height="45" fill={ink} />
    </svg>
  );
}
