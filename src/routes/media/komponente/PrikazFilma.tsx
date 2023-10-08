import { Film } from "../../../type";

export default function PrikazFilma(
    { film, closeFilm, openEditor }:
        {
            film: Film | null,
            closeFilm(newState: null): void,
            openEditor(newState: boolean): void
        }
) {

    return (film ?
        <div
            className="filmBox container"
            style={(film.genre &&
                film.director &&
                film.actors &&
                film.femType) ?
                {} :
                {
                    gridTemplateAreas:
                        `"title title"
                        "image image"
                        "people people"
                        "explain explain"
                        "describe describe"
                        "result result"
                        "options options"`
                }
            }>

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
                    {film.length?.average &&
                        <p
                            className="trajanje">
                            {`${film.length.average > 59 ?
                                Math.floor(film.length.average / 60) + " h" :
                                ""} ${film.length.average > 59 ?
                                    film.length.average % 60 + " min" :
                                    film.length.average + " min"}`
                            }
                            {film.length.episodes > 1 ?
                                "/ep" :
                                ""}
                        </p>
                    }
                    {film.length &&
                        film.length.episodes > 1 &&
                        <p
                            className="epizode">
                            {`${film.length.episodes} epizod`}
                        </p>
                    }
                </div>
            </div>
            <div className="image">
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
            {film.femType || film.genre ?
                <div className="typeBox">
                    {film.femType &&
                        film.femType === "lib" ?
                        <img className="femType" src={"type-liberal.svg"} alt="liberalni feminizem" /> :
                        film.femType === "soc" ?
                            <img className="femType" src={"type-society.svg"} alt="družbeni feminizem" /> :
                            <img className="femType" src={"type-woke.svg"} alt="woke feminizem" />
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

            {film.director || film.actors || film.others ?
                <div className="peopleBox">
                    {film.director &&
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
                    {film.actors &&
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
                    {film.others &&
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

            {film.explanation &&
                <div className="explanationBox">
                    <h3 className="dataType">Pojasnilo</h3>
                    <p className="data">{film.explanation}</p>
                </div>
            }

            {film.description &&
                <div className="descriptionBox">
                    <h3 className="dataType">Opis</h3>
                    <p className="data">{film.description}</p>
                </div>
            }

            {film.ratings &&
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

            <div className="optionsBox">
                <button
                    className="actMouse"
                    onClick={() => openEditor(true)}>
                    Uredi
                </button>
                <button
                    className="actMouse"
                    onClick={() => closeFilm(null)}>
                    Zapri
                </button>
            </div>
        </div> :
        <></>
    )
}