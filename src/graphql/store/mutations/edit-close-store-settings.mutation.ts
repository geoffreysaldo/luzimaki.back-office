import { gql } from "@apollo/client";
import { SettingsFragment } from "../fragments/settings.fragment";

export const EDIT_CLOSE_STORE_SETTINGS = gql`
  mutation EditCloseStoreSettings($storeSettingsId: String!, $closeStoreSettingsInput: CloseStoreSettingsInput!) {
    editCloseStoreSettings(storeSettingsId: $storeSettingsId, closeStoreSettingsInput: $closeStoreSettingsInput) {
      ...SettingsFragment
    }
  }
  ${SettingsFragment}
`;
