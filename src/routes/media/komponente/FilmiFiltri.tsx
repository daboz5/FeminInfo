import ArrowUp from "../../../assets/ArrowUp";
import useFemStore from "../../../useFemStore";
import useFilm from "./useFilm";

export default function FilmiFiltri(
    { filter, setFilter }:
        {
            filter: string,
            setFilter(el: string): void
        }
) {

    const { setFilmLib } = useFemStore();

    const {
        simpleFilter,
        complexFilter,
        yearsFilter,
        typeFilter,
        fameFilter,
        sortAZ,
        sortZA,
        sort19Year,
        sort91Year,
        sort19Fame,
        sort91Fame
    } = useFilm();


    const title = <>
        <div className="mediaFilter flex">
            <button
                className="downBtn"
                onClick={() => setFilmLib(sortAZ())}>
                <ArrowUp />
            </button>
            <button
                className="upBtn"
                onClick={() => setFilmLib(sortZA())}>
                <ArrowUp />
            </button>
        </div>
        <div className="mediaFilter colFlex">
            <p>Iskani nabor</p>
            <input
                id="filmTitleLetterFilter"
                type="text"
                placeholder="a,b,c / abc"
                maxLength={10}>
            </input>
            <button
                onClick={() => {
                    const el: HTMLInputElement | null = document.getElementById("filmTitleLetterFilter");
                    el ? complexFilter(el.value) : {}
                }}>
                Potrdi
            </button>
        </div>
        <div className="mediaFilter colFlex">
            <p>Iskano zaporedje</p>
            <input
                id="filmTitleWordFilter"
                type="text"
                placeholder="Naslov"
                maxLength={20}>
            </input>
            <button
                onClick={() => {
                    const el: HTMLInputElement | null = document.getElementById("filmTitleWordFilter");
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
                onClick={() => setFilmLib(sort91Year())}>
                <ArrowUp />
            </button>
            <button
                className="upBtn"
                onClick={() => setFilmLib(sort19Year())}>
                <ArrowUp />
            </button>
        </div>
        <div className="mediaFilter colFlex">
            <p>Iskani nabor</p>
            <input
                id="filmYearMinFilter"
                type="number"
                placeholder="1888">
            </input>
            <input
                id="filmYearMaxFilter"
                type="number"
                placeholder={`${currentYear}`}>
            </input>
            <button
                onClick={() => {
                    const elMin: HTMLInputElement | null = document.getElementById("filmYearMinFilter");
                    const elMax: HTMLInputElement | null = document.getElementById("filmYearMaxFilter");
                    elMin && elMax ? yearsFilter(elMin.value, elMax.value) : {}
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
                onClick={() => setFilmLib(sort91Fame())}>
                <ArrowUp />
            </button>
            <button
                className="upBtn"
                onClick={() => setFilmLib(sort19Fame())}>
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
                {filter === "Naslov" ?
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