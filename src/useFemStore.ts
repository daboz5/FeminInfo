import { create } from 'zustand';
import { Film } from './type';

type State = {
    pageSize: number,
    footOpened: boolean,
    filmLib: null | Film[];
}

type Action = {
    registerSize(newSize: number): void,
    switchFootOpened(): void,
    setFilmLib(newLib: Film[]): void
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

    filmLib: null,
    setFilmLib: (newLib) => set(() => ({
        filmLib: newLib
    })),
}))

export default useFemStore;