import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { HomePage } from './components';

function App() {
    return (
        <DndProvider backend={HTML5Backend}>
            <div>
                <header>
                    <h1>ConsiliumQ Task Management Platform Frontend</h1>
                </header>
                <HomePage />
            </div>
        </DndProvider>
    );
}

export default App;
