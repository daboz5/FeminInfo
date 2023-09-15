import useFilm from "../../utils/useFilm";
import FilmiFiltri from './komponente/FilmiFiltri';
import FilmiTabela from './komponente/FilmiTabela';
import PrikazFilma from "./komponente/PrikazFilma";
import EditFilm from "./komponente/EditFilm";
import "./Filmi.css"

export default function Filmi() {

    const {
        editing,
        openedFilm,
        setOpenedFilm,
        setEditing
    } = useFilm();

    return (
        <section id="mediaPage">
            {editing ?
                <EditFilm
                    contex={openedFilm}
                    closeEditor={setEditing} /> :
                !openedFilm ?
                    <>
                        <h2>Filmske vsebine</h2>
                        <FilmiFiltri />
                        <FilmiTabela openFilm={setOpenedFilm} />
                    </> :
                    <PrikazFilma
                        film={openedFilm}
                        closeFilm={setOpenedFilm}
                        openEditor={setEditing} />
            }
        </section>
    )
}