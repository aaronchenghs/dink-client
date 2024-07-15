import React from "react";
import "./accentTypography.styles.scss";

type AccentTypographyProps = {
  tag: "body" | "p" | "label" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
  htmlFor?: string;
  children: React.ReactNode;
  inverted?: boolean;
};

const AccentTypography: React.FC<AccentTypographyProps> = ({
  tag,
  children,
  className,
  inverted,
  htmlFor,
}) => {
  const Tag = tag;

  return tag === "label" ? (
    <label htmlFor={htmlFor}> {children}</label>
  ) : (
    <Tag
      className={`${inverted ? `invertedAccentTyography` : `accentTypography`} ${className ?? ""}`}
    >
      {children}
    </Tag>
  );
};

export default AccentTypography;
