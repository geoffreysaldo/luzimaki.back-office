/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { StoreSettingsInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateStoreSettings
// ====================================================

export interface UpdateStoreSettings_setStoreSettings {
  __typename: "StoreSettings";
  id: string;
  takeAwayWaitingTime: number;
  deliveryWaitingTime: number;
  closeLunchService: boolean;
  closeDinnerService: boolean;
  closeStore: boolean;
  textCloseStore: string | null;
}

export interface UpdateStoreSettings {
  setStoreSettings: UpdateStoreSettings_setStoreSettings;
}

export interface UpdateStoreSettingsVariables {
  storeId: string;
  storeSettingsId?: string | null;
  storeSettingsInput?: StoreSettingsInput | null;
}
