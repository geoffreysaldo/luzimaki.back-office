import { gql } from "@apollo/client";

export const ContactFragment = gql`
  fragment ContactFragment on Contact {
    id
    accountId
    lastname
    firstname
    address
    addressComplement
    city
    zipCode
    email
    phone
    comment
  }
`