import React from "react";
import "./accentbutton.styles.scss";

type AccentButtonProps = {
  type?: "primary" | "secondary";
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
};

const AccentButton: React.FC<AccentButtonProps> = ({
  type,
  onClick,
  children,
  className,
}) => {
  const buttonClassName = `button-base ${className} ${type ?? "primary"}`;

  return (
    <button className={buttonClassName} onClick={onClick}>
      {children}
    </button>
  );
};

export default AccentButton;
