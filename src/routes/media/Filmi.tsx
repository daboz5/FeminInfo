import useFilm from "./komponente/useFilm";
import FilmiFiltri from './komponente/FilmiFiltri';
import FilmiTabela from './komponente/FilmiTabela';
import PrikazFilma from "./komponente/PrikazFilma";
import EditFilm from "./komponente/EditFilm";
import "./Filmi.css"

export default function Filmi() {

    const {
        editing,
        filter,
        openedFilm,
        setEditing,
        switchFilter,
        setOpenedFilm,
    } = useFilm();

    return (
        <section id="mediaPage" className="container">
            {filter ?
                <FilmiFiltri
                    filter={filter}
                    switchFilter={switchFilter}
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
                            switchFilter={switchFilter}
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