import { useState } from "react";
import { Film, Genre, Ratings } from "../../../type";

export default function useFilm() {

    const lib: Film[] = [
        {
            title: "Revolutionary Girl Uthena",
            year: {
                start: 1997,
                unfinished: false
            },
            length: {
                average: 23,
                episodes: 39
            },
            description: "Childhood idealism, illusions, ambition, adulthood, sexuality, abuse, incest and identity are all prominent themes which are explored in what is essentially a highly metaphorical and symbolic coming-of-age story. Loss of innocence, both sexual and otherwise, is treated as a life changing event. Fairy tale archetypes such as the noble prince and the damsel in distress, as well as standard tropes of the shoujo and magical girl genre are incorporated, subverted, inverted, averted and deconstructed.",
            ratings: {
                loves: 0,
                likes: 0,
                oks: 0,
                dislikes: 0,
                hates: 0
            }
        },
        {
            title: "Portret of a lady on fire",
            year: {
                start: 2019,
                unfinished: false
            },
            description: "On an isolated island in Brittany at the end of the eighteenth century, a female painter is obliged to paint a wedding portrait of a young woman.",
            ratings: {
                loves: 0,
                likes: 0,
                oks: 0,
                dislikes: 0,
                hates: 0
            }
        },
        {
            title: "Volver",
            year: {
                start: 2006,
                unfinished: false
            },
            length: {
                average: 121,
                episodes: 1
            },
            img: "volver.jpg",
            director: ["Pedro Almodóvar"],
            actors: ["Penélope Cruz", "Carmen Maura", "Lola Dueñas", "Blanca Portillo", "Yohana Cobo", "Chus Lampreave", "Antonio de la Torre"],
            others: ["Example 1", "Example 2", "Example 3"],
            genre: ["Komedija", "Drama"],
            femType: "lib",
            explanation: "Razni ženski liki se znajdejo v nenadejanih zahtevnih situacijah, iz katerih se izvlečejo s pretkanostjo, oportunizmom ali nujo po preživetju.",
            description: "After her death, a mother returns to her home town in order to fix the situations she couldn't resolve during her life.",
            ratings: {
                loves: 1,
                likes: 0,
                oks: 0,
                dislikes: 0,
                hates: 0
            }
        }
    ]

    const filmTypes: Genre[] = [
        "Akcija",
        "Avantura",
        "Drama",
        "Dokumentarec",
        "Fantazija",
        "Grozljivka",
        "Isekai",
        "Komedija",
        "Kriminalka",
        "Misterija",
        "Romantika",
        "Satira",
        "Triler",
        "Zgodovina",
        "Znanstvena fantastika"
    ]

    const [openedFilm, setOpenedFilm] = useState<Film | null>(null);
    const [editing, setEditing] = useState(false);
    const [pic, setPic] = useState(openedFilm?.img);

    const calcFame = (ratings: Ratings) => {
        const fame: number = (
            (ratings.oks * 1) +
            (ratings.likes * 2) +
            (ratings.loves * 3) -
            (ratings.dislikes * 2) -
            (ratings.hates * 3)
        );
        return fame;
    }

    return {
        lib,
        editing,
        openedFilm,
        filmTypes,
        pic,
        setPic,
        calcFame,
        setEditing,
        setOpenedFilm,
    }
}