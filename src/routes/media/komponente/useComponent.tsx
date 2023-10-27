import { useState } from "react";
import { AllGenreTypes, FilmGenre, Ratings } from "../../../type";

export default function useComponent() {

    const [filter, setFilter] = useState("");
    const [editing, setEditing] = useState(false);

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

    const splitInput = (input: string) => {
        if (!input) { return [] }

        const splitStep1 = input.split(",");
        const splitStep2: string[] = [];
        splitStep1.forEach((el) => {
            {
                if (el.includes(";")) {
                    const newArr = el.split(";");
                    newArr.forEach((el) => {
                        splitStep2.push(el);
                    })
                } else {
                    splitStep2.push(el);
                }
            }
        })

        const cleanInput = splitStep2.map((el) => {
            const uncleanArr = el.split("");
            while (uncleanArr[0] === " ") { uncleanArr.shift() }
            while (uncleanArr[uncleanArr.length - 1] === " ") { uncleanArr.pop() }
            return uncleanArr.join("");
        })

        return cleanInput;
    }

    return {
        filter,
        editing,
        setFilter,
        setEditing,
        calcFame,
        splitInput
    }
}