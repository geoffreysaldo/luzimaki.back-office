/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MenuStepFragment
// ====================================================

export interface MenuStepFragment_options_product {
  __typename: "Product";
  id: string;
  title: string;
}

export interface MenuStepFragment_options {
  __typename: "ProductMenuOption";
  id: string;
  stepId: string;
  productId: string;
  product: MenuStepFragment_options_product;
  extraCharge: number;
  isForced: boolean;
  isDefault: boolean;
}

export interface MenuStepFragment {
  __typename: "MenuStep";
  id: string;
  productId: string;
  step: number;
  category: string;
  maxQuantity: number;
  options: MenuStepFragment_options[];
}
