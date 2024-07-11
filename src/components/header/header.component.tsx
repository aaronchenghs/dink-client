import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./header.styles.scss";
import { ROUTES } from "../../global-utils";
import ProfileButton from "./UserNavigation/profilebutton.component";

interface NavigationLink {
  name: string;
  route: ROUTES;
}

const NAVIGATION: NavigationLink[] = [
  { name: "Community", route: ROUTES.COMMUNITY },
  { name: "Events", route: ROUTES.EVENTS },
  { name: "Shop", route: ROUTES.SHOP },
  { name: "Court Map", route: ROUTES.COURT_MAP },
];

const Header = () => {
  const navigate = useNavigate();

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
        <ProfileButton />
      </div>
    </div>
  );
};

export default Header;
