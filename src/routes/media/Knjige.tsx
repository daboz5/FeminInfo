import { useEffect } from "react";
import useFemStore from "../../useFemStore";
import useComponent from "./komponente/useComponent";
import useKnjiga from "./komponente/useKnjiga";
import TableKnjiga from './komponente/TableKnjiga';
import FilterKnjiga from './komponente/FilterKnjiga';
import ShowKnjiga from "./komponente/ShowKnjiga";
import EditKnjiga from "./komponente/EditKnjiga";

export default function Knjige() {

    const { setLibKnjiga, setBackupLibKnjiga } = useFemStore();

    const {
        testLib,
        selected,
        setSelected,
    } = useKnjiga();

    const {
        filter,
        editing,
        setFilter,
        setEditing,
    } = useComponent();

    useEffect(() => {
        setLibKnjiga(testLib.sort(
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
        setBackupLibKnjiga(testLib);
    }, []);

    return (
        <section
            id="mediaPage"
            className="container">
            {filter ?
                <FilterKnjiga
                    filter={filter}
                    setFilter={setFilter}
                /> :
                <></>
            }
            {editing ?
                <EditKnjiga
                    knjiga={selected}
                    setEditor={setEditing}
                    setKnjiga={setSelected}
                /> :
                !selected ?
                    <>
                        <h2>Seznam knjig</h2>
                        <TableKnjiga
                            setFilter={setFilter}
                            setKnjiga={setSelected}
                            setEditor={setEditing}
                        />
                    </> :
                    <ShowKnjiga
                        knjiga={selected}
                        setKnjiga={setSelected}
                        setEditor={setEditing} />
            }
        </section>
    )
}