import React from 'react';
import { Slide } from '@material-ui/core';

// the spreading props is getting compalin from linter, probably use another implmentation in the future
const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default Transition;
