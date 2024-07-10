import React, { useRef } from "react";
import "./contextMenu.styles.scss";

interface ContextMenuProps {
  items: { label: string; action: () => void }[];
}

const ContextMenu: React.FC<ContextMenuProps> = ({ items }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <div className="context-menu" ref={menuRef}>
      {items.map((item, index) => (
        <button key={index} onClick={item.action}>
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default ContextMenu;
