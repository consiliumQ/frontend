import React, { useState } from 'react';

import { Header, SideBar, KanbanBoard } from '../../components';
import { useDndOperation } from '../../hooks';

const HomePage = () => {
    const [shouldSideBarOpen, setSideBarOpen] = useState(false);
    const [columnsState, dndOperation] = useDndOperation();
    const { ColumnsState } = dndOperation;

    return (
        <>
            <ColumnsState.Provider value={columnsState}>
                <Header dndOperation={dndOperation} onMenuIconClicked={() => setSideBarOpen(!shouldSideBarOpen)} />
                <KanbanBoard dndOperation={dndOperation} />
                <SideBar shouldSideBarOpen={shouldSideBarOpen} toggleSideBar={() => setSideBarOpen(!shouldSideBarOpen)} />
            </ColumnsState.Provider>
        </>
    );
};

export default HomePage;
