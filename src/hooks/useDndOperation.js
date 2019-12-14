import React, { useReducer, useEffect, createContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { queries } from '../graphql';

/**
 * - `{ type: MOVE_CARD_ON_CARD, data: { dragColId, dropColId, dragId, dropId }  }`
 * - `{ type: MOVE_COLUMN, data: { dragColId, dropColId } }`
 */
const types = {
    MOVE_CARD_ON_CARD: 'move_card_on_card',
    MOVE_CARD_ON_LIST: 'move_card_on_list',
    MOVE_COLUMN: 'move_column',
};

const ColumnsState = createContext(null);

const moveCardReducer = (state, action) => {
    const newState = [...state];
    const { dragId, dropId, dragColId, dropColId } = action.data;

    const dragColIndex = dragColId
        ? newState.findIndex(c => c._id === dragColId)
        : dragId && newState.findIndex(c => c.tasks.find(t => t._id === dragId));
    const dropColIndex = dropColId
        ? newState.findIndex(c => c._id === dropColId)
        : dropId && newState.findIndex(c => c.tasks.find(t => t._id === dropId));

    const dragIndex = dragId && newState[dragColIndex].tasks.findIndex(t => t._id === dragId);
    const dropIndex = dropId && newState[dropColIndex].tasks.findIndex(t => t._id === dropId);

    switch (action.type) {
        case types.MOVE_CARD_ON_CARD:
            if (dragColIndex === dropColIndex) {
                newState[dragColIndex].tasks.splice(dropIndex, 0, newState[dragColIndex].tasks.splice(dragIndex, 1)[0]);
            } else {
                newState[dropColIndex].tasks.splice(dropIndex, 0, newState[dragColIndex].tasks[dragIndex]);
                newState[dragColIndex].tasks.splice(dragIndex, 1);
            }
            return newState;
        case types.MOVE_CARD_ON_LIST:
            newState[dropColIndex].tasks.push(newState[dragColIndex].tasks[dragIndex]);
            newState[dragColIndex].tasks.splice(dragIndex, 1);
            return newState;
        case types.MOVE_COLUMN:
            newState.splice(dropColIndex, 0, newState.splice(dragColIndex, 1)[0]);
            return newState;
        case 'init': // hope there is a cleaner way to update the data...
            return action.data;
        default:
            return state;
    }
};

export default function useDndOperation() {
    const { data, refetch } = useQuery(queries.GET_PROJECT, { pollInterval: 500 });
    const [columnsState, dispatchDnd] = useReducer(moveCardReducer, []);

    useEffect(() => {
        if (data) {
            dispatchDnd({ type: 'init', data: data.project.columns });
        }
    }, [data]);

    return [columnsState, { dispatchDnd, refetch, types, ColumnsState }];
}
