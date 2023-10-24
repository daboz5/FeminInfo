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
    "Miselne igre" |
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
    Igra,
    IgraGenre,
    FemType,
    Ratings,
};