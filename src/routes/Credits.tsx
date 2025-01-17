import "./Credits.css"

export default function ONas() {

    type credit = {
        razlaga: JSX.Element;
        navedba: JSX.Element;
    }

    const creditEl = (razlaga: string, who: string, where: string) => {
        return         {
            razlaga: <>Slika {razlaga}</>,
            navedba: <>Slika je last <b>{who}</b> iz <b>{where}</b></>
        }
    }; 

    const creditsArr: credit[] = [
            creditEl("medijske kategorije Film", "OsloMetX", "Pixabay"),
            creditEl("medijske kategorije Igre", "cromaconceptovisual", "Pixabay"),
            creditEl("medijske kategorije Kanali", "Mohamed Hassan", "Pixabay"),
            creditEl("medijske kategorije Knjige", "Kyra Starr", "Pixabay"),
            creditEl("medijske kategorije Oddaje", "Werner Gmünder", "Pixabay"),
            creditEl("medijske kategorije Organizacije", "Viktoria  Slowikowska", "Pixabay"),
            creditEl("medijske kategorije Revije", "StockSnap", "Pixabay"),
            creditEl("medijske kategorije Strani", "MikeRenpening", "Pixabay"),
            creditEl("admin avatarja", "Art Heaux", "Tumblr"),
    ]

    const credits = creditsArr.map(
        (cr, index) => {
            return (
                <div
                    id="creditBox"
                    className="colFlex"
                    key={"cr" + (index + 1)}>
                    <p className="crRazlaga">{cr.razlaga}</p>
                    <p className="crNavedba">{cr.navedba}</p>
                </div>
            )
        }
    )

    return (
        <div id="Credits">
            <p id="crExplain" className="block">Vsebine ljudi, katerih delo je uradni del spletišča, vendar niso neposredno sodelovali.</p>
            <div id="crContent" className="flex">
                {credits}
            </div>
        </div>
    )
}