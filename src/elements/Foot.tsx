import useFemStore from "../useFemStore";
import useFoot from "../utils/useFoot";
import ArrowUp from "../assets/ArrowUp";
import "./Foot.css";

export default function Foot() {

    const { footOpened, switchFootOpened } = useFemStore();
    const { content } = useFoot();

    return (
        <div
            id="footer"
            className="container"
            style={{ height: footOpened ? "145px" : "50px" }}>
            <div
                id="footerContent"
                style={{
                    opacity: footOpened ? 1 : 0,
                    transitionDelay: footOpened ? "0.2s" : "0s"
                }}>
                {content}
            </div>
            <p id="copyRightBox">© <b>2023</b> FeminInfo</p>
            <button
                id="expFootBtn"
                onClick={() => switchFootOpened()}>
                <ArrowUp />
            </button>
        </div>
    )
}