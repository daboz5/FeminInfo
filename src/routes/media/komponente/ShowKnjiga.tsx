import { Knjiga } from "../../../type";
import useKnjiga from "./useKnjiga";

export default function ShowKnjiga(
    { knjiga, setKnjiga, setEditor }:
        {
            knjiga: Knjiga | null,
            setKnjiga(newState: null): void,
            setEditor(newState: boolean): void
        }
) {

    const { setGrid } = useKnjiga();

    const sumPageNum = () => {
        if (knjiga) {
            let pageCount = 0;
            for (let i = 0; i < knjiga.zbirka.length; i++) {
                if (knjiga.zbirka[i].count) {
                    pageCount = pageCount + knjiga.zbirka[i].count;
                }
            }
            return pageCount;
        }
    }

    return (knjiga ?
        <div
            className={`gridBox grid${setGrid(knjiga)} container`}>
            <div className="titleBox">
                <h3
                    className="title">
                    {knjiga.title}
                </h3>
                <div
                    className="fInfo">
                    <p>{knjiga.published}</p>
                    {sumPageNum() &&
                        <p className="trajanje">
                            {`${sumPageNum()} strani`}
                        </p>
                    }
                    {knjiga.zbirka.length > 1 &&
                        <p className="epizode">
                            {`${knjiga.zbirka.length} knjig`}
                        </p>
                    }
                </div>
            </div>
            <div className="image flex">
                <img
                    src={knjiga.img ?
                        knjiga.img :
                        "femininfoEyeIcon.png"
                    }
                    style={knjiga.img ?
                        {} :
                        {
                            filter: "grayscale(100%)",
                            maxWidth: "90%"
                        }
                    }
                    alt={knjiga.img ?
                        `Slika ${knjiga.title}` :
                        "FeminInfo ikona"
                    }
                />
            </div>
            {
                knjiga.femType || knjiga.genre.length > 0 ?
                    <div className="genreBox colFlex">
                        {knjiga.femType ?
                            knjiga.femType === "lib" ?
                                <img className="femType" src={"type-liberal.svg"} alt="liberalni feminizem" /> :
                                knjiga.femType === "soc" ?
                                    <img className="femType" src={"type-society.svg"} alt="družbeni feminizem" /> :
                                    <img className="femType" src={"type-woke.svg"} alt="woke feminizem" /> :
                            <></>
                        }
                        {knjiga.genre &&
                            <div className="data genreType">
                                {knjiga.genre.sort().map(el => {
                                    return <p key={"genre" + el}>{el}</p>;
                                })}
                            </div>
                        }
                    </div> :
                    <></>
            }

            {
                knjiga.publishers.length > 0 || knjiga.authors.length > 0 || knjiga.others.length > 0 || knjiga.characters.length > 0 ?
                    <div className="peopleBox">
                        {knjiga.publishers.length > 0 &&
                            <div className="directorsBox">
                                <h3 className="dataType">Direkcija</h3>
                                <p className="data">
                                    {knjiga.publishers.sort().map(
                                        (el, index) => {
                                            if (index + 1 === knjiga.publishers?.length) {
                                                return el + "."
                                            } else {
                                                return el + ", "
                                            }
                                        }
                                    )}
                                </p>
                            </div>
                        }
                        {knjiga.authors.length > 0 &&
                            <div className="actorsBox">
                                <h3 className="dataType">Igralci</h3>
                                <p className="data">
                                    {knjiga.authors.sort().map(
                                        (el, index) => {
                                            if (index + 1 === knjiga.authors?.length) {
                                                return el + "."
                                            } else {
                                                return el + ", "
                                            }
                                        }
                                    )}
                                </p>
                            </div>
                        }
                        {knjiga.others.length > 0 &&
                            <div className="staffBox">
                                <h3 className="dataType">Ostali</h3>
                                <p className="data">
                                    {knjiga.others.sort().map(
                                        (el, index) => {
                                            if (index + 1 === knjiga.others?.length) {
                                                return el + "."
                                            } else {
                                                return el + ", "
                                            }
                                        }
                                    )}
                                </p>
                            </div>
                        }
                        {knjiga.characters.length > 0 &&
                            <div className="directorsBox">
                                <h3 className="dataType">Direkcija</h3>
                                <p className="data">
                                    {knjiga.characters.sort().map(
                                        (el, index) => {
                                            if (index + 1 === knjiga.characters?.length) {
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
                knjiga.explanation &&
                <div className="explanationBox">
                    <h3 className="dataType">Pojasnilo</h3>
                    <p className="data">{knjiga.explanation}</p>
                </div>
            }

            {
                knjiga.description &&
                <div className="descriptionBox">
                    <h3 className="dataType">Opis</h3>
                    <p className="data">{knjiga.description}</p>
                </div>
            }

            {
                knjiga.ratings &&
                <div className="pollBox">
                    <span className="rating">
                        <p className="defMouse">{knjiga.ratings.hates}</p>
                        <p className="rIcon">💀</p>
                    </span>
                    <span className="rating">
                        <p className="defMouse">{knjiga.ratings.dislikes}</p>
                        <p className="rIcon">👎</p>
                    </span>
                    <span className="rating">
                        <p className="defMouse">{knjiga.ratings.oks}</p>
                        <p className="rIcon">⭐</p>
                    </span>
                    <span className="rating">
                        <p className="defMouse">{knjiga.ratings.likes}</p>
                        <p className="rIcon">👍</p>
                    </span>
                    <span className="rating">
                        <p className="defMouse">{knjiga.ratings.loves}</p>
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
                    onClick={() => setKnjiga(null)}>
                    Zapri
                </button>
            </div>
        </div > :
        <></>
    )
}