import { gql } from "@apollo/client";
import { ProductMenuOptionFragment } from "./product-menu-option.fragment";

export const MenuStepFragment = gql`
  fragment MenuStepFragment on MenuStep {
    id
    productId
    step
    category
    maxQuantity
    options {
      ...ProductMenuOptionFragment
    }
  }
  ${ProductMenuOptionFragment}
`;
