import { Organizacija } from "../../../type";
import useOrganizacija from "./useOrganizacija";

export default function ShowOrganizacija(
    { organizacija, setOrganizacija, setEditor }:
        {
            organizacija: Organizacija | null,
            setOrganizacija(newState: null): void,
            setEditor(newState: boolean): void
        }
) {

    const { setGrid } = useOrganizacija();

    return (organizacija ?
        <div
            className={`gridBox grid${setGrid(organizacija)} container`}>
            <div className="titleBox">
                <h3
                    className="title">
                    {organizacija.name}
                </h3>
                <div
                    className="fInfo">
                    <p>
                        {organizacija.founded}
                    </p>
                    {organizacija.reach &&
                        <p
                            className="doseg">
                            {`Organizacija je ${organizacija.reach === "local" ? "lokalna" :
                                organizacija.reach === "regional" ? "regionalna" :
                                    organizacija.reach === "national" ? "regionalna" :
                                        organizacija.reach === "multinational" ? "mutinacionalna" :
                                            ""}.`}
                        </p>
                    }
                </div>
            </div>
            <div className="image flex">
                <img
                    src={organizacija.img ?
                        organizacija.img :
                        "femininfoEyeIcon.png"
                    }
                    style={organizacija.img ?
                        {} :
                        {
                            filter: "grayscale(100%)",
                            maxWidth: "90%"
                        }
                    }
                    alt={organizacija.img ?
                        `Slika ${organizacija.name}` :
                        "FeminInfo ikona"
                    }
                />
            </div>
            {
                organizacija.femType || organizacija.genre.length > 0 ?
                    <div className="genreBox colFlex">
                        {organizacija.femType ?
                            organizacija.femType === "lib" ?
                                <img className="femType" src={"type-liberal.svg"} alt="liberalni feminizem" /> :
                                organizacija.femType === "soc" ?
                                    <img className="femType" src={"type-society.svg"} alt="družbeni feminizem" /> :
                                    <img className="femType" src={"type-woke.svg"} alt="woke feminizem" /> :
                            <></>
                        }
                        {organizacija.genre &&
                            <div className="data genreType">
                                {organizacija.genre.sort().map(el => {
                                    return <p key={"genre" + el}>{el}</p>;
                                })}
                            </div>
                        }
                    </div> :
                    <></>
            }

            {
                organizacija.representatives.length > 0 || organizacija.workers.length > 0 || organizacija.programs.length > 0 || organizacija.others.length > 0 ?
                    <div className="peopleBox">
                        {organizacija.representatives.length > 0 &&
                            <div className="representativesBox">
                                <h3 className="dataType">Predstavniki</h3>
                                <p className="data">
                                    {organizacija.representatives.sort().map(
                                        (el, index) => {
                                            if (index + 1 === organizacija.representatives?.length) {
                                                return el + "."
                                            } else {
                                                return el + ", "
                                            }
                                        }
                                    )}
                                </p>
                            </div>
                        }
                        {organizacija.workers.length > 0 &&
                            <div className="workersBox">
                                <h3 className="dataType">Delavci</h3>
                                <p className="data">
                                    {organizacija.workers.sort().map(
                                        (el, index) => {
                                            if (index + 1 === organizacija.workers?.length) {
                                                return el + "."
                                            } else {
                                                return el + ", "
                                            }
                                        }
                                    )}
                                </p>
                            </div>
                        }
                        {organizacija.programs.length > 0 &&
                            <div className="programsBox">
                                <h3 className="dataType">Programi</h3>
                                <p className="data">
                                    {organizacija.programs.sort().map(
                                        (el, index) => {
                                            if (index + 1 === organizacija.programs?.length) {
                                                return el + "."
                                            } else {
                                                return el + ", "
                                            }
                                        }
                                    )}
                                </p>
                            </div>
                        }
                        {organizacija.others.length > 0 &&
                            <div className="staffBox">
                                <h3 className="dataType">Ostali</h3>
                                <p className="data">
                                    {organizacija.others.sort().map(
                                        (el, index) => {
                                            if (index + 1 === organizacija.others?.length) {
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
                organizacija.explanation &&
                <div className="explanationBox">
                    <h3 className="dataType">Pojasnilo</h3>
                    <p className="data">{organizacija.explanation}</p>
                </div>
            }

            {
                organizacija.description &&
                <div className="descriptionBox">
                    <h3 className="dataType">Opis</h3>
                    <p className="data">{organizacija.description}</p>
                </div>
            }

            {
                organizacija.ratings &&
                <div className="pollBox">
                    <span className="rating">
                        <p className="defMouse">{organizacija.ratings.hates}</p>
                        <p className="rIcon">💀</p>
                    </span>
                    <span className="rating">
                        <p className="defMouse">{organizacija.ratings.dislikes}</p>
                        <p className="rIcon">👎</p>
                    </span>
                    <span className="rating">
                        <p className="defMouse">{organizacija.ratings.oks}</p>
                        <p className="rIcon">⭐</p>
                    </span>
                    <span className="rating">
                        <p className="defMouse">{organizacija.ratings.likes}</p>
                        <p className="rIcon">👍</p>
                    </span>
                    <span className="rating">
                        <p className="defMouse">{organizacija.ratings.loves}</p>
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
                    onClick={() => setOrganizacija(null)}>
                    Zapri
                </button>
            </div>
        </div > :
        <></>
    )
}