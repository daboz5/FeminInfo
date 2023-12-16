import { Oddaja, OddajaForm, OddajaGenre } from "../../../type";
import { useState } from "react";
import useComponent from "./useComponent";
import toast from "react-hot-toast";

export default function useOddaja() {

    const oddajaTypes: {
        name: OddajaGenre;
        register: string;
    }[] = [
            {
                name: "Doživetja",
                register: "dozivetja"
            },
            {
                name: "Filmi",
                register: "filmi"
            },
            {
                name: "Glasba",
                register: "glasba"
            },
            {
                name: "Igre",
                register: "igre"
            },
            {
                name: "Izobraževalno",
                register: "izobrazevalno"
            },
            {
                name: "Knjige",
                register: "knjige"
            },
            {
                name: "Kultura",
                register: "kultura"
            },
            {
                name: "Lepotičenje",
                register: "lepoticenje"
            },
            {
                name: "Nasveti",
                register: "nasveti"
            },
            {
                name: "Potrošnja",
                register: "potrosnja"
            },
            {
                name: "Priročniki",
                register: "prirocniki"
            },
            {
                name: "Sprostitev",
                register: "sprostitev"
            },
            {
                name: "Vadba",
                register: "vadba"
            },
            {
                name: "V živo",
                register: "vzivo"
            },
            {
                name: "Zabava",
                register: "zabava"
            },
            {
                name: "Znanost",
                register: "znanost"
            },
        ]

    const testLib: Oddaja[] = [
        {
            title: "Feminist Frequency",
            firstAir: 2009,
            lastAir: undefined,
            length: {
                minmax: [10, 90],
                episodes: 465
            },
            img: undefined,
            platforms: ["YouTube", "Apple Podcasts"],
            hosts: ["Emily", "Anita Sarkeesian", "Karoline"],
            guests: ["Charlie Jane Anders"],
            others: ["Rob Williams"],
            genre: ["Kultura", "Izobraževalno", "Filmi", "Knjige", "Igre"],
            femType: "woke",
            explanation: "Feministični banter čez razne kulturne vsebine.",
            description: "Feminist Frequency is an ongoing series of video commentaries exploring gender representations, myths, and messages in popular culture media. Created and hosted by Anita Sarkeesian.",
            ratings: {
                loves: 0,
                likes: 2,
                oks: 0,
                dislikes: 0,
                hates: 0
            }
        },
        {
            title: "Insane in the Fem Brain",
            firstAir: 2020,
            lastAir: 2022,
            length: {
                minmax: [50, 75],
                episodes: 37
            },
            img: undefined,
            platforms: ["Google Podcasts", "Acast", "Spotify"],
            hosts: ["Rick Wilson"],
            guests: ["Nancy Carter-Bradley", "Lizzy Pollot", "Esther Manito"],
            others: ["Paul"],
            genre: ["Kultura", "Izobraževalno", "Nasveti", "Doživetja"],
            femType: "lib",
            explanation: "Pogovori o življenju žensk ter trans oseb.",
            description: "A spin-off of the award winning podcast Insane In The Men Brain. Jayde Adams thinks Rich Wilson needs to learn more about the other sex and what makes women so powerful!",
            ratings: {
                loves: 0,
                likes: 2,
                oks: 1,
                dislikes: 0,
                hates: 0
            }
        },
        {
            title: "End FGM",
            firstAir: 2019,
            lastAir: 2019,
            length: {
                minmax: [10, 25],
                episodes: 82
            },
            img: undefined,
            platforms: ["Apple Podcasts", "Google Podcasts"],
            hosts: ["Jeremiah Kipainoi"],
            guests: ["Leyla Hussein", "Ebony Riddell Bamber", "Abdulmalik"],
            others: [],
            genre: ["Izobraževalno", "Doživetja", "Nasveti", "Kultura"],
            femType: "soc",
            explanation: "O prekinitvi nasilja nad ženskimi spolovili, še posebno med tradicionalnih afriških in obafriških skupnostih.",
            description: "People working in different sectors in the campaign against Female Genital Mutialtion share their journey, challenges and successes in this podcast.",
            ratings: {
                loves: 2,
                likes: 3,
                oks: 0,
                dislikes: 0,
                hates: 0
            }
        }
    ]

    const {
        splitInput,
        selectBackup,
        selectSetLibrary,
        searchRegexCreator,
    } = useComponent();

    const [selected, setSelected] = useState<Oddaja | null>(null);
    const [pic, setPic] = useState(selected?.img);

    const omniFilter = (querry: string) => {
        if (!querry) { return toast.error(`Neveljaven vnos.`) }

        const regArr = searchRegexCreator(querry);
        const result = searchRegexOmniFilter(regArr);
        if (result) { selectSetLibrary("oddaja", result) }
    }

    const searchRegexOmniFilter = (regArr: string[]) => {
        const selection: Oddaja[] = selectBackup("oddaja");
        const filtered = selection.filter(
            (oddaja) => {
                const title = oddaja.title.toUpperCase();
                const yearStart = oddaja.firstAir;
                const yearEnd = oddaja.lastAir;
                const platforms = oddaja.platforms?.join(",").toUpperCase();
                const hosts = oddaja.hosts?.join(",").toUpperCase();
                const guests = oddaja.guests?.join(",").toUpperCase();
                const others = oddaja.others?.join(",").toUpperCase();
                const genre = oddaja.genre?.join(",").toUpperCase();
                const explanation = oddaja.explanation?.toUpperCase();
                const description = oddaja.description.toUpperCase();
                const joined = `
                    ${title ? title : ""};
                    ${yearStart ? yearStart : ""};
                    ${yearEnd ? yearEnd : ""};
                    ${platforms ? platforms : ""};
                    ${hosts ? hosts : ""};
                    ${guests ? guests : ""};
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
                    return oddaja;
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
            if (min < 1919 || min > currentYear) {
                if (min < 1919) {
                    toast.error(`Neveljavni iskalni nabor.
                    Prva radijska oddaja je predvajala leta 1919.`);
                    return;
                }
                if (min > currentYear) {
                    toast.error(`Neveljavni iskalni nabor.
                    Baza zaenkrat ne vsebuje oddaj iz leta ${min}.
                    Ponovno poskusite v prihodnosti.`);
                    return;
                }
            }
        }
        if (max) {
            if (max < 1919 || max > currentYear) {
                if (max < 1919) {
                    toast.error(`Neveljavni iskalni nabor.
                    Prva radijska oddaja je predvajala leta 1919.`);
                    return;
                }
                if (max > currentYear) {
                    toast.error(`Neveljavni iskalni nabor.
                    Baza zaenkrat ne vsebuje oddaj iz leta ${max}.
                    Ponovno poskusite v prihodnosti.`);
                    return;
                }
            }
        }

        if (min || max) {
            const result = testLib.filter((oddaja) => {
                const year = oddaja.firstAir
                if (year) {
                    if (min && max) {
                        if (min && max && min > max && year <= min && year >= max) {
                            return oddaja;
                        } else if (year >= min && year <= max) {
                            return oddaja;
                        }
                    }
                    if (min && !max && year >= min) {
                        return oddaja;
                    }
                    if (!min && max && year <= max) {
                        return oddaja;
                    }
                }
            })
            if (result) { selectSetLibrary("oddaja", result) }
        }
    }

    const setGrid = (content: Oddaja) => {
        if (content) {
            let type = false;
            let creators = false;
            let explain = false;
            if (content.genre.length > 0 || content.femType) { type = true; }
            if (content.platforms.length > 0 || content.hosts.length > 0 || content.guests.length > 0 || content.others.length > 0) { creators = true; }
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

    const defFormValues = (oddaja: Oddaja | null): OddajaForm | undefined => {
        if (!oddaja) return;

        const defValues = {
            title: oddaja.title,
            start: oddaja.firstAir ? oddaja.firstAir : undefined,
            finish: oddaja.lastAir ? oddaja.lastAir : undefined,
            minLength: oddaja.length.minmax[0] ? oddaja.length.minmax[0] : undefined,
            maxLength: oddaja.length.minmax[1] ? oddaja.length.minmax[1] : undefined,
            episodes: oddaja.length.episodes ? oddaja.length.episodes : 1,
            femType: oddaja.femType ? oddaja.femType : "",
            platforms: oddaja.platforms.join(", "),
            hosts: oddaja.hosts.join(", "),
            guests: oddaja.guests.join(", "),
            others: oddaja.others.join(", "),
            explanation: oddaja.explanation,
            description: oddaja.description,
        };

        oddajaTypes.forEach(
            type => {
                const value = oddaja.genre.find(gen => gen === type.name) ? true : false;
                defValues[type.register] = value;
            }
        );
        return defValues;
    }

    const onSubmit = (data) => {
        if (!data) { return }

        const genreFilter = () => {
            const result: OddajaGenre[] = [];
            data.dozivetja ? result.push("Doživetja") : {};
            data.filmi ? result.push("Filmi") : {};
            data.glasba ? result.push("Glasba") : {};
            data.igre ? result.push("Igre") : {};
            data.izobrazevalno ? result.push("Izobraževalno") : {};
            data.knjige ? result.push("Knjige") : {};
            data.kultura ? result.push("Kultura") : {};
            data.lepoticenje ? result.push("Lepotičenje") : {};
            data.nasveti ? result.push("Nasveti") : {};
            data.potrosnja ? result.push("Potrošnja") : {};
            data.prirocniki ? result.push("Priročniki") : {};
            data.sprostitev ? result.push("Sprostitev") : {};
            data.vadba ? result.push("Vadba") : {};
            data.vzivo ? result.push("V živo") : {};
            data.zabava ? result.push("Zabava") : {};
            data.znanost ? result.push("Znanost") : {};
            return result;
        }

        const result: Oddaja = {
            title: data.title,
            firstAir: data.start ? data.start : undefined,
            lastAir: data.finish ? data.finish : undefined,
            length: {
                minmax: [data.minLength ? data.minLength : undefined, data.maxLength ? data.maxLength : undefined],
                episodes: data.episodes ? data.episodes : undefined,
            },
            img: pic ? pic : undefined,
            platforms: splitInput(data.platforms),
            hosts: splitInput(data.hosts),
            guests: splitInput(data.guests),
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
        oddajaTypes,
        defFormValues,
        setPic,
        setSelected,
        omniFilter,
        yearFilter,
        setGrid,
        onSubmit,
    }
}