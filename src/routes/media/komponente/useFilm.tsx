import { Film, FilmForm, FilmGenre } from "../../../type"
import useFemStore from "../../../useFemStore"
import useComponent from "./useComponent"
import toast from "react-hot-toast"

export default function useFilm() {
  const filmTypes: {
    name: FilmGenre
    register: string
  }[] = [
    {
      name: "Akcija",
      register: "action",
    },
    {
      name: "Avantura",
      register: "avantura",
    },
    {
      name: "Drama",
      register: "drama",
    },
    {
      name: "Dokumentarec",
      register: "dokumentarec",
    },
    {
      name: "Fantazija",
      register: "fantazija",
    },
    {
      name: "Grozljivka",
      register: "grozljivka",
    },
    {
      name: "Isekai",
      register: "isekai",
    },
    {
      name: "Komedija",
      register: "komedija",
    },
    {
      name: "Kriminalka",
      register: "kriminalka",
    },
    {
      name: "Misterija",
      register: "misterija",
    },
    {
      name: "Romantika",
      register: "romantika",
    },
    {
      name: "Satira",
      register: "satira",
    },
    {
      name: "Triler",
      register: "triler",
    },
    {
      name: "Zgodovina",
      register: "zgodovina",
    },
    {
      name: "Znanstvena fantastika",
      register: "scifi",
    },
  ]

  const { selected } = useFemStore()
  const { splitInput, selectBackup, selectSetLibrary, searchRegexCreator } = useComponent()

  const omniFilter = (querry: string) => {
    if (!querry) {
      return toast.error(`Neveljaven vnos.`)
    }

    const regArr = searchRegexCreator(querry)
    const result = searchRegexOmniFilter(regArr)
    console.log(querry, result)
    if (result) {
      selectSetLibrary("film", result)
    }
  }

  const searchRegexOmniFilter = (regArr: string[]) => {
    const selection: Film[] = selectBackup("film")
    const filtered = selection.filter((film) => {
      const title = film.title.toUpperCase()
      const yearStart = film.year?.start
      const yearEnd = film.year?.finish
      const directors = film.director?.join(",").toUpperCase()
      const actors = film.actors?.join(",").toUpperCase()
      const others = film.others?.join(",").toUpperCase()
      const genre = film.genre?.join(",").toUpperCase()
      const explanation = film.explanation?.toUpperCase()
      const description = film.description.toUpperCase()
      const joined = `
                    ${title ? title : ""};
                    ${yearStart ? yearStart : ""};
                    ${yearEnd ? yearEnd : ""};
                    ${directors ? directors : ""};
                    ${actors ? actors : ""};
                    ${others ? others : ""};
                    ${genre ? genre : ""};
                    ${explanation ? explanation : ""};
                    ${description ? description : ""}`
      const matches: string[] = []
      regArr.forEach((regex) => {
        const result = joined.search(new RegExp(regex))
        if (result > -1) {
          matches.push(regex)
        }
      })
      if (matches.length > 0) {
        return film
      }
    })
    return filtered
  }

  const yearFilter = (data: Film[], querry1?: string, querry2?: string) => {
    if (!querry1 && !querry2) {
      return
    }
    const invalidInput1 = querry1?.search(/[.]/)
    const invalidInput2 = querry2?.search(/[.]/)
    if (invalidInput1 !== -1 || invalidInput2 !== -1) {
      toast.error("Dovoljena so le cela števila.")
      return
    }

    const min = querry1 ? Number(querry1) : undefined
    const max = querry2 ? Number(querry2) : undefined

    const currentYear = new Date().getFullYear()
    if (min) {
      if (min < 1888 || min > currentYear) {
        if (min < 1888) {
          toast.error(`Neveljavni iskalni nabor.
                    Prvi znani film je izdelan leta 1888.`)
          return
        }
        if (min > currentYear) {
          toast.error(`Neveljavni iskalni nabor.
                    Baza zaenkrat ne vsebuje filmov iz leta ${min}.
                    Ponovno poskusite v prihodnosti.`)
          return
        }
      }
    }
    if (max) {
      if (max < 1888 || max > currentYear) {
        if (max < 1888) {
          toast.error(`Neveljavni iskalni nabor.
                    Prvi znani film je izdelan leta 1888.`)
          return
        }
        if (max > currentYear) {
          toast.error(`Neveljavni iskalni nabor.
                    Baza zaenkrat ne vsebuje filmov iz leta ${max}.
                    Ponovno poskusite v prihodnosti.`)
          return
        }
      }
    }

    if (min || max) {
      const result = data.filter((film) => {
        const year = film.year?.start
        if (year) {
          if (min && max) {
            if (min && max && min > max && year <= min && year >= max) {
              return film
            } else if (year >= min && year <= max) {
              return film
            }
          }
          if (min && !max && year >= min) {
            return film
          }
          if (!min && max && year <= max) {
            return film
          }
        }
      })
      if (result) {
        selectSetLibrary("film", result)
      }
    }
  }

  const setGrid = (content: Film) => {
    if (content) {
      let type = false
      let creators = false
      let explain = false
      if (content.genre.length > 0 || content.femType) {
        type = true
      }
      if (content.director.length > 0 || content.actors.length > 0 || content.others.length > 0) {
        creators = true
      }
      if (content.explanation) {
        explain = true
      }

      if (type && creators && explain) {
        return 0
      }
      if (!type && creators && explain) {
        return 1
      }
      if (type && !creators && explain) {
        return 2
      }
      if (type && creators && !explain) {
        return 3
      }
      if (!type && !creators && explain) {
        return 4
      }
      if (type && !creators && !explain) {
        return 5
      }
      if (!type && creators && !explain) {
        return 6
      }
      if (!type && !creators && !explain) {
        return 7
      }
    }
    return 0
  }

  const defFormValues = (film: Film | null): FilmForm | undefined => {
    if (!film) return

    const defValues = {
      title: film.title,
      start: film.year.start,
      finish: film.year.finish ? film.year.finish : undefined,
      unfinished: film.year.unfinished ? true : false,
      average: film.length.average ? film.length.average : undefined,
      episodes: film.length.episodes ? film.length.episodes : 1,
      femType: film.femType ? film.femType : "",
      direction: film.director.join(", "),
      actors: film.actors.join(", "),
      others: film.others.join(", "),
      explanation: film.explanation,
      description: film.description,
    }

    filmTypes.forEach((type) => {
      const value = film.genre.find((gen) => gen === type.name) ? true : false
      defValues[type.register] = value
    })
    return defValues
  }

  const onSubmit = (data, pic) => {
    if (!data) {
      return
    }

    const genreFilter = () => {
      const result: FilmGenre[] = []
      data.akcija ? result.push("Akcija") : {}
      data.avantura ? result.push("Avantura") : {}
      data.drama ? result.push("Drama") : {}
      data.dokumentarec ? result.push("Dokumentarec") : {}
      data.fantazija ? result.push("Fantazija") : {}
      data.grozljivka ? result.push("Grozljivka") : {}
      data.isekai ? result.push("Isekai") : {}
      data.komedija ? result.push("Komedija") : {}
      data.kriminalka ? result.push("Kriminalka") : {}
      data.misterija ? result.push("Misterija") : {}
      data.romantika ? result.push("Romantika") : {}
      data.satira ? result.push("Satira") : {}
      data.scifi ? result.push("Znanstvena fantastika") : {}
      data.triler ? result.push("Triler") : {}
      data.zgodovina ? result.push("Zgodovina") : {}
      return result
    }

    const result: Film = {
      title: data.title,
      year: {
        start: data.start,
        finish: data.finish === "" ? undefined : data.finish,
        unfinished: true,
      },
      length: {
        average: data.average === "" ? undefined : data.average,
        episodes: data.episodes === "" ? undefined : data.episodes,
      },
      img: pic ? pic : undefined,
      director: splitInput(data.direction),
      actors: splitInput(data.actors),
      others: splitInput(data.others),
      femType: data.femType === false ? undefined : data.femType,
      genre: genreFilter(),
      explanation: data.explanation,
      description: data.description,
      ratings: selected?.ratings
        ? selected.ratings
        : {
            hates: 0,
            dislikes: 0,
            oks: 0,
            likes: 0,
            loves: 0,
          },
      /*KASNEJE LOČI RATING, SICER BO ZADNJA SHRANJENA VERZIJA NADPISALA AKTIVNO VERZIJO*/
    }

    /* TUKAJ PRIDE KOMANDA ZA POŠILJANJE V PODATKOVNO BAZO */
    console.log(result)
  }

  return {
    filmTypes,
    defFormValues,
    omniFilter,
    yearFilter,
    setGrid,
    onSubmit,
  }
}
