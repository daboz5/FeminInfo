import { Film } from "../../../type";
import useFemStore from "../../../useFemStore";
import useFilm from "./useFilm"

export default function FilmiTabela(
    { openFilm, openEditor, setFilter }:
        {
            openFilm(el: Film): void,
            openEditor(el: boolean): void,
            setFilter(el: string): void,
        }
) {

    const { filmLib } = useFemStore();
    const { calcFame, } = useFilm();

    return (<>
        <div className="libBox">
            <div className="orderBox">
                <div
                    className="fOrder actMouse filterOption flex"
                    onClick={() => setFilter("Iskanje")}>
                    <p className="actMouse">🔍</p>
                </div>
                <div
                    className="fOrder filterOption flex"
                    onClick={() => setFilter("Naslov")}>
                    <h5 className="actMouse">
                        Naslov
                    </h5>
                </div>
                <div
                    className="fOrder filterOption flex"
                    onClick={() => setFilter("Leto")}>
                    <h5 className="actMouse">
                        Leto
                    </h5>
                </div>
                <div
                    className="fOrder filterOption flex"
                    onClick={() => setFilter("Fem tip")}>
                    <h5 className="actMouse">
                        Tip
                    </h5>
                </div>
                <div
                    className="fOrder actMouse filterOption flex"
                    onClick={() => setFilter("Ocena")}>
                    <p className="actMouse">🌟</p>
                </div>
            </div>
            {filmLib?.map(
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
                                onClick={() => {
                                    setFilter("")
                                    openFilm(el)
                                }}>
                                <h5 className="actMouse">
                                    {el.title}
                                </h5>
                            </div>
                            <div className="fOrdered defMouse flex">
                                {el.year?.start +
                                    `${el?.year?.unfinished ?
                                        "-" :
                                        el.year?.finish ?
                                            `- ${el.year?.finish}` :
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
        <div className="flex">
            <button
                className="addContentBtn"
                onClick={() => openEditor(true)}>
                Dodaj film
            </button>
        </div>
    </>)
}