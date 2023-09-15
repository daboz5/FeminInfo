import { Link } from "react-router-dom";
import useBasics from "../utils/useBasics";
import "./ONas.css";

export default function ONas() {

    const { hoverStart, hoverEnd } = useBasics();

    const cv =
        <div className="cvBox">
            <img
                className="cvImg"
                src="mefile.gif"
                alt="Ikona avtorice"
            />
            <div className="cvInfo">
                <p>Ime: </p>
                <p><b>Gabriela Janež</b></p>
                <p>Status: </p>
                <p><b>Admin</b></p>
            </div>
        </div>

    return (
        <div id="oNas">
            <h2>Sodelujoči</h2>
            <div id="cvsBox">
                {cv}
            </div>
            <br />
            <div
                className="oNasLinkBox">
                <div
                    id={"toCr"}
                    className="hoverMarker"
                    style={{ opacity: "0" }}>
                </div>
                <Link
                    className="oNasContent"
                    to={"credits"}
                    onMouseEnter={() => hoverStart("toCr")}
                    onMouseLeave={() => hoverEnd("toCr")}>
                    Nesodelujoči
                </Link>
            </div>
        </div>
    )
}