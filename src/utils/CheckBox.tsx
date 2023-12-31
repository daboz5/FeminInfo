import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Checkbox(
    { boxClass, checkId, checkClass, preChecked, beforeText, afterText, limit, register, watch }:
        {
            boxClass: string,
            checkId: string,
            checkClass: string,
            preChecked?: boolean,
            beforeText?: string,
            afterText?: string,
            limit?: {
                context: string,
                max: number
            },
            register?: any,
            watch?: any,
        }
) {
    const [checked, setChecked] = useState(preChecked ? true : false)
    let mouseOver = false;

    const unseenId = checkId + "_checkbox"
    const unseenStyle = { display: "none" } //change to see true checkbox

    const seenStyle = {
        height: "25px",
        minHeight: "25px",
        width: "25px",
        minWidth: "25px",
        borderRadius: "8px",
        transition: "0.3s"
    }

    const styleOn = "rgba(102, 51, 153, 1)";
    const styleOff = "rgba(102, 51, 153, 0.5)";

    useEffect(() => {
        if (limit) {
            handleLimit();
        }
        const checkbox: HTMLInputElement = document.getElementById(`${unseenId}`);
        if (checkbox) {
            checkbox.addEventListener('change', () => eventListener(checkbox))
        }
        if (checkbox) {
            return checkbox.removeEventListener('change', () => eventListener(checkbox))
        }
    }, [])

    const eventListener = (el: HTMLInputElement) => {
        const seenEl = document.getElementById(checkId);
        if (seenEl) {
            if (el.checked) {
                mouseOver ?
                    seenEl.style.backgroundColor = "rgba(102, 51, 153, 0.8)" :
                    seenEl.style.backgroundColor = styleOn
                setChecked(true);
            } else {
                mouseOver ?
                    seenEl.style.backgroundColor = "rgba(102, 51, 153, 0.7)" :
                    seenEl.style.backgroundColor = styleOff
                setChecked(false);
            }
        }
        if (limit) {
            handleLimit();
        }
    }

    const handleMouseOver = () => {
        const seenEl = document.getElementById(checkId);
        if (seenEl) {
            checked ?
                seenEl.style.backgroundColor = "rgba(102, 51, 153, 0.8)" :
                seenEl.style.backgroundColor = "rgba(102, 51, 153, 0.7)"
        }
        mouseOver = true;
    }

    const handleLeave = () => {
        const seenEl = document.getElementById(checkId);
        if (seenEl) {
            checked ?
                seenEl.style.backgroundColor = styleOn :
                seenEl.style.backgroundColor = styleOff
        }
        mouseOver = false;
    }

    const overLimitCheck = () => {
        if (limit) {
            const unseenEl: HTMLInputElement = document.getElementById(unseenId);
            if (unseenEl.disabled) {
                toast.error(`Največ ${limit.max} izbir${limit.max === 1 ? "a" :
                    limit.max === 2 ? "i" :
                        limit.max === 3 ? "e" :
                            limit.max === 4 ? "e" :
                                ""
                    }.`)
            }
        }
    }

    const handleLimit = () => {
        if (limit) {
            const elGroup: HTMLCollectionOf<HTMLInputElement> = document.getElementsByClassName(limit.context);

            let numOfChecked = 0;
            for (let i = 0; i < elGroup.length; i++) {
                elGroup[i].checked ? numOfChecked++ : {}
            }

            if (numOfChecked >= limit.max) {
                const elId = document.getElementById(unseenId)?.id;
                for (let i = 0; i < elGroup.length; i++) {
                    if (elId !== elGroup[i].id) {
                        !elGroup[i].checked ? elGroup[i].disabled = true : {}
                    }
                }
            } else if (numOfChecked < limit.max) {
                for (let i = 0; i < elGroup.length; i++) {
                    !elGroup[i].checked ? elGroup[i].disabled = false : {}
                }
            }
        }
    }

    return (
        <div className={boxClass}>
            <label style={{ cursor: "pointer", alignItems: "center" }}>
                {
                    beforeText ?
                        <p style={{ cursor: "pointer" }}
                            onMouseOver={() => handleMouseOver()}
                            onMouseLeave={() => handleLeave()}>
                            {beforeText}
                        </p> :
                        <></>
                }
                <span
                    id={checkId}
                    style={{
                        ...seenStyle,
                        backgroundColor: checked ?
                            styleOn :
                            styleOff
                    }}
                    onClick={() => overLimitCheck()}
                    onMouseOver={() => handleMouseOver()}
                    onMouseLeave={() => handleLeave()}>
                </span>
                <input
                    type="checkbox"
                    id={unseenId}
                    className={checkClass}
                    style={unseenStyle}
                    {...register ? { ...register(checkId) } : {}}>
                </input>
                {
                    afterText ?
                        <p style={{ cursor: "pointer" }}
                            onMouseOver={() => handleMouseOver()}
                            onMouseLeave={() => handleLeave()}>
                            {afterText}
                        </p> :
                        <></>
                }
            </label>
        </div>
    )
}