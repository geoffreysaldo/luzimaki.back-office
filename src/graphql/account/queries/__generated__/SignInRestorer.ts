/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SignInRestorer
// ====================================================

export interface SignInRestorer_signInRestorer {
  __typename: "AuthRestorerResponse";
  organizationId: string;
  storeIds: (string | null)[];
  accountId: string;
  email: string;
  accessToken: string;
  lastname: string;
  firstname: string;
}

export interface SignInRestorer {
  signInRestorer: SignInRestorer_signInRestorer;
}

export interface SignInRestorerVariables {
  email: string;
  password: string;
}
