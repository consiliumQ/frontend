import { gql } from 'apollo-boost';

export const GET_PROJECT = gql`
    query getProject {
        project {
            _id
            columns {
                _id
                name
                description
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
