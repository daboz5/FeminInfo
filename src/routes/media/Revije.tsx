import { useEffect } from "react";
import useFemStore from "../../useFemStore";
import useComponent from "./komponente/useComponent";
import useRevija from "./komponente/useRevija";
import TableRevija from './komponente/TableRevija';
import FilterRevija from './komponente/FilterRevija';
import ShowRevija from "./komponente/ShowRevija";
import EditRevija from "./komponente/EditRevija";

export default function Revije() {

    const { setLibRevija, setBackupLibRevija } = useFemStore();

    const {
        testLib,
        selected,
        setSelected,
    } = useRevija();

    const {
        filter,
        editing,
        setFilter,
        setEditing,
    } = useComponent();

    useEffect(() => {
        setLibRevija(testLib.sort(
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
        setBackupLibRevija(testLib);
    }, []);

    return (
        <section
            id="mediaPage"
            className="container">
            {filter ?
                <FilterRevija
                    filter={filter}
                    setFilter={setFilter}
                /> :
                <></>
            }
            {editing ?
                <EditRevija
                    revija={selected}
                    setEditor={setEditing}
                    setRevija={setSelected}
                /> :
                !selected ?
                    <>
                        <h2>Seznam revij</h2>
                        <TableRevija
                            setFilter={setFilter}
                            setRevija={setSelected}
                            setEditor={setEditing}
                        />
                    </> :
                    <ShowRevija
                        revija={selected}
                        setRevija={setSelected}
                        setEditor={setEditing} />
            }
        </section>
    )
}