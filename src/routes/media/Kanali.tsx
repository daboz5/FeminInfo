import { useEffect } from "react";
import useFemStore from "../../useFemStore";
import useComponent from "./komponente/useComponent";
import useKanal from "./komponente/useKanal";
import TableKanal from './komponente/TableKanal';
import FilterKanal from './komponente/FilterKanal';
import ShowKanal from "./komponente/ShowKanal";
import EditKanal from "./komponente/EditKanal";

export default function Kanali() {

    const { setLibKanal, setBackupLibKanal } = useFemStore();

    const {
        testLib,
        selected,
        setSelected,
    } = useKanal();

    const {
        filter,
        editing,
        setFilter,
        setEditing,
    } = useComponent();

    useEffect(() => {
        setLibKanal(testLib.sort(
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
        setBackupLibKanal(testLib);
    }, []);

    return (
        <section
            id="mediaPage"
            className="container">
            {filter ?
                <FilterKanal
                    filter={filter}
                    setFilter={setFilter}
                /> :
                <></>
            }
            {editing ?
                <EditKanal
                    kanal={selected}
                    setEditor={setEditing}
                    setKanal={setSelected}
                /> :
                !selected ?
                    <>
                        <h2>Seznam kanalov</h2>
                        <TableKanal
                            setFilter={setFilter}
                            setKanal={setSelected}
                            setEditor={setEditing}
                        />
                    </> :
                    <ShowKanal
                        kanal={selected}
                        setKanal={setSelected}
                        setEditor={setEditing} />
            }
        </section>
    )
}