import { gql } from "@apollo/client";
import { ProductMenuOptionFragment } from "../fragments/product-menu-option.fragment";

export const GET_PRODUCT_MENU_STEPS = gql`
  query GetProductMenuSteps($storeId: String!, $productId: String!) {
    getProductMenuSteps(storeId: $storeId, productId: $productId) {
      id
      productId
      step
      category
      maxQuantity
      options {
        ...ProductMenuOptionFragment
      }
    }
  }
  ${ProductMenuOptionFragment}
`;
