import { useState } from "react";
import useBasics from "../utils/useBasics";
import "./Predstavitev.css";

export default function Predstavitev() {
  
  const [pripombaOpen, setPripombaOpen] = useState(false);
  const { underHoverEl } = useBasics();

  return (
    <div id="iPage" className="colFlex">
      <h2>Fem in informirana</h2>
      <div id="iConBox">
        <p>Spletna stran je namenjena feministkam.</p>
        <ul>
          <li>novim feministkam</li>
          <li>izkušenim feministkam</li>
          <li>norim feministkam</li>
        </ul>
        <p>Feministkam vseh sort.</p>
        <p>
          Ti je dolgčas? Tukaj lahko najdeš nekatere feministične vsebine, ki so
          jih feministke pred teboj že odkrile in delile dalje. Zakaj? Ker
          sklepajo, da si prav tako zdolgočasena, vznemirjena ali radovedna kot
          so bile one.
        </p>
        <div id="pripombaBox" className="flex">
          {underHoverEl(
            "pripomba",
            <h5 onClick={() => setPripombaOpen(!pripombaOpen)}>Pripomba</h5>
          )}
        </div>
      </div>
      {pripombaOpen && (
        <>
          <p>
            Kaj natanko je feminizem je, je dokaj pestra tema. Ta stran se
            nagiba k dokaj sproščeni interpretaciji feminizma, četudi se bolj
            nagiba k levemu (v družbo usmerjenemu) namesto liberarnemu (v
            posameznika usmerjenemu) feminizmu. Oba imata svoje prednosti,
            vendar skupaj zmoremo več.
          </p>
          <p>
            Zavračamo pa vse feminizme, ki to niso. Feminizme, ki se
            utemeljujejo skozi boj proti progresivnim temam ali se za ženske
            borijo skozi uničenje njihovih priložnosti. TERFi, anti-feminizem
            ter konservativni feminizem tukaj niso dobrodošli.
          </p>
          <p>
            Kanal ni bil izdelan za LGBTQ+ ter Queer vsebine. Te vsebine v
            primeru spora ne bodo izločene in se smatrajo kot zavezniške.
          </p>
        </>
      )}
    </div>
  );
}
