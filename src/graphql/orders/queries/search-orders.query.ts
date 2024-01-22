import { gql } from "@apollo/client";
import { SearchOrdersResponseFragment } from "../fragments/search-orders-response.fragment";

export const SEARCH_ORDERS = gql`
  query OrdersSearch($searchInput: SearchInput!) {
    ordersSearch(searchInput: $searchInput) {
      ...SearchOrdersResponseFragment
    }
  }
  ${SearchOrdersResponseFragment}
`