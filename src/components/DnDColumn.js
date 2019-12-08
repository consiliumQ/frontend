import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import * as itemTypes from '../dnd/dndItemTypes';
import { KanbanColumn } from '.';

export default function DnDColumn({ isLastColumn, column, dndOperation }) {
    const ref = useRef(null);
    const { dispatchDnd, types } = dndOperation;
    const [, dropCard] = useDrop({
        accept: itemTypes.DND_TASK_CARD,
        hover: (item, monitor) => {
            if (monitor.isOver({ shallow: true })) {
                if (!column.tasks.map(t => t._id).includes(item.taskId)) {
                    if (ref.current) {
                        const dropColRef = ref.current;
                        const dropColRect = dropColRef.getBoundingClientRect();

                        const { x: mouseX } = monitor.getClientOffset();

                        if (dropColRect.left < mouseX < dropColRect.right) {
                            dispatchDnd({
                                type: types.MOVE_CARD_ON_LIST,
                                data: { dragId: item.taskId, dropColId: column._id },
                            });
                        }
                    }
                }
            }
        },
        drop: () => {},
    });

    dropCard(ref);

    return (
        <div ref={ref}>
            <KanbanColumn isLastColumn={isLastColumn} column={column} dndOperation={dndOperation} />
        </div>
    );
}
