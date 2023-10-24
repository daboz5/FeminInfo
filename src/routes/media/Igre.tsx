import { useEffect } from "react";
import useFemStore from "../../useFemStore";
import useComponent from "./komponente/useComponent";
import useIgra from "./komponente/useIgra";
import TabeleIgra from "./komponente/TableIgra";
import FilterIgra from "./komponente/FilterIgra";
import ShowIgra from "./komponente/ShowIgra";
import EditIgra from "./komponente/EditIgra";

export default function Igre() {

    const { setLibIgra, setBackupLibIgra } = useFemStore();

    const {
        testLib,
        selected,
        setSelected
    } = useIgra();

    const {
        filter,
        editing,
        setFilter,
        setEditing,
    } = useComponent();

    useEffect(() => {
        setLibIgra(testLib.sort(
            (a, b) => {
                const titleA = a.title.toUpperCase();
                const titleB = b.title.toUpperCase();
                if (titleA < titleB) {
                    return -1;
                }
                if (titleA > titleB) {
                    return 1;
                }
                return 0;
            }));
        setBackupLibIgra(testLib);
    }, []);

    return (
        <section id="mediaPage" className="container">
            {filter ?
                <FilterIgra
                    filter={filter}
                    setFilter={setFilter}
                /> :
                <></>
            }
            {editing ?
                <EditIgra
                    igra={selected}
                    setEditor={setEditing}
                    setIgra={setSelected}
                /> :
                !selected ?
                    <>
                        <h2>Igralne vsebine</h2>
                        <TabeleIgra
                            setFilter={setFilter}
                            setIgra={setSelected}
                            setEditor={setEditing}
                        />
                    </> :
                    <ShowIgra
                        igra={selected}
                        setIgra={setSelected}
                        setEditor={setEditing} />
            }
        </section>
    )
}