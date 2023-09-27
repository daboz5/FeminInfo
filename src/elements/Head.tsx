import useHead from "./useHead";
import "./Head.css";

export default function Head() {

    const { navBtns } = useHead();

    return (
        <div
            id="panel"
            className="container">
            <img
                id="femLogo"
                src="femininfoEyeIcon.png"
                alt="Femininfo logo"
            />
            <h1>FeminInfo</h1>
            <div id="nav">
                {navBtns}
            </div>
        </div>
    )
}