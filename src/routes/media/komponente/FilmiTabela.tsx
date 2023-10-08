import { Film } from "../../../type";
import useFilm from "./useFilm"

export default function FilmiTabela(
    { openFilm, switchFilter }:
        {
            openFilm(el: Film): void,
            switchFilter(el: string): void,
        }
) {

    const { lib, calcFame } = useFilm();

    return (<>
        <div className="libBox">
            <div className="orderBox">
                <div className="fOrder defMouse flex">
                    <h5>
                        Slika
                    </h5>
                </div>
                <div
                    className="fOrder actMouse filterOption flex"
                    onClick={() => switchFilter("Naslov")}>
                    <h5>
                        Naslov
                    </h5>
                </div>
                <div
                    className="fOrder actMouse filterOption flex"
                    onClick={() => switchFilter("Leto")}>
                    <h5>
                        Leto
                    </h5>
                </div>
                <div
                    className="fOrder actMouse filterOption flex"
                    onClick={() => switchFilter("Fem tip")}>
                    <h5>
                        Tip
                    </h5>
                </div>
                <div
                    className="fOrder actMouse filterOption flex"
                    onClick={() => switchFilter("Ocena")}>
                    <p>🌟</p>
                </div>
            </div>
            {lib.map(
                (el, index) => {
                    const fame = calcFame(el.ratings);
                    return (
                        <div className="orderBox" key={`film${index}`}>
                            <div className="fOrdered flex">
                                <img
                                    className="tablePic"
                                    src={el.img ?
                                        el.img :
                                        "femininfoEyeIcon.png"
                                    }
                                    style={el.img ?
                                        {} :
                                        { filter: "grayscale(100%)" }
                                    }
                                    alt="slika filma"
                                />
                            </div>
                            <div
                                className="fOrdered fTitle flex"
                                onClick={() => openFilm(el)}>
                                <h5 className="actMouse">
                                    {el.title}
                                </h5>
                            </div>
                            <div className="fOrdered defMouse flex">
                                {el.year?.start +
                                    `${el?.year?.unfinished ?
                                        "-" :
                                        el.year?.finish ?
                                            `-${el.year?.finish}` :
                                            ""}`
                                }
                            </div>
                            <div className="fOrdered flex">
                                {el.femType === "lib" ?
                                    <img className="tableType" src={"type-liberal.svg"} alt="liberalni" /> :
                                    el.femType === "soc" ?
                                        <img className="tableType" src={"type-society.svg"} alt="družbeni" /> :
                                        el.femType === "woke" ?
                                            <img className="tableType" src={"type-woke.svg"} alt="woke" /> :
                                            ""
                                }
                            </div>
                            <div className="fOrdered defMouse flex">{fame}</div>
                        </div>
                    )
                }
            )}
        </div>
    </>)
}