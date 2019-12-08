import React, { useRef, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import * as itemTypes from './common/DnDTypes';
import { KanbanColumn } from '.';

export default function DnDColumn({ isLastColumn, column, dndOperation = {} }) {
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

    const [{ isDragging }, drag, preview] = useDrag({
        item: { type: itemTypes.DND_TASK_COLUMN, columnId: column._id },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const [, drop] = useDrop({
        accept: itemTypes.DND_TASK_COLUMN,
        hover: (item, monitor) => {
            if (ref.current) {
                if (item.columnId !== column._id) {
                    const dropColRef = ref.current;
                    const dropColRect = dropColRef.getBoundingClientRect();

                    const { x: mouseX, y: mouseY } = monitor.getClientOffset();

                    if (dropColRect.left < mouseX < dropColRect.right && dropColRect.top < mouseY < dropColRect.bottom) {
                        dispatchDnd({
                            type: types.MOVE_COLUMN,
                            data: { dragColId: item.columnId, dropColId: column._id },
                        });
                    }
                }
            }
        },
    });

    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true });
    }, []);

    drag(drop(dropCard(ref)));

    return (
        <div ref={ref} style={{ opacity: isDragging ? 0 : 1 }}>
            <KanbanColumn isLastColumn={isLastColumn} column={column} dndOperation={dndOperation} />
        </div>
    );
}
