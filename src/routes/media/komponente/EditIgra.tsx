import { useForm } from "react-hook-form"
import { useEffect } from "react";
import { Igra } from "../../../type";
import useIgra from "./useIgra";
import Checkbox from "../../../utils/CheckBox";
import TextArea from "../../../utils/TextArea";
import PopupNote from "../../../utils/PopupNote";
import useFemStore from "../../../useFemStore";
import useComponent from "./useComponent";

export default function EditIgra(
    { igra, setEditor, setIgra }:
        {
            igra: Igra | null,
            setEditor(newState: boolean): void,
            setIgra(newState: null): void
        }
) {

    const { year } = useFemStore();

    const {
        handleType,
        handlePicChange,
    } = useComponent();

    const {
        pic,
        igraTypes,
        igraExtra,
        igraLenghts,
        igraPlatforms,
        setPic,
        onSubmit,
        defFormValues
    } = useIgra();

    const {
        register,
        handleSubmit,
        watch,
        setValue,
    } = useForm({
        defaultValues: defFormValues(igra),
    });

    useEffect(() => {
        handleType(watch("femType"), watch("femType") ? true : false, setValue);
        setPic(igra?.img);
    }, [])

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="editForm container colFlex">
            <h2>Filmski podatki</h2>
            <div className="popBox">
                <h3>Naslov</h3>
                <PopupNote
                    id="igraTitle"
                    notes={["Naslov naj ne bo daljši od 200 znakov."]}
                />
            </div>
            <input
                type="text"
                {...register("title", { required: true, minLength: 1, maxLength: 200 })}>
            </input>

            <div className="popBox">
                <h3>Izdana leta</h3>
                <PopupNote
                    id="igraYear"
                    notes={["Datum uradne izdaje, ne predizdaje."]}
                />
            </div>
            <div id="editYearBox" className="colFlex">
                <div className="inBlock">
                    <label>
                        <input
                            type="number"
                            min={1958}
                            max={year}
                            {...register("year", { min: 1958, max: year })}>
                        </input>
                    </label>
                </div>
            </div>

            <div className="popBox">
                <h3>Dolžina</h3>
                <PopupNote
                    id="igraLength"
                    notes={["Povprečna dolžina igre. Kratka, manj kot 6 ur. Dolga, več kot 6 ur. Neskončna, konec slabo definiran."]}
                />
            </div>
            <label id="editAverage" className="colFlex">
                {igraLenghts.map((el, index) => {
                    const num = index + 1;
                    const group = "editLengthCheckbox"
                    return <Checkbox
                        boxClass="editLength"
                        checkId={el}
                        checkClass={group}
                        afterText={el}
                        preChecked={
                            igra?.content.length &&
                                igra.content.length === el ?
                                true :
                                false
                        }
                        limit={{
                            context: group,
                            max: 1
                        }}
                        key={"length" + num}
                        register={register}
                    />
                }
                )}
            </label>

            <div className="popBox">
                <h3>Dodatne vsebine</h3>
                <PopupNote
                    id="igraExtra"
                    notes={["Vsebine igre izven zakupa osnovne igre. Film označuje, da je mogoče najti uradno dodatno filmsko gradivo. Publikacije označujejo, da je mogoče najti dodatno zgodbovno gradivo."]}
                />
            </div>
            <label id="editExtra" className="colFlex">
                {igraExtra.map((el, index) => {
                    const num = index + 1;
                    const label = el.toLowerCase();
                    const group = "editContentCheckbox";
                    const bonus = igra?.content.bonus_content
                    let checkmark = false;
                    switch (label) {
                        case "dlc":
                            checkmark = bonus?.dlc === true ? true : false;
                            break;
                        case "mikrotransakcije":
                            checkmark = bonus?.microtransactions === true ? true : false;
                            break;
                        case "publikacije":
                            checkmark = bonus?.publication === true ? true : false;
                            break;
                        case "film":
                            checkmark = bonus?.movie === true ? true : false;
                            break;
                        default: checkmark = false;
                    }
                    return <Checkbox
                        boxClass="editLength"
                        checkId={label}
                        checkClass={group}
                        afterText={el}
                        preChecked={checkmark}
                        key={"extra" + num}
                        register={register}
                    />
                }
                )}
            </label>

            <div className="popBox">
                <h3>Platforme</h3>
                <PopupNote
                    id="igraPlatforms"
                    notes={["Izberi platforme, na katerih je mogoče igro izbrati.",
                        "Če platforme ne najdeš, izberi DRUGO."]}
                />
            </div>
            <div className="colFlex">
                {igraPlatforms.map((type, index) => {
                    const num = index + 1;
                    const label = type.register
                    const group = "editPlatformsCheckbox"
                    return (
                        <Checkbox
                            boxClass="editPlatforms"
                            checkId={label}
                            checkClass={group}
                            afterText={type.name}
                            preChecked={
                                igra?.platforms &&
                                    igra.platforms.find((gen) => gen === type.name) ?
                                    true :
                                    false
                            }
                            key={"igraPlatform" + num}
                            register={register}
                        />
                    )
                })}
            </div>

            <div className="popBox">
                <h3>Naslovna slika</h3>
                <PopupNote
                    id="igraPicture"
                    notes={["Slika naj ne bo večja od 2 Mb."]}
                />
            </div>
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
                        onChange={(event) => handlePicChange(event.currentTarget.files![0], setPic)}
                        accept="image/png, image/jpeg, image/webp">
                    </input>
                </label>
            </div>

            <div className="popBox">
                <h3>Tip feminizma</h3>
                <PopupNote
                    id="igraFemType"
                    notes={
                        ["Družbeni, Woke ali Liberalni feminizem.",
                            "Družbeni označuje, da se film osredotoča na družbene spremembe ali izpostavlja sistemske rešitve.",
                            "Liberalni označuje, da se film osredotoča na posameznike, njihova doživetja in spopadanje s sistemom.",
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
                    id="igraGenre"
                    notes={["Izberi do 5 žanrov, kateri najbolje označujejo igro."]}
                />
            </div>
            <div className="editGenreBox colFlex">
                {igraTypes.map((type, index) => {
                    const num = index + 1;
                    const label = type.register
                    const group = "editGenreCheckbox"
                    return (
                        <Checkbox
                            boxClass="editGenre"
                            checkId={label}
                            checkClass={group}
                            afterText={type.name}
                            preChecked={
                                igra?.genre &&
                                    igra.genre.find((gen) => gen === type.name) ?
                                    true :
                                    false
                            }
                            limit={{
                                context: group,
                                max: 5
                            }}
                            key={"igraGenre" + num}
                            register={register}
                        />
                    )
                })}
            </div>

            <div className="popBox">
                <h3>Naredil</h3>
                <PopupNote
                    id="igraDeveloper"
                    notes={["Kdo je vodja / odgovorni za nastanek igre.", "Ne več kot 250 znakov."]}
                />
            </div>
            <TextArea
                id="editIgraDeveloper"
                name="developer"
                maxLength={250}
                register={register}
            />

            <div className="popBox">
                <h3>Založba</h3>
                <PopupNote
                    id="igraPublisher"
                    notes={["Katera založba je imela projekt čez.", "Ne več kot 250 znakov."]}
                />
            </div>
            <TextArea
                id="editIgraPublisher"
                name="publisher"
                maxLength={250}
                register={register}
            />

            <div className="popBox">
                <h3>Ostali sodelujoči</h3>
                <PopupNote
                    id="igraOthers"
                    notes={["Kdo vse je še sodeloval v projektu.", "Več vnosov loči z vejico ali podpičjem.", "Ne več kot 750 znakov."]}
                />
            </div>
            <TextArea
                id="editIgraOthers"
                name="others"
                maxLength={750}
                register={register}
            />

            <div className="popBox">
                <h3>Objasnilo ustreznosti</h3>
                <PopupNote
                    id="igraExplanation"
                    notes={["Zakaj je vnos primeren za FeminInfo?", "Kaj si lahko feministke od njega ali ob njem obetajo?", "Ne več kot 750 znakov."]}
                />
            </div>
            <TextArea
                id="editIgraExplanation"
                name="explanation"
                maxLength={750}
                register={register}
            />

            <div className="popBox">
                <h3>Povzetek vsebine</h3>
                <PopupNote
                    id="igraSummary"
                    notes={["Kratek povzetek. Poskušaj ne razkriti informacij, s katerimi film poskuša presenetiti.", "Ne več kot 1000 znakov."]}
                />
            </div>
            <TextArea
                id="editIgraDescription"
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