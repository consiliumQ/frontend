import React, { useRef } from 'react';
import { AppBar, Toolbar, IconButton, makeStyles, Button, FormControl, Select, InputLabel, MenuItem } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#21252b',
        boxShadow: 'none',
    },
    spacer: {
        flexGrow: 1,
    },
    flatButton: {
        boxShadow: 'none',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    inputLabel: {
        color: 'white',
    },
}));

export default function Header(props) {
    const appBarRef = useRef(null);
    const classes = useStyles();

    const [project, setProject] = React.useState('');

    const handleProjectSelection = event => {
        setProject(event.target.value);
    };

    const { onMenuIconClicked } = props;

    return (
        <React.Fragment>
            <AppBar ref={appBarRef} position={'fixed'} className={classes.root}>
                <Toolbar>
                    <IconButton edge={'start'} onClick={() => onMenuIconClicked()}>
                        <Menu />
                    </IconButton>
                    <h1>
                        <span style={{ fontWeight: 100 }}>consiliumQ</span>
                    </h1>
                    <div className={classes.spacer} />
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label" className={classes.inputLabel}>
                            Select Project
                        </InputLabel>
                        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={project} onChange={handleProjectSelection}>
                            {/* Place holders for now  */}
                            <MenuItem value={10}>Project1</MenuItem>
                            <MenuItem value={20}>Project2</MenuItem>
                            <MenuItem value={30}>Project3</MenuItem>
                        </Select>
                    </FormControl>
                </Toolbar>
            </AppBar>
            <Toolbar style={{ height: appBarRef.clientHeight }} />
        </React.Fragment>
    );
}

Header.propTypes = {
    onMenuIconClicked: PropTypes.func.isRequired,
};
