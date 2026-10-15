import "./MediaTile.css";

/*
  Shared preview tile for project and blog cards: one consistent backdrop (soft tone glow
  + faint dot grid) with a single centred badge, so every card is branded the same way.
*/
export const MediaTile = ({ tone, label, className = "", children }) => (
  <div className={`media-tile ${className}`} style={{ "--tile-tone": tone }} aria-hidden="true">
    <span className="media-tile-glow" />
    <span className="media-tile-dots" />
    {label && <span className="media-tile-label">{label}</span>}
    <div className="media-tile-badge">{children}</div>
  </div>
);
