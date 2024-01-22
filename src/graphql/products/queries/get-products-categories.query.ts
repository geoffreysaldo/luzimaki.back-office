import { gql } from "@apollo/client";
import { ProductCategoryFragment } from "../fragments/product-category.fragment";

export const GET_PRODUCTS_CATEGORIES = gql`
  query ProductCategoriesGet($storeId: String!) {
    productCategoriesGet(storeId: $storeId) {
      ...ProductCategoryFragment
    }
  }
  ${ProductCategoryFragment}
`;
