import AccentTypography from "../../assets/accentcomponents/AccentTypography";
import Hero from "./Hero/hero.component";
import "./home.styles.scss";

const Home = () => {
  return (
    <div className="home">
      <Hero />
      <AccentTypography tag="h1">Welcome to the Home page!</AccentTypography>
      <AccentTypography tag="body">
        This is the content of the Home component.
      </AccentTypography>
    </div>
  );
};

export default Home;
