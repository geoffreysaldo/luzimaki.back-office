/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchInput, ProductStatus, ProductModel } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: SearchProducts
// ====================================================

export interface SearchProducts_searchProducts_products_menuChoices_options_product {
  __typename: "Product";
  id: string;
  title: string;
}

export interface SearchProducts_searchProducts_products_menuChoices_options {
  __typename: "ProductMenuOption";
  id: string;
  stepId: string;
  productId: string;
  product: SearchProducts_searchProducts_products_menuChoices_options_product;
  extraCharge: number;
  isForced: boolean;
  isDefault: boolean;
}

export interface SearchProducts_searchProducts_products_menuChoices {
  __typename: "MenuStep";
  id: string;
  productId: string;
  step: number;
  category: string;
  maxQuantity: number;
  options: SearchProducts_searchProducts_products_menuChoices_options[];
}

export interface SearchProducts_searchProducts_products {
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
  menuChoices: (SearchProducts_searchProducts_products_menuChoices | null)[];
}

export interface SearchProducts_searchProducts {
  __typename: "SearchProductsResponse";
  products: (SearchProducts_searchProducts_products | null)[];
  totalCount: number;
}

export interface SearchProducts {
  searchProducts: SearchProducts_searchProducts;
}

export interface SearchProductsVariables {
  searchInput: SearchInput;
}
