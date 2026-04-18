/**
 * Classic Windows 98 "My Documents"-style folder icon.
 * A manila folder with two white papers peeking out of the top.
 * Papers sit between the folder back and the folder front.
 */
export default function Win98DocFolder() {
  const ink        = "#1A1410";
  const gold       = "#F4C430";
  const goldLight  = "#FFE57A";
  const goldSheen  = "#FFD95C";
  const goldDark   = "#C99612";
  const goldDeep   = "#8C6608";
  const goldBack   = "#E8B828";   // back panel — slightly darker so back reads behind front
  const paper      = "#FFFEFA";
  const paperAged  = "#F5F1E0";
  const line       = "#2A2218";

  return (
    <svg
      viewBox="0 0 60 54"
      width="60"
      height="54"
      style={{ display: "block" }}
    >
      {/* drop shadow */}
      <g shapeRendering="crispEdges">
        <rect x="4" y="9" width="55" height="43" fill={goldDeep} opacity="0.35" />
      </g>

      {/* ===== FOLDER BACK ===== */}
      <g shapeRendering="crispEdges">
        {/* tab */}
        <rect x="3" y="7"  width="19" height="5"  fill={goldBack} />
        {/* back panel */}
        <rect x="3" y="12" width="54" height="38" fill={goldBack} />

        {/* back highlights */}
        <rect x="3"  y="7"  width="19" height="1" fill={goldLight} />
        <rect x="3"  y="7"  width="1"  height="5" fill={goldLight} />
        <rect x="22" y="12" width="35" height="1" fill={goldLight} />
        <rect x="3"  y="12" width="1"  height="38" fill={goldLight} />

        {/* back shadows */}
        <rect x="56" y="12" width="1" height="38" fill={goldDeep} />
        <rect x="3"  y="49" width="54" height="1" fill={goldDeep} />
        <rect x="21" y="8"  width="1"  height="4" fill={goldDark} />

        {/* back outline */}
        <rect x="2"  y="6"  width="21" height="1"  fill={ink} />
        <rect x="22" y="7"  width="1"  height="5"  fill={ink} />
        <rect x="22" y="11" width="36" height="1"  fill={ink} />
        <rect x="57" y="12" width="1"  height="38" fill={ink} />
        <rect x="2"  y="50" width="56" height="1"  fill={ink} />
        <rect x="2"  y="7"  width="1"  height="43" fill={ink} />
      </g>

      {/* ===== PAPERS ===== */}
      {/* back paper (tilted right) */}
      <g transform="rotate(6 36 18)">
        <rect x="26" y="4" width="24" height="22" fill={paperAged} stroke={ink} strokeWidth="0.8" />
        <rect x="29" y="9"  width="18" height="1" fill={line} opacity="0.35" />
        <rect x="29" y="12" width="15" height="1" fill={line} opacity="0.3" />
        <rect x="29" y="15" width="17" height="1" fill={line} opacity="0.3" />
        <rect x="29" y="18" width="13" height="1" fill={line} opacity="0.3" />
      </g>

      {/* front paper (tilted left) */}
      <g transform="rotate(-6 22 22)">
        <rect x="8" y="6" width="28" height="26" fill={paper} stroke={ink} strokeWidth="0.8" />
        {/* "text" lines */}
        <rect x="12" y="11" width="22" height="1.4" fill={line} opacity="0.65" />
        <rect x="12" y="15" width="17" height="1"   fill={line} opacity="0.45" />
        <rect x="12" y="18" width="20" height="1"   fill={line} opacity="0.45" />
        <rect x="12" y="21" width="14" height="1"   fill={line} opacity="0.45" />
        <rect x="12" y="24" width="18" height="1"   fill={line} opacity="0.45" />
        <rect x="12" y="27" width="10" height="1"   fill={line} opacity="0.45" />
      </g>

      {/* ===== FOLDER FRONT (hides lower part of papers) ===== */}
      <g shapeRendering="crispEdges">
        {/* fill */}
        <rect x="3" y="22" width="54" height="28" fill={gold} />
        {/* sheen band along the top lip */}
        <rect x="3" y="22" width="54" height="2"  fill={goldSheen} />
        {/* highlights */}
        <rect x="3" y="22" width="54" height="1" fill={goldLight} />
        <rect x="3" y="22" width="1"  height="28" fill={goldLight} />
        {/* shadows */}
        <rect x="3"  y="49" width="54" height="1"  fill={goldDark} />
        <rect x="56" y="22" width="1"  height="28" fill={goldDark} />
        {/* front outline */}
        <rect x="2"  y="21" width="56" height="1"  fill={ink} />
        <rect x="57" y="22" width="1"  height="29" fill={ink} />
        <rect x="2"  y="50" width="56" height="1"  fill={ink} />
        <rect x="2"  y="22" width="1"  height="29" fill={ink} />
      </g>
    </svg>
  );
}
