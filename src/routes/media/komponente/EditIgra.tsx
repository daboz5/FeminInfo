import { useForm, SubmitHandler } from "react-hook-form"
import { useEffect } from "react";
import { Igra, IgraGenre } from "../../../type";
import useComponent from "./useComponent";
import useIgra from "./useIgra";
import Checkbox from "../../../utils/CheckBox";
import TextArea from "../../../utils/TextArea";
import toast from "react-hot-toast";

export default function EditIgra(
    { igra, setEditor, setIgra }:
        {
            igra: Igra | null,
            setEditor(newState: boolean): void,
            setIgra(newState: null): void
        }
) {

    const igraTypes: IgraGenre[] = [
        "4X",
        "Akcija",
        "Anime",
        "Arkadna",
        "Avantura",
        "Bojevanje",
        "Co-op",
        "Fantazija",
        "Golota",
        "Grozljivka",
        "Igra vlog",
        "Karte",
        "Miselne igre",
        "Misterija",
        "MMO",
        "Preživetvena",
        "Simulator",
        "Slovanska",
        "Sproščena",
        "Strategija",
        "Streljanje",
        "Športna",
        "Upravljanje",
        "Vesolje",
        "Virtualni roman",
        "Zgodbovnica",
        "Zmenkarjenje"
    ]

    const {
        splitInput
    } = useComponent();

    const {
        pic,
        setPic,
    } = useIgra();

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            title: igra?.title,
            start: igra?.year.start ?
                igra?.year.start :
                undefined,
            finish: igra?.year.finish ?
                igra?.year.finish :
                undefined,
            unfinished: igra?.year.unfinished ? true : false,
            average: igra?.length.average,
            episodes: igra?.length.episodes,
            femType: igra?.femType ? igra.femType : undefined,
            akcija: igra?.genre.find(gen => gen === "Akcija") ? true : false,
            avantura: igra?.genre.find(gen => gen === "Avantura") ? true : false,
            drama: igra?.genre.find(gen => gen === "Drama") ? true : false,
            dokumentarec: igra?.genre.find(gen => gen === "Dokumentarec") ? true : false,
            fantazija: igra?.genre.find(gen => gen === "Fantazija") ? true : false,
            grozljivka: igra?.genre.find(gen => gen === "Grozljivka") ? true : false,
            isekai: igra?.genre.find(gen => gen === "Isekai") ? true : false,
            komedija: igra?.genre.find(gen => gen === "Komedija") ? true : false,
            kriminalka: igra?.genre.find(gen => gen === "Kriminalka") ? true : false,
            misterija: igra?.genre.find(gen => gen === "Misterija") ? true : false,
            romantika: igra?.genre.find(gen => gen === "Romantika") ? true : false,
            satira: igra?.genre.find(gen => gen === "Satira") ? true : false,
            scifi: igra?.genre.find(gen => gen === "Znanstvena fantastika") ? true : false,
            triler: igra?.genre.find(gen => gen === "Triler") ? true : false,
            zgodovina: igra?.genre.find(gen => gen === "Zgodovina") ? true : false,
            direction: igra?.director.join(", "),
            actors: igra?.actors.join(", "),
            others: igra?.others.join(", "),
            explanation: igra?.explanation,
            description: igra?.description,
        }
    });

    const onSubmit: SubmitHandler = (data) => {

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
            ratings: igra?.ratings ?
                igra.ratings :
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
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        handleType(watch("femType"), watch("femType") ? true : false);
        setPic(igra?.img);
    }, [])

    const handleType = (
        elValue: string | undefined,
        elCheck: boolean
    ) => {
        if (!elValue || elValue !== "soc" && elValue !== "woke" && elValue !== "lib") {
            return;
        }
        const els: HTMLInputElement[] = document.getElementsByClassName("editFemTypeImg");
        for (let i = 0; i < 3; i++) {
            els[i].style.boxShadow = "0 0 0 0 black";
        }
        elCheck ? setValue("femType", elValue) : setValue("femType", undefined)
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

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="editForm container colFlex">
            <h2>Filmski podatki</h2>
            <h3>Naslov</h3>
            <input
                type="text"
                {...register("title", { required: true, minLength: 1, maxLength: 200 })}>
            </input>

            <h3>Izšel</h3>
            <div id="editYearBox" className="colFlex">
                <div className="inBlock">
                    <label>
                        <p>od</p>
                        <input
                            type="number"
                            min={1888}
                            max={currentYear}
                            {...register("start", { min: 1888, max: currentYear })}>
                        </input>
                    </label>
                </div>
                <div className="editYear">
                    <label>
                        <p>do</p>
                        <input
                            type="number"
                            min={1888}
                            max={currentYear}
                            {...register("finish", { min: 1888, max: currentYear })}>
                        </input>
                    </label>
                </div>
                <Checkbox
                    boxClass="editYear"
                    checkId="unfinished"
                    checkClass="editUnfinished"
                    afterText="v produkciji"
                    register={register}
                />
            </div>

            <h3>Trajanje ogleda</h3>
            <div>
                <label id="editAverage">
                    <input
                        min={1}
                        max={5000}
                        type="number"
                        {...register("average", { min: 1, max: 5000 })}>
                    </input>
                    <p>min</p>
                </label>
                <label id="editSeasons">
                    <input
                        min={1}
                        max={5000}
                        type="number"
                        {...register("episodes", { min: 1, max: 5000 })}>
                    </input>
                    <p>št. epizod</p>
                </label>
            </div>

            <h3>Naslovna slika</h3>
            <div
                className="editPicBox colFlex">
                <img
                    className="editPic"
                    src={pic ?
                        pic :
                        igra?.img ?
                            igra.img :
                            "femininfoEyeIcon.png"
                    }
                    alt="Predogled naslovne slike"
                />
                <label
                    className="editPicLabel actMouse"
                    htmlFor="picBtn">
                    Nova slika
                    <input
                        type="file"
                        id="picBtn"
                        className="editPicBtn"
                        onChange={(event) => handlePicChange(event.currentTarget.files![0])}
                        accept="image/png, image/jpeg, image/webp">
                    </input>
                </label>
            </div>

            <h3>Tip feminizma</h3>
            <div className="editFemTypeBox">
                <label
                    htmlFor="editSoc">
                    <img
                        className="editFemTypeImg"
                        src="type-society.svg"
                        alt="družbeni"
                    />
                    <input
                        type="checkbox"
                        id="editSoc"
                        className="editFemTypeCheck"
                        value="soc"
                        onClick={(el) => handleType(
                            el.currentTarget.value,
                            el.currentTarget.checked
                        )}
                        {...register("femType")}
                    />
                </label>
                <label
                    htmlFor="editWoke">
                    <img
                        className="editFemTypeImg"
                        src="type-woke.svg"
                        alt="woke"
                    />
                    <input
                        type="checkbox"
                        id="editWoke"
                        className="editFemTypeCheck"
                        value="woke"
                        onClick={(el) => handleType(
                            el.currentTarget.value,
                            el.currentTarget.checked
                        )}
                        {...register("femType")}
                    />
                </label>
                <label
                    htmlFor="editLib">
                    <img
                        className="editFemTypeImg"
                        src="type-liberal.svg"
                        alt="liberalni"
                    />
                    <input
                        type="checkbox"
                        id="editLib"
                        className="editFemTypeCheck"
                        value="lib"
                        onClick={(el) => handleType(
                            el.currentTarget.value,
                            el.currentTarget.checked
                        )}
                        {...register("femType")}
                    />
                </label>
            </div>

            <h3>Žanri</h3>
            <div className="editGenreBox colFlex">
                {igraTypes.map((type, index) => {
                    const num = index + 1;
                    const label = type.toLowerCase().replace("znanstvena fantastika", "scifi");
                    const group = "editGenreCheckbox"
                    return (
                        <Checkbox
                            boxClass="editGenre"
                            checkId={label}
                            checkClass={group}
                            afterText={type}
                            preChecked={
                                igra?.genre &&
                                    igra.genre.find((gen) => gen === type) ?
                                    true :
                                    false
                            }
                            limit={{
                                context: group,
                                max: 5
                            }}
                            key={"genre" + num}
                            register={register}
                        />
                    )
                })}
            </div>

            <h3>Direkcija</h3>
            <TextArea
                id="editFilmDirection"
                name="direction"
                maxLength={1000}
                register={register}
            />

            <h3>Igralci</h3>
            <TextArea
                id="editFilmActors"
                name="actors"
                maxLength={1000}
                register={register}
            />

            <h3>Ostali sodelujoči</h3>
            <TextArea
                id="editFilmOthers"
                name="others"
                maxLength={1000}
                register={register}
            />

            <h3>Objasnilo ustreznosti</h3>
            <TextArea
                id="editFilmExplanation"
                name="explanation"
                maxLength={750}
                register={register}
            />

            <h3>Povzetek vsebine</h3>
            <TextArea
                id="editFilmDescription"
                name="description"
                required={true}
                maxLength={1500}
                register={register}
            />
            <div className="editOptionsBox colFlex">
                <button
                    type="submit"
                    className="actMouse">
                    Oddaj v pregled
                </button>
                <button
                    type="button"
                    className="actMouse"
                    onClick={() => setEditor(false)}>
                    Prekliči urejanje
                </button>
                {igra ?
                    <button
                        type="button"
                        className="actMouse"
                        onClick={() => {
                            setIgra(null)
                            setEditor(false)
                        }}>
                        Nazaj na tabelo
                    </button> :
                    <></>
                }
            </div>
        </form>
    )
}