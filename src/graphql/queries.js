import { gql } from 'apollo-boost';

export const GET_PROJECT = gql`
    query getProject($projectId: ID) {
        project(projectId: $projectId) {
            _id
            name
            columns {
                _id
                name
                description
                project {
                    _id
                }
                tasks {
                    _id
                    title
                    description
                    column {
                        _id
                    }
                }
            }
        }
    }
`;

export const GET_USER_INFO = gql`
    query getUserInfo {
        user {
            _id
            username
            projects {
                _id
                name
            }
        }
    }
`;

export const GET_TASK_DETAIL = gql`
    query getTaskDetail($taskId: ID!) {
        task(taskId: $taskId) {
            title
            description
            backlog
            priority
            storyPoints
        }
    }
`;

export const GET_BACKLOG_TYPES = gql`
    query getEnum {
        __type(name: "Backlog") {
            enumValues {
                name
            }
        }
    }
`;

export const GET_COLUMN_DETAIL = gql`
    query getColumnDetail($columnId: ID!) {
        column(columnId: $columnId) {
            name
            description
            tasks
        }
    }
`;

export const MUTATE_TASKCARD_DND = gql`
    mutation mutateTaskCardDnd($updateColumnArray: [UpdateColumn]) {
        updateColumn(updateColumnArray: $updateColumnArray) {
            _id
        }
    }
`;

export const MUTATE_TASKCOL_DND = gql`
    mutation mutateTaskColDnd($projectId: ID!, $updateProjectObj: UpdateProject) {
        updateProject(projectId: $projectId, updateProjectObj: $updateProjectObj) {
            _id
        }
    }
`;

export const MUTATE_ADD_COLUMN = gql`
    mutation mutateAddColumn($name: String!, $projectId: ID!, $description: String!) {
        addColumn(name: $name, projectId: $projectId, description: $description) {
            _id
        }
    }
`;

export const MUTATE_ADD_TASK = gql`
    mutation mutateAddTask($title: String!, $description: String, $projectId: ID!, $columnId: ID) {
        addTask(title: $title, description: $description, projectId: $projectId, columnId: $columnId) {
            _id
        }
    }
`;

export const MUTATE_UPDATE_TASK_DETAIL = gql`
    mutation mutateUpdateTaskDetail($taskId: ID!, $updateTaskObj: UpdateTask) {
        updateTask(taskId: $taskId, updateTaskObj: $updateTaskObj) {
            _id
        }
    }
`;

export const MUTATE_DELETE_TASK = gql`
    mutation mutateDeleteTask($taskId: ID!) {
        deleteTask(taskId: $taskId) {
            _id
        }
    }
`;

export const GET_PROJECT_INFO_FROM_CACHE = gql`
    query getProjectIdFromCache {
        project {
            _id
            name
        }
    }
`;

// this is to update title, description of column
export const MUTATE_UPDATE_ONE_COLUMN = gql`
    mutation mutateUpdateOneColumn($columnId: ID!, $updateColumnObj: UpdateColumn) {
        updateOneColumn(columnId: $columnId, updateColumnObj: $updateColumnObj) {
            _id
        }
    }
`;

export const MUTATE_DELETE_COLUMN = gql`
    mutation mutateDeleteColumn($columnId: ID!) {
        deleteColumn(columnId: $columnId) {
            _id
        }
    }
`;
