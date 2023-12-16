import { useEffect } from "react";
import useFemStore from "../../useFemStore";
import useComponent from "./komponente/useComponent";
import useOddaja from "./komponente/useOddaja";
import TableOddaja from './komponente/TableOddaja';
import FilterOddaja from './komponente/FilterOddaja';
import ShowOddaja from "./komponente/ShowOddaja";
import EditOddaja from "./komponente/EditOddaja";

export default function Oddaje() {

    const { setLibOddaja, setBackupLibOddaja } = useFemStore();

    const {
        testLib,
        selected,
        setSelected,
    } = useOddaja();

    const {
        filter,
        editing,
        setFilter,
        setEditing,
    } = useComponent();

    useEffect(() => {
        setLibOddaja(testLib.sort(
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
        setBackupLibOddaja(testLib);
    }, []);

    return (
        <section
            id="mediaPage"
            className="container">
            {filter ?
                <FilterOddaja
                    filter={filter}
                    setFilter={setFilter}
                /> :
                <></>
            }
            {editing ?
                <EditOddaja
                    oddaja={selected}
                    setEditor={setEditing}
                    setOddaja={setSelected}
                /> :
                !selected ?
                    <>
                        <h2>Seznam oddajaov</h2>
                        <TableOddaja
                            setFilter={setFilter}
                            setOddaja={setSelected}
                            setEditor={setEditing}
                        />
                    </> :
                    <ShowOddaja
                        oddaja={selected}
                        setOddaja={setSelected}
                        setEditor={setEditing} />
            }
        </section>
    )
}