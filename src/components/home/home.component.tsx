/* eslint-disable jsx-a11y/anchor-is-valid */
import { useSelector } from "react-redux";
import AccentTypography from "../../assets/accentcomponents/AccentTypography/AccentTypography";

import LandingVideo from "../../assets/backgrounds/upclose-evening-background.mp4";
import "./home.styles.scss";
import BackgroundVideo from "../../assets/accentcomponents/Video/backgroundvideo.component";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { AppState } from "../../store";
import { ROUTES, scrollToElement } from "../../global-utils";
import { useNavigate } from "react-router-dom";
import AccentButton from "../../assets/accentcomponents/AccentButton/accentbutton.component";
import Hero from "./Hero/hero.component";

export default function Home() {
  const $id = useSelector((state: AppState) => state.user.id);

  return $id ? <UserHome /> : <Landing />;
}

const Landing = () => {
  const navigate = useNavigate();

  const handleAuthClick = (isSignUp?: boolean) => {
    localStorage.setItem("authMode", isSignUp ? "login" : "signup");
    navigate(ROUTES.LOGIN);
  };

  const handleDiscoverClick = () => {
    const firstHeroElement = document.getElementById("first-hero-element");
    if (firstHeroElement) {
      scrollToElement(firstHeroElement, 420);
    }
  };

  return (
    <div className="home">
      <Hero type={"full"}>
        <div className="stockVideo">
          <BackgroundVideo src={LandingVideo} className="video" />
          <div className="content">
            <div className="text-blur-wrapper">
              <AccentTypography className="lessMargin" tag="h1" inverted>
                Discover the Worldwide Pickleball Community
              </AccentTypography>
              <AccentTypography className="lessMargin" tag="p" inverted>
                Scroll to discover,{" "}
                <a
                  onClick={() => handleAuthClick()}
                  onKeyDown={() => handleAuthClick()}
                  role="button"
                  tabIndex={0}
                >
                  Log in
                </a>{" "}
                or{" "}
                <a
                  onClick={() => handleAuthClick(true)}
                  onKeyDown={() => handleAuthClick(true)}
                  role="button"
                  tabIndex={0}
                >
                  Sign up
                </a>{" "}
                to connect with other players.
              </AccentTypography>
            </div>
          </div>
          <AccentButton
            className={"discover-landing-button"}
            type={"primary"}
            onClick={handleDiscoverClick}
          >
            <ArrowDownwardIcon />
          </AccentButton>
        </div>
      </Hero>

      <Hero type={"half"} id="first-hero-element">
        {" "}
        C1{" "}
      </Hero>
      <Hero type={"half"}> C2 </Hero>
      <Hero type={"half"}> C3 </Hero>
      <Hero type={"half"}> C4 </Hero>
    </div>
  );
};

const UserHome = () => {
  const $name = useSelector((state: AppState) => state.user.username);

  return (
    <div className="home">
      <Hero type={"full"}>
        <div className="hero-content">
          <AccentTypography tag="h1" className="hero-title">
            Welcome to Dinks
          </AccentTypography>

          <AccentTypography tag="body" className="hero-subtitle">
            Welcome back, <i>{$name}</i>
          </AccentTypography>
        </div>{" "}
      </Hero>
    </div>
  );
};
