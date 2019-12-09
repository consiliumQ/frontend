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

export const MUTATE_TASKCARD_DND = gql`
    mutation mutateTaskCardDnd($columnId: ID!, $updateColumnObj: UpdateColumn) {
        updateColumn(columnId: $columnId, updateColumnObj: $updateColumnObj) {
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
