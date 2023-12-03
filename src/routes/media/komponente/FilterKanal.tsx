import ArrowUp from "../../../assets/ArrowUp";
import useComponent from "./useComponent";
import useKanal from "./useKanal";

export default function FilterKanal(
    { filter, setFilter }:
        {
            filter: string,
            setFilter(el: string): void
        }
) {

    const {
        selectSetLibrary,
        sortAZ,
        sortZA,
        sort19Year,
        sort91Year,
        sort19Fame,
        sort91Fame,
        typeFilter,
        fameFilter,
        simpleFilter,
        complexFilter,
    } = useComponent();

    const {
        yearFilter,
        omniFilter
    } = useKanal();

    const lib = "kanal";

    const search = <>
        <div className="mediaFilter colFlex">
            <p>Iskano zaporedje</p>
            <input
                id="searchWordFilter"
                type="text"
                placeholder="iščem"
                maxLength={30}>
            </input>
            <button
                onClick={() => {
                    const el: HTMLInputElement | null = document.getElementById("searchWordFilter");
                    el ? omniFilter(el.value) : {}
                }}>
                Potrdi
            </button>
        </div>
    </>

    const title = <>
        <div className="mediaFilter flex">
            <button
                className="downBtn"
                onClick={() => selectSetLibrary(lib, sortAZ(lib))}>
                <ArrowUp />
            </button>
            <button
                className="upBtn"
                onClick={() => selectSetLibrary(lib, sortZA(lib))}>
                <ArrowUp />
            </button>
        </div>
        <div className="mediaFilter colFlex">
            <p>Prva črka</p>
            <input
                id="titleLetterFilter"
                type="text"
                placeholder="a,b,c / abc"
                maxLength={10}>
            </input>
            <button
                onClick={() => {
                    const el: HTMLInputElement | null = document.getElementById("titleLetterFilter");
                    el ? complexFilter(lib, el.value) : {}
                }}>
                Potrdi
            </button>
        </div>
        <div className="mediaFilter colFlex">
            <p>Iskano zaporedje</p>
            <input
                id="titleWordFilter"
                type="text"
                placeholder="Naslov"
                maxLength={20}>
            </input>
            <button
                onClick={() => {
                    const el: HTMLInputElement | null = document.getElementById("titleWordFilter");
                    el ? simpleFilter(lib, el.value) : {}
                }}>
                Potrdi
            </button>
        </div>
    </>

    const currentYear = new Date().getFullYear();
    const year = <>
        <div className="mediaFilter flex">
            <button
                className="downBtn"
                onClick={() => selectSetLibrary(lib, sort91Year(lib))}>
                <ArrowUp />
            </button>
            <button
                className="upBtn"
                onClick={() => selectSetLibrary(lib, sort19Year(lib))}>
                <ArrowUp />
            </button>
        </div>
        <div className="mediaFilter colFlex">
            <p>Iskani nabor</p>
            <input
                id="yearMinFilter"
                type="number"
                placeholder="1888">
            </input>
            <input
                id="yearMaxFilter"
                type="number"
                placeholder={`${currentYear}`}>
            </input>
            <button
                onClick={() => {
                    const elMin: HTMLInputElement | null = document.getElementById("yearMinFilter");
                    const elMax: HTMLInputElement | null = document.getElementById("yearMaxFilter");
                    elMin && elMax ? yearFilter(elMin.value, elMax.value) : {}
                }}>
                Potrdi
            </button>
        </div>
    </>

    const type = <>
        <div className="mediaFilter flex">
            <img
                className="filterType"
                src="type-society.svg"
                onClick={() => typeFilter(lib, "soc")}
                alt="družbeni"
            />
            <img
                className="filterType"
                src="type-woke.svg"
                onClick={() => typeFilter(lib, "woke")}
                alt="woke"
            />
            <img
                className="filterType"
                src="type-liberal.svg"
                onClick={() => typeFilter(lib, "lib")}
                alt="liberalni"
            />
        </div>
    </>

    const fame = <>
        <div className="mediaFilter flex">
            <button
                className="downBtn"
                onClick={() => selectSetLibrary(lib, sort91Fame(lib))}>
                <ArrowUp />
            </button>
            <button
                className="upBtn"
                onClick={() => selectSetLibrary(lib, sort19Fame(lib))}>
                <ArrowUp />
            </button>
        </div>
        <div className="mediaFilter colFlex">
            <p>Iskani nabor</p>
            <input id="filmFameMinFilter" type="number" placeholder="od ocene"></input>
            <input id="filmFameMaxFilter" type="number" placeholder="do ocene"></input>
            <button
                onClick={() => {
                    const elMin: HTMLInputElement | null = document.getElementById("filmFameMinFilter");
                    const elMax: HTMLInputElement | null = document.getElementById("filmFameMaxFilter");
                    elMin && elMax ? fameFilter(lib, elMin.value, elMax.value) : {}
                }}>
                Potrdi
            </button>
        </div>
    </>

    return (
        <div className="mediaFilterPosition flex">
            <div className="mediaFilterBox colFlex">
                <h4>{filter}</h4>
                {filter === "Iskanje" ?
                    search :
                    filter === "Naslov" ?
                        title :
                        filter === "Leto" ?
                            year :
                            filter === "Fem tip" ?
                                type :
                                filter === "Ocena" ?
                                    fame :
                                    <></>}
                <div
                    className="filterExit"
                    onClick={() => setFilter("")}>
                </div>
            </div>
        </div>
    )
}