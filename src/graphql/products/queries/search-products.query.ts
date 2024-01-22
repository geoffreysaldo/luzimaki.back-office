import { gql } from "@apollo/client";
import { ProductFragment } from "../fragments/product.fragment";

export const SEARCH_PRODUCTS = gql`
  query SearchProducts($searchInput: SearchInput!) {
    searchProducts(searchInput: $searchInput) {
      products {
        ...ProductFragment
      }
      totalCount
    }
  }
  ${ProductFragment}
`;
