import React, { useState } from 'react';
import { SideBar } from '../../components';
import HeaderDashboard from '../../components/HeaderDashboard';
import { useDndOperation } from '../../hooks';

const DashboardPage = () => {
    const [shouldSideBarOpen, setSideBarOpen] = useState(false);
    const [columnsState, dndOperation] = useDndOperation();
    const { ColumnsState } = dndOperation;

    return (
        <ColumnsState.Provider value={columnsState}>
            <HeaderDashboard dndOperation={dndOperation} onMenuIconClicked={() => setSideBarOpen(!shouldSideBarOpen)} />
            <SideBar dndOperation={dndOperation} shouldSideBarOpen={shouldSideBarOpen} toggleSideBar={() => setSideBarOpen(!shouldSideBarOpen)} />
        </ColumnsState.Provider>
    );
};

export default DashboardPage;
