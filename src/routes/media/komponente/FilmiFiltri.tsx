export default function FilmiFiltri(
    { filter, switchFilter }:
        {
            filter: JSX.Element,
            switchFilter(el: string): void
        }
) {

    return (
        <div className="mediaFilterPosition">
            <div
                className="mediaFilterScreen"
                onClick={() => switchFilter("")}>
            </div>
            <div className="mediaFilterBox">
                {filter}
            </div>
        </div>
    )
}