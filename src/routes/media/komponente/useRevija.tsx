import { Revija, RevijaForm, RevijaGenre } from "../../../type";
import { useState } from "react";
import useComponent from "./useComponent";
import toast from "react-hot-toast";

export default function useRevija() {

    const revijaTypes: {
        name: RevijaGenre;
        register: string;
    }[] = [
            {
                name: "Dom & Okolica",
                register: "dominokolica"
            },
            {
                name: "Filmi",
                register: "filmi"
            },
            {
                name: "Finance",
                register: "finance"
            },
            {
                name: "Glasba",
                register: "glasba"
            },
            {
                name: "Govorice",
                register: "govorice"
            },
            {
                name: "Igre",
                register: "igre"
            },
            {
                name: "Informativno",
                register: "informativno"
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
                name: "Moda",
                register: "moda"
            },
            {
                name: "Narava",
                register: "narava"
            },
            {
                name: "Novice",
                register: "novice"
            },
            {
                name: "Okolje",
                register: "okolje"
            },
            {
                name: "Politika",
                register: "politika"
            },
            {
                name: "Popotna",
                register: "popotna"
            },
            {
                name: "Sprostitev",
                register: "sprostitev"
            },
            {
                name: "Šport",
                register: "sport"
            },
            {
                name: "Zgodbe",
                register: "zgodbe"
            },
            {
                name: "Znanost",
                register: "znanost"
            },
        ]

    const testLib: Revija[] = [
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

    const [selected, setSelected] = useState<Revija | null>(null);
    const [pic, setPic] = useState(selected?.img);

    const omniFilter = (querry: string) => {
        if (!querry) { return toast.error(`Neveljaven vnos.`) }

        const regArr = searchRegexCreator(querry);
        const result = searchRegexOmniFilter(regArr);
        if (result) { selectSetLibrary("revija", result) }
    }

    const searchRegexOmniFilter = (regArr: string[]) => {
        const selection: Revija[] = selectBackup("revija");
        const filtered = selection.filter(
            (revija) => {
                const title = revija.title.toUpperCase();
                const yearStart = revija.firstAir;
                const yearEnd = revija.lastAir;
                const platforms = revija.platforms?.join(",").toUpperCase();
                const hosts = revija.hosts?.join(",").toUpperCase();
                const guests = revija.guests?.join(",").toUpperCase();
                const others = revija.others?.join(",").toUpperCase();
                const genre = revija.genre?.join(",").toUpperCase();
                const explanation = revija.explanation?.toUpperCase();
                const description = revija.description.toUpperCase();
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
                    return revija;
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
                    Prva radijska revija je predvajala leta 1919.`);
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
                    Prva radijska revija je predvajala leta 1919.`);
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
            const result = testLib.filter((revija) => {
                const year = revija.firstAir
                if (year) {
                    if (min && max) {
                        if (min && max && min > max && year <= min && year >= max) {
                            return revija;
                        } else if (year >= min && year <= max) {
                            return revija;
                        }
                    }
                    if (min && !max && year >= min) {
                        return revija;
                    }
                    if (!min && max && year <= max) {
                        return revija;
                    }
                }
            })
            if (result) { selectSetLibrary("revija", result) }
        }
    }

    const setGrid = (content: Revija) => {
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

    const defFormValues = (revija: Revija | null): RevijaForm | undefined => {
        if (!revija) return;

        const defValues = {
            title: revija.title,
            start: revija.firstAir ? revija.firstAir : undefined,
            finish: revija.lastAir ? revija.lastAir : undefined,
            minLength: revija.length.minmax[0] ? revija.length.minmax[0] : undefined,
            maxLength: revija.length.minmax[1] ? revija.length.minmax[1] : undefined,
            episodes: revija.length.episodes ? revija.length.episodes : 1,
            femType: revija.femType ? revija.femType : "",
            platforms: revija.platforms.join(", "),
            hosts: revija.hosts.join(", "),
            guests: revija.guests.join(", "),
            others: revija.others.join(", "),
            explanation: revija.explanation,
            description: revija.description,
        };

        revijaTypes.forEach(
            type => {
                const value = revija.genre.find(gen => gen === type.name) ? true : false;
                defValues[type.register] = value;
            }
        );
        return defValues;
    }

    const onSubmit = (data) => {
        if (!data) { return }

        const genreFilter = () => {
            const result: RevijaGenre[] = [];
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

        const result: Revija = {
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
        revijaTypes,
        defFormValues,
        setPic,
        setSelected,
        omniFilter,
        yearFilter,
        setGrid,
        onSubmit,
    }
}