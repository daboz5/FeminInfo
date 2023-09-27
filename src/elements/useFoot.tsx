import { Link } from "react-router-dom";
import useBasics from "../utils/useBasics";

export default function useFoot() {

    type fCon = {
        id: string;
        link: string;
    }

    const { hoverStart, hoverEnd } = useBasics();

    const footContents: fCon[] = [
        {
            id: "Politika zasebnosti",
            link: "izjava-o-zasebnosti"
        },
        {
            id: "Kontaktne informacije",
            link: "kontakt"
        },
        {
            id: "Vpis",
            link: "sign-in"
        }
    ]

    const content = footContents.map(
        (con, index) => {
            const num = index + 1;
            return (
                <div
                    className="footLinkBox"
                    key={"fCon" + (num)}>
                    <div
                        id={"foot" + (num)}
                        className="hoverMarker"
                        style={{ opacity: "0" }}>
                    </div>
                    <Link
                        className="footContent"
                        to={con.link}
                        onMouseEnter={() => hoverStart("foot" + num)}
                        onMouseLeave={() => hoverEnd("foot" + num)}>
                        {con.id}
                    </Link>
                </div>
            )
        })

    return { content }
}