import { createUseStyles } from "react-jss";
import useFemStore from "../useFemStore";

export default function ArrowUp() {

  const { footOpened } = useFemStore();

  const styles = createUseStyles({
    a: {
      fill: "none",
      stroke: "#000",
      strokeLinecap: "round",
      strokeMiterlimit: "10",
      strokeWidth: "30px",
    }
  })

  const classes = styles();

  const rotate = {
    transform: footOpened ? "rotate(-0.5turn)" : "rotate(0turn)",
    transition: "0.3s",
  }

  return (<>
    <svg
      id="arrowUp"
      style={rotate}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 164.35 132.668">
      <polyline
        className={classes.a}
        points="15 88.388 82.175 21.213 149.35 88.388" />
      <rect
        className={classes.a}
        x="76.175"
        y="96.97"
        width="12"
        height="12"
        transform="translate(-48.742 88.266) rotate(-45)" />
    </svg>
  </>)
}