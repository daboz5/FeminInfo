export default function FilmiFiltri(
    { filter, switchFilter }:
        {
            filter: JSX.Element,
            switchFilter(el: string): void
        }
) {

    return (
        <div className="mediaFilterPosition flex">
            <div
                className="mediaFilterScreen"
                onClick={() => switchFilter("")}>
            </div>
            <div className="mediaFilterBox colFlex">
                {filter}
            </div>
        </div>
    )
}