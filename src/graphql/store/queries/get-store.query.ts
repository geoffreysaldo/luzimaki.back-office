import { gql } from "@apollo/client";
import { StoreFragment } from "../fragments/store.fragment";

export const GET_STORE = gql`
  query GetStore($id: String!) {
    getStore(id: $id) {
      ...StoreFragment
    }
  }
  ${StoreFragment}
`;
