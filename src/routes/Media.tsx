import { Link } from "react-router-dom";
import "./Media.css";
import "./media/komponente/Table.css"
import "./media/komponente/Filter.css"
import "./media/komponente/Show.css"
import "./media/komponente/Edit.css"

export default function Media() {

    type Media = {
        name: string,
        to: string,
        src: string,
        alt: string
    }

    const linksArr: Media[] = [
        {
            name: "Filmi",
            to: "/media/filmi",
            src: "media_film.jpg",
            alt: "Slika ideje filma"
        },
        {
            name: "Igre",
            to: "/media/igre",
            src: "media_igre.png",
            alt: "Slika ideje igre"
        },
        {
            name: "Kanali",
            to: "/media/kanali",
            src: "media_kanali.png",
            alt: "Slika ideje kanala"
        },
        {
            name: "Knjige",
            to: "/media/knjige",
            src: "media_knjige.jpg",
            alt: "Slika ideje knjige"
        },
        {
            name: "Oddaje",
            to: "/media/oddaje",
            src: "media_oddaje.jpg",
            alt: "Slika ideje radijske oddaje"
        },
        {
            name: "Organizacije",
            to: "/media/organizacije",
            src: "media_organizacije.jpg",
            alt: "Slika ideje organizacije"
        },
        {
            name: "Revije",
            to: "/media/revije",
            src: "media_revije.jpg",
            alt: "Slika ideje revije"
        },
        {
            name: "Strani",
            to: "/media/strani",
            src: "media_strani.jpg",
            alt: "Slika ideje spletne strani"
        },
    ]

    const mediaLinki = linksArr.map(
        (el, index) => {
            return (
                <Link
                    className="toMediaBtn"
                    to={el.to}
                    key={`media${index}`}>
                    <img
                        className="mediaLinkImg"
                        src={el.src}
                        alt={el.alt}
                    />
                    <div className="mediaLinkTextBox">
                        <h3>{el.name}</h3>
                    </div>
                </Link>
            )
        }
    );

    return (
        <div id="mBox" className="container">
            <div id="mediaBox">
                {mediaLinki}
            </div>
        </div>
    )
}