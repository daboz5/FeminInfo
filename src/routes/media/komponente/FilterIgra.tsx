import ArrowUp from "../../../assets/ArrowUp";
import useFemStore from "../../../useFemStore";
import useIgra from "./useIgra";

export default function FilterIgra(
    { filter, setFilter }:
        {
            filter: string,
            setFilter(el: string): void
        }
) {

    const {
        setLibIgra
    } = useFemStore();

    const {
        sortAZ,
        sortZA,
        sort19Year,
        sort91Year,
        sort19Fame,
        sort91Fame,
        yearFilter,
        typeFilter,
        fameFilter,
        simpleFilter,
        complexFilter,
        omniFilter,
    } = useIgra();

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
                onClick={() => setLibIgra(sortAZ())}>
                <ArrowUp />
            </button>
            <button
                className="upBtn"
                onClick={() => setLibIgra(sortZA())}>
                <ArrowUp />
            </button>
        </div>
        <div className="mediaFilter colFlex">
            <p>Iskani nabor</p>
            <input
                id="titleLetterFilter"
                type="text"
                placeholder="a,b,c / abc"
                maxLength={10}>
            </input>
            <button
                onClick={() => {
                    const el: HTMLInputElement | null = document.getElementById("titleLetterFilter");
                    el ? complexFilter(el.value) : {}
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
                    el ? simpleFilter(el.value) : {}
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
                onClick={() => setLibIgra(sort91Year())}>
                <ArrowUp />
            </button>
            <button
                className="upBtn"
                onClick={() => setLibIgra(sort19Year())}>
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
                onClick={() => typeFilter("soc")}
                alt="družbeni"
            />
            <img
                className="filterType"
                src="type-woke.svg"
                onClick={() => typeFilter("woke")}
                alt="woke"
            />
            <img
                className="filterType"
                src="type-liberal.svg"
                onClick={() => typeFilter("lib")}
                alt="liberalni"
            />
        </div>
    </>

    const fame = <>
        <div className="mediaFilter flex">
            <button
                className="downBtn"
                onClick={() => setLibIgra(sort91Fame())}>
                <ArrowUp />
            </button>
            <button
                className="upBtn"
                onClick={() => setLibIgra(sort19Fame())}>
                <ArrowUp />
            </button>
        </div>
        <div className="mediaFilter colFlex">
            <p>Iskani nabor</p>
            <input id="fameMinFilter" type="number" placeholder="od ocene"></input>
            <input id="fameMaxFilter" type="number" placeholder="do ocene"></input>
            <button
                onClick={() => {
                    const elMin: HTMLInputElement | null = document.getElementById("fameMinFilter");
                    const elMax: HTMLInputElement | null = document.getElementById("fameMaxFilter");
                    elMin && elMax ? fameFilter(elMin.value, elMax.value) : {}
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