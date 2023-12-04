import { Kanal, KanalGenre } from "../../../type";
import { useState } from "react";
import useComponent from "./useComponent";
import toast from "react-hot-toast";

export default function useKanal() {

    const kanalTypes: {
        name: KanalGenre;
        register: string;
    }[] = [
            {
                name: "Animacija",
                register: "animacija"
            },
            {
                name: "Doživetja",
                register: "dozivetja"
            },
            {
                name: "Filmi",
                register: "filmi"
            },
            {
                name: "Hrana",
                register: "hrana"
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
                name: "Radijska oddaja",
                register: "oddaja"
            },
            {
                name: "Reakcije",
                register: "reakcije"
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
                name: "Video eseji",
                register: "videoeseji"
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

    const testLib: Kanal[] = [
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
            genre: ["Kultura", "Radijska oddaja", "Filmi", "Knjige", "Igre"],
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
            title: "Bryony Claire",
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
            genre: ["Lepotičenje", "Kultura", "Izobraževalno", "Video eseji", "Nasveti"],
            femType: "woke",
            explanation: "Feministični banter čez razne kulturne vsebine.",
            description: "Feminist Frequency is an ongoing series of video commentaries exploring gender representations, myths, and messages in popular culture media. Created and hosted by Anita Sarkeesian.",
            ratings: {
                loves: 0,
                likes: 3,
                oks: 0,
                dislikes: 0,
                hates: 0
            }
        },
        {
            title: "Alice Cappelle",
            firstAir: 2020,
            lastAir: undefined,
            length: {
                minmax: [10, 25],
                episodes: 82
            },
            img: undefined,
            platforms: ["YouTube"],
            hosts: ["Alice Cappelle"],
            guests: [],
            others: [],
            genre: ["Izobraževalno", "Video eseji", "Kultura", "Doživetja", "Knjige"],
            femType: "woke",
            explanation: "Feministični banter čez razne kulturne vsebine.",
            description: "Feminist Frequency is an ongoing series of video commentaries exploring gender representations, myths, and messages in popular culture media. Created and hosted by Anita Sarkeesian.",
            ratings: {
                loves: 5,
                likes: 3,
                oks: 0,
                dislikes: 0,
                hates: 1
            }
        }
    ]

    const {
        splitInput,
        selectBackup,
        selectSetLibrary,
        searchRegexCreator,
    } = useComponent();

    const [selected, setSelected] = useState<Kanal | null>(null);
    const [pic, setPic] = useState(selected?.img);

    const omniFilter = (querry: string) => {
        if (!querry) { return toast.error(`Neveljaven vnos.`) }

        const regArr = searchRegexCreator(querry);
        const result = searchRegexOmniFilter(regArr);
        if (result) { selectSetLibrary("kanal", result) }
    }

    const searchRegexOmniFilter = (regArr: string[]) => {
        const selection: Kanal[] = selectBackup("kanal");
        const filtered = selection.filter(
            (kanal) => {
                const title = kanal.title.toUpperCase();
                const yearStart = kanal.firstAir;
                const yearEnd = kanal.lastAir;
                const platforms = kanal.platforms?.join(",").toUpperCase();
                const directors = kanal.hosts?.join(",").toUpperCase();
                const actors = kanal.guests?.join(",").toUpperCase();
                const others = kanal.others?.join(",").toUpperCase();
                const genre = kanal.genre?.join(",").toUpperCase();
                const explanation = kanal.explanation?.toUpperCase();
                const description = kanal.description.toUpperCase();
                const joined = `
                    ${title ? title : ""};
                    ${yearStart ? yearStart : ""};
                    ${yearEnd ? yearEnd : ""};
                    ${platforms ? platforms : ""};
                    ${directors ? directors : ""};
                    ${actors ? actors : ""};
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
                    return kanal;
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
            if (min < 1993 || min > currentYear) {
                if (min < 1993) {
                    toast.error(`Neveljavni iskalni nabor.
                    Prvi internetni video je deljen leta 1993.`);
                    return;
                }
                if (min > currentYear) {
                    toast.error(`Neveljavni iskalni nabor.
                    Baza zaenkrat ne vsebuje kanalov iz leta ${min}.
                    Ponovno poskusite v prihodnosti.`);
                    return;
                }
            }
        }
        if (max) {
            if (max < 1993 || max > currentYear) {
                if (max < 1993) {
                    toast.error(`Neveljavni iskalni nabor.
                    Prvi internetni video je deljen leta 1993.`);
                    return;
                }
                if (max > currentYear) {
                    toast.error(`Neveljavni iskalni nabor.
                    Baza zaenkrat ne vsebuje kanalov iz leta ${max}.
                    Ponovno poskusite v prihodnosti.`);
                    return;
                }
            }
        }

        if (min || max) {
            const result = testLib.filter((kanal) => {
                const year = kanal.firstAir
                if (year) {
                    if (min && max) {
                        if (min && max && min > max && year <= min && year >= max) {
                            return kanal;
                        } else if (year >= min && year <= max) {
                            return kanal;
                        }
                    }
                    if (min && !max && year >= min) {
                        return kanal;
                    }
                    if (!min && max && year <= max) {
                        return kanal;
                    }
                }
            })
            if (result) { selectSetLibrary("kanal", result) }
        }
    }

    const setGrid = (content: Kanal) => {
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

    const defFormValues = (kanal: Kanal | null): KanalForm | undefined => {
        if (!kanal) return;

        const defValues = {
            title: kanal.title,
            start: kanal.firstAir ? kanal.firstAir : undefined,
            finish: kanal.lastAir ? kanal.lastAir : undefined,
            minLength: kanal.length.minmax[0] ? kanal.length.minmax[0] : undefined,
            maxLength: kanal.length.minmax[1] ? kanal.length.minmax[1] : undefined,
            episodes: kanal.length.episodes ? kanal.length.episodes : 1,
            femType: kanal.femType ? kanal.femType : "",
            platforms: kanal.platforms.join(", "),
            hosts: kanal.hosts.join(", "),
            guests: kanal.guests.join(", "),
            others: kanal.others.join(", "),
            explanation: kanal.explanation,
            description: kanal.description,
        };

        kanalTypes.forEach(
            type => {
                const value = kanal.genre.find(gen => gen === type.name) ? true : false;
                defValues[type.register] = value;
            }
        );
        return defValues;
    }

    const onSubmit = (data) => {
        if (!data) { return }

        const genreFilter = () => {
            const result: KanalGenre[] = [];
            data.animacija ? result.push("Animacija") : {};
            data.dozivetja ? result.push("Doživetja") : {};
            data.filmi ? result.push("Filmi") : {};
            data.hrana ? result.push("Hrana") : {};
            data.igre ? result.push("Igre") : {};
            data.izobrazevalno ? result.push("Izobraževalno") : {};
            data.knjige ? result.push("Knjige") : {};
            data.kultura ? result.push("Kultura") : {};
            data.lepoticenje ? result.push("Lepotičenje") : {};
            data.nasveti ? result.push("Nasveti") : {};
            data.potrosnja ? result.push("Potrošnja") : {};
            data.prirocniki ? result.push("Priročniki") : {};
            data.sprostitev ? result.push("Sprostitev") : {};
            data.oddaja ? result.push("Radijska oddaja") : {};
            data.reakcije ? result.push("Reakcije") : {};
            data.vadba ? result.push("Vadba") : {};
            data.vzivo ? result.push("V živo") : {};
            data.videoeseji ? result.push("Video eseji") : {};
            data.zabava ? result.push("Zabava") : {};
            data.znanost ? result.push("Znanost") : {};
            return result;
        }

        const result: Kanal = {
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
        kanalTypes,
        defFormValues,
        setPic,
        setSelected,
        omniFilter,
        yearFilter,
        setGrid,
        onSubmit,
    }
}