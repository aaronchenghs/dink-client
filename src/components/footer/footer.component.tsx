import { useCallback, useEffect, useState } from "react";
import "./footer.styles.scss";
import AccentTypography from "../../assets/AccentComponents/AccentTypography";
import { LightSwitch } from "../../assets/lightSwitch";

const Footer = () => {
  const [darkMode, setDarkMode] = useState<boolean>(
    localStorage.getItem("theme") === "dark"
  );

  const toggleTheme = useCallback(() => {
    const newTheme = darkMode ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    setDarkMode(!darkMode);
  }, [darkMode]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    setDarkMode(savedTheme === "dark");
  }, []);

  return (
    <div className="footer">
      <AccentTypography tag="body" inverted>
        Footer
      </AccentTypography>
      <LightSwitch dark={darkMode} onClick={toggleTheme} />
    </div>
  );
};

export default Footer;
