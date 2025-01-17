import { Link, useParams } from "react-router-dom"
import useFilm from "./komponente/useFilm"
import FilmDatabase from "./databases/FilmData"
import { useEffect, useState } from "react"
import useFemStore from "../../useFemStore"
import { Film } from "../../type"

export default function FilmShow() {
  const { setSelected } = useFemStore()
  const [pick, setPick] = useState<Film | null>(null)
  const { id, idCheck } = useParams()
  const { filmDatabase } = FilmDatabase()
  const { setGrid } = useFilm()

  useEffect(() => {
    if (id && idCheck) {
      const film = filmDatabase.find((film) => film.id.includes(id) && film.id.includes(idCheck))
      if (film) {
        setPick(film)
        setSelected(film)
      }
    }
  }, [])

  return pick ? (
    <div className={`gridBox grid${setGrid(pick)} container`}>
      <div className="titleBox">
        <h3 className="title">{pick.title}</h3>
        <div className="fInfo">
          <p>{pick.year?.start + `${pick?.year?.unfinished ? "-" : pick.year?.finish ? `-${pick.year?.finish}` : ""}`}</p>
          {pick.length.average && (
            <p className="trajanje">
              {`${pick.length.average > 59 ? Math.floor(pick.length.average / 60) + " h" : ""} ${pick.length.average > 59 ? (pick.length.average % 60) + " min" : pick.length.average + " min"}`}
              {pick.length.episodes ? (pick.length.episodes > 1 ? "/ep" : "") : ""}
            </p>
          )}
          {pick.length.episodes && pick.length.episodes > 1 && <p className="epizode">{`${pick.length.episodes} epizod`}</p>}
        </div>
      </div>

      <div className="image flex">
        <img
          src={pick.img ? pick.img : "femininfoEyeIcon.png"}
          style={
            pick.img
              ? {}
              : {
                filter: "grayscale(100%)",
                maxWidth: "90%",
              }
          }
          alt={pick.img ? `Slika ${pick.title}` : "FeminInfo ikona"}
        />
      </div>

      {pick.femType || pick.genre.length > 0 ? (
        <div className="genreBox colFlex">
          {pick.femType ? (
            pick.femType === "lib" ? (
              <img className="femType" src={"type-liberal.svg"} alt="liberalni feminizem" />
            ) : pick.femType === "soc" ? (
              <img className="femType" src={"type-society.svg"} alt="družbeni feminizem" />
            ) : (
              <img className="femType" src={"type-woke.svg"} alt="woke feminizem" />
            )
          ) : (
            <></>
          )}
          {pick.genre && (
            <div className="data genreType">
              {pick.genre.sort().map((el) => {
                return <p key={"genre" + el}>{el}</p>
              })}
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
      {pick.director.length > 0 || pick.actors.length > 0 || pick.others.length > 0 ? (
        <div className="peopleBox">
          {pick.director.length > 0 && (
            <div className="directorsBox">
              <h3 className="dataType">Direkcija</h3>
              <p className="data">
                {pick.director.sort().map((el, index) => {
                  if (index + 1 === pick.director?.length) {
                    return el + "."
                  } else {
                    return el + ", "
                  }
                })}
              </p>
            </div>
          )}
          {pick.actors.length > 0 && (
            <div className="actorsBox">
              <h3 className="dataType">Igralci</h3>
              <p className="data">
                {pick.actors.sort().map((el, index) => {
                  if (index + 1 === pick.actors?.length) {
                    return el + "."
                  } else {
                    return el + ", "
                  }
                })}
              </p>
            </div>
          )}
          {pick.others.length > 0 && (
            <div className="staffBox">
              <h3 className="dataType">Ostali</h3>
              <p className="data">
                {pick.others.sort().map((el, index) => {
                  if (index + 1 === pick.others?.length) {
                    return el + "."
                  } else {
                    return el + ", "
                  }
                })}
              </p>
            </div>
          )}
        </div>
      ) : (
        <></>
      )}

      {pick.explanation && (
        <div className="explanationBox">
          <h3 className="dataType">Pojasnilo</h3>
          <p className="data">{pick.explanation}</p>
        </div>
      )}

      {pick.description && (
        <div className="descriptionBox">
          <h3 className="dataType">Opis</h3>
          <p className="data">{pick.description}</p>
        </div>
      )}

      {pick.ratings && (
        <div className="pollBox">
          <span className="rating">
            <p className="defMouse">{pick.ratings.hates}</p>
            <p className="rIcon">💀</p>
          </span>
          <span className="rating">
            <p className="defMouse">{pick.ratings.dislikes}</p>
            <p className="rIcon">👎</p>
          </span>
          <span className="rating">
            <p className="defMouse">{pick.ratings.oks}</p>
            <p className="rIcon">⭐</p>
          </span>
          <span className="rating">
            <p className="defMouse">{pick.ratings.likes}</p>
            <p className="rIcon">👍</p>
          </span>
          <span className="rating">
            <p className="defMouse">{pick.ratings.loves}</p>
            <p className="rIcon">💜</p>
          </span>
        </div>
      )}

      <div className="optionsBox colFlex">
        <Link
          to="urejanje"
          className="actMouse mediaBtn">
          Uredi
        </Link>
        <Link
          to="/media/filmi"
          className="actMouse mediaBtn"
          onClick={() => setPick(null)}>
          Zapri
        </Link>
      </div>
    </div>
  ) : (
    <></>
  )
}
