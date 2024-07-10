import { useSelector } from "react-redux";
import AccentTypography from "../../../assets/AccentComponents/AccentTypography";
import "./hero.styles.scss";
import { RootState } from "../../../store";

const Hero = () => {
  const $name = useSelector((state: RootState) => state.user.name);

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
