import CSLogo from "../../../Assets/CSlogo.png";
import CSSeal from "../../../Assets/CSSeal.png";

export default function PassportCover({ ownerName, achievementCount, onOpen }) {
  return (
    <button className="skill-passport-cover" type="button" onClick={onOpen} aria-label="Open your CareerSense Skill Passport">
      <span className="passport-cover-spine" aria-hidden="true" />
      <span className="passport-cover-frame" aria-hidden="true" />
      <span className="passport-cover-brand">
        <span className="passport-cover-mark"><img src={CSLogo} alt="" /></span>
        <span className="passport-cover-company">Career<span>Sense</span></span>
      </span>
      <span className="passport-cover-divider" aria-hidden="true"><i />✦<i /></span>
      <span className="passport-cover-title">Skill<br />Passport</span>
      <span className="passport-cover-seal" aria-hidden="true">
        <span className="passport-cover-stars">★ ★ ★</span>
        <img src={CSSeal} alt="" />
      </span>
      <span className="passport-cover-rosette" aria-hidden="true">✦</span>
      <span className="passport-cover-owner">Issued to {ownerName}</span>
      <span className="passport-cover-meta">{achievementCount} journey stamps · Tap to open</span>
    </button>
  );
}
