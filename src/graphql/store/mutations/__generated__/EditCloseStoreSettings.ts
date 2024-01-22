/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CloseStoreSettingsInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: EditCloseStoreSettings
// ====================================================

export interface EditCloseStoreSettings_editCloseStoreSettings {
  __typename: "StoreSettings";
  id: string;
  takeAwayWaitingTime: number;
  deliveryWaitingTime: number;
  closeLunchService: boolean;
  closeDinnerService: boolean;
  closeStore: boolean;
  textCloseStore: string | null;
}

export interface EditCloseStoreSettings {
  editCloseStoreSettings: EditCloseStoreSettings_editCloseStoreSettings;
}

export interface EditCloseStoreSettingsVariables {
  storeSettingsId: string;
  closeStoreSettingsInput: CloseStoreSettingsInput;
}
