/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProductCategoryFragment
// ====================================================

export interface ProductCategoryFragment_subCategories {
  __typename: "SubCategory";
  id: string;
  rank: number;
  code: string;
}

export interface ProductCategoryFragment {
  __typename: "ProductCategory";
  id: string;
  storeId: string;
  rank: number;
  name: string;
  subCategories: (ProductCategoryFragment_subCategories | null)[];
}
