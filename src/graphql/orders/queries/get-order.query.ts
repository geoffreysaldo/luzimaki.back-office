import { gql } from "@apollo/client";
import { OrderFragment } from "../fragments/order.fragment";

export const GET_ORDER = gql`
  query OrderGet($storeId: String!, $id: String!) {
    orderGet(storeId: $storeId, id: $id) {
      ...OrderFragment
    }
  }
  ${OrderFragment}
`;
