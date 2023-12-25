import { useEffect } from "react";
import useFemStore from "../../useFemStore";
import useComponent from "./komponente/useComponent";
import useOrganizacija from "./komponente/useOrganizacija";
import TableOrganizacija from './komponente/TableOrganizacija';
import FilterOrganizacija from './komponente/FilterOrganizacija';
import ShowOrganizacija from "./komponente/ShowOrganizacija";
import EditOrganizacija from "./komponente/EditOrganizacija";

export default function Oddaje() {

    const { setLibOrganizacija, setBackupLibOrganizacija } = useFemStore();

    const {
        testLib,
        selected,
        setSelected,
    } = useOrganizacija();

    const {
        filter,
        editing,
        setFilter,
        setEditing,
    } = useComponent();

    useEffect(() => {
        setLibOrganizacija(testLib.sort(
            (a, b) => {
                const titleA = a.name.toUpperCase();
                const titleB = b.name.toUpperCase();
                if (titleA < titleB) {
                    return -1;
                }
                if (titleA > titleB) {
                    return 1;
                }
                return 0;
            }));
        setBackupLibOrganizacija(testLib);
    }, []);

    return (
        <section
            id="mediaPage"
            className="container">
            {filter ?
                <FilterOrganizacija
                    filter={filter}
                    setFilter={setFilter}
                /> :
                <></>
            }
            {editing ?
                <EditOrganizacija
                    organizacija={selected}
                    setEditor={setEditing}
                    setOrganizacija={setSelected}
                /> :
                !selected ?
                    <>
                        <h2>Seznam organizacijaov</h2>
                        <TableOrganizacija
                            setFilter={setFilter}
                            setOrganizacija={setSelected}
                            setEditor={setEditing}
                        />
                    </> :
                    <ShowOrganizacija
                        organizacija={selected}
                        setOrganizacija={setSelected}
                        setEditor={setEditing} />
            }
        </section>
    )
}