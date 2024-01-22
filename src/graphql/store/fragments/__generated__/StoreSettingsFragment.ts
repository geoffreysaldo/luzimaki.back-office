/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: StoreSettingsFragment
// ====================================================

export interface StoreSettingsFragment_settings {
  __typename: "StoreSettings";
  id: string;
  takeAwayWaitingTime: number;
  deliveryWaitingTime: number;
  closeLunchService: boolean;
  closeDinnerService: boolean;
  closeStore: boolean;
  textCloseStore: string | null;
}

export interface StoreSettingsFragment {
  __typename: "Store";
  id: string;
  name: string;
  settings: StoreSettingsFragment_settings | null;
}
