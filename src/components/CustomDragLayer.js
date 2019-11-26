import React from 'react';
import { useDragLayer } from 'react-dnd';
import { types } from '../tempDataContext';
import { TaskCard } from '.';

export default function CustomDragLayer() {
    const { item, itemType, isDragging } = useDragLayer(monitor => ({
        item: monitor.getItem(),
        itemType: monitor.getItemType(),
        isDragging: monitor.isDragging(),
    }));

    const renderItem = () => {
        switch (itemType) {
            case types.MOVE_CARD:
                return <TaskCard />;
            default:
                return null;
        }
    };
}
