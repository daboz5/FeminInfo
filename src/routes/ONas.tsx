import { Link } from "react-router-dom";
import "./ONas.css";
import useBasics from "../utils/useBasics";

export default function ONas() {
  const { underHoverEl } = useBasics();

  const cv = (
    <div className="cvBox flex">
      <img className="cvImg" src="mefile.gif" alt="Ikona avtorice" />
      <div className="cvInfoBox colFlex">
        <div>
          <p>Ime</p>
          <p>
            <b>Gabriela Janež</b>
          </p>
        </div>
        <div>
          <p>Status</p>
          <p>
            <b>Admin</b>
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div id="oNas" className="container">
      <h2>Sodelujoči</h2>
      <div id="cvsBox">{cv}</div>
      <br />
      <div id="oNasLinkBox" className="flex">
        {underHoverEl(
          "oNasLink",
          <Link className="flex colFlex" to={"credits"}>
            Nesodelujoči
          </Link>
        )}
      </div>
    </div>
  );
}
