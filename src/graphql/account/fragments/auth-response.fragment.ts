import { gql } from "@apollo/client";
import { StoreFragment } from "../../store/fragments/store.fragment";

export const AuthRestorerResponseFragment = gql`
  fragment AuthRestorerResponseFragment on AuthRestorerResponse {
    organizationId
    storeIds
    accountId
    email
    accessToken
    lastname
    firstname
  }
`;
