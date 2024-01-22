import { gql } from "@apollo/client";
import { AuthRestorerResponseFragment } from "../fragments/auth-response.fragment";

export const SIGN_IN_RESTORER= gql`
    query SignInRestorer($email: String!, $password: String!) {
        signInRestorer(email: $email, password: $password) {
            ...AuthRestorerResponseFragment
        }
    }
    ${AuthRestorerResponseFragment}
`