export default function useBasics() {
  /*   const hoverStart = (id: string): void => {
    const marker = document.getElementById(id);
    if (marker) {
      marker.style.opacity = "1";
    }
  };

  const hoverEnd = (id: string): void => {
    const marker = document.getElementById(id);
    if (marker) {
      marker.style.opacity = "0";
    }
  };
 */
  const underHoverEl = (id: string, el: JSX.Element) => {
    return (
      <div id={id} className="flex colFlex underHover actMouse">
        {el}
        <hr />
      </div>
    );
  };

  return { underHoverEl };
}
