import React, { useState } from 'react';
import { Paper, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { Header, TaskCard, SideBar, KanbanColumn } from '../../components';

const HomePage = () => {
    const [shouldSideBarOpen, setSideBarOpen] = useState(false);

    const dummyData = Array.from(Array(3).keys());
    return (
        <>
            <Header onMenuIconClicked={() => setSideBarOpen(!shouldSideBarOpen)} />
            <Grid container style={{ paddingTop: '16px' }}>
                <Grid item xs={12} md={4} lg={3}>
                    <KanbanColumn tasks={dummyData} />
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                    <KanbanColumn tasks={[dummyData[0]]} />
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                    <KanbanColumn tasks={[]} />
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                    <KanbanColumn tasks={dummyData.slice(0, 2)} />
                </Grid>
            </Grid>
            <SideBar shouldSideBarOpen={shouldSideBarOpen} toggleSideBar={() => setSideBarOpen(!shouldSideBarOpen)} />
        </>
    );
};

export default HomePage;
