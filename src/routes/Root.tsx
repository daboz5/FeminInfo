import { Outlet } from "react-router-dom";
import { useEffect } from "react"
import Head from "../elements/Head";
import Foot from "../elements/Foot";
import "./Root.css";

import { Toaster } from 'react-hot-toast';
import useFemStore from "../useFemStore";

export default function Root() {

  const { registerSize } = useFemStore();

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])

  const handleResize = () => {
    const pageWidth = window.innerWidth;
    registerSize(pageWidth);
  }

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