import { useCallback, useEffect, useState } from "react";
import "./footer.styles.scss";
import AccentTypography from "../../assets/accentcomponents/AccentTypography/AccentTypography";

const themes = [
  { name: "Pickle Yellow (Default)", value: "pickle-yellow" },
  { name: "Pickle Green", value: "pickle-green" },
  { name: "Pickle Orange", value: "pickle-orange" },
  { name: "Pickle Blue", value: "pickle-blue" },
  { name: "Pickle White", value: "pickle-white" },
  { name: "Pickle Red", value: "pickle-red" },
];

const Footer = () => {
  const [theme, setTheme] = useState<string>(
    localStorage.getItem("theme") || "pickle-yellow"
  );

  const handleChangeTheme = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newTheme = event.target.value;
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      setTheme(newTheme);
    },
    []
  );

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "pickle-yellow";
    document.documentElement.setAttribute("data-theme", savedTheme);
    setTheme(savedTheme);
  }, []);

  return (
    <div className="footer">
      <div className="theme-selector">
        <AccentTypography htmlFor="theme-select" tag={"body"} inverted>
          Choose Theme:
        </AccentTypography>
        <select id="theme-select" value={theme} onChange={handleChangeTheme}>
          {themes.map((themeOption) => (
            <option key={themeOption.value} value={themeOption.value}>
              {themeOption.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Footer;
