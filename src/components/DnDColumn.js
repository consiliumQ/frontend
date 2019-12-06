import React, { useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import * as itemTypes from '../dnd/dndItemTypes';
import { KanbanColumn } from '.';

export default function DnDColumn({ isLastColumn, column, dndOperation }) {
    const kanbanColRef = useRef(null);
    const { dispatchDnd, types } = dndOperation;
    const [, dropCard] = useDrop({
        accept: itemTypes.DND_TASK_CARD,
        drop: () => {},
    });

    dropCard(kanbanColRef);

    return (
        <div ref={kanbanColRef}>
            <KanbanColumn isLastColumn={isLastColumn} column={column} dndOperation={dndOperation} />
        </div>
    );
}
