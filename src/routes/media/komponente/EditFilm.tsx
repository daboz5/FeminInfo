import { useForm, SubmitHandler } from "react-hook-form"
import { useEffect } from "react";
import { Film, FilmGenre } from "../../../type";
import useFilm from "./useFilm";
import toast from "react-hot-toast";
import Checkbox from "../../../utils/CheckBox";
import TextArea from "../../../utils/TextArea";
import useComponent from "./useComponent";

export default function EditFilm(
    { film, setEditor, setFilm }:
        {
            film: Film | null,
            setEditor(newState: boolean): void,
            setFilm(newState: null): void
        }
) {

    const filmTypes: FilmGenre[] = [
        "Akcija",
        "Avantura",
        "Drama",
        "Dokumentarec",
        "Fantazija",
        "Grozljivka",
        "Isekai",
        "Komedija",
        "Kriminalka",
        "Misterija",
        "Romantika",
        "Satira",
        "Triler",
        "Zgodovina",
        "Znanstvena fantastika"
    ]

    const {
        pic,
        setPic,
        splitInput
    } = useFilm();

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            title: film?.title,
            start: film?.year.start ?
                film?.year.start :
                undefined,
            finish: film?.year.finish ?
                film?.year.finish :
                undefined,
            unfinished: film?.year.unfinished ? true : false,
            average: film?.length.average,
            episodes: film?.length.episodes,
            femType: film?.femType ? film.femType : undefined,
            akcija: film?.genre.find(gen => gen === "Akcija") ? true : false,
            avantura: film?.genre.find(gen => gen === "Avantura") ? true : false,
            drama: film?.genre.find(gen => gen === "Drama") ? true : false,
            dokumentarec: film?.genre.find(gen => gen === "Dokumentarec") ? true : false,
            fantazija: film?.genre.find(gen => gen === "Fantazija") ? true : false,
            grozljivka: film?.genre.find(gen => gen === "Grozljivka") ? true : false,
            isekai: film?.genre.find(gen => gen === "Isekai") ? true : false,
            komedija: film?.genre.find(gen => gen === "Komedija") ? true : false,
            kriminalka: film?.genre.find(gen => gen === "Kriminalka") ? true : false,
            misterija: film?.genre.find(gen => gen === "Misterija") ? true : false,
            romantika: film?.genre.find(gen => gen === "Romantika") ? true : false,
            satira: film?.genre.find(gen => gen === "Satira") ? true : false,
            scifi: film?.genre.find(gen => gen === "Znanstvena fantastika") ? true : false,
            triler: film?.genre.find(gen => gen === "Triler") ? true : false,
            zgodovina: film?.genre.find(gen => gen === "Zgodovina") ? true : false,
            direction: film?.director.join(", "),
            actors: film?.actors.join(", "),
            others: film?.others.join(", "),
            explanation: film?.explanation,
            description: film?.description,
        }
    });

    const onSubmit: SubmitHandler = (data) => {

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
            ratings: film?.ratings ?
                film.ratings :
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
        setPic(film?.img);
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
                        film?.img ?
                            film.img :
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
                {filmTypes.map((type, index) => {
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
                                film?.genre &&
                                    film.genre.find((gen) => gen === type) ?
                                    true :
                                    false
                            }
                            limit={{
                                filmt: group,
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
                {film ?
                    <button
                        type="button"
                        className="actMouse"
                        onClick={() => {
                            setFilm(null)
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