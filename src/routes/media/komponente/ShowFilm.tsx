import { Film } from "../../../type";

export default function ShowFilm(
    { film, setFilm, setEditor }:
        {
            film: Film | null,
            setFilm(newState: null): void,
            setEditor(newState: boolean): void
        }
) {

    const setGrid = () => {
        if (film) {
            let type = false;
            let creators = false;
            let explain = false;
            if (film.genre.length > 0 || film.femType) { type = true; }
            if (film.director.length > 0 || film.actors.length > 0 || film.others.length > 0) { creators = true; }
            if (film.explanation) { explain = true; }

            if (type && creators && explain) { return 0 }
            if (!type && creators && explain) { return 1 }
            if (type && !creators && explain) { return 2 }
            if (type && creators && !explain) { return 3 }
            if (!type && !creators && explain) { return 4 }
            if (type && !creators && !explain) { return 5 }
            if (!type && creators && !explain) { return 6 }
            if (!type && !creators && !explain) { return 7 }
        }
        return 0
    }

    return (film ?
        <div
            className={`filmBox filmGrid${setGrid()} container`}>
            <div className="titleBox">
                <h3
                    className="title">
                    {film.title}
                </h3>
                <div
                    className="fInfo">
                    <p>
                        {
                            film.year?.start +
                            `${film?.year?.unfinished ?
                                "-" :
                                film.year?.finish ?
                                    `-${film.year?.finish}` :
                                    ""}`
                        }
                    </p>
                    {film.length.average &&
                        <p
                            className="trajanje">
                            {`${film.length.average > 59 ?
                                Math.floor(film.length.average / 60) + " h" :
                                ""} ${film.length.average > 59 ?
                                    film.length.average % 60 + " min" :
                                    film.length.average + " min"}`
                            }
                            {film.length.episodes ?
                                film.length.episodes > 1 ?
                                    "/ep" :
                                    "" :
                                ""
                            }
                        </p>
                    }
                    {film.length.episodes &&
                        film.length.episodes > 1 &&
                        <p
                            className="epizode">
                            {`${film.length.episodes} epizod`}
                        </p>
                    }
                </div>
            </div>
            <div className="image flex">
                <img
                    src={film.img ?
                        film.img :
                        "femininfoEyeIcon.png"
                    }
                    style={film.img ?
                        {} :
                        {
                            filter: "grayscale(100%)",
                            maxWidth: "90%"
                        }
                    }
                    alt={film.img ?
                        `Slika ${film.title}` :
                        "FeminInfo ikona"
                    }
                />
            </div>
            {
                film.femType || film.genre.length > 0 ?
                    <div className="genreBox colFlex">
                        {film.femType ?
                            film.femType === "lib" ?
                                <img className="femType" src={"type-liberal.svg"} alt="liberalni feminizem" /> :
                                film.femType === "soc" ?
                                    <img className="femType" src={"type-society.svg"} alt="družbeni feminizem" /> :
                                    <img className="femType" src={"type-woke.svg"} alt="woke feminizem" /> :
                            <></>
                        }
                        {film.genre &&
                            <div className="data genreType">
                                {film.genre.sort().map(el => {
                                    return <p key={"genre" + el}>{el}</p>;
                                })}
                            </div>
                        }
                    </div> :
                    <></>
            }

            {
                film.director.length > 0 || film.actors.length > 0 || film.others.length > 0 ?
                    <div className="peopleBox">
                        {film.director.length > 0 &&
                            <div className="directorsBox">
                                <h3 className="dataType">Direkcija</h3>
                                <p className="data">
                                    {film.director.sort().map(
                                        (el, index) => {
                                            if (index + 1 === film.director?.length) {
                                                return el + "."
                                            } else {
                                                return el + ", "
                                            }
                                        }
                                    )}
                                </p>
                            </div>
                        }
                        {film.actors.length > 0 &&
                            <div className="actorsBox">
                                <h3 className="dataType">Igralci</h3>
                                <p className="data">
                                    {film.actors.sort().map(
                                        (el, index) => {
                                            if (index + 1 === film.actors?.length) {
                                                return el + "."
                                            } else {
                                                return el + ", "
                                            }
                                        }
                                    )}
                                </p>
                            </div>
                        }
                        {film.others.length > 0 &&
                            <div className="staffBox">
                                <h3 className="dataType">Ostali</h3>
                                <p className="data">
                                    {film.others.sort().map(
                                        (el, index) => {
                                            if (index + 1 === film.others?.length) {
                                                return el + "."
                                            } else {
                                                return el + ", "
                                            }
                                        }
                                    )}
                                </p>
                            </div>
                        }
                    </div> :
                    <></>
            }

            {
                film.explanation &&
                <div className="explanationBox">
                    <h3 className="dataType">Pojasnilo</h3>
                    <p className="data">{film.explanation}</p>
                </div>
            }

            {
                film.description &&
                <div className="descriptionBox">
                    <h3 className="dataType">Opis</h3>
                    <p className="data">{film.description}</p>
                </div>
            }

            {
                film.ratings &&
                <div className="pollBox">
                    <span className="rating">
                        <p className="defMouse">{film.ratings.hates}</p>
                        <p className="rIcon">💀</p>
                    </span>
                    <span className="rating">
                        <p className="defMouse">{film.ratings.dislikes}</p>
                        <p className="rIcon">👎</p>
                    </span>
                    <span className="rating">
                        <p className="defMouse">{film.ratings.oks}</p>
                        <p className="rIcon">⭐</p>
                    </span>
                    <span className="rating">
                        <p className="defMouse">{film.ratings.likes}</p>
                        <p className="rIcon">👍</p>
                    </span>
                    <span className="rating">
                        <p className="defMouse">{film.ratings.loves}</p>
                        <p className="rIcon">💜</p>
                    </span>
                </div>
            }

            <div className="optionsBox colFlex">
                <button
                    className="actMouse"
                    onClick={() => setEditor(true)}>
                    Uredi
                </button>
                <button
                    className="actMouse"
                    onClick={() => setFilm(null)}>
                    Zapri
                </button>
            </div>
        </div > :
        <></>
    )
}