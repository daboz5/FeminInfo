type Library =
    "film" |
    "igra" |
    "kanal" |
    "knjiga" |
    "oddaja" |
    "org" |
    "revija" |
    "stran"

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

type KanalGenre =
    "Animacija" |
    "Doživetja" |
    "Filmi" |
    "Hrana" |
    "Igre" |
    "Izobraževalno" |
    "Knjige" |
    "Kultura" |
    "Lepotičenje" |
    "Nasveti" |
    "Potrošnja" |
    "Priročniki" |
    "Sprostitev" |
    "Radijska oddaja" |
    "Reakcije" |
    "Vadba" |
    "V živo" |
    "Video eseji" |
    "Zabava" |
    "Znanost"

type KnjigaGenre =
    "Akcija" |
    "Avantura" |
    "Biografija" |
    "Distopija" |
    "Drama" |
    "Fantazija" |
    "Grafični roman" |
    "Grozljivka" |
    "Komedija" |
    "Misterija" |
    "Otroška" |
    "Prehrana" |
    "Romantika" |
    "Satira" |
    "Strip" |
    "Strokovna" |
    "Triler" |
    "Umetnost" |
    "Zgodovina" |
    "Znanstvena fantastika"

type OddajaGenre =
    "Doživetja" |
    "Filmi" |
    "Glasba" |
    "Igre" |
    "Izobraževalno" |
    "Knjige" |
    "Kultura" |
    "Lepotičenje" |
    "Nasveti" |
    "Potrošnja" |
    "Priročniki" |
    "Sprostitev" |
    "Vadba" |
    "V živo" |
    "Zabava" |
    "Znanost"

type OrganizacijaType =
    "Aktivizem" |
    "Druženje" |
    "Duhovnost" |
    "Finančna pomoč" |
    "Izobrazba" |
    "Krizna" |
    "Kulturna" |
    "Kulturna dejavnost" |
    "Materialna pomoč" |
    "Medsebojna pomoč" |
    "Neprofitna" |
    "Nevladna" |
    "Okoljevarstvo" |
    "Politika" |
    "Pravna pomoč" |
    "Profitna" |
    "Rekreacija" |
    "Skrb ali varstvo" |
    "Svetovanje" |
    "Zaposlovanje" |
    "Zaščita" |
    "Zdravje"

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

type Skupina = {
    id: number,
    title: string,
    count: number
}

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

type Kanal = {
    title: string;
    firstAir: number | undefined;
    lastAir: number | undefined;
    length: {
        minmax: [number | undefined, number | undefined];
        episodes: number | undefined;
    },
    img: string | undefined;
    platforms: string[];
    hosts: string[];
    guests: string[];
    others: string[];
    genre: KanalGenre[];
    femType: FemType | undefined;
    explanation: string;
    description: string;
    ratings: Ratings
}

type KanalForm = {
    title: string;
    start: number | undefined;
    finish: number | undefined;
    minLength: number | undefined;
    maxLength: number | undefined;
    episodes: number;
    femType: string;
    animacija: boolean | undefined;
    dozivetja: boolean | undefined;
    filmi: boolean | undefined;
    hrana: boolean | undefined;
    igre: boolean | undefined;
    izobrazevalno: boolean | undefined;
    knjige: boolean | undefined;
    kultura: boolean | undefined;
    lepoticenje: boolean | undefined;
    nasveti: boolean | undefined;
    potrosnja: boolean | undefined;
    prirocniki: boolean | undefined;
    sprostitev: boolean | undefined;
    oddaja: boolean | undefined;
    reakcije: boolean | undefined;
    vadba: boolean | undefined;
    vzivo: boolean | undefined;
    videoeseji: boolean | undefined;
    zabava: boolean | undefined;
    znanost: boolean | undefined;
    platforms: string;
    hosts: string;
    guests: string;
    others: string;
    explanation: string;
    description: string;
}

type Knjiga = {
    title: string;
    published: number | undefined;
    zbirka: Skupina[];
    img: string | undefined;
    publishers: string[];
    authors: string[];
    others: string[];
    characters: string[];
    genre: KnjigaGenre[];
    femType: FemType | undefined;
    explanation: string;
    description: string;
    ratings: Ratings
}

