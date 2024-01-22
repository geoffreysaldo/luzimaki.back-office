import { gql } from "@apollo/client";

export const SettingsFragment = gql`
  fragment SettingsFragment on StoreSettings {
    id
    takeAwayWaitingTime
    deliveryWaitingTime
    closeLunchService
    closeDinnerService
    closeStore
    textCloseStore
  }
`;
