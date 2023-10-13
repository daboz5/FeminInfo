import useFemStore from "../useFemStore";
import useFoot from "./useFoot";
import ArrowUp from "../assets/ArrowUp";
import "./Foot.css";

export default function Foot() {

    const { pageSize, footOpened, switchFootOpened } = useFemStore();
    const { content } = useFoot();

    return (
        <div
            id="footer"
            style={{
                height: footOpened ?
                    pageSize > 639 ?
                        "170px" :
                        "145px" :
                    "50px",
            }}>
            <div
                id="footerContent"
                className="container colFlex"
                style={{
                    opacity: footOpened ? 1 : 0,
                    transitionDelay: footOpened ? "0.2s" : "0s"
                }}>
                {content}
            </div>
            <p id="copyRightBox">© <b>2023</b> FeminInfo</p>
            <button
                id="expFootBtn"
                className="actMouse flex"
                onClick={() => switchFootOpened()}>
                <ArrowUp rotate={footOpened} />
            </button>
        </div>
    )
}