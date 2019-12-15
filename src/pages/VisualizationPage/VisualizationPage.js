import React, { useState } from 'react';
import { Header, SideBar } from '../../components';
import { useDndOperation } from '../../hooks';
import VizCharts from '../../components/VizCharts';

const VisualizationPage = () => {
    const [shouldSideBarOpen, setSideBarOpen] = useState(false);
    const [columnsState, dndOperation] = useDndOperation();
    const { ColumnsState } = dndOperation;

    return (
        <ColumnsState.Provider value={columnsState}>
            <Header dndOperation={dndOperation} onMenuIconClicked={() => setSideBarOpen(!shouldSideBarOpen)} />
            <VizCharts />
            <SideBar dndOperation={dndOperation} shouldSideBarOpen={shouldSideBarOpen} toggleSideBar={() => setSideBarOpen(!shouldSideBarOpen)} />
        </ColumnsState.Provider>
    );
}

export default VisualizationPage;