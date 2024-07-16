import { useSelector } from "react-redux";
import AccentTypography from "../../../assets/accentcomponents/AccentTypography/AccentTypography";
import "./hero.styles.scss";
import { AppState } from "../../../store";

const Hero = () => {
  const $name = useSelector((state: AppState) => state.user.name);

  return (
    <div className="hero">
      <div className="hero-content">
        <AccentTypography tag="h1" className="hero-title">
          Welcome to Dinks
        </AccentTypography>

        <AccentTypography tag="body" className="hero-subtitle">
          {$name ? (
            <>
              Signed in as <i>{$name}</i>
            </>
          ) : (
            <>Join the global pickleball community</>
          )}
        </AccentTypography>
      </div>
    </div>
  );
};

export default Hero;
