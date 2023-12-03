export default function PopupNote(
    { id, notes }: {
        id: string,
        notes: string[]
    }
) {

    const turnOn = () => {
        const target = document.getElementById(id + "Pop");
        if (target) {
            target.style.visibility = "visible";
            target.style.pointerEvents = "auto";
            target.style.animation = "fadeIn 0.5s";
        }
    }

    const turnOff = () => {
        const target = document.getElementById(id + "Pop");
        if (target) {
            target.style.visibility = "hidden";
            target.style.pointerEvents = "none";
            target.style.animation = "fadeOut 0.5s";
        }
    }

    const content = notes.map(
        (note, index, thisArr) => {
            if (thisArr.length !== index + 1) {
                return (
                    <span
                        key={id + index + "PopCon"}>
                        {note}
                        <br />
                    </span>
                )
            } else {
                return (
                    <span
                        key={id + index + "PopCon"}>
                        {note}
                    </span>
                )
            }
        });

    return (
        <div
            className="popupBtn"
            onMouseEnter={() => turnOn()}
            onMouseLeave={() => turnOff()}>
            <span>?</span>
            <span
                id={id + "Pop"}
                key={id + "Key"}
                className="popup">
                {content}
            </span>
        </div>
    )
}