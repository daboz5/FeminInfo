import { useEffect, useState } from "react"
import useComponent from "./komponente/useComponent"
import FilmDatabase from "./databases/FilmData"
import { Film } from "../../type"
import { Link } from "react-router-dom"

export default function Filmi() {
  const { filmDatabase } = FilmDatabase()
  const { setFilter, calcFame } = useComponent()

  const [selection, setSelection] = useState<Film[]>([])

  useEffect(() => {
    const sortedData = filmDatabase.sort((a, b) => {
      const titleA = a.title.toUpperCase()
      const titleB = b.title.toUpperCase()
      if (titleA < titleB) {
        return -1
      }
      if (titleA > titleB) {
        return 1
      }
      return 0
    })
    setSelection(sortedData)
  }, [])

  return (
    <section id="mediaPage" className="container">
      <h2>Seznam filmov</h2>
      <div className="libBox">
        <div className="orderBox">
          <div className="mOrder actMouse filterOption flex" onClick={() => setFilter("Iskanje")}>
            <p className="actMouse">🔍</p>
          </div>
          <div className="mOrder filterOption flex" onClick={() => setFilter("Naslov")}>
            <h5 className="actMouse">Naslov</h5>
          </div>
          <div className="mOrder filterOption flex" onClick={() => setFilter("Leto")}>
            <h5 className="actMouse">Leto</h5>
          </div>
          <div className="mOrder filterOption flex" onClick={() => setFilter("Fem tip")}>
            <h5 className="actMouse">Tip</h5>
          </div>
          <div className="mOrder actMouse filterOption flex" onClick={() => setFilter("Ocena")}>
            <p className="actMouse">🌟</p>
          </div>
        </div>
        {selection?.map((el, index) => {
          const fame = calcFame(el.ratings)
          return (
            <div className="orderBox" key={`film${index}`}>
              <div className="mOrdered flex">
                <img className="tablePic" src={el.img ? el.img : "femininfoEyeIcon.png"} style={el.img ? {} : { filter: "grayscale(100%)" }} alt="slika filma" />
              </div>
              <div className="mOrdered mTitle flex">
                <Link to={`${el.id.slice(2, el.id.length - 4)}/${el.id.slice(el.id.length - 3)}`} onClick={() => setFilter("")}>
                  <h5 className="actMouse">{el.title}</h5>
                </Link>
              </div>
              <div className="mOrdered defMouse flex">{el.year.start + `${el?.year?.unfinished ? "-" : el.year?.finish ? `- ${el.year?.finish}` : ""}`}</div>
              <div className="mOrdered flex">
                {el.femType === "lib" ? (
                  <img className="tableType" src={"type-liberal.svg"} alt="liberalni" />
                ) : el.femType === "soc" ? (
                  <img className="tableType" src={"type-society.svg"} alt="družbeni" />
                ) : el.femType === "woke" ? (
                  <img className="tableType" src={"type-woke.svg"} alt="woke" />
                ) : (
                  ""
                )}
              </div>
              <div className="mOrdered defMouse flex">{fame}</div>
            </div>
          )
        })}
      </div>
      <div className="flex tableOptions">
        <button className="tableOptionBtn">Dodaj film</button>
        <button className="tableOptionBtn">Obnovi seznam</button>
      </div>
    </section>
  )
}
