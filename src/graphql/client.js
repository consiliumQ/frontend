import ApolloClient, { InMemoryCache } from 'apollo-boost';

const BASE_URL = 'http://localhost:4000/';

const client = new ApolloClient({
    uri: BASE_URL,
    cache: new InMemoryCache(),
    connectToDevTools: true,
    // TODO: Work with Mijeong on the client-side login/logout modals and test (should be done at that point)
    // request: operation => {
    //     const token = localStorage.getItem('token');
    //     operation.setContext({
    //         headers: {
    //             authorization: token ? `Bearer ${token}` : undefined
    //         },
    //     });
    // },
});
export default client;
