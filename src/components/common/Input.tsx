import React from "react";
import { input } from "../../../styled-system/recipes/input";
import { InputVariantProps } from "../../../styled-system/recipes/input";

export type InputProps = InputVariantProps &
  React.InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<InputProps> = ({ ...rest }) => {
  return <input className={input()} {...rest} />;
};
