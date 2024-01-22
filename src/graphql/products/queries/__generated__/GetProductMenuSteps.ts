/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetProductMenuSteps
// ====================================================

export interface GetProductMenuSteps_getProductMenuSteps_options_product {
  __typename: "Product";
  id: string;
  title: string;
}

export interface GetProductMenuSteps_getProductMenuSteps_options {
  __typename: "ProductMenuOption";
  id: string;
  stepId: string;
  productId: string;
  product: GetProductMenuSteps_getProductMenuSteps_options_product;
  extraCharge: number;
  isForced: boolean;
  isDefault: boolean;
}

export interface GetProductMenuSteps_getProductMenuSteps {
  __typename: "MenuStep";
  id: string;
  productId: string;
  step: number;
  category: string;
  maxQuantity: number;
  options: GetProductMenuSteps_getProductMenuSteps_options[];
}

export interface GetProductMenuSteps {
  getProductMenuSteps: (GetProductMenuSteps_getProductMenuSteps | null)[];
}

export interface GetProductMenuStepsVariables {
  storeId: string;
  productId: string;
}
