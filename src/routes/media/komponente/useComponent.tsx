import { useState } from "react";
import { Ratings } from "../../../type";

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

    return {
        filter,
        editing,
        setFilter,
        setEditing,
        calcFame
    }
}