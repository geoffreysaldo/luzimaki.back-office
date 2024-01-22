import { gql } from "@apollo/client";
import { ChoiceFragment } from "./choice.fragment";

export const OrderLineFragment = gql`
  fragment OrderLineFragment on OrderLine {
    id
    productId
    productModel
    productTitle
    productPrice
    productImage
    productVatRate
    quantity
    total
    totalTaxInclusive
    menuChoices {
      ...ChoiceFragment
    }
    addOnChoices {
      ...ChoiceFragment
    }
  }
  ${ChoiceFragment}
`