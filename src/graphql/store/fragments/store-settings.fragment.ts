import { gql } from "@apollo/client";
import { SettingsFragment } from "./settings.fragment";

export const StoreSettingsFragment = gql`
  fragment StoreSettingsFragment on Store {
    id
    name
    settings {
      ...SettingsFragment
    }
  }
  ${SettingsFragment}
`;
