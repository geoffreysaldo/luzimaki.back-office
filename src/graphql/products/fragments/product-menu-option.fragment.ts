import { gql } from "@apollo/client";

export const ProductMenuOptionFragment = gql`
  fragment ProductMenuOptionFragment on ProductMenuOption {
    id
    stepId
    productId
    product {
      id
      title
    }
    extraCharge
    isForced
    isDefault
  }
`;
