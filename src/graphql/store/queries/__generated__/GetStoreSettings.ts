/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetStoreSettings
// ====================================================

export interface GetStoreSettings_getStore_settings {
  __typename: "StoreSettings";
  id: string;
  takeAwayWaitingTime: number;
  deliveryWaitingTime: number;
  closeLunchService: boolean;
  closeDinnerService: boolean;
  closeStore: boolean;
  textCloseStore: string | null;
}

export interface GetStoreSettings_getStore {
  __typename: "Store";
  id: string;
  name: string;
  settings: GetStoreSettings_getStore_settings | null;
}

export interface GetStoreSettings {
  getStore: GetStoreSettings_getStore;
}

export interface GetStoreSettingsVariables {
  id: string;
}
