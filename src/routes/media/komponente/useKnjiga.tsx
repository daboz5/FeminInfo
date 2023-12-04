import { Knjiga, KnjigaForm, KnjigaGenre } from "../../../type";
import { useState } from "react";
import useComponent from "./useComponent";
import toast from "react-hot-toast";

export default function useKnjiga() {

    const knjigaTypes: {
        name: KnjigaGenre;
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
                name: "Biografija",
                register: "biografija"
            },
            {
                name: "Distopija",
                register: "distopija"
            },
            {
                name: "Drama",
                register: "drama"
            },
            {
                name: "Fantazija",
                register: "fantazija"
            },
            {
                name: "Grafični roman",
                register: "graficna"
            },
            {
                name: "Grozljivka",
                register: "grozljivka"
            },
            {
                name: "Komedija",
                register: "komedija"
            },
            {
                name: "Misterija",
                register: "misterija"
            },
            {
                name: "Otroška",
                register: "otroska"
            },
            {
                name: "Prehrana",
                register: "prehrana"
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
                name: "Strip",
                register: "strip"
            },
            {
                name: "Strokovna",
                register: "strokovna"
            },
            {
                name: "Triler",
                register: "triler"
            },
            {
                name: "Umetnost",
                register: "umetnost"
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

    const testLib: Knjiga[] = [
        {
            title: "The Second Sex",
            published: 1949,
            zbirka: [
                {
                    id: 1,
                    title: "Facts and Myths",
                    count: 352
                },
                {
                    id: 2,
                    title: "Lived Experience",
                    count: 626
                }
            ],
            img: undefined,
            publishers: ["Éditions Gallimard"],
            authors: ["Simone de Beauvoir"],
            others: ["H.M. Parshley"],
            characters: [],
            genre: ["Strokovna", "Zgodovina"],
            femType: "soc",
            explanation: "Avtorica debatira stanje žensk v franciji in po svetu.",
            description: "The Second Sex (French: Le Deuxième Sexe) is a 1949 book by the French existentialist philosopher Simone de Beauvoir, in which the author discusses the treatment of women in the present society as well as throughout all of history. Beauvoir researched and wrote the book in about 14 months between 1946 and 1949.",
            ratings: {
                loves: 0,
                likes: 1,
                oks: 1,
                dislikes: 0,
                hates: 0
            }
        },
        {
            title: "Women, Race and Class",
            published: 1981,
            zbirka: [
                {
                    id: 1,
                    title: "Women, Race and Class",
                    count: 271
                }
            ],
            img: undefined,
            publishers: ["Random House"],
            authors: ["Angela Davis"],
            others: [],
            characters: [],
            genre: ["Strokovna", "Zgodovina"],
            femType: "soc",
            explanation: "Avtorica debatira kako se skozi zgodovino rasa, spol in stan sodelovali ali si nasprotovali v boju za enakopravnost.",
            description: "Women, Race and Class is a 1981 book by the American academic and author Angela Davis. It contains Marxist feminist analysis of gender, race and class. The third book written by Davis, it covers U.S. history from the slave trade and abolitionism movements to the women's liberation movements which began in the 1960s.",
            ratings: {
                loves: 1,
                likes: 1,
                oks: 0,
                dislikes: 0,
                hates: 0
            }
        },
        {
            title: "Ascendance of a Bookworm",
            published: 2013,
            zbirka: [
                {
                    id: 1,
                    title: "Daughter of a Soldier",
                    count: 300
                },
                {
                    id: 2,
                    title: "Apprentice Shrine Maiden",
                },
                {
                    id: 3,
                    title: "Adopted Daughter of an Archduke",
                },
                {
                    id: 4,
                    title: "Founder of the Royal Academy's So-Called Library Committee",
                },
                {
                    id: 5,
                    title: "Avatar of a Goddess",
                }
            ],
            img: undefined,
            publishers: ["Shōsetsuka ni Narō"],
            authors: ["Miya Kazuki"],
            others: ["You Shiina"],
            characters: ["Urano Motosu - Myne", "Ferdinand", "Tuuli", "Effa"],
            genre: ["Fantazija", "Avantura"],
            femType: "lib",
            explanation: "Fantazija življenja deklice v srednjeveški fantaziji.",
            description: "The story follows Urano Motosu, a book-loving post-secondary college student and soon-to-be librarian who ends up crushed to death beneath a pile of books at her house during an earthquake. With her dying breath, she wishes to be reincarnated in a world where she can read books forever. Urano awakens in the body of a weak, five-year-old girl named Myne in a world where books are scarce and only available to elites. Myne, retaining her memories from her previous life, decides to create and print her own books so that she can read again.",
            ratings: {
                loves: 0,
                likes: 0,
                oks: 3,
                dislikes: 0,
                hates: 0
            }
        },
    ]

    const {
        splitInput,
        selectBackup,
        selectSetLibrary,
        searchRegexCreator,
    } = useComponent();

    const [selected, setSelected] = useState<Knjiga | null>(null);
    const [pic, setPic] = useState(selected?.img);

    const omniFilter = (querry: string) => {
        if (!querry) { return toast.error(`Neveljaven vnos.`) }

        const regArr = searchRegexCreator(querry);
        const result = searchRegexOmniFilter(regArr);
        console.log(querry, result)
        if (result) { selectSetLibrary("knjiga", result) }
    }

    const searchRegexOmniFilter = (regArr: string[]) => {
        const selection: Knjiga[] = selectBackup("knjiga");
        const filtered = selection.filter(
            (knjiga) => {
                const title = knjiga.title.toUpperCase();
                const year = knjiga.published;
                const collection = knjiga.zbirka.map((book) => book.title).join(",").toUpperCase();
                const publishers = knjiga.publishers?.join(",").toUpperCase();
                const authors = knjiga.authors?.join(",").toUpperCase();
                const others = knjiga.others?.join(",").toUpperCase();
                const characters = knjiga.characters?.join(",").toUpperCase();
                const genre = knjiga.genre?.join(",").toUpperCase();
                const explanation = knjiga.explanation?.toUpperCase();
                const description = knjiga.description.toUpperCase();
                const joined = `
                    ${title ? title : ""};
                    ${year ? year : ""};
                    ${collection ? collection : ""};
                    ${publishers ? publishers : ""};
                    ${authors ? authors : ""};
                    ${others ? others : ""};
                    ${characters ? characters : ""};
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
                    return knjiga;
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
            if (min < -600 || min > currentYear) {
                if (min < -600) {
                    toast.error(`Neveljavni iskalni nabor.
                    Prva znana knjiga je iz leta 600 pred našim štetjem.`);
                    return;
                }
                if (min > currentYear) {
                    toast.error(`Neveljavni iskalni nabor.
                    Baza zaenkrat ne vsebuje knjig iz leta ${min}.
                    Ponovno poskusite v prihodnosti.`);
                    return;
                }
            }
        }
        if (max) {
            if (max < -600 || max > currentYear) {
                if (max < -600) {
                    toast.error(`Neveljavni iskalni nabor.
                    Prva znana knjiga je iz leta 600 pred našim štetjem.`);
                    return;
                }
                if (max > currentYear) {
                    toast.error(`Neveljavni iskalni nabor.
                    Baza zaenkrat ne vsebuje knjig iz leta ${max}.
                    Ponovno poskusite v prihodnosti.`);
                    return;
                }
            }
        }

        if (min || max) {
            const result = testLib.filter((knjiga) => {
                const year = knjiga.published;
                if (year) {
                    if (min && max) {
                        if (min && max && min > max && year <= min && year >= max) {
                            return knjiga;
                        } else if (year >= min && year <= max) {
                            return knjiga;
                        }
                    }
                    if (min && !max && year >= min) {
                        return knjiga;
                    }
                    if (!min && max && year <= max) {
                        return knjiga;
                    }
                }
            })
            if (result) { selectSetLibrary("knjiga", result) }
        }
    }

    const setGrid = (content: Knjiga) => {
        if (content) {
            let type = false;
            let creators = false;
            let explain = false;
            if (content.genre.length > 0 || content.femType) { type = true; }
            if (content.publishers.length > 0 || content.authors.length > 0 || content.others.length > 0 || content.characters.length > 0) { creators = true; }
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

    const defFormValues = (knjiga: Knjiga | null): KnjigaForm | undefined => {
        if (!knjiga) return;

        const defValues = {
            title: knjiga.title,
            published: knjiga.published,
            zbirka: knjiga.zbirka ? knjiga.zbirka : undefined,
            femType: knjiga.femType ? knjiga.femType : "",
            publishers: knjiga.publishers.join(", "),
            authors: knjiga.authors.join(", "),
            others: knjiga.others.join(", "),
            characters: knjiga.characters.join(", "),
            explanation: knjiga.explanation,
            description: knjiga.description,
        };

        knjigaTypes.forEach(
            type => {
                const value = knjiga.genre.find(gen => gen === type.name) ? true : false;
                defValues[type.register] = value;
            }
        );
        return defValues;
    }

    const onSubmit = (data) => {
        if (!data) { return }

        const genreFilter = () => {
            const result: KnjigaGenre[] = [];
            data.akcija ? result.push("Akcija") : {};
            data.avantura ? result.push("Avantura") : {};
            data.biografija ? result.push("Biografija") : {};
            data.distopija ? result.push("Distopija") : {};
            data.drama ? result.push("Drama") : {};
            data.fantazija ? result.push("Fantazija") : {};
            data.graficna ? result.push("Grafični roman") : {};
            data.grozljivka ? result.push("Grozljivka") : {};
            data.komedija ? result.push("Komedija") : {};
            data.misterija ? result.push("Misterija") : {};
            data.otroska ? result.push("Otroška") : {};
            data.prehrana ? result.push("Prehrana") : {};
            data.romantika ? result.push("Romantika") : {};
            data.satira ? result.push("Satira") : {};
            data.strip ? result.push("Strip") : {};
            data.strokovna ? result.push("Strokovna") : {};
            data.triler ? result.push("Triler") : {};
            data.umetnost ? result.push("Umetnost") : {};
            data.zgodovina ? result.push("Zgodovina") : {};
            data.scifi ? result.push("Znanstvena fantastika") : {};
            return result;
        }

        const zbirka = data.zbirka;

        const result: Knjiga = {
            title: data.title,
            published: data.published,
            zbirka: [
                zbirka
            ],
            img: pic ? pic : undefined,
            publishers: splitInput(data.publishers),
            authors: splitInput(data.authors),
            others: splitInput(data.others),
            characters: splitInput(data.characters),
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
        knjigaTypes,
        defFormValues,
        setPic,
        setSelected,
        omniFilter,
        yearFilter,
        setGrid,
        onSubmit,
    }
}