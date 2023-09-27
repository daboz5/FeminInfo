import { useForm, SubmitHandler } from "react-hook-form"
import { useEffect } from "react";
import { Film } from "../../../type";
import useFilm from "../../../utils/useFilm";
import toast from "react-hot-toast";
import Checkbox from "../../../utils/CheckBox";
import TextArea from "../../../utils/TextArea";

export default function EditFilm(
    { contex, closeEditor }:
        {
            contex: Film | null,
            closeEditor(newState: boolean): void
        }
) {

    const {
        filmTypes,
        pic,
        setPic,
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
            title: contex?.title,
            fromYear: contex?.year?.start ?
                contex?.year.start :
                undefined,
            toYear: contex?.year?.finish ?
                contex?.year.finish :
                undefined,
            unfinished: contex?.year?.unfinished ? true : false,
            averageTime: contex?.length?.average,
            episodes: contex?.length?.episodes,
            femType: contex?.femType ? contex.femType : undefined,
            action: contex?.genre?.find(gen => gen === "Akcija") ? true : false,
            avantura: contex?.genre?.find(gen => gen === "Avantura") ? true : false,
            drama: contex?.genre?.find(gen => gen === "Drama") ? true : false,
            dokumentarec: contex?.genre?.find(gen => gen === "Dokumentarec") ? true : false,
            fantazija: contex?.genre?.find(gen => gen === "Fantazija") ? true : false,
            grozljivka: contex?.genre?.find(gen => gen === "Grozljivka") ? true : false,
            isekai: contex?.genre?.find(gen => gen === "Isekai") ? true : false,
            komedija: contex?.genre?.find(gen => gen === "Komedija") ? true : false,
            kriminalka: contex?.genre?.find(gen => gen === "Kriminalka") ? true : false,
            misterija: contex?.genre?.find(gen => gen === "Misterija") ? true : false,
            romantika: contex?.genre?.find(gen => gen === "Romantika") ? true : false,
            satira: contex?.genre?.find(gen => gen === "Satira") ? true : false,
            scifi: contex?.genre?.find(gen => gen === "Znanstvena fantastika") ? true : false,
            triler: contex?.genre?.find(gen => gen === "Triler") ? true : false,
            zgodovina: contex?.genre?.find(gen => gen === "Zgodovina") ? true : false,
            direction: contex?.director?.join(", "),
            actors: contex?.actors?.join(", "),
            others: contex?.others?.join(", "),
            explanation: contex?.explanation,
            description: contex?.description,
        }
    });

    const onSubmit: SubmitHandler = (data) => console.log(data);
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        handleType(watch("femType"), watch("femType") ? true : false)
    }, [])

    const handleType = (
        elValue: string | undefined,
        elCheck: boolean
    ) => {
        if (!elValue || elValue !== "soc" && elValue !== "woke" && elValue !== "lib") {
            return;
        }
        const elements: HTMLInputElement[] = document.getElementsByClassName("editFemTypeImg");
        for (let i = 0; i < 3; i++) {
            elements[i].style.boxShadow = "0 0 0 0 black";
        }
        elCheck ? setValue("femType", elValue) : setValue("femType", undefined)
        elCheck ?
            elValue === "soc" ?
                elements[0].style.boxShadow = "0 0 10px 5px black" :
                elValue === "woke" ?
                    elements[1].style.boxShadow = "0 0 10px 5px black" :
                    elValue === "lib" ?
                        elements[2].style.boxShadow = "0 0 10px 5px black" :
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
            className="editForm container">
            <h2>Filmski podatki</h2>
            <h3>Naslov</h3>
            <input
                type="text"
                {...register("title", { required: true, minLength: 1, maxLength: 200 })}>
            </input>

            <h3>Izšel</h3>
            <div id="editYearBox">
                <div className="editYear">
                    <label>
                        <p>od</p>
                        <input
                            type="number"
                            min={1888}
                            max={currentYear}
                            {...register("fromYear", { min: 1888, max: currentYear })}>
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
                            {...register("toYear", { min: 1888, max: currentYear })}>
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
                        max={5100}
                        type="number"
                        {...register("averageTime", { min: 1, max: 5100 })}>
                    </input>
                    <p>min</p>
                </label>
                <label id="editSeasons">
                    <input
                        min={1}
                        max={9999}
                        type="number"
                        {...register("episodes", { min: 1, max: 9999 })}>
                    </input>
                    <p>št. epizod</p>
                </label>
            </div>

            <h3>Naslovna slika</h3>
            <div
                className="editPicBox">
                <img
                    className="editPic"
                    src={pic ?
                        pic :
                        contex?.img ?
                            contex.img :
                            "femininfoEyeIcon.png"
                    }
                    alt="Predogled naslovne slike"
                />
                <label
                    className="editPicLabel"
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
            <div className="editGenreBox">
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
                                contex?.genre &&
                                    contex.genre.find((gen) => gen === type) ?
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
            <div className="optionsBox">
                <button type="submit">Oddaj v pregled</button>
                <button type="button" onClick={() => closeEditor(false)}>Prekliči</button>
            </div>
        </form>
    )
}