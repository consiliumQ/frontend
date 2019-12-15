import ApolloClient, { InMemoryCache } from 'apollo-boost';

const client = new ApolloClient({
    uri: process.env.REACT_APP_BACKEND_URL,
    cache: new InMemoryCache(),
    connectToDevTools: true,
    // TODO: Work with Mijeong on the client-side login/logout modals and test (should be done at that point)
    request: operation => {
        const token = localStorage.getItem(process.env.REACT_APP_STORAGE_TOKEN);
        operation.setContext({
            headers: {
                authorization: token ? `Bearer ${token}` : '',
            },
        });
    },
});
export default client;
