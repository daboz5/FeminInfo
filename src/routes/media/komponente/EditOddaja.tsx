import { useEffect } from "react";
import { Oddaja } from "../../../type";
import { useForm } from "react-hook-form";
import useFemStore from "../../../useFemStore";
import useOddaja from "./useOddaja";
import Checkbox from "../../../utils/CheckBox";
import TextArea from "../../../utils/TextArea";
import PopupNote from "../../../utils/PopupNote";
import useComponent from "./useComponent";

export default function EditOddaja(
    { oddaja, setEditor, setOddaja }:
        {
            oddaja: Oddaja | null,
            setEditor(newState: boolean): void,
            setOddaja(newState: null): void
        }
) {

    const { year } = useFemStore()

    const {
        handleType,
        handlePicChange,
    } = useComponent();

    const {
        pic,
        oddajaTypes,
        setPic,
        onSubmit,
        defFormValues
    } = useOddaja();

    const {
        register,
        handleSubmit,
        watch,
        setValue,
    } = useForm({
        defaultValues: defFormValues(oddaja),
    });

    useEffect(() => {
        handleType(watch("femType"), watch("femType") ? true : false, setValue);
        setPic(oddaja?.img);
    }, [])

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="editForm container colFlex">
            <h2>Podatki oddajaa</h2>
            <div className="popBox">
                <h3>Naslov</h3>
                <PopupNote
                    id="oddajaTitle"
                    notes={["Naslov naj ne bo daljši od 200 znakov.", "Če je vmes menjal ime, omeni v povzetku."]}
                    direction="down"
                />
            </div>
            <input
                type="text"
                {...register("title", { required: true, minLength: 1, maxLength: 200 })}>
            </input>

            <div className="popBox">
                <h3>Produkcija</h3>
                <PopupNote
                    id="oddajaYear"
                    notes={["Objavlja OD leta ____.", "Objavljal DO leta ____.", "Če še objavlja ali tega ne veš, pusti drugo polje prazno."]}
                />
            </div>
            <div id="editYearBox" className="colFlex">
                <div className="inBlock">
                    <label>
                        <p>od</p>
                        <input
                            type="number"
                            min={1993}
                            max={year}
                            {...register("start", { min: 1993, max: year })}>
                        </input>
                    </label>
                </div>
                <div className="editYear">
                    <label>
                        <p>do</p>
                        <input
                            type="number"
                            min={1993}
                            max={year}
                            {...register("finish", { min: 1993, max: year })}>
                        </input>
                    </label>
                </div>
            </div>

            <div className="popBox">
                <h3>Trajanje ogleda</h3>
                <PopupNote
                    id="oddajaLength"
                    notes={["Krajši video traja ___ minut.", "Daljši video traja ___ minut.", "Oddaja ima objavljenih ___ videov."]}
                />
            </div>
            <div className="colFlex">
                <label id="editMin">
                    <p>od</p>
                    <input
                        min={1}
                        max={1000}
                        type="number"
                        {...register("minLength", { min: 1, max: 1000 })}>
                    </input>
                    <p>min</p>
                </label>
                <label id="editMax">
                    <p>do</p>
                    <input
                        min={1}
                        max={1000}
                        type="number"
                        {...register("maxLength", { min: 1, max: 1000 })}>
                    </input>
                    <p>min</p>
                </label>
                <label id="editSeasons">
                    <input
                        min={1}
                        max={10000}
                        type="number"
                        {...register("episodes", { min: 1, max: 10000 })}>
                    </input>
                    <p>št. videov</p>
                </label>
            </div>

            <div className="popBox">
                <h3>Naslovna slika</h3>
                <PopupNote
                    id="oddajaPicture"
                    notes={["Slika naj ne bo večja od 2 Mb."]}
                />
            </div>
            <div
                className="editPicBox colFlex">
                <img
                    className="editPic"
                    src={pic ?
                        pic :
                        oddaja?.img ?
                            oddaja.img :
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
                    id="oddajaFemType"
                    notes={
                        ["Družbeni, Woke ali Liberalni feminizem.",
                            "Družbeni označuje, da se oddaja osredotoča na družbene spremembe ali izpostavlja sistemske rešitve.",
                            "Liberalni označuje, da se oddaja osredotoča na posameznike, njihova doživetja in spopadanje s sistemom.",
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
                    id="oddajaGenre"
                    notes={["Izberi do 5 žanrov, kateri najbolje označujejo oddaja."]}
                />
            </div>
            <div className="editGenreBox colFlex">
                {oddajaTypes.map((type, index) => {
                    const num = index + 1;
                    const label = oddajaTypes.find(genre => {
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
                                oddaja?.genre &&
                                    oddaja.genre.find((gen) => gen === type.name) ?
                                    true :
                                    false
                            }
                            limit={{
                                context: group,
                                max: 5
                            }}
                            key={"oddajaGenre" + num}
                            register={register}
                        />
                    )
                })}
            </div>

            <div className="popBox">
                <h3>Platforme</h3>
                <PopupNote
                    id="oddajaPlatforme"
                    notes={["Na katerih platformah jih je mogoče najti.", "Več vnosov loči z vejico ali podpičjem.", "Ne več kot 500 znakov."]}
                />
            </div>
            <TextArea
                id="editOddajaPlatforms"
                name="platforms"
                maxLength={500}
                register={register}
            />

            <div className="popBox">
                <h3>Gostitelj</h3>
                <PopupNote
                    id="oddajaGostitelj"
                    notes={["Kdo vodi oddajo oz. gosti goste.", "Več vnosov loči z vejico ali podpičjem.", "Ne več kot 500 znakov."]}
                />
            </div>
            <TextArea
                id="editOddajaGostitelj"
                name="hosts"
                maxLength={500}
                register={register}
            />

            <div className="popBox">
                <h3>Gostje</h3>
                <PopupNote
                    id="oddajaGostje"
                    notes={["Kdo je že nastopal oz. bil gost.", "Več vnosov loči z vejico ali podpičjem.", "Ne več kot 1000 znakov."]}
                />
            </div>
            <TextArea
                id="editOddajaGostje"
                name="guests"
                maxLength={1000}
                register={register}
            />

            <div className="popBox">
                <h3>Ostali sodelujoči</h3>
                <PopupNote
                    id="oddajaOthers"
                    notes={["Kdo je še sodeloval kako drugače.", "Več vnosov loči z vejico ali podpičjem.", "Ne več kot 500 znakov."]}
                />
            </div>
            <TextArea
                id="editOddajaOthers"
                name="others"
                maxLength={500}
                register={register}
            />

            <div className="popBox">
                <h3>Objasnilo ustreznosti</h3>
                <PopupNote
                    id="oddajaExplanation"
                    notes={["Zakaj je vnos primeren za FeminInfo?", "Kaj si lahko feministke od njega ali ob njem obetajo?", "Ne več kot 750 znakov."]}
                />
            </div>
            <TextArea
                id="editOddajaExplanation"
                name="explanation"
                maxLength={750}
                register={register}
            />

            <div className="popBox">
                <h3>Povzetek vsebine</h3>
                <PopupNote
                    id="oddajaSummary"
                    notes={["Kratek povzetek. Poskušaj ne razkriti informacij, s katerimi oddaja poskuša presenetiti.", "Ne več kot 1000 znakov."]}
                />
            </div>
            <TextArea
                id="editOddajaDescription"
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
                {oddaja ?
                    <button
                        type="button"
                        className="actMouse"
                        onClick={() => {
                            setOddaja(null)
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