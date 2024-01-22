import { gql } from "@apollo/client";

export const PRINT_ORDER = gql`
  mutation OrderPrint($storeId: String!, $orderId: String!) {
    orderPrint(storeId: $storeId, orderId: $orderId)
  }
`;
