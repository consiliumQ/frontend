import ApolloClient, { InMemoryCache } from 'apollo-boost';

const BASE_URL = 'http://localhost:4000/';

const client = new ApolloClient({ uri: BASE_URL, cache: new InMemoryCache() });
export default client;
