/**
 * Classic Windows 98 pixel folder icon.
 * Hand-drawn pixel art — thin black outline, beveled 3D manila yellow body,
 * tab raised on the top-left. Pass `children` for a small app badge on the face.
 */
export default function Win98Folder({ children }: { children?: React.ReactNode }) {
  // Authentic Win98 manila palette
  const ink       = "#1A1410";     // outline
  const gold      = "#F4C430";     // main body
  const goldLight = "#FFE57A";     // top/left highlight (1px bevel)
  const goldSheen = "#FFD95C";     // soft inner sheen band
  const goldDark  = "#C99612";     // bottom/right inner shadow
  const goldDeep  = "#8C6608";     // outer drop shadow

  return (
    <div className="relative" style={{ width: 60, height: 52 }}>
      <svg
        viewBox="0 0 60 52"
        width="60"
        height="52"
        shapeRendering="crispEdges"
        style={{ display: "block" }}
      >
        {/* ---- drop shadow behind the whole icon ---- */}
        <rect x="4" y="7"  width="21" height="5"  fill={goldDeep} opacity="0.35" />
        <rect x="4" y="11" width="55" height="40" fill={goldDeep} opacity="0.35" />

        {/* ---- FILLS (before outlines, so outlines sit on top) ---- */}
        {/* Tab body */}
        <rect x="3" y="5"  width="19" height="5"  fill={gold} />
        {/* Main folder body */}
        <rect x="3" y="10" width="54" height="39" fill={gold} />

        {/* Inner sheen band near the top — classic Win98 sun-from-top-left light */}
        <rect x="4" y="11" width="52" height="3"  fill={goldSheen} />

        {/* ---- 1px BEVEL HIGHLIGHTS (top + left) ---- */}
        {/* Tab */}
        <rect x="3"  y="5"  width="19" height="1" fill={goldLight} />
        <rect x="3"  y="5"  width="1"  height="5" fill={goldLight} />
        {/* Body — top continues to the right of the tab */}
        <rect x="22" y="10" width="35" height="1" fill={goldLight} />
        <rect x="3"  y="10" width="1"  height="39" fill={goldLight} />

        {/* ---- 1px BEVEL SHADOWS (bottom + right, inside) ---- */}
        {/* Body */}
        <rect x="3"  y="48" width="54" height="1"  fill={goldDark} />
        <rect x="56" y="10" width="1"  height="39" fill={goldDark} />
        {/* Tab right — subtle shadow where the tab meets the body */}
        <rect x="21" y="6"  width="1"  height="4"  fill={goldDark} />
        {/* Tab-shadow line cast on the body top (just below the tab) */}
        <rect x="4"  y="11" width="17" height="1"  fill={goldDark} opacity="0.4" />

        {/* ---- BLACK OUTLINES (on top of everything) ---- */}
        {/* Tab top */}
        <rect x="2"  y="4"  width="21" height="1"  fill={ink} />
        {/* Tab right edge (from top of tab down to where body top begins) */}
        <rect x="22" y="5"  width="1"  height="5"  fill={ink} />
        {/* Body top (right of tab) */}
        <rect x="22" y="9"  width="36" height="1"  fill={ink} />
        {/* Body right */}
        <rect x="57" y="10" width="1"  height="40" fill={ink} />
        {/* Body bottom */}
        <rect x="2"  y="49" width="56" height="1"  fill={ink} />
        {/* Body + tab left (single continuous edge) */}
        <rect x="2"  y="5"  width="1"  height="45" fill={ink} />
      </svg>

      {/* Small app badge centered on the folder face */}
      {children && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ paddingTop: 8 }}
        >
          <div
            style={{
              background: "rgba(255, 250, 220, 0.55)",
              border: "1px solid rgba(26, 20, 16, 0.35)",
              padding: "3px 4px",
              display: "flex",
            }}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
