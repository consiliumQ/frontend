import React, { useRef, useEffect, useContext } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { ListItem } from '@material-ui/core';
import { useMutation } from '@apollo/react-hooks';
import { queries } from '../graphql';
import * as itemTypes from './common/DnDTypes';
import { TaskCard } from '.';

export default function DnDTaskCard({ task, taskIdx, dndOperation = {} }) {
    const ref = useRef(null);
    const { dispatchDnd, types, ColumnsState } = dndOperation;
    const [updateAfterDropCard] = useMutation(queries.MUTATE_TASKCARD_DND);
    const columnsState = useContext(ColumnsState);

    const [{ isDragging }, drag, preview] = useDrag({
        item: { type: itemTypes.DND_TASK_CARD, taskId: task._id, columnId: task.column._id, taskIdx },
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
        drop: item => {
            const { taskId, columnId: prevColId, taskIdx: prevTaskIdx } = item;

            const strippedColumns = columnsState.map(c => ({ columnId: c._id, taskIds: c.tasks.map(t => t._id) }));
            const { taskIds: prevTaskIds } = strippedColumns.find(c => c.columnId === prevColId);
            const { columnId: currColId, taskIds: currTaskIds } = strippedColumns.find(c => c.taskIds.includes(taskId));
            const currTaskIdx = currTaskIds.findIndex(tid => tid === taskId);

            if (prevColId === currColId && prevTaskIdx !== currTaskIdx) {
                updateAfterDropCard({
                    variables: {
                        columnId: currColId,
                        updateColumnObj: { taskIds: currTaskIds },
                    },
                });
            }

            if (prevColId !== currColId) {
                updateAfterDropCard({
                    variables: {
                        columnId: currColId,
                        updateColumnObj: { taskIds: currTaskIds },
                    },
                });
                updateAfterDropCard({
                    variables: {
                        columnId: prevColId,
                        updateColumnObj: { taskIds: prevTaskIds },
                    },
                });
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
