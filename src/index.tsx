import { createBrowserRouter, RouterProvider } from "react-router-dom"
import React from "react"
import ReactDOM from "react-dom/client"
import Root from "./routes/Root"
import Predstavitev from "./routes/Predstavitev"
import ONas from "./routes/ONas"
import Media from "./routes/Media"
import Credits from "./routes/Credits"
import Filmi from "./routes/media/Filmi"
import Igre from "./routes/media/Igre"
import Kanali from "./routes/media/Kanali"
import Knjige from "./routes/media/Knjige"
import Oddaje from "./routes/media/Oddaje"
import Organizacije from "./routes/media/Organizacije"
import Revije from "./routes/media/Revije"
import Strani from "./routes/media/Strani"
import "vite/modulepreload-polyfill"
import "./index.css"
import "./media-size.css"
import FilmShow from "./routes/media/FilmShow"

const router = createBrowserRouter([
  {
    path: "",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Predstavitev />,
      },
      {
        path: "media",
        element: <Media />,
      },
      {
        path: "o-nas",
        element: <ONas />,
      },
      {
        path: "media/filmi",
        element: <Filmi />,
      },
      {
        path: "media/filmi/:id/:idCheck",
        element: <FilmShow />,
      },
      {
        path: "media/igre",
        element: <Igre />,
      },
      {
        path: "media/kanali",
        element: <Kanali />,
      },
      {
        path: "media/knjige",
        element: <Knjige />,
      },
      {
        path: "media/oddaje",
        element: <Oddaje />,
      },
      {
        path: "media/organizacije",
        element: <Organizacije />,
      },
      {
        path: "media/revije",
        element: <Revije />,
      },
      {
        path: "media/strani",
        element: <Strani />,
      },
      {
        path: "/o-nas/credits",
        element: <Credits />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
