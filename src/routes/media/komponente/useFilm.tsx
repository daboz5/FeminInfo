import { UseFormSetValue } from "react-hook-form"
import { useState } from "react";
import { Film, FilmForm, FilmGenre } from "../../../type";
import useFemStore from "../../../useFemStore";
import useComponent from "./useComponent";
import toast from "react-hot-toast";

export default function useFilm() {

    const filmTypes: {
        name: FilmGenre;
        register: string;
    }[] = [
            {
                name: "Akcija",
                register: "action"
            },
            {
                name: "Avantura",
                register: "avantura"
            },
            {
                name: "Drama",
                register: "drama"
            },
            {
                name: "Dokumentarec",
                register: "dokumentarec"
            },
            {
                name: "Fantazija",
                register: "fantazija"
            },
            {
                name: "Grozljivka",
                register: "grozljivka"
            },
            {
                name: "Isekai",
                register: "isekai"
            },
            {
                name: "Komedija",
                register: "komedija"
            },
            {
                name: "Kriminalka",
                register: "kriminalka"
            },
            {
                name: "Misterija",
                register: "misterija"
            },
            {
                name: "Romantika",
                register: "romantika"
            },
            {
                name: "Satira",
                register: "satira"
            },
            {
                name: "Triler",
                register: "triler"
            },
            {
                name: "Zgodovina",
                register: "zgodovina"
            },
            {
                name: "Znanstvena fantastika",
                register: "scifi"
            },
        ]

    const testLib: Film[] = [
        {
            title: "Revolutionary Girl Uthena",
            year: {
                start: 1997,
                finish: undefined,
                unfinished: false
            },
            length: {
                average: 23,
                episodes: 39
            },
            img: undefined,
            director: [],
            actors: [],
            others: [],
            genre: [],
            femType: undefined,
            explanation: "",
            description: "Childhood idealism, illusions, ambition, adulthood, sexuality, abuse, incest and identity are all prominent themes which are explored in what is essentially a highly metaphorical and symbolic coming-of-age story. Loss of innocence, both sexual and otherwise, is treated as a life changing event. Fairy tale archetypes such as the noble prince and the damsel in distress, as well as standard tropes of the shoujo and magical girl genre are incorporated, subverted, inverted, averted and deconstructed.",
            ratings: {
                loves: 0,
                likes: 0,
                oks: 0,
                dislikes: 0,
                hates: 0
            }
        },
        {
            title: "Portret of a lady on fire",
            year: {
                start: 2019,
                finish: undefined,
                unfinished: false
            },
            length: {
                average: undefined,
                episodes: undefined
            },
            img: undefined,
            director: [],
            actors: [],
            others: [],
            genre: [],
            femType: undefined,
            explanation: "",
            description: "On an isolated island in Brittany at the end of the eighteenth century, a female painter is obliged to paint a wedding portrait of a young woman.",
            ratings: {
                loves: 0,
                likes: 0,
                oks: 0,
                dislikes: 0,
                hates: 0
            }
        },
        {
            title: "Volver",
            year: {
                start: 2006,
                finish: undefined,
                unfinished: false
            },
            length: {
                average: 121,
                episodes: 1
            },
            img: "volver.jpg",
            director: ["Pedro Almodóvar"],
            actors: ["Penélope Cruz", "Carmen Maura", "Lola Dueñas", "Blanca Portillo", "Yohana Cobo", "Chus Lampreave", "Antonio de la Torre"],
            others: ["Example 1", "Example 2", "Example 3"],
            genre: ["Komedija", "Drama"],
            femType: "lib",
            explanation: "Razni ženski liki se znajdejo v nenadejanih zahtevnih situacijah, iz katerih se izvlečejo s pretkanostjo, oportunizmom ali nujo po preživetju.",
            description: "After her death, a mother returns to her home town in order to fix the situations she couldn't resolve during her life.",
            ratings: {
                loves: 1,
                likes: 0,
                oks: 0,
                dislikes: 0,
                hates: 0
            }
        }
    ]

    const {
        backupLibFilm,
        setLibFilm
    } = useFemStore();

    const { calcFame, splitInput } = useComponent();

    const [selected, setSelected] = useState<Film | null>(null);
    const [pic, setPic] = useState(selected?.img);

    const sortAZ = (content?: Film[]) => {
        const selection: Film[] = content ? content : backupLibFilm;
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

    const sortZA = (content?: Film[]) => {
        const selection: Film[] = content ? content : backupLibFilm;
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

    const sort19Fame = (content?: Film[]) => {
        const selection: Film[] = content ? content : backupLibFilm;
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

    const sort91Fame = (content?: Film[]) => {
        const selection: Film[] = content ? content : backupLibFilm;
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

    const sort19Year = (content?: Film[]) => {
        const selection: Film[] = content ? content : backupLibFilm;
        return selection.sort(
            (a, b) => {
                const yearA = a.year?.start;
                const yearB = b.year?.start;
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

    const sort91Year = (content?: Film[]) => {
        const selection: Film[] = content ? content : backupLibFilm;
        return selection.sort(
            (a, b) => {
                const yearA = a.year?.start;
                const yearB = b.year?.start;
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
        const filtered = backupLibFilm?.filter(
            (film) => {
                const title = film.title.toUpperCase();
                const maches: string[] = [];
                regArr.forEach((regex) => {
                    const result = title.search(new RegExp(regex));
                    if (result > -1) {
                        maches.push(regex);
                    }
                })
                if (maches.length > 0) {
                    return film;
                }
            }
        );
        return filtered;
    }

    const searchRegexOmniFilter = (regArr: string[]) => {
        const filtered = backupLibFilm?.filter(
            (film) => {
                const title = film.title.toUpperCase();
                const yearStart = film.year?.start;
                const yearEnd = film.year?.finish;
                const directors = film.director?.join(",").toUpperCase();
                const actors = film.actors?.join(",").toUpperCase();
                const others = film.others?.join(",").toUpperCase();
                const explanation = film.explanation?.toUpperCase();
                const description = film.description.toUpperCase();
                const joined = `
                    ${title ? title : ""};
                    ${yearStart ? yearStart : ""};
                    ${yearEnd ? yearEnd : ""};
                    ${directors ? directors : ""};
                    ${actors ? actors : ""};
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
                    return film;
                }
            }
        );
        return filtered;
    }

    const omniFilter = (querry: string) => {
        if (!querry) { return toast.error(`Neveljaven vnos.`) }

        const regArr = searchRegexCreator(querry);
        const result = searchRegexOmniFilter(regArr);
        result ? setLibFilm(result) : {}
    }

    const simpleFilter = (querry: string) => {
        if (!querry) { return toast.error(`Neveljaven vnos.`) }

        const regArr = searchRegexCreator(querry);
        const result = searchRegexTitleFilter(regArr);
        result ? setLibFilm(result) : {}
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

        const result = backupLibFilm?.filter(
            (el) => {
                const match = el.title[0];
                for (let i = 0; i < noRepeats.length; i++) {
                    if (match === noRepeats[i]) {
                        return el;
                    }
                }
            }
        );
        result ? setLibFilm(result) : {}
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
            if (min < 1888 || min > currentYear) {
                if (min < 1888) {
                    toast.error(`Neveljavni iskalni nabor.
                    Prvi znani film je izdelan leta 1888.`);
                    return;
                }
                if (min > currentYear) {
                    toast.error(`Neveljavni iskalni nabor.
                    Baza zaenkrat ne vsebuje filmov iz leta ${min}.
                    Ponovno poskusite v prihodnosti.`);
                    return;
                }
            }
        }
        if (max) {
            if (max < 1888 || max > currentYear) {
                if (max < 1888) {
                    toast.error(`Neveljavni iskalni nabor.
                    Prvi znani film je izdelan leta 1888.`);
                    return;
                }
                if (max > currentYear) {
                    toast.error(`Neveljavni iskalni nabor.
                    Baza zaenkrat ne vsebuje filmov iz leta ${max}.
                    Ponovno poskusite v prihodnosti.`);
                    return;
                }
            }
        }

        if (min || max) {
            const result = testLib.filter((film) => {
                const year = film.year?.start;
                if (year) {
                    if (min && max) {
                        if (min && max && min > max && year <= min && year >= max) {
                            return film;
                        } else if (year >= min && year <= max) {
                            return film;
                        }
                    }
                    if (min && !max && year >= min) {
                        return film;
                    }
                    if (!min && max && year <= max) {
                        return film;
                    }
                }
            })
            setLibFilm(result);
        }
    }

    const typeFilter = (querry: string, content?: Film[]) => {
        const selection = content ? content : testLib;
        const result = selection.filter((film) => film.femType === querry);
        setLibFilm(result);
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
            const result = testLib.filter((film) => {
                const fame = calcFame(film.ratings);
                if (fame) {
                    if (min && max) {
                        if (min && max && min > max && fame <= min && fame >= max) {
                            return film;
                        } else if (fame >= min && fame <= max) {
                            return film;
                        }
                    }
                    if (min && !max && fame >= min) {
                        return film;
                    }
                    if (!min && max && fame <= max) {
                        return film;
                    }
                }
            })
            setLibFilm(result);
        }
    }

    const setGrid = (content: Film) => {
        if (content) {
            let type = false;
            let creators = false;
            let explain = false;
            if (content.genre.length > 0 || content.femType) { type = true; }
            if (content.director.length > 0 || content.actors.length > 0 || content.others.length > 0) { creators = true; }
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

    const handleType = (
        elValue: string | undefined,
        elCheck: boolean,
        setValue: UseFormSetValue<FilmForm>
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

    const defFormValues = (film: Film | null): FilmForm | undefined => {
        if (!film) return;

        const defValues = {
            title: film.title,
            start: film.year.start,
            finish: film.year.finish ? film.year.finish : undefined,
            unfinished: film.year.unfinished ? true : false,
            average: film.length.average ? film.length.average : undefined,
            episodes: film.length.episodes ? film.length.episodes : 1,
            femType: film.femType ? film.femType : "",
            direction: film.director.join(", "),
            actors: film.actors.join(", "),
            others: film.others.join(", "),
            explanation: film.explanation,
            description: film.description,
        };

        filmTypes.forEach(
            type => {
                const value = film.genre.find(gen => gen === type.name) ? true : false;
                defValues[type.register] = value;
            }
        );
        return defValues;
    }

    const onSubmit = (data) => {
        if (!data) { return }

        const genreFilter = () => {
            const result: FilmGenre[] = [];
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

        const result: Film = {
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
        filmTypes,
        defFormValues,
        onSubmit,
        setPic,
        setSelected,
        omniFilter,
        simpleFilter,
        complexFilter,
        yearFilter,
        typeFilter,
        fameFilter,
        sortAZ,
        sortZA,
        sort19Year,
        sort91Year,
        sort19Fame,
        sort91Fame,
        setGrid,
        handleType,
        handlePicChange,
    }
}