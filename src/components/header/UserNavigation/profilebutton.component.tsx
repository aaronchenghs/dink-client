import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import "./profileButton.styles.scss";
import { AppState } from "../../../store";
import DEFAULT_PADDLE_ICON from "../../../assets/default_icons";
import ContextMenu from "../../../assets/accentcomponents/ContextMenu/ContextMenu";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../global-utils";

const ProfileButton = () => {
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const $iconPath = useSelector((state: AppState) => state.user.iconPath);
  const $name = useSelector((state: AppState) => state.user.name);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuVisible(false);
    }
  };

  const routeTo = (route: ROUTES) => {
    navigate(route);
  };

  const handleAuthClick = (route: ROUTES, isLogin: boolean) => {
    localStorage.setItem("authMode", isLogin ? "login" : "signup");
    setMenuVisible(false);
    routeTo(route);
  };

  const toggleMenu = () => {
    setMenuVisible((prevVisible) => !prevVisible);
  };

  const logout = () => {
    localStorage.removeItem("token");
    routeTo(ROUTES.HOME);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!$name) {
      const interval = setInterval(() => {
        setShouldAnimate(true);
        setTimeout(() => setShouldAnimate(false), 1000);
      }, 20000);

      return () => clearInterval(interval);
    }
  }, [$name]);

  const menuItems = $name
    ? [
        { label: "Profile", action: () => routeTo(ROUTES.PROFILE) },
        { label: "Settings", action: () => routeTo(ROUTES.SETTINGS) },
        { label: "Logout", action: logout },
      ]
    : [
        {
          label: "Login",
          action: () => handleAuthClick(ROUTES.LOGIN, false),
        },
        {
          label: "Sign Up",
          action: () => handleAuthClick(ROUTES.LOGIN, true),
        },
      ];

  return (
    <div className={`profile-button-container`} ref={menuRef}>
      <button
        className={`profileButton ${menuVisible ? "active" : ""} ${!$name && shouldAnimate ? "animate" : ""}`}
        onClick={toggleMenu}
      >
        {$iconPath ? (
          <img src={$iconPath} alt="User Icon" />
        ) : (
          <DEFAULT_PADDLE_ICON />
        )}
      </button>
      {menuVisible && <ContextMenu items={menuItems} />}
    </div>
  );
};

export default ProfileButton;
