import { useEffect, useState } from "react"

export default function TextArea({ id, defaultContent, name, register, required, maxLength, watch }:
    {
        id: string,
        defaultContent?: string,
        name?: string,
        register?: any,
        required?: boolean,
        maxLength?: number,
        watch?(name: string): void,
    }
) {

    const [content, setContent] = useState(defaultContent ? defaultContent : "");

    const styleBox = {
        display: "flex",
        justifyContent: "center",
        width: "100%",
    }

    const style = {
        fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
        fontSize: "1.1rem",
        fontWeight: "600",
        width: "100%",
        marginTop: "0.4em",
        border: "none",
        borderRadius: "7px",
        boxShadow: "inset 0 0 10px 1px rgba(0, 0, 0, 0.6)",
        outline: "none",
        padding: "14px 20px",
        backgroundColor: "rgba(255, 192, 203, 0.7)",
        overflow: "hidden",
        resize: "none",
        transition: "0.5s",
    }

    useEffect(() => {
        const el = document.getElementById(id);
        if (el) {
            const elSize = el.scrollHeight;
            el.style.height = `${elSize}px`;
            el.addEventListener("keyup", (e) => eventListener(e));
            return () => { el.removeEventListener("keyup", eventListener) }
        }
    }, [])

    const eventListener = () => {
        const el: HTMLTextAreaElement | null = document.getElementById(id);
        if (el) {
            if (maxLength) {
                const value = el.value.length;
                if (value >= maxLength) {
                    el.style.boxShadow = "inset 0 0 10px 1px rgba(200, 0, 0, 1)"
                    return;
                } else if (value <= maxLength - 1) {
                    el.style.boxShadow = "inset 0 0 10px 1px rgba(0, 0, 0, 1)"
                }
            }
            el.style.height = "auto";
            const elSize = el.scrollHeight;
            el.style.height = `${elSize}px`;
        }
    }

    const handleFocus = () => {
        const el: HTMLTextAreaElement | null = document.getElementById(id);
        if (el) {
            if (maxLength) {
                const value = el.value.length;
                if (value >= maxLength) {
                    el.style.boxShadow = "inset 0 0 10px 1px rgba(200, 0, 0, 1)"
                    return;
                } else {
                    el.style.boxShadow = "inset 0 0 10px 1px rgba(0, 0, 0, 1)"
                }
            } else {
                el.style.boxShadow = "inset 0 0 10px 1px rgba(0, 0, 0, 1)"
            }
        }
    }

    const handleUnfocus = () => {
        const el: HTMLTextAreaElement | null = document.getElementById(id);
        if (el) {
            if (maxLength) {
                const value = el.value.length;
                if (value < maxLength) {
                    el.style.boxShadow = "inset 0 0 10px 1px rgba(0, 0, 0, 0.6)"
                }
            } else {
                el.style.boxShadow = "inset 0 0 10px 1px rgba(0, 0, 0, 0.6)"
            }
        }
    }

    const handleMaxLength = () => {
        const el: HTMLTextAreaElement | null = document.getElementById(id);
        if (el) {
            if (maxLength) {
                const value = el.value.length;
                if (value <= maxLength) {
                    setContent(el.value);
                } else {
                    el.value = content;
                }
            }
        }
    }

    return (<>
        <div
            style={styleBox}>
            <textarea
                id={id}
                className="editTextArea"
                style={style}
                onKeyUp={() => handleMaxLength()}
                onFocus={() => handleFocus()}
                value={!name ? content : undefined}
                {...register ? {
                    ...register(name, {
                        required: required ? true : false,
                        maxLength: maxLength ? maxLength : undefined,
                        onBlur: () => handleUnfocus(),
                    })
                } : {}}
            />
        </div>
    </>)
}