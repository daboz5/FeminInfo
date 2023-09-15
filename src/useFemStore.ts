import { create } from 'zustand';

type State = {
    footOpened: boolean
}

type Action = {
    switchFootOpened(): void
}

const useFemStore = create<State&Action>(set => ({
    footOpened: false,
    switchFootOpened: () => set((state) => ({
        footOpened: !state.footOpened
    }))
}))

export default useFemStore;