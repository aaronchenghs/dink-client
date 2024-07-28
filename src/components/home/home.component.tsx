import { useSelector } from "react-redux";
import AccentTypography from "../../assets/accentcomponents/AccentTypography/AccentTypography";

import LandingVideo from "../../assets/backgrounds/upclose-evening-background.mp4";
import "./home.styles.scss";
import Hero from "./Hero/hero.component";
import BackgroundVideo from "../../assets/accentcomponents/Video/backgroundvideo.component";
import { AppState } from "../../store";
import { ROUTES } from "../../global-utils";
import { useNavigate } from "react-router-dom";

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
  return (
    <div className="home">
      <Hero type={"full"}>
        <div className="stockVideo">
          <BackgroundVideo src={LandingVideo} className="video" />
          <div className="content">
            <div className="text-blur-wrapper">
              <AccentTypography tag="h1" inverted>
                Discover the Worldwide Pickleball Community
              </AccentTypography>
              <AccentTypography tag="p" inverted>
                Scroll to discover,{" "}
                <a onClick={() => handleAuthClick()}>Log in</a> or{" "}
                <a onClick={() => handleAuthClick(true)}>Sign up</a> to connect
                with other players.
              </AccentTypography>
            </div>
          </div>
        </div>
      </Hero>
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
