import { ApolloClient, InMemoryCache } from '@apollo/client';
import { GRAPHQLURL } from './url';

export const client = new ApolloClient({
  uri: GRAPHQLURL,
  cache: new InMemoryCache(),
});
