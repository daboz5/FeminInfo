import { useState } from "react";
import useBasics from "../utils/useBasics";
import "./Predstavitev.css";

export default function Predstavitev() {

    const [pripombaOpen, setPripombaOpen] = useState(false);
    const { hoverStart, hoverEnd } = useBasics();

    return (
        <div id="iPage">
            <h2>Fem in informirana</h2>
            <div id="iConBox">
                <div className="textBox">
                    <p>Spletna stran je namenjena feministkam.</p>
                    <ul>
                        <li>novim feministkam</li>
                        <li>izkušenim feministkam</li>
                        <li>norim feministkam</li>
                    </ul>
                    <p>Feministkam vseh sort.</p>
                    <p>Ti je dolgčas? Tukaj lahko najdeš nekatere feministične vsebine, ki so jih feministke pred teboj že odkrile in delile dalje. Zakaj? Ker sklepajo, da si prav tako zdolgočasena, vznemirjena ali radovedna kot so bile one.</p>
                </div>
                <div
                    className="footLinkBox"
                ><div
                    id={"pripomba"}
                    className="hoverMarker"
                    style={{ opacity: "0", left: "8px" }}>
                    </div>
                    <h5
                        onMouseEnter={() => hoverStart("pripomba")}
                        onMouseLeave={() => hoverEnd("pripomba")}
                        onClick={() => setPripombaOpen(!pripombaOpen)}
                    >Pripomba
                    </h5>
                </div>
                {pripombaOpen &&
                    <div className="textBox">
                        <p>Kaj natanko je feminizem je, je dokaj pestra tema. Ta stran se nagiba k dokaj sproščeni interpretaciji feminizma, četudi se bolj nagiba k levemu (v družbo usmerjenemu) namesto liberarnemu (v posameznika usmerjenemu) feminizmu. Oba imata svoje prednosti, vendar skupaj zmoremo več.</p>
                        <p>Zavračamo pa vse feminizme, ki to niso. Feminizme, ki se utemeljujejo skozi boj proti progresivnim temam ali se za ženske borijo skozi uničenje njihovih priložnosti. TERFi, anti-feminizem ter konservativni feminizem tukaj niso dobrodošli.</p>
                    </div>
                }
            </div>
        </div>
    )
}