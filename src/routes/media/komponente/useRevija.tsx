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

    const revijaPerioda = [
        { text: "dan", register: "freqUnitDay" },
        { text: "teden", register: "freqUnitWeek" },
        { text: "mesec", register: "freqUnitMonth" },
        { text: "leto", register: "freqUnitYear" },
        { text: "neperiodično", register: "freqUnit" },
    ];

    const testLib: Revija[] = [
        {
            title: "Cosmopolitan",
            start: 1886,
            end: undefined,
            frequency: {
                interval: 4,
                unit: "leto",
            },
            averageLength: undefined,
            img: undefined,
            companies: ["Hearst Communications"],
            authors: [],
            languages: ["English", "Bulgarian", "Chinese", "Czech", "French", "German", "Hungarian", "Indonesian", "Italian", "Japanese", "Korean", "Spanish", "Dutch", "Slovenian", "Ukrainian"],
            others: ["Jessica Pels"],
            genre: ["Moda", "Govorice", "Dom & Okolica", "Sprostitev", "Kultura"],
            femType: "lib",
            explanation: "O ženskah je in kolikor mi je znano ni proti njim.",
            description: "Entertainment magazine for women.",
            ratings: {
                loves: 0,
                likes: 0,
                oks: 3,
                dislikes: 0,
                hates: 0
            }
        },
        {
            title: "Feminist Review",
            start: 1979,
            end: undefined,
            frequency: {
                interval: 3,
                unit: "leto",
            },
            averageLength: undefined,
            img: undefined,
            companies: ["SAGE Publishing"],
            authors: [],
            languages: ["English"],
            others: [],
            genre: ["Informativno", "Znanost", "Kultura", "Politika"],
            femType: undefined,
            explanation: "Feministična teorija skozi razmišljanja in akademske publikacije.",
            description: "Feminist Review’s purpose is to hold space for conversations that rethink and reimagine feminist scholarship and praxis: the modes and contexts in which it operates, the questions it takes up, and with whom feminisms are in conversation.",
            ratings: {
                loves: 0,
                likes: 0,
                oks: 3,
                dislikes: 0,
                hates: 0
            }
        },
        {
            title: "The Women’s Review of Books",
            start: 1983,
            end: undefined,
            frequency: {
                interval: 1,
                unit: undefined,
            },
            averageLength: undefined,
            img: undefined,
            companies: ["Wellesley Centers for Women", "Old City Publishing"],
            authors: [],
            languages: ["English"],
            others: [],
            genre: ["Knjige"],
            femType: "woke",
            explanation: "Knjige izbrane od žensk predvsem za ženske.",
            description: "WRB reviews scholarship as well as fiction, graphic novels, poetry, and memoir usually (but not always) by women. We strive to review a diverse array of books in many fields, genres, and styles for each issue.",
            ratings: {
                loves: 0,
                likes: 0,
                oks: 3,
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
                const yearStart = revija.start;
                const yearEnd = revija.end;
                const companies = revija.companies?.join(",").toUpperCase();
                const authors = revija.authors?.join(",").toUpperCase();
                const languages = revija.languages?.join(",").toUpperCase();
                const others = revija.others?.join(",").toUpperCase();
                const genre = revija.genre?.join(",").toUpperCase();
                const explanation = revija.explanation?.toUpperCase();
                const description = revija.description.toUpperCase();
                const joined = `
                    ${title ? title : ""};
                    ${yearStart ? yearStart : ""};
                    ${yearEnd ? yearEnd : ""};
                    ${companies ? companies : ""};
                    ${authors ? authors : ""};
                    ${languages ? languages : ""};
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
            if (min < 1663 || min > currentYear) {
                if (min < 1663) {
                    toast.error(`Neveljavni iskalni nabor.
                    Prva tiskana revija je izšla leta 1663.`);
                    return;
                }
                if (min > currentYear) {
                    toast.error(`Neveljavni iskalni nabor.
                    Baza zaenkrat ne vsebuje revij iz leta ${min}.
                    Ponovno poskusite v prihodnosti.`);
                    return;
                }
            }
        }
        if (max) {
            if (max < 1919 || max > currentYear) {
                if (max < 1919) {
                    toast.error(`Neveljavni iskalni nabor.
                    Prva tiskana revija je izšla leta 1663.`);
                    return;
                }
                if (max > currentYear) {
                    toast.error(`Neveljavni iskalni nabor.
                    Baza zaenkrat ne vsebuje revij iz leta ${max}.
                    Ponovno poskusite v prihodnosti.`);
                    return;
                }
            }
        }

        if (min || max) {
            const result = testLib.filter((revija) => {
                const year = revija.start
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
            if (content.companies.length > 0 || content.authors.length > 0 || content.languages.length > 0 || content.others.length > 0) { creators = true; }
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
            start: revija.start ? revija.start : undefined,
            end: revija.end ? revija.end : undefined,
            averageLength: revija.averageLength ? revija.averageLength : undefined,
            freqInt: revija.frequency.interval ? revija.frequency.interval : undefined,
            freqUnit: revija.frequency.unit === undefined ? revija.frequency.unit : undefined,
            freqUnitDay: revija.frequency.unit === "dan" ? revija.frequency.unit : undefined,
            freqUnitWeek: revija.frequency.unit === "teden" ? revija.frequency.unit : undefined,
            freqUnitMonth: revija.frequency.unit === "mesec" ? revija.frequency.unit : undefined,
            freqUnitYear: revija.frequency.unit === "leto" ? revija.frequency.unit : undefined,
            avgLength: revija.averageLength ? revija.averageLength : undefined,
            femType: revija.femType ? revija.femType : "",
            companies: revija.companies.join(", "),
            authors: revija.authors.join(", "),
            languages: revija.languages.join(", "),
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
            data.dominokolica ? result.push("Dom & Okolica") : {};
            data.filmi ? result.push("Filmi") : {};
            data.finance ? result.push("Finance") : {};
            data.glasba ? result.push("Glasba") : {};
            data.govorice ? result.push("Govorice") : {};
            data.igre ? result.push("Igre") : {};
            data.informativno ? result.push("Informativno") : {};
            data.knjige ? result.push("Knjige") : {};
            data.kultura ? result.push("Kultura") : {};
            data.moda ? result.push("Moda") : {};
            data.narava ? result.push("Narava") : {};
            data.novice ? result.push("Novice") : {};
            data.okolje ? result.push("Okolje") : {};
            data.politika ? result.push("Politika") : {};
            data.popotna ? result.push("Popotna") : {};
            data.sprostitev ? result.push("Sprostitev") : {};
            data.sport ? result.push("Šport") : {};
            data.zgodbe ? result.push("Zgodbe") : {};
            data.znanost ? result.push("Znanost") : {};
            return result;
        }

        const freqUnit = data.freqUnitDay ? "dan" :
            data.freqUnitWeek ? "teden" :
                data.freqUnitMonth ? "mesec" :
                    data.freqUnitYear ? "leto" :
                        undefined

        const result: Revija = {
            title: data.title,
            start: data.start ? data.start : undefined,
            end: data.finish ? data.finish : undefined,
            frequency: {
                interval: data.freqInt ? data.freqInt : 1,
                unit: freqUnit,
            },
            averageLength: data.averageLength,
            img: pic ? pic : undefined,
            companies: splitInput(data.companies),
            authors: splitInput(data.authors),
            languages: splitInput(data.languages),
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
        revijaPerioda,
        defFormValues,
        setPic,
        setSelected,
        omniFilter,
        yearFilter,
        setGrid,
        onSubmit,
    }
}