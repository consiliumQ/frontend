import React, { useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import { ListItem } from '@material-ui/core';
import * as itemTypes from '../dnd/dndItemTypes';
import { tasks } from '../assets/DummyData';
import { TaskCard } from '.';

export default function DnDTaskCard({ task, currIndex }) {
    const ref = useRef(null);
    return (
        <ListItem ref={ref}>
            <TaskCard task={task} />
        </ListItem>
    );
}
