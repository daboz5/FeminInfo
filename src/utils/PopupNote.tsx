export default function PopupNote(
    { id, notes }: {
        id: string,
        notes: string[]
    }
) {

    const popupToggle = () => {
        const el = document.getElementById(id + "Pop");
        if (el) {
            if (el.style.visibility === "visible") {
                el.style.visibility = "hidden";
                el.style.pointerEvents = "none";
                el.style.animation = "fadeOut 0.5s";
            } else {
                el.style.visibility = "visible";
                el.style.pointerEvents = "auto";
                el.style.animation = "fadeIn 0.5s";
            }
        }
    }

    return (
        <div
            className="popupBtn"
            onClick={() => popupToggle()}>
            <span>?</span>
            <span
                id={id + "PopId"}
                key={id + "Key"}
                className="popup">
                {notes.map(
                    (note, index, thisArr) => {
                        if (thisArr.length === index + 1) {
                            return <>
                                <>{note}</>
                            </>
                        } else {
                            return <>
                                <>{note}</>
                                <br />
                            </>
                        }
                    })
                }
            </span>
        </div>
    )
}