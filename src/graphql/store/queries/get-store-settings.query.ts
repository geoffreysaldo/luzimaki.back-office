import { gql } from "@apollo/client";
import { StoreSettingsFragment } from "../fragments/store-settings.fragment";

export const GET_STORE_SETTINGS = gql`
  query GetStoreSettings($id: String!) {
    getStore(id: $id) {
      ...StoreSettingsFragment
    }
  }
  ${StoreSettingsFragment}
`;
