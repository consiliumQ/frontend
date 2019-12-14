import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core';
import { useDragLayer } from 'react-dnd';
import * as itemTypes from './common/DnDTypes';
import { TaskCard, KanbanColumn } from '.';

const useStyles = makeStyles(theme => ({
    layerStyles: {
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 100000,
        top: 0,
        left: 0,
        width: ({ isCard }) => (isCard ? theme.projectColumnWidth - 10 : theme.projectColumnWidth),
        height: '100%',
    },
    itemStyle: {
        transform: ({ currentOffset }) => currentOffset && `translate(${currentOffset.x}px, ${currentOffset.y}px)`,
        backgroundColor: ({ isCard }) => !isCard && theme.palette.primary.main,
        borderRight: ({ isCard }) => !isCard && `1px solid ${theme.palette.primary.light}`,
        boxShadow: theme.shadows[10],
    },
}));

const TaskCardDragPreview = memo(({ task }) => <TaskCard task={task} />);
const ColumnDragPreview = memo(({ column }) => <KanbanColumn column={column} isPreview />);

export default function CustomDragLayer({ columnsState }) {
    const { item, itemType, isDragging, currentOffset } = useDragLayer(monitor => ({
        item: monitor.getItem(),
        itemType: monitor.getItemType(),
        currentOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging(),
    }));
    const classes = useStyles({ currentOffset, isCard: itemType === itemTypes.DND_TASK_CARD });

    const getLayerItem = itemId => {
        for (const col of columnsState) {
            if (col._id === itemId) {
                return col;
            }
            for (const tsk of col.tasks) {
                if (tsk._id === itemId) {
                    return tsk;
                }
            }
        }
    };

    const renderItem = () => {
        switch (itemType) {
            case itemTypes.DND_TASK_CARD:
                return <TaskCardDragPreview task={getLayerItem(item.taskId)} />;
            case itemTypes.DND_TASK_COLUMN:
                return <ColumnDragPreview column={getLayerItem(item.columnId)} />;
            default:
                return null;
        }
    };

    return (
        <>
            {isDragging && (
                <div className={classes.layerStyles}>
                    <div className={classes.itemStyle}>{renderItem()}</div>
                </div>
            )}
        </>
    );
}
