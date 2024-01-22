import { gql } from "@apollo/client";
import { ContactFragment } from "../fragments/contact.fragment";

export const SEARCH_CONTACTS = gql`
  query SearchContact($storeId: String!, $searchName: String!) {
    searchContact(storeId: $storeId, searchName: $searchName) {
      ...ContactFragment
    }
  }
  ${ContactFragment}
`;
