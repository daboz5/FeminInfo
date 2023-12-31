import { Library, Ratings } from "../../../type";
import { useState } from "react";
import useFemStore from "../../../useFemStore";
import toast from "react-hot-toast";

export default function useComponent() {

    const {
        libFilm,
        libIgra,
        libKanal,
        libKnjiga,
        libOddaja,
        libOrganizacija,
        libRevija,
        libStran,
        backupLibFilm,
        backupLibIgra,
        backupLibKanal,
        backupLibKnjiga,
        backupLibOddaja,
        backupLibOrganizacija,
        backupLibRevija,
        backupLibStran,
        setLibFilm,
        setLibIgra,
        setLibKanal,
        setLibKnjiga,
        setLibOddaja,
        setBackupLibOrganizacija,
        setLibRevija,
        setLibStran
    } = useFemStore();

    const [filter, setFilter] = useState("");
    const [editing, setEditing] = useState(false);

    const calcFame = (ratings: Ratings) => {
        const fame: number = (
            (ratings.oks * 1) +
            (ratings.likes * 2) +
            (ratings.loves * 3) -
            (ratings.dislikes * 2) -
            (ratings.hates * 3)
        );
        return fame;
    }

    const splitInput = (input: string) => {
        if (!input) { return [] }

        const splitStep1 = input.split(",");
        const splitStep2: string[] = [];
        splitStep1.forEach((el) => {
            {
                if (el.includes(";")) {
                    const newArr = el.split(";");
                    newArr.forEach((el) => {
                        splitStep2.push(el);
                    })
                } else {
                    splitStep2.push(el);
                }
            }
        })

        const cleanInput = splitStep2.map((el) => {
            const uncleanArr = el.split("");
            while (uncleanArr[0] === " ") { uncleanArr.shift() }
            while (uncleanArr[uncleanArr.length - 1] === " ") { uncleanArr.pop() }
            return uncleanArr.join("");
        })

        return cleanInput;
    }

    const handleType = (
        elValue: string | undefined,
        elCheck: boolean,
        setValue
    ) => {
        if (!elValue || elValue !== "soc" && elValue !== "woke" && elValue !== "lib") {
            return;
        }
        const els: HTMLCollectionOf<HTMLImageElement> = document.getElementsByClassName("editFemTypeImg");

        for (let i = 0; i < els.length; i++) {
            els[i].style.boxShadow = "0 0 0 0 black";
        }
        elCheck ? setValue("femType", elValue) : setValue("femType", "")
        elCheck ?
            elValue === "soc" ?
                els[0].style.boxShadow = "0 0 10px 5px black" :
                elValue === "woke" ?
                    els[1].style.boxShadow = "0 0 10px 5px black" :
                    elValue === "lib" ?
                        els[2].style.boxShadow = "0 0 10px 5px black" :
                        {} :
            {}
    }

    const handlePicChange = (file: File, setPic: (imgPreview: string) => void) => {
        if (!file) { return }
        if (file.size > 2000000) {
            toast.error(
                `Največja dovoljena velikost je 2 Mb.`
            );
        } else {
            const imgPreview = URL.createObjectURL(file);
            setPic(imgPreview);
        }
    }

    // FILTERS

    const selectBackup = (lib: Library) => {
        switch (lib) {
            case "film":
                return backupLibFilm;
            case "igra":
                return backupLibIgra;
            case "kanal":
                return backupLibKanal;
            case "knjiga":
                return backupLibKnjiga;
            case "oddaja":
                return backupLibOddaja;
            case "org":
                return backupLibOrganizacija;
            case "revija":
                return backupLibRevija;
            case "stran":
                return backupLibStran;
        }
    }

    const selectLib = (lib: Library) => {
        switch (lib) {
            case "film":
                return libFilm;
            case "igra":
                return libIgra;
            case "kanal":
                return libKanal;
            case "knjiga":
                return libKnjiga;
            case "oddaja":
                return libOddaja;
            case "org":
                return libOrganizacija;
            case "revija":
                return libRevija;
            case "stran":
                return libStran;
        }
    }

    const selectSetLibrary = (lib: Library, content) => {
        switch (lib) {
            case "film":
                setLibFilm(content);
                break;
            case "igra":
                setLibIgra(content);
                break;
            case "kanal":
                setLibKanal(content);
                break;
            case "knjiga":
                setLibKnjiga(content);
                break;
            case "oddaja":
                setLibOddaja(content);
                break;
            case "org":
                setBackupLibOrganizacija(content);
                break;
            case "revija":
                setLibRevija(content);
                break;
            case "stran":
                setLibStran(content);
                break;
        }
    }

    const sortAZ = (lib: Library) => {
        const selection = selectBackup(lib);
        return selection.sort(
            (a, b) => {
                const titleA = a.title.toUpperCase();
                const titleB = b.title.toUpperCase();
                if (titleA < titleB) {
                    return -1;
                }
                if (titleA > titleB) {
                    return 1;
                }
                return 0;
            })
    }

    const sortZA = (lib: Library) => {
        const selection = selectBackup(lib);
        return selection.sort(
            (a, b) => {
                const titleA = a.title.toUpperCase();
                const titleB = b.title.toUpperCase();
                if (titleA < titleB) {
                    return 1;
                }
                if (titleA > titleB) {
                    return -1;
                }
                return 0;
            })
    }

    const sort19Year = (lib: Library) => {
        const selection = selectBackup(lib);
        return selection.sort(
            (a, b) => {

                let yearA: number;
                let yearB: number;
                switch (lib) {
                    case "film":
                        yearA = a.year.start;
                        yearB = b.year.start;
                        break;
                    case "igra":
                        yearA = a.year;
                        yearB = b.year;
                        break;
                    case "kanal":
                        yearA = a.firstAir;
                        yearB = b.firstAir;
                        break;
                    case "knjiga":
                        yearA = a.published;
                        yearB = b.published;
                        break;
                    case "oddaja":
                        yearA = a.firstAir;
                        yearB = b.firstAir;
                        break;
                    case "org":
                        yearA = a.founded;
                        yearB = b.founded;
                        break;
                    case "revija":
                        yearA = a.start;
                        yearB = b.start;
                        break;
                    default:
                        yearA = 1;
                        yearB = 2;
                        break;
                }

                if (typeof yearA === "number" && typeof yearB === "number") {
                    return yearB - yearA;
                } else if (typeof yearA === "undefined" && typeof yearB === "undefined") {
                    return 1;
                } else if (typeof yearA === "number") {
                    return -1;
                } else if (typeof yearB === "number") {
                    return 1;
                } else {
                    return 1;
                }
            })
    }

    const sort91Year = (lib: Library) => {
        const selection = selectBackup(lib);
        return selection.sort(
            (a, b) => {

                let yearA: number;
                let yearB: number;
                switch (lib) {
                    case "film":
                        yearA = a.year.start;
                        yearB = b.year.start;
                        break;
                    case "igra":
                        yearA = a.year;
                        yearB = b.year;
                        break;
                    case "kanal":
                        yearA = a.firstAir;
                        yearB = b.firstAir;
                        break;
                    case "oddaja":
                        yearA = a.firstAir;
                        yearB = b.firstAir;
                        break;
                    case "org":
                        yearA = a.founded;
                        yearB = b.founded;
                        break;
                    case "revija":
                        yearA = a.start;
                        yearB = b.start;
                        break;
                    case "stran":
                        yearA = a.year;
                        yearB = b.year;
                        break;
                    default:
                        yearA = 1;
                        yearB = 2;
                        break;
                }

                if (typeof yearA === "number" && typeof yearB === "number") {
                    return yearA - yearB;
                } else if (typeof yearA === "undefined" && typeof yearB === "undefined") {
                    return -1;
                } else if (typeof yearA === "number") {
                    return 1;
                } else if (typeof yearB === "number") {
                    return -1;
                } else {
                    return -1;
                }
            })
    }

    const sort19Fame = (lib: Library) => {
        const selection = selectBackup(lib);
        return selection.sort(
            (a, b) => {
                const fameA = calcFame(a.ratings);
                const fameB = calcFame(b.ratings);
                if (typeof fameA === "number" && typeof fameB === "number") {
                    return fameB - fameA;
                } else if (typeof fameA === "undefined" && typeof fameB === "undefined") {
                    return 1;
                } else if (typeof fameA === "number") {
                    return -1;
                } else if (typeof fameB === "number") {
                    return 1;
                } else {
                    return 1;
                }
            })
    }

    const sort91Fame = (lib: Library) => {
        const selection = selectBackup(lib);
        return selection.sort(
            (a, b) => {
                const fameA = calcFame(a.ratings);
                const fameB = calcFame(b.ratings);
                if (typeof fameA === "number" && typeof fameB === "number") {
                    return fameA - fameB;
                } else if (typeof fameA === "undefined" && typeof fameB === "undefined") {
                    return -1;
                } else if (typeof fameA === "number") {
                    return 1;
                } else if (typeof fameB === "number") {
                    return -1;
                } else {
                    return -1;
                }
            })
    }

    const typeFilter = (lib: Library, querry: string) => {
        const selection = selectBackup(lib);
        const result = selection.filter((el) => el.femType === querry);
        selectSetLibrary(lib, result);
    }

    const searchRegexCreator = (querry: string) => {
        const regArr: string[] = [];
        for (let i = 0; i < querry.length; i++) {
            const part1 = querry.slice(0, i);
            const part2 = querry.slice(i + 1, querry.length);
            const newRegex = part1 + "." + part2;
            regArr.unshift(newRegex.toUpperCase());
        }
        return regArr;
    }

    const searchRegexTitleFilter = (lib: Library, regArr: string[]) => {
        const selection = selectBackup(lib);
        const filtered = selection.filter(
            (el) => {
                const title = el.title.toUpperCase();
                const matches: string[] = [];
                regArr.forEach((regex) => {
                    const result = title.search(new RegExp(regex));
                    if (result > -1) {
                        matches.push(regex);
                    }
                })
                if (matches.length > 0) {
                    return el;
                }
            }
        );
        return filtered;
    }

    const simpleFilter = (lib: Library, querry: string) => {
        if (!querry) { return toast.error(`Neveljaven vnos.`) }

        const regArr = searchRegexCreator(querry);
        const result = searchRegexTitleFilter(lib, regArr);
        if (result) { selectSetLibrary(lib, result) }
    }

    const complexFilter = (lib: Library, querry: string) => {
        if (!querry) { return toast.error(`Neveljaven vnos.`) }

        const checkRegex = /[^\w\sčžšćđ,]/
        const error = querry.search(checkRegex);
        if (error > -1) {
            return toast.error(`Neveljaven vnos.`);
        }

        const querryArr = querry.toUpperCase().split("");
        const filteredArr = querryArr.filter((el) => el !== ",");
        const noRepeats = filteredArr.filter(
            (el, index) => {
                return filteredArr.indexOf(el) === index;
            });

        const selection = selectBackup(lib);
        const result = selection.filter(
            (el) => {
                const match = el.title[0];
                for (let i = 0; i < noRepeats.length; i++) {
                    if (match === noRepeats[i]) {
                        return el;
                    }
                }
            }
        );
        if (result) { selectSetLibrary(lib, result) }
    }

    const fameFilter = (lib: Library, querry1?: string, querry2?: string) => {

        if (!querry1 && !querry2) { return }
        const invalidInput1 = querry1?.search(/[.]/);
        const invalidInput2 = querry2?.search(/[.]/);
        if (invalidInput1 !== -1 || invalidInput2 !== -1) {
            toast.error("Dovoljena so le cela števila.");
            return;
        }

        const min = querry1 ? Number(querry1) : undefined;
        const max = querry2 ? Number(querry2) : undefined;

        if (min || max) {
            const selection = selectBackup(lib);
            const result = selection.filter((el) => {
                const fame = calcFame(el.ratings);
                if (fame) {
                    if (min && max) {
                        if (min && max && min > max && fame <= min && fame >= max) {
                            return el;
                        } else if (fame >= min && fame <= max) {
                            return el;
                        }
                    }
                    if (min && !max && fame >= min) {
                        return el;
                    }
                    if (!min && max && fame <= max) {
                        return el;
                    }
                }
            })
            if (result) { selectSetLibrary(lib, result) }
        }
    }

    return {
        filter,
        editing,
        setFilter,
        setEditing,
        calcFame,
        splitInput,
        handleType,
        handlePicChange,
        selectBackup,
        selectSetLibrary,
        sortAZ,
        sortZA,
        sort19Year,
        sort91Year,
        sort19Fame,
        sort91Fame,
        typeFilter,
        searchRegexCreator,
        searchRegexTitleFilter,
        simpleFilter,
        complexFilter,
        fameFilter,
    }
}