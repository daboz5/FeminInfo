import { useEffect } from "react";
import { Knjiga } from "../../../type";
import { useForm } from "react-hook-form";
import useFemStore from "../../../useFemStore";
import useKnjiga from "./useKnjiga";
import Checkbox from "../../../utils/CheckBox";
import TextArea from "../../../utils/TextArea";
import PopupNote from "../../../utils/PopupNote";
import useComponent from "./useComponent";

export default function EditKnjiga(
    { knjiga, setEditor, setKnjiga }:
        {
            knjiga: Knjiga | null,
            setEditor(newState: boolean): void,
            setKnjiga(newState: null): void
        }
) {

    const { year } = useFemStore()

    const {
        handleType,
        handlePicChange,
    } = useComponent();

    const {
        pic,
        knjigaTypes,
        setPic,
        onSubmit,
        defFormValues
    } = useKnjiga();

    const {
        register,
        handleSubmit,
        watch,
        setValue,
    } = useForm({
        defaultValues: defFormValues(knjiga),
    });

    useEffect(() => {
        handleType(watch("femType"), watch("femType") ? true : false, setValue);
        setPic(knjiga?.img);
    }, [])

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="editForm container colFlex">
            <h2>Podatki knjigaa</h2>
            <div className="popBox">
                <h3>Naslov</h3>
                <PopupNote
                    id="knjigaTitle"
                    notes={["Naslov naj ne bo daljši od 200 znakov."]}
                />
            </div>
            <input
                type="text"
                {...register("title", { required: true, minLength: 1, maxLength: 200 })}>
            </input>

            <div className="popBox">
                <h3>Izšel</h3>
                <PopupNote
                    id="knjigaYear"
                    notes={["Knjiga je izšel / izhajal OD leta ____.", "Izhajal je več let in se zaključil DO leta ____.", "Če še izhaja, je še V PRODUKCIJI."]}
                />
            </div>
            <div id="editYearBox" className="colFlex">
                <div className="inBlock">
                    <label>
                        <p>od</p>
                        <input
                            type="number"
                            min={1888}
                            max={year}
                            {...register("start", { min: 1888, max: year })}>
                        </input>
                    </label>
                </div>
                <div className="editYear">
                    <label>
                        <p>do</p>
                        <input
                            type="number"
                            min={1888}
                            max={year}
                            {...register("finish", { min: 1888, max: year })}>
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

            <div className="popBox">
                <h3>Trajanje ogleda</h3>
                <PopupNote
                    id="knjigaLength"
                    notes={["Knjiga traja ___ minut. Če je epizod več, posamična epizoda traja ___ minut.", "Sezone vsebujejo ___ epizod."]}
                />
            </div>
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

            <div className="popBox">
                <h3>Naslovna slika</h3>
                <PopupNote
                    id="knjigaPicture"
                    notes={["Slika naj ne bo večja od 2 Mb."]}
                />
            </div>
            <div
                className="editPicBox colFlex">
                <img
                    className="editPic"
                    src={pic ?
                        pic :
                        knjiga?.img ?
                            knjiga.img :
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
                        onChange={(event) => handlePicChange(event.currentTarget.files![0], setPic)}
                        accept="image/png, image/jpeg, image/webp">
                    </input>
                </label>
            </div>

            <div className="popBox">
                <h3>Tip feminizma</h3>
                <PopupNote
                    id="knjigaFemType"
                    notes={
                        ["Družbeni, Woke ali Liberalni feminizem.",
                            "Družbeni označuje, da se knjiga osredotoča na družbene spremembe ali izpostavlja sistemske rešitve.",
                            "Liberalni označuje, da se knjiga osredotoča na posameznike, njihova doživetja in spopadanje s sistemom.",
                            "Woke označuje vmesno, oboje in ostalo.",
                            "Knjiga ni o ženskah in ni za ženske? Ne objavi."
                        ]
                    }
                />
            </div>
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
                            el.currentTarget.checked,
                            setValue
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
                            el.currentTarget.checked,
                            setValue
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
                            el.currentTarget.checked,
                            setValue
                        )}
                        {...register("femType")}
                    />
                </label>
            </div>

            <div className="popBox">
                <h3>Žanri</h3>
                <PopupNote
                    id="knjigaGenre"
                    notes={["Izberi do 5 žanrov, kateri najbolje označujejo knjiga."]}
                />
            </div>
            <div className="editGenreBox colFlex">
                {knjigaTypes.map((type, index) => {
                    const num = index + 1;
                    const label = knjigaTypes.find(genre => {
                        if (type.name === genre.name) {
                            return genre.register
                        }
                    })?.register;
                    const group = "editGenreCheckbox"
                    return (
                        <Checkbox
                            boxClass="editGenre"
                            checkId={label ? label : "error_register_" + "type.name" + "_not_found"}
                            checkClass={group}
                            afterText={type.name}
                            preChecked={
                                knjiga?.genre &&
                                    knjiga.genre.find((gen) => gen === type.name) ?
                                    true :
                                    false
                            }
                            limit={{
                                context: group,
                                max: 5
                            }}
                            key={"knjigaGenre" + num}
                            register={register}
                        />
                    )
                })}
            </div>

            <div className="popBox">
                <h3>Direkcija</h3>
                <PopupNote
                    id="knjigaDirection"
                    notes={["Kdo je vodja / odgovorni za nastanek knjigaa.", "Več vnosov loči z vejico ali podpičjem.", "Ne več kot 500 znakov."]}
                />
            </div>
            <TextArea
                id="editKnjigaDirection"
                name="direction"
                maxLength={500}
                register={register}
            />

            <div className="popBox">
                <h3>Igralci</h3>
                <PopupNote
                    id="knjigaActors"
                    notes={["Kdo vse nastopa v knjigau.", "Več vnosov loči z vejico ali podpičjem.", "Ne več kot 500 znakov."]}
                />
            </div>
            <TextArea
                id="editKnjigaActors"
                name="actors"
                maxLength={500}
                register={register}
            />

            <div className="popBox">
                <h3>Ostali sodelujoči</h3>
                <PopupNote
                    id="knjigaOthers"
                    notes={["Kdo razen direktorja in igralcev je še sodeloval.", "Več vnosov loči z vejico ali podpičjem.", "Ne več kot 500 znakov."]}
                />
            </div>
            <TextArea
                id="editKnjigaOthers"
                name="others"
                maxLength={500}
                register={register}
            />

            <div className="popBox">
                <h3>Objasnilo ustreznosti</h3>
                <PopupNote
                    id="knjigaExplanation"
                    notes={["Zakaj je vnos primeren za FeminInfo?", "Kaj si lahko feministke od njega ali ob njem obetajo?", "Ne več kot 750 znakov."]}
                />
            </div>
            <TextArea
                id="editKnjigaExplanation"
                name="explanation"
                maxLength={750}
                register={register}
            />

            <div className="popBox">
                <h3>Povzetek vsebine</h3>
                <PopupNote
                    id="knjigaSummary"
                    notes={["Kratek povzetek. Poskušaj ne razkriti informacij, s katerimi knjiga poskuša presenetiti.", "Ne več kot 1000 znakov."]}
                />
            </div>
            <TextArea
                id="editKnjigaDescription"
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
                {knjiga ?
                    <button
                        type="button"
                        className="actMouse"
                        onClick={() => {
                            setKnjiga(null)
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