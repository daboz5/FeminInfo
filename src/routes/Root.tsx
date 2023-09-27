import { Outlet } from "react-router-dom";
import Head from "../elements/Head";
import Foot from "../elements/Foot";
import "./Root.css";

import { Toaster } from 'react-hot-toast';

export default function Root() {

  return (
    <div id="App">
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />

      <div
        id="headBox"
        className="rootElement">
        <Head />
      </div>

      <div
        id="mainBox"
        className="rootElement">
        <Outlet />
      </div>

      <div
        id="footBox"
        className="rootElement">
        <Foot />
      </div>

    </div>
  );
}