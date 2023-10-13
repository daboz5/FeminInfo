import { useState, useEffect } from "react";
import { Film, Genre, Ratings } from "../../../type";
import ArrowUp from "../../../assets/ArrowUp";
import useFemStore from "../../../useFemStore";
import toast from "react-hot-toast";

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

    const { setFilmLib } = useFemStore();

    const [openedFilm, setOpenedFilm] = useState<Film | null>(null);
    const [editing, setEditing] = useState(false);
    const [pic, setPic] = useState(openedFilm?.img);
    const [filter, setFilter] = useState<JSX.Element | null>(null);
    const [libBackup, setLibBackup] = useState<Film[]>();

    useEffect(() => {
        setFilmLib(lib.sort(
            (a, b) => {
                const titleA = a.title.toUpperCase();
                const titleB = b.title.toUpperCase();
                if (titleA < titleB) {
                    return -1;
                }
                if (titleA > titleB) {
                    return 1;
                }
                return 0;
            }));
        setLibBackup(lib);
    }, []);

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

    const stringComplexFilter = (querry: string) => {
        if (!querry) { return toast.error(`Neveljaven vnos.`) }

        const checkRegex = /[^\w\sčžšćđ,]/
        const error = querry.search(checkRegex);
        if (error > -1) {
            return toast.error(`Neveljaven vnos.`);
        }

        const querryArr = querry.toUpperCase().split("");
        const filteredArr = querryArr.filter((el) => el !== ",");
        const noRepeats = filteredArr.filter(
            (el, index) => {
                return filteredArr.indexOf(el) === index;
            });

        const result = libBackup?.filter(
            (el) => {
                const match = el.title[0];
                for (let i = 0; i < noRepeats.length; i++) {
                    if (match === noRepeats[i]) {
                        return el;
                    }
                }
            }
        );
        result ? setFilmLib(result) : {}

    }

    const searchRegexCreator = (querry: string) => {
        const regArr: string[] = [];
        for (let i = 0; i < querry.length; i++) {
            const part1 = querry.slice(0, i);
            const part2 = querry.slice(i + 1, querry.length);
            const newRegex = part1 + "." + part2;
            regArr.unshift(newRegex.toUpperCase());
        }
        return regArr;
    }

    const searchRegexFilter = (regArr: string[]) => {
        const filterTotal: Film[] = [];
        for (let i = 0; i < regArr.length; i++) {
            const matches = libBackup?.filter(
                (film) => {
                    const title = film.title.toUpperCase();
                    const result = title.search(new RegExp(regArr[i]));
                    if (result >= 0) {
                        return film;
                    }
                }
            );
            const noRepeats = matches?.filter(
                (match) => {
                    const repeat = filterTotal.includes(match);
                    if (!repeat) {
                        return match;
                    }
                }
            )
            if (noRepeats) {
                noRepeats.forEach((el) => filterTotal.push(el));
            }
        }
        return filterTotal;
    }

    const stringSimpleFilter = (querry: string) => {
        console.log(querry)
        if (!querry) { return toast.error(`Neveljaven vnos.`) }

        const regArr = searchRegexCreator(querry);
        const result = searchRegexFilter(regArr);
        result ? setFilmLib(result) : {}
        return;
    }

    const switchFilter = (filter: string) => {
        let currentYear: number;

        switch (filter) {

            case "Naslov":
                setFilter(<>
                    <h4>{filter}</h4>
                    <div className="mediaFilter flex">
                        <button
                            className="upBtn"
                            onClick={() => setFilmLib(
                                lib.sort(
                                    (a, b) => {
                                        const titleA = a.title.toUpperCase();
                                        const titleB = b.title.toUpperCase();
                                        if (titleA < titleB) {
                                            return -1;
                                        }
                                        if (titleA > titleB) {
                                            return 1;
                                        }
                                        return 0;
                                    })
                            )}>
                            <ArrowUp />
                        </button>
                        <button
                            className="downBtn"
                            onClick={() => setFilmLib(
                                lib.sort(
                                    (a, b) => {
                                        const titleA = a.title.toUpperCase();
                                        const titleB = b.title.toUpperCase();
                                        if (titleA < titleB) {
                                            return 1;
                                        }
                                        if (titleA > titleB) {
                                            return -1;
                                        }
                                        return 0;
                                    })
                            )}>
                            <ArrowUp />
                        </button>
                    </div>
                    <div className="mediaFilter colFlex">
                        <p>Iskani nabor</p>
                        <input
                            id="filmTitleLetterFilter"
                            type="text"
                            placeholder="a,b,c / abc"
                            maxLength={10}>
                        </input>
                        <button
                            onClick={() => {
                                const el: HTMLInputElement | null = document.getElementById("filmTitleLetterFilter");
                                el ? stringComplexFilter(el.value) : {}
                            }}>
                            Potrdi
                        </button>
                    </div>
                    <div className="mediaFilter colFlex">
                        <p>Iskano zaporedje</p>
                        <input
                            id="filmTitleWordFilter"
                            type="text"
                            placeholder="Naslov"
                            maxLength={20}>
                        </input>
                        <button
                            onClick={() => {
                                const el: HTMLInputElement | null = document.getElementById("filmTitleWordFilter");
                                el ? stringSimpleFilter(el.value) : {}
                            }}>
                            Potrdi
                        </button>
                    </div>
                </>)
                break;

            case "Leto":
                currentYear = new Date().getFullYear();
                setFilter(<>
                    <h4>{filter}</h4>
                    <div className="mediaFilter flex">
                        <button className="upBtn"><ArrowUp /></button>
                        <button className="downBtn"><ArrowUp /></button>
                    </div>
                    <div className="mediaFilter colFlex">
                        <p>Iskani nabor</p>
                        <input type="number" placeholder="1888"></input>
                        <input type="number" placeholder={`${currentYear}`}></input>
                        <button>Potrdi</button>
                    </div>
                </>)
                break;

            case "Fem tip":
                setFilter(<>
                    <h4>{filter}</h4>
                    <div className="mediaFilter flex">
                        <img
                            className="filterType"
                            src="type-society.svg"
                            alt="družbeni"
                        />
                        <img
                            className="filterType"
                            src="type-woke.svg"
                            alt="woke"
                        />
                        <img
                            className="filterType"
                            src="type-liberal.svg"
                            alt="liberalni"
                        />
                    </div>
                </>)
                break;

            case "Ocena":
                setFilter(<>
                    <h4>{filter}</h4>
                    <div className="mediaFilter flex">
                        <button className="upBtn"><ArrowUp /></button>
                        <button className="downBtn"><ArrowUp /></button>
                    </div>
                    <div className="mediaFilter colFlex">
                        <p>Iskani nabor</p>
                        <input type="number" placeholder="od ocene"></input>
                        <input type="number" placeholder="do ocene"></input>
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