import { gql } from 'apollo-boost';

export const GET_PROJECT = gql`
    query getProject {
        project {
            _id
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

export const GET_PROJECT_ID_FROM_CACHE = gql`
    query getProjectIdFromCache {
        project {
            _id
        }
    }
`;
