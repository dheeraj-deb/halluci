import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
    uri:'https://d37b-2401-4900-22da-d27d-e0e6-f5a7-e6c4-e577.ngrok-free.app/graphql',
    cache: new InMemoryCache(),
    credentials:"include"
});