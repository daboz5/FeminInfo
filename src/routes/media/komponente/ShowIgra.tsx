import { Igra } from "../../../type";
import useIgra from "./useIgra";

export default function ShowIgra(
    { igra, setIgra, setEditor }:
        {
            igra: Igra | null,
            setIgra(newState: null): void,
            setEditor(newState: boolean): void
        }
) {

    const {
        setGrid,
        bonusContentCheck
    } = useIgra();

    return (igra ?
        <div
            className={`gridBox grid${setGrid(igra)} container"`}>
            <div className="titleBox">
                <h3
                    className="title">
                    {igra.title}
                </h3>
                <div
                    className="mInfo">
                    <p>
                        {igra.year}
                    </p>
                    {igra.content.length &&
                        <p
                            className="trajanje">
                            {`${igra.content.length}`} igra
                        </p>
                    }
                    {igra.platforms.length > 0 &&
                        <p
                            className="platforme">
                            {`${igra.platforms.join(" - ")}`}
                        </p>
                    }
                    {bonusContentCheck(igra) &&
                        <ul
                            className="vsebina">
                            {igra.content.bonus_content.dlc ? <li>vsaj en DLC</li> : <></>}
                            {igra.content.bonus_content.microtransactions ? <li>mikrotransakcije</li> : <></>}
                            {igra.content.bonus_content.movie ? <li>dodatno filmsko gradivo</li> : <></>}
                            {igra.content.bonus_content.publication ? <li>dodatno bralno gradivo</li> : <></>}
                        </ul>
                    }
                </div>
            </div>
            <div className="image flex">
                <img
                    src={igra.img ?
                        igra.img :
                        "femininfoEyeIcon.png"
                    }
                    style={igra.img ?
                        {} :
                        {
                            filter: "grayscale(100%)",
                            maxWidth: "90%"
                        }
                    }
                    alt={igra.img ?
                        `Slika ${igra.title}` :
                        "FeminInfo ikona"
                    }
                />
            </div>
            {
                igra.femType || igra.genre.length > 0 ?
                    <div className="genreBox colFlex">
                        {igra.femType ?
                            igra.femType === "lib" ?
                                <img className="femType" src={"type-liberal.svg"} alt="liberalni feminizem" /> :
                                igra.femType === "soc" ?
                                    <img className="femType" src={"type-society.svg"} alt="družbeni feminizem" /> :
                                    <img className="femType" src={"type-woke.svg"} alt="woke feminizem" /> :
                            <></>
                        }
                        {igra.genre &&
                            <div className="data genreType">
                                {igra.genre.sort().map(el => {
                                    return <p key={"genre" + el}>{el}</p>;
                                })}
                            </div>
                        }
                    </div> :
                    <></>
            }

            {igra.developer || igra.publisher || igra.others ?
                <div className="peopleBox">
                    {igra.developer &&
                        <div className="directorsBox">
                            <h3 className="dataType">Naredil</h3>
                            <p className="data">
                                {igra.developer}
                            </p>
                        </div>
                    }
                    {igra.publisher &&
                        <div className="actorsBox">
                            <h3 className="dataType">Založba</h3>
                            <p className="data">
                                {igra.publisher}
                            </p>
                        </div>
                    }
                    {igra.others.length > 0 &&
                        <div className="staffBox">
                            <h3 className="dataType">Ostali</h3>
                            <p className="data">
                                {igra.others.sort().map(
                                    (el, index) => {
                                        if (index + 1 === igra.others?.length) {
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

            {igra.explanation &&
                <div className="explanationBox">
                    <h3 className="dataType">Pojasnilo</h3>
                    <p className="data">{igra.explanation}</p>
                </div>
            }

            {igra.description &&
                <div className="descriptionBox">
                    <h3 className="dataType">Opis</h3>
                    <p className="data">{igra.description}</p>
                </div>
            }

            {igra.ratings &&
                <div className="pollBox">
                    <span className="rating">
                        <p className="defMouse">{igra.ratings.hates}</p>
                        <p className="rIcon">💀</p>
                    </span>
                    <span className="rating">
                        <p className="defMouse">{igra.ratings.dislikes}</p>
                        <p className="rIcon">👎</p>
                    </span>
                    <span className="rating">
                        <p className="defMouse">{igra.ratings.oks}</p>
                        <p className="rIcon">⭐</p>
                    </span>
                    <span className="rating">
                        <p className="defMouse">{igra.ratings.likes}</p>
                        <p className="rIcon">👍</p>
                    </span>
                    <span className="rating">
                        <p className="defMouse">{igra.ratings.loves}</p>
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
                    onClick={() => setIgra(null)}>
                    Zapri
                </button>
            </div>
        </div> :
        <></>
    )
}