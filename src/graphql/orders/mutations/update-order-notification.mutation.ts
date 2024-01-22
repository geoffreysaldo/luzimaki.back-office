import { gql } from "@apollo/client";
import { OrderNotificationFragment } from "../fragments/order-notification.fragment";

export const UPDATE_ORDER_NOTIFICATION = gql`
  mutation UpdateOrderNotification(
    $orderNotificationId: String!
    $notificationStatus: OrderNotificationStatus!
  ) {
    updateOrderNotification(
      orderNotificationId: $orderNotificationId
      notificationStatus: $notificationStatus
    ) {
      ...OrderNotificationFragment
    }
  }
  ${OrderNotificationFragment}
`;
