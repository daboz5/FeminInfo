import { useEffect } from "react";
import useFilm from "./komponente/useFilm";
import FilmiFiltri from './komponente/FilmiFiltri';
import FilmiTabela from './komponente/FilmiTabela';
import PrikazFilma from "./komponente/PrikazFilma";
import EditFilm from "./komponente/EditFilm";
import "./Filmi.css"
import useFemStore from "../../useFemStore";

export default function Filmi() {

    const { setFilmLib, setFilmBackupLib } = useFemStore();

    const {
        lib,
        editing,
        filter,
        openedFilm,
        setEditing,
        setFilter,
        setOpenedFilm,
    } = useFilm();

    useEffect(() => {
        setFilmLib(lib.sort(
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
        setFilmBackupLib(lib);
    }, []);

    return (
        <section id="mediaPage" className="container">
            {filter ?
                <FilmiFiltri
                    filter={filter}
                    setFilter={setFilter}
                /> :
                <></>
            }
            {editing ?
                <EditFilm
                    contex={openedFilm}
                    closeEditor={setEditing}
                    closeFilm={setOpenedFilm}
                /> :
                !openedFilm ?
                    <>
                        <h2>Filmske vsebine</h2>
                        <FilmiTabela
                            setFilter={setFilter}
                            openFilm={setOpenedFilm}
                        />
                    </> :
                    <PrikazFilma
                        film={openedFilm}
                        closeFilm={setOpenedFilm}
                        openEditor={setEditing} />
            }
        </section>
    )
}