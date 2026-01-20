"use client";

import React from "react";

export type ButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({ className = "", children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={`transition-all ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
