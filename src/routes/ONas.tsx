import { Link } from "react-router-dom";
import useBasics from "../utils/useBasics";
import "./ONas.css";

export default function ONas() {

    const { hoverStart, hoverEnd } = useBasics();

    const cv =
        <div className="cvBox flex">
            <img
                className="cvImg"
                src="mefile.gif"
                alt="Ikona avtorice"
            />
            <div className="cvInfoBox colFlex">
                <div>
                    <p>Ime</p>
                    <p><b>Gabriela Janež</b></p>
                </div>
                <div>
                    <p>Status</p>
                    <p><b>Admin</b></p>
                </div>
            </div>
        </div>

    return (
        <div id="oNas" className="container">
            <h2>Sodelujoči</h2>
            <div id="cvsBox">
                {cv}
            </div>
            <br />
            <div
                id="oNasLink" className="colFlex">
                <div
                    id={"toCr"}
                    className="hoverMarker"
                    style={{ opacity: "0" }}>
                </div>
                <Link
                    to={"credits"}
                    onMouseEnter={() => hoverStart("toCr")}
                    onMouseLeave={() => hoverEnd("toCr")}>
                    Nesodelujoči
                </Link>
            </div>
        </div>
    )
}