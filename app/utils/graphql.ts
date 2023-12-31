import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

export function getApolloClient(request: Request, token: string | undefined) {
  const client = new ApolloClient({
    ssrMode: true,
    cache: new InMemoryCache(),
    link: createHttpLink({
      uri: process.env.GRAPHQL_SCHEMA_URL || "GRAPHQL_SCHEMA_URL IS NOT SET",
      headers: {
        ...Object.fromEntries(request.headers),
        Authorization: `Bearer ${token ?? "ERROR TOKEN!"}`,
      },
      credentials: request.credentials ?? "include", // or "same-origin" if your backend server is the same domain
    }),
  });
  return client;
}

export function getPureObject<T extends { __typename?: any }>(
  object: T | null | undefined,
): Omit<T, "__typename"> | null | undefined {
  if (!object) return object;
  const { __typename, ...pureObject } = object;
  return pureObject;
}

export function noNull<T>(value: T | null): value is NonNullable<T> {
  return value !== null;
}
