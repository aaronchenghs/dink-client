import AccentTypography from "../../assets/accentcomponents/AccentTypography/AccentTypography";
import "./loadingplaceholder.styles.scss";
import { useEffect, useRef, useState } from "react";

type styling = {
  decorationContainerClassName?: string | undefined;
  messageClassName?: string | undefined;
};

interface Props {
  hideDecoration?: boolean | undefined;
  message?: string | undefined;
  size?: number | undefined;
  styling?: styling | undefined;
}

/**
 * An overlay that displays a responsive loading icon and a message in place of the parent container.
 *
 * Supports:
 *      (#1) Responsive styling on a set size of 50 for the parent container. The loading indicator
 *           and message will adjust based on the parent's size.
 *      (#2) If hideDecoration is true, then the parent's container will have a non-styled
 *           backdrop displayed over the container, which will prevent interactions.
 */
export default function LoadingPlaceholder(props: Props) {
  const [parentHeight, setParentHeight] = useState<number>(0);
  const parentRef = useRef<HTMLDivElement | null>(null);
  //const sizeFactor =
  //  parentHeight < 50 ? 0.5 * parentHeight : 0.1 * parentHeight;

  useEffect(() => {
    const clientHeight = parentRef.current?.clientHeight;
    if (clientHeight) {
      setParentHeight(clientHeight);
    }
  }, []);

  if (props.hideDecoration) {
    return <div className={"backdropWithoutDecorations"} />;
  }

  // #region Styling
  const containerStyling = props.styling
    ? props.styling.decorationContainerClassName
    : "backdropWithDecorations";

  const messageStyling = props.styling
    ? props.styling.messageClassName
    : parentHeight < 50
      ? "smallerFontSize"
      : "fontSize";
  // #endregion Styling

  return (
    <div className={containerStyling} ref={parentRef}>
      <div className="loading-overlay">
        <div className="spinner"></div>
      </div>

      <AccentTypography tag="h3" className={messageStyling}>
        {props.message}
      </AccentTypography>
    </div>
  );
}
