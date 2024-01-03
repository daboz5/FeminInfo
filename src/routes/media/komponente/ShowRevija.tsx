import { Revija } from "../../../type";
import useRevija from "./useRevija";

export default function ShowRevija(
    { revija, setRevija, setEditor }:
        {
            revija: Revija | null,
            setRevija(newState: null): void,
            setEditor(newState: boolean): void
        }
) {

    const { setGrid } = useRevija();

    return (revija ?
        <div
            className={`gridBox grid${setGrid(revija)} container`}>
            <div className="titleBox">
                <h3
                    className="title">
                    {revija.title}
                </h3>
                <div
                    className="fInfo">
                    <p>
                        {revija.start === revija.start ?
                            revija.end :
                            `${revija.end} - ${revija.end ?
                                revija.end : ""}`}
                    </p>
                    <p
                        className="izhajanje">
                        {revija.frequency.unit ?
                            `Izhaja ${revija.frequency.interval}x na ${revija.frequency.unit}.` :
                            `Izhajanje ni zabeleženo kot predvidljivo.`
                        }
                    </p>
                    {revija.averageLength &&
                        <p
                            className="avgLength">
                            {`Povprečno ${revija.averageLength} strani.`}
                        </p>
                    }
                </div>
            </div>
            <div className="image flex">
                <img
                    src={revija.img ?
                        revija.img :
                        "femininfoEyeIcon.png"
                    }
                    style={revija.img ?
                        {} :
                        {
                            filter: "grayscale(100%)",
                            maxWidth: "90%"
                        }
                    }
                    alt={revija.img ?
                        `Slika ${revija.title}` :
                        "FeminInfo ikona"
                    }
                />
            </div>
            {
                revija.femType || revija.genre.length > 0 ?
                    <div className="genreBox colFlex">
                        {revija.femType ?
                            revija.femType === "lib" ?
                                <img className="femType" src={"type-liberal.svg"} alt="liberalni feminizem" /> :
                                revija.femType === "soc" ?
                                    <img className="femType" src={"type-society.svg"} alt="družbeni feminizem" /> :
                                    <img className="femType" src={"type-woke.svg"} alt="woke feminizem" /> :
                            <></>
                        }
                        {revija.genre &&
                            <div className="data genreType">
                                {revija.genre.sort().map(el => {
                                    return <p key={"genre" + el}>{el}</p>;
                                })}
                            </div>
                        }
                    </div> :
                    <></>
            }

            {
                revija.companies.length > 0 || revija.authors.length > 0 || revija.others.length > 0 || revija.languages.length > 0 ?
                    <div className="peopleBox">
                        {revija.companies.length > 0 &&
                            <div className="companiesBox">
                                <h3 className="dataType">Organizacije</h3>
                                <p className="data">
                                    {revija.companies.sort().map(
                                        (el, index) => {
                                            if (index + 1 === revija.companies?.length) {
                                                return el + "."
                                            } else {
                                                return el + ", "
                                            }
                                        }
                                    )}
                                </p>
                            </div>
                        }
                        {revija.authors.length > 0 &&
                            <div className="authorsBox">
                                <h3 className="dataType">Avtorji prispevkov</h3>
                                <p className="data">
                                    {revija.authors.sort().map(
                                        (el, index) => {
                                            if (index + 1 === revija.authors?.length) {
                                                return el + "."
                                            } else {
                                                return el + ", "
                                            }
                                        }
                                    )}
                                </p>
                            </div>
                        }
                        {revija.languages.length > 0 &&
                            <div className="actorsBox">
                                <h3 className="dataType">Gostje</h3>
                                <p className="data">
                                    {revija.languages.sort().map(
                                        (el, index) => {
                                            if (index + 1 === revija.languages?.length) {
                                                return el + "."
                                            } else {
                                                return el + ", "
                                            }
                                        }
                                    )}
                                </p>
                            </div>
                        }
                        {revija.others.length > 0 &&
                            <div className="staffBox">
                                <h3 className="dataType">Ostali</h3>
                                <p className="data">
                                    {revija.others.sort().map(
                                        (el, index) => {
                                            if (index + 1 === revija.others?.length) {
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
                revija.explanation &&
                <div className="explanationBox">
                    <h3 className="dataType">Pojasnilo</h3>
                    <p className="data">{revija.explanation}</p>
                </div>
            }

            {
                revija.description &&
                <div className="descriptionBox">
                    <h3 className="dataType">Opis</h3>
                    <p className="data">{revija.description}</p>
                </div>
            }

            {
                revija.ratings &&
                <div className="pollBox">
                    <span className="rating">
                        <p className="defMouse">{revija.ratings.hates}</p>
                        <p className="rIcon">💀</p>
                    </span>
                    <span className="rating">
                        <p className="defMouse">{revija.ratings.dislikes}</p>
                        <p className="rIcon">👎</p>
                    </span>
                    <span className="rating">
                        <p className="defMouse">{revija.ratings.oks}</p>
                        <p className="rIcon">⭐</p>
                    </span>
                    <span className="rating">
                        <p className="defMouse">{revija.ratings.likes}</p>
                        <p className="rIcon">👍</p>
                    </span>
                    <span className="rating">
                        <p className="defMouse">{revija.ratings.loves}</p>
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
                    onClick={() => setRevija(null)}>
                    Zapri
                </button>
            </div>
        </div > :
        <></>
    )
}