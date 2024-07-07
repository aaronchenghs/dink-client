import { useNavigate } from "react-router-dom";
import "./header.styles.scss";
import { ROUTES } from "../../global-utils";

interface NavigationLink {
  name: string;
  route: ROUTES;
}
const NAVIGATION: NavigationLink[] = [
  { name: "Court Locator", route: ROUTES.COURT_LOCATOR },
  { name: "Forums", route: ROUTES.FORUMS },
  { name: "Shop", route: ROUTES.SHOP },
];

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="header">
      <button onClick={() => navigate(ROUTES.HOME)}>
        <div>LOGO</div>
      </button>
      <div className="navButtonsContainer">
        {NAVIGATION.map((link, index) => (
          <button
            className={"navButton"}
            key={index}
            id={`${index}`}
            onClick={() => {
              navigate(link.route);
            }}
          >
            {link.name}
          </button>
        ))}
        <button>User</button>
      </div>
    </div>
  );
};

export default Header;
