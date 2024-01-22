/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductStatus, ProductModel } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: ProductFragment
// ====================================================

export interface ProductFragment_menuChoices_options_product {
  __typename: "Product";
  id: string;
  title: string;
}

export interface ProductFragment_menuChoices_options {
  __typename: "ProductMenuOption";
  id: string;
  stepId: string;
  productId: string;
  product: ProductFragment_menuChoices_options_product;
  extraCharge: number;
  isForced: boolean;
  isDefault: boolean;
}

export interface ProductFragment_menuChoices {
  __typename: "MenuStep";
  id: string;
  productId: string;
  step: number;
  category: string;
  maxQuantity: number;
  options: ProductFragment_menuChoices_options[];
}

export interface ProductFragment {
  __typename: "Product";
  id: string;
  storeId: string;
  title: string;
  category: string;
  subCategory: string | null;
  slug: string;
  price: number;
  pieces: number;
  vatRate: number;
  status: ProductStatus;
  model: ProductModel;
  description: string;
  image: string | null;
  onlyLunch: boolean | null;
  menuChoices: (ProductFragment_menuChoices | null)[];
}
