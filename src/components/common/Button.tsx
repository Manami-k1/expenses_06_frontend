import React from "react";
import { button } from "../../../styled-system/recipes/button";
import { css } from "styled-system/css";
import { ButtonVariantProps } from "../../../styled-system/recipes/button";

const style = css({});

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
