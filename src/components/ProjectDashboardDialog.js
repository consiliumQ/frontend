import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { queries } from '../graphql';
import { Dialog, AppBar, Toolbar, IconButton, Typography, Button, Container, Grid, Paper, Card, CardContent, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Transition from './common/TransitionEffect';

const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
}));

export default function ProjectDashboardDialog({ dndOperation, shouldProjectDashboardOpen, toggleProjectDashboardDialog }) {
    const classes = useStyles();
    const { data: currProjectData, loading: currProjectLoading } = useQuery(queries.GET_PROJECT_INFO_FROM_CACHE);

    // To get current Project simple info
    if (!currProjectLoading) {
        const {
            project: { _id: currProjectId, name: currProjectName },
        } = currProjectData;
        var projectId = currProjectId;
        var projectName = currProjectName;
    }

    const { data: projectData, loading: projectLoading } = useQuery(queries.GET_PROJECT, { variables: { projectId: projectId } });
    if (!projectLoading) {
        const {
            project: { description: projectDescription, columns: projectColumns, tasks: projectTasks },
        } = projectData;
        var project_description = projectDescription;
        var numOfColumns = projectColumns.length;
    }

    return (
        <Dialog fullScreen open={shouldProjectDashboardOpen} onClose={toggleProjectDashboardDialog} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={toggleProjectDashboardDialog} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Project Dashboard: {projectName}
                    </Typography>
                    <Button autoFocus color="inherit" onClick={toggleProjectDashboardDialog}>
                        Close
                    </Button>
                </Toolbar>
            </AppBar>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4} lg={3}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        {projectName}
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary">
                                        {project_description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={8} lg={9}>
                            <Paper>{'hello'}</Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>{'hello'}</Paper>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </Dialog>
    );
}
