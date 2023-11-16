import { UseFormSetValue } from "react-hook-form";
import { useState } from "react";
import { Igra, IgraForm, IgraGenre } from "../../../type"
import useFemStore from "../../../useFemStore";
import useComponent from "./useComponent";
import toast from "react-hot-toast";

export default function useIgra() {

    const igraTypes: {
        name: IgraGenre;
        register: string;
    }[] = [
            {
                name: "4X",
                register: "fourx"
            },
            {
                name: "Akcija",
                register: "akcija"
            },
            {
                name: "Anime",
                register: "anime"
            },
            {
                name: "Arkadna",
                register: "arkadna"
            },
            {
                name: "Avantura",
                register: "avantura"
            },
            {
                name: "Bojevanje",
                register: "bojevanje"
            },
            {
                name: "Co-op",
                register: "coop"
            },
            {
                name: "Fantazija",
                register: "fantazija"
            },
            {
                name: "Golota",
                register: "golota"
            },
            {
                name: "Grozljivka",
                register: "grozljivka"
            },
            {
                name: "Igra vlog",
                register: "rpg"
            },
            {
                name: "Karte",
                register: "karte"
            },
            {
                name: "Miselnica",
                register: "miselnica"
            },
            {
                name: "Misterija",
                register: "misterija"
            },
            {
                name: "MMO",
                register: "mmo"
            },
            {
                name: "Preživetvena",
                register: "preživetvena"
            },
            {
                name: "Simulator",
                register: "simulator"
            },
            {
                name: "Slovanska",
                register: "slovanska"
            },
            {
                name: "Sproščena",
                register: "sproscena"
            },
            {
                name: "Strategija",
                register: "strategija"
            },
            {
                name: "Streljanje",
                register: "streljanje"
            },
            {
                name: "Športna",
                register: "sportna"
            },
            {
                name: "Upravljanje",
                register: "upravljanje"
            },
            {
                name: "Vesolje",
                register: "vesolje"
            },
            {
                name: "Virtualni roman",
                register: "vnovel"
            },
            {
                name: "Zgodbovnica",
                register: "zgodbovnica"
            },
            {
                name: "Zmenkarjenje",
                register: "zmenkarjenje"
            },
        ]

    const igraLenghts = [
        "kratka",
        "dolga",
        "brezkončna"
    ]

    const igraExtra = [
        "DLC",
        "film",
        "publikacije",
        "mikrotranzakcije",
    ]

    const testLib: Igra[] = [
        {
            title: "Tales of Berseria",
            year: 2017,
            content: {
                length: undefined,
                bonus_content: {
                    dlc: true,
                    microtransactions: false,
                    movie: false,
                    publication: false
                }
            },
            img: undefined,
            platforms: ["Windows", "PlayStation 4", "PlayStation 3"],
            developer: "BANDAI NAMCO Studios Inc.",
            publisher: "BANDAI NAMCO Entertainment",
            others: ["Direktor Yoshimasa Tanaka", "Producent Yasuhiro Fukaya", "Snovalec Tatsuro Udo", "Umetnik Mutsumi Inomata", "Umetnik Kōsuke Fujishima", "Umetnik Minoru Iwamoto", "Umetnik Daigo Okumura", "Writer Naoki Yamamoto", "Composer	Motoi Sakuraba"],
            genre: ["Anime", "Igra vlog", "Zgodbovnica", "Akcija", "Avantura"],
            femType: "lib",
            explanation: "Protagonistki je odvzeto vse in namerava se maščevati. Med iskanjem načina za maščevanje mora ugotoviti koliko je pripravljena žrtvovati in kaj bo od nje po maščevanju ostalo. Odlikuje jo moč, volja ter odločnost.",
            description: "Players embark on a journey of self-discovery as they assume the role of Velvet, a young woman whose once kind demeanor has been replaced and overcome with a festering anger and hatred after a traumatic experience three years prior to the events within Tales of Berseria.",
            ratings: {
                loves: 1,
                likes: 0,
                oks: 0,
                dislikes: 0,
                hates: 0
            }
        }, {
            title: "Black Book",
            year: 2021,
            content: {
                length: "dolga",
                bonus_content: {
                    dlc: true,
                    microtransactions: false,
                    movie: false,
                    publication: false
                }
            },
            img: undefined,
            platforms: ["Windows", "Linux", "OS X", "Nintendo Switch", "PlayStation 4"],
            developer: "Morteshka",
            publisher: "HypeTrain Digital",
            others: [],
            genre: ["Karte", "Igra vlog", "Zgodbovnica", "Strategija"],
            femType: undefined,
            explanation: "",
            description: "",
            ratings: {
                loves: 0,
                likes: 0,
                oks: 0,
                dislikes: 0,
                hates: 0
            }
        }, {
            title: "UNSIGHTED",
            year: 2021,
            content: {
                length: "dolga",
                bonus_content: {
                    dlc: false,
                    microtransactions: false,
                    movie: false,
                    publication: false
                }
            },
            img: undefined,
            platforms: [],
            developer: "",
            publisher: "",
            others: [],
            genre: [],
            femType: "lib",
            explanation: "",
            description: "EXPLORE YOUR WAY. Awoken to a world ruined by war, Alma must traverse the vast city of Arcadia before the life force of her friends and herself withers away. Time is ticking, and every moment matters. Who will you save, and who will you leave to turn UNSIGHTED?",
            ratings: {
                loves: 0,
                likes: 0,
                oks: 0,
                dislikes: 0,
                hates: 0
            }
        }
    ]

    const [selected, setSelected] = useState<Igra | null>(null);
    const [pic, setPic] = useState(selected?.img);

    const {
        backupLibIgra,
        setLibIgra,
    } = useFemStore();

    const {
        calcFame,
        splitInput
    } = useComponent();

    const sortAZ = (content?: Igra[]) => {
        const selection: Igra[] = content ? content : backupLibIgra;
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

    const sortZA = (content?: Igra[]) => {
        const selection: Igra[] = content ? content : backupLibIgra;
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

    const sort19Fame = (content?: Igra[]) => {
        const selection: Igra[] = content ? content : backupLibIgra;
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

    const sort91Fame = (content?: Igra[]) => {
        const selection: Igra[] = content ? content : backupLibIgra;
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

    const sort19Year = (content?: Igra[]) => {
        const selection: Igra[] = content ? content : backupLibIgra;
        return selection.sort(
            (a, b) => {
                const yearA = a.year;
                const yearB = b.year;
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

    const sort91Year = (content?: Igra[]) => {
        const selection: Igra[] = content ? content : backupLibIgra;
        return selection.sort(
            (a, b) => {
                const yearA = a.year;
                const yearB = b.year;
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

    const searchRegexTitleFilter = (regArr: string[]) => {
        const filtered = backupLibIgra?.filter(
            (igra) => {
                const title = igra.title.toUpperCase();
                const maches: string[] = [];
                regArr.forEach((regex) => {
                    const result = title.search(new RegExp(regex));
                    if (result > -1) {
                        maches.push(regex);
                    }
                })
                if (maches.length > 0) {
                    return igra;
                }
            }
        );
        return filtered;
    }

    const searchRegexOmniFilter = (regArr: string[]) => {
        const filtered = backupLibIgra.filter(
            (igra) => {
                const title = igra.title.toUpperCase();
                const year = igra.year;
                const developer = igra.developer;
                const publisher = igra.publisher;
                const others = igra.others.join(",").toUpperCase();
                const explanation = igra.explanation.toUpperCase();
                const description = igra.description.toUpperCase();
                const joined = `
                    ${title ? title : ""};
                    ${year ? year : ""};
                    ${developer ? developer : ""};
                    ${publisher ? publisher : ""};
                    ${others ? others : ""};
                    ${explanation ? explanation : ""};
                    ${description ? description : ""}`
                const maches: string[] = [];
                regArr.forEach((regex) => {
                    const result = joined.search(new RegExp(regex));
                    if (result > -1) {
                        maches.push(regex);
                    }
                })
                if (maches.length > 0) {
                    return igra;
                }
            }
        );
        return filtered;
    }

    const omniFilter = (querry: string) => {
        if (!querry) { return toast.error(`Neveljaven vnos.`) }

        const regArr = searchRegexCreator(querry);
        const result = searchRegexOmniFilter(regArr);
        result ? setLibIgra(result) : {}
    }

    const simpleFilter = (querry: string) => {
        if (!querry) { return toast.error(`Neveljaven vnos.`) }

        const regArr = searchRegexCreator(querry);
        const result = searchRegexTitleFilter(regArr);
        result ? setLibIgra(result) : {}
    }

    const complexFilter = (querry: string) => {
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

        const result = backupLibIgra?.filter(
            (el) => {
                const match = el.title[0];
                for (let i = 0; i < noRepeats.length; i++) {
                    if (match === noRepeats[i]) {
                        return el;
                    }
                }
            }
        );
        result ? setLibIgra(result) : {}
    }

    const yearFilter = (querry1?: string, querry2?: string) => {
        if (!querry1 && !querry2) { return }
        const invalidInput1 = querry1?.search(/[.]/);
        const invalidInput2 = querry2?.search(/[.]/);
        if (invalidInput1 !== -1 || invalidInput2 !== -1) {
            toast.error("Dovoljena so le cela števila.");
            return;
        }

        const min = querry1 ? Number(querry1) : undefined;
        const max = querry2 ? Number(querry2) : undefined;

        const currentYear = new Date().getFullYear();
        if (min) {
            if (min < 1950 || min > currentYear) {
                if (min < 1950) {
                    toast.error(`Neveljavni iskalni nabor.
                    Prva znana igra je izdelana leta 1950.`);
                    return;
                }
                if (min > currentYear) {
                    toast.error(`Neveljavni iskalni nabor.
                    Baza zaenkrat ne vsebuje iger iz leta ${min}.
                    Ponovno poskusite v prihodnosti.`);
                    return;
                }
            }
        }
        if (max) {
            if (max < 1950 || max > currentYear) {
                if (max < 1950) {
                    toast.error(`Neveljavni iskalni nabor.
                    Prva znana igra je izdelana leta 1950.`);
                    return;
                }
                if (max > currentYear) {
                    toast.error(`Neveljavni iskalni nabor.
                    Baza zaenkrat ne vsebuje iger iz leta ${min}.
                    Ponovno poskusite v prihodnosti.`);
                    return;
                }
            }
        }

        if (min || max) {
            const result = testLib.filter((igra) => {
                const year = igra.year;
                if (year) {
                    if (min && max) {
                        if (min && max && min > max && year <= min && year >= max) {
                            return igra;
                        } else if (year >= min && year <= max) {
                            return igra;
                        }
                    }
                    if (min && !max && year >= min) {
                        return igra;
                    }
                    if (!min && max && year <= max) {
                        return igra;
                    }
                }
            })
            setLibIgra(result);
        }
    }

    const typeFilter = (querry: string, content?: Igra[]) => {
        const selection = content ? content : testLib;
        const result = selection.filter((igra) => igra.femType === querry);
        setLibIgra(result);
    }

    const fameFilter = (querry1?: string, querry2?: string) => {
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
            const result = testLib.filter((igra) => {
                const fame = calcFame(igra.ratings);
                if (fame) {
                    if (min && max) {
                        if (min && max && min > max && fame <= min && fame >= max) {
                            return igra;
                        } else if (fame >= min && fame <= max) {
                            return igra;
                        }
                    }
                    if (min && !max && fame >= min) {
                        return igra;
                    }
                    if (!min && max && fame <= max) {
                        return igra;
                    }
                }
            })
            setLibIgra(result);
        }
    }

    const setGrid = (content: Igra) => {
        if (content) {
            let type = false;
            let creators = false;
            let explain = false;
            if (content.genre.length > 0 || content.femType) { type = true; }
            if (content.developer || content.publisher || content.others.length > 0) { creators = true; }
            if (content.explanation) { explain = true; }

            if (type && creators && explain) { return 0 }
            if (!type && creators && explain) { return 1 }
            if (type && !creators && explain) { return 2 }
            if (type && creators && !explain) { return 3 }
            if (!type && !creators && explain) { return 4 }
            if (type && !creators && !explain) { return 5 }
            if (!type && creators && !explain) { return 6 }
            if (!type && !creators && !explain) { return 7 }
        }
        return 0
    }

    const bonusContentCheck = (content: Igra) => {
        if (
            content?.content.bonus_content.dlc ||
            content?.content.bonus_content.microtransactions ||
            content?.content.bonus_content.movie ||
            content?.content.bonus_content.publication
        ) {
            return true;
        } else {
            return false
        }
    }

    const handleType = (
        elValue: string | undefined,
        elCheck: boolean,
        setValue: UseFormSetValue<IgraForm>
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

    const defFormValues = (igra: Igra | null): IgraForm | undefined => {
        if (!igra) return;

        const defValues = {
            title: igra.title,
            year: igra.year,
            kratka: igra.content.length === "kratka" ? true : false,
            dolga: igra.content.length === "dolga" ? true : false,
            brezkončna: igra.content.length === "brezkončna" ? true : false,
            dlc: igra.content.bonus_content.dlc,
            mikrotranzakcije: igra.content.bonus_content.microtransactions,
            film: igra.content.bonus_content.movie,
            publikacije: igra.content.bonus_content.publication,
            femType: igra.femType ? igra.femType : undefined,
            windows: igra?.platforms.find(gen => gen === "Windows") ? true : false,
            osx: igra?.platforms.find(gen => gen === "OS X") ? true : false,
            linux: igra?.platforms.find(gen => gen === "Linux") ? true : false,
            ps: igra?.platforms.find(gen => gen === "PlayStation") ? true : false,
            ps2: igra?.platforms.find(gen => gen === "PlayStation 2") ? true : false,
            ps3: igra?.platforms.find(gen => gen === "PlayStation 3") ? true : false,
            ps4: igra?.platforms.find(gen => gen === "PlayStation 4") ? true : false,
            ps5: igra?.platforms.find(gen => gen === "PlayStation 5") ? true : false,
            xboxone: igra?.platforms.find(gen => gen === "Xbox One") ? true : false,
            ninswitch: igra?.platforms.find(gen => gen === "Nintendo Switch") ? true : false,
            mobitel: igra?.platforms.find(gen => gen === "Mobitel") ? true : false,
            drugo: igra?.platforms.find(gen => gen === "Drugo") ? true : false,
            direction: igra?.developer,
            actors: igra?.publisher,
            others: igra?.others.join(", "),
            explanation: igra?.explanation,
            description: igra?.description,
        };

        igraTypes.forEach(
            type => {
                const value = igra.genre.find(gen => gen === type.name) ? true : false;
                defValues[type.register] = value;
            }
        );
        return defValues;
    }

    const handlePicChange = (file: File) => {
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

    const onSubmit = (data) => {

        const genreFilter = () => {
            const result: IgraGenre[] = [];
            data.akcija ? result.push("Akcija") : {};
            data.avantura ? result.push("Avantura") : {};
            data.drama ? result.push("Drama") : {};
            data.dokumentarec ? result.push("Dokumentarec") : {};
            data.fantazija ? result.push("Fantazija") : {};
            data.grozljivka ? result.push("Grozljivka") : {};
            data.isekai ? result.push("Isekai") : {};
            data.komedija ? result.push("Komedija") : {};
            data.kriminalka ? result.push("Kriminalka") : {};
            data.misterija ? result.push("Misterija") : {};
            data.romantika ? result.push("Romantika") : {};
            data.satira ? result.push("Satira") : {};
            data.scifi ? result.push("Znanstvena fantastika") : {};
            data.triler ? result.push("Triler") : {};
            data.zgodovina ? result.push("Zgodovina") : {};
            return result;
        }

        const result: Igra = {
            title: data.title,
            year: {
                start: data.start,
                finish: data.finish === "" ? undefined : data.finish,
                unfinished: true
            },
            length: {
                average: data.average === "" ? undefined : data.average,
                episodes: data.episodes === "" ? undefined : data.episodes
            },
            img: pic ? pic : undefined,
            director: splitInput(data.direction),
            actors: splitInput(data.actors),
            others: splitInput(data.others),
            femType: data.femType === false ? undefined : data.femType,
            genre: genreFilter(),
            explanation: data.explanation,
            description: data.description,
            ratings: selected?.ratings ?
                selected.ratings :
                {
                    hates: 0,
                    dislikes: 0,
                    oks: 0,
                    likes: 0,
                    loves: 0
                }
            /*KASNEJE LOČI RATING, SICER BO ZADNJA SHRANJENA VERZIJA NADPISALA AKTIVNO VERZIJO*/
        }

        /* TUKAJ PRIDE KOMANDA ZA POŠILJANJE V PODATKOVNO BAZO */
        console.log(result);
    };

    return {
        pic,
        selected,
        testLib,
        igraTypes,
        igraExtra,
        igraLenghts,
        handlePicChange,
        onSubmit,
        handleType,
        defFormValues,
        setPic,
        setSelected,
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
        setGrid,
        bonusContentCheck,
    }
}