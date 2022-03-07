import { WebSocketLink } from "apollo-link-ws";
import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';


const httpLink1 = new HttpLink({
  // uri: 'https://api.thegraph.com/subgraphs/name/sushiswap/master-chef'
  uri: 'https://api.thegraph.com/subgraphs/name/gvladika/simplefi-sushiswap-farms'
});

const wsLink1 = new WebSocketLink({
  uri: 'wss://api.thegraph.com/subgraphs/name/gvladika/simplefi-sushiswap-farms',
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        Authorization: "Bearer yourauthtoken",
      },
    },
  },
});

const splitLink1 = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink1,
  httpLink1,
);

export const client = new ApolloClient({
  link: splitLink1,
  cache: new InMemoryCache(),
  shouldBatch: true,
});


const httpLink2 = new HttpLink({
  uri: 'https://api.thegraph.com/subgraphs/name/sushiswap/exchange'
});

const wsLink2 = new WebSocketLink({
  uri: 'wss://api.thegraph.com/subgraphs/name/sushiswap/exchange',
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        Authorization: "Bearer yourauthtoken",
      },
    },
  },
});

const splitLink2 = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink2,
  httpLink2,
);

export const client1 = new ApolloClient({
  link: splitLink2,
  cache: new InMemoryCache(),
  shouldBatch: true,
});
