import { create } from 'zustand';
import { Film, Igra } from './type';

type State = {
    pageSize: number,
    footOpened: boolean,
    libFilm: [] | Film[],
    backupLibFilm: [] | Film[],
    libIgra: [] | Igra[],
    backupLibIgra: [] | Igra[]
}

type Action = {
    registerSize(newSize: number): void,
    switchFootOpened(): void,
    setLibFilm(newLib: Film[]): void,
    setBackupLibFilm(newLib: Film[]): void,
    setLibIgra(newLib: Igra[]): void,
    setBackupLibIgra(newLib: Igra[]): void
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

    libFilm: [],
    backupLibFilm: [],
    setLibFilm: (newLib) => set(() => ({
        libFilm: newLib
    })),
    setBackupLibFilm: (newLib) => set(() => ({
        backupLibFilm: newLib
    })),

    libIgra: [],
    backupLibIgra: [],
    setLibIgra: (newLib) => set(() => ({
        libIgra: newLib
    })),
    setBackupLibIgra: (newLib) => set(() => ({
        backupLibIgra: newLib
    })),
}))

export default useFemStore;