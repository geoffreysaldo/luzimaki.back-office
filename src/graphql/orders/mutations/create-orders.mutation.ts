import { gql } from "@apollo/client";
import { OrderFragment } from "../fragments/order.fragment";

export const CREATE_ORDER = gql`
  mutation AdminOrderCreate($storeId: String!, $orderInput: OrderInput!) {
    adminOrderCreate(storeId: $storeId, orderInput: $orderInput) {
      ...OrderFragment
    }
  }
  ${OrderFragment}
`;
