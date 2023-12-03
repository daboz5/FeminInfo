import { useState } from "react";
import { GamePlatform, Igra, IgraForm, IgraGenre } from "../../../type"
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
                register: "športna"
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
        "mikrotransakcije",
    ]

    const igraPlatforms: {
        name: GamePlatform,
        register: string
    }[] = [
            {
                name: "Windows",
                register: "windows"
            },
            {
                name: "OS X",
                register: "osx"
            },
            {
                name: "Linux",
                register: "linux"
            },
            {
                name: "PlayStation 5",
                register: "ps5"
            },
            {
                name: "PlayStation 4",
                register: "ps4"
            },
            {
                name: "PlayStation 3",
                register: "ps3"
            },
            {
                name: "PlayStation 2",
                register: "ps2"
            },
            {
                name: "PlayStation",
                register: "ps"
            },
            {
                name: "Xbox One",
                register: "xboxone"
            },
            {
                name: "Nintendo Switch",
                register: "ninswitch"
            },
            {
                name: "Mobitel",
                register: "mobitel"
            },
            {
                name: "Drugo",
                register: "drugo"
            },
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
            others: ["Direktor Yoshimasa Tanaka", "Producent Yasuhiro Fukaya", "Snovalec Tatsuro Udo", "Umetnik Mutsumi Inomata", "Umetnik Kōsuke Fujishima", "Umetnik Minoru Iwamoto", "Umetnik Daigo Okumura", "Writer Naoki Yamamoto", "Composer Motoi Sakuraba"],
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
        },
        {
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
        },
        {
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
        splitInput,
        selectBackup,
        selectSetLibrary,
        searchRegexCreator,
    } = useComponent();

    const omniFilter = (querry: string) => {
        if (!querry) { return toast.error(`Neveljaven vnos.`) }

        const regArr = searchRegexCreator(querry);
        const result = searchRegexOmniFilter(regArr);
        if (result) { selectSetLibrary("igra", result) }
    }

    const searchRegexOmniFilter = (regArr: string[]) => {
        const selection: Igra[] = selectBackup("igra");
        const filtered = selection.filter(
            (igra) => {
                const title = igra.title.toUpperCase();
                const year = igra.year;
                const developer = igra.developer;
                const publisher = igra.publisher;
                const others = igra.others.join(",").toUpperCase();
                const genre = igra.genre?.join(",").toUpperCase();
                const explanation = igra.explanation.toUpperCase();
                const description = igra.description.toUpperCase();
                const joined = `
                ${title ? title : ""};
                ${year ? year : ""};
                ${developer ? developer : ""};
                ${publisher ? publisher : ""};
                ${others ? others : ""};
                ${genre ? genre : ""};
                    ${explanation ? explanation : ""};
                    ${description ? description : ""}`
                const matches: string[] = [];
                regArr.forEach((regex) => {
                    const result = joined.search(new RegExp(regex));
                    if (result > -1) {
                        matches.push(regex);
                    }
                })
                if (matches.length > 0) {
                    return igra;
                }
            }
        );
        return filtered;
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
            if (result) { selectSetLibrary("igra", result) }
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

    const defFormValues = (igra: Igra | null): IgraForm | undefined => {
        if (!igra) return;

        const defValues = {
            title: igra.title,
            year: igra.year,
            kratka: igra.content.length === "kratka" ? true : false,
            dolga: igra.content.length === "dolga" ? true : false,
            brezkončna: igra.content.length === "brezkončna" ? true : false,
            dlc: igra.content.bonus_content.dlc,
            mikrotransakcije: igra.content.bonus_content.microtransactions,
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
            developer: igra?.developer,
            publisher: igra?.publisher,
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

    const onSubmit = (data) => {
        if (!data) { return }

        const platformFilter = () => {
            const result: GamePlatform[] = [];
            data.windows ? result.push("Windows") : {};
            data.osx ? result.push("OS X") : {};
            data.linux ? result.push("Linux") : {};
            data.ps5 ? result.push("PlayStation 5") : {};
            data.ps4 ? result.push("PlayStation 4") : {};
            data.ps3 ? result.push("PlayStation 3") : {};
            data.ps2 ? result.push("PlayStation 2") : {};
            data.ps ? result.push("PlayStation") : {};
            data.xboxone ? result.push("Xbox One") : {};
            data.ninswitch ? result.push("Nintendo Switch") : {};
            data.mobitel ? result.push("Mobitel") : {};
            data.drugo ? result.push("Drugo") : {};
            return result
        }

        const genreFilter = () => {
            const result: IgraGenre[] = [];
            data.fourx ? result.push("4X") : {};
            data.akcija ? result.push("Akcija") : {};
            data.anime ? result.push("Anime") : {};
            data.arkadna ? result.push("Arkadna") : {};
            data.avantura ? result.push("Avantura") : {};
            data.bojevanje ? result.push("Bojevanje") : {};
            data.coop ? result.push("Co-op") : {};
            data.fantazija ? result.push("Fantazija") : {};
            data.golota ? result.push("Golota") : {};
            data.grozljivka ? result.push("Grozljivka") : {};
            data.rpg ? result.push("Igra vlog") : {};
            data.karte ? result.push("Karte") : {};
            data.miselnica ? result.push("Miselnica") : {};
            data.misterija ? result.push("Misterija") : {};
            data.mmo ? result.push("MMO") : {};
            data.preživetvena ? result.push("Preživetvena") : {};
            data.simulator ? result.push("Simulator") : {};
            data.slovanska ? result.push("Slovanska") : {};
            data.sproščena ? result.push("Sproščena") : {};
            data.strategija ? result.push("Strategija") : {};
            data.streljanje ? result.push("Streljanje") : {};
            data.športna ? result.push("Športna") : {};
            data.upravljanje ? result.push("Upravljanje") : {};
            data.vesolje ? result.push("Vesolje") : {};
            data.vnovel ? result.push("Virtualni roman") : {};
            data.zgodbovnica ? result.push("Zgodbovnica") : {};
            data.zmenkarjenje ? result.push("Zmenkarjenje") : {};
            return result;
        }

        const lengthFilter = () => {
            if (data.kratka) {
                return "kratka"
            } else if (data.dolga) {
                return "dolga"
            } else if (data.brezkončna) {
                return "brezkončna"
            } else {
                return undefined
            }
        }

        const result: Igra = {
            title: data.title,
            year: data.year,
            content: {
                length: lengthFilter(),
                bonus_content: {
                    dlc: data.dlc ? true : false,
                    microtransactions: data.mikrotransakcije ? true : false,
                    movie: data.film ? true : false,
                    publication: data.publikacije ? true : false,
                }
            },
            img: pic ? pic : undefined,
            platforms: platformFilter(),
            developer: data.developer,
            publisher: data.publisher,
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
        igraPlatforms,
        onSubmit,
        defFormValues,
        setPic,
        setSelected,
        yearFilter,
        omniFilter,
        setGrid,
        bonusContentCheck,
    }
}