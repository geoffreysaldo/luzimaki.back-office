import { gql } from "@apollo/client";
import { MenuStepFragment } from "./menu-step.fragment";

export const ProductFragment = gql`
  fragment ProductFragment on Product {
    id
    storeId
    title
    category
    subCategory
    slug
    price
    pieces
    vatRate
    status
    model
    description
    image
    onlyLunch
    menuChoices {
      ...MenuStepFragment
    }
  }
  ${MenuStepFragment}
`;
