import React, { useEffect, useRef } from "react";
import "./hero.styles.scss";

interface HeroProps {
  type: "full" | "half";
  children: React.ReactNode;
  id?: string;
}

const Hero = ({ type, children, id }: HeroProps) => {
  const heroRef = useRef<HTMLDivElement | null>(null);

  // Slide-in effect
  useEffect(() => {
    if (type === "half" && heroRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );

      const halfHeroContent =
        heroRef.current.querySelector(".half-hero-content");
      if (halfHeroContent) {
        observer.observe(halfHeroContent);
      }

      return () => {
        observer.disconnect();
      };
    }
  }, [type]);

  return (
    <div
      className={`hero ${type === "full" && `fullhero`}`}
      id={id}
      ref={heroRef}
    >
      <div className={type !== "full" ? "half-hero-content" : "hero-content"}>
        {children}
      </div>
    </div>
  );
};

export default Hero;
