import { gql } from "@apollo/client";
import { OrderFragment } from "./order.fragment";

export const SearchOrdersResponseFragment = gql`
  fragment SearchOrdersResponseFragment on SearchOrdersResponse {
    orders {
      ...OrderFragment
    }
    totalCount
  }
  ${OrderFragment}
`