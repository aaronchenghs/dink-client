import { useCallback, useEffect, useState } from "react";
import "./footer.styles.scss";
import AccentTypography from "../../assets/accentcomponents/AccentTypography/AccentTypography";
import { getCssVariable } from "../../hooks/useCssVariable";

const themes = [
  {
    name: "Pickle Yellow (Default)",
    value: "pickle-yellow",
    cssVar: "--pickle-yellow",
  },
  { name: "Pickle Orange", value: "pickle-orange", cssVar: "--pickle-orange" },
  { name: "Pickle Green", value: "pickle-green", cssVar: "--pickle-green" },
  { name: "Pickle Blue", value: "pickle-blue", cssVar: "--pickle-blue" },
  { name: "Pickle Red", value: "pickle-red", cssVar: "--pickle-red" },
  { name: "Pickle White", value: "pickle-white", cssVar: "--pickle-white" },
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
      <AccentTypography tag={"body"} inverted>
        Contact: aaronchenghs@gmail.com
      </AccentTypography>

      <div className="theme-selector">
        <AccentTypography htmlFor="theme-select" tag={"body"} inverted>
          Choose Theme:
        </AccentTypography>
        <select id="theme-select" value={theme} onChange={handleChangeTheme}>
          {themes.map((themeOption) => (
            <option
              key={themeOption.value}
              value={themeOption.value}
              style={{
                backgroundColor: getCssVariable(themeOption.cssVar),
              }}
            >
              {themeOption.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Footer;
