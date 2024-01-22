import { gql } from "@apollo/client";
import { SettingsFragment } from "../fragments/settings.fragment";

export const UPDATE_STORE_SETTINGS = gql`
  mutation UpdateStoreSettings($storeId: String!, $storeSettingsId: String, $storeSettingsInput: StoreSettingsInput) {
    setStoreSettings(storeId: $storeId, storeSettingsId: $storeSettingsId, storeSettingsInput: $storeSettingsInput) {
      ...SettingsFragment
    }
  }
  ${SettingsFragment}
`;
