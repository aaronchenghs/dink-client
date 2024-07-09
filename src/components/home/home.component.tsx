import AccentTypography from "../../assets/AccentComponents/AccentTypography";
import "./home.styles.scss";

const Home = () => {
  return (
    <div className="home">
      <AccentTypography tag={"h1"}>Welcome to the Home page!</AccentTypography>
      <AccentTypography tag={"body"}>
        This is the content of the Home component.
      </AccentTypography>
    </div>
  );
};

export default Home;
