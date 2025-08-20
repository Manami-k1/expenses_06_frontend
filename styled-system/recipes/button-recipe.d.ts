/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface ButtonRecipeVariant {
  /**
 * @default "filled"
 */
variant: "filled" | "subtle"
/**
 * @default "success"
 */
intent: "success" | "danger" | "neutral"
}

type ButtonRecipeVariantMap = {
  [key in keyof ButtonRecipeVariant]: Array<ButtonRecipeVariant[key]>
}

export type ButtonRecipeVariantProps = {
  [key in keyof ButtonRecipeVariant]?: ConditionalValue<ButtonRecipeVariant[key]> | undefined
}

export interface ButtonRecipeRecipe {
  __type: ButtonRecipeVariantProps
  (props?: ButtonRecipeVariantProps): string
  raw: (props?: ButtonRecipeVariantProps) => ButtonRecipeVariantProps
  variantMap: ButtonRecipeVariantMap
  variantKeys: Array<keyof ButtonRecipeVariant>
  splitVariantProps<Props extends ButtonRecipeVariantProps>(props: Props): [ButtonRecipeVariantProps, Pretty<DistributiveOmit<Props, keyof ButtonRecipeVariantProps>>]
  getVariantProps: (props?: ButtonRecipeVariantProps) => ButtonRecipeVariantProps
}


export declare const buttonRecipe: ButtonRecipeRecipe