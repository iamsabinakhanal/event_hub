import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, type = "button", className }) => {
  return (
    <button
      type={type}
      className={`py-3 px-6 rounded-lg text-white font-semibold shadow-lg ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
