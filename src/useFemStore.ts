import { create } from 'zustand';

type State = {
    pageSize: number,
    footOpened: boolean
}

type Action = {
    registerSize(newSize: number): void,
    switchFootOpened(): void
}

const useFemStore = create<State & Action>(set => ({
    pageSize: 0,
    registerSize: (newSize) => set(() => ({
        pageSize: newSize
    })),

    footOpened: false,
    switchFootOpened: () => set((state) => ({
        footOpened: !state.footOpened
    }))
}))

export default useFemStore;