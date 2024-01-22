import { gql } from "@apollo/client";
import { OrderLineFragment } from "./order-line.fragment";
import { ContactFragment } from "./contact.fragment";

export const OrderFragment = gql`
  fragment OrderFragment on Order {
    id
    orderNumber
    storeId
    contact {
      ...ContactFragment
    }
    guestsNumber
    issuedAt
    expectedAt
    fulfillmentState
    financialState
    mode
    source
    comment
    lines {
      ...OrderLineFragment
    }
    discount
    tips
    total
    totalTaxInclusive
    totalDiscount
    totalShipping
    totalVat
  }
  ${ContactFragment}
  ${OrderLineFragment}
`;
