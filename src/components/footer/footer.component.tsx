import { useCallback, useEffect } from "react";
import "./footer.styles.scss";

const Footer = () => {
  const toggleTheme = useCallback(() => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  return (
    <div className="footer">
      <h1>Footer!</h1>
      <button id="theme-toggle-button" onClick={toggleTheme}>
        Toggle Theme
      </button>
    </div>
  );
};

export default Footer;
