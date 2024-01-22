import { gql } from "@apollo/client";

export const ChoiceFragment = gql`
  fragment ChoiceFragment on Choice {
    id
    stepId
    step
    category
    optionId
    productId
    productTitle
    productImage
    extraCharge
    quantity
  }
`