import React from 'react';

import { DndProvider } from 'react-dnd';
import { ThemeProvider } from '@material-ui/core/styles';
import { ApolloProvider } from '@apollo/react-hooks';

import HTML5Backend from 'react-dnd-html5-backend';
import ConsiliumQRouter from './pages/ConsiliumQRouter';
import consiliumqTheme from './assets/styles/consiliumqTheme';
import './assets/styles/index.scss';
import client from './graphql';

const App = () => {
    return (
        <ThemeProvider theme={consiliumqTheme}>
            <ApolloProvider client={client}>
                <DndProvider backend={HTML5Backend}>
                    <ConsiliumQRouter />
                </DndProvider>
            </ApolloProvider>
        </ThemeProvider>
    );
};

export default App;
