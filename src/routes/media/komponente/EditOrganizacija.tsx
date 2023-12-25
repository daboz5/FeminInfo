import { useEffect } from "react";
import { Organizacija } from "../../../type";
import { useForm } from "react-hook-form";
import useFemStore from "../../../useFemStore";
import useOrganizacija from "./useOrganizacija";
import Checkbox from "../../../utils/CheckBox";
import TextArea from "../../../utils/TextArea";
import PopupNote from "../../../utils/PopupNote";
import useComponent from "./useComponent";

export default function EditOrganizacija(
    { organizacija, setEditor, setOrganizacija }:
        {
            organizacija: Organizacija | null,
            setEditor(newState: boolean): void,
            setOrganizacija(newState: null): void
        }
) {

    const { year } = useFemStore()

    const {
        handleType,
        handlePicChange,
    } = useComponent();

    const {
        pic,
        organizacijaTypes,
        organizacijaReaches,
        setPic,
        onSubmit,
        defFormValues
    } = useOrganizacija();

    const {
        register,
        handleSubmit,
        watch,
        setValue,
    } = useForm({
        defaultValues: defFormValues(organizacija),
    });

    useEffect(() => {
        handleType(watch("femType"), watch("femType") ? true : false, setValue);
        setPic(organizacija?.img);
    }, [])

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="editForm container colFlex">
            <h2>Podatki organizacije</h2>
            <div className="popBox">
                <h3>Ime</h3>
                <PopupNote
                    id="organizacijaName"
                    notes={["Ime naj ne bo daljše od 200 znakov.", "Če je vmes menjala ime, omeni v povzetku."]}
                    direction="down"
                />
            </div>
            <input
                type="text"
                {...register("name", { required: true, minLength: 1, maxLength: 200 })}>
            </input>

            <div className="popBox">
                <h3>Začetek</h3>
                <PopupNote
                    id="organizacijaYear"
                    notes={["Ustanovljena leta ____."]}
                />
            </div>
            <div id="editYearBox" className="colFlex">
                <div className="inBlock">
                    <label>
                        <p>Ustanovljena leta</p>
                        <input
                            type="number"
                            min={-60000}
                            max={year}
                            {...register("founded", { min: -60000, max: year })}>
                        </input>
                    </label>
                </div>
            </div>

            <div className="popBox">
                <h3>Doseg</h3>
                <PopupNote
                    id="organizacijaReach"
                    notes={["Doseg izvajanja internih dejavnosti organizacije."]}
                />
            </div>
            <label id="editReach" className="colFlex">
                {organizacijaReaches.map((el, index) => {
                    const num = index + 1;
                    const group = "editReachCheckbox"
                    return <Checkbox
                        boxClass="editReach"
                        checkId={el.state}
                        checkClass={group}
                        afterText={el.state === "local" ? el.text :
                            el.state === "regional" ? el.text :
                                el.state === "national" ? el.text :
                                    el.state === "multinational" ? el.text :
                                        ""}
                        preChecked={
                            organizacija?.reach &&
                                organizacija.reach === el.state ?
                                true :
                                false
                        }
                        limit={{
                            context: group,
                            max: 1
                        }}
                        key={"reach" + num}
                        register={register}
                    />
                }
                )}
            </label>

            <div className="popBox">
                <h3>Naslovna slika</h3>
                <PopupNote
                    id="organizacijaPicture"
                    notes={["Slika naj ne bo večja od 2 Mb."]}
                />
            </div>
            <div
                className="editPicBox colFlex">
                <img
                    className="editPic"
                    src={pic ?
                        pic :
                        organizacija?.img ?
                            organizacija.img :
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
                    id="organizacijaFemType"
                    notes={
                        ["Družbeni, Woke ali Liberalni feminizem.",
                            "Družbeni označuje, da se organizacija osredotoča na družbene spremembe ali izpostavlja sistemske rešitve.",
                            "Liberalni označuje, da se organizacija osredotoča na posameznike, njihova doživetja in spopadanje s sistemom.",
                            "Woke označuje vmesno, oboje in ostalo.",
                            "Film ni o ženskah in ni za ženske? Ne objavi."
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
                    id="organizacijaGenre"
                    notes={["Izberi do 5 žanrov, kateri najbolje označujejo organizacija."]}
                />
            </div>
            <div className="editGenreBox colFlex">
                {organizacijaTypes.map((type, index) => {
                    const num = index + 1;
                    const label = organizacijaTypes.find(genre => {
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
                                organizacija?.genre &&
                                    organizacija.genre.find((gen) => gen === type.name) ?
                                    true :
                                    false
                            }
                            limit={{
                                context: group,
                                max: 5
                            }}
                            key={"organizacijaGenre" + num}
                            register={register}
                        />
                    )
                })}
            </div>

            <div className="popBox">
                <h3>Predstavniki</h3>
                <PopupNote
                    id="organizacijaPredstavniki"
                    notes={["Kdo so ali so bili predstavniki organizacije.", "Več vnosov loči z vejico ali podpičjem.", "Ne več kot 500 znakov."]}
                />
            </div>
            <TextArea
                id="editOrganizacijaPredstavniki"
                name="representatives"
                maxLength={500}
                register={register}
            />

            <div className="popBox">
                <h3>Delavci</h3>
                <PopupNote
                    id="organizacijaDelavci"
                    notes={["Kdo je znan da dela v organizaciji.", "Več vnosov loči z vejico ali podpičjem.", "Ne več kot 500 znakov."]}
                />
            </div>
            <TextArea
                id="editOrganizacijaDelavci"
                name="workers"
                maxLength={500}
                register={register}
            />

            <div className="popBox">
                <h3>Programi</h3>
                <PopupNote
                    id="organizacijaProgrami"
                    notes={["Kaj so ali so bili programi organizacije.", "Podrobneje lahko v Kratek opis.", "Več vnosov loči z vejico ali podpičjem.", "Ne več kot 1000 znakov."]}
                />
            </div>
            <TextArea
                id="editOrganizacijaProgrami"
                name="programs"
                maxLength={1000}
                register={register}
            />

            <div className="popBox">
                <h3>Ostali sodelujoči</h3>
                <PopupNote
                    id="organizacijaOthers"
                    notes={["Kdo je še sodeloval kako drugače.", "Več vnosov loči z vejico ali podpičjem.", "Ne več kot 500 znakov."]}
                />
            </div>
            <TextArea
                id="editOrganizacijaOthers"
                name="others"
                maxLength={500}
                register={register}
            />

            <div className="popBox">
                <h3>Objasnilo ustreznosti</h3>
                <PopupNote
                    id="organizacijaExplanation"
                    notes={["Zakaj je vnos primeren za FeminInfo?", "Kaj si lahko feministke od njega ali ob njem obetajo?", "Ne več kot 750 znakov."]}
                />
            </div>
            <TextArea
                id="editOrganizacijaExplanation"
                name="explanation"
                maxLength={750}
                register={register}
            />

            <div className="popBox">
                <h3>Kratek opis</h3>
                <PopupNote
                    id="organizacijaSummary"
                    notes={["Kratek povzetek. Poskušaj ne razkriti informacij, s katerimi organizacija poskuša presenetiti.", "Ne več kot 1000 znakov."]}
                />
            </div>
            <TextArea
                id="editOrganizacijaDescription"
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
                {organizacija ?
                    <button
                        type="button"
                        className="actMouse"
                        onClick={() => {
                            setOrganizacija(null)
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