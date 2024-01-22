/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProductMenuOptionFragment
// ====================================================

export interface ProductMenuOptionFragment_product {
  __typename: "Product";
  id: string;
  title: string;
}

export interface ProductMenuOptionFragment {
  __typename: "ProductMenuOption";
  id: string;
  stepId: string;
  productId: string;
  product: ProductMenuOptionFragment_product;
  extraCharge: number;
  isForced: boolean;
  isDefault: boolean;
}
