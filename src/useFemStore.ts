import { create } from 'zustand';
import { Film } from './type';

type State = {
    pageSize: number,
    footOpened: boolean,
    filmLib: [] | Film[],
    filmBackupLib: [] | Film[]
}

type Action = {
    registerSize(newSize: number): void,
    switchFootOpened(): void,
    setFilmLib(newLib: Film[]): void,
    setFilmBackupLib(newLib: Film[]): void
}

const useFemStore = create<State & Action>(set => ({
    pageSize: 0,
    registerSize: (newSize) => set(() => ({
        pageSize: newSize
    })),

    footOpened: false,
    switchFootOpened: () => set((state) => ({
        footOpened: !state.footOpened
    })),

    filmLib: [],
    filmBackupLib: [],
    setFilmLib: (newLib) => set(() => ({
        filmLib: newLib
    })),
    setFilmBackupLib: (newLib) => set(() => ({
        filmBackupLib: newLib
    })),
}))

export default useFemStore;