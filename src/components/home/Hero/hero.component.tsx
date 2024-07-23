import "./hero.styles.scss";

interface HeroProps {
  type: "full" | "half";
  children: React.ReactNode;
}

const Hero = ({ type, children }: HeroProps) => {
  return (
    <div className={type === "half" ? "hero" : "fullhero"}>{children}</div>
  );
};

export default Hero;
