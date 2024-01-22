/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProductCategoriesGet
// ====================================================

export interface ProductCategoriesGet_productCategoriesGet_subCategories {
  __typename: "SubCategory";
  id: string;
  rank: number;
  code: string;
}

export interface ProductCategoriesGet_productCategoriesGet {
  __typename: "ProductCategory";
  id: string;
  storeId: string;
  rank: number;
  name: string;
  subCategories: (ProductCategoriesGet_productCategoriesGet_subCategories | null)[];
}

export interface ProductCategoriesGet {
  productCategoriesGet: (ProductCategoriesGet_productCategoriesGet | null)[];
}

export interface ProductCategoriesGetVariables {
  storeId: string;
}