type KnjigaForm = {
    title: string;
    published: number | undefined;
    zbirka: Skupina[]
    femType: string;
    akcija: boolean;
    avantura: boolean;
    biografija: boolean;
    distopija: boolean;
    drama: boolean;
    fantazija: boolean;
    graficna: boolean;
    grozljivka: boolean;
    komedija: boolean;
    misterija: boolean;
    otroska: boolean;
    prehrana: boolean;
    romantika: boolean;
    satira: boolean;
    strip: boolean;
    strokovna: boolean;
    triler: boolean;
    umetnost: boolean;
    zgodovina: boolean;
    scifi: boolean;
    publishers: string;
    authors: string;
    others: string;
    characters: string;
    explanation: string;
    description: string;
}

type Oddaja = {
    title: string;
    firstAir: number | undefined;
    lastAir: number | undefined;
    length: {
        minmax: [number | undefined, number | undefined];
        episodes: number | undefined;
    },
    img: string | undefined;
    platforms: string[];
    hosts: string[];
    guests: string[];
    others: string[];
    genre: OddajaGenre[];
    femType: FemType | undefined;
    explanation: string;
    description: string;
    ratings: Ratings
}

type OddajaForm = {
    title: string;
    start: number | undefined;
    finish: number | undefined;
    minLength: number | undefined;
    maxLength: number | undefined;
    episodes: number;
    femType: string;
    aktivizem: boolean | undefined;
    dozivetja: boolean | undefined;
    filmi: boolean | undefined;
    glasba: boolean | undefined;
    igre: boolean | undefined;
    izobrazevalno: boolean | undefined;
    knjige: boolean | undefined;
    kultura: boolean | undefined;
    lepoticenje: boolean | undefined;
    nasveti: boolean | undefined;
    politika: boolean | undefined;
    potrosnja: boolean | undefined;
    prirocniki: boolean | undefined;
    sprostitev: boolean | undefined;
    vadba: boolean | undefined;
    vzivo: boolean | undefined;
    zabava: boolean | undefined;
    znanost: boolean | undefined;
    platforms: string;
    hosts: string;
    guests: string;
    others: string;
    explanation: string;
    description: string;
}

type Organizacija = {
    name: string;
    founded: number | undefined;
    reach: "local" | "regional" | "national" | "multinational";
    img: string | undefined;
    representatives: string[];
    workers: string[];
    others: string[];
    programs: string[];
    genre: OrganizacijaType[];
    femType: FemType | undefined;
    explanation: string;
    description: string;
    ratings: Ratings
}

type OrganizacijaForm = {
    name: string;
    founded: number | undefined;
    reach: string;
    femType: string;
    druzenje: boolean | undefined;
    duhovnost: boolean | undefined;
    financnapomoc: boolean | undefined;
    izobrazba: boolean | undefined;
    krizna: boolean | undefined;
    kulturna: boolean | undefined;
    kulturnadejavnost: boolean | undefined;
    materialnapomoc: boolean | undefined;
    medsebojnapomoc: boolean | undefined;
    neprofitna: boolean | undefined;
    nevladna: boolean | undefined;
    okoljevarstvo: boolean | undefined;
    pravnapomoc: boolean | undefined;
    profitna: boolean | undefined;
    rekreacija: boolean | undefined;
    skrbalivarstvo: boolean | undefined;
    svetovanje: boolean | undefined;
    zaposlovanje: boolean | undefined;
    zascita: boolean | undefined;
    representatives: string;
    workers: string;
    others: string;
    explanation: string;
    description: string;
}

export {
    Library,
    Film,
    FilmGenre,
    FilmForm,
    Igra,
    IgraGenre,
    IgraForm,
    Kanal,
    KanalGenre,
    KanalForm,
    Knjiga,
    KnjigaGenre,
    KnjigaForm,
    Oddaja,
    OddajaGenre,
    OddajaForm,
    Organizacija,
    OrganizacijaType,
    OrganizacijaForm,
    GamePlatform,
    FemType,
    Ratings,
    Skupina
};