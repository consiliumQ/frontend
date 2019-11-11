export const project = {
    id: 'dummy-project',
    name: 'Dummy Project by Ben',
    owner: 'dummy-user',
    contributors: ['du0x00', 'du0x01', 'du0x02'],
    description: 'This is a dummy project for UI dev before the backend is ready',
    taskIds: ['tsk0x00', 'tsk0x01', 'tsk0x02', 'tsk0x03', 'tsk0x04', 'tsk0x05', 'tsk0x06', 'tsk0x07', 'tsk0x08', 'tsk0x09'],
    columns: ['phase0x00', 'phase0x01', 'phase0x02', 'phase0x03'],
};

export const columns = [
    {
        id: 'phase0x00',
        name: 'Phase 0x00',
        description: 'This is Phase 0x00',
        taskList: ['tsk0x00', 'tsk0x01', 'tsk0x08', 'tsk0x09', 'tsk0x07', 'tsk0x05'],
    },
    {
        id: 'phase0x01',
        name: 'Phase 0x01',
        description: 'This is Phase 0x01',
        taskList: [],
    },
    {
        id: 'phase0x02',
        name: 'Phase 0x02',
        description: 'This is Phase 0x02',
        taskList: ['tsk0x03'],
    },
    {
        id: 'phase0x03',
        name: 'Phase 0x03',
        description: 'This is Phase 0x03',
        taskList: ['tsk0x02', 'tsk0x04', 'tsk0x06'],
    },
];

export const tasks = [
    {
        id: 'tsk0x00',
        title: 'Task 0x00',
        description: 'Task 0x00',
    },
    {
        id: 'tsk0x01',
        title: 'Task 0x01',
        description: 'Task 0x01',
    },
    {
        id: 'tsk0x02',
        title: 'Task 0x02',
        description: 'Task 0x02',
    },
    {
        id: 'tsk0x03',
        title: 'Task 0x03',
        description: 'Task 0x03',
    },
    {
        id: 'tsk0x04',
        title: 'Task 0x04',
        description: 'Task 0x04',
    },
    {
        id: 'tsk0x05',
        title: 'Task 0x05',
        description: 'Task 0x05',
    },
    {
        id: 'tsk0x06',
        title: 'Task 0x06',
        description: 'Task 0x06',
    },
    {
        id: 'tsk0x07',
        title: 'Task 0x07',
        description: 'Task 0x07',
    },
    {
        id: 'tsk0x08',
        title: 'Task 0x08',
        description: 'Task 0x08',
    },
    {
        id: 'tsk0x09',
        title: 'Task 0x09',
        description: 'Task 0x09',
    },
];
