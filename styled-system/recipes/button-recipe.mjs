import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const buttonRecipeFn = /* @__PURE__ */ createRecipe('buttonRecipe', {
  "variant": "filled",
  "intent": "success"
}, [])

const buttonRecipeVariantMap = {
  "variant": [
    "filled",
    "subtle"
  ],
  "intent": [
    "success",
    "danger",
    "neutral"
  ]
}

const buttonRecipeVariantKeys = Object.keys(buttonRecipeVariantMap)

export const buttonRecipe = /* @__PURE__ */ Object.assign(memo(buttonRecipeFn.recipeFn), {
  __recipe__: true,
  __name__: 'buttonRecipe',
  __getCompoundVariantCss__: buttonRecipeFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: buttonRecipeVariantKeys,
  variantMap: buttonRecipeVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, buttonRecipeVariantKeys)
  },
  getVariantProps: buttonRecipeFn.getVariantProps,
})