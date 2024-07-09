import React from "react";
import "./accentTypography.styles.scss";

type AccentTypographyProps = {
  tag: "body" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
  children: React.ReactNode;
  inverted?: boolean;
};

const AccentTypography: React.FC<AccentTypographyProps> = ({
  tag,
  children,
  className,
  inverted,
}) => {
  const Tag = tag;

  return (
    <Tag
      className={`${inverted ? `invertedAccentTyography` : `accentTypography`} ${className ?? ""}`}
    >
      {children}
    </Tag>
  );
};

export default AccentTypography;
