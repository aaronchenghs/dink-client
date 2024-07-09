import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./header.styles.scss";
import { ROUTES } from "../../global-utils";
import DEFAULT_PADDLE_ICON from "../../assets/default_icons";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

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
  const $iconPath = useSelector((state: RootState) => state.user.iconPath);

  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY.current && window.scrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`header ${hidden ? "hidden" : ""}`}>
      <button className="logo" onClick={() => navigate(ROUTES.HOME)}>
        <div>LOGO</div>
      </button>
      <div className="navButtonsContainer">
        {NAVIGATION.map((link, index) => (
          <button
            className="navButton"
            key={index}
            onClick={() => navigate(link.route)}
          >
            {link.name}
          </button>
        ))}
        <button className="profileButton">
          {$iconPath ? (
            <img src={$iconPath} alt="User Icon" />
          ) : (
            <DEFAULT_PADDLE_ICON />
          )}
        </button>
      </div>
    </div>
  );
};

export default Header;
