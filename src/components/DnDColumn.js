import React, { useRef, useEffect, useContext } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { useMutation } from '@apollo/react-hooks';
import { queries } from '../graphql';
import * as itemTypes from './common/DnDTypes';
import { KanbanColumn } from '.';

export default function DnDColumn({ isLastColumn, column, columnIdx, dndOperation = {} }) {
    const ref = useRef(null);
    const { dispatchDnd, types, ColumnsState } = dndOperation;
    const [updateAfterDropCard] = useMutation(queries.MUTATE_TASKCARD_DND);
    const [updateAfterDropColumn] = useMutation(queries.MUTATE_TASKCOL_DND);
    const columnsState = useContext(ColumnsState);

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
        drop: (item, monitor) => {
            if (!monitor.didDrop()) {
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
            }
        },
    });

    const [{ isDragging }, drag, preview] = useDrag({
        item: { type: itemTypes.DND_TASK_COLUMN, columnId: column._id, columnIdx },
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
        drop: item => {
            const { columnId, columnIdx: prevColIdx } = item;
            const {
                project: { _id: projectId },
            } = column;
            const currColIdx = columnsState.findIndex(c => c._id === columnId);

            if (prevColIdx !== currColIdx) {
                updateAfterDropColumn({
                    variables: {
                        projectId,
                        updateProjectObj: { columnIds: columnsState.map(c => c._id) },
                    },
                });
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
