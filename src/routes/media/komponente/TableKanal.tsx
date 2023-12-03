import { Kanal } from "../../../type";
import useFemStore from "../../../useFemStore";
import useComponent from "./useComponent";

export default function TabeleKanal(
    { setKanal, setEditor, setFilter }:
        {
            setKanal(el: Kanal): void,
            setEditor(el: boolean): void,
            setFilter(el: string): void,
        }
) {

    const { libKanal, backupLibKanal, setLibKanal } = useFemStore();
    const { calcFame } = useComponent();

    return (<>
        <div className="libBox">
            <div className="orderBox">
                <div
                    className="mOrder actMouse filterOption flex"
                    onClick={() => setFilter("Iskanje")}>
                    <p className="actMouse">🔍</p>
                </div>
                <div
                    className="mOrder filterOption flex"
                    onClick={() => setFilter("Naslov")}>
                    <h5 className="actMouse">
                        Naslov
                    </h5>
                </div>
                <div
                    className="mOrder filterOption flex"
                    onClick={() => setFilter("Leto")}>
                    <h5 className="actMouse">
                        Leto
                    </h5>
                </div>
                <div
                    className="mOrder filterOption flex"
                    onClick={() => setFilter("Fem tip")}>
                    <h5 className="actMouse">
                        Tip
                    </h5>
                </div>
                <div
                    className="mOrder actMouse filterOption flex"
                    onClick={() => setFilter("Ocena")}>
                    <p className="actMouse">🌟</p>
                </div>
            </div>
            {libKanal?.map(
                (el, index) => {
                    const fame = calcFame(el.ratings);
                    return (
                        <div className="orderBox" key={`kanal${index}`}>
                            <div className="mOrdered flex">
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
                                    alt="slika kanala"
                                />
                            </div>
                            <div
                                className="mOrdered mTitle flex"
                                onClick={() => {
                                    setFilter("")
                                    setKanal(el)
                                }}>
                                <h5 className="actMouse">
                                    {el.title}
                                </h5>
                            </div>
                            <div className="mOrdered defMouse flex">
                                {el.firstAir +
                                    `${el.firstAir === el.lastAir ?
                                        "" :
                                        el.lastAir ?
                                            " - " + el.lastAir :
                                            ` -`
                                    }`
                                }
                            </div>
                            <div className="mOrdered flex">
                                {el.femType === "lib" ?
                                    <img className="tableType" src={"type-liberal.svg"} alt="liberalni" /> :
                                    el.femType === "soc" ?
                                        <img className="tableType" src={"type-society.svg"} alt="družbeni" /> :
                                        el.femType === "woke" ?
                                            <img className="tableType" src={"type-woke.svg"} alt="woke" /> :
                                            ""
                                }
                            </div>
                            <div className="mOrdered defMouse flex">{fame}</div>
                        </div>
                    )
                }
            )}
        </div>
        <div className="flex tableOptions">
            <button
                className="tableOptionBtn"
                onClick={() => setEditor(true)}>
                Dodaj kanal
            </button>
            <button
                className="tableOptionBtn"
                onClick={() => setLibKanal(backupLibKanal)}>
                Obnovi seznam
            </button>
        </div>
    </>)
}