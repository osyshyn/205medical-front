import React from "react";

interface ColorInterface {
  value: string; // Значение, например, "Open"
  style: {
    color: string; // Цвет в формате HEX, например, "#FFB700"
    backgroundColor: string; // Цвет фона в формате HEX, например, "#FFB700"
  };
}

interface BadgeProps {
  color: ColorInterface;
  children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ color, children }) => {
  console.log("color", color);
  return (
    <span
      className={`inline-flex items-center rounded-xl px-3 py-1 text-sm font-medium`}
      style={{
        backgroundColor: color.style.backgroundColor,
        color: color.style.color,
        border: `1px solid ${color.style.color}`,
      }}
    >
      {color.value}
    </span>
  );
};

export default Badge;
