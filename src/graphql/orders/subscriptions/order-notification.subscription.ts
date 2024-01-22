import { gql } from "@apollo/client";
import { OrderNotificationFragment } from "../fragments/order-notification.fragment";

export const ORDER_NOTIFICATION_SUBSCRIPTION = gql`
  subscription OrderNotification($storeId: String!) {
    orderNotification(storeId: $storeId) {
      ...OrderNotificationFragment
    }
  }
  ${OrderNotificationFragment}
`;
