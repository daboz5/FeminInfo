import "./Credits.css"

export default function ONas() {

    type credit = {
        razlaga: JSX.Element;
        navedba: JSX.Element;
    }

    const creditsArr: credit[] = [
        {
            razlaga: <>Slika medijske kategorije Film</>,
            navedba: <>Image by <b>OsloMetX</b> from <b>Pixabay</b></>
        },
        {
            razlaga: <>Slika medijske kategorije Igre</>,
            navedba: <>Image by <b>cromaconceptovisual</b> from <b>Pixabay</b></>
        },
        {
            razlaga: <>Slika medijske kategorije Kanali</>,
            navedba: <>Image by <b>Mohamed Hassan</b> from <b>Pixabay</b></>
        },
        {
            razlaga: <>Slika medijske kategorije Knjige</>,
            navedba: <>Image by <b>Kyra Starr</b> from <b>Pixabay</b></>
        },
        {
            razlaga: <>Slika medijske kategorije Oddaje</>,
            navedba: <>Image by <b>Werner Gmünder</b> from <b>Pixabay</b></>
        },
        {
            razlaga: <>Slika medijske kategorije Organizacije</>,
            navedba: <>Photo by <b>Viktoria  Slowikowska</b> from <b>Pexels</b></>
        },
        {
            razlaga: <>Slika medijske kategorije Revije</>,
            navedba: <>Image by <b>StockSnap</b> from <b>Pixabay</b></>
        },
        {
            razlaga: <>Slika medijske kategorije Strani</>,
            navedba: <>Image by <b>MikeRenpening</b> from <b>Pixabay</b></>
        },
        {
            razlaga: <>Slika admin avatarja</>,
            navedba: <>Image by <b>Art Heaux</b> from <b>Tumblr</b></>
        }
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
        <div id="Credits" className="container">
            <p id="crExplain" className="block">Vsebine ljudi, katerih delo je uradni del spletišča, vendar niso neposredno sodelovali.</p>
            <div id="crContent" className="flex">
                {credits}
            </div>
        </div>
    )
}