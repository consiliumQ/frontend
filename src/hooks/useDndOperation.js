import React, { useReducer, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { queries } from '../graphql';

/**
 * - `{ type: MOVE_CARD, data: { dragColIdx, dropColIdx, dragIdx, dropIdx }  }`
 * - `{ type: MOVE_COLUMN, data: { dragColIdx, dropColIdx } }`
 */
const types = {
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

    return [columnsState, dispatchDnd, types];
}
