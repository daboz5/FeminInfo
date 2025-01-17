import { create } from "zustand"
import { Skupina, TypesOfMedia } from "./type"

type State = {
  year: number
  subtitleArr: Skupina[]
  pageSize: number
  footOpened: boolean
  selected: undefined | TypesOfMedia
}

type Action = {
  registerSize(newSize: number): void
  setSubtitleArr(newState: Skupina[]): void
  switchFootOpened(): void
  setSelected(newSelected: undefined | TypesOfMedia): void
}

const useFemStore = create<State & Action>((set) => ({
  year: new Date().getFullYear(),

  pageSize: 0,
  registerSize: (newSize) =>
    set(() => ({
      pageSize: newSize,
    })),

  subtitleArr: [],
  setSubtitleArr: (newState) =>
    set(() => ({
      subtitleArr: newState,
    })),

  footOpened: false,
  switchFootOpened: () =>
    set((state) => ({
      footOpened: !state.footOpened,
    })),

  selected: undefined,
  setSelected: (newState) =>
    set(() => ({
      selected: newState,
    })),
}))

export default useFemStore
