import React, { useRef, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { ListItem } from '@material-ui/core';
import * as itemTypes from './common/DnDTypes';
import { TaskCard } from '.';

export default function DnDTaskCard({ task, dndOperation = {} }) {
    const ref = useRef(null);
    const { dispatchDnd, types } = dndOperation;

    const [{ isDragging }, drag, preview] = useDrag({
        item: { type: itemTypes.DND_TASK_CARD, taskId: task._id },
        isDragging: monitor => task._id === monitor.getItem().taskId,
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const [, drop] = useDrop({
        accept: itemTypes.DND_TASK_CARD,
        hover: (item, monitor) => {
            if (ref.current) {
                if (item.taskId !== task._id) {
                    const dropCardRef = ref.current;
                    const dropCardRect = dropCardRef.getBoundingClientRect();

                    const { x: mouseX, y: mouseY } = monitor.getClientOffset();

                    if (dropCardRect.left < mouseX < dropCardRect.right && dropCardRect.top < mouseY < dropCardRect.bottom) {
                        dispatchDnd({
                            type: types.MOVE_CARD_ON_CARD,
                            data: { dragId: item.taskId, dropId: task._id },
                        });
                    }
                }
            }
        },
    });

    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true });
    }, []);

    drag(drop(ref));

    return (
        <ListItem ref={ref} style={{ opacity: isDragging ? 0 : 1 }}>
            <TaskCard key={task._id} task={task} />
        </ListItem>
    );
}
