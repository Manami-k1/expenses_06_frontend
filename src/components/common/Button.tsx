import React from "react";
import { button } from "../../../styled-system/recipes/button";
import { ButtonVariantProps } from "../../../styled-system/recipes/button";

export type ButtonProps = ButtonVariantProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({
  children,
  variant,
  ...rest
}) => {
  return (
    <button className={button({ variant })} {...rest}>
      {children}
    </button>
  );
};
