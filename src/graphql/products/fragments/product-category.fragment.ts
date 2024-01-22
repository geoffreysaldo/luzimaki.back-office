import { gql } from "@apollo/client";

export const ProductCategoryFragment = gql`
  fragment ProductCategoryFragment on ProductCategory {
    id
    storeId
    rank
    name
    subCategories {
      id
      rank
      code
    }
  }
`;
