import React, { useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import { ListItem } from '@material-ui/core';
import * as itemTypes from '../dnd/dndItemTypes';
import { tasks } from '../assets/DummyData';
import { types, CardPosition } from '../tempDataContext';
import { TaskCard } from '.';

export default function DnDTaskCard({ taskId, columnId, currIndex }) {
    const ref = useRef(null);
    return (
        <ListItem ref={ref}>
            <TaskCard taskId={taskId} />
        </ListItem>
    );
}
