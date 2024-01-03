import { useEffect } from "react";
import { Revija } from "../../../type";
import { useForm } from "react-hook-form";
import useFemStore from "../../../useFemStore";
import useRevija from "./useRevija";
import Checkbox from "../../../utils/CheckBox";
import TextArea from "../../../utils/TextArea";
import PopupNote from "../../../utils/PopupNote";
import useComponent from "./useComponent";

export default function EditRevija(
    { revija, setEditor, setRevija }:
        {
            revija: Revija | null,
            setEditor(newState: boolean): void,
            setRevija(newState: null): void
        }
) {

    const { year } = useFemStore()

    const {
        handleType,
        handlePicChange,
    } = useComponent();

    const {
        pic,
        revijaTypes,
        revijaPerioda,
        setPic,
        onSubmit,
        defFormValues
    } = useRevija();

    const {
        register,
        handleSubmit,
        watch,
        setValue,
    } = useForm({
        defaultValues: defFormValues(revija),
    });

    useEffect(() => {
        handleType(watch("femType"), watch("femType") ? true : false, setValue);
        setPic(revija?.img);
    }, [])

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="editForm container colFlex">
            <h2>Podatki revije</h2>
            <div className="popBox">
                <h3>Naslov</h3>
                <PopupNote
                    id="revijaTitle"
                    notes={["Naslov naj ne bo daljši od 200 znakov.", "Če je vmes menjal ime, omeni v povzetku."]}
                    direction="down"
                />
            </div>
            <input
                type="text"
                {...register("title", { required: true, minLength: 1, maxLength: 200 })}>
            </input>

            <div className="popBox">
                <h3>Izhajanje</h3>
                <PopupNote
                    id="revijaYear"
                    notes={["Izhaja OD leta ____.", "Izhajala DO leta ____.", "Če še izhaja ali tega ne veš, pusti drugo polje prazno."]}
                />
            </div>
            <div id="editYearBox" className="colFlex">
                <div className="inBlock">
                    <label>
                        <p>od</p>
                        <input
                            type="number"
                            min={1663}
                            max={year}
                            {...register("start", { min: 1663, max: year })}>
                        </input>
                    </label>
                </div>
                <div className="editYear">
                    <label>
                        <p>do</p>
                        <input
                            type="number"
                            min={1663}
                            max={year}
                            {...register("end", { min: 1663, max: year })}>
                        </input>
                    </label>
                </div>
            </div>

            <div className="popBox">
                <h3>Pogostost objav</h3>
                <PopupNote
                    id="revijaFrequency"
                    notes={["je okoli ____."]}
                />
            </div>
            <div className="colFlex">
                <label id="editFreqInt">
                    <input
                        min={1}
                        max={31}
                        type="number"
                        {...register("freqInt", { min: 1, max: 31 })}>
                    </input>
                </label>
                <label id="editFreqUnit" className="colFlex">
                    {revijaPerioda.map((el, index) => {
                        const num = index + 1;
                        const group = "editFreqCheckbox"
                        return <Checkbox
                            boxClass="editFreq"
                            checkId={el.register}
                            checkClass={group}
                            afterText={el.text}
                            preChecked={
                                revija?.frequency.unit &&
                                    revija.frequency.unit === el.text ?
                                    true :
                                    false
                            }
                            limit={{
                                context: group,
                                max: 1
                            }}
                            key={"freq" + num}
                            register={register}
                        />
                    }
                    )}
                </label>
            </div>

            <div className="popBox">
                <h3>Povprečno število strani</h3>
                <PopupNote
                    id="revijaLength"
                    notes={["Povprečno število strani na izdajo je okoli ____."]}
                />
            </div>
            <div className="colFlex">
                <label id="editStr">
                    <p>cca</p>
                    <input
                        min={1}
                        max={1000}
                        type="number"
                        {...register("averageLength", { min: 1, max: 1000 })}>
                    </input>
                    <p>str</p>
                </label>
            </div>

            <div className="popBox">
                <h3>Naslovna slika</h3>
                <PopupNote
                    id="revijaPicture"
                    notes={["Slika naj ne bo večja od 2 Mb."]}
                />
            </div>
            <div
                className="editPicBox colFlex">
                <img
                    className="editPic"
                    src={pic ?
                        pic :
                        revija?.img ?
                            revija.img :
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
                    id="revijaFemType"
                    notes={
                        ["Družbeni, Woke ali Liberalni feminizem.",
                            "Družbeni označuje, da se revija osredotoča na družbene spremembe ali izpostavlja sistemske rešitve.",
                            "Liberalni označuje, da se revija osredotoča na posameznike, njihova doživetja in spopadanje s sistemom.",
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
                    id="revijaGenre"
                    notes={["Izberi do 5 žanrov, kateri najbolje označujejo revija."]}
                />
            </div>
            <div className="editGenreBox colFlex">
                {revijaTypes.map((type, index) => {
                    const num = index + 1;
                    const label = revijaTypes.find(genre => {
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
                                revija?.genre &&
                                    revija.genre.find((gen) => gen === type.name) ?
                                    true :
                                    false
                            }
                            limit={{
                                context: group,
                                max: 5
                            }}
                            key={"revijaGenre" + num}
                            register={register}
                        />
                    )
                })}
            </div>

            <div className="popBox">
                <h3>Organizacije</h3>
                <PopupNote
                    id="revijaOrganizacije"
                    notes={["Katere organizacije odgovarjajo za izhajanje.", "Več vnosov loči z vejico ali podpičjem.", "Ne več kot 500 znakov."]}
                />
            </div>
            <TextArea
                id="editRevijaOrganizacije"
                name="companies"
                maxLength={500}
                register={register}
            />

            <div className="popBox">
                <h3>Avtorji</h3>
                <PopupNote
                    id="revijaAvtor"
                    notes={["Kdo oddaja prispevke publikacije.", "Več vnosov loči z vejico ali podpičjem.", "Ne več kot 500 znakov."]}
                />
            </div>
            <TextArea
                id="editRevijaAvtor"
                name="authors"
                maxLength={500}
                register={register}
            />

            <div className="popBox">
                <h3>Jeziki</h3>
                <PopupNote
                    id="revijaJeziki"
                    notes={["V katerih jezikih je revijo mogoče najti.", "Več vnosov loči z vejico ali podpičjem.", "Ne več kot 1000 znakov."]}
                />
            </div>
            <TextArea
                id="editRevijaJeziki"
                name="languages"
                maxLength={1000}
                register={register}
            />

            <div className="popBox">
                <h3>Ostali sodelujoči</h3>
                <PopupNote
                    id="revijaOthers"
                    notes={["Kdo je še sodeloval kako drugače.", "Več vnosov loči z vejico ali podpičjem.", "Ne več kot 500 znakov."]}
                />
            </div>
            <TextArea
                id="editRevijaOthers"
                name="others"
                maxLength={500}
                register={register}
            />

            <div className="popBox">
                <h3>Objasnilo ustreznosti</h3>
                <PopupNote
                    id="revijaExplanation"
                    notes={["Zakaj je vnos primeren za FeminInfo?", "Kaj si lahko feministke od njega ali ob njem obetajo?", "Ne več kot 750 znakov."]}
                />
            </div>
            <TextArea
                id="editRevijaExplanation"
                name="explanation"
                maxLength={750}
                register={register}
            />

            <div className="popBox">
                <h3>Povzetek vsebine</h3>
                <PopupNote
                    id="revijaSummary"
                    notes={["Kratek povzetek. Poskušaj ne razkriti informacij, s katerimi revija poskuša presenetiti.", "Ne več kot 1000 znakov."]}
                />
            </div>
            <TextArea
                id="editRevijaDescription"
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
                {revija ?
                    <button
                        type="button"
                        className="actMouse"
                        onClick={() => {
                            setRevija(null)
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