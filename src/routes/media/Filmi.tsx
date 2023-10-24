import { useEffect } from "react";
import useFemStore from "../../useFemStore";
import useComponent from "./komponente/useComponent";
import useFilm from "./komponente/useFilm";
import TableFilm from './komponente/TableFilm';
import FilterFilm from './komponente/FilterFilm';
import ShowFilm from "./komponente/ShowFilm";
import EditFilm from "./komponente/EditFilm";

export default function Filmi() {

    const { setLibFilm, setBackupLibFilm } = useFemStore();

    const {
        selected,
        testLib,
        setSelected
    } = useFilm();

    const {
        filter,
        editing,
        setFilter,
        setEditing,
    } = useComponent();

    useEffect(() => {
        setLibFilm(testLib.sort(
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
        setBackupLibFilm(testLib);
    }, []);

    return (
        <section
            id="mediaPage"
            className="container">
            {filter ?
                <FilterFilm
                    filter={filter}
                    setFilter={setFilter}
                /> :
                <></>
            }
            {editing ?
                <EditFilm
                    film={selected}
                    setEditor={setEditing}
                    setFilm={setSelected}
                /> :
                !selected ?
                    <>
                        <h2>Filmske vsebine</h2>
                        <TableFilm
                            setFilter={setFilter}
                            setFilm={setSelected}
                            setEditor={setEditing}
                        />
                    </> :
                    <ShowFilm
                        film={selected}
                        setFilm={setSelected}
                        setEditor={setEditing} />
            }
        </section>
    )
}