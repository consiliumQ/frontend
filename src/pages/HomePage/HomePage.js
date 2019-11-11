import React, { useState } from 'react';

import { Header, SideBar, KanbanBoard } from '../../components';

const HomePage = () => {
    const [shouldSideBarOpen, setSideBarOpen] = useState(false);

    return (
        <>
            <Header onMenuIconClicked={() => setSideBarOpen(!shouldSideBarOpen)} />
            <KanbanBoard />
            <SideBar shouldSideBarOpen={shouldSideBarOpen} toggleSideBar={() => setSideBarOpen(!shouldSideBarOpen)} />
        </>
    );
};

export default HomePage;
