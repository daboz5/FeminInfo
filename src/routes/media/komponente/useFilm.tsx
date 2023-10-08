import { useState } from "react";
import { Film, Genre, Ratings } from "../../../type";

export default function useFilm() {

    const lib: Film[] = [
        {
            title: "Revolutionary Girl Uthena",
            year: {
                start: 1997,
                unfinished: false
            },
            length: {
                average: 23,
                episodes: 39
            },
            description: "Childhood idealism, illusions, ambition, adulthood, sexuality, abuse, incest and identity are all prominent themes which are explored in what is essentially a highly metaphorical and symbolic coming-of-age story. Loss of innocence, both sexual and otherwise, is treated as a life changing event. Fairy tale archetypes such as the noble prince and the damsel in distress, as well as standard tropes of the shoujo and magical girl genre are incorporated, subverted, inverted, averted and deconstructed.",
            ratings: {
                loves: 0,
                likes: 0,
                oks: 0,
                dislikes: 0,
                hates: 0
            }
        },
        {
            title: "Portret of a lady on fire",
            year: {
                start: 2019,
                unfinished: false
            },
            description: "On an isolated island in Brittany at the end of the eighteenth century, a female painter is obliged to paint a wedding portrait of a young woman.",
            ratings: {
                loves: 0,
                likes: 0,
                oks: 0,
                dislikes: 0,
                hates: 0
            }
        },
        {
            title: "Volver",
            year: {
                start: 2006,
                unfinished: false
            },
            length: {
                average: 121,
                episodes: 1
            },
            img: "volver.jpg",
            director: ["Pedro Almodóvar"],
            actors: ["Penélope Cruz", "Carmen Maura", "Lola Dueñas", "Blanca Portillo", "Yohana Cobo", "Chus Lampreave", "Antonio de la Torre"],
            others: ["Example 1", "Example 2", "Example 3"],
            genre: ["Komedija", "Drama"],
            femType: "lib",
            explanation: "Razni ženski liki se znajdejo v nenadejanih zahtevnih situacijah, iz katerih se izvlečejo s pretkanostjo, oportunizmom ali nujo po preživetju.",
            description: "After her death, a mother returns to her home town in order to fix the situations she couldn't resolve during her life.",
            ratings: {
                loves: 1,
                likes: 0,
                oks: 0,
                dislikes: 0,
                hates: 0
            }
        }
    ]

    const filmTypes: Genre[] = [
        "Akcija",
        "Avantura",
        "Drama",
        "Dokumentarec",
        "Fantazija",
        "Grozljivka",
        "Isekai",
        "Komedija",
        "Kriminalka",
        "Misterija",
        "Romantika",
        "Satira",
        "Triler",
        "Zgodovina",
        "Znanstvena fantastika"
    ]

    const [openedFilm, setOpenedFilm] = useState<Film | null>(null);
    const [editing, setEditing] = useState(false);
    const [pic, setPic] = useState(openedFilm?.img);
    const [filter, setFilter] = useState<JSX.Element | null>(null);

    const calcFame = (ratings: Ratings) => {
        const fame: number = (
            (ratings.oks * 1) +
            (ratings.likes * 2) +
            (ratings.loves * 3) -
            (ratings.dislikes * 2) -
            (ratings.hates * 3)
        );
        return fame;
    }

    const switchFilter = (filter: string) => {
        let currentYear: number;

        switch (filter) {
            case "Naslov":
                setFilter(<>
                    <h4>{filter}</h4>
                    <div className="mediaFilter">
                        <button>A-Z</button>
                        <button>Z-A</button>
                    </div>
                    <div className="mediaFilter">
                        <p>Iskani nabor</p>
                        <input type="text"></input>
                        <button>Potrdi</button>
                    </div>
                </>)
                break;
            case "Leto":
                currentYear = new Date().getFullYear()
                setFilter(<>
                    <h4>{filter}</h4>
                    <div className="mediaFilter">
                        <button>1888-{currentYear}</button>
                        <button>{currentYear}-1888</button>
                    </div>
                    <div className="mediaFilter">
                        <p>Iskani nabor</p>
                        <input type="number"></input>
                        <input type="number"></input>
                        <button>Potrdi</button>
                    </div>
                </>)
                break;
            case "Fem tip":
                setFilter(<>
                    <h4>{filter}</h4>
                    <div className="editFemTypeBox">
                        <label
                            htmlFor="filterSoc">
                            <img
                                className="editFemTypeImg"
                                src="type-society.svg"
                                alt="družbeni"
                            />
                            <input
                                type="checkbox"
                                id="filterSoc"
                                className="editFemTypeCheck"
                                value="soc"
                            />
                        </label>
                        <label
                            htmlFor="filterWoke">
                            <img
                                className="editFemTypeImg"
                                src="type-woke.svg"
                                alt="woke"
                            />
                            <input
                                type="checkbox"
                                id="filterWoke"
                                className="editFemTypeCheck"
                                value="woke"
                            />
                        </label>
                        <label
                            htmlFor="filterLib">
                            <img
                                className="editFemTypeImg"
                                src="type-liberal.svg"
                                alt="liberalni"
                            />
                            <input
                                type="checkbox"
                                id="filterLib"
                                className="editFemTypeCheck"
                                value="lib"
                            />
                        </label>
                    </div>
                </>)
                break;
            case "Ocena":
                setFilter(<>
                    <h4>{filter}</h4>
                    <div className="mediaFilter">
                        <button>1-100</button>
                        <button>100-1</button>
                    </div>
                    <div className="mediaFilter">
                        <p>Iskani nabor</p>
                        <input type="number"></input>
                        <input type="number"></input>
                        <button>Potrdi</button>
                    </div>
                </>)
                break;
            case "":
                setFilter(null);
                break;
            default:
                setFilter(<p>Neznani filter</p>)
        }
    }

    return {
        lib,
        editing,
        filter,
        openedFilm,
        filmTypes,
        pic,
        setPic,
        calcFame,
        setEditing,
        switchFilter,
        setOpenedFilm,
    }
}