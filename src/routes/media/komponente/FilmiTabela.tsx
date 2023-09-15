import { Film } from "../../../type";
import useFilm from "../../../utils/useFilm"

export default function FilmiTabela(
    { openFilm }:
        { openFilm(el: Film): void }
) {

    const { lib, calcFame } = useFilm();

    return (<>
        <div className="libBox">
            <div className="orderBox">
                <div className="fOrder">#</div>
                <div className="fOrder">Slika</div>
                <div className="fOrder">Naslov</div>
                <div className="fOrder">Leto</div>
                <div className="fOrder">Tip</div>
                <div className="fOrder">Žanr</div>
                <div className="fOrder">🌟</div>
            </div>
            {lib.map(
                (el, index) => {
                    const fame = calcFame(el.ratings);
                    const genre = el.genre?.map((el) => el + " ");
                    return (
                        <div className="orderBox" key={`film${index}`}>
                            <div className="fOrdered">{index + 1}</div>
                            <div className="fOrdered">
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
                                className="fOrdered fTitle"
                                onClick={() => openFilm(el)}>
                                {el.title}
                            </div>
                            <div className="fOrdered">
                                {el.year?.start +
                                    `${el?.year?.unfinished ?
                                        "-" :
                                        el.year?.finish ?
                                            `-${el.year?.finish}` :
                                            ""}`
                                }
                            </div>
                            <div className="fOrdered">
                                {el.femType === "lib" ?
                                    <img className="tableGenre" src={"type-liberal.svg"} alt="liberalni" /> :
                                    el.femType === "soc" ?
                                        <img className="tableGenre" src={"type-society.svg"} alt="družbeni" /> :
                                        el.femType === "woke" ?
                                            <img className="tableGenre" src={"type-woke.svg"} alt="woke" /> :
                                            ""
                                }
                            </div>
                            <div className="fOrdered">{genre}</div>
                            <div className="fOrdered">{fame}</div>
                        </div>
                    )
                }
            )}
        </div>
    </>)
}