import React, { useReducer, createContext } from 'react';
import { project, columns } from './assets/DummyData';

const INITIAL_STATE = [];
for (const columnId of project.columns) {
    const { taskList } = columns.find(col => col.id === columnId);
    INITIAL_STATE.push({ id: columnId, tasks: [...taskList] });
}

/**
 * - `{ type: MOVE_CARD, data: { dragColIdx, dropColIdx, dragIdx, dropIdx }  }`
 * - `{ type: MOVE_COLUMN, data: { dragColIdx, dropColIdx } }`
 */
export const types = {
    MOVE_CARD: 'move_card',
    MOVE_COLUMNS: 'move_columns',
};

const moveCardReducer = (state, action) => {
    const newState = [...state];
    const { dragColIdx, dropColIdx, dragIdx, dropIdx } = action.data;
    switch (action.type) {
        case types.MOVE_CARD:
            if (dragColIdx === dropColIdx) {
                newState[dragColIdx].tasks.splice(dropIdx, 0, newState[dragColIdx].tasks.splice(dragIdx, 1)[0]);
            } else {
                newState[dropColIdx].tasks.splice(dropIdx, 0, newState[dragColIdx].tasks[dragIdx]);
                newState[dragColIdx].tasks.splice(dragIdx, 1);
            }
            return newState;
        case types.MOVE_COLUMNS:
            newState.splice(dropColIdx, 0, newState.splice(dragColIdx, 1));
            return newState;
        default:
            return state;
    }
};

const useTaskCardDnDReducer = () => useReducer(moveCardReducer, INITIAL_STATE);
