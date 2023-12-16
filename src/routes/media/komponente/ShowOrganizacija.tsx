import { Oddaja } from "../../../type";
import useOddaja from "./useOddaja";

export default function ShowOddaja(
    { oddaja, setOddaja, setEditor }:
        {
            oddaja: Oddaja | null,
            setOddaja(newState: null): void,
            setEditor(newState: boolean): void
        }
) {

    const { setGrid } = useOddaja();

    return (oddaja ?
        <div
            className={`gridBox grid${setGrid(oddaja)} container`}>
            <div className="titleBox">
                <h3
                    className="title">
                    {oddaja.title}
                </h3>
                <div
                    className="fInfo">
                    <p>
                        {oddaja.firstAir === oddaja.lastAir ?
                            oddaja.firstAir :
                            `${oddaja.firstAir} - ${oddaja.lastAir ?
                                oddaja.lastAir : ""}`}
                    </p>
                    {oddaja.length.minmax[0] &&
                        <p
                            className="trajanje">
                            {oddaja.length.minmax[0] ?
                                oddaja.length.minmax[1] ?
                                    `Video med ${oddaja.length.minmax[0] + " in " + oddaja.length.minmax[1]} min` :
                                    `Video okoli ${oddaja.length.minmax[0]} min` :
                                ""
                            }
                        </p>
                    }
                    {oddaja.length.episodes &&
                        oddaja.length.episodes > 1 &&
                        <p
                            className="epizode">
                            {`${oddaja.length.episodes}${!oddaja.lastAir ? " +" : ""} videov`}
                        </p>
                    }
                </div>
            </div>
            <div className="image flex">
                <img
                    src={oddaja.img ?
                        oddaja.img :
                        "femininfoEyeIcon.png"
                    }
                    style={oddaja.img ?
                        {} :
                        {
                            filter: "grayscale(100%)",
                            maxWidth: "90%"
                        }
                    }
                    alt={oddaja.img ?
                        `Slika ${oddaja.title}` :
                        "FeminInfo ikona"
                    }
                />
            </div>
            {
                oddaja.femType || oddaja.genre.length > 0 ?
                    <div className="genreBox colFlex">
                        {oddaja.femType ?
                            oddaja.femType === "lib" ?
                                <img className="femType" src={"type-liberal.svg"} alt="liberalni feminizem" /> :
                                oddaja.femType === "soc" ?
                                    <img className="femType" src={"type-society.svg"} alt="družbeni feminizem" /> :
                                    <img className="femType" src={"type-woke.svg"} alt="woke feminizem" /> :
                            <></>
                        }
                        {oddaja.genre &&
                            <div className="data genreType">
                                {oddaja.genre.sort().map(el => {
                                    return <p key={"genre" + el}>{el}</p>;
                                })}
                            </div>
                        }
                    </div> :
                    <></>
            }

            {
                oddaja.platforms.length > 0 || oddaja.hosts.length > 0 || oddaja.others.length > 0 ?
                    <div className="peopleBox">
                        {oddaja.platforms.length > 0 &&
                            <div className="platformsBox">
                                <h3 className="dataType">Platforma</h3>
                                <p className="data">
                                    {oddaja.platforms.sort().map(
                                        (el, index) => {
                                            if (index + 1 === oddaja.platforms?.length) {
                                                return el + "."
                                            } else {
                                                return el + ", "
                                            }
                                        }
                                    )}
                                </p>
                            </div>
                        }
                        {oddaja.hosts.length > 0 &&
                            <div className="hostsBox">
                                <h3 className="dataType">Vodja</h3>
                                <p className="data">
                                    {oddaja.hosts.sort().map(
                                        (el, index) => {
                                            if (index + 1 === oddaja.hosts?.length) {
                                                return el + "."
                                            } else {
                                                return el + ", "
                                            }
                                        }
                                    )}
                                </p>
                            </div>
                        }
                        {oddaja.guests.length > 0 &&
                            <div className="actorsBox">
                                <h3 className="dataType">Gostje</h3>
                                <p className="data">
                                    {oddaja.guests.sort().map(
                                        (el, index) => {
                                            if (index + 1 === oddaja.guests?.length) {
                                                return el + "."
                                            } else {
                                                return el + ", "
                                            }
                                        }
                                    )}
                                </p>
                            </div>
                        }
                        {oddaja.others.length > 0 &&
                            <div className="staffBox">
                                <h3 className="dataType">Ostali</h3>
                                <p className="data">
                                    {oddaja.others.sort().map(
                                        (el, index) => {
                                            if (index + 1 === oddaja.others?.length) {
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
                oddaja.explanation &&
                <div className="explanationBox">
                    <h3 className="dataType">Pojasnilo</h3>
                    <p className="data">{oddaja.explanation}</p>
                </div>
            }

            {
                oddaja.description &&
                <div className="descriptionBox">
                    <h3 className="dataType">Opis</h3>
                    <p className="data">{oddaja.description}</p>
                </div>
            }

            {
                oddaja.ratings &&
                <div className="pollBox">
                    <span className="rating">
                        <p className="defMouse">{oddaja.ratings.hates}</p>
                        <p className="rIcon">💀</p>
                    </span>
                    <span className="rating">
                        <p className="defMouse">{oddaja.ratings.dislikes}</p>
                        <p className="rIcon">👎</p>
                    </span>
                    <span className="rating">
                        <p className="defMouse">{oddaja.ratings.oks}</p>
                        <p className="rIcon">⭐</p>
                    </span>
                    <span className="rating">
                        <p className="defMouse">{oddaja.ratings.likes}</p>
                        <p className="rIcon">👍</p>
                    </span>
                    <span className="rating">
                        <p className="defMouse">{oddaja.ratings.loves}</p>
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
                    onClick={() => setOddaja(null)}>
                    Zapri
                </button>
            </div>
        </div > :
        <></>
    )
}