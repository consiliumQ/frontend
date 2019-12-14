import ApolloClient, { InMemoryCache } from 'apollo-boost';

// const BASE_URL = 'http://localhost:4000/';

const client = new ApolloClient({
    uri: process.env.REACT_APP_BACKEND_URL,
    cache: new InMemoryCache(),
    connectToDevTools: true,
    request: operation => {
        const token = localStorage.getItem(process.env.REACT_APP_STORAGE_TOKEN);
        operation.setContext({
            headers: {
                authorization: token ? `Bearer ${token}` : undefined,
            },
        });
    },
});;
export default client;
