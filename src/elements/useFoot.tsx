import { Link } from "react-router-dom";
import useBasics from "../utils/useBasics";

export default function useFoot() {
  type fCon = {
    id: string;
    link: string;
  };

  const { underHoverEl } = useBasics();

  const footContents: fCon[] = [
    {
      id: "Politika zasebnosti",
      link: "izjava-o-zasebnosti",
    },
    {
      id: "Kontaktne informacije",
      link: "kontakt",
    },
    {
      id: "Vpis",
      link: "sign-in",
    },
  ];

  const content = footContents.map((con, index) => {
    const num = index + 1;
    return (
      <div className="footLinkBox" key={"fCon" + num}>
        {underHoverEl(
          con.id,
          <Link className="footContent" to={con.link}>
            {con.id}
          </Link>
        )}
      </div>
    );
  });

  return { content };
}
