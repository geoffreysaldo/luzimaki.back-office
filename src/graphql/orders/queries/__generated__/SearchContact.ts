/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchContact
// ====================================================

export interface SearchContact_searchContact {
  __typename: "Contact";
  id: string;
  accountId: string | null;
  lastname: string;
  firstname: string;
  address: string | null;
  addressComplement: string | null;
  city: string | null;
  zipCode: string | null;
  email: string | null;
  phone: string;
  comment: string | null;
}

export interface SearchContact {
  searchContact: (SearchContact_searchContact | null)[];
}

export interface SearchContactVariables {
  storeId: string;
  searchName: string;
}
