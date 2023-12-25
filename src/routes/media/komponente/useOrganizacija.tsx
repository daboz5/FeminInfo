import { Organizacija, OrganizacijaForm, OrganizacijaType } from "../../../type";
import { useState } from "react";
import useComponent from "./useComponent";
import toast from "react-hot-toast";

export default function useOrganizacija() {

    const organizacijaTypes: {
        name: OrganizacijaType;
        register: string;
    }[] = [
            {
                name: "Aktivizem",
                register: "aktivizem"
            },
            {
                name: "Druženje",
                register: "druzenje"
            },
            {
                name: "Duhovnost",
                register: "duhovnost"
            },
            {
                name: "Finančna pomoč",
                register: "financnapomoc"
            },
            {
                name: "Izobrazba",
                register: "izobrazba"
            },
            {
                name: "Krizna",
                register: "krizna"
            },
            {
                name: "Kulturna",
                register: "kulturna"
            },
            {
                name: "Kulturna dejavnost",
                register: "kulturnadejavnost"
            },
            {
                name: "Materialna pomoč",
                register: "materialnapomoc"
            },
            {
                name: "Medsebojna pomoč",
                register: "medsebojnapomoc"
            },
            {
                name: "Neprofitna",
                register: "neprofitna"
            },
            {
                name: "Nevladna",
                register: "nevladna"
            },
            {
                name: "Okoljevarstvo",
                register: "okoljevarstvo"
            },
            {
                name: "Politika",
                register: "politika"
            },
            {
                name: "Pravna pomoč",
                register: "pravnapomoc"
            },
            {
                name: "Profitna",
                register: "profitna"
            },
            {
                name: "Rekreacija",
                register: "rekreacija"
            },
            {
                name: "Skrb ali varstvo",
                register: "skrbalivarsto"
            },
            {
                name: "Svetovanje",
                register: "svetovanje"
            },
            {
                name: "Zaposlovanje",
                register: "zaposlovanje"
            },
            {
                name: "Zaščita",
                register: "zascita"
            },
            {
                name: "Zdravje",
                register: "zdravje"
            },
        ]

    const organizacijaReaches = [
        {
            state: "local",
            text: "Lokalna"
        },
        {
            state: "regional",
            text: "Regionalna"
        },
        {
            state: "national",
            text: "Nacionalna"
        },
        {
            state: "multinational",
            text: "Multinacionalna"
        }
    ]

    const testLib: Organizacija[] = [
        {
            name: "Inštitut 8. marec",
            founded: 2016,
            reach: "national",
            img: undefined,
            femType: "woke",
            representatives: ["Nika Kovač"],
            workers: [],
            others: ["Luka Volk", "Simon Maljevac"],
            programs: ["#jaztudi", "Samo ja pomeni ja", "#Nisemprijavila", "#tusem: Pričanja upokojenk in upokojencev", "Naj Anhovo zadiha!", "Samo ljubezen"],
            genre: ["Aktivizem", "Izobrazba", "Neprofitna", "Svetovanje", "Krizna"],
            explanation: "Najrazličnejši programi za pomoč ženskam in družbi nasploh.",
            description: "Slovenska nevladna organizacija, ki svoje poslanstvo opredeljuje kot »prevpraševanje različnih oblik podrejenosti, predvsem na področju spola, ter postavljanje neenakopravnosti v širši družben okvir«.",
            ratings: {
                loves: 0,
                likes: 2,
                oks: 0,
                dislikes: 0,
                hates: 0
            }
        },
        {
            name: "Društvo za nenasilno komunikacijo",
            founded: undefined,
            reach: "national",
            img: undefined,
            femType: "woke",
            representatives: ["Katja Zabukovec Kerin"],
            workers: [],
            programs: ["Varna hiša za ženske"],
            others: [],
            genre: ["Krizna", "Pravna pomoč", "Izobrazba", "Neprofitna", "Nevladna"],
            explanation: "Čez imajo varno hišo za ženske.",
            description: "Društvo za nenasilno komunikacijo je nevladna, neprofitna in humanitarna organizacija, ki se ukvarja s preprečevanjem nasilja v družbi in širjenjem principov nenasilne komunikacije.",
            ratings: {
                loves: 0,
                likes: 2,
                oks: 1,
                dislikes: 0,
                hates: 0
            }
        },
        {
            name: "Ženski lobi Slovenije",
            founded: 2006,
            reach: "national",
            img: undefined,
            femType: "soc",
            representatives: ["Sonja Lokar"],
            workers: ["Jana Javornik", "Živa Humer", "Ana Jereb", "Tonja Jerele", "Liana Kalčina", "Lucija Užmah", "Živa Vidmar", "Katja Zabukovec Kerin"],
            programs: ["Klara Nahtigal", "Darja Sekula", "Alenka Verbole"],
            others: [],
            genre: ["Politika", "Aktivizem"],
            explanation: "Društvo za promocijo interesov žensk.",
            description: "Društvo Ženski lobi Slovenije (v nadaljevanju društvo) je prostovoljno, samostojno in nepridobitno društvo, ki se ustanavlja zaradi uresničevanja skupnih interesov ustanoviteljic.",
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

    const [selected, setSelected] = useState<Organizacija | null>(null);
    const [pic, setPic] = useState(selected?.img);

    const omniFilter = (querry: string) => {
        if (!querry) { return toast.error(`Neveljaven vnos.`) }

        const regArr = searchRegexCreator(querry);
        const result = searchRegexOmniFilter(regArr);
        if (result) { selectSetLibrary("org", result) }
    }

    const searchRegexOmniFilter = (regArr: string[]) => {
        const selection: Organizacija[] = selectBackup("org");
        const filtered = selection.filter(
            (organizacija) => {
                const name = organizacija.name.toUpperCase();
                const founded = organizacija.founded;
                const reach = organizacija.reach;
                const representatives = organizacija.representatives?.join(",").toUpperCase();
                const workers = organizacija.workers?.join(",").toUpperCase();
                const programs = organizacija.programs?.join(",").toUpperCase();
                const others = organizacija.others?.join(",").toUpperCase();
                const genre = organizacija.genre?.join(",").toUpperCase();
                const explanation = organizacija.explanation?.toUpperCase();
                const description = organizacija.description.toUpperCase();
                const joined = `
                    ${name ? name : ""};
                    ${founded ? founded : ""};
                    ${reach ? reach : ""};
                    ${representatives ? representatives : ""};
                    ${workers ? workers : ""};
                    ${programs ? programs : ""};
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
                    return organizacija;
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
            if (min < -60000 || min > currentYear) {
                if (min < -60000) {
                    toast.error(`Neveljavni iskalni nabor.
                    Moderni ljudje obstajajo samo približno 60.000 let.`);
                    return;
                }
                if (min > currentYear) {
                    toast.error(`Neveljavni iskalni nabor.
                    Baza zaenkrat ne vsebuje organizacij iz leta ${min}.
                    Ponovno poskusite v prihodnosti.`);
                    return;
                }
            }
        }
        if (max) {
            if (max < -60000 || max > currentYear) {
                if (max < -60000) {
                    toast.error(`Neveljavni iskalni nabor.
                    Moderni ljudje obstajajo samo približno 60.000 let.`);
                    return;
                }
                if (max > currentYear) {
                    toast.error(`Neveljavni iskalni nabor.
                    Baza zaenkrat ne vsebuje organizacij iz leta ${max}.
                    Ponovno poskusite v prihodnosti.`);
                    return;
                }
            }
        }

        if (min || max) {
            const result = testLib.filter((organizacija) => {
                const year = organizacija.founded
                if (year) {
                    if (min && max) {
                        if (min && max && min > max && year <= min && year >= max) {
                            return organizacija;
                        } else if (year >= min && year <= max) {
                            return organizacija;
                        }
                    }
                    if (min && !max && year >= min) {
                        return organizacija;
                    }
                    if (!min && max && year <= max) {
                        return organizacija;
                    }
                }
            })
            if (result) { selectSetLibrary("org", result) }
        }
    }

    const setGrid = (content: Organizacija) => {
        if (content) {
            let type = false;
            let creators = false;
            let explain = false;
            if (content.genre.length > 0 || content.femType) { type = true; }
            if (content.representatives.length > 0 || content.workers.length > 0 || content.programs.length > 0 || content.others.length > 0) { creators = true; }
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

    const defFormValues = (organizacija: Organizacija | null): OrganizacijaForm | undefined => {
        if (!organizacija) return;

        const defValues = {
            name: organizacija.name,
            start: organizacija.founded ? organizacija.founded : undefined,
            local: organizacija.reach === "local" ? true : false,
            regional: organizacija.reach === "regional" ? true : false,
            national: organizacija.reach === "national" ? true : false,
            multinational: organizacija.reach === "multinational" ? true : false,
            femType: organizacija.femType ? organizacija.femType : "",
            representatives: organizacija.representatives.join(", "),
            workers: organizacija.workers.join(", "),
            programs: organizacija.programs.join(", "),
            others: organizacija.others.join(", "),
            explanation: organizacija.explanation,
            description: organizacija.description,
        };

        organizacijaTypes.forEach(
            type => {
                const value = organizacija.genre.find(gen => gen === type.name) ? true : false;
                defValues[type.register] = value;
            }
        );
        return defValues;
    }

    const onSubmit = (data) => {
        if (!data) { return }

        const genreFilter = () => {
            const result: OrganizacijaType[] = [];
            data.aktivizem ? result.push("Aktivizem") : {};
            data.druzenje ? result.push("Druženje") : {};
            data.duhovnost ? result.push("Duhovnost") : {};
            data.financnapomoc ? result.push("Finančna pomoč") : {};
            data.izobrazba ? result.push("Izobrazba") : {};
            data.krizna ? result.push("Krizna") : {};
            data.kulturna ? result.push("Kulturna") : {};
            data.kulturnadejavnost ? result.push("Kulturna dejavnost") : {};
            data.materialnapomoc ? result.push("Materialna pomoč") : {};
            data.medsebojnapomoc ? result.push("Medsebojna pomoč") : {};
            data.neprofitna ? result.push("Neprofitna") : {};
            data.nevladna ? result.push("Nevladna") : {};
            data.okoljevarstvo ? result.push("Okoljevarstvo") : {};
            data.politika ? result.push("Politika") : {};
            data.pravnapomoc ? result.push("Pravna pomoč") : {};
            data.profitna ? result.push("Profitna") : {};
            data.rekreacija ? result.push("Rekreacija") : {};
            data.skrbalivarstvo ? result.push("Skrb ali varstvo") : {};
            data.svetovanje ? result.push("Svetovanje") : {};
            data.zaposlovanje ? result.push("Zaposlovanje") : {};
            data.zascita ? result.push("Zaščita") : {};
            data.zdravje ? result.push("Zdravje") : {};
            return result;
        }

        const reachError = () => {
            toast.error("Doseg ogranizacije je obvezno polje.")
        }

        const reach = data.local ? "local" :
            data.regional ? "regional" :
                data.national ? "national" :
                    data.multinational ? "multinational" :
                        reachError()

        if (!reach) {
            return;
        }

        const result: Organizacija = {
            name: data.name,
            founded: data.founded ? data.founded : undefined,
            reach: reach,
            img: pic ? pic : undefined,
            representatives: splitInput(data.representatives),
            workers: splitInput(data.workers),
            programs: splitInput(data.programs),
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
        organizacijaTypes,
        organizacijaReaches,
        defFormValues,
        setPic,
        setSelected,
        omniFilter,
        yearFilter,
        setGrid,
        onSubmit,
    }
}