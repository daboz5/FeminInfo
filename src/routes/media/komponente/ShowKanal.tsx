import { Kanal } from "../../../type";
import useKanal from "./useKanal";

export default function ShowKanal(
    { kanal, setKanal, setEditor }:
        {
            kanal: Kanal | null,
            setKanal(newState: null): void,
            setEditor(newState: boolean): void
        }
) {

    const { setGrid } = useKanal();

    return (kanal ?
        <div
            className={`gridBox grid${setGrid(kanal)} container`}>
            <div className="titleBox">
                <h3
                    className="title">
                    {kanal.title}
                </h3>
                <div
                    className="fInfo">
                    <p>
                        {kanal.firstAir === kanal.lastAir ?
                            kanal.firstAir :
                            `${kanal.firstAir} - ${kanal.lastAir ?
                                kanal.lastAir : ""}`}
                    </p>
                    {kanal.length.minmax[0] &&
                        <p
                            className="trajanje">
                            {kanal.length.minmax[0] ?
                                kanal.length.minmax[1] ?
                                    `Video med ${kanal.length.minmax[0] + " in " + kanal.length.minmax[1]} min` :
                                    `Video okoli ${kanal.length.minmax[0]} min` :
                                ""
                            }
                        </p>
                    }
                    {kanal.length.episodes &&
                        kanal.length.episodes > 1 &&
                        <p
                            className="epizode">
                            {`${kanal.length.episodes}${!kanal.lastAir ? " +" : ""} videov`}
                        </p>
                    }
                </div>
            </div>
            <div className="image flex">
                <img
                    src={kanal.img ?
                        kanal.img :
                        "femininfoEyeIcon.png"
                    }
                    style={kanal.img ?
                        {} :
                        {
                            filter: "grayscale(100%)",
                            maxWidth: "90%"
                        }
                    }
                    alt={kanal.img ?
                        `Slika ${kanal.title}` :
                        "FeminInfo ikona"
                    }
                />
            </div>
            {
                kanal.femType || kanal.genre.length > 0 ?
                    <div className="genreBox colFlex">
                        {kanal.femType ?
                            kanal.femType === "lib" ?
                                <img className="femType" src={"type-liberal.svg"} alt="liberalni feminizem" /> :
                                kanal.femType === "soc" ?
                                    <img className="femType" src={"type-society.svg"} alt="družbeni feminizem" /> :
                                    <img className="femType" src={"type-woke.svg"} alt="woke feminizem" /> :
                            <></>
                        }
                        {kanal.genre &&
                            <div className="data genreType">
                                {kanal.genre.sort().map(el => {
                                    return <p key={"genre" + el}>{el}</p>;
                                })}
                            </div>
                        }
                    </div> :
                    <></>
            }

            {
                kanal.platforms.length > 0 || kanal.hosts.length > 0 || kanal.others.length > 0 ?
                    <div className="peopleBox">
                        {kanal.platforms.length > 0 &&
                            <div className="directorsBox">
                                <h3 className="dataType">Platforma</h3>
                                <p className="data">
                                    {kanal.platforms.sort().map(
                                        (el, index) => {
                                            if (index + 1 === kanal.platforms?.length) {
                                                return el + "."
                                            } else {
                                                return el + ", "
                                            }
                                        }
                                    )}
                                </p>
                            </div>
                        }
                        {kanal.hosts.length > 0 &&
                            <div className="actorsBox">
                                <h3 className="dataType">Vodja</h3>
                                <p className="data">
                                    {kanal.hosts.sort().map(
                                        (el, index) => {
                                            if (index + 1 === kanal.hosts?.length) {
                                                return el + "."
                                            } else {
                                                return el + ", "
                                            }
                                        }
                                    )}
                                </p>
                            </div>
                        }
                        {kanal.guests.length > 0 &&
                            <div className="actorsBox">
                                <h3 className="dataType">Gostje</h3>
                                <p className="data">
                                    {kanal.guests.sort().map(
                                        (el, index) => {
                                            if (index + 1 === kanal.guests?.length) {
                                                return el + "."
                                            } else {
                                                return el + ", "
                                            }
                                        }
                                    )}
                                </p>
                            </div>
                        }
                        {kanal.others.length > 0 &&
                            <div className="staffBox">
                                <h3 className="dataType">Ostali</h3>
                                <p className="data">
                                    {kanal.others.sort().map(
                                        (el, index) => {
                                            if (index + 1 === kanal.others?.length) {
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
                kanal.explanation &&
                <div className="explanationBox">
                    <h3 className="dataType">Pojasnilo</h3>
                    <p className="data">{kanal.explanation}</p>
                </div>
            }

            {
                kanal.description &&
                <div className="descriptionBox">
                    <h3 className="dataType">Opis</h3>
                    <p className="data">{kanal.description}</p>
                </div>
            }

            {
                kanal.ratings &&
                <div className="pollBox">
                    <span className="rating">
                        <p className="defMouse">{kanal.ratings.hates}</p>
                        <p className="rIcon">💀</p>
                    </span>
                    <span className="rating">
                        <p className="defMouse">{kanal.ratings.dislikes}</p>
                        <p className="rIcon">👎</p>
                    </span>
                    <span className="rating">
                        <p className="defMouse">{kanal.ratings.oks}</p>
                        <p className="rIcon">⭐</p>
                    </span>
                    <span className="rating">
                        <p className="defMouse">{kanal.ratings.likes}</p>
                        <p className="rIcon">👍</p>
                    </span>
                    <span className="rating">
                        <p className="defMouse">{kanal.ratings.loves}</p>
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
                    onClick={() => setKanal(null)}>
                    Zapri
                </button>
            </div>
        </div > :
        <></>
    )
}