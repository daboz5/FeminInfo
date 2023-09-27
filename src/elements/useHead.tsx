import { Link } from "react-router-dom";
import { useState } from "react";

export default function useHead() {

    type Radio = 1 | 2 | 3;

    type Btn = {
        id: Radio;
        name: string;
        link: string;
    };

    const [radio, setRadio] = useState<Radio>(
        window.location.pathname.includes("/o-nas") ? 3 :
            window.location.pathname.includes("/media") ? 2 : 1
    );

    const btnArr: Btn[] = [
        {
            id: 1,
            name: "Predstavitev",
            link: "/"
        },
        {
            id: 2,
            name: "Mediji",
            link: "/media"
        },
        {
            id: 3,
            name: "O nas",
            link: "/o-nas"
        }
    ]

    const navBtns = btnArr.map(
        (btn, index) => {
            const active =
                radio === btn.id ?
                    " navBtnActive" :
                    " navBtnUnactive";
            const navClass = "navBtn" + active;
            return (
                <Link
                    key={"nav" + index}
                    className={navClass}
                    to={btn.link}
                    onClick={() => setRadio(btn.id)}>
                    {btn.name}
                </Link>
            )
        }
    );

    return { navBtns }
}