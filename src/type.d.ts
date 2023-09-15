type Genre =
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

type FemType = "soc" | "woke" | "lib"

type Film = {
    title: string;
    year?: {
        start: number;
        finish?: number;
        unfinished: boolean;
    };
    length?: {
        average: number;
        episodes: number;
    }
    img?: string;
    director?: string[];
    actors?: string[];
    others?: string[];
    genre?: Genre[];
    femType?: FemType;
    explanation?: string,
    description: string;
    ratings: Ratings
}

type Ratings = {
    loves: number;
    likes: number;
    oks: number;
    dislikes: number;
    hates: number;
}

export {
    FemType,
    Film,
    Genre,
    Ratings,
};