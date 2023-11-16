import { useForm } from "react-hook-form"
import { useEffect } from "react";
import { Igra } from "../../../type";
import useIgra from "./useIgra";
import Checkbox from "../../../utils/CheckBox";
import TextArea from "../../../utils/TextArea";
import PopupNote from "../../../utils/PopupNote";
import useFemStore from "../../../useFemStore";

export default function EditIgra(
    { igra, setEditor, setIgra }:
        {
            igra: Igra | null,
            setEditor(newState: boolean): void,
            setIgra(newState: null): void
        }
) {

    const { year } = useFemStore()

    const {
        pic,
        igraTypes,
        igraExtra,
        igraLenghts,
        setPic,
        handleType,
        handlePicChange,
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
                    const group = "editContentCheckbox"
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
                        case "mikrotranzakcije":
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

            <h3>Žanri</h3>
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