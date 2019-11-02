import React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { ThemeProvider } from '@material-ui/core/styles';
import './assets/styles/index.scss';
import ConsiliumQRouter from './pages/ConsiliumQRouter';
import consiliumqTheme from './assets/styles/consiliumqTheme';

const App = () => {
    return (
        <ThemeProvider theme={consiliumqTheme}>
            <DndProvider backend={HTML5Backend}>
                <ConsiliumQRouter />
            </DndProvider>
        </ThemeProvider>
    );
};

export default App;
