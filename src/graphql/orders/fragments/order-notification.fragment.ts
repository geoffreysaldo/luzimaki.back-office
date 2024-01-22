import { gql } from "@apollo/client";

export const OrderNotificationFragment = gql`
  fragment OrderNotificationFragment on OrderNotification {
    id
    orderId
    storeId
    issuedAt
    notificationStatus
  }
`;
