/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SignIn
// ====================================================

export interface SignIn_signIn {
  __typename: "AuthResponse";
  accountId: string;
  email: string;
  accessToken: string;
  lastname: string;
  firstname: string;
}

export interface SignIn {
  signIn: SignIn_signIn;
}

export interface SignInVariables {
  organizationId: string;
  email: string;
  password: string;
}
