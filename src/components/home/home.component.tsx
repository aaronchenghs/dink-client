import { useSelector } from "react-redux";
import AccentTypography from "../../assets/accentcomponents/AccentTypography/AccentTypography";
import { AppState } from "../../store";
import "./home.styles.scss";
import Hero from "./Hero/hero.component";

export default function Home() {
  const $id = useSelector((state: AppState) => state.user.id);

  return $id ? <UserHome /> : <Landing />;
}

const Landing = () => {
  return (
    <div className="home">
      <Hero type={"full"}>Children</Hero>
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
