import "./hero.styles.scss";

interface HeroProps {
  type: "full" | "half";
  children: React.ReactNode;
  id?: string;
}

const Hero = ({ type, children, id }: HeroProps) => {
  return (
    <div className={`hero ${type === "full" && `fullhero`}`} id={id}>
      {children}
    </div>
  );
};

export default Hero;
