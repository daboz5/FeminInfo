import { create } from 'zustand';
import { Film, Igra, Kanal, Knjiga, Skupina, Oddaja, Organizacija, Revija, Stran } from './type';

type State = {
    year: number,
    subtitleArr: Skupina[],
    pageSize: number,
    footOpened: boolean,

    libFilm: Film[],
    backupLibFilm: Film[],
    libIgra: Igra[],
    backupLibIgra: Igra[],
    libKanal: Kanal[],
    backupLibKanal: Kanal[],
    libKnjiga: Knjiga[],
    backupLibKnjiga: Knjiga[],
    libOddaja: Oddaja[],
    backupLibOddaja: Oddaja[],
    libOrganizacija: Organizacija[],
    backupLibOrganizacija: Organizacija[],
    libRevija: Revija[],
    backupLibRevija: Revija[],
    libStran: Stran[],
    backupLibStran: Stran[],
}

type Action = {
    registerSize(newSize: number): void,
    setSubtitleArr(newState: Skupina[]): void,
    switchFootOpened(): void,

    setLibFilm(newLib: Film[]): void,
    setBackupLibFilm(newLib: Film[]): void,
    setLibIgra(newLib: Igra[]): void,
    setBackupLibIgra(newLib: Igra[]): void,
    setLibKanal(newLib: Kanal[]): void,
    setBackupLibKanal(newLib: Kanal[]): void,
    setLibKnjiga(newLib: Knjiga[]): void,
    setBackupLibKnjiga(newLib: Knjiga[]): void,
    setLibOddaja(newLib: Oddaja[]): void,
    setBackupLibOddaja(newLib: Oddaja[]): void,
    setLibOrganizacija(newLib: Organizacija[]): void,
    setBackupLibOrganizacija(newLib: Organizacija[]): void,
    setLibRevija(newLib: Revija[]): void,
    setBackupLibRevija(newLib: Revija[]): void,
    setLibStran(newLib: Stran[]): void,
    setBackupLibStran(newLib: Stran[]): void,
}

const useFemStore = create<State & Action>(set => ({
    year: new Date().getFullYear(),

    pageSize: 0,
    registerSize: (newSize) => set(() => ({
        pageSize: newSize
    })),

    subtitleArr: [],
    setSubtitleArr: (newState) => set(() => ({
        subtitleArr: newState
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

    libKanal: [],
    backupLibKanal: [],
    setLibKanal: (newLib) => set(() => ({
        libKanal: newLib
    })),
    setBackupLibKanal: (newLib) => set(() => ({
        backupLibKanal: newLib
    })),

    libKnjiga: [],
    backupLibKnjiga: [],
    setLibKnjiga: (newLib) => set(() => ({
        libKnjiga: newLib
    })),
    setBackupLibKnjiga: (newLib) => set(() => ({
        backupLibKnjiga: newLib
    })),

    libOddaja: [],
    backupLibOddaja: [],
    setLibOddaja: (newLib) => set(() => ({
        libOddaja: newLib
    })),
    setBackupLibOddaja: (newLib) => set(() => ({
        backupLibOddaja: newLib
    })),

    libOrganizacija: [],
    backupLibOrganizacija: [],
    setLibOrganizacija: (newLib) => set(() => ({
        libOrganizacija: newLib
    })),
    setBackupLibOrganizacija: (newLib) => set(() => ({
        backupLibOrganizacija: newLib
    })),

    libRevija: [],
    backupLibRevija: [],
    setLibRevija: (newLib) => set(() => ({
        libRevija: newLib
    })),
    setBackupLibRevija: (newLib) => set(() => ({
        backupLibRevija: newLib
    })),

    libStran: [],
    backupLibStran: [],
    setLibStran: (newLib) => set(() => ({
        libStran: newLib
    })),
    setBackupLibStran: (newLib) => set(() => ({
        backupLibStran: newLib
    })),
}))

export default useFemStore;