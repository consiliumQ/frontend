import React, { useReducer, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { queries } from '../graphql';

/**
 * - `{ type: MOVE_CARD, data: { dragColId, dropColId, dragId, dropId }  }`
 * - `{ type: MOVE_COLUMN, data: { dragColId, dropColId } }`
 */
const types = {
    MOVE_CARD: 'move_card',
    MOVE_COLUMNS: 'move_columns',
};

const moveCardReducer = (state, action) => {
    const newState = [...state];
    const { dragId, dropId } = action.data;

    const dragColIndex = newState.findIndex(c => c.tasks.find(t => t._id === dragId));
    const dropColIndex = newState.findIndex(c => c.tasks.find(t => t._id === dropId));
    const dragIndex = dragId && newState[dragColIndex].tasks.findIndex(t => t._id === dragId);
    const dropIndex = dropId && newState[dropColIndex].tasks.findIndex(t => t._id === dropId);

    switch (action.type) {
        case types.MOVE_CARD:
            if (dragColIndex === dropColIndex) {
                newState[dragColIndex].tasks.splice(dropIndex, 0, newState[dragColIndex].tasks.splice(dragIndex, 1)[0]);
            } else {
                newState[dropColIndex].tasks.splice(dropIndex, 0, newState[dragColIndex].tasks[dragIndex]);
                newState[dragColIndex].tasks.splice(dragIndex, 1);
            }
            return newState;
        case types.MOVE_COLUMNS:
            newState.splice(dropColIndex, 0, newState.splice(dragColIndex, 1));
            return newState;
        case 'init':
            return action.data;
        default:
            return state;
    }
};

// const useTaskCardDnDReducer = () => useReducer(moveCardReducer, INITIAL_STATE);

export default function useDndOperation() {
    const { data } = useQuery(queries.GET_PROJECT);
    const [columnsState, dispatchDnd] = useReducer(moveCardReducer, []);

    useEffect(() => {
        if (data) {
            dispatchDnd({ type: 'init', data: data.project.columns });
        }
    }, [data]);

    return [columnsState, { dispatchDnd, types }];
}
