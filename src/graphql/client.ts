import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { AuthRestorerResponse } from "../store/auth.slice";
import { StoreState } from "../store";

export const useApolloClient = () => {
  const accessToken = useSelector(
    (state: StoreState) => state.auth.accessToken
  );

  const userLoggedInFetch = useCallback(() => {
    return async (
      uri: RequestInfo,
      options?: RequestInit
    ): Promise<Response> => {
      const response = await fetch(uri, {
        ...options,
        headers: {
          ...(options?.headers || {}),
          ...(accessToken ? { authorization: `Bearer ${accessToken}` } : {}),
        },
      });

      return response;
    };
  }, [accessToken]);

  const wsLink =
    typeof window !== "undefined"
      ? new GraphQLWsLink(
          createClient({
            url: process.env.REACT_APP_GRAPHQL_WS_URL as string,
          })
        )
      : null;

  const httpLink = new HttpLink({
    uri: process.env.REACT_APP_GRAPHQL_URL,
    fetch: userLoggedInFetch(),
  });

  const splitLink =
    typeof window !== "undefined" && wsLink != null
      ? split(
          ({ query }) => {
            const def = getMainDefinition(query);
            return (
              def.kind === "OperationDefinition" &&
              def.operation === "subscription"
            );
          },
          wsLink,
          httpLink
        )
      : httpLink;

  const unauthorizedClient = useCallback(
    () =>
      new ApolloClient({
        cache: new InMemoryCache(),
        uri: process.env.REACT_APP_GRAPHQL_URL,
        link: splitLink,
        defaultOptions: {
          watchQuery: {
            errorPolicy: "all",
          },
          query: {
            errorPolicy: "all",
          },
        },
      }),
    [splitLink]
  );

  const authorizedClient = useCallback(
    () =>
      new ApolloClient({
        cache: new InMemoryCache(),
        uri: process.env.REACT_APP_GRAPHQL_URL,
        link: splitLink,
        defaultOptions: {
          watchQuery: {
            errorPolicy: "all",
          },
          query: {
            errorPolicy: "all",
          },
        },
      }),
    [splitLink]
  );
  return accessToken ? authorizedClient() : unauthorizedClient();
};
