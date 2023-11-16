type FilmGenre =
    "Akcija" |
    "Avantura" |
    "Drama" |
    "Dokumentarec" |
    "Fantazija" |
    "Grozljivka" |
    "Isekai" |
    "Komedija" |
    "Kriminalka" |
    "Misterija" |
    "Romantika" |
    "Satira" |
    "Triler" |
    "Zgodovina" |
    "Znanstvena fantastika"

type IgraGenre =
    "4X" |
    "Akcija" |
    "Anime" |
    "Arkadna" |
    "Avantura" |
    "Bojevanje" |
    "Co-op" |
    "Fantazija" |
    "Golota" |
    "Grozljivka" |
    "Igra vlog" |
    "Karte" |
    "Miselnica" |
    "Misterija" |
    "MMO" |
    "Preživetvena" |
    "Simulator" |
    "Slovanska" |
    "Sproščena" |
    "Strategija" |
    "Streljanje" |
    "Športna" |
    "Upravljanje" |
    "Vesolje" |
    "Virtualni roman" |
    "Zgodbovnica" |
    "Zmenkarjenje"

type GamePlatform =
    "Windows" |
    "OS X" |
    "Linux" |
    "PlayStation 5" |
    "PlayStation 4" |
    "PlayStation 3" |
    "PlayStation 2" |
    "PlayStation" |
    "Xbox One" |
    "Nintendo Switch" |
    "Mobitel" |
    "Drugo"

type Ratings = {
    loves: number;
    likes: number;
    oks: number;
    dislikes: number;
    hates: number;
}

type FemType = "soc" | "woke" | "lib"

type Film = {
    title: string;
    year: {
        start: number;
        finish: number | undefined;
        unfinished: boolean;
    };
    length: {
        average: number | undefined;
        episodes: number | undefined;
    }
    img: string | undefined;
    director: string[];
    actors: string[];
    others: string[];
    genre: FilmGenre[];
    femType: FemType | undefined;
    explanation: string,
    description: string;
    ratings: Ratings
}

type FilmForm = {
    title: string;
    start: number;
    finish: number | undefined;
    unfinished: boolean;
    average: number | undefined;
    episodes: number;
    femType: string;
    akcija: boolean;
    avantura: boolean;
    drama: boolean;
    dokumentarec: boolean;
    fantazija: boolean;
    grozljivka: boolean;
    isekai: boolean;
    komedija: boolean;
    kriminalka: boolean;
    misterija: boolean;
    romantika: boolean;
    satira: boolean;
    triler: boolean;
    zgodovina: boolean;
    znanstvena_fantastika: boolean;
    direction: string;
    actors: string;
    others: string;
    explanation: string;
    description: string;
}

type IgraForm = {
    title: string | undefined;
    year: number | undefined;
    kratka: boolean;
    dolga: boolean;
    brezkončna: boolean;
    dlc: boolean | undefined;
    mikrotranzakcije: boolean | undefined;
    film: boolean | undefined;
    publikacije: boolean | undefined;
    femType: string;
    windows: boolean | undefined;
    osx: boolean | undefined;
    linux: boolean | undefined;
    ps: boolean | undefined;
    ps2: boolean | undefined;
    ps3: boolean | undefined;
    ps4: boolean | undefined;
    ps5: boolean | undefined;
    xboxone: boolean | undefined;
    ninswitch: boolean | undefined;
    mobitel: boolean | undefined;
    drugo: boolean | undefined;
    fourx: boolean | undefined;
    akcija: boolean | undefined;
    anime: boolean | undefined;
    arkadna: boolean | undefined;
    avantura: boolean | undefined;
    bojevanje: boolean | undefined;
    coop: boolean | undefined;
    fantazija: boolean | undefined;
    golota: boolean | undefined;
    grozljivka: boolean | undefined;
    rpg: boolean | undefined;
    karte: boolean | undefined;
    miselnica: boolean | undefined;
    misterija: boolean | undefined;
    mmo: boolean | undefined;
    preživetvena: boolean | undefined;
    simulator: boolean | undefined;
    slovanska: boolean | undefined;
    sproščena: boolean | undefined;
    strategija: boolean | undefined;
    streljanje: boolean | undefined;
    športna: boolean | undefined;
    upravljanje: boolean | undefined;
    vesolje: boolean | undefined;
    novel: boolean | undefined;
    zgodbovnica: boolean | undefined;
    zmenkarjenje: boolean | undefined;
    direction: string | undefined;
    actors: string | undefined;
    others: string | undefined;
    explanation: string | undefined;
    description: string | undefined;
}

type Igra = {
    title: string;
    year: number;
    content: {
        length: "kratka" | "dolga" | "brezkončna" | undefined;
        bonus_content: {
            dlc: boolean,
            microtransactions: boolean,
            movie: boolean,
            publication: boolean
        }
    };
    img: string | undefined;
    platforms: GamePlatform[];
    developer: string;
    publisher: string;
    others: string[];
    genre: IgraGenre[];
    femType: FemType | undefined;
    explanation: string,
    description: string;
    ratings: Ratings
}

export {
    Film,
    FilmGenre,
    FilmForm,
    Igra,
    IgraGenre,
    IgraForm,
    GamePlatform,
    FemType,
    Ratings,
};