import { gql } from "@apollo/client";
import { OrderNotificationFragment } from "../fragments/order-notification.fragment";

export const GET_ORDER_NOTIFICATIONS_QUERY = gql`
  query GetOrderNotifications($storeId: String!) {
    getOrderNotifications(storeId: $storeId) {
      ...OrderNotificationFragment
    }
  }
  ${OrderNotificationFragment}
`;
